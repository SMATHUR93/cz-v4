import { Handler } from "@netlify/functions";
import * as admin from "firebase-admin";
import { authenticate } from "./utils/authMiddleware";

const db = admin.firestore();

export const handler: Handler = async (event) => {

     // 🔹 Authenticate the request
     const authError = await authenticate(event);
     if (authError) {
          return authError;
     }

     if (event.httpMethod !== "POST") {
          return { statusCode: 405, body: "Method Not Allowed" };
     }
     try {
          const { name, email, dob } = JSON.parse(event.body || "{}");
          if (!name || !email || !dob) {
               return {
                    statusCode: 400,
                    body: JSON.stringify({ error: "Missing required fields" }),
               };
          }
          const docRef = await db.collection("people").add({ name, email, dob })
          return {
               statusCode: 201,
               body: JSON.stringify({ id: docRef.id, name, email, dob }),
          };
     } catch (error) {
          return { statusCode: 500, body: JSON.stringify({ error: error }) };
     }
};
