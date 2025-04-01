import Link from "next/link";

export default function NavBar() {
  return (
    <div>
      <nav>
        <div className="flex w-full bg-neutral-900 items-center justify-between h-16 border-b-2 border-violet-950">
          <div className="ml-10 text-xl font-bold">Concierto</div>
          <div className="flex gap-10 mr-20">
            <Link
              href="#"
              className="text-xl hover:text-violet-500 hover:text-shadow-[0_0_10px_#7c4fff] transition duration-300 ease"
            >
              Inicio
            </Link>
            <Link
              href="#"
              className="text-xl hover:text-violet-500 hover:text-shadow-[0_0_10px_#7c4fff] transition duration-300 ease"
            >
              Line Up
            </Link>
            <Link
              href="#"
              className="text-xl hover:text-violet-500 hover:text-shadow-[0_0_10px_#7c4fff] transition duration-300 ease"
            >
              Galería
            </Link>
            <Link
              href="#"
              className="text-xl hover:text-violet-500 hover:text-shadow-[0_0_10px_#7c4fff] transition duration-300 ease"
            >
              Entradas
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
