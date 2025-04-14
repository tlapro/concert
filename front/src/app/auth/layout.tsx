"use client";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/ArgentinaRock.png"
          alt="Argentina Rock"
          fill
          className="object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
