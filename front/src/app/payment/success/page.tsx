"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const SuccessPage = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const paymentId = searchParams.get("payment_id");

    if (!paymentId) {
      toast.error("No se encontró el ID del pago.");
      return;
    }
    setLoading(false);
    //Podrian mostrarse otros datos.
  }, [searchParams]);

  if (loading) {
    return (
      <div className="text-center text-white mt-10">Verificando el pago...</div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-white mt-10 space-y-6 min-h-screen">
      <h1 className="text-4xl font-semibold mb-4">¡Pago Aprobado con Éxito!</h1>
      <p className="text-lg">
        Tu pago ha sido procesado correctamente. ¡Gracias por tu compra!
      </p>
      <div className="mt-6 bg-green-600 p-4 rounded-lg text-center text-white">
        <h2 className="font-bold">¡Todo ha salido bien!</h2>
        <p className="mt-2">
          Tu transacción se ha completado y el pago ha sido aprobado.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
