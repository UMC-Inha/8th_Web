import { useParams } from "react-router-dom";
import { LpCommentsPage } from "./LpCommentsPage";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { Heart } from "lucide-react";

export const LpDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();

  // 모든 hooks를 loading/error 전에 부르기
  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();

  const handleLikeLp = () => {
    likeMutate({ lpId: Number(lpId) });
  };
  const handleDislikeLp = () => {
    dislikeMutate({ lpId: Number(lpId) });
  };

  const {
    data: lp,
    isLoading,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

  const isLiked = lp?.data.likes
    .map((like) => like.userId)
    .includes(me?.data.id as number);

  return (
    <div className="flex">
      <div className="flex flex-col w-full items-center justify-center gap-2 p-4">
        <h1 className="text-3xl font-bold mb-4">{lp?.data.title}</h1>

        <div className="relative flex items-center justify-center">
          {/* {Lp판} */}
          <img
            src={lp?.data.thumbnail}
            alt={lp?.data.title}
            className="w-96 h-96 rounded-full object-cover shadow-lg
            animate-spin [animation-duration:10s] [animation-timing-function:linear]"
          />
          {/* {Lp판 중앙구멍} */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div
              className="w-12 h-12 bg-gray-100 rounded-full shadow-lg
            border-2 border-gray-300"
            />
          </div>
        </div>

        <div className="mt-4 text-center">
          <h2 className="text-3xl font-bold">{lp?.data.title}</h2>
          <p className="text-sm mt-2">{lp?.data.content}</p>
        </div>

        <div className="flex gap-4 mt-4">
          <button className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600">
            Edit
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600">
            Delete
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600"
                  onClick={isLiked ? handleDislikeLp : handleLikeLp}>
            <Heart
              color={isLiked ? "red" : "black"}
              fill={isLiked ? "red" : "transparent"}
            />
          </button>
        </div>
        <LpCommentsPage />
      </div>
    </div>
  );
};
