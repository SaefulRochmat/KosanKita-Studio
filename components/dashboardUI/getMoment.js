// components/dashboardUI/getMoment.js
"use client";

import { useState } from "react";
import useGetMoments from "@/hooks/useGetMoments";
import useMomentTable from "@/hooks/useMomentTabel";
import Image from "next/image";

export default function GetMoment() {
  const { moments, isLoading } = useGetMoments();
  const [activeTab, setActiveTab] = useState("image"); // default tab
  const { search, setSearch, page, setPage, getData } = useMomentTable(moments);

  const { data, totalPages } = getData(activeTab);

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
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center p-4">Loading...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">No data found</td>
              </tr>
            ) : (
              data.map((moment, index) => (
                <tr key={moment.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 text-sm border-b text-slate-500">
                    {(page - 1) * 5 + index + 1}
                  </td>
                  <td className="p-3 text-sm border-b font-medium text-slate-700">{moment.title}</td>
                  <td className="p-3 text-sm border-b">{moment.description}</td>
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
