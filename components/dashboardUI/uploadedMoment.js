// /app/components/dashboardUI/uploadedMoment.js
"use client";

import useGetMoments from "@/hooks/useGetMoments";
import useDeleteMoment from "@/hooks/useDeleteMoment";
import useUpdateMoment from "@/hooks/useUpdateMoment";
import useMomentTable from "@/hooks/useMomentTabel";
import { useState } from "react";
import Image from "next/image";

export default function UploadedForm() {
  const { moments, isLoading } = useGetMoments();
  const { deleteMoment } = useDeleteMoment();
  const { updateMoment } = useUpdateMoment();

  const [activeTab, setActiveTab] = useState("image");
  const { search, setSearch, page, setPage, getData } = useMomentTable(moments);
  const { data, totalPages } = getData(activeTab);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  const handleEdit = (moment) => {
    setEditingId(moment.id);
    setEditData({ title: moment.title, description: moment.description });
  };

  const handleSave = async () => {
    await updateMoment(editingId, editData.title, editData.description);
    setEditingId(null);
    location.reload(); // bisa diganti update state langsung
  };

  const handleDelete = async (moment) => {
    if (confirm("Yakin hapus data ini?")) {
      await deleteMoment(moment.id, moment.video_public_id);
      location.reload();
    }
  };

  return (
    <div className="bg-white p-6 text-slate-600 rounded-lg shadow-md w-11/12 lg:w-4/5 mx-auto">
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        <button
          className={`pb-2 px-4 font-medium ${
            activeTab === "image"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-slate-500"
          }`}
          onClick={() => {
            setActiveTab("image");
            setPage(1);
          }}
        >
          Images
        </button>
        <button
          className={`pb-2 px-4 font-medium ${
            activeTab === "video"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-slate-500"
          }`}
          onClick={() => {
            setActiveTab("video");
            setPage(1);
          }}
        >
          Videos
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center mb-4 flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by title..."
          className="w-full sm:w-1/3 border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-slate-300 rounded-lg overflow-hidden">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-slate-700 border-b">No</th>
              <th className="p-3 text-left text-sm font-semibold text-slate-700 border-b">Title</th>
              <th className="p-3 text-left text-sm font-semibold text-slate-700 border-b">Description</th>
              <th className="p-3 text-center text-sm font-semibold text-slate-700 border-b">Media</th>
              <th className="p-3 text-center text-sm font-semibold text-slate-700 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">Loading...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">No data found</td>
              </tr>
            ) : (
              data.map((moment, index) => (
                <tr key={moment.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 text-sm border-b text-slate-500">
                    {(page - 1) * 5 + index + 1}
                  </td>
                  <td className="p-3 text-sm border-b">
                    {editingId === moment.id ? (
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                        className="border rounded p-1 w-full text-sm"
                      />
                    ) : (
                      <span className="font-medium text-slate-700">{moment.title}</span>
                    )}
                  </td>
                  <td className="p-3 text-sm border-b">
                    {editingId === moment.id ? (
                      <textarea
                        value={editData.description}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            description: e.target.value,
                          })
                        }
                        className="border rounded p-1 w-full text-sm"
                      />
                    ) : (
                      moment.description
                    )}
                  </td>
                  <td className="p-3 text-center border-b">
                    {moment.image_url && (
                      <div className="flex justify-center">
                        <Image
                          src={moment.image_url}
                          alt={moment.title}
                          width={120}
                          height={80}
                          className="rounded-md object-cover object-center shadow-sm"
                        />
                      </div>
                    )}
                    {moment.video_public_id ? (
                      <iframe
                        src={`https://player.cloudinary.com/embed/?cloud_name=dqa4ema4i&public_id=${moment.video_public_id}&resource_type=video&profile=cld-default`}
                        title={moment.title}
                        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                        allowFullScreen
                        className="rounded-md w-full object-contain object-center mx-auto shadow-sm"
                      />
                    ) : moment.video_url ? (
                      <video
                        src={moment.video_url}
                        controls
                        playsInline
                        className="rounded-md w-full object-contain bg-black shadow-sm mx-auto"
                      />
                    ) : null}
                  </td>
                  <td className="p-3 text-center border-b space-x-2">
                    {editingId === moment.id ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(moment)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(moment)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 rounded bg-slate-200 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} of {totalPages || 1}
        </span>
        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 rounded bg-slate-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
