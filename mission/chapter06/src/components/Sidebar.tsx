import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="min-h-[calc(101vh-4rem)] bg-gray-200 dark:bg-gray-800 dark:text-white shadow-md flex flex-col justify-between py-4 px-4">
      <div className="space-y-4">
        <Link
          to={"/search"}
          className="block text-left w-full hover:text-gray-500"
        >
          검색
        </Link>
        <Link 
          to={"/lps"} 
          className="block text-left w-full hover:text-gray-500"
        >
          LP목록
        </Link>
        <Link 
          to={"/my"} 
          className="block text-left w-full hover:text-gray-500"
        >
          마이페이지
        </Link>
      </div>

      <button className="text-gray-500 cursor-pointer block text-left w-full">
        탈퇴
      </button>
    </div>
  );
};
