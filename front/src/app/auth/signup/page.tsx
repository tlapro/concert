"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function SignUp() {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    city: "",
    country: "",
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
        className="flex flex-col items-center bg-neutral-900 max-h-[90%] w-[90%] sm:w-[0%] md:w-[90%] lg:w-[80%] rounded-2xl p-6 overflow-hidden"
      >
        <h2 className="mt-6 text-2xl font-semibold mb-4">Registrarse</h2>
        <hr className="border-[1px] border-neutral-800 w-[90%] mt-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 w-full p-6 rounded-2xl shadow gap-6">
          <div>
            <div className="flex flex-col text-center gap-2">
              <label htmlFor="name" className="text-xl">
                Nombre
              </label>
              <input
                name="name"
                className="w-[65%] mx-auto bg-black text-white focus:outline-0 rounded-md p-1"
                onChange={handleChange}
                placeholder="Nombre completo"
              />
            </div>
            <div className="flex flex-col text-center gap-2 mt-2">
              <label htmlFor="email" className="text-xl">
                Email
              </label>
              <input
                name="email"
                className="w-[65%] mx-auto bg-black text-white focus:outline-0 rounded-md p-1"
                type="email"
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col text-center gap-2 mt-2">
              <label htmlFor="password" className="text-xl">
                Contraseña
              </label>
              <input
                name="password"
                className="w-[65%] mx-auto bg-black text-white focus:outline-0 rounded-md p-1"
                type="password"
                onChange={handleChange}
                placeholder="Contraseña"
              />
            </div>
            <div className="flex flex-col text-center gap-2 mt-2">
              <label htmlFor="confirmPassword" className="text-xl">
                Repetir Contraseña
              </label>
              <input
                name="confirmPassword"
                className="w-[65%] mx-auto bg-black text-white focus:outline-0 rounded-md p-1"
                type="password"
                onChange={handleChange}
                placeholder="Repetir Contraseña"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col text-center gap-2">
              <label htmlFor="birthdate" className="text-xl">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="birthdate"
                className="w-[65%] mx-auto bg-black text-white focus:outline-0 rounded-md p-1"
                max={new Date().toISOString().split("T")[0]} 
                onChange={(e) => setBirthdate(new Date(e.target.value))}
              />
            </div>

            <div className="flex flex-col text-center gap-2 mt-2">
              <label htmlFor="phone" className="text-xl">
                Teléfono
              </label>
              <input
                name="phone"
                className="w-[65%] mx-auto bg-black text-white focus:outline-0 rounded-md p-1"
                onChange={handleChange}
                placeholder="Teléfono"
              />
            </div>

            <div className="flex flex-col text-center gap-2 mt-2">
              <label htmlFor="city" className="text-xl">
                Ciudad
              </label>
              <input
                name="city"
                className="w-[65%] mx-auto bg-black text-white focus:outline-0 rounded-md p-1"
                onChange={handleChange}
                placeholder="Ciudad"
              />
            </div>

            <div className="flex flex-col text-center gap-2 mt-2">
              <label htmlFor="country" className="text-xl">
                País
              </label>
              <input
                name="country"
                className="w-[65%] mx-auto bg-black text-white focus:outline-0 rounded-md p-1"
                onChange={handleChange}
                placeholder="País"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
          <button
            type="submit"
            className="bg-orange-500 p-2 rounded-md cursor-pointer"
          >
            Registrarme
          </button>
          <p className="text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href={"/auth/signin"}
              className="text-orange-400 hover:text-orange-500 transition duration-200 ease"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
