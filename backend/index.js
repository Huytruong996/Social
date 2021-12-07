const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const helmet = require("helmet");

const morgan = require("morgan");

const cors = require("cors");

const cookieParser = require("cookie-parser");

const path = require("path");

const usersRoute = require("./routes/Users");
const authRoute = require("./routes/Auth");
const postRoute = require("./routes/Post");
const uploadRoute = require("./routes/Upload");
const messengerRoute = require("./routes/Messenger");

const isAuth = require("./middleware/tokenCheck");

dotenv.config();

//DB CONNECTION
mongoose.connect(
  process.env.MONGO_DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connect DB Successfully");
  }
);

//MIDDLEWARE

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);

let users = [];

const AddUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ socketId, userId });
};

const getUserByUserId = (userId) => {
  return users.find((user) => user.userId === userId);
};

const getUserBySocketId = (socketId) => {
  return users.find((user) => user.socketId === socketId);
};

//Check token
// app.use(isAuth);

io.on("connection", (socket) => {
  socket.on("AddUsers", (userId) => {
    AddUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const receiver = getUserByUserId(receiverId);
    socket.to(receiver.socketId).emit("receiveMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", (reason) => {
    const user = getUserBySocketId(socket.id);
    const index = users.indexOf(user);
    users.splice(index, 1);
  });
});

app.use(
  "/images",
  express.static(path.join(__dirname, "public/assets/images"))
);

app.use("/api/posts", postRoute);

app.use("/api/upload", uploadRoute);

app.use("/api/messenger", messengerRoute);

server.listen(8800, () => {
  console.log("Listen 8800");
});
