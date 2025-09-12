'use client';
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import Astronot from "@/public/Images/astronot.png"

export default function LoginComponents() {
    const handleGoogleLogin = async () => {
        const supabase = createClient();
        
        const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${window.location.origin}/auth/callback`,
        },
        });
        
        if (error) {
        console.error("Login error:", error.message);
        }
    };
    return(
        <>
            <div className="h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-300">
            {/* Bagian kiri (ilustrasi) */}
            <div className="hidden md:flex flex-1 justify-center items-center p-6">
                <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="relative w-96 h-96"
                >
                <Image
                    src={Astronot} // ganti dengan gambar kartun kamu
                    alt="Cartoon Login"
                    fill
                    className="object-contain"
                />
                </motion.div>
            </div>

            {/* Bagian kanan (form login) */}
            <div className="flex flex-1 justify-center items-center">
                <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-xl p-8 w-80 md:w-96 flex flex-col items-center text-center space-y-6"
                >
                <h1 className="text-3xl font-bold text-gray-800">
                    🎉 Welcome Back!
                </h1>
                <p className="text-gray-500 text-sm">
                    Login dulu yuk biar bisa lanjut seru-seruan 🚀
                </p>

                <motion.button
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.95, rotate: -1 }}
                    onClick={handleGoogleLogin}
                    className="flex items-center gap-3 bg-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-600 transition-colors"
                >
                    <FaGoogle className="text-lg" />
                    Login with Google
                </motion.button>

                <div className="text-xs text-gray-400">
                    By logging in, you agree to our{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                    Terms
                    </a>
                </div>
                </motion.div>
            </div>
            </div>
        </>
    );
}