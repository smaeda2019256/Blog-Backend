import { config } from "dotenv";
config();

import Server from "./configs/server.js";
const serverBlog = new Server();

serverBlog.listen();