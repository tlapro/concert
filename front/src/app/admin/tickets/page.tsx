"use client";

import { useAuth } from "@/context/AuthContext";
import { getAllTickets } from "@/helpers/getAllTickets";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { IUserTicketAdmin } from "@/interfaces/IUserTicketAdmin";
import { IoArrowBackCircle } from "react-icons/io5";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

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
    <div className="flex flex-col p-6 mt-4">
            <div className="flex">
        <Link href={"/admin"}>
      <IoArrowBackCircle size={30} className="mt-1"/>
        </Link>
      <h1 className="text-3xl font-bold mb-8 ml-4">Tickets</h1>
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="false"
                className="w-full pl-10 pr-4 py-2 rounded-md bg-neutral-700 text-white focus:outline-none placeholder-gray-400"
              />
            </div>
        

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mx-auto">
        {filteredTickets.map(({ id, code, user, ticket, purchase, used }) => (
          <div
            key={id}
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 text-sm text-white space-y-2"
          >
            <div className="flex justify-between">
              <span className="text-orange-400 font-semibold">{user.name}</span>
              <span
                className={`text-md px-2 py-1 rounded-full ${
                  ticket.type === "vip"
                    ? "bg-purple-700 text-purple-200"
                    : "bg-blue-700 text-blue-200"
                }`}
              >
                {ticket.type.toUpperCase()}
              </span>
            </div>

            <div>
              <p className="text-md text-gray-400">{user.email}</p>
              <p className="text-md text-gray-400">
                Código: <span className="text-white font-medium">{code}</span>
              </p>
            </div>

            <div className="flex justify-between text-md">
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
