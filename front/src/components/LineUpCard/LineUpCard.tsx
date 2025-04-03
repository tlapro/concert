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
    <div className={`flex bg-${color} justify-between w-[100%] hover:cursor-pointer hover:scale-[103%] transition duration-100 `}>
  
      <div className={`p-4`}>{name}</div>
      <div className={`p-4`}>{time}</div>
    </div>
  );
}
