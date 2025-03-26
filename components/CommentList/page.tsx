"use client"

import React from "react";
import CommentItem from "../commentItems/page";

interface Comment {
    _id: string;
    name: string;
    comment: string;
    sentiment: string;
}

interface CommentListProps {
    comments: Comment[];
    deleteComment: (id: string) => void;
    analyzeSentiment: (commentId: string, text: string) => void;
    sentiments: { [key: string]: string | undefined };
    loading: string | null;
    expandedCommentId: string | null;
    toggleExpand: (id: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({
    comments,
    deleteComment,
    analyzeSentiment,
    sentiments,
    loading,
    expandedCommentId,
    toggleExpand,
}) => {
    return (
        <ul className="m-4">
            {comments.map(comment => (
                <CommentItem
                    key={comment._id}
                    comment={comment}
                    deleteComment={deleteComment}
                    analyzeSentiment={analyzeSentiment}
                    sentiments={sentiments}
                    loading={loading}
                    expandedCommentId={expandedCommentId}
                    toggleExpand={toggleExpand}
                />
            ))}
        </ul>
    );
};

export default CommentList;