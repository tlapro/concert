"use client";

import { useAuth } from "@/context/AuthContext";
import { getUserById } from "@/helpers/getUserById";
import { IUserDetail, IUserPurchase } from "@/interfaces/IUserDetail";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";

export default function UserDetail() {
  const { token } = useAuth();
  const { id } = useParams();
  const userId = id as string;

  const [userData, setUserData] = useState<IUserDetail | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      const user = await getUserById(token, userId);
      setUserData(user);
    };

    fetchUserData();
  }, [token, userId]);

  if (!userData) {
    return <div className="text-white p-6">Cargando datos del usuario...</div>;
  }

  const formattedBirthdate = new Date(userData.birthdate).toLocaleDateString();
  const formattedCreatedAt = new Date(userData.createdAt).toLocaleDateString();

  return (
    <div className="text-white p-6 max-w-5xl mx-auto min-h-screen mt-4">
      <div className="flex">
        <Link href={"/admin/users"}>
      <IoArrowBackCircle size={30} className="mt-1"/>
        </Link>
      <h1 className="text-3xl font-bold mb-8 ml-4">Detalles del Usuario</h1>
      </div>
      <div className="flex justify-center gap-6 bg-neutral-800 border border-neutral-700 rounded-sm p-4 shadow-lg">
      <h1 className="text-3xl font-bold text-orange-400 mb-8{">{userData.name}</h1>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-800 border border-neutral-700 rounded-sm p-6 shadow-lg mb-10">
        <div className="space-y-2 text-base">
          <p className="grid grid-cols-1 sm:grid-cols-2 w-[80%] justify-around">
            <span className="text-orange-400 font-medium">Nombre:</span> {userData.name}
          </p>
          <p className="grid grid-cols-1 sm:grid-cols-2 w-[80%] justify-around">
            <span className="text-orange-400 font-medium">Email:</span> {userData.email}
          </p>
          <p className="grid grid-cols-1 sm:grid-cols-2 w-[80%] justify-around">
            <span className="text-orange-400 font-medium">Teléfono:</span> {userData.phone}
          </p>
          </div>
          <div className="space-y-2 text-base">
          <p className="grid grid-cols-1 sm:grid-cols-2 w-[80%] justify-around">
            <span className="text-orange-400 font-medium">Nacimiento:</span> {formattedBirthdate}
          </p>
          <p className="grid grid-cols-1 sm:grid-cols-2 w-[80%] justify-around">
            <span className="text-orange-400 font-medium">Registrado el:</span> {formattedCreatedAt}
          </p>
          <p className="grid grid-cols-1 sm:grid-cols-2 w-[80%] justify-around">
            <span className="text-orange-400 font-medium">Estado:</span>{" "}
            {userData.isActive ? "Activo" : "Inactivo"}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-orange-400 mb-4">Compras Realizadas</h2>

      {userData.purchases.length === 0 ? (
        <p className="text-gray-400">Este usuario no ha realizado ninguna compra.</p>
      ) : (
        <div className="grid gap-4">
          {userData.purchases.map((purchase: IUserPurchase) => (
            <div
              key={purchase.id}
              className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 shadow-md"
            >
              <p className="text-sm text-gray-400 mb-1">ID: {purchase.id}</p>
              <p>
                <span className="text-orange-400">Fecha:</span>{" "}
                {new Date(purchase.purchase_date).toLocaleString()}
              </p>
              <p>
                <span className="text-orange-400">Entradas Comunes:</span> {purchase.quantity_common}
              </p>
              <p>
                <span className="text-orange-400">Entradas VIP:</span> {purchase.quantity_vip}
              </p>
              <p>
                <span className="text-orange-400">Estado:</span>{" "}
                {purchase.state ? "Confirmada" : "Pendiente"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
