import express from "express";
import dotenv from "dotenv";
import { connetToDatabase } from "./Db/connectToDb.js";
import route from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", route);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  connetToDatabase();
  console.log(`server listening on ${PORT}`);
});
