// server/src/routes/notification.js
import { messaging } from "../config/firebase.js";

export async function notificationRoutes(fastify, options) {
  fastify.post("/send-notification", async (request, reply) => {
    const { title, body } = request.body;

    if (!title || !body) {
      return reply.status(400).send({ success: false, message: "Title and body are required" });
    }

    try {
      const message = {
        notification: { title, body },
        topic: "all", // 🔹 Broadcast to everyone
      };

      await messaging.send(message);

      return { success: true, message: "✅ Notification sent to all users" };
    } catch (err) {
      console.error("❌ Error sending notification:", err);
      return reply.status(500).send({ success: false, message: "Failed to send notification" });
    }
  });
}
