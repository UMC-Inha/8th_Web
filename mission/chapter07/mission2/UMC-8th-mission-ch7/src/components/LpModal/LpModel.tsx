import lpImg from "../../assets/lp.png";
import { useRef, useState, ChangeEvent, FormEvent } from "react";
import usePostLp from "../../hooks/mutations/usePostLp";

interface LpModalProps {
    onClose: () => void;
}

export default function LpModal({ onClose }: LpModalProps) {
    const fileRef = useRef<HTMLInputElement>(null);
    const {mutate: PostLpMutate, isPending } = usePostLp();

    const [previewSrc, setPreviewSrc] = useState<string>(lpImg);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");

    const handleImageClick = () => fileRef.current?.click();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setPreviewSrc(reader.result as string);
        reader.readAsDataURL(file);
    };

    const addTag = () => {
        const t = tagInput.trim();
        if (t && !tags.includes(t)) {
            setTags((prev) => [...prev, t]);
            setTagInput("");
        }
    };

    const removeTag = (idx: number) => {
        setTags((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        PostLpMutate({
            title,
            content,
            thumbnail: previewSrc,
            tags,
            published: true,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-6"
        >
            <div
                onClick={handleImageClick}
                className="w-40 h-40 bg-gray-200 rounded-full cursor-pointer bg-center bg-cover"
                style={{ backgroundImage: `url(${previewSrc})` }}
            />
            <input
                type="file"
                accept="image/*"
                ref={fileRef}
                onChange={handleFileChange}
                className="hidden"
            />

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="LP Name"
                required
                className="w-full bg-white text-gray-900 px-4 py-2 rounded-lg"
            />

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="LP Content"
                rows={3}
                required
                className="w-full bg-white text-gray-900 px-4 py-2 rounded-lg resize-none"
            />

            <div className="w-full flex space-x-2">
                <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="LP Tag"
                    className="flex-1 bg-white text-gray-900 px-4 py-2 rounded-lg"
                />
                <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Add
                </button>
            </div>

            {tags.length > 0 && (
                <div className="w-full flex flex-wrap gap-2">
                    {tags.map((t, i) => (
                        <div
                            key={i}
                            className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-full"
                        >
                            <span className="mr-2 text-sm">#{t}</span>
                            <button
                                type="button"
                                onClick={() => removeTag(i)}
                                className="text-white hover:text-gray-200"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex w-full justify-end space-x-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                >
                    {isPending ? "Saving..." : "Add LP"}
                </button>
            </div>
        </form>
    );
}