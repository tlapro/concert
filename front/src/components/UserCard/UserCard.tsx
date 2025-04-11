"use client"
import { IUser } from "@/interfaces/IUser";
import { useRouter } from "next/navigation";
interface UserCardProps {
  user: IUser;
}
export default function UserCard({ user }: UserCardProps) {
    const router = useRouter();

  const handleDetails = () => {
    router.push(`/admin/users/${user.id}`);
  };

  return (
    <div className="grid grid-cols-3 gap-4 px-4 py-2 border-b border-gray-700 text-white items-center">
      <span>{user.name}</span>
      <span>{user.email}</span>
      <button
        onClick={handleDetails}
        className="bg-orange-400 hover:bg-orange-500 trnasition cursor-pointer text-white px-3 py-1 rounded"
      >
        Ver detalles
      </button>
    </div>
  );
}
