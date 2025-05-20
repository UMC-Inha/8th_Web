import { useRef, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

interface Props {
  lp: any;
  onSave: (data: {
    title: string;
    content: string;
    tags: string[];
    thumbnail: string;
    published: boolean;
  }) => void;
  onCancel: () => void;
}

const LPDetailEditor = ({ lp, onSave, onCancel }: Props) => {
  const [title, setTitle] = useState(lp.title);
  const [content, setContent] = useState(lp.content);
  const [tags, setTags] = useState(lp.tags.map((t: any) => t.name));
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState(lp.thumbnail);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (name: string) => {
    setTags(tags.filter((t) => t !== name));
  };

  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axiosInstance.post("/v1/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setThumbnail(res.data.data.imageUrl);
    } catch (err) {
      alert("이미지 업로드 실패");
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    onSave({ title, content, tags, thumbnail, published: true });
  };

  return (
    <div>
      <input
        className="lp-edit-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />

      <textarea
        className="lp-edit-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
      />

      <img
        src={thumbnail}
        className="lp-edit-thumbnail"
        alt="thumbnail"
        onClick={() => fileInputRef.current?.click()}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleThumbnailChange}
      />

      <div className="lp-edit-tag">
        {tags.map((tag) => (
          <span key={tag}>
            #{tag}
            <span
              className="lp-edit-tag-remove"
              onClick={() => handleRemoveTag(tag)}
            >
              ×
            </span>
          </span>
        ))}
      </div>

      <div className="lp-edit-tag-row">
        <input
          className="lp-edit-input"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="태그 추가"
        />
        <button onClick={handleAddTag}>추가</button>
      </div>

      <div className="lp-edit-buttons">
        <button onClick={handleSubmit}>저장</button>
        <button onClick={onCancel}>취소</button>
      </div>
    </div>
  );
};

export default LPDetailEditor;
