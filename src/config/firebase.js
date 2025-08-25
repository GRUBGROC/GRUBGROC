import admin from "firebase-admin";
import serviceAccount from "./grubgroc-test-firebase-adminsdk-fbsvc-a2f4329506.json" assert { type: "json" };

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Export the messaging service
export const messaging = admin.messaging();

export default admin;
