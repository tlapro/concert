"use client";

import { useRouter } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Settings } from "lucide-react";

export default function NavBar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-neutral-900 shadow-xl">
      <div className="flex items-center justify-between h-16 px-6 relative">
        <div className="text-xl font-bold text-white">
          ARGENTINA <span className="text-orange-500">ROCK</span>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 gap-10 hidden md:flex">
          {["inicio", "lineup", "galeria", "entradas"].map((section) => (
            <button
              key={section}
              onClick={() => scrollOrNavigate(section)}
              className="text-xl text-white cursor-pointer hover:text-orange-400 transition duration-300 ease"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link href={"/account"}>
                <div className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-3 py-2 cursor-pointer rounded-xl transition duration-200 ease">
                  <User size={20} />
                  <span className="text-sm">{user.name}</span>
                </div>
              </Link>
              {user?.role?.name === "admin" && (
                <Link href="/admin">
                  <div className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-sm px-3 py-2 cursor-pointer rounded-xl transition duration-200 ease">
                    <Settings size={20} />
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
                className="hover:text-orange-400 transition text-white"
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

        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 bg-neutral-900 space-y-4 text-white">
          {["inicio", "lineup", "galeria", "entradas"].map((section) => (
            <button
              key={section}
              onClick={() => scrollOrNavigate(section)}
              className="block w-full text-left text-lg hover:text-orange-400 transition"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}

          <div className="border-t border-neutral-700 pt-4 space-y-3">
            {user ? (
              <div className="flex flex-col gap-2">
                <Link
                  href={"/account"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex gap-2 justify-center bg-neutral-800 hover:bg-neutral-700 px-3 py-2 cursor-pointer rounded-xl transition">
                    <User size={20} />
                    <span className="text-sm">{user.name}</span>
                  </div>
                </Link>
                {user?.role?.name === "admin" && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex gap-2 justify-center bg-neutral-800 hover:bg-neutral-700 text-white text-sm px-3 py-2 rounded-xl transition">
                      <Settings size={20} />
                      Panel de Control
                    </div>
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex gap-2 justify-center bg-orange-400 hover:bg-orange-500 text-sm px-3 py-2 rounded-xl transition"
                >
                  Logout <RiLogoutBoxLine size={20} />
                </button>
              </div>
            ) : (
              <div className="flex justify-center gap-2">
                <Link
                  href="/auth/signin"
                  className="bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-2 rounded-xl transition text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/signup"
                  className="w-[50%] bg-orange-400 hover:bg-orange-500 text-white px-3 py-2 rounded-xl transition text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
