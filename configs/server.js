"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnectionBlog } from "./mongo.js";
import authRoutes from '../src/auth/auth.routes.js';

class Server {
    constructor() {
      this.app = express();
      this.port = process.env.PORT;
      this.authPath = '/blog/v1/auth';

      this.middlewares();
      this.dbConnectionBlog();
      this.routes();
    }
  
    middlewares() {
      this.app.use(express.urlencoded({ extended: false }));
      this.app.use(cors());
      this.app.use(express.json());
      this.app.use(helmet());
      this.app.use(morgan("dev"));
    }
  
    routes() {
      this.app.use(this.authPath, authRoutes);
    }
    async dbConnectionBlog() {
      await dbConnectionBlog();
    }
  
    listen() {
      this.app.listen(this.port, () => {
        console.log(`Server running on port || ${this.port}`);
      });
    }
  }
  
  export default Server;