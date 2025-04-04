import Link from "next/link";
import { IoTicketOutline } from "react-icons/io5";
export default function Tickets() {
  return (
    <div>
      <div className="flex justify-center items-center">
      <h1 className="flex text-center font-bold text-4xl p-4 border-b-4 border-neutral-900 w-fit mx-auto mb-10 text-orange-500">
      <IoTicketOutline size={40} className="mr-5"/>
        Entradas
        <IoTicketOutline size={40} className="ml-5 rotate-90"/>
      </h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-lg mb-10 text-neutral-300">
          Debes ingresar a tu cuenta para adquirir entradas para el evento.
        </p>
        <Link href={("/auth/signin")}>
        <button className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-orange-100 transition duration-300 ease-out rounded-xl hover:cursor-pointer shadow-md bg-orange-600 hover:bg-orange-500 hover:scale-[103%] focus:outline-none">
          <span className="absolute inset-0 w-full h-full transition-all duration-700 ease-out transform translate-x-1 translate-y-0 bg-orange-600 group-hover:translate-x-42 group-hover:translate-y-0 rounded-lg"></span>
          <span className="relative text-xl">Ingresá acá</span>
        </button>
        </Link>
      </div>
    </div>
  );
}
