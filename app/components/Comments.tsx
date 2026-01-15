"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, MessageCircle } from "lucide-react";

interface Comment {
  id: number;
  user: string;
  avatar: string;
  date: string;
  text: string;
  likes: number;
}

const NeoButton = ({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
    px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all duration-200 border-2 border-black shadow-[4px_4px_0px_0px_#000]
    active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed
    bg-yellow-300 text-black hover:bg-yellow-400
    ${className}
  `}
  >
    {children}
  </button>
);

export default function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: "Dev_Pro_99",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      date: "2 hours ago",
      text: "This article completely changed how I think about system architecture. The point about database bottlenecks is spot on!",
      likes: 12,
    },
    {
      id: 2,
      user: "Sarah Jenkins",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
      date: "5 hours ago",
      text: "I disagree with the second point. In my experience, microservices add too much complexity for small teams.",
      likes: 8,
    },
    {
      id: 3,
      user: "AlexM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      date: "1 day ago",
      text: "Great read! Would love to see a follow-up on the implementation details.",
      likes: 5,
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handlePostComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      user: "Guest User",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
      date: "Just now",
      text: newComment,
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <section className="max-w-4xl mx-auto mt-16 mb-20 px-4 md:px-0">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-500 p-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <MessageCircle className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-black">Discussion ({comments.length})</h2>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_#000] mb-12">
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full min-h-[120px] p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-0 transition-colors resize-y font-medium"
          />
          <div className="absolute bottom-4 right-4">
            <NeoButton
              onClick={handlePostComment}
              disabled={!newComment.trim()}
            >
              Post Comment <Send size={16} />
            </NeoButton>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-gray-100">
                    <img
                      src={comment.avatar}
                      alt={comment.user}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg">{comment.user}</span>
                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed mb-3">
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="text-sm font-bold text-gray-500 hover:text-black flex items-center gap-1 transition-colors">
                      Reply
                    </button>
                    <button className="text-sm font-bold text-gray-500 hover:text-pink-500 flex items-center gap-1 transition-colors">
                      Like ({comment.likes})
                    </button>
                  </div>
                </div>
              </div>
              {index !== comments.length - 1 && (
                <div className="h-px bg-gray-200 my-6 ml-16" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
