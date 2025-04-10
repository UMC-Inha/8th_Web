import { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const stars = Array.from({ length: 50 }, (_, i) => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = 1 + Math.random() * 2;
    const delay = Math.random() * 5;
    return (
      <div
        key={i}
        className="absolute text-white text-sm animate-twinkle"
        style={{
          top: `${y}%`,
          left: `${x}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      >
        ✦
      </div>
    );
  });

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-hidden">
      <div className="relative flex flex-col justify-center items-center text-center h-[calc(100vh-64px)]">
        {stars}

        <h1
          className={`text-5xl font-extrabold z-10 transition-all duration-1000 ease-out 
          ${show ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
        >
          Welcome to study!
        </h1>
      </div>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        .animate-twinkle {
          animation-name: twinkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
