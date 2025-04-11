"use client";
import { useAuth } from "@/context/AuthContext";
import { deleteUser } from "@/helpers/deleteUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoArrowBackCircle } from "react-icons/io5";

export default function DeletePage() {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const { token, logout } = useAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!password) {
      toast.error("Completa todos los campos");
      return;
    }
    if (!token) {
      toast.error("Vuelve a iniciar sesión para realizar esta acción");
      return;
    }
    const response = await deleteUser({ token, password });
    if (response.success) {
      toast.success(response.message);
      await logout();
      router.push("/");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/bg-pattern.png')" }}
    >
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center mb-6">
          <Link href="/account">
            <IoArrowBackCircle
              size={28}
              className="text-orange-400 hover:text-orange-300 transition"
            />
          </Link>
          <h1 className="text-2xl font-bold text-white ml-4">Eliminar Cuenta</h1>
        </div>

        <p className="text-sm text-gray-400 mb-6">
          Esta acción es <span className="text-red-500 font-semibold">permanente</span>. Si estás seguro,
          por favor ingresa tu contraseña para confirmar.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Eliminar Cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
