"use client";
import UserCard from "@/components/UserCard/UserCard";
import { useAuth } from "@/context/AuthContext";
import { getAllUsers } from "@/helpers/getAllUsers";
import { IUser } from "@/interfaces/IUser";
import { useEffect, useState } from "react";

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
      <input
        type="text"
        placeholder="Buscar por nombre o email"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4 px-3 py-2 rounded bg-neutral-700 text-white w-full max-w-md"
      />
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
