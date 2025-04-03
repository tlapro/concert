import LineUpCard from "@/components/LineUpCard/LineUpCard";
import {
  lineUpDay1,
  LineUpDay2,
  lineUpDay3,
  lineUpDay4,
} from "@/helpers/LineUp";
import Image from "next/image";

export default function Home() {
  return (
    
    <div>
      {/* Video */}
      <section id="inicio" className="scroll-mt-16">
      <div className="relative w-full h-[600px] overflow-hidden">
        <video
          className="w-full h-full object-cover object-center"
          src="https://edm-festival-musica.netlify.app//video/concierto.mp4" 
          autoPlay
          loop
          muted
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-6xl font-bold">Rock Nacional | Festival</h1>
          <div className="bg-orange-500 text-lg mt-2 font-bold p-4 w-[50%] shadow-2xl">
            <p className="text-lg">Abril 2025, Buenos Aires, Argentina</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 w-[70%] mx-auto justify-center items-start mt-20 gap-10">
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            asperiores excepturi iure, magni sunt quos, at sit soluta a unde
            neque, ipsum facilis cumque quia! Aperiam similique ratione
            laudantium mollitia.
          </p>
        </div>
      </div>
      </section>
      <section id="lineup" className="scroll-mt-16">
        <div className="bg-neutral-950">
          <div className="grid grid-cols-1 md:grid-cols-2 w-[50%] mx-auto justify-center gap-10">
            <div className="bg-orange-400 w-[100%] mx-auto min-h-96 mt-10 mb-10">
              <div className="flex flex-col w-[100%] items-center p-4">
                <h1 className="text-xl font-bold">Dia {lineUpDay1.day}</h1>
                <h2 className="text-lg italic">{lineUpDay1.scenary}</h2>
              </div>
              {lineUpDay1.artists.map((artista) => (
                <LineUpCard
                  key={artista.id}
                  name={artista.name}
                  scenery={artista.scenery}
                  time={artista.time}
                  color={artista.color}
                />
              ))}
            </div>
            <div className="bg-violet-500 w-[100%] mx-auto min-h-96 mt-10 mb-10">
              <div className="flex flex-col w-[100%] items-center p-4">
                <h1 className="text-xl font-bold">Dia {LineUpDay2.day}</h1>
                <h2 className="text-lg italic">{LineUpDay2.scenary}</h2>
              </div>
              {LineUpDay2.artists.map((artista) => (
                <LineUpCard
                  key={artista.id}
                  name={artista.name}
                  scenery={artista.scenery}
                  time={artista.time}
                  color={artista.color}
                />
              ))}
            </div>
            <div className="bg-violet-500 w-[100%] mx-auto min-h-96 mb-10">
              <div className="flex flex-col w-[100%] items-center p-4">
                <h1 className="text-xl font-bold">Dia {lineUpDay3.day}</h1>
                <h2 className="text-lg italic">{lineUpDay3.scenary}</h2>
              </div>
              {lineUpDay3.artists.map((artista) => (
                <LineUpCard
                  key={artista.id}
                  name={artista.name}
                  scenery={artista.scenery}
                  time={artista.time}
                  color={artista.color}
                />
              ))}
            </div>
            <div className="bg-orange-400 w-[100%] mx-auto min-h-96 mb-10">
              <div className="flex flex-col w-[100%] items-center p-4">
                <h1 className="text-xl font-bold">Dia {lineUpDay4.day}</h1>
                <h2 className="text-lg italic">{lineUpDay4.scenary}</h2>
              </div>
              {lineUpDay4.artists.map((artista) => (
                <LineUpCard
                  key={artista.id}
                  name={artista.name}
                  scenery={artista.scenery}
                  time={artista.time}
                  color={artista.color}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
