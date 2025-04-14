"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const FailurePage = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const paymentId = searchParams.get("payment_id");

    if (!paymentId) {
      toast.error("No se encontró el ID del pago.");
      return;
    }

    setLoading(false)
  }, [searchParams]);

  if (loading) {
    return <div className="text-center text-white mt-10">Verificando el pago...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center text-white mt-10 space-y-6 min-h-screen">
      <h1 className="text-4xl font-semibold mb-4">Pago Fallido</h1>
      <p className="text-lg">Lo sentimos, tu pago no se pudo procesar.</p>
      <div className="mt-6 bg-red-600 p-4 rounded-lg text-center text-white">
        <h2 className="font-bold">Algo salió mal.</h2>
        <p className="mt-2">El pago no fue aprobado. Por favor, intenta nuevamente o contacta con soporte.</p>
      </div>
    </div>
  );
};

export default FailurePage;
