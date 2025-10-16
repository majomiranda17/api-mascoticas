import express from "express";
import dotenv from "dotenv";
import mascotasRouter from "./routes/mascotas.routes";
import usersRouters from "./routes/users.routers";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config(); 

const app = express();

app.use(express.json());

app.use("/api/mascotas", mascotasRouter);
app.use("/api/users", usersRouters);

app.use(errorHandler);

export default app;
