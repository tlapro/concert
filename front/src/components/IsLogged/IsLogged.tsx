"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const IsLogged = ({ children }: { children: React.ReactNode }) => {

  const { user, token } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const hasShownToastRef = useRef(false);

  useEffect(() => {
    if (!user || !token) {
        router.replace("/");
        if (!hasShownToastRef.current) {
          toast.error("Debes estar logueado para acceder a esta página.");
          hasShownToastRef.current = true;
        }
      } else {
        setIsLoading(false);
      }
  }, [user, token, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-orange-400 border-dashed rounded-full animate-spin"></div>
          <p className="text-gray-200 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default IsLogged;
