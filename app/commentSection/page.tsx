"use client"

import { useEffect, useState } from 'react';
import { ScrollShadow } from "@heroui/scroll-shadow";
import CommentList from '@/components/CommentList/page';
import { addToast } from "@heroui/toast";

interface Comment {
  _id: string;
  name: string;
  comment: string;
  sentiment: string;
}

export default function CommentSectionPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [sentiments, setSentiments] = useState<{ [key: string]: string | undefined }>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [expandedCommentId, setExpandedCommentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/fetchComments');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setComments(data.comments);
      } catch (error) {
        setError('Error loading comments');
      }
    };

    fetchComments();
  }, []);

  const deleteComment = async (id: string) => {
    try {
      const response = await fetch("/api/deleteComment", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const data = await response.json();
        addToast({
          color: 'danger',
          title: "Failed to delete comment",
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        });
        throw new Error(data.error || "Failed to delete comment");
      }

      setComments((prevComments) => prevComments.filter(comment => comment._id !== id));
      addToast({
        color: 'secondary',
        title: "Comment deleted!",
        promise: new Promise((resolve) => setTimeout(resolve, 3000)),
      });
    } catch (error) {
    }
  };

  const analyzeSentiment = async (commentId: string, text: string) => {
    if (loading === commentId) {
      setSentiments((prev) => ({ ...prev, [commentId]: undefined }));
      setLoading(null);
      return;
    }
    setLoading(commentId);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setSentiments((prev) => ({ ...prev, [commentId]: data.sentiment }));
    } catch (error) {
    }
    setLoading(null);
  };

  if (error) {
    return <div>{error}</div>;
  }

  const toggleExpand = (id: string) => {
    setExpandedCommentId(expandedCommentId === id ? null : id);
  };

  return (
    <ScrollShadow hideScrollBar className="w-[300px] h-[500px]">
      <CommentList
        comments={comments}
        deleteComment={deleteComment}
        analyzeSentiment={analyzeSentiment}
        sentiments={sentiments}
        loading={loading}
        expandedCommentId={expandedCommentId}
        toggleExpand={toggleExpand}
      />
    </ScrollShadow>
  );
}