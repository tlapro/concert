"use client";

import PurchaseTable from "@/components/PurchaseTable/PurchaseTable";
import { useAuth } from "@/context/AuthContext";
import { getAllPurchases } from "@/helpers/getAllPurchases";
import { IPurchase } from "@/interfaces/IPurchase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoArrowBackCircle } from "react-icons/io5";

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<IPurchase[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { token } = useAuth();
  const purchasesPerPage = 10;

  const filteredPurchases = purchases.filter(
    (purchase) =>
      purchase.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPurchases.length / purchasesPerPage);
  const indexOfLastUser = currentPage * purchasesPerPage;
  const indexOfFirstUser = indexOfLastUser - purchasesPerPage;
  const currentUsers = filteredPurchases.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  useEffect(() => {
    const fetchUsersData = async () => {
      if (!token) return;
      const allPurchases = await getAllPurchases(token);
      setPurchases(allPurchases);
    };
    fetchUsersData();
  }, [token]);


  return (
    <div className="w-[80%] mx-auto p-6">
      <div className="flex">
        <Link href={"/admin"}>
          <IoArrowBackCircle size={30} className="mt-1" />
        </Link>
        <h1 className="md:text-3xl font-bold mb-8 ml-4">Compras de Usuarios</h1>
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md bg-neutral-700 text-white focus:outline-none placeholder-gray-400"
              />
            </div>

      <PurchaseTable
        purchases={currentUsers}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
