import "dotenv/config";
import Fastify from "fastify";
import { connectDB } from "./src/config/connect.js";
import { PORT } from "./src/config/config.js";
import { admin, buildAdminRouter } from "./src/config/setup.js";
import { registerRoutes } from "./src/routes/index.js";
import fastifySocketIO from "fastify-socket.io";

const start = async () => {
  await connectDB(process.env.MONGO_URI);

  const app = Fastify();

  app.register(fastifySocketIO, {
    cors: {
      origin: "*",
    },
    pingInterval: 10000,
    pingTimeout: 5000,
    transports: ["websocket"],
  });

  await registerRoutes(app);

  await buildAdminRouter(app);

  app.listen({ port: PORT,  host: "0.0.0.0"}, (err, addr) => {
  //app.listen({ port: PORT }, (err, addr) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        `GRUBGROC Started on http://localhost:${PORT}${admin.options.rootPath}` 
      );
    }
  });

  app.ready().then(() => {
    app.io.on("connection", (socket) => {
      console.log("A User Connected ✅");

      socket.on("joinRoom", (orderId) => {
        socket.join(orderId);
        console.log(` 🔴 User Joined room ${orderId}`);
      });

      socket.on("disconnect", () => {
        console.log("User Disconnected ❌");
      });
    });
  });
  };

start();










/*import "dotenv/config";
import Fastify from "fastify";
import { connectDB } from "./src/config/connect.js";
import { PORT } from "./src/config/config.js";
import { admin, buildAdminRouter } from "./src/config/setup.js";
import { registerRoutes } from "./src/routes/index.js";
import fastifySocketIO from "fastify-socket.io";

// Connect to the database and start the server
const start = async () => {
  await connectDB(process.env.MONGO_URI);

  const app = Fastify();

  // Register Socket.IO for real-time communication
  app.register(fastifySocketIO, {
    cors: {
      origin: "*",
    },
    pingInterval: 10000,
    pingTimeout: 5000,
    transports: ["websocket"],
  });

  // Register all routes
  await registerRoutes(app); // This should register all routes including your new address update route

  // Register AdminJS routes
  await buildAdminRouter(app);

  // Start listening on the specified port
  app.listen({ port: process.env.PORT || 3000 }, (err, addr) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`GRUBGROC Started on http://localhost:${PORT}${admin.options.rootPath}`);
    }
  });

  // Handle WebSocket connections
  app.ready().then(() => {
    app.io.on("connection", (socket) => {
      console.log("A User Connected ✅");

      socket.on("joinRoom", (orderId) => {
        socket.join(orderId);
        console.log(`🔴 User Joined room ${orderId}`);
      });

      socket.on("disconnect", () => {
        console.log("User Disconnected ❌");
      });
    });
  });
};

start(); */
