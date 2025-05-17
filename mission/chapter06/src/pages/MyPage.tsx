import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosInstance from "../utils/axiosInstance";
import "./MyPage.css";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
}

const fetchUserProfile = async (): Promise<UserProfile> => {
  const res = await axiosInstance.get("/v1/users/me");
  return res.data.data;
};

const MyPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery("userProfile", fetchUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isEditing && data) {
      setAvatar(data.avatar);
    }
  }, [isEditing, data]);

  const updateProfileMutation = useMutation(
    (formData: { name: string; bio: string | null; avatar: string | null }) =>
      axiosInstance.patch("/v1/users", formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userProfile");
        setIsEditing(false);
        setErrorMessage("");
      },
    }
  );

  const uploadImageMutation = useMutation(
    (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return axiosInstance.post("/v1/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    {
      onSuccess: (res) => {
        const uploadedUrl = res.data.data.imageUrl;
        setAvatar(uploadedUrl);
      },
    }
  );

  if (isLoading) return <div className="mypage-loading">불러오는 중...</div>;
  if (error || !data)
    return (
      <div className="mypage-error">사용자 정보를 불러오지 못했습니다.</div>
    );

  const handleEdit = () => {
    setIsEditing(true);
    setName(data.name);
    setBio(data.bio || "");
    setAvatar(data.avatar);
    setErrorMessage("");
  };

  const handleSave = () => {
    if (!name.trim()) {
      setErrorMessage("닉네임은 빈칸일 수 없습니다.");
      return;
    }

    updateProfileMutation.mutate({ name, bio, avatar });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadImageMutation.mutate(file);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mypage-container">
      <div
        className="mypage-avatar"
        onClick={isEditing ? handleAvatarClick : undefined}
      >
        {avatar ? (
          <img key={avatar} src={avatar} alt="프로필" />
        ) : (
          <div className="mypage-avatar-placeholder">No Image</div>
        )}
        {isEditing && <div className="mypage-avatar-overlay">사진 변경</div>}
      </div>

      {isEditing && (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          {avatar && (
            <button
              className="mypage-reset-avatar"
              onClick={() => setAvatar(null)}
            >
              기본 이미지로 변경
            </button>
          )}
        </>
      )}

      <div className="mypage-info">
        {isEditing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
            />
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="소개글"
            />
            {errorMessage && (
              <p style={{ color: "red", fontSize: "12px" }}>{errorMessage}</p>
            )}
            <button
              onClick={handleSave}
              disabled={updateProfileMutation.isLoading}
            >
              저장
            </button>
            <button onClick={() => setIsEditing(false)}>취소</button>
          </>
        ) : (
          <>
            <h2 className="mypage-name">{data.name}</h2>
            <p className="mypage-bio">{data.bio || "소개글이 없습니다."}</p>
            <p className="mypage-email">{data.email}</p>
            <button className="mypage-edit-button" onClick={handleEdit}>
              ⚙️ 편집
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPage;
