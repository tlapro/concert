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
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [ticketType, setTicketType] = useState<"all" | "vip" | "common">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  const filteredTickets = tickets.filter((ticket) => {
    const nameEmailMatch =
      ticket.user.name.toLowerCase().includes(search.toLowerCase()) ||
      ticket.user.email.toLowerCase().includes(search.toLowerCase());

    const purchaseDate = new Date(ticket.purchase.purchase_date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const dateMatch =
      (!start || purchaseDate >= start) && (!end || purchaseDate <= end);

    const typeMatch =
      ticketType === "all" || ticket.ticket.type === ticketType;

    return nameEmailMatch && dateMatch && typeMatch;
  });

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  useEffect(() => {
    const fetchTickets = async () => {
      if (!token) return;
      const allTickets = await getAllTickets(token);
      setTickets(allTickets);
    };
    fetchTickets();
  }, [token]);

  return (
    <div className="flex flex-col p-6 mt-4">
      <div className="flex w-[80%] mx-auto">
        <Link href={"/admin"}>
          <IoArrowBackCircle size={30} className="mt-1" />
        </Link>
        <h1 className="text-3xl font-bold mb-8 ml-4">Entradas</h1>
      </div>

      <div className="relative w-full max-w-md mb-6 mx-auto">
        <CiSearch
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
        />
        <input
          type="text"
          placeholder="Buscar por nombre o email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          autoComplete="off"
          className="w-full pl-10 pr-4 py-2 rounded-md bg-neutral-700 text-white focus:outline-none placeholder-gray-400"
        />
      </div>
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-1">Desde</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-neutral-700 text-white px-2 py-1 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-1">Hasta</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-neutral-700 text-white px-2 py-1 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-1">Tipo</label>
          <select
            value={ticketType}
            onChange={(e) => {
              setTicketType(e.target.value as "all" | "vip" | "common");
              setCurrentPage(1);
            }}
            className="bg-neutral-700 text-white px-2 py-1 rounded"
          >
            <option value="all">Todos</option>
            <option value="vip">VIP</option>
            <option value="common">Común</option>
          </select>
        </div>
      </div>


      <div className="flex flex-col gap-4 w-[80%] mx-auto">
        {currentTickets.map(({ id, code, user, ticket, purchase, used }) => (
          <div
            key={id}
            className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 flex justify-between items-center text-white"
          >
            <div className="space-y-1">
              <p className="text-lg font-semibold text-orange-400">
                {user.name}
              </p>
              <p className="text-sm text-gray-300">
                Código:{" "}
                <span className="text-white font-medium">{code}</span>
              </p>
              <p className="text-sm text-gray-400">
                Fecha:{" "}
                {format(new Date(purchase.purchase_date), "dd/MM/yyyy")}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  ticket.type === "vip"
                    ? "bg-purple-700 text-purple-200"
                    : "bg-blue-700 text-blue-200"
                }`}
              >
                {ticket.type.toUpperCase()}
              </span>
              <span
                className={`text-sm font-semibold ${
                  used ? "text-red-400" : "text-green-400"
                }`}
              >
                {used ? "Usada" : "Activa"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-neutral-700 text-gray-300 rounded hover:bg-neutral-600 disabled:opacity-50 transition"
        >
          Anterior
        </button>

        <span className="text-sm text-gray-300">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-neutral-700 text-gray-300 rounded hover:bg-neutral-600 disabled:opacity-50 transition"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
