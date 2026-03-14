import { create } from "zustand";
import axiosInstance from "../Lib/axiosInstance";

export const useAdminStore = create((set, get) => ({
  Users: [],
  Pdfs: [],
  FetchUsers: async () => {
    try {
      const res = await axiosInstance.get("/auth/allusers", {
        withCredentials: true,
      });
      set({ Users: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  FetchPdfs: async () => {
    try {
      const res = await axiosInstance.get("/auth/allpdf", {
        withCredentials: true,
      });
      set({ Pdfs: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  DeleteFiles: async (FileId) => {
    try {
      await axiosInstance.post(`/auth/deletePdf/${FileId}`, {
        withCredentials: true,
      });
      set((state) => ({
        Pdfs: state.Pdfs.filter((Pdfs) => Pdfs._id !== FileId),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  DeleteUser: async (user) => {
    try {
      await axiosInstance.post(`/auth/DeleteUsers/${user}`, {
        withCredentials: true,
      });
      set((state) => ({
        Users: state.Users.filter((Users) => Users._id !== user),
      }));
    } catch (error) {
      console.log(error);
    }
  },

  ActivateUser: async (user) => {
    try {
      await axiosInstance.post(`/auth/ActivateUser/${user}`, {
        withCredentials: true,
      });
      set((state) => ({
        Users: state.Users.filter((Users) => Users._id !== user),
      }));
      get().FetchUsers();
    } catch (error) {
      console.log(error);
    }
  },
  DeactivateUser: async (user) => {
    try {
      await axiosInstance.post(`/auth/Deactivateuser/${user}`, {
        withCredentials: true,
      });
      set((state) => ({
        Users: state.Users.filter((Users) => Users._id !== user),
      }));
      get().FetchUsers();
    } catch (error) {
      console.log(error);
    }
  },
}));
