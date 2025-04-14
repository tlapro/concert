import { IPurchase } from "@/interfaces/IPurchase";
import { Ticket } from "lucide-react";
import Link from "next/link";
import { IoArrowBackCircle } from "react-icons/io5";

interface Props {
  purchase: IPurchase;
}

export default function PurchaseDetail({ purchase }: Props) {
  return (
    <div className="w-full max-w-4xl px-4 mx-auto mt-10 min-h-screen">
      <div className="flex items-center mb-6">
        <Link href="/admin/purchases">
          <IoArrowBackCircle size={30} className="text-white" />
        </Link>
        <h1 className="text-3xl font-bold ml-4 text-white">
          Detalle de Compra
        </h1>
      </div>

      <div className="bg-neutral-900 p-4 sm:p-8 rounded-xl shadow-lg text-white border border-neutral-700">
        <h2 className="text-2xl text-center font-bold mb-2 text-orange-400 border-b border-gray-600 pb-2">
          Compra de {purchase.user.name}
        </h2>

        <p className="text-center text-neutral-500 text-sm">ID: #{purchase.id}</p>

        <div className="grid grid-cols-1 gap-4 text-sm mt-6">
          <div>
            <strong className="text-orange-400">Nombre:</strong>{" "}
            {purchase.user.name}
          </div>
          <div>
            <strong className="text-orange-400">Email:</strong>{" "}
            {purchase.user.email}
          </div>
          {purchase.user.phone && (
            <div>
              <strong className="text-orange-400">Teléfono:</strong>{" "}
              {purchase.user.phone}
            </div>
          )}
          <div>
            <strong className="text-orange-400">Fecha de compra:</strong>{" "}
            {new Date(purchase.purchase_date).toLocaleDateString("es-AR")}
          </div>
          <div>
            <strong className="text-orange-400">Hora de compra:</strong>{" "}
            {new Date(purchase.purchase_date).toLocaleTimeString("es-AR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
        </div>

        {(purchase.quantity_common > 0 || purchase.quantity_vip > 0) && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3 text-orange-400 border-b border-gray-600 pb-1">
              Tickets comprados
            </h3>
            <ul className="space-y-3">
              {purchase.quantity_common > 0 && (
                <li className="bg-neutral-800 rounded-lg p-4 border border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-sm">
                      <strong className="text-orange-400">Tipo de entrada:</strong> Común
                    </p>
                    <p className="text-sm">
                      <strong className="text-orange-400">Cantidad:</strong>{" "}
                      {purchase.quantity_common}
                    </p>
                  </div>
                  <Ticket className="text-orange-400 w-6 h-6 self-end sm:self-auto" />
                </li>
              )}
              {purchase.quantity_vip > 0 && (
                <li className="bg-neutral-800 rounded-lg p-4 border border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-sm">
                      <strong className="text-orange-400">Tipo de entrada:</strong> VIP
                    </p>
                    <p className="text-sm">
                      <strong className="text-orange-400">Cantidad:</strong>{" "}
                      {purchase.quantity_vip}
                    </p>
                  </div>
                  <Ticket className="text-violet-400 w-6 h-6 self-end sm:self-auto" />
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
