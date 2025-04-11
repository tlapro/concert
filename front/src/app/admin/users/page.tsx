"use client";
import UserCard from "@/components/UserCard/UserCard";
import { useAuth } from "@/context/AuthContext";
import { getAllUsers } from "@/helpers/getAllUsers";
import { IUser } from "@/interfaces/IUser";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoArrowBackCircle } from "react-icons/io5";

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const { token } = useAuth();

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    const fetchUsersData = async () => {
      if (!token) {
        return;
      }
      const allUsers = await getAllUsers(token);
      setUsers(allUsers);
      console.log(allUsers);
    };
    fetchUsersData();
  }, [token]);
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 min-h-screen">
      <div className="flex">
        <Link href={"/admin"}>
      <IoArrowBackCircle size={30} className="mt-1"/>
        </Link>
      <h1 className="text-3xl font-bold mb-8 ml-4">Usuarios</h1>
      </div>
      <div className="relative w-full max-w-md mb-6 mx-auto">
        <CiSearch
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
        />
        <input
          type="text"
          placeholder="Buscar por nombre o email"
          name="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-10 pr-4 py-2 rounded-md bg-neutral-700 text-white focus:outline-none placeholder-gray-400"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 px-4 py-2 border-b border-gray-600 text-white font-semibold">
        <span>Nombre</span>
        <span>Email</span>
        <span>Acciones</span>
      </div>

      {currentUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-white">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
