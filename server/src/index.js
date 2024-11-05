import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyparser from "body-parser";

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => {
    //connect to mongodb
    console.log("App is listening to", PORT);
    connectToMongoDB()
    .then(() => {
        console.log("Connected to mongodb");
    }) .catch((err) => {
        console.log(err);
        process.exit(0);
    })
});