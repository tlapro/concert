"use client";

import { useAuth } from "@/context/AuthContext";
import { changePassword } from "@/helpers/changePassword";
import { changePasswordValidation } from "@/helpers/changePasswordValidation";
import { IChangePassword } from "@/interfaces/IChangePassword";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoArrowBackCircle } from "react-icons/io5";

export default function ChangePassword() {
  const router = useRouter();
  const { token } = useAuth();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState<IChangePassword>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<IChangePassword>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const error = changePasswordValidation(name, value, formData);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("Debes completar todos los campos.");
      return;
    }
    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      toast.error("Corrige los errores para continuar");
      return;
    }
    if (!token) {
      toast.error("Tu sesión caducó, vuelve a ingresar para continuar.");
    }
    const result = await changePassword(token, formData);
    if (!result) return;

    if (result.success) {
      toast.success(result.message);
      router.push("/account");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg-pattern.png')" }}
    >
      <div className="flex justify-center items-center">
        <div className="flex flex-col w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg py-10 px-6 mt-40 mb-20">
        <div className="flex items-center mb-6">
          <Link href="/account">
            <IoArrowBackCircle
              size={28}
              className="text-orange-400 hover:text-orange-300 transition"
            />
          </Link>
          <h1 className="text-2xl font-bold text-white ml-4">Cambiar Contraseña</h1>
        </div>
          <hr className="border border-neutral-800 w-full mb-4" />
          <div className="flex flex-col gap-4">
            <div className="relative">
              <label className="text-sm mb-1 block">Contraseña anterior</label>
              <input
                type={showOld ? "text" : "password"}
                name="oldPassword"
                className="w-full bg-neutral-700 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-orange-400"
                placeholder="Contraseña anterior"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-[35px] cursor-pointer text-xl text-white"
                onClick={() => setShowOld(!showOld)}
              >
                {showOld ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
              {errors.oldPassword && (
                <p className="text-red-500 text-xs">{errors.oldPassword}</p>
              )}
            </div>

            <div className="relative">
              <label className="text-sm mb-1 block">Nueva contraseña</label>
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                className="w-full bg-neutral-700 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-orange-400"
                placeholder="Nueva contraseña"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-[35px] cursor-pointer text-xl text-white"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
              {errors.newPassword && (
                <p className="text-red-500 text-xs">{errors.newPassword}</p>
              )}
            </div>

            <div className="relative">
              <label className="text-sm mb-1 block">Repetir contraseña</label>
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                className="w-full bg-neutral-700 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-orange-400"
                placeholder="Repetir contraseña"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-[35px] cursor-pointer text-xl text-white"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="mt-5 px-6 py-3 font-bold rounded-xl bg-orange-400 hover:bg-orange-600 transition duration-300 ease cursor-pointer"
            >
              Cambiar contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
