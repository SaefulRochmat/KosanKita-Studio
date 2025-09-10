// components/dashboardUI/getMoment.js
'use client'

import useGetMoments from "@/hooks/useGetMoments";
import Image from "next/image";

export default function GetMoment() {
    const { moments } = useGetMoments();
    return (
        <>
            <div className="bg-white p-6 text-slate-600 rounded-lg shadow-md w-11/12 lg:w-4/5 mx-auto overflow-x-auto">
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
                    {moments.map((moment, index) => (
                        <tr
                        key={moment.id}
                        className="hover:bg-slate-50 transition-colors"
                        >
                        <td className="p-3 text-sm border-b text-slate-500">{index + 1}</td>
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
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
