import { useRef, useState } from "react";

type AddLpModalProps = {
  onClose: () => void;
  onSubmit: (formData: {
    title: string;
    content: string;
    thumbnail: File | null;
    tags: string[];
  }) => void;
};

export const AddLpModal = ({ onClose, onSubmit }: AddLpModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-md w-[350px] text-white relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white text-lg"
        >
          ✕
        </button>

        <div className="flex justify-center mb-4 relative">
          <div
            onClick={handleImageClick}
            className="relative w-40 h-40 rounded-full bg-gradient-to-br from-zinc-900 to-black
             flex items-center justify-center cursor-pointer shadow-lg border-4 border-black"
          >
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="absolute top-1/2 left-1/2 w-20 h-20 object-cover rounded-full border-4 border-black -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>

        <input
          className="w-full bg-zinc-700 text-white border border-zinc-600 px-3 py-2 rounded mb-2 placeholder-zinc-400"
          placeholder="LP Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full bg-zinc-700 text-white border border-zinc-600 px-3 py-2 rounded mb-2 placeholder-zinc-400"
          placeholder="LP Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex gap-2 mb-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="LP Tag"
            className="flex-1 bg-zinc-700 text-white border border-zinc-600 px-2 py-2 rounded placeholder-zinc-400"
          />
          <button
            onClick={addTag}
            className="bg-zinc-500 text-white px-3 rounded hover:bg-zinc-400"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              #{tag}
              <button onClick={() => removeTag(tag)} className="text-xs">
                ✕
              </button>
            </span>
          ))}
        </div>

        <button
          onClick={() => onSubmit({ title, content, thumbnail, tags })}
          className="w-full bg-zinc-600 text-white py-2 rounded hover:bg-zinc-500"
          disabled={!title}
        >
          Add LP
        </button>
      </div>
    </div>
  );
};
