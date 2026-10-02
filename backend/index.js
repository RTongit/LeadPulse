import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(
  cors({
    // Allow connections from any origin.
    origin: "*",
  }),
);

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // Allow connections from any origin.
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("React Native connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("React Native disconnected:", socket.id);
  });
});

// let inc = 4;
// setInterval(()=>{
//     const message = {
//       id: String(inc),
//       name: "Jama Steel",
//       email: "jamal@gmail.com",
//     }
//     io.emit("newLeads",message)
//     inc++
// },50000)



app.get("/", (req, res) => {
  res.send("Welcome to LeadPulse Backend!");
});

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];
  const token = req.query["hub.verify_token"];

  if(mode==="subscribe" && token===process.env.META_VERIFY_TOKEN) {
    return res.status(200).send(challenge)
  }
  return res.sendStatus(403);

});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
