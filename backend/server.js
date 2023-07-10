import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
// import connectDB from "./config/db";
import {
  errorResponserHandler,
  invalidPathHandler,
} from "./middleware/errorHandler";

// Routes
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database is connected...");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
