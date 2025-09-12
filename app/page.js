import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/components/homePage/HeroImage/HeroImage"

export default function Home() {
  return (
    <div className="font-sans grid items-center justify-items-center">
      <HeroImage />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600">
        <Link href="/login">
          Login
        </Link>
      </button>
    </div>
  );
}
