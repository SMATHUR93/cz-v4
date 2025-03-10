import { Handler } from "@netlify/functions";
import * as admin from "firebase-admin";
import { authenticate } from "./utils/authMiddleware";

const db = admin.firestore();

const handler: Handler = async (event) => {
     // 🔹 Authenticate the request
     const authError = await authenticate(event);
     if (authError) {
          return authError;
     }
     if (event.httpMethod !== "GET") {
          return { statusCode: 405, body: "Method Not Allowed" };
     }
     try {
          const snapshot = await db.collection("people").get();
          const people = snapshot.docs.map(doc => {
               return ({
                    id: doc.id,
                    ...doc.data(),
                    dob: doc.data()?.dob?.toDate()
               });
          });
          return {
               statusCode: 200,
               body: JSON.stringify(people),
          };
     } catch (error) {
          console.error(error);
          return { statusCode: 500, body: JSON.stringify({ error: error }) };
     }
};

export { handler };