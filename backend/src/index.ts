import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/pageRoutes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://ompay.vercel.app",
];

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true, // allow cookies
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});