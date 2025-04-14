"use client";

import { IoTicketOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import Link from "next/link";

export default function AccountPage() {
  return (
<div
  className="min-h-screen bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/bg-pattern.png')" }}
>
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center  w-[90%] md:w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg py-10 px-6 mt-20 md:mt-40">
        <h2 className="text-3xl font-bold mb-6 text-white">Menú de usuario</h2>
        <hr className="border border-neutral-800 w-full mb-8" />
        <div className="flex flex-col gap-4 w-full">
            <Link href={"/tickets"}>
          <MenuButton icon={<IoTicketOutline size={24} />} label="Mis Entradas" />
            </Link>
            <Link href={"/account/password"}>
          <MenuButton icon={<RiLockPasswordLine size={24} />} label="Cambiar Contraseña" />
          </Link>
          <Link href={"/account/support"}>
          <MenuButton icon={<BiSupport size={24} />} label="Soporte" />
          </Link>
          <Link href={"/account/delete"}>
          <MenuButton icon={<MdDeleteOutline size={24} />} label="Eliminar Cuenta" />
          </Link>
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
