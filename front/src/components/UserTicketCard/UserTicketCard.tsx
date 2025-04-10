import { IUserTicket } from "@/interfaces/IUserTicket";
import { useState } from "react";
import UserTicketModal from "../UserTicketModal/UserTicketModal";


interface Props {
  userTicket: IUserTicket;
}

export default function UserTicketCard({ userTicket }: Props) {
  const [showModal, setShowModal] = useState(false);
  const { code, ticket } = userTicket;

  return (
    <>
      <div
        className="bg-neutral-900 border border-neutral-700 rounded-xl hover:border-orange-400 cursor-pointer transition duration-300 ease p-4 text-white shadow-md w-full"
        onClick={() => setShowModal(true)}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-md font-bold">Entrada #{code.split("-")[1]}</h2>
            <p className="text-xs text-neutral-400">| Código: {code} |</p>
          </div>
          <span
            className={`px-3 py-0.5 text-xs rounded-full ${
              ticket.type === "vip" ? "bg-purple-600" : "bg-orange-400"
            }`}
          >
            {ticket.type.toUpperCase()}
          </span>
        </div>
      </div>

      {showModal && (
        <UserTicketModal ticket={userTicket} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
