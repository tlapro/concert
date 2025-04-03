export default function LineUpCard({
  name,
  time,
  color,
}: {
  name: string;
  scenery: string;
  time: string;
  color: string;
}) {

  return (
    <div className={`flex w-[100%] justify-between hover:cursor-pointer hover:scale-[103%] transition duration-100 ${color || "bg-gray-500"}`}>

  
      <div className={`p-4`}>{name}</div>
      <div className={`p-4`}>{time}</div>
    </div>
  );
}
