"use client";

import { useAuth } from "@/context/AuthContext";
import { getAllTickets } from "@/helpers/getAllTickets";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { IUserTicketAdmin } from "@/interfaces/IUserTicketAdmin";

export default function Tickets() {
  const { token } = useAuth();
  const [tickets, setTickets] = useState<IUserTicketAdmin[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      if (!token) return;
      const allTickets = await getAllTickets(token);
      setTickets(allTickets);
    };
    fetchTickets();
  }, [token]);

  const filteredTickets = tickets.filter((ticket) =>
    ticket.user.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Buscar por nombre de usuario..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full p-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder:text-gray-400"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTickets.map(({ id, code, user, ticket, purchase, used }) => (
          <div
            key={id}
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 text-sm text-white space-y-2"
          >
            <div className="flex justify-between">
              <span className="text-orange-400 font-semibold">{user.name}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  ticket.type === "vip"
                    ? "bg-purple-700 text-purple-200"
                    : "bg-blue-700 text-blue-200"
                }`}
              >
                {ticket.type.toUpperCase()}
              </span>
            </div>

            <div>
              <p className="text-xs text-gray-400">{user.email}</p>
              <p className="text-xs text-gray-400">
                Código: <span className="text-white font-medium">{code}</span>
              </p>
            </div>

            <div className="flex justify-between text-xs">
              <span>
                <strong>Comprado:</strong>{" "}
                {format(new Date(purchase.purchase_date), "dd/MM/yyyy")}
              </span>
              <span
                className={`font-semibold ${
                  used ? "text-red-400" : "text-green-400"
                }`}
              >
                {used ? "Usada" : "Activa"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
