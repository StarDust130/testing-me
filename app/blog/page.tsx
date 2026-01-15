"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  ArrowRight,
  Clock,
  Calendar,
  User,
  Tag,
  ChevronRight,
  Flame,
  Menu,
  X,
  LogIn,
  Sparkles,
} from "lucide-react";
import { blogs as allBlogs } from "../lib/blogData";

// --- Components (Duplicated for standalone capability) ---

const NeoButton = ({
  children,
  className = "",
  variant = "primary",
  onClick,
  href,
}: any) => {
  const variants: any = {
    primary: "bg-[#3b82f6] text-white hover:bg-[#2563eb] active:bg-[#1d4ed8]",
    secondary: "bg-white text-black hover:bg-yellow-300",
    ghost:
      "bg-transparent text-black hover:bg-gray-100 border-transparent shadow-none hover:shadow-none translate-x-0 translate-y-0",
  };

  const buttonClasses = `
    relative px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-200 select-none cursor-pointer border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[0px_0px_0px_0px_#000]
    ${variants[variant]}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

const BlogCard = ({ post, index }: { post: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
    className="group relative h-full flex flex-col"
  >
    <Link href={`/blog/${post.id}`} className="block h-full">
      <div className="bg-white border-2 border-black rounded-3xl overflow-hidden flex flex-col h-full shadow-[8px_8px_0px_0px_#000] group-hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-black">
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <span className="bg-yellow-300 border-2 border-black px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000]">
              {post.category}
            </span>
          </div>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-3">
            <Calendar size={14} /> {post.date} • <Clock size={14} />{" "}
            {post.readTime}
          </div>

          <h3 className="text-2xl font-black mb-3 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-600 text-sm font-medium line-clamp-3 mb-6 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100 mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-black overflow-hidden">
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-bold">{post.author.name}</span>
            </div>
            <ArrowRight
              size={20}
              className="transform -rotate-45 group-hover:rotate-0 transition-transform"
            />
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const categories = ["All", "Design", "Coding", "AI", "Opinion", "UX", "Life"];

export default function BlogListing() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const blogs =
    activeCategory === "All"
      ? allBlogs
      : allBlogs.filter(
          (p) =>
            p.category === activeCategory || p.tags.includes(activeCategory)
        );

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-yellow-300">
      {/* --- Navbar (Compact version) --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative bg-yellow-300 border-2 border-black px-2 py-1 rounded-lg">
              <span className="font-black text-xs">TM</span>
            </div>
            <span className="font-black text-xl group-hover:text-blue-600 transition-colors">
              TestingMe / Blog
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 font-bold text-sm">
            <Link
              href="/"
              className="hover:underline underline-offset-4 decoration-2"
            >
              Home
            </Link>
            <Link href="#" className="text-blue-600">
              Articles
            </Link>
            <Link
              href="#"
              className="hover:underline underline-offset-4 decoration-2"
            >
              Podcasts
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 border-2 border-transparent hover:border-black rounded-full hover:bg-gray-100 transition-all">
              <Search size={20} />
            </button>
            <NeoButton
              href="/"
              variant="primary"
              className="hidden sm:flex text-sm py-2 px-4"
            >
              Subscribe
            </NeoButton>

            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <section className="mb-24 relative">
          <div className="absolute top-0 right-0 -z-10 opacity-10">
            <Sparkles size={200} />
          </div>

          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <span className="inline-block px-4 py-2 bg-yellow-300 border-2 border-black font-black text-sm mb-4 shadow-[4px_4px_0px_0px_#000] rotate-[-2deg]">
                EST. 2026
              </span>
              <h1 className="text-6xl md:text-8xl font-black font-display leading-[0.9] tracking-tighter">
                THE
                <br />
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500"
                  style={{ WebkitTextStroke: "2px black" }}
                >
                  ARCHIVE
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold max-w-md text-left md:text-right text-gray-600"
            >
              Documenting the digital chaos.
              <br />
              <span className="text-black">One hot take at a time.</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full bg-black h-4 rounded-full overflow-hidden border-2 border-black relative"
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-300 via-pink-500 to-blue-500 w-full"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </section>

        {/* Categories Bar */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex items-center gap-3 min-w-max px-2">
            <div className="flex items-center gap-2 mr-4 font-bold text-gray-500">
              <Filter size={16} /> Filter by:
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                            px-4 py-2 rounded-full font-bold border-2 transition-all whitespace-nowrap
                            ${
                              activeCategory === cat
                                ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_#888]"
                                : "bg-white text-black border-gray-200 hover:border-black hover:bg-gray-50"
                            }
                        `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Grid (First 2 large, rest normal) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Post - Spans 2 cols on large screens */}
          <div className="md:col-span-2 lg:col-span-2 row-span-2">
            <Link href="/blog/1" className="group h-full block">
              <motion.div
                whileHover={{ scale: 0.99 }}
                className="relative h-full min-h-[500px] rounded-3xl border-2 border-black overflow-hidden flex flex-col justify-end p-8 shadow-[12px_12px_0px_0px_#000]"
              >
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2000&auto=format&fit=crop"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt="Featured"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
                </div>

                <div className="relative z-10 text-white">
                  <span className="inline-block bg-blue-500 text-white font-black px-3 py-1 rounded-lg border-2 border-black mb-4 shadow-[4px_4px_0px_0px_#000]">
                    FEATURED
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black mb-4 leading-[0.9] group-hover:underline decoration-yellow-300 underline-offset-8">
                    The Future of Web is Low Fidelity.
                  </h2>
                  <p className="text-lg text-gray-200 line-clamp-2 max-w-2xl mb-6">
                    Why ultra-clean corporate Memphis art styles are dying and
                    what's coming next is messy, human, and wonderfully
                    imperfect.
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-500"></div>
                      <span className="font-bold">By Alex Chen</span>
                    </div>
                    <div className="w-px h-4 bg-gray-500"></div>
                    <span className="font-mono text-sm text-yellow-300">
                      14 min read
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Other posts */}
          {blogs.map((post, idx) => (
            <BlogCard key={post.id} post={post} index={idx} />
          ))}
        </div>

        {/* Newsletter / CTA */}
        <section className="mt-24">
          <div className="bg-pink-300 border-4 border-black rounded-[3rem] p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-300 rounded-full border-2 border-black -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-400 rounded-full border-2 border-black translate-x-1/3 translate-y-1/3"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <Flame size={48} className="mx-auto mb-6" />
              <h2 className="text-4xl font-black mb-4">
                Don't miss the next revolution
              </h2>
              <p className="text-lg font-bold mb-8 opacity-80">
                Join 50,000+ builders getting our weekly raw insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="px-6 py-4 rounded-xl border-2 border-black font-bold text-lg min-w-[300px] outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow"
                />
                <NeoButton>Subscribe</NeoButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col p-6">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 border-2 border-black rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-3xl font-black uppercase">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="#" className="text-blue-600">
              Articles
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Newsletter
            </Link>
          </nav>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 border-t-4 border-yellow-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black">TestingMe.</div>
          <div className="flex gap-6 font-bold text-gray-400">
            <a href="#" className="hover:text-white">
              Twitter
            </a>
            <a href="#" className="hover:text-white">
              GitHub
            </a>
            <a href="#" className="hover:text-white">
              RSS
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
