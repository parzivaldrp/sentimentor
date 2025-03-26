"use client"

import React from 'react';
import { User } from "@heroui/user";
import { Button } from "@heroui/button";
import { Spacer } from "@heroui/spacer";
import { Divider } from "@heroui/divider";

interface Comment {
    _id: string;
    name: string;
    comment: string;
}

const sentimentToEmoji: Record<"POSITIVE" | "NEGATIVE" | "NEUTRAL" | "MIXED", string> = {
    POSITIVE: "😊",
    NEGATIVE: "😡",
    NEUTRAL: "😐",
    MIXED: "😕",
};

interface CommentItemProps {
    comment: Comment;
    deleteComment: (id: string) => void;
    analyzeSentiment: (commentId: string, text: string) => void;
    sentiments: { [key: string]: string | undefined };
    loading: string | null;
    expandedCommentId: string | null;
    toggleExpand: (id: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
    comment,
    deleteComment,
    analyzeSentiment,
    sentiments,
    loading,
    expandedCommentId,
    toggleExpand,
}) => {
    return (
        <li className="flex-row">
            <div className="flex gap-2 item-center justify-between">
                <User
                    className="flex-shrink-0"
                    avatarProps={{
                        radius: "full",
                        color: "primary",
                        src: "/profileUnk.jpeg",
                    }}
                    name={comment.name}
                    description={
                        <div>
                            <p className={`max-w-[200px] ${expandedCommentId === comment._id ? '' : 'max-h-[15px] overflow-hidden'} break-words`}>
                                {comment.comment}
                            </p>
                            {expandedCommentId !== comment._id && (
                                <button onClick={() => toggleExpand(comment._id)} className="text-blue-500">
                                    Show More...
                                </button>
                            )}
                            {expandedCommentId === comment._id && (
                                <button onClick={() => toggleExpand(comment._id)} className="text-blue-500">
                                    Show Less
                                </button>
                            )}
                        </div>
                    }
                />
                <img src="delete.svg" onClick={() => deleteComment(comment._id)} className="w-4 h-4 mt-2 hover:w-3 h-4 mt-1" alt="Delete Comment" />
            </div>
            <Spacer y={2} />
            <div className="flex gap-2">
                <Spacer x={8} />
                <Button
                    color="primary"
                    size="sm"
                    variant="flat"
                    onClick={() => analyzeSentiment(comment._id, comment.comment)}
                    disabled={loading === comment._id}
                >
                    {loading === comment._id ? "Analyzing..." : "Sentiment"}
                </Button>
                <Divider orientation="vertical" />
                {sentiments[comment._id] && (
                    <div className="flex w-32 p -0 text-sm text-sky-500 text-center gap-2 items-center">
                        <p>{sentiments[comment._id]}</p>
                        <p className="text-2xl">
                            {`${sentimentToEmoji[sentiments[comment._id] as keyof typeof sentimentToEmoji] || ""}`}
                        </p>
                    </div>
                )}
            </div>
            <Spacer y={4} />
        </li>
    );
};

export default CommentItem;