// /app/dashboard/uploaded-form
import Sidebar from "@/components/dashboardUI/SideBar/sideBar";
import UploadedMoment from "@/components/dashboardUI/uploadedMoment";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function UploadedForm() {
  const supabase = await createClient();

  // cek user login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login"); // kalau belum login, tendang ke /login
  }
  return (
    <div className="flex w-full min-h-screen bg-gray-100">
        <Sidebar />
      <main className="flex-1 p-4 lg:p-6 pt-14 lg:pt-6">
        <UploadedMoment />
      </main>
    </div>
  );
}