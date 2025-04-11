"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPurchaseById } from "@/helpers/getPurchaseById";
import { IPurchase } from "@/interfaces/IPurchase";

import { useAuth } from "@/context/AuthContext";
import PurchaseDetail from "@/components/PurchaseDetail/PurchaseDetail";

export default function PurchaseDetailPage() {
  const [purchase, setPurchase] = useState<IPurchase | null>(null);
  const { token } = useAuth();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    if (!token || !id) return;
    const fetchPurchase = async () => {
      const data = await getPurchaseById(token, id);
      setPurchase(data);
    };
    fetchPurchase();
  }, [id, token]);
  

  if (!purchase) {
    return <p className="text-white text-center mt-10">Cargando...</p>;
  }

  return <PurchaseDetail purchase={purchase} />;
}
