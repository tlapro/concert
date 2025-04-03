import ImageGalery from "@/components/ImageGalery/ImageGalery";
import LineUp from "@/components/LineUp/LineUp";
import Tickets from "@/components/Tickets/Tickets";

import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Video */}
      <section id="inicio" className="scroll-mt-16">
        <div className="relative w-full h-[600px] overflow-hidden">
          <video
            className="w-full h-full object-cover object-center"
            src="/videoBanner.mp4"
            autoPlay
            loop
            muted
          />

          <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-40"></div>

          <div className="absolute top-1/2 left-1/2 md:left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <h1 className="text-6xl font-bold">Rock Nacional & Festival</h1>
            <div className="flex justify-center md:justify-start">
            <div className="bg-orange-500 text-lg mt-2 font-bold p-4 w-[90%] md:w-[50%] shadow-2xl">
              <p className="text-lg">Abril 2025, Buenos Aires, Argentina</p>
            </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-[90%] md:w-[70%] mx-auto justify-center items-start mt-20 gap-10">
          <Image
            src={"https://i.imgur.com/ga4Ap0Q.png"}
            alt="img-concert"
            width={1000}
            height={1000}
          />
          <div className="mt-6 flex flex-col justify-start ml-10 gap-10 w-[80%]">
            <h1 className="text-left font-bold text-5xl">
              Rock Nacional | Festival
            </h1>
            <h2 className="text-left text-2xl text-orange-400 ">
              Abril 2025, Buenos Aires, Argentina
            </h2>
            <p className="text-xl text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus asperiores excepturi iure, magni sunt quos, at sit
              soluta a unde neque, ipsum facilis cumque quia! Aperiam similique
              ratione laudantium mollitia.
            </p>
          </div>
        </div>
      </section>
      <div className="mt-20 h-20 border-t-2 border-neutral-900"></div>
      <section id="lineup" className="scroll-mt-16">
        <LineUp />
        <div className="mt-20 h-20 border-t-2 border-neutral-900"></div>
      </section>
      <section id="galeria" className="scroll-mt-16">
        <ImageGalery />
      </section>
      <div className="mt-20 h-20 border-t-2 border-neutral-900"></div>
      <section id="entradas" className="scroll-mt-16">
        <Tickets />
      </section>
    </div>
  );
}
