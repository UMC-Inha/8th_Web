import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGetMyInfo } from "../hooks/queries/useGetMyInfo";
import { useUpdateUser } from "../hooks/mutations/useUpdateUser";

const MyPage = () => {
    const navigate = useNavigate();
    const { accessToken, logout } = useAuth();
    const { data: me, isLoading } = useGetMyInfo();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        if (me?.data && editMode) {
            setName(me.data.name);
            setBio(me.data.bio ?? "");
            setAvatar(me.data.avatar ?? "");
        }
    }, [me, editMode]);

    const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return alert("닉네임은 필수입니다.");

        updateUser(
            { name: name.trim(), bio: bio.trim() || undefined, avatar: avatar.trim() || undefined },
            { onSuccess: () => setEditMode(false) }
        );
    };

    if (!accessToken) {
        navigate("/login");
        return null;
    }
    if (isLoading) return <div>로딩 중…</div>;
    if (!me?.data) return <div>사용자 정보를 불러올 수 없습니다.</div>;

    return (
        <div className="max-w-md mx-auto p-6">
            {!editMode ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">내 정보</h1>
                    <img
                        src={me.data.avatar || "/default-avatar.png"}
                        alt="avatar"
                        className="w-24 h-24 rounded-full mb-4 object-cover"
                    />
                    <p><strong>이름:</strong> {me.data.name}</p>
                    <p><strong>bio:</strong> {me.data.bio ?? "없음"}</p>

                    <div className="mt-4 flex space-x-2">
                        <button
                            onClick={() => setEditMode(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            설정
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            로그아웃
                        </button>
                    </div>
                </>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h1 className="text-2xl font-bold">정보 수정</h1>

                    <label className="block">
                        <span className="mb-1 block">이름 <span className="text-red-500">*</span></span>
                        <input
                            value={name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="mb-1 block">bio</span>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-1 block">avatar URL</span>
                        <input
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </label>

                    <div className="flex space-x-2">
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            disabled={isUpdating}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            {isUpdating ? "저장 중…" : "저장"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default MyPage;