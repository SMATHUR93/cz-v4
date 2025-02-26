import { Handler } from "@netlify/functions";
import * as admin from "firebase-admin";
import { authenticate } from "./utils/authMiddleware";

const db = admin.firestore();

const handler: Handler = async (event, context) => {
     // 🔹 Authenticate the request
     const authError = await authenticate(event);
     if (authError) {
          return authError;
     }
     console.log(`event is ${event}`);
     console.log(`context is ${context}`);
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