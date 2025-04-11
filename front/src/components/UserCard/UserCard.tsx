"use client"
import { IUser } from "@/interfaces/IUser";
import { useRouter } from "next/navigation";
interface UserCardProps {
  user: IUser;
}
export default function UserCard({ user }: UserCardProps) {
    const router = useRouter();
  const formatedBirthdate = new Date(user.birthdate)
    .toISOString()
    .split("T")[0];
  const formatedCreatedAt = user.createdAt.split("T").join(" ");

  const handleDetails = () => {
    router.push(`/users/${user.id}`);
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
// {
//     "id": "e2a91fd7-1bcf-4ec1-8bf1-ad3733cdfe33",
//     "name": "Tomas",
//     "email": "tester@gmail.com",
//     "password": "$2b$10$XuYiNJsYDf5CvGbIp64Of.bT68X4rTomhNVifEJkHIVAeCUiLJH9W",
//     "birthdate": "2000-04-20T03:00:00.000Z",
//     "phone": "3777686085",
//     "imgUser": "https://i.imgur.com/fEtaWXr.png",
//     "role": {
//         "id": 2,
//         "name": "admin"
//     },
//     "isActive": true,
//     "createdAt": "2025-04-09T21:05:45.970Z"
// }
