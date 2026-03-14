import React, { useEffect } from "react";
import { useAdminStore } from "../Store/useAdminStore";

const AdminDashboard = () => {
  const {
    FetchUsers,
    FetchPdfs,
    Users,
    Pdfs,
    DeleteUser,
    DeleteFiles,
    DeactivateUser,
    ActivateUser,
  } = useAdminStore();

  useEffect(() => {
    FetchUsers();
    FetchPdfs();
  }, []);

  return (
    <div className="p-6 bg-base-200 min-h-screen space-y-10">
      {/* USERS SECTION */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Users</h2>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {Users?.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>

                    <td>{user.email}</td>

                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                    <td>
                      {user.isPaid ? (
                        <span className="badge badge-success">Active</span>
                      ) : (
                        <span className="badge badge-error">Inactive</span>
                      )}
                    </td>

                    <td className="flex gap-2">
                      <button
                        onClick={() => DeleteUser(user._id)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>

                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => {
                          DeactivateUser(user._id);
                        }}
                      >
                        Deactivate
                      </button>

                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => {
                          ActivateUser(user._id);
                        }}
                      >
                        Activate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {Users.length === 0 && (
              <p className="text-center p-5 text-gray-400">No Users Found</p>
            )}
          </div>
        </div>
      </div>

      {/* PDF SECTION */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Uploaded PDFs</h2>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>File</th>
                  <th>Uploader</th>
                  <th>TID</th>
                  <th>CID</th>
                  <th>Upload Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {Pdfs?.map((pdf) => (
                  <tr key={pdf._id}>
                    <td>{pdf.file}</td>

                    <td>{pdf.uploaderId?.username}</td>

                    <td>{pdf.tid}</td>

                    <td>{pdf.cid}</td>

                    <td>{new Date(pdf.createdAt).toLocaleDateString()}</td>

                    <td className="flex gap-2">
                      <button
                        onClick={() => DeleteFiles(pdf._id)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {Pdfs.length === 0 && (
              <p className="text-center p-5 text-gray-400">No PDFs Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
