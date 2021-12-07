import { io } from "socket.io-client";
const baseURL = "ws://localhost:8800";

const socket = io(baseURL);

export default socket;
