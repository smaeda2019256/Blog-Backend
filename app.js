import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

import errorHandler from "./src/middlewares/error.js";

//Rutas
import authRoutes from './src/auth/auth.routes.js';
import postRoutes from './src/post/post.routes.js';

//DB Conexion
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));


//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

//Rutas del Middleware
app.use('/api', authRoutes);
app.use('/api', postRoutes);

//Error de middleware
app.use(errorHandler);


//Puerto
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})