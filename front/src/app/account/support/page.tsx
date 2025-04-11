"use client";

import Link from "next/link";
import { IoArrowBackCircle } from "react-icons/io5";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat px-4 py-20" style={{ backgroundImage: "url('/bg-pattern.png')" }}>
      <div className="max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg p-8 text-white">
      <div className="flex items-center mb-6">
          <Link href="/account">
            <IoArrowBackCircle
              size={28}
              className="text-orange-400 hover:text-orange-300 transition"
            />
          </Link>
          <h1 className="text-2xl font-bold text-white ml-4">Soporte</h1>
        </div>

        <p className="text-gray-300 mb-6">
          ¿Tenés algún problema con tu cuenta o tus entradas? No te preocupes, estamos para ayudarte. 
          Podés contactarnos a través de los siguientes canales:
        </p>

        <div className="space-y-4">
          <SupportItem label="Correo Electrónico" value="soporte@tusentradas.com" />
          <SupportItem label="WhatsApp" value="+54 9 11 1234-5678" />
          <SupportItem label="Instagram" value="@tusentradasok" />
        </div>

        <p className="text-sm text-gray-500 mt-10">
          El equipo de soporte responde dentro de las 24 a 48 hs hábiles. Gracias por tu paciencia.
        </p>
      </div>
    </div>
  );
}

function SupportItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-neutral-800 rounded-lg p-4">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-lg font-medium text-white">{value}</p>
    </div>
  );
}
