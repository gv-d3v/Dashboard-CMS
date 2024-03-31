import * as admin from "firebase-admin";
//const serviceAccount = require("@/admin/sql-server-nodejs-firebase-adminsdk-6ulf8-33b847acf5.json");

export const adminFireApp = !admin.apps.length
  ? admin.initializeApp({
      //credential: admin.credential.cert(serviceAccount),
      credential: admin.credential.cert({
        projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      //databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    })
  : admin.app();
