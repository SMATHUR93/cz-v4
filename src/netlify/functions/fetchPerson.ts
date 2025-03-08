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
          const id = event.rawUrl.split('fetchPerson/')[1] || "{}";
          if (!id) {
               return {
                    statusCode: 400,
                    body: JSON.stringify({ error: "Missing person ID" }),
               };
          }
          const snapshot = await db.collection("people").doc(id).get(); // .where("id", "==", id).get();
          const person = {
               id: snapshot.data()?.id,
               ...snapshot.data(),
               dob: snapshot.data()?.dob?.toDate()
          };
          return {
               statusCode: 200,
               body: JSON.stringify(person),
          };
     } catch (error) {
          console.error(error);
          return { statusCode: 500, body: JSON.stringify({ error: error }) };
     }
};

export { handler };