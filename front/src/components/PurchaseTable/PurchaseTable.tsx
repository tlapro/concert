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
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition text-sm cursor-pointer">
              Ver Detalle
            </button>
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      <div className="flex justify-center mt-4 gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-orange-500 text-white"
                : "bg-neutral-700 text-gray-300 hover:bg-neutral-600"
            }`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
