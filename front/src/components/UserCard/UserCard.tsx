"use client";
import { IUser } from "@/interfaces/IUser";
import { useRouter } from "next/navigation";
interface UserCardProps {
  user: IUser;
}
export default function UserCard({ user }: UserCardProps) {
  const emailToShow = user.isActive
    ? user.email.split("(**deleted-")[0]
    : "Usuario eliminado";
  const router = useRouter();

  const handleDetails = () => {
    router.push(`/admin/users/${user.id}`);
  };

  return (
    <div className="border-b border-gray-700 text-white px-4 py-3 md:grid md:grid-cols-4 gap-4 flex flex-col md:flex-none">
      <div>
        <span className="md:hidden text-xs text-neutral-400">Nombre: </span>
        <span>{user.name}</span>
      </div>
      <div>
        <span className={user.isActive ? "" : "text-red-400 italic"}>
          {emailToShow}
        </span>
      </div>
      <div>
        {" "}
        <span className={user.isActive ? "text-green-500 text-center" : "text-red-500 text-center"}>{user.isActive ? "Activo" : "Eliminado"}</span>
      </div>
      <div className="mt-2 md:mt-0">
        <button
          onClick={handleDetails}
          className="w-full md:w-[50%] bg-orange-400 hover:bg-orange-500 transition text-white px-3 py-1 rounded"
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
}
