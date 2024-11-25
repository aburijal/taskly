import express from 'express'
import "dotenv/config";
import {db} from "./config/db.js"

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.status(200).json({
        message: "hello world",
    });
});

app.use("*", (req, res) => {
    res.status(404).json({
        message: "not found",
    });
});

app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
});
