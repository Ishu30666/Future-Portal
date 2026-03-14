import express from "express";
import AuthRoutes from "../Routes/Auth.Routes.js";
import ckParser from "cookie-parser";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDatabase from "../Lib/db.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(ckParser());
app.use(
  cors({
    origin: process.env.FRONTENDURI,
    credentials: true,
  }),
);

app.get("/Default_VerifyCertificate.aspx", (req, res) => {
  const { tid, cid, aid } = req.query;

  if (!aid) {
    return res.status(400).send("Invalid certificate request");
  }

  const filePath = path.join(process.cwd(), "uploads", aid);

  res.sendFile(filePath);
});
app.use("/api", AuthRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await ConnectDatabase();
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (error) {
    console.log("Database connection failed:", error);
  }
});
