import React from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { usePortalState } from "../Store/usePortalState";
import {
  AadharInfo,
  CorrectionModules,
  FamilyIdHandlers,
  PensionForm,
  MarriageCertificateHandler,
} from "../PortalComponents/Handlers";
const Dashboard = () => {
  const { openSidebar } = useAuthStore();
  const {
    familyId,
    setFamilyId,
    familyIdDialog,
    setFamilyIdDialog,
    searchPensionDialog,
    setPensionDialog,
    AadharDialog,
    MarriageCertificate,
    setMarriageCertificate,
    setAdharDialog,
    CorrectionModule,
    setCorrectionModule,
  } = usePortalState();

  return (
    <div className="flex h-screen bg-base-100">
      {/* `Sidebar */}
      <aside
        className={`bg-base-200  transition-all overflow-hidden shadow-md ${
          openSidebar ? "w-56 " : "w-0"
        }`}
      >
        <div className="p-4 flex gap-3 flex-col">
          <button
            className="btn btn-accent w-full "
            onClick={() => setFamilyIdDialog(!familyIdDialog)}
          >
            Search Family ID
          </button>
          <button
            className="btn btn-accent w-full"
            onClick={() => setPensionDialog(!searchPensionDialog)}
          >
            Search Pension
          </button>
          <button
            className="btn btn-accent w-full"
            onClick={() => setAdharDialog(!AadharDialog)}
          >
            AAdhar Info
          </button>
          <button
            className="btn btn-accent w-full"
            onClick={() => setCorrectionModule(!CorrectionModule)}
          >
            Correction Module
          </button>
          <button
            className="btn btn-accent w-full"
            onClick={() => {
              setMarriageCertificate(!MarriageCertificate);
            }}
          >
            Marriage Certificate
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {!familyIdDialog &&
          !searchPensionDialog &&
          !AadharDialog &&
          !CorrectionModule &&
          !MarriageCertificate && (
            <>
              <div className="text-center flex justify-center items-center flex-col h-full">
                <h1 className="text-6xl animate-bounce md:text-8xl font-extrabold tracking-tight text-primary drop-shadow-xl">
                  Future Portal
                </h1>
                <p className="mt-4 animate-bounce text-lg md:text-xl text-base-content opacity-70">
                  Welcome to the future of your app experience.
                </p>
              </div>
            </>
          )}

        {familyIdDialog && (
          <>
            <div className="divider w-full h-10"></div>
            <div className="bg-base-200 rounded-xl p-6 shadow-lg max-w-xl mx-auto">
              <p className=" text-md mb-4">
                <span className="text-red-500 font-semibold">Info:</span> Enter
                the Family ID and submit to redirect to the PPP website. Log in
                there, return, and enter the Family ID again to get details.
              </p>

              <input
                type="text"
                value={familyId}
                onChange={(e) => setFamilyId(e.target.value)}
                placeholder="Enter the Family ID"
                className="input  w-full mb-4"
              />

              <button
                onClick={() => FamilyIdHandlers(familyId)}
                className="btn btn-primary w-full"
              >
                Search
              </button>
            </div>
          </>
        )}
        {searchPensionDialog && (
          <>
            <div className="divider w-full h-10" />
            <PensionForm />
          </>
        )}
        {AadharDialog && (
          <>
            <div className="divider w-full h-10" />
            <AadharInfo />
          </>
        )}
        {CorrectionModule && (
          <>
            <div className="divider w-full h-10"></div>
            <CorrectionModules />
          </>
        )}

        {MarriageCertificate && (
          <>
            <div className="divider w-full h-10"></div>
            <MarriageCertificateHandler />
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
