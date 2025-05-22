import { useNavigate } from "react-router-dom";
import { Lp } from "../types/lp";

export const LpCard = ({ lp }: { lp: Lp }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/lp/${lp.id}`)}
      className="relative cursor-pointer rounded overflow-hidden transform hover:scale-105 transition duration-300"
    >
      <img
        src={lp.thumbnail || "https://picsum.photos/600/400"}
        alt={lp.title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-gray bg-opacity-0 text-white opacity-0 hover:bg-gradient-to-t from-black to-transparent transition duration-100 hover:opacity-100 flex flex-col justify-end p-4">
        <div>
          <h3 className="text-lg font-bold">{lp.title}</h3>
          <p>{new Date(lp.createdAt).toLocaleDateString()}</p>
          <p>❤️ {lp.likes.length}</p>
        </div>
      </div>
    </div>
  );
};
