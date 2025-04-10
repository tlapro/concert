
import { useAuth } from "@/context/AuthContext";
import { IUserTicket } from "@/interfaces/IUserTicket";
import { QRCodeCanvas } from "qrcode.react";

interface Props {
  ticket: IUserTicket;
  onClose: () => void;
}

export default function UserTicketModal({ ticket, onClose }: Props) {
  const { user } = useAuth()
  if (!user) return null;
  const { name, email, birthdate} = user;
  const { code, used, ticket: eventTicket } = ticket;
  
  const qrData = JSON.stringify({
    code,
    name,
    email,
    birthdate: new Date(birthdate).toLocaleDateString("es-AR"),
  });
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
      <div className="relative bg-neutral-900 border border-neutral-700 rounded-2xl shadow-xl max-w-md w-full p-6 text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-neutral-400 hover:text-white transition cursor-pointer"
          aria-label="Cerrar"
        >
          &times;
        </button>

        <h2 className={`text-3xl font-extrabold ${eventTicket.type === "vip" ? "text-violet-600" : "text-orange-400"} text-center mb-1`}>
          Entrada #{code.split("-")[1]}
        </h2>
        <p className="text-center text-sm text-neutral-400 mb-4 break-words">
          Código completo: {code}
        </p>

        <div className="flex justify-center mb-6">
          <QRCodeCanvas value={qrData} size={180} bgColor="#000" fgColor="#fff" />
        </div>

        <div className="space-y-3 text-sm">
          <Detail label="Fecha" value={new Date(eventTicket.event_date).toLocaleDateString()} />
          <Detail label="Tipo" value={eventTicket.type === "vip" ? "VIP" : "Común"} />
          <Detail label="Precio" value={`$${eventTicket.price}`} />
          <Detail
            label="Estado"
            value={
              <span className={used ? "text-red-500" : "text-green-400"}>
                {used ? "Usada" : "Disponible"}
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between border-b border-neutral-800 pb-2">
      <span className="text-neutral-400 font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
