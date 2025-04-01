export default function Home() {
  return (
    <div>
      {/* Video */}
      <div className="relative w-full h-[600px] overflow-hidden">
        <video
          className="w-full h-full object-cover object-center"
          src="https://edm-festival-musica.netlify.app//video/concierto.mp4" // Reemplaza con el link de tu video
          autoPlay
          loop
          muted
        />

        {/* Capa de opacidad */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

        {/* Contenido sobre el video */}
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-6xl font-bold">Rock Nacional | Festival</h1>
          <div className="bg-violet-600 text-lg mt-2 font-bold p-4 w-[50%] shadow-2xl">
          <p className="text-lg">Abril 2025, Buenos Aires, Argentina</p>
          </div>
        </div>
      </div>
      {/* Line Up */}
    </div>
  );
}
