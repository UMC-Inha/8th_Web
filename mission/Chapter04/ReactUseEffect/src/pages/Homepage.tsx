import { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen flex flex-col justify-center items-center text-center bg-white dark:bg-gray-900 overflow-hidden">
      {/* 🎬 배경 이모지 */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10 text-[200px] pointer-events-none select-none">
        🎬🎬🎬🎬🎬
      </div>

      {/* 메인 텍스트 */}
      <h1
        className={`text-4xl font-bold z-10 transition-all duration-1000 ease-out 
        ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
      >
        Let's Movie info~
      </h1>

      <p
        className={`mt-4 text-lg text-gray-600 dark:text-gray-300 z-10 transition-all duration-1000 ease-out delay-200 
        ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}
      >
        여기에서 다양한 영화 정보와 콘텐츠를 확인할 수 있습니다.
      </p>
    </div>
  );
};

export default HomePage;
