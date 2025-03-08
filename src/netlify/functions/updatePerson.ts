import { Handler } from "@netlify/functions";
import * as admin from "firebase-admin";
import { authenticate } from "./utils/authMiddleware";
import { Timestamp } from 'firebase/firestore';
import { getFullChineseZodiac, symbolDetails } from "./commonMethods";

const db = admin.firestore();

// 🛠 Convert UTC DOB Back to User’s Local Time
const convertUTCToLocal = (utcDob: string, timezoneOffset: number): Date => {
     const utcDate = new Date(utcDob);
     return new Date(utcDate.getTime() - timezoneOffset * 60000); // Adjust to local time
};

export const handler: Handler = async (event) => {
     // 🔹 Authenticate the request
     const authError = await authenticate(event);
     if (authError) {
          return authError;
     }
     if (event.httpMethod !== "PUT") {
          return { statusCode: 405, body: "Method Not Allowed" };
     }
     try {
          const { id, name, email, dob, timezoneOffset } = JSON.parse(event.body || "{}");
          if (!id || !name || !email || !dob) {
               return {
                    statusCode: 400,
                    body: JSON.stringify({ error: "Missing required fields" }),
               };
          }

          const inputDate = convertUTCToLocal(dob, timezoneOffset);
          const year = inputDate.getFullYear();
          const month = inputDate.getMonth();
          const date = inputDate.getDate();
          const hour = inputDate.getHours();
          const {
               yearZodiac,
               monthZodiac,
               hourZodiac
          } = getFullChineseZodiac(year, month, date, hour);

          await db.collection("people").doc(id).update({
               name,
               email,
               dob: Timestamp.fromDate(new Date(dob)).toDate(),
               yearSign: symbolDetails[yearZodiac],
               monthSign: symbolDetails[monthZodiac],
               hourSign: symbolDetails[hourZodiac],
               createdAt: Timestamp.fromDate(new Date()).toDate()
          });
          return {
               statusCode: 200,
               body: JSON.stringify({ id, name, email, dob }),
          };
     } catch (error) {
          console.error(error);
          return { statusCode: 500, body: JSON.stringify({ error: error }) };
     }
};
