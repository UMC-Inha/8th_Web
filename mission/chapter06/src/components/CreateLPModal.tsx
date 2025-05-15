import { useRef, useState } from "react";
import "./CreateLPModal.css";
import lpImage from "../assets/lpimage.png";
import axiosInstance from "../utils/axiosInstance";

interface Props {
  onClose: () => void;
}

const CreateLPModal = ({ onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState<string>(lpImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setThumbnail(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post("http://localhost:8000/v1/lps", {
        title,
        content,
        thumbnail,
        tags,
        published: true,
      });
      alert("등록 성공!");
      onClose();
    } catch (err) {
      alert("등록 실패");
      console.error(err);
    }
  };

  return (
    <div className="lp-modal-backdrop" onClick={onClose}>
      <div className="lp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="lp-close" onClick={onClose}>
          ✕
        </button>
        <img
          src={thumbnail}
          alt="lp"
          className="lp-image"
          onClick={handleImageClick}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <input
          placeholder="LP Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="LP Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="tag-input">
          <input
            placeholder="LP Tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button onClick={handleAddTag}>Add</button>
        </div>
        <div className="tag-list">
          {tags.map((tag, idx) => (
            <span key={idx} className="tag-chip">
              #{tag}
              <button
                className="tag-remove"
                onClick={() => handleRemoveTag(idx)}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Add LP
        </button>
      </div>
    </div>
  );
};

export default CreateLPModal;
