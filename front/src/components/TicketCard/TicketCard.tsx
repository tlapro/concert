"use client";
import { ITicket } from "@/interfaces/Tickets";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  ticket: ITicket;
  onQuantityChange: (quantity: number) => void;
}

export default function TicketCard({ ticket, onQuantityChange }: Props) {
  const [quantity, setQuantity] = useState<number>(0);

  const handleIncrement = () => {
    if (quantity === 5) {
      toast.error("No puedes comprar más de 5 entradas.")
      return;
    }
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(0, quantity - 1);
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

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
            {ticket.type === "vip" ? "VIP" : "COMÚN"}
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
        <div className="flex items-center justify-between gap-2 mt-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleDecrement}
              className="rounded-full bg-neutral-600 py-1 px-3 hover:scale-105 cursor-pointer transition duration-200 ease"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={handleIncrement}
              className="rounded-full bg-orange-400 py-1 px-3 hover:scale-110 cursor-pointer transition duration-200 ease"
            >
              +
            </button>
          </div>
          <span className="text-sm text-neutral-400">
            Total: ${ticket.price * quantity}
          </span>
        </div>
      </div>
    </div>
  );
}
