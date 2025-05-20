import { Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const formattedDate = new Date(lp.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform group hover:shadow-2xl hover:scale-105">
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4">
        <h3 className="text-white text-lg font-semibold text-center mb-1">
          {lp.title}
        </h3>
        <p className="text-white text-sm mb-1">{formattedDate}</p>
        <p className="text-white text-sm">❤ {lp.likes.length}</p>
      </div>
    </div>
  );
};

export default LpCard