import { useState, useRef } from "react";

type UpdateLpModalProps = {
  initialData: {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
  };
  onClose: () => void;
  onSubmit: (formData: {
    title: string;
    content: string;
    thumbnail: string | File;
    tags: string[];
  }) => void;
};

export const UpdateLpModal = ({
  initialData,
  onClose,
  onSubmit,
}: UpdateLpModalProps) => {
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);
  const [thumbnail, setThumbnail] = useState<File | string>(
    initialData.thumbnail
  );
  const [preview, setPreview] = useState<string | null>(initialData.thumbnail);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(initialData.tags);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-md w-[400px] text-white">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">LP 수정</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <input
          className="w-full mb-2 bg-zinc-700 px-3 py-2 rounded"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-2 bg-zinc-700 px-3 py-2 rounded"
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-40 object-cover rounded mb-2 cursor-pointer"
            onClick={handleImageClick}
          />
        )}

        <div className="flex gap-2 mb-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="태그 추가"
            className="flex-1 px-2 py-1 rounded bg-zinc-700"
          />
          <button onClick={addTag} className="bg-blue-600 px-3 rounded">
            추가
          </button>
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm"
            >
              #{tag}
              <button className="ml-1 text-xs" onClick={() => removeTag(tag)}>
                ✕
              </button>
            </span>
          ))}
        </div>

        <button
          onClick={() => onSubmit({ title, content, thumbnail, tags })}
          className="bg-blue-700 w-full py-2 rounded"
        >
          수정 완료
        </button>
      </div>
    </div>
  );
};
