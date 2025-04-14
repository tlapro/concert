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

  const [errors, setErrors] = useState<IRegisterUser>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    phone: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    const error = registerValidate(name, value, formData);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const parsedData = {
      ...formData,
      birthdate: formData.birthdate
        ? new Date(formData.birthdate).toISOString().split("T")[0]
        : "",
    };

    const newErrors: IRegisterUser = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthdate: "",
      phone: "",
    };

    let hasError = false;
    for (const key in formData) {
      const field = key as keyof IRegisterUser;
      const error = registerValidate(field, formData[field], formData);
      if (error) {
        hasError = true;
        newErrors[field] = error;
      }
    }

    setErrors(newErrors);
    if (hasError) return;

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
    <div className="w-full min-h-screen flex items-center justify-center bg-neutral-950 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-neutral-900 p-6 md:p-10 rounded-2xl shadow-md space-y-6"
      >
        <h2 className="text-2xl md:text-3xl text-white font-semibold text-center">Registrarse</h2>
        <hr className="border-neutral-800" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna 1 */}
          <div className="space-y-4">
            {[
              { name: "name", label: "Nombre", type: "text", placeholder: "Nombre completo" },
              { name: "email", label: "Email", type: "email", placeholder: "Email" },
              { name: "phone", label: "Teléfono", type: "text", placeholder: "Teléfono" },
            ].map(({ name, label, type, placeholder }) => (
              <div className="flex flex-col gap-1" key={name}>
                <label htmlFor={name} className="text-white text-sm font-medium">
                  {label}
                </label>
                <input
                  name={name}
                  type={type}
                  className="bg-neutral-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  onChange={handleChange}
                  placeholder={placeholder}
                />
                {errors[name as keyof IRegisterUser] && (
                  <p className="text-red-500 text-xs">{errors[name as keyof IRegisterUser]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Columna 2 */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="birthdate" className="text-white text-sm font-medium">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                name="birthdate"
                max={new Date().toISOString().split("T")[0]}
                className="bg-neutral-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                onChange={handleChange}
              />
              {errors.birthdate && <p className="text-red-500 text-xs">{errors.birthdate}</p>}
            </div>

            {[
              { name: "password", label: "Contraseña", placeholder: "Contraseña" },
              { name: "confirmPassword", label: "Repetir Contraseña", placeholder: "Repetir contraseña" },
            ].map(({ name, label, placeholder }) => (
              <div className="flex flex-col gap-1" key={name}>
                <label htmlFor={name} className="text-white text-sm font-medium">
                  {label}
                </label>
                <input
                  name={name}
                  type="password"
                  className="bg-neutral-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  onChange={handleChange}
                  placeholder={placeholder}
                />
                {errors[name as keyof IRegisterUser] && (
                  <p className="text-red-500 text-xs">{errors[name as keyof IRegisterUser]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 pt-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-md transition"
          >
            Registrarme
          </button>
          <p className="text-sm text-white text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/signin" className="text-orange-400 hover:text-orange-500">
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
