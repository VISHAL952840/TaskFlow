import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import notFound from "./middleware/NotFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json())

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;