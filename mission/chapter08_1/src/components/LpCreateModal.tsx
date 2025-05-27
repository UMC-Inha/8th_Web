import React, { useState, useRef, useEffect } from 'react';
import { axiosInstance } from '../apis/axios';
import { postLp } from '../apis/lp';

interface LpCreateModalProps {
    onClose: () => void;
}

const LpCreateModal: React.FC<LpCreateModalProps> = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    useEffect(() => {
        if (!imageFile) {
        setImagePreviewUrl(null);
        return;
        }

        const objectUrl = URL.createObjectURL(imageFile);
        setImagePreviewUrl(objectUrl);

        return () => {
        URL.revokeObjectURL(objectUrl);
        };
    }, [imageFile]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        setImageFile(e.target.files[0]);
        }
    };

    const handleAddTag = () => {
        const newTag = tagInput.trim();
        if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput('');
        }
    };

    const handleDeleteTag = (tagToDelete: string) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await axiosInstance.post(`/v1/uploads`, formData);

        return data.url;
    };

    const handleSubmit = async () => {
        if (!title || !content || !imageFile) {
        alert('제목, 내용, 이미지를 모두 입력해주세요!');
        return;
        }

        try {
        const imageUrl = await uploadImage(imageFile);
        await postLp(title, content, imageUrl, tags, true);

        onClose();
        window.location.reload();
        } catch (err) {
        console.error('LP 작성 중 에러 발생:', err);
        alert('LP 작성 중 문제가 발생했습니다.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <div ref={modalRef} className="bg-[#1e1e1e] rounded-lg p-6 w-full max-w-md relative">
            <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
            aria-label="모달 닫기"
            >
            ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-white">LP 글 작성</h2>

            <input
            type="text"
            placeholder="제목을 입력하세요"
            className="w-full p-2 mb-4 rounded bg-[#2a2a2a] text-white border border-gray-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
            placeholder="내용을 입력하세요"
            className="w-full p-2 mb-4 rounded bg-[#2a2a2a] text-white border border-gray-600"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />

            <label className="block mb-4 text-sm text-gray-400 cursor-pointer">
            사진 선택
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />
            {imageFile && <span className="ml-2 text-green-400">{imageFile.name}</span>}
            </label>

            {imagePreviewUrl && (
            <img
                src={imagePreviewUrl}
                alt="미리보기"
                className="mb-4 max-h-48 object-contain rounded border border-gray-600"
            />
            )}

            <div className="mb-4">
            <div className="flex gap-2 mb-2">
                <input
                type="text"
                placeholder="태그 입력 후 Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                    }
                }}
                className="flex-1 p-2 rounded bg-[#2a2a2a] text-white border border-gray-600"
                />
                <button
                onClick={handleAddTag}
                className="px-3 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                추가
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                <span
                    key={tag}
                    className="bg-gray-600 text-xs text-white px-2 py-1 rounded-full flex items-center"
                >
                    #{tag}
                    <button
                    onClick={() => handleDeleteTag(tag)}
                    className="ml-1 text-red-400 hover:text-red-600"
                    >
                    ✕
                    </button>
                </span>
                ))}
            </div>
            </div>

            <button
            onClick={handleSubmit}
            className="w-full bg-pink-600 hover:bg-pink-500 text-white py-2 rounded"
            >
            작성 완료
            </button>
        </div>
        </div>
    );
};

export default LpCreateModal;
