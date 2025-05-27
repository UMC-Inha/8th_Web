import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateUserProfile } from "../apis/user";
import { axiosInstance } from "../apis/axios";
import { useDeleteAccount } from "../hooks/useDeleteAccount";

interface SettingsModalProps {
    onClose: () => void;
    initialName: string;
    initialBio: string;
    initialAvatar: string;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    onClose,
    initialName,
    initialBio,
    initialAvatar,
}) => {
    const [name, setName] = useState(initialName);
    const [bio, setBio] = useState(initialBio);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState(initialAvatar);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    useEffect(() => {
        if (!avatarFile) return;
        const url = URL.createObjectURL(avatarFile);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [avatarFile]);

    const mutation = useMutation({
        mutationFn: async () => {
        if (!name.trim()) {
            throw new Error("닉네임은 반드시 입력해야 합니다.");
        }

        let avatarUrl = initialAvatar;

        if (avatarFile) {
            const formData = new FormData();
            formData.append("file", avatarFile);

            const { data } = await axiosInstance.post("/v1/uploads", formData);
            avatarUrl = data.url;
        }

        return updateUserProfile({ name, bio, avatar: avatarUrl });
        },
        onSuccess: () => {
        alert("프로필이 수정되었습니다.");
        onClose();
        window.location.reload();
        },
        onError: (error: any) => {
        alert(error.message || "프로필 수정 중 오류가 발생했습니다.");
        },
    });

    const handleSave = () => {
        if (!name.trim()) {
        alert("닉네임은 빈칸일 수 없습니다.");
        return;
        }

        mutation.mutate();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <div
            ref={modalRef}
            className="bg-[#1e1e1e] rounded-lg p-6 w-full max-w-md relative"
        >
            <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
            ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 text-white">프로필 수정</h2>

            <input
            className="w-full p-2 mb-3 rounded bg-[#2a2a2a] text-white border border-gray-600"
            placeholder="닉네임 (필수)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <textarea
            className="w-full p-2 mb-3 rounded bg-[#2a2a2a] text-white border border-gray-600"
            placeholder="자기소개 (선택)"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            />

            <input
            type="file"
            accept="image/*"
            onChange={(e) => {
                if (e.target.files?.[0]) {
                setAvatarFile(e.target.files[0]);
                }
            }}
            className="text-white mb-2"
            />

            {previewUrl && (
            <img
                src={previewUrl}
                alt="미리보기"
                className="max-h-40 mb-4 rounded"
            />
            )}

            <button
            onClick={handleSave}
            className="w-full bg-pink-600 hover:bg-pink-500 text-white py-2 rounded"
            >
            저장
            </button>
        </div>
        </div>
    );
};
