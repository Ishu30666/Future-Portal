import { create } from "zustand";
import axiosInstance from "../Lib/axiosInstance";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  AuthUser: null,
  isCheckingAuth: true,
  openSidebar: false,

  setSidebar: (openSidebar) => set({ openSidebar }),

  // ✅ CheckAuth always fetches user from cookie
  CheckAUth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("auth/user"); // cookie sent automatically
      set({ AuthUser: res.data });
    } catch (err) {
      set({ AuthUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  Login: async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      // Backend sends { message, user }
      set({ AuthUser: res.data.user });
      toast.success("Logged In Successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  },

  Register: async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      set({ AuthUser: res.data.user });
      toast.success("Account Created Successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  },

  Logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ AuthUser: null });
    } catch (err) {
      console.log(err);
    }
  },

  Theme: localStorage.getItem("Theme") || "dark",
  setTheme: (Theme) => {
    set({ Theme });
    localStorage.setItem("Theme", Theme);
  },

  // File Upload
  UploadFile: async (file, tid, cid) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tid", tid);
      formData.append("cid", cid);

      const res = await axiosInstance.post("/auth/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("PDF Uploaded Successfully");
      get().getAllFiles(); // Refresh files
      return res.data;
    } catch (err) {
      console.log(err);
      toast.error("Upload failed");
    }
  },

  files: [],
  getAllFiles: async () => {
    try {
      const res = await axiosInstance.get("/auth/AllFiles");
      set({ files: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  DeleteFiles: async (fileId) => {
    try {
      await axiosInstance.post(`/auth/DeleteUploadedFiles/${fileId}`);
      set((state) => ({
        files: state.files.filter((f) => f._id !== fileId),
      }));
      toast.success("File Deleted");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  },
}));
