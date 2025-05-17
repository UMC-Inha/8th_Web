import { useEffect, useState, useRef } from "react";
import { getMyInfo, updateMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Mypage = () => {
  const [user, setUser] = useState<ResponseMyInfoDto["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateProfile } = useMutation({
    mutationFn: updateMyInfo,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      try {
        const res = await getMyInfo();
        setUser(res.data);
      } catch (err) {
        console.error("프로필 갱신 실패", err);
      }
      alert("수정 완료!");
    },
  });

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const res = await getMyInfo();
        setUser(res.data);
        setName(res.data.name);
        setBio(res.data.bio || "");
      } catch (err) {
        console.error("내 정보 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>불러오는 중...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>유저 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black gap-4 p-4">
      <h1 className="text-2xl font-bold">🧑‍💻 마이페이지</h1>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-white flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {preview ? (
          <img
            src={preview}
            alt="미리보기"
            className="w-full h-full object-cover"
          />
        ) : (
          <span>📷</span>
        )}
      </div>
      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handleImageChange}
      />

      <div className="flex flex-col gap-2 items-start w-60">
        <label className="text-sm">🙋 이름</label>
        <input
          className="bg-zinc-800 px-4 py-2 rounded w-full"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="text-sm">📝 소개글</label>
        <textarea
          className="bg-zinc-800 px-4 py-2 rounded w-full h-24"
          placeholder="자기소개를 입력하세요 (선택)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <label className="text-sm">📧 이메일</label>
        <div className="text-zinc-400">{user.email}</div>

        <label className="text-sm">📅 가입일</label>
        <div className="text-zinc-400">
          {new Date(user.createdAt).toLocaleDateString()}
        </div>
      </div>

      <button
        onClick={() => {
          if (!name.trim()) return alert("이름입력은 필수입니다.");
          updateProfile({ name, bio, avatar });
        }}
        className="bg-blue-600 px-6 py-2 rounded mt-4"
      >
        💾 저장하기
      </button>
    </div>
  );
};

export default Mypage;
