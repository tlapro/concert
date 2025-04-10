"use client";
import UserTicketCard from "@/components/UserTicketCard/UserTicketCard";
import { useAuth } from "@/context/AuthContext";
import { getUserTickets } from "@/helpers/getUserTickets";
import { IUserTicket } from "@/interfaces/IUserTicket";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Tickets() {
  const router = useRouter()
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
  }

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
        Todavía no tienes entradas. Puedes adquirirlas <button onClick={() => scrollOrNavigate("entradas")} className="text-orange-400 hover:text-orange-600 transition cursor-pointer">aquí</button>
        </p>
      </div>
    )
  }

  const vipTickets = tickets.filter((t) => t.ticket.type === "vip");
  const commonTickets = tickets.filter((t) => t.ticket.type === "common");

  return (
    <div className="flex flex-col items-center p-6">
      {vipTickets.length > 0 && (
        <div className="w-full max-w-5xl mb-8">
          <h2 className="text-2xl text-purple-400 font-bold mb-4 text-center">
            Entradas VIP
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
            {vipTickets.map((ticket) => (
              <UserTicketCard key={ticket.id} userTicket={ticket} />
            ))}
          </div>
        </div>
      )}

      {commonTickets.length > 0 && (
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl text-orange-400 font-bold mb-4 text-center">
            Entradas Comunes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
            {commonTickets.map((ticket) => (
              <UserTicketCard key={ticket.id} userTicket={ticket} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
