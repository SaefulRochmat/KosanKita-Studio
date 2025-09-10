// components/dashboardUI/formUpload.js

'use client'
import useUploadMoments from "@/hooks/useUploadMoments";

export default function FormUpload() {
    const { handleSubmit, title, setTitle, description, setDescription, isLoading } = useUploadMoments();
    
    return (
        <>
            <div className="bg-white p-4 text-slate-600 rounded-md shadow-md w-2/3 m-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Judul"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-slate-300 rounded-md p-2"
                    />
                    <textarea
                        placeholder="Deskripsi"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-slate-300 rounded-md p-2"
                    />
                    <label className="block text-sm font-medium text-slate-700">
                        Upload Gambar atau Video
                    </label>
                    <input 
                    required 
                    type="file" 
                    name="file" 
                    accept="image/*, video/*" 
                    className="border border-slate-300 rounded-md p-2"/>

                    <button type="submit" className="bg-slate-600 text-white rounded-md p-2 disabled:opacity-50" disabled={isLoading}>
                        {isLoading ? <div
                            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status"></div> : "Upload Dawg"}
                    </button>
                </form>
            </div>
        </>
    )
}