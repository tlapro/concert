"use client";

import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();

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
            <h1>
              ARGENTINA <span className="text-orange-500">ROCK</span>
            </h1>
          </div>
          <div className="flex gap-10 mr-20">
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
          </div>
        </div>
      </nav>
    </div>
  );
}
