import User from "../Models/AuthModels.js";
import bcrypt from "bcrypt";
import QRCode from "qrcode";
import jwt from "jsonwebtoken";
import Upload from "../Models/UploadRoutes.js";
import fs from "fs";
import path from "path";
export const Me = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
  }
};
export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" },
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        isPaid: user.isPaid,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" },
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    });

    return res.status(201).json({
      message: "Registration successful",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const Logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged Out Succesffully" });
  } catch (error) {
    console.log(error);
  }
};

// uplaod
export const UploadFile = async (req, res) => {
  try {
    const { tid, cid } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    if (!tid || !cid) {
      return res.status(400).json({ message: "tid and cid are required" });
    }

    const aid = req.file.filename;

    const fileUrl = `${process.env.BASEURL}Default_VerifyCertificate.aspx/?tid=${tid}&cid=${cid}&aid=${req.file.filename}`;

    const qrCode = await QRCode.toDataURL(fileUrl);

    const newUpload = new Upload({
      uploaderId: req.user._id,
      file: aid,
      qrCode,
      tid,
      cid,
    });

    await newUpload.save();

    res.status(201).json({
      message: "File uploaded successfully",
      url: fileUrl,
      file: newUpload,
    });
  } catch (error) {
    console.log(error);
  }
};
export const AllUploadedFiles = async (req, res) => {
  try {
    const Files = await Upload.find({ uploaderId: req.user._id });
    return res.status(200).json(Files);
  } catch (error) {
    console.log(error);
  }
};

export const DeleteUploadedFiles = async (req, res) => {
  const { id } = req.params;
  try {
    const file = await Upload.findById(id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    const filePath = path.join("uploads", file.file);

    // Delete file from uploads folder
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    await Upload.findByIdAndDelete(id);
    res.status(200).json({
      message: "File deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

// for admin

export const AllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    if (users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const UploadedPdf = async (req, res) => {
  try {
    const pdfs = await Upload.find({})
      .populate("uploaderId", "username email")
      .sort({ createdAt: -1 });

    if (pdfs.length === 0) {
      return res.status(404).json({ message: "No Pdf Found" });
    }

    return res.status(200).json(pdfs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const DeletePDf = async (req, res) => {
  try {
    const { id } = req.params;

    const pdf = await Upload.findById(id);

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    await Upload.findByIdAndDelete(id);

    return res.status(200).json({ message: "PDF deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const DeleteUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.findById(id);
    if (!users) return res.status(404).json({ message: "User not found" });
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const ActivateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isPaid = true;
    await user.save();

    return res.status(200).json({
      message: "User activated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const DeactivateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isPaid = false;
    await user.save();

    return res.status(200).json({
      message: "User Deactivated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
