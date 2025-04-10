import { IUserTicket } from "@/interfaces/IUserTicket";
import { QRCodeCanvas } from "qrcode.react";

interface Props {
  userTicket: IUserTicket;
}

export default function UserTicketCard({ userTicket }: Props) {
  const { code, used, ticket } = userTicket;

  const qrData = JSON.stringify({ code });

  return (
    <div className="bg-neutral-900 border border-orange-500 rounded-2xl p-6 text-white shadow-lg w-full max-w-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Entrada #{code.split("-")[1]}</h2>
          <p className="text-sm text-neutral-400 mt-1">Código completo: {code}</p>
        </div>
        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            ticket.type === "vip" ? "bg-purple-600" : "bg-orange-600"
          }`}
        >
          {ticket.type.toUpperCase()}
        </span>
      </div>

      <div className="mb-4 space-y-1">
        <p className="text-sm text-neutral-300">
          Fecha del evento:{" "}
          <span className="text-white font-medium">
            {new Date(ticket.event_date).toLocaleDateString()}
          </span>
        </p>
        <p className="text-lg font-bold text-orange-400">
          Precio: ${ticket.price}
        </p>
        <p className="text-sm">
          Estado:{" "}
          <span className={used ? "text-red-500" : "text-green-500 font-semibold"}>
            {used ? "Usada" : "Disponible"}
          </span>
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 mt-4">
        <QRCodeCanvas value={qrData} size={132} bgColor="#000000" fgColor="#FFA500" className="border-10 border-black" />
        <p className="text-xs text-neutral-400 mt-1">Mostrá este código para entrar al evento</p>
      </div>
    </div>
  );
}
