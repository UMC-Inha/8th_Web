import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          className="fixed top-20 left-4 z-50 flex flex-col gap-1 p-2 rounded border border-white"
          onClick={() => setIsOpen(true)}
        >
          <span className="w-6 h-1 bg-white" />
          <span className="w-6 h-1 bg-white" />
          <span className="w-6 h-1 bg-white" />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40 flex"
          onClick={() => setIsOpen(false)}
        >
          <aside
            className="w-64 h-full bg-zinc-900 text-white p-6 mt-14 rounded-xl border border-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                className="text-white text-2xl"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
            <ul className="space-y-4 text-lg">
              <li>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  홈
                </Link>
              </li>
              <li>
                <Link to="/lps" onClick={() => setIsOpen(false)}>
                  LP 목록
                </Link>
              </li>
              <li>
                <Link to="/mypage" onClick={() => setIsOpen(false)}>
                  마이페이지
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
