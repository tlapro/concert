"use client";

import { useAuth } from "@/context/AuthContext";
import { registerValidate } from "@/helpers/SignUpValidation";
import { IRegisterUser } from "@/interfaces/IRegisterUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignUp() {
  const { register } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<IRegisterUser>({
    name: "",
    email: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    phone: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const error = registerValidate(name, value, formData);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const parsedData = {
      ...formData,
      birthdate: formData.birthdate ? new Date(formData.birthdate).toISOString().split("T")[0] : "",
    };

    const result = await register(parsedData);
    if (!result) return;

    if (result.success) {
      toast.success(result.message);
      router.push("/auth/signin");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-neutral-900 max-h-[90%] w-[90%] md:w-[80%] lg:w-[60%] rounded-2xl p-10 shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center text-white">Registrarse</h2>
        <hr className="border-[1px] border-neutral-800 w-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="space-y-4">
            <div className="flex flex-col text-left gap-1">
              <label htmlFor="name" className="text-white text-sm font-medium">Nombre</label>
              <input
                name="name"
                className="w-full bg-neutral-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={handleChange}
                placeholder="Nombre completo"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div className="flex flex-col text-left gap-1">
              <label htmlFor="email" className="text-white text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                className="w-full bg-neutral-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            <div className="flex flex-col text-left gap-1">
              <label htmlFor="phone" className="text-white text-sm font-medium">Teléfono</label>
              <input
                name="phone"
                className="w-full bg-neutral-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={handleChange}
                placeholder="Teléfono"
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col text-left gap-1">
              <label htmlFor="birthdate" className="text-white text-sm font-medium">Fecha de Nacimiento</label>
              <input
                type="date"
                name="birthdate"
                max={new Date().toISOString().split("T")[0]}
                className="w-full bg-neutral-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={handleChange}
              />
              {errors.birthdate && <p className="text-red-500 text-xs">{errors.birthdate}</p>}
            </div>

            <div className="flex flex-col text-left gap-1">
              <label htmlFor="password" className="text-white text-sm font-medium">Contraseña</label>
              <input
                name="password"
                type="password"
                className="w-full bg-neutral-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={handleChange}
                placeholder="Contraseña"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            <div className="flex flex-col text-left gap-1">
              <label htmlFor="confirmPassword" className="text-white text-sm font-medium">Repetir Contraseña</label>
              <input
                name="confirmPassword"
                type="password"
                className="w-full bg-neutral-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={handleChange}
                placeholder="Repetir Contraseña"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition duration-300"
          >
            Registrarme
          </button>
          <p className="text-sm text-white">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href={"/auth/signin"}
              className="text-orange-400 hover:text-orange-500 transition duration-200"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
