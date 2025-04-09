"use client";

import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const scrollOrNavigate = (id: string) => {
    const isHome = window.location.pathname === "/";

    if (isHome) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50">
        <div className="flex w-full bg-neutral-900 items-center justify-between h-16">
          <div className="flex ml-10 text-xl font-bold gap-2">
            <div className="relative">
            <h1>
              ARGENTINA <span className="text-orange-500">ROCK</span>
            </h1>
            </div>
          </div>
          <div className="flex gap-10 mr-2">
            <button
              onClick={() => scrollOrNavigate("inicio")}
              className="text-xl cursor-pointer hover:text-orange-400 transition duration-300 ease"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollOrNavigate("lineup")}
              className="text-xl cursor-pointer hover:text-orange-400 transition duration-300 ease"
            >
              Line Up
            </button>
            <button
              onClick={() => scrollOrNavigate("galeria")}
              className="text-xl cursor-pointer hover:text-orange-400 transition duration-300 ease"
            >
              Galería
            </button>
            <button
              onClick={() => scrollOrNavigate("entradas")}
              className="text-xl cursor-pointer hover:text-orange-400 transition duration-300 ease"
            >
              Entradas
            </button>
            {user ? (
              <button
                className="text-xl cursor-pointer hover:text-orange-400 transition duration-300 ease"
                onClick={() => logout()}
              >
                <CiLogout size={25} />
              </button>
            ) : (
              <div className="flex justify-between items-center">
                <Link
                  href={"/auth/signin"}
                  className="text-sm cursor-pointer hover:text-orange-400 transition duration-300 ease"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href={"/auth/signup"}
                  className="text-sm ml-6 cursor-pointer p-2 bg-orange-400 hover:bg-orange-500 rounded-xl transition duration-300 ease"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
