"use client";
import UserTicketCard from "@/components/UserTicketCard/UserTicketCard";
import { useAuth } from "@/context/AuthContext";
import { getUserTickets } from "@/helpers/getUserTickets";
import { IUserTicket } from "@/interfaces/IUserTicket";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";

export default function Tickets() {
  const router = useRouter();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tickets, setTickets] = useState<IUserTicket[]>([]);

  const scrollOrNavigate = (id: string) => {
    const isHome = window.location.pathname === "/";

    if (isHome) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  useEffect(() => {
    const fetchUserTickets = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const userTickets = await getUserTickets(token);
        setTickets(userTickets);
      } catch (err) {
        console.error("Error al obtener tus entradas:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTickets();
  }, [token]);

  if (isLoading) {
    return (
      <div className="text-center text-white mt-10">Cargando entradas...</div>
    );
  }

  if (!token) {
    return (
      <div className="flex justify-center items-center text-white mt-10">
        Debes ingresar a tu cuenta para ver tus entradas.
      </div>
    );
  }
  
  if (tickets.length === 0) {
    return (
      <div className="flex justify-center items-center text-white mt-20 mb-20 text-lg font-semibold text-center px-4">
        <p>
          Todavía no tienes entradas. Puedes adquirirlas{" "}
          <button
            onClick={() => scrollOrNavigate("entradas")}
            className="text-orange-400 hover:text-orange-600 transition cursor-pointer"
          >
            aquí
          </button>
        </p>
      </div>
    );
  }

  const vipTickets = tickets.filter((t) => t.ticket.type === "vip");
  const commonTickets = tickets.filter((t) => t.ticket.type === "common");

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg-pattern.png')" }}>
      <div className="flex flex-col p-6 min-h-screen mt-5">
        <div className="flex items-start justify-start mb-6 w-[90%] md:w-full mx-auto">
          <Link href="/account">
            <IoArrowBackCircle
              size={28}
              className="text-orange-400 hover:text-orange-300 transition"
            />
          </Link>
          <h1 className="text-2xl font-bold text-white ml-4">Tus Entradas</h1>
        </div>

        <div className="flex flex-col items-center p-6 min-h-screen  mt-5">

          {vipTickets.length > 0 && (
            <div className="w-full max-w-5xl bg-neutral-900 p-4 border-2 border-neutral-700 rounded-2xl mb-10">
              <hr className="border-[1px] border-neutral-800 w-full mb-10" />
              <h2 className="text-2xl text-purple-400 font-bold mb-4 text-center">
                Entradas VIP
              </h2>
              <hr className="border-[1px] border-neutral-800 w-full mt-10 mb-5" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
                {vipTickets.map((ticket) => (
                  <UserTicketCard key={ticket.id} userTicket={ticket} />
                ))}
              </div>
              <hr className="border-[1px] border-neutral-800 w-full mt-5" />
            </div>
          )}

          {commonTickets.length > 0 && (
            <div className="w-full max-w-5xl bg-neutral-900 p-4 border-2 border-neutral-700 rounded-2xl">
              <h2 className="text-2xl text-orange-400 font-bold mb-4 mt-2 text-center">
                Entradas Comunes
              </h2>
              <hr className="border-[1px] border-neutral-800 w-full mt-10 mb-5" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
                {commonTickets.map((ticket) => (
                  <UserTicketCard key={ticket.id} userTicket={ticket} />
                ))}
              </div>
              <hr className="border-[1px] border-neutral-800 w-full mt-5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
