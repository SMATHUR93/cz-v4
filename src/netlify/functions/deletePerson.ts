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
     if (event.httpMethod !== "DELETE") {
          return { statusCode: 405, body: "Method Not Allowed" };
     }

     try {
          const { id } = JSON.parse(event.body || "{}");
          if (!id) {
               return {
                    statusCode: 400,
                    body: JSON.stringify({ error: "Missing person ID" }),
               };
          }
          await db.collection("people").doc(id).delete();
          return {
               statusCode: 200,
               body: JSON.stringify({ message: "Person deleted successfully" }),
          };
     } catch (error) {
          console.error(error);
          return { statusCode: 500, body: JSON.stringify({ error: error }) };
     }
};