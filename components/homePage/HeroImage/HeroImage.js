'use client'
import Image from 'next/image'

export default function HeroImage() {
  return (
    <>
        <div className="bg-slate-100 shadow-lg rounded-xl justify-items-center mt-4 m-auto w-[1250px] h-[500px]">
            <Image
                src="https://images.unsplash.com/photo-1444210971048-6130cf0c46cf?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hero Image"
                width={1250}
                height={400}
                quality={100}
                className="rounded-xl h-full object-cover"
            />
        </div>
    </>
  );
}
