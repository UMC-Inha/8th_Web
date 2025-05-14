import { Lp } from "../../types/lp";
import { useNavigate } from "react-router-dom";

interface LpCardProps {
  lp: Lp;
}

export const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/lp/${lp.id}`)}
      className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer
      hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-48"
      />
      <div
        className="absolute inset-0 bg-gray bg-opacity-0 text-white 
      opacity-0 hover:bg-gradient-to-t from-black to-transparent 
      transition duration-100 hover:opacity-100 flex flex-col 
      justify-end p-4"
      >
        <div>
          <h3 className="text-sm font-semibold">{lp.title}</h3>
          <p className="text-xs">
            {new Date(lp.createdAt).toLocaleDateString()}
          </p>
          <p className="text-xs">❤️{lp.likes.length ?? 0}</p>
        </div>
      </div>
    </div>
  );
};
