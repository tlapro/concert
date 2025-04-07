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
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-neutral-900 max-h-[90%] w-[90%] sm:w-[60%] md:w-[40%] lg:w-[45%] rounded-2xl p-6 overflow-hidden"
      >
        <h2 className="mt-6 text-2xl font-semibold mb-4">Iniciar Sesión</h2>
        <hr className="border-[1px] border-neutral-800 w-[80%] mt-2" />
        <div className="flex flex-col w-full max-w-md p-6 rounded-2xl shadow gap-6">
          <div className="flex flex-col text-center gap-4">
            <label htmlFor="email" className="text-xl">
              Email
            </label>
            <input
              name="email"
              className="bg-black focus:outline-0 rounded-md p-1"
              onChange={handleChange}
              type="email"
            />
          </div>
          <div className="flex flex-col text-center gap-4">
            <label htmlFor="password" className="text-xl">
              Contraseña
            </label>
            <input
              name="password"
              className="bg-black focus:outline-0 rounded-md p-1"
              onChange={handleChange}
              type="password"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-8">
            <button
              type="submit"
              className="bg-orange-500 p-2 rounded-md cursor-pointer"
            >
              Iniciar Sesión
            </button>
            <p className="text-sm">
              ¿No tienes una cuenta?{" "}
              <Link
                href={"/auth/signup"}
                className="text-orange-400 hover:text-orange-500 transition duration-200 ease"
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
