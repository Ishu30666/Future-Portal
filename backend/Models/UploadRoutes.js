
import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema(
  {
    publicId: {
      type: String,
      unique: true,
      sparse: true,
    },
    uploaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    qrCode: {
      type: String,
      required: true,
    },
    tid: {
      type: String,
      required: true,
    },
    cid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
const Upload =
  mongoose.models.Uploads ||
  mongoose.model("Uploads", UploadSchema);

export default Upload;
