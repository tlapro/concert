"use client";
import { ITicket } from "@/interfaces/Tickets";

interface Props {
  ticket: ITicket;
}

export default function TicketCard({ ticket }: Props) {
  return (
    <div className="w-full max-w-md p-4 bg-neutral-900 text-white border border-orange-500 shadow-md rounded-2xl mb-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Entrada {ticket.type === "vip" ? "VIP" : "Común"}
          </h2>
          <span
            className={`${
              ticket.type === "vip" ? "bg-purple-600" : "bg-orange-600"
            } text-white text-sm font-medium px-3 py-1 rounded-full`}
          >
            {ticket.type.toUpperCase()}
          </span>
        </div>
        <p className="text-sm text-neutral-300">
          Fecha del evento:{" "}
          <span className="font-medium text-white">
            {new Date(ticket.event_date).toLocaleDateString()}
          </span>
        </p>
        <p className="text-lg font-bold text-orange-400">
          Precio: ${ticket.price}
        </p>
      </div>
    </div>
  );
}
