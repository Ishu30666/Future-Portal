import { create } from "zustand";
import axiosInstance from "../Lib/axiosInstance";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  AuthUser: null,
  isCheckingAuth: true,
  openSidebar: false,
  setSidebar: (openSidebar) => {
    set({ openSidebar: openSidebar });
  },
  CheckAUth: async () => {
    try {
      const res = await axiosInstance.get("auth/user", {
        withCredentials: true,
      });
      set({ AuthUser: res.data });
      console.log(res.data);
    } catch (error) {
      set({ AuthUser: null });
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  Login: async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/login", formData, {
        withCredentials: true,
      });
      set({ AuthUser: res.data });
      toast.success("Logged In Success");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  },
  Register: async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/register", formData, {
        withCredentials: true,
      });
      set({ AuthUser: res.data });
      toast.success("Account Created");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  },
  Logout: async () => {
    try {
      await axiosInstance.post("/auth/logout", { withCredentials: true });
      set({ AuthUser: null });
    } catch (error) {
      console.log(error);
    }
  },
  Theme: localStorage.getItem("Theme") || "dark",
  setTheme: (Theme) => {
    set({ Theme: Theme });
    localStorage.setItem("Theme", Theme);
  },
  UploadFile: async (file, tid, cid) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tid", tid);
      formData.append("cid", cid);

      const res = await axiosInstance.post("/auth/uploads", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Pdf is Uploaded");
      get().getAllFiles();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  files: [],
  getAllFiles: async () => {
    try {
      const res = await axiosInstance.get("/auth/AllFiles", {
        withCredentials: true,
      });
      set({ files: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  DeleteFiles: async (FileId) => {
    try {
      await axiosInstance.post(`/auth/DeleteUploadedFiles/${FileId}`, {
        withCredentials: true,
      });
      set((state) => ({
        files: state.files.filter((file) => file._id !== FileId),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
