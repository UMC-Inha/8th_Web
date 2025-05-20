import { Lp } from "../types/lp";
import { useNavigate } from "react-router-dom";

interface Props {
  lp: Lp;
  isLoggedIn: boolean;
}

const LpCard = ({ lp, isLoggedIn }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLoggedIn) {
      if (window.confirm("로그인이 필요한 기능입니다. 로그인하시겠습니까?")) {
        navigate("/login");
      }
      return;
    }
    navigate(`/lps/${lp.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer overflow-hidden rounded shadow hover:scale-[1.02] transition-transform duration-200 group bg-zinc-900"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-[200px] object-cover will-change-transform"
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/200x200?text=No+Image";
        }}
      />

      <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex flex-col justify-center items-center text-center p-2">
        <h3 className="text-lg font-bold mb-1">{lp.title}</h3>
        <p className="text-sm mb-1">{new Date(lp.createdAt).toLocaleDateString()}</p>
        <span className="text-sm">❤️ {lp.likes.length}</span>
      </div>
    </div>
  );
};

export default LpCard;
