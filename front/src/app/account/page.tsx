"use client";

import { IoTicketOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import Link from "next/link";

export default function AccountPage() {
  return (
    <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
    style={{ backgroundImage: "url('/bg-pattern.png')" }}
  >
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg py-10 px-6 mt-40">
        <h2 className="text-3xl font-bold mb-6 text-white">Menú de usuario</h2>
        <hr className="border border-neutral-800 w-full mb-8" />
        <div className="flex flex-col gap-4 w-full">
            <Link href={"/tickets"}>
          <MenuButton icon={<IoTicketOutline size={24} />} label="Mis Entradas" />
            </Link>
          <MenuButton icon={<RiLockPasswordLine size={24} />} label="Cambiar Contraseña" />
          <MenuButton icon={<BiSupport size={24} />} label="Soporte" />
          <MenuButton icon={<MdDeleteOutline size={24} />} label="Eliminar Cuenta" />
        </div>
      </div>
    </div>
</div>
  );
}

function MenuButton({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <button className="flex items-center gap-4 w-full bg-neutral-800 hover:bg-neutral-700 cursor-pointer text-white py-3 px-5 rounded-lg transition duration-300">
      <div className="text-orange-400">{icon}</div>
      <span className="text-lg font-medium">{label}</span>
    </button>
  );
}
