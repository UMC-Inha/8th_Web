import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getLpDetail, deleteLp } from "../apis/lp";
import { LpDetailDto } from "../types/lp";
import { FaEdit, FaTrash, FaHeart } from "react-icons/fa";
import LpComments from "../components/LpComment/LpComments";
import { useAddLike } from "../hooks/mutations/useAddLike";
import { useRemoveLike } from "../hooks/mutations/useRemoveLike";
import { useState, useRef, ChangeEvent } from "react";
import Modal from "../components/Modal";
import useEditLp from "../hooks/mutations/useEditLp";

const formatDate = (date: string) => new Date(date).toLocaleDateString("ko-KR");

const LpDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const lpId = Number(id);
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newThumbnail, setNewThumbnail] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: lp, isLoading, isError } = useQuery<LpDetailDto>({
    queryKey: ["lpDetail", lpId],
    queryFn: () => getLpDetail(lpId),
    enabled: !!lpId && !!accessToken,
  });

  const { mutate: addLike } = useAddLike(lpId);
  const { mutate: removeLike } = useRemoveLike(lpId);
  const { mutateAsync: editLp } = useEditLp(lpId);

  if (!accessToken || !user) {
    if (typeof window !== "undefined" && window.confirm("로그인이 필요한 서비스입니다.\n로그인하시겠습니까?")) {
      navigate("/login");
    }
    return null;
  }

  const chooseFile = () => fileRef.current?.click();
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setNewThumbnail(reader.result as string);
    reader.readAsDataURL(file);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput("");
  };

  const removeTag = (idx: number) => setTags(tags.filter((_, i) => i !== idx));

  const saveEdit = async () => {
    try {
      await editLp({
        title: newTitle,
        content: newContent,
        thumbnail: newThumbnail,
        tags,
        published: lp?.published ?? false,
      });
      setEditOpen(false);
    } catch (err) {
      console.error("LP 수정 실패", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLp(lpId);
      navigate("/");
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  const isLiked = lp?.likes.some((l) => l.userId === user.id);
  const handleLike = () => (isLiked ? removeLike() : addLike());

  if (isLoading) return <div className="mt-20 text-center">Loading...</div>;
  if (isError || !lp) return <div className="mt-20 text-center">조회된 LP가 없습니다.</div>;

  const openEdit = () => {
    setNewTitle(lp.title);
    setNewContent(lp.content);
    setNewThumbnail(lp.thumbnail);
    setTags(lp.tags.map((t) => t.name));
    setEditOpen(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-center">{lp.title}</h1>

        {lp.thumbnail && (
          <div className="flex justify-center mb-8">
            <div className="relative w-64 h-64">
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-full h-full object-cover rounded-full shadow-lg animate-spin [animation-duration:20s] [animation-timing-function:linear]"
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full border-2 border-gray-300 dark:border-gray-600" />
              </div>
            </div>
          </div>
        )}

        <p className="prose mb-6">{lp.content}</p>

        <div className="mb-4">
          {lp.tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-block px-2 py-1 mr-2 mb-2 bg-gray-200 dark:bg-gray-700 rounded text-sm text-white"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        <div className="text-sm text-gray-500 mb-6 text-center">
          작성자: {lp.author.name} · 좋아요 {lp.likes.length} · {formatDate(lp.createdAt)}
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button onClick={openEdit} className="flex items-center px-4 py-2 border rounded hover:bg-gray-100">
            <FaEdit className="mr-2" /> 수정
          </button>
          <button onClick={() => setDeleteConfirm(true)} className="flex items-center px-4 py-2 border rounded hover:bg-gray-100">
            <FaTrash className="mr-2" /> 삭제
          </button>
          <button
            onClick={handleLike}
            className={`flex items-center px-4 py-2 border rounded ${
              isLiked ? "bg-red-100 text-red-600" : "hover:bg-gray-100"
            }`}
          >
            <FaHeart className="mr-2" />
            {isLiked ? "좋아요 취소" : "좋아요"}
          </button>
        </div>

        <LpComments lpId={lpId} limit={10} />
      </div>

      {/* 수정 모달 */}
      {editOpen && (
        <Modal isOpen={editOpen} onClose={() => setEditOpen(false)}>
          <div className="space-y-4 w-80">
            <h2 className="text-xl font-semibold text-center text-white">LP 수정</h2>

            <div
              onClick={chooseFile}
              className="w-32 h-32 mx-auto bg-center bg-cover rounded-full cursor-pointer"
              style={{ backgroundImage: `url(${newThumbnail})` }}
            />
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />

            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded bg-white"
              required
            />
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={4}
              className="w-full border px-3 py-2 rounded resize-none bg-white"
              required
            />

            <div className="flex space-x-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 border px-3 py-2 rounded bg-white"
                placeholder="#tag"
              />
              <button type="button" onClick={addTag} className="px-4 py-2 bg-blue-600 text-white rounded">
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <span key={i} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  #{t}
                  <button className="ml-1" onClick={() => removeTag(i)}>
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <button onClick={() => setEditOpen(false)} className="px-4 py-2 bg-gray-300 rounded">
                취소
              </button>
              <button onClick={saveEdit} className="px-4 py-2 bg-green-600 text-white rounded">
                저장
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* 삭제 확인 모달 */}
      {deleteConfirm && (
        <Modal isOpen={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
          <div className="space-y-6 text-center">
            <p className="text-white">정말 이 LP를 삭제하시겠습니까?</p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => setDeleteConfirm(false)} className="px-4 py-2 bg-gray-300 rounded">
                취소
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">
                삭제
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LpDetailPage;
