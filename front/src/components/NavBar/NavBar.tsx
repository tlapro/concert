"use client";

import { useRouter } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";
import { User } from "lucide-react";
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-neutral-900">
      <div className="flex items-center justify-between h-16 px-6 relative">
        <div className="text-xl font-bold">
          <h1>
            ARGENTINA <span className="text-orange-500">ROCK</span>
          </h1>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-10">
          {["inicio", "lineup", "galeria", "entradas"].map((section) => (
            <button
              key={section}
              onClick={() => scrollOrNavigate(section)}
              className="text-xl cursor-pointer hover:text-orange-400 transition duration-300 ease"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link href={"/account"}>
                <div className="flex items-center gap-2 text-white bg-neutral-800 hover:bg-neutral-700 px-3 py-2 cursor-pointer rounded-xl transition duration-200 ease">
                  <User size={20} />
                  <span className="text-sm">{user.name}</span>
                </div>
              </Link>
              {user?.role?.name === "admin" && (
                <Link href="/admin">
                  <div className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 cursor-pointer rounded-xl transition duration-200 ease">
                    Panel de Control
                  </div>
                </Link>
              )}
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-sm px-3 py-2 cursor-pointer rounded-xl transition duration-200 ease"
              >
                Logout <RiLogoutBoxLine size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/auth/signin"
                className="hover:text-orange-400 transition"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/auth/signup"
                className="bg-orange-400 hover:bg-orange-500 text-white px-3 py-2 rounded-xl transition"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
