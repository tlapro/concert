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
    <div className="overflow-x-auto">
<table className="w-full mx-auto table-auto">
  <thead>
    <tr className="bg-neutral-800 text-left text-sm">
      <th className="px-4 py-2 min-w-[150px]">Usuario</th>
      <th className="px-4 py-2 min-w-[200px]">Email</th>
      <th className="px-4 py-2 w-[80px]">Común</th>
      <th className="px-4 py-2 w-[80px]">VIP</th>
      <th className="px-4 py-2 min-w-[120px]">Fecha</th>
      <th className="px-4 py-2 min-w-[120px]">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {purchases.map((purchase) => (
      <tr key={purchase.id} className="border-b border-neutral-700 text-sm">
        <td className="px-4 py-2">{purchase.user.name}</td>
        <td className="px-4 py-2 truncate">{purchase.user.email}</td>
        <td className="px-4 py-2 text-center">{purchase.quantity_common}</td>
        <td className="px-4 py-2 text-center">{purchase.quantity_vip}</td>
        <td className="px-4 py-2">{new Date(purchase.purchase_date).toLocaleDateString("es-AR")}</td>
        <td className="px-4 py-2">
          <Link href={`/admin/compras/${purchase.id}`}>
            <button className="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 rounded transition text-sm cursor-pointer">
              Ver Detalle
            </button>
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>


<div className="flex justify-center items-center gap-4 mt-4">
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
