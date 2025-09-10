import FormUpload from "@/components/dashboardUI/formUpload";
import Sidebar from "@/components/dashboardUI/SideBar/sideBar";

export default function UploadForm() {
    return (
        <>
            <div className="flex w-full min-h-screen bg-gray-100">
            <Sidebar />
                <main className="flex-1 p-4 lg:p-6 pt-14 lg:pt-6">
                    <FormUpload />
                </main>
            </div>
        </>
    )
}