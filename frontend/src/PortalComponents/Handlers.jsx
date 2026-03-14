import toast from "react-hot-toast";
import { useAuthStore } from "../Store/useAuthStore";
import { useState } from "react";

export const FamilyIdHandlers = (familyId) => {
  if (familyId) {
    const urlPP = `https://ppp-office.haryana.gov.in/Family/PrintFamilyDetails?familyId=${familyId}`;
    window.open(urlPP, "_blank");
  } else {
    toast.error("Please enter a valid Family ID!");
  }
};

export const PensionForm = () => {
  return (
    <>
      <form
        action="https://ppp-office.haryana.gov.in/PensionEnquiry/Search"
        method="post"
        target="_blank"
        className="flex flex-col items-center gap-6"
      >
        <h1 className=" text-xl mb-6">
          Search For Pensions (Exclusion / ProActive)
        </h1>
        <div className="flex flex-col gap-6 w-full max-w-md">
          <div>
            <label htmlFor="txtSelectedFamilyId" className="label">
              Family Id:
            </label>
            <input
              id="txtSelectedFamilyId"
              name="SelectedFamilyId"
              type="text"
              placeholder="Enter Your Family Id here"
              required
              className="w-full border-gray-500 p-2 rounded-md bg-base-300 "
            />
          </div>
          <div>
            <label htmlFor="ddlSelectedSearchType" className="label">
              Search IN:
            </label>
            <select
              id="ddlSelectedSearchType"
              name="SelectedSearchType"
              required
              className="form-control w-full border-gray-500 p-2 rounded-md bg-base-300 "
            >
              <option value="">Please select</option>
              <option value="PROACTIVE">PROACTIVE</option>
              <option value="EXCLUSION">EXCLUSION</option>
            </select>
          </div>
          <button type="submit" className="btn  btn-block">
            Search
          </button>
        </div>
      </form>
      ;
    </>
  );
};
export const AadharInfo = () => {
  return (
    <>
      <div className=" border-transparent">
        <h1 className="text-center font-semibold text-2xl">
          Enter Aadhar Number here
        </h1>
        <form
          className="flex flex-col p-5 justify-center text-center items-center "
          action={`https://ppp-office.haryana.gov.in/AddNewFamily/GetResponse`}
          method="POST"
          target="_blank"
          onSubmit={(e) => {
            e.preventDefault();
            const aadhaarInput = document.getElementById("aadhaar-input");
            if (aadhaarInput) {
              const aadhaarNumber = aadhaarInput.value;
              if (aadhaarNumber) {
                aadhaarInput.value = btoa(aadhaarNumber);
                const form = e.target;
                form.submit();
              }
            }
          }}
        >
          <div className="flex gap-6 flex-col w-1/2 relative max-w-xl">
            <input
              type="text"
              id="aadhaar-input"
              name="Aadahr"
              className="input input-accent w-full rounded-sm"
              placeholder="Enter the Aadhaar Number:"
            />
            <input type="submit" value="Submit" className="btn btn-secondary" />
          </div>
        </form>
      </div>
    </>
  );
};

export const CorrectionModules = () => {
  return (
    <>
      <div
        className="flex flex-col bg-base-200 justify-center items-center p-3
      
      "
      >
        <h1 className="text-2xl font-semibold text-center mb-6 ">
          Correction Module Status
        </h1>
        <div className="gap-3 flex flex-col w-1/2 max-w-xl">
          <input
            type="text"
            placeholder="Enter Family id  "
            className="input input-accent w-full"
          />
          <button className="btn btn-accent w-full">Search Status</button>
        </div>
      </div>
    </>
  );
};

export const MarriageCertificateHandler = () => {
  const { UploadFile, files, DeleteFiles } = useAuthStore();

  const [file, setFile] = useState(null);
  const [tid, setTid] = useState("");
  const [cid, setCid] = useState("");
  const [imagePreview, setimagePreview] = useState(null);

  const onSubmitHandler = async () => {
    if (!file || !tid || !cid) {
      toast.error("Please fill all fields");
      return;
    }

    await UploadFile(file, tid, cid);

    setFile(null);
    setTid("");
    setCid("");
  };

  return (
    <div className="p-6 space-y-10">
      {/* Upload Section */}
      <div className="flex flex-col bg-base-200 justify-center items-center p-6 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-6">
          Marriage Certificate Upload
        </h1>

        <div className="gap-4 flex flex-col w-full max-w-xl">
          {/* TID */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Transaction ID (TID)</legend>

            <input
              type="text"
              className="input input-bordered"
              placeholder="Enter Transaction ID"
              value={tid}
              onChange={(e) => setTid(e.target.value)}
            />
          </fieldset>

          {/* CID */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Certificate ID (CID)</legend>

            <input
              type="text"
              className="input input-bordered"
              placeholder="Enter Certificate ID"
              value={cid}
              onChange={(e) => setCid(e.target.value)}
            />
          </fieldset>

          {/* PDF Upload */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Upload PDF</legend>

            <input
              type="file"
              accept="application/pdf"
              className="file-input file-input-bordered"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </fieldset>

          <button className="btn btn-accent w-full" onClick={onSubmitHandler}>
            Upload Certificate
          </button>
        </div>
      </div>

      {/* Uploaded Files Table */}
      <div className="overflow-x-auto bg-base-200 rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Uploaded Certificates</h2>

        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>File</th>
              <th>TID</th>
              <th>CID</th>
              <th>QR Code</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {files && files.length > 0 ? (
              files.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>

                  <td className="font-medium">{item.file}</td>

                  <td>{item.tid}</td>

                  <td>{item.cid}</td>

                  <td>
                    <img
                      src={item.qrCode}
                      alt="QR"
                      onClick={() => setimagePreview(item.qrCode)}
                      className="w-24 h-24 cursor-pointer hover:scale-105 transition"
                    />
                  </td>

                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => DeleteFiles(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No certificates uploaded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* QR Preview Modal */}

      {imagePreview && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-base-100 p-6 rounded-xl shadow-xl relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setimagePreview(null)}
            >
              ✕
            </button>

            <img
              src={imagePreview}
              alt="QR Preview"
              className="w-96 h-96 object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
