export default function Tickets() {
  return (
    <div>
      <h1 className="text-center font-bold text-4xl p-4 border-b-4 border-neutral-900 w-[10%] mx-auto mb-10">
        Entradas
      </h1>
        <div className="flex justify-center items-center">
            <button className="bg-orange-500 p-4 rounded-xl cursor-pointer hover:bg-orange-600 transition duration-300">
                <h1 className="font-bold text-xl">Comprar Entradas</h1>
            </button>
        </div>
    </div>
  );
}
