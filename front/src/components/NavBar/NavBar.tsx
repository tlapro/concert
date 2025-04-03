"use client"
export default function NavBar() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50">
        <div className="flex w-full bg-neutral-900 items-center justify-between h-16">
          <div className="ml-10 text-xl font-bold">Concierto</div>
          <div className="flex gap-10 mr-20">
            <button onClick={() => scrollToSection("inicio")} className="text-xl cursor-pointer hover:text-orange-400 transition duration-300 ease">
              Inicio
            </button>
            <button onClick={() => scrollToSection("lineup")} className="text-xl cursor-pointer hover:text-orange-400 transition duration-300 ease">
              Line Up
            </button>
            <button onClick={() => scrollToSection("galeria")} className="text-xl cursor-pointer hover:text-orange-400 transition duration-300 ease">
              Galería
            </button>
            <button onClick={() => scrollToSection("entradas")} className="text-xl cursor-pointer hover:text-orange-400 transition duration-300 ease">
              Entradas
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
