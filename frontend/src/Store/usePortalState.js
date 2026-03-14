import { create } from "zustand";

export const usePortalState = create((set, get) => ({
  setAllDisable: () => {
    (get().setFamilyId(false), get().setPensionDialog(false));
  },
  // Family ID state
  familyId: "",
  setFamilyId: (familyId) => set({ familyId }),

  familyIdDialog: false,
  setFamilyIdDialog: (familyIdDialog) => set({ familyIdDialog }),

  // Pension Dialog state
  searchPensionDialog: false,
  setPensionDialog: (value) => set({ searchPensionDialog: value }),

  //   Addhar Info

  AadharDialog: false,
  setAdharDialog: (value) => set({ AadharDialog: value }),

  // Correction Module

  CorrectionModule: false,
  setCorrectionModule: (value) => set({ CorrectionModule: value }),

  // marriage Certificate

  MarriageCertificate: false,
  setMarriageCertificate: (value) => set({ MarriageCertificate: value }),
}));
