import Sidebar from "@/components/dashboardUI/SideBar/sideBar";
import UploadedMoment from "@/components/dashboardUI/uploadedMoment";

export default function UploadedForm() {
  return (
    <div className="flex w-full min-h-screen bg-gray-100">
        <Sidebar />
      <main className="flex-1 p-4 lg:p-6 pt-14 lg:pt-6">
        <UploadedMoment />
      </main>
    </div>
  );
}