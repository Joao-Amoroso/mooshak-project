import { createServer } from "http";
import { Server, Socket } from "socket.io";
import express from "express";
import admin from "firebase-admin";
import serviceAccount from "../mooshak-clone-firebase-adminsdk-tlrfa-b32ed038f0.json";

const app = express();

const httpServer = createServer(app);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000"]
    }
});

io.on("connection", (socket: Socket) => {
    console.log("user connectd , id: ", socket.id);
    socket.emit("message", "estas on camarada");
    //TODO: token a funcionar, falta criar base de dados
    socket.on("mtk", async (token) => {
        socket.emit("message", "boas companheiro");

        try {
            const decodeToken = await admin.auth().verifyIdToken(token);
            if (decodeToken) {
                console.log("decodeToken: ", decodeToken);
            } else {
                console.log("algum eerro aconteceu");
            }
        } catch (e) {
            console.log(e.message);
        }
    });
    socket.on("disconnect", () => {
        console.log("by bro user , id: ", socket.id);
    });
});

httpServer.listen(4000, () =>
    console.log("server started in http://localhost:4000")
);
