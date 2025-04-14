"use client";
import ImageGalery from "@/components/ImageGalery/ImageGalery";
import LineUp from "@/components/LineUp/LineUp";
import Tickets from "@/components/Tickets/Tickets";

import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const section = document.getElementById(id);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);
  return (
    <div>
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

          <div className="absolute top-1/2 left-1/2 xl:left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4">
            <h1 className="text-5xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Rock Nacional & Festival
            </h1>
            <div className="flex justify-center xl:justify-start mt-4">
              <div className="bg-orange-500 text-base sm:text-lg font-bold p-3 sm:p-4 w-full sm:w-[80%] lg:w-[60%] xl:w-[50%] shadow-2xl">
                <p>Abril 2025, Buenos Aires, Argentina</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 w-full max-w-7xl px-4 sm:px-8 mx-auto justify-center items-start mt-20 gap-10">
          <Image
            src={"https://i.imgur.com/ga4Ap0Q.png"}
            alt="img-concert"
            width={1000}
            height={1000}
            className="w-full h-auto object-cover"
          />
          <div className="flex flex-col justify-start gap-6 text-white w-full">
            <h1 className="text-left font-bold text-3xl sm:text-4xl md:text-5xl">
              Rock Nacional <span className="text-orange-500">&</span> Festival
            </h1>
            <h2 className="text-left text-xl sm:text-2xl text-orange-500">
              Abril 2025, Buenos Aires, Argentina
            </h2>
            <p className="text-base sm:text-lg text-justify">
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
      <section id="entradas" className="scroll-mt-16 mb-10">
        <Tickets />
      </section>
    </div>
  );
}
