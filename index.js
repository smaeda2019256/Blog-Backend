import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import authRoute from "./src/auth/auth.routes.js";
import authUser from "./src/user/user.routes.js";
import authPost from "./src/post/post.routes.js";


dotenv.config();

const app = express();

app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    /*  useCreateIndex: true,
    useFindAndModify: true,*/
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log(err));

  
const storage = multer.diskStorage({
  destination: (req, file, callb) => {
    callb(null, "images");
  },
  filename: (req, file, callb) => {
    //callb(null, "file.png")
    callb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("El archivo ha sido subido");
});

app.use("/auth", authRoute);
app.use("/users", authUser);
app.use("/posts", authPost);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend en ejecución en el puerto ${PORT}....`);
});
