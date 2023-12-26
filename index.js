import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 8000;

//configure env
dotenv.config();

//database config
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./dist")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.listen(port, (req, res) => {
  console.log(`Server running on port: ${port}`);
});
