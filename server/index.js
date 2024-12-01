import express from 'express';
import "dotenv/config";
import { db } from "./configs/db.js";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
// import helmet from 'helmet';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
// app.use(cookieParser());
// app.use(helmet());
// app.use(cors());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello, World!",
    });
});

app.use("*", (req, res) => {
    res.status(404).json({
        message: "Not Found",
    });
});

app.use((err, req, res, next) => {
    console.error("[ERROR]", err.message || err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
});
