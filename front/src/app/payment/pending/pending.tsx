"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const PendingPage = () => {
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
      <h1 className="text-4xl font-semibold mb-4">Pago Pendiente</h1>
      <p className="text-lg">Estamos procesando tu pago. Esto puede tardar unos minutos.</p>
      <div className="mt-6 bg-yellow-500 p-4 rounded-lg text-center text-white">
        <h2 className="font-bold">Tu pago está en proceso.</h2>
        <p className="mt-2">Por favor, espera mientras verificamos tu transacción.</p>
      </div>
    </div>
  );
};

export default PendingPage;
