import React, { useState } from 'react';

import { Pencil, Trash, Check, X } from 'lucide-react';
import { updateCommentAPI, deleteCommentAPI } from '../../apis/lp';
import { Comment as LpCommentType } from '../../types/comment';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';

interface LpCommentItemProps {
    lpId: number;
    comment: LpCommentType;
    onUpdate: (updatedComment: LpCommentType) => void;
    onDelete: (id: number) => void;
}

const LpCommentItem = ({comment, onUpdate, onDelete }: LpCommentItemProps) => {
    const { LPid } = useParams<{ LPid: string }>();
    const { name } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const [loading, setLoading] = useState(false);

    const authorName = comment.author?.name || '알 수 없음';

    const canEditOrDelete = name === authorName;

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditContent(comment.content);
    };

    const handleSaveClick = async () => {
        if (!editContent.trim()) return;
        setLoading(true);
        try {
        await updateCommentAPI(Number(LPid), comment.id, editContent);
        onUpdate({ ...comment, content: editContent });
        setIsEditing(false);
        } catch (error) {
        console.error('댓글 수정 실패:', error);
        } finally {
        setLoading(false);
        }
    };

    const handleDeleteClick = async () => {
        if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
        setLoading(true);
        try {
        await deleteCommentAPI(Number(LPid), comment.id);
        onDelete(comment.id);
        } catch (error) {
        console.error('댓글 삭제 실패:', error);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="bg-[#2a2a2a] p-4 rounded-lg">
        <div className="flex justify-between items-start mb-2">
            <span className="font-semibold text-sm">{authorName}</span>
            {canEditOrDelete && !isEditing && (
            <div className={`flex gap-3 text-gray-400 ${loading ? 'pointer-events-none opacity-50' : ''}`}>
                <Pencil
                size={16}
                className="cursor-pointer hover:text-white"
                onClick={handleEditClick}
                />
                <Trash
                size={16}
                className="cursor-pointer hover:text-white"
                onClick={handleDeleteClick}
                />
            </div>
            )}
        </div>

        {isEditing ? (
            <>
            <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={3}
                className="w-full p-2 rounded bg-[#1e1e1e] text-white border border-gray-600 mb-2"
                disabled={loading}
            />
            <div className="flex gap-2 justify-end">
                <button
                onClick={handleSaveClick}
                disabled={loading}
                className="flex items-center gap-1 bg-pink-600 hover:bg-pink-500 px-3 py-1 rounded text-white"
                >
                <Check size={16} />
                저장
                </button>
                <button
                onClick={handleCancelClick}
                disabled={loading}
                className="flex items-center gap-1 bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-white"
                >
                <X size={16} />
                취소
                </button>
            </div>
            </>
        ) : (
            <p className="whitespace-pre-wrap text-gray-200">{comment.content}</p>
        )}
        </div>
    );
};

export default LpCommentItem;
