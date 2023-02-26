import express from "express";
import "express-async-errors";
import { errorMiddleware } from "./middlewares/error";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(errorMiddleware);

app.listen(3333, () => console.log("Server on-line!"));
