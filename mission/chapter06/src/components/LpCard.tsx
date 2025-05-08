import { useNavigate } from "react-router-dom";
import "./LpCard.css";

interface LPCardProps {
  lp: {
    id: number;
    title: string;
    thumbnail: string;
    createdAt: string;
    likes: { id: number }[];
  };
}

const LPCard = ({ lp }: LPCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lps/${lp.id}`);
  };

  const formattedDate = new Date(lp.createdAt).toLocaleDateString("ko-KR");

  return (
    <div className="lp-card" onClick={handleClick}>
      <div className="lp-card-image-wrapper">
        <img src={lp.thumbnail} alt={lp.title} className="lp-card-image" />
        <div className="lp-card-overlay">
          <div className="lp-card-title">{lp.title}</div>
          <div className="lp-card-meta">
            <span>{formattedDate}</span>
            <span>❤️ {lp.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LPCard;
