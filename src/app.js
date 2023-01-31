import express, { urlencoded, json } from "express";
import baseRoute from "./routes/base.routes";
import v1Routes from "./routes/v1/v1.routes";
import morgan from "morgan";
import cors from "cors";
import { sequelizeConf, sequelizeORM, mongoDB } from "./db/connections";
require('dotenv').config()

const app = express();
mongoDB()
sequelizeORM(sequelizeConf)

//Settings
app.set("port", process.env.PORT || 3001);

// Middlewares
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use( '/', baseRoute);
app.use( '/v1', v1Routes)

export default app;
