const express = require("express");
const { createServer } = require("http"); // Import only createServer from "http"
const { Server } = require("socket.io"); // Import Server from "socket.io"
const cors = require("cors"); // Import CORS middleware

const connectToDatabase = require("../DataBaseConnection/dbConfig");
connectToDatabase();
const app = express();
const port = 3002;
app.use(express.json());
app.use(cors());
const gettingMachineInfo = require("./getMachineInfo");
app.use("/", gettingMachineInfo);

const Machine = require("../Models/machineModel");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Store messages for each protector
const protectorMessages = {};

io.on("connection", (socket) => {
  console.log("Client connected!");

  socket.on("protector", (msg) => {
    console.log(`Message received from  ${msg.protector_id}: `);
    console.log(msg.data);
    console.log(msg.type);

    if (msg.type === "run") {
      io.emit("updated_protector_messages", msg);
      update_insert_valid(msg.protector_id, msg.data.success);
    } else if (msg.type === "status") {
      io.emit("updated_protector_messages", msg);
      machineStatusChanging(msg.protector_id, msg.data.status);
    } else if (msg.type === "init") {
      io.emit("updated_protector_messages", msg);
      machineCreating(
        msg.data.moldProtector,
        msg.data.machineID,
        msg.data.moldMaker,
        msg.data.moldMaterial,
        msg.data.monaNumber
      );
    } else {
      console.error("There is error occured");
    }
  });
});

// Function to update or insert into MongoDB
async function updateOrInsert(moldProtector, success) {
  try {
    const existingDocument = await Machine.findOne({
      moldProtector,
      status: { $ne: "inactive" },
    });

    if (existingDocument) {
      if (success) {
        await Machine.updateOne(
          { moldProtector, status: { $ne: "inactive" } },
          { $inc: { moldShots: 1 } }
        );
        console.log(`Updated moldShots for machine ${moldProtector}`);
      } else {
        await Machine.updateOne(
          { moldProtector, status: { $ne: "inactive" } },
          { $inc: { failedShots: 1 } }
        );
        console.log(`Updated failedShots for machine ${moldProtector}`);
      }
    }
  } catch (error) {
    console.error("Error updating or inserting:", error);
  }
}

async function update_insert_valid(moldProtector, success) {
  console.log(moldProtector, success);
  if (!isNaN(success) && (success == 0 || success == 1)) {
    await updateOrInsert(moldProtector, success);
  } else {
    console.log("Invalid success code");
  }
}

async function machineStatusChanging(moldProtector, machineDataStatus) {
  try {
    const existingDocument = await Machine.findOne({
      moldProtector,
      status: { $ne: "inactive" },
    });

    if (existingDocument) {
      await Machine.updateOne(
        { moldProtector, status: { $ne: "inactive" } },
        { status: machineDataStatus }
      );
      console.log(
        `Machine status changing for ${moldProtector} to  ${machineDataStatus}`
      );
    }
  } catch (error) {
    console.error("Error on changing status:", error);
  }
}

async function machineCreating(
  moldProtector,
  machineID,
  moldMaker,
  moldMaterial,
  monaNumber
) {
  try {
    const existingDocument = await Machine.findOne({
      moldProtector,
      machineID,
      moldMaker,
      moldMaterial,
      monaNumber,
      status: { $ne: "inactive" },
    });

    if (existingDocument) {
    } else {
      await Machine.updateOne(
        { moldProtector, status: { $ne: "inactive" } },
        { status: "inactive" }
      );
      await Machine.create({
        moldProtector,
        machineID,
        moldMaker,
        moldMaterial,
        monaNumber,
        failedShots: 0,
        moldShots: 0,
        status: "notWorking",
      });
    }
  } catch (error) {
    console.error("Error on changing status:", error);
  }
}

httpServer.listen(3001, () => {
  console.log("Server started on port 3001");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
