
import express from "express";
import AuthRoutes from "../Routes/Auth.Routes.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDatabase from "../Lib/db.js";
import Upload from "../Models/UploadRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTENDURI,
    credentials: true,
  })
);

app.get("/Default_VerifyCertificate.aspx", async (req, res) => {
  try {
    const { aid, tid, cid } = req.query;

    if (
      typeof aid !== "string" ||
      typeof tid !== "string" ||
      typeof cid !== "string" ||
      !aid.trim() ||
      !tid.trim() ||
      !cid.trim()
    ) {
      return res.status(400).send("Invalid verification link");
    }

    const fileDoc = await Upload.findOne({
      publicId: aid,
      tid,
      cid,
    });

    if (!fileDoc) {
      return res.status(404).send("Certificate not found");
    }

    const uploadDir = path.resolve(process.cwd(), "uploads");
    const filePath = path.resolve(uploadDir, fileDoc.file);

    // Prevent paths outside the uploads directory.
    if (!filePath.startsWith(uploadDir + path.sep)) {
      return res.status(400).send("Invalid file path");
    }

    res.sendFile(filePath, (error) => {
      if (error && !res.headersSent) {
        console.error("Certificate file error:", error.message);
        res.status(error.statusCode || 500).send(
          error.statusCode === 404
            ? "Certificate file is missing from server storage"
            : "Unable to open certificate"
        );
      }
    });
  } catch (error) {
    console.error("Certificate verification error:", error);
    if (!res.headersSent) {
      return res.status(500).send("Internal server error");
    }
  }
});

app.use("/api", AuthRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await ConnectDatabase();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();
