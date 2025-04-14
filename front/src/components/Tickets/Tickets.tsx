/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useAuth } from "@/context/AuthContext";
import { getTickets } from "@/helpers/getTickets";
import { ITicket } from "@/interfaces/Tickets";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoTicketOutline } from "react-icons/io5";
import TicketCard from "../TicketCard/TicketCard";
import { SelectedTicket } from "@/interfaces/ISelectedTicket";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createMercadoPagoPreference } from "@/helpers/createMercadoPagoPreference";
import { FaCreditCard } from "react-icons/fa";
import Image from "next/image";
import { purchaseTickets } from "@/helpers/purchaseTickets";

export default function Tickets() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const existingTickets = await getTickets(token);
        setTickets(existingTickets);
      } catch (error) {
        console.error("Error al obtener tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token]);

  const handlePurchaseCommon = async () => {
    if (!user || !token) return;
    try {
      const res = await purchaseTickets({  userId: user.id,
        tickets: selectedTickets,
        token,
      });
      toast.success("Compra realizada con exito");
      router.push("/tickets")
    } catch (err) {
      toast.error("Error al comprar las entradas");
  }
}
  const handlePurchase = async () => {
    if (!user || !token) return;
    try {
      const res = await createMercadoPagoPreference({
        userId: user.id,
        tickets: selectedTickets,
        token,
      });

      if (res?.init_point) {
        window.location.href = res.init_point;
      } else {
        toast.error("No se pudo redirigir a Mercado Pago");
      }
    } catch (err) {
      toast.error("Error al iniciar el pago con Mercado Pago");
      console.error(err);
    }
  };

  const total = selectedTickets.reduce((acc, selected) => {
    const ticketInfo = tickets.find((t) => t.id === selected.ticketId);
    if (!ticketInfo) return acc;
    return acc + selected.quantity * ticketInfo.price;
  }, 0);
  if (loading) {
    return (
      <div className="text-center text-white mt-10">Cargando entradas...</div>
    );
  }

  if (!token) {
    return (
      <div>
        <div className="flex justify-center items-center">
          <h1 className="flex text-center font-bold text-4xl p-4 border-b-4 border-neutral-900 w-fit mx-auto mb-10">
            <IoTicketOutline size={40} className="mr-5" />
            Entradas
            <IoTicketOutline size={40} className="ml-5 rotate-90" />
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-lg mb-10 text-neutral-300">
            Debes ingresar a tu cuenta para adquirir entradas para el evento.
          </p>
          <Link href={"/auth/signin"}>
            <button className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-orange-100 transition duration-300 ease-out rounded-xl hover:cursor-pointer shadow-md bg-orange-600 hover:bg-orange-500 hover:scale-[103%] focus:outline-none">
              <span className="absolute inset-0 w-full h-full transition-all duration-700 ease-out transform translate-x-1 translate-y-0 bg-orange-600 group-hover:translate-x-42 group-hover:translate-y-0 rounded-lg"></span>
              <span className="relative text-xl">Ingresá acá</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        <h1 className="flex text-center font-bold text-4xl p-4 border-b-4 border-neutral-900 w-fit mx-auto mb-10">
          <IoTicketOutline size={40} className="mr-5" />
          Entradas
          <IoTicketOutline size={40} className="ml-5 rotate-90" />
        </h1>
      </div>
      <div className="flex flex-col md:flex-row w-[90%] mx-auto justify-center items-center gap-4">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onQuantityChange={(quantity) => {
                setSelectedTickets((prev) => {
                  const exists = prev.find((t) => t.ticketId === ticket.id);
                  if (exists) {
                    if (quantity === 0) {
                      return prev.filter((t) => t.ticketId !== ticket.id);
                    }
                    return prev.map((t) =>
                      t.ticketId === ticket.id ? { ...t, quantity } : t
                    );
                  } else {
                    return [...prev, { ticketId: ticket.id, quantity }];
                  }
                });
              }}
            />
          ))
        ) : (
          <p className="text-neutral-300 mt-10">
            No tenés entradas registradas.
          </p>
        )}
      </div>
      {selectedTickets.length > 0 && (
        <div className="flex flex-col w-[90%] md:w-[20%] justify-center items-center mx-auto mt-10 text-white text-lg font-semibold text-center">
          <div>
            Total a pagar: <span className="text-orange-400">${total}</span>
          </div>
          <button
            onClick={handlePurchase}
            className="mt-5 w-full px-6 py-3 font-bold rounded-xl bg-[#0070ba] text-white hover:bg-[#0062a1] transition duration-300 ease cursor-pointer flex items-center justify-center gap-2"
          >
            <Image
              src="/mercadopago-logo.svg"
              alt="Mercado Pago"
              width={32}
              height={32}
            />
            Pagar con Mercado Pago
          </button>
          <button
             onClick={handlePurchaseCommon}
             className="mt-5 w-full px-6 py-3 font-bold rounded-xl bg-orange-400 hover:bg-orange-600 transition duration-300 ease cursor-pointer"
           >Confirmar Compra </button>
        </div>
      )}
    </div>
  );
}
