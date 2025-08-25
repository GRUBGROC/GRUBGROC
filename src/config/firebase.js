import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const serviceAccount = require("./grubgroc-test-firebase-adminsdk-fbsvc-a2f4329506.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const messaging = admin.messaging();
export default admin;
