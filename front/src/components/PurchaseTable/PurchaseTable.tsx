import { IPurchase } from "@/interfaces/IPurchase";
import Link from "next/link";

interface Props {
  purchases: IPurchase[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PurchaseTable({
  purchases,
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto hidden md:table">
        <thead>
          <tr className="bg-neutral-800 text-left text-sm text-white">
            <th className="px-4 py-2 min-w-[150px]">Usuario</th>
            <th className="px-4 py-2 min-w-[200px]">Email</th>
            <th className="px-4 py-2 w-[80px] text-center">Común</th>
            <th className="px-4 py-2 w-[80px] text-center">VIP</th>
            <th className="px-4 py-2 min-w-[120px] text-center">Fecha</th>
            <th className="px-4 py-2 min-w-[120px] text-center">Hora</th>
            <th className="px-4 py-2 min-w-[120px] text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr
              key={purchase.id}
              className="border-b border-neutral-700 text-sm text-white"
            >
              <td className="px-4 py-2">{purchase.user.name}</td>
              <td className="px-4 py-2 truncate">{purchase.user.email}</td>
              <td className="px-4 py-2 text-center">{purchase.quantity_common}</td>
              <td className="px-4 py-2 text-center">{purchase.quantity_vip}</td>
              <td className="px-4 py-2 text-center">
                {new Date(purchase.purchase_date).toLocaleDateString("es-AR")}
              </td>
              <td className="px-4 py-2 text-center">
                {new Date(purchase.purchase_date).toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              <td className="px-4 py-2 text-center">
                <Link href={`/admin/purchases/${purchase.id}`}>
                  <button className="bg-orange-400 hover:bg-orange-600 text-white px-3 py-1 rounded transition text-sm cursor-pointer">
                    Ver Detalle
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col gap-4 md:hidden mt-4">
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="bg-neutral-800 rounded p-4 text-white text-sm flex flex-col gap-2 shadow-sm border border-neutral-700"
          >
            <div>
              <span className="font-semibold">Usuario:</span>{" "}
              {purchase.user.name}
            </div>
            <div>
              <span className="font-semibold">Email:</span>{" "}
              {purchase.user.email}
            </div>
            <div>
              <span className="font-semibold">Entradas Común:</span>{" "}
              {purchase.quantity_common}
            </div>
            <div>
              <span className="font-semibold">Entradas VIP:</span>{" "}
              {purchase.quantity_vip}
            </div>
            <div>
              <span className="font-semibold">Fecha:</span>{" "}
              {new Date(purchase.purchase_date).toLocaleDateString("es-AR")}
            </div>
            <div>
              <span className="font-semibold">Hora:</span>{" "}
              {new Date(purchase.purchase_date).toLocaleTimeString("es-AR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
            <div className="mt-2">
              <Link href={`/admin/purchases/${purchase.id}`}>
                <button className="bg-orange-400 hover:bg-orange-600 text-white px-3 py-1 rounded transition text-sm w-full">
                  Ver Detalle
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded text-sm bg-neutral-700 text-gray-300 hover:bg-neutral-600 disabled:opacity-50 transition"
        >
          Anterior
        </button>

        <span className="text-sm text-gray-300">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded text-sm bg-neutral-700 text-gray-300 hover:bg-neutral-600 disabled:opacity-50 transition"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
