import express, { Express } from 'express';
import cors from 'cors'
const app: Express = express();

app.use(
    cors({
        origin: "*",
    })
)

app.use(express.json());

app.get("/", (req, res) => {
    return res.send("hello from working together server updated 07/07/2023");
});

app.use("/room", roomRouter);