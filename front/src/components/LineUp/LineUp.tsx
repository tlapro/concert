import { lineUpDay1, lineUpDay2, lineUpDay3, lineUpDay4 } from "@/helpers/LineUp";
import LineUpCard from "../LineUpCard/LineUpCard";

export default function LineUp () {
    return (
        <>

        <h1 className="text-center font-bold text-4xl p-4 border-b-4 border-neutral-900 w-[10%] mx-auto">Line Up</h1>
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
                <h1 className="text-xl font-bold">Dia {lineUpDay2.day}</h1>
                <h2 className="text-lg italic">{lineUpDay2.scenary}</h2>
              </div>
              {lineUpDay2.artists.map((artista) => (
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
        </>
    )
}