"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { blogs } from "../../lib/blogData";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  MessageCircle,
  Twitter,
  Linkedin,
  Copy,
  ThumbsUp,
  MoreHorizontal,
  Home,
} from "lucide-react";
import CommentsSection from "../../components/Comments";

// --- Components ---

const NeoButton = ({
  children,
  className = "",
  variant = "primary",
  onClick,
  href,
}: any) => {
  const variants: any = {
    primary: "bg-[#3b82f6] text-white hover:bg-[#2563eb]",
    secondary: "bg-white text-black hover:bg-yellow-300",
    outline:
      "bg-transparent border-2 border-black text-black hover:bg-black hover:text-white",
  };

  const buttonClasses = `
    inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-200 cursor-pointer border-2 border-black
    shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0 active:translate-y-0 active:shadow-none
    ${variants[variant]}
    ${className}
  `;

  if (href)
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

const getPostData = (id: string, allBlogs: any[]) => {
  const found = allBlogs.find((b) => b.id === id);
  if (!found) return null;

  return {
    ...found,
    subtitle: found.subtitle || found.excerpt,
    meta: {
      date: found.date,
      readTime: found.readTime,
      views: "12.5k", // Dummy view count
    },
    author: {
      ...found.author,
      role: found.author.role || "Author",
    },
  };
};

export default function BlogPost() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const params = useParams();
  const id = params?.id as string;
  const post = getPostData(id, blogs) || getPostData("1", blogs)!;

  // Random related posts
  const relatedPosts = blogs.filter((b) => b.id !== id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-pink-300">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-300 to-pink-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b-2 border-black h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/blog"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="h-6 w-px bg-gray-300"></div>
          <Link
            href="/"
            className="flex items-center gap-2 font-black text-lg tracking-tight hover:text-blue-600"
          >
            <img
              src="/logo.svg"
              alt="Logo"
              className="w-8 h-8 bg-white border-2 border-black rounded-md p-0.5 object-contain"
            />
            TestingMe.
          </Link>
        </div>

        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Share2 size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bookmark size={20} />
          </button>
          <Link
            href="/"
            className="ml-2 bg-black text-white px-4 py-2 rounded-lg font-bold text-sm hidden sm:block"
          >
            Subscribe
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-6 mb-16">
          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 border border-black rounded-full text-xs font-bold uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1] font-display">
            {post.title}
          </h1>

          <p className="text-2xl text-gray-600 font-medium leading-relaxed mb-10 border-l-4 border-yellow-400 pl-6">
            {post.subtitle}
          </p>

          {/* Author Meta */}
          <div className="flex items-center justify-between border-y-2 border-gray-100 py-6 mb-12">
            <div className="flex items-center gap-4">
              <img
                src={post.author.image}
                className="w-14 h-14 rounded-full border-2 border-black"
                alt={post.author.name}
              />
              <div>
                <div className="font-black text-lg">{post.author.name}</div>
                <div className="text-sm text-gray-500 font-medium">
                  {post.author.role}
                </div>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <div className="font-bold flex items-center gap-2 justify-end mb-1">
                <Calendar size={14} /> {post.meta.date}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2 justify-end">
                <Clock size={14} /> {post.meta.readTime}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-black shadow-[12px_12px_0px_0px_#000] mb-16 group">
            <img
              src={post.image}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Hero"
            />
            <div className="absolute top-4 right-4 bg-white border-2 border-black px-4 py-2 rounded-lg font-black shadow-[4px_4px_0px_0px_#000]">
              {post.category}
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-none">
            {post.content.map((block, i) => {
              if (block.type === "h2")
                return (
                  <h2
                    key={i}
                    className="text-4xl md:text-5xl font-black mt-16 mb-8 flex items-center gap-4"
                  >
                    <span className="text-blue-600">#</span> {block.text}
                  </h2>
                );
              if (block.type === "quote")
                return (
                  <blockquote
                    key={i}
                    className="relative bg-yellow-300 border-2 border-black p-8 md:p-12 my-12 rounded-3xl shadow-[8px_8px_0px_0px_#000] rotate-1 hover:rotate-0 transition-transform duration-300"
                  >
                    <div className="absolute -top-6 -left-2 bg-black text-white p-2 rounded-lg border-2 border-white shadow-lg">
                      <MessageCircle size={24} fill="currentColor" />
                    </div>
                    <span className="text-2xl md:text-4xl font-black leading-tight">
                      "{block.text}"
                    </span>
                  </blockquote>
                );
              if (block.type === "img")
                return (
                  <figure key={i} className="my-16">
                    <div className="relative rounded-2xl border-2 border-black overflow-hidden shadow-[8px_8px_0px_0px_#000]">
                      <img src={block.src} alt="Content" className="w-full" />
                    </div>
                    <figcaption className="text-center text-lg text-gray-600 mt-4 font-bold max-w-2xl mx-auto border-b-2 border-yellow-300 inline-block px-4">
                      {block.caption}
                    </figcaption>
                  </figure>
                );
              if (block.type === "code")
                return (
                  <div key={i} className="relative group my-12">
                    <div className="absolute -inset-2 bg-pink-500 rounded-2xl opacity-20 group-hover:opacity-100 transition-opacity blur-sm"></div>
                    <pre className="relative bg-[#1e1e1e] text-gray-100 p-8 rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-x-auto text-lg">
                      <code>{block.code}</code>
                    </pre>
                  </div>
                );
              return (
                <p
                  key={i}
                  className="mb-8 text-xl md:text-2xl leading-[1.8] text-gray-800 font-medium"
                >
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Post Footer Actions */}
          <div className="mt-16 pt-8 border-t-2 border-black flex flex-col items-center gap-6">
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full font-bold hover:bg-blue-100 transition-colors border-2 border-transparent hover:border-black">
                <ThumbsUp size={20} /> 428 Likes
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full font-bold hover:bg-pink-100 transition-colors border-2 border-transparent hover:border-black">
                <MessageCircle size={20} /> 56 Comments
              </button>
            </div>

            <div className="flex items-center gap-4 text-gray-500">
              <span className="font-bold">Share this:</span>
              <div className="flex gap-2">
                <button className="p-2 rounded-full border border-gray-300 hover:border-black hover:text-black transition-colors">
                  <Twitter size={18} />
                </button>
                <button className="p-2 rounded-full border border-gray-300 hover:border-black hover:text-black transition-colors">
                  <Linkedin size={18} />
                </button>
                <button className="p-2 rounded-full border border-gray-300 hover:border-black hover:text-black transition-colors">
                  <Copy size={18} />
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Author Box */}
        <section className="bg-gray-50 border-y-2 border-black py-16 mb-20 px-6">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-[0px_0px_0px_4px_#000] overflow-hidden shrink-0">
              <img
                src={post.author.image}
                className="w-full h-full object-cover"
                alt={post.author.name}
              />
            </div>
            <div>
              <h3 className="text-2xl font-black mb-2">
                Written by {post.author.name}
              </h3>
              <p className="text-lg text-gray-600 mb-6">{post.author.bio}</p>
              <NeoButton variant="secondary" className="text-sm">
                View Profile
              </NeoButton>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <CommentsSection postId={id} />

        {/* Related Posts */}
        <section className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-black mb-10 flex items-center gap-4">
            <span className="w-8 h-8 bg-blue-500 rounded-full border-2 border-black inline-block"></span>
            Keep Reading
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((p, i) => (
              <Link href={`/blog/${p.id}`} key={i} className="group">
                <div className="relative aspect-video rounded-2xl border-2 border-black overflow-hidden mb-4 shadow-[6px_6px_0px_0px_#000] group-hover:shadow-[10px_10px_0px_0px_#000] transition-shadow">
                  <img
                    src={p.image}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                    alt=""
                  />
                  <div className="absolute top-2 left-2 bg-white border border-black px-2 py-1 text-xs font-bold rounded">
                    {p.category}
                  </div>
                </div>
                <h4 className="font-bold text-xl group-hover:underline underline-offset-4 decoration-2">
                  {p.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Simple */}
      <footer className="border-t-4 border-black bg-yellow-300 pt-0 pb-12 overflow-hidden relative">
        {/* Marquee */}
        <div className="bg-black text-white py-3 overflow-hidden border-b-4 border-black">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex gap-8 whitespace-nowrap font-black text-2xl uppercase tracking-widest"
          >
            {Array(10)
              .fill("Testing Me • Disrupt • Create • Ship •")
              .map((text, i) => (
                <div key={i} className="flex items-center gap-6 mx-4">
                  <span>{text}</span>
                  <img
                    src="/logo.svg"
                    alt="Brand Logo"
                    className="h-10 w-10 bg-white border-2 border-black rounded-lg p-1 object-contain shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              ))}
          </motion.div>
        </div>
        <div className="text-center pt-8 font-bold">
          <p>&copy; 2026 TestingMe.</p>
        </div>
      </footer>
    </div>
  );
}
