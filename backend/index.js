import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from 'dotenv';
import { get } from "https";

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

app.post("/webhook", async (req, res) => {
  console.log("Webhook received!");

  const lead_id = req.body.entry[0].changes[0].value.leadgen_id

  async function getLeadDetails() {
    try {
      const res = await fetch(`https://graph.facebook.com/v26.0/${lead_id}?fields=id,created_time,field_data&access_token=${process.env.META_PAGE_ACCESS_TOKEN}`)
      if(!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      // will access data later
      const response = await res.json()
      console.log("Lead details:", response);
    }

    catch(error) {
      console.log(error)
    }
  }
  await getLeadDetails()

  res.sendStatus(200);
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
