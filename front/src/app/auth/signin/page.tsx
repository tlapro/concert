"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Completa todos los campos.");
      return;
    }

    const result = await login(formData);
    if (!result) return;
    
    if (result.success) {
      toast.success(result.message);
      router.push("/");
    } else {
      toast.error(result.message);
    }
    
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-4">
  <form
    onSubmit={handleSubmit}
    className="flex flex-col items-center bg-neutral-900 w-full max-w-md rounded-2xl p-6 shadow-lg overflow-hidden"
  >
    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4 text-white">
      Iniciar Sesión
    </h2>
    <hr className="border-[1px] border-neutral-800 w-full mb-4" />
    
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-white text-sm font-medium">
          Email
        </label>
        <input
          name="email"
          className="w-full bg-neutral-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={handleChange}
          type="email"
          placeholder="email@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-white text-sm font-medium">
          Contraseña
        </label>
        <input
          name="password"
          className="w-full bg-neutral-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={handleChange}
          type="password"
          placeholder="*********"
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          type="submit"
          className="bg-orange-400 px-6 py-2 rounded-md text-white"
        >
          Iniciar Sesión
        </button>
        <p className="text-sm text-white text-center">
          ¿No tienes una cuenta?{" "}
          <Link
            href={"/auth/signup"}
            className="text-orange-400 hover:text-orange-500 transition"
          >
            Registrate
          </Link>
        </p>
      </div>
    </div>
  </form>
</div>

  );
}
