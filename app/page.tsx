"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenLine,
  Bookmark,
  Sparkles,
  Calendar,
  ArrowRight,
  Menu,
  BookOpen,
  Twitter,
  Linkedin,
  Github,
  Mail,
  ChevronLeft,
  ChevronRight,
  Zap,
  User,
  LogIn,
  X,
} from "lucide-react";
import { blogs } from "./lib/blogData";

// --- Types ---
interface NeoButtonProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ElementType;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  href?: string;
}

interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

interface PostItemProps {
  title: string;
  meta: string;
  tag?: string;
}

interface StoryCardProps {
  id?: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  stats: {
    date: string;
    readTime: string;
    trend: string;
  };
  tags?: string[];
}

interface ImageSliderProps {
  images: string[];
}

// --- Reusable Components ---

const NeoButton: React.FC<NeoButtonProps> = ({
  children,
  className = "",
  icon: Icon,
  variant = "primary",
  onClick,
  href,
}) => {
  const variants = {
    primary: "bg-[#3b82f6] text-white hover:bg-[#2563eb] active:bg-[#1d4ed8]",
    secondary: "bg-white text-black hover:bg-yellow-300",
    ghost:
      "bg-transparent text-black hover:bg-gray-100 border-transparent shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0",
  };

  const isGhost = variant === "ghost";

  const Content = () => (
    <>
      {Icon && <Icon size={20} strokeWidth={2.5} />}
      {children}
    </>
  );

  const buttonClasses = `
    relative px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors duration-200 select-none cursor-pointer
    ${!isGhost ? "border-2 border-black nb-shadow" : ""}
    ${variants[variant]}
    ${className}
  `;

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={
          !isGhost ? { x: -4, y: -4, boxShadow: "8px 8px 0px 0px #000" } : {}
        }
        whileTap={
          !isGhost
            ? { x: 0, y: 0, boxShadow: "0px 0px 0px 0px #000" }
            : { scale: 0.95 }
        }
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className={buttonClasses}
      >
        <Content />
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={
        !isGhost ? { x: -4, y: -4, boxShadow: "8px 8px 0px 0px #000" } : {}
      }
      whileTap={
        !isGhost
          ? { x: 0, y: 0, boxShadow: "0px 0px 0px 0px #000" }
          : { scale: 0.95 }
      }
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={buttonClasses}
    >
      <Content />
    </motion.button>
  );
};

const NeoCard: React.FC<NeoCardProps> = ({
  children,
  className = "",
  hover = true,
}) => (
  <motion.div
    whileHover={
      hover
        ? { y: -8, x: -4, boxShadow: "12px 12px 0px 0px #000", rotate: -1 }
        : {}
    }
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    className={`bg-white border-2 border-black rounded-2xl nb-shadow-lg p-6 ${className}`}
  >
    {children}
  </motion.div>
);

const NavDropdown = ({ items }: { items: string[] }) => (
  <div className="absolute top-full left-0 mt-4 w-56 bg-white border-2 border-black rounded-xl p-2 shadow-[8px_8px_0px_0px_#000] z-50 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out">
    {items.map((item, i) => (
      <a
        key={i}
        href="/blogblog"
        className="block px-4 py-3 font-bold text-sm hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors flex justify-between items-center group/item"
      >
        {item}
        <ArrowRight
          size={14}
          className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all"
        />
      </a>
    ))}
  </div>
);

const PostItem: React.FC<PostItemProps> = ({ title, meta, tag }) => (
  <motion.div
    whileHover={{ x: -2, y: -2, boxShadow: "5px 5px 0px 0px #000" }}
    className="flex items-start gap-4 p-4 rounded-xl border-2 border-black bg-white transition-all cursor-pointer group hover:bg-yellow-100"
  >
    <div
      className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-blue-500 border-2 border-black shadow-[2px_2px_0px_0px_#000]`}
    >
      <Bookmark size={20} className="text-white" strokeWidth={2.5} />
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-black text-[15px] leading-snug group-hover:text-blue-600 transition-colors">
        {title}
      </h4>
      <p className="text-[13px] text-gray-600 mt-1 flex items-center gap-2 font-medium">
        <Calendar size={12} strokeWidth={2.5} /> {meta}
      </p>
      {tag && (
        <span className="inline-block mt-2 text-[11px] font-bold px-3 py-1 bg-black text-white rounded-md">
          {tag}
        </span>
      )}
    </div>
  </motion.div>
);

const StoryCard: React.FC<StoryCardProps> = ({
  id,
  category,
  title,
  excerpt,
  image,
  stats,
  tags = [],
}) => (
  <a href={`/blog/${id || 1}`} className="block h-full">
    <motion.div
      className="relative flex flex-col group h-full"
      whileHover="hover"
    >
      <motion.div
        variants={{
          hover: { y: -8, x: -4, boxShadow: "10px 10px 0px 0px #000" },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white border-2 border-black rounded-3xl nb-shadow-lg overflow-hidden flex flex-col h-full bg-white relative z-10"
      >
        <div className="absolute top-4 left-4 z-10">
          <motion.span
            variants={{ hover: { rotate: -3, scale: 1.1 } }}
            className="bg-yellow-300 border-2 border-black px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-2 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            <PenLine size={14} strokeWidth={2.5} /> {category}
          </motion.span>
        </div>

        <div className="relative w-full aspect-4/3 border-b-2 border-black overflow-hidden bg-gray-100">
          <motion.img
            variants={{ hover: { scale: 1.1 } }}
            transition={{ duration: 0.4 }}
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white border-2 border-black px-3 py-1 rounded-lg font-bold text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            {stats.readTime}
          </div>

          <div className="absolute bottom-4 left-4 flex gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-md border border-black"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col gap-4">
          <h3 className="text-2xl font-black leading-tight text-black font-display group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-medium flex-1">
            {excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-gray-100">
            <span className="font-bold text-xs text-gray-500">
              {stats.date}
            </span>
            <span className="flex items-center gap-1 text-black font-bold text-xs bg-green-200 px-2 py-1 rounded-md border-2 border-black">
              <Sparkles size={12} strokeWidth={2.5} /> {stats.trend}
            </span>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t-2 border-black flex items-center justify-between font-bold text-sm text-black group-hover:bg-blue-300 transition-colors">
          <span className="flex items-center gap-2">
            <BookOpen size={16} strokeWidth={2.5} /> Read Article
          </span>
          <motion.div variants={{ hover: { x: 5 } }}>
            <ArrowRight size={18} strokeWidth={2.5} />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-blue-500 rounded-3xl border-2 border-black z-0"
        initial={{ opacity: 0, x: 0, y: 0 }}
        variants={{ hover: { opacity: 1, x: 8, y: 8 } }}
      />
    </motion.div>
  </a>
);

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full rounded-2xl border-2 border-black overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Hero slide"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black/10 z-10">
        <motion.div
          key={currentIndex}
          className="h-full bg-yellow-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
        />
      </div>
    </div>
  );
};

// --- Main Layout ---

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroImages = [
    "https://images.unsplash.com/photo-1499750310159-5254f4122cce?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop",
  ];

  const featuredStories = blogs.slice(0, 4).map((b) => ({
    id: b.id,
    category: b.category,
    title: b.title,
    excerpt: b.excerpt,
    image: b.image,
    stats: { date: b.date, readTime: b.readTime, trend: b.trend },
    tags: b.tags,
  }));

  const trendingTopics = [
    {
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop",
      title: "React Patterns",
    },
    {
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2000&auto=format&fit=crop",
      title: "Web 3.0",
    },
    {
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop",
      title: "AI Gen",
    },
    {
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
      title: "CyberSec",
    },
  ];

  const creators = [
    {
      name: "Shallu G",
      role: "Senior Div Centerer",
      img: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Shallu G",
      role: "CSS !important Abuser",
      img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Shallu G 2.0",
      role: "HTML 6 Architect",
      img: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YW5pbWUlMjBnaXJsfGVufDB8fDB8fHww",
    },
    {
      name: "Again Shallu G",
      role: "console.log('God')",
      img: "https://images.unsplash.com/photo-1708034677699-6f39d9c59f6e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5pbWUlMjBnaXJsfGVufDB8fDB8fHww",
    },
  ];

  const menuItems = [
    { name: "Topics", href: "#topics" },
    { name: "Featured", href: "#featured" },
    { name: "Creators", href: "#creators" },
    { name: "Notebook", href: "#notebook" },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-pink-300 selection:text-black">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 border-b-2 border-black ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
          >
            {/* Logo integration as requested */}
            <div className="relative group">
              <div className="absolute inset-0 bg-black rounded-lg translate-y-1 translate-x-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <div className="relative bg-yellow-300 border-2 border-black px-2 py-1 rounded-lg">
                <img
                  src="/logo.svg"
                  alt="TM Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>
            <span className="text-2xl font-black tracking-tight hidden sm:block">
              TestingMe
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-2 font-bold text-sm">
            {/* Cool Dropdown for Stories */}
            <div className="relative group px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <span className="flex items-center gap-1">
                Stories{" "}
                <ArrowRight
                  size={14}
                  className="rotate-90 group-hover:-rotate-90 transition-transform"
                />
              </span>
              <NavDropdown
                items={["Tech", "Desgin", "Culture", "Future", "Tutorials"]}
              />
            </div>

            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ rotate: 90 }}
              className="p-2 hover:bg-gray-100 rounded-lg border-2 border-black transition-all lg:hidden relative z-50"
            >
              {isMobileMenuOpen ? (
                <X size={24} strokeWidth={2.5} />
              ) : (
                <Menu size={24} strokeWidth={2.5} />
              )}
            </motion.button>

            <div className="hidden sm:flex items-center gap-3">
              <NeoButton
                variant="ghost"
                icon={LogIn}
                className="hidden md:flex"
                href="/blog"
              >
                Login
              </NeoButton>
              <NeoButton variant="primary" icon={User} href="/blog">
                Sign Up
              </NeoButton>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-yellow-300 z-40 flex flex-col items-center justify-center p-8 lg:hidden"
            >
              <div className="flex flex-col gap-6 w-full max-w-sm text-center">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-black hover:text-white transition-colors uppercase"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="h-1 bg-black w-full my-6 opacity-20"></div>
                <NeoButton
                  className="w-full justify-center text-xl py-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up Now
                </NeoButton>
                <NeoButton
                  variant="ghost"
                  className="w-full justify-center text-xl py-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Member Login
                </NeoButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* Hero Section */}
          <section
            id="hero"
            className="grid lg:grid-cols-12 gap-12 items-center relative min-h-[600px]"
          >
            {/* Background Marquee */}
            <div className="absolute inset-0 -z-10 overflow-hidden flex items-center justify-center pointer-events-none opacity-[0.03] -rotate-6 scale-125">
              <motion.div
                animate={{ x: [0, -2000] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
                className="whitespace-nowrap font-black text-[12rem] uppercase select-none leading-none"
              >
                TESTING ME • DISRUPT • CREATE • SHIP • TESTING ME • DISRUPT •
                CREATE • SHIP •
              </motion.div>
            </div>

            <div className="lg:col-span-6 relative z-10 space-y-8 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-wrap gap-2 mb-6">
                  {["#DESIGN", "#TECH", "#CULTURE"].map((tag, i) => (
                    <motion.span
                      key={i}
                      whileHover={{
                        scale: 1.1,
                        rotate: 3,
                        backgroundColor: "#facc15",
                        color: "#000",
                      }}
                      className="bg-black text-white px-3 py-1 rounded-lg font-black text-xs border-2 border-transparent hover:border-black transition-all cursor-crosshair"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <h1 className="text-6xl md:text-[6.5rem] font-black leading-[0.85] tracking-tight mb-8 font-display text-black drop-shadow-sm">
                  READ. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    CREATE.
                  </span>
                  <br />
                  <span className="relative inline-block">
                    DISRUPT.
                    <motion.svg
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="absolute w-full h-4 -bottom-1 left-0 text-yellow-300 -z-10"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 5 Q 50 10 100 5"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                      />
                    </motion.svg>
                  </span>
                </h1>

                <p className="text-xl text-gray-700 font-bold max-w-lg leading-relaxed border-l-8 border-yellow-300 pl-6 mb-8">
                  The blog for those who break things. Discover raw stories,
                  unfiltered tutorials, and the bleeding edge of tech.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <NeoButton
                    className="h-16 px-10 text-xl hover:rotate-2 transition-transform shadow-[6px_6px_0px_0px_#000]"
                    variant="primary"
                    icon={Sparkles}
                    href="/blog"
                  >
                    Start Reading
                  </NeoButton>
                  <NeoButton
                    className="h-16 px-10 text-xl hover:-rotate-2 transition-transform"
                    variant="secondary"
                    icon={ArrowRight}
                    href="/blog"
                  >
                    Our Mission
                  </NeoButton>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-6 relative order-1 lg:order-2 flex items-center justify-center">
              <div className="relative w-full max-w-lg mx-auto aspect-square perspective-1000">
                {/* Decorative Elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-12 -right-12 w-40 h-40 bg-pink-400 rounded-full border-4 border-black z-0 flex items-center justify-center"
                >
                  <div className="w-full text-center font-black text-xs transform -rotate-12">
                    EST. 2026
                  </div>
                </motion.div>

                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-400 rounded-full border-4 border-black -z-10 opacity-20 blur-xl"></div>

                {/* Stacked Cards Effect */}
                <motion.div
                  initial={{ rotate: 10, x: 20 }}
                  animate={{ rotate: 6, x: 10 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-yellow-300 rounded-[2.5rem] border-4 border-black -z-10"
                />
                <motion.div
                  initial={{ rotate: -5, x: -20 }}
                  animate={{ rotate: -3, x: -10 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute inset-0 bg-purple-400 rounded-[2.5rem] border-4 border-black -z-20"
                />

                {/* Decorative Sticker */}
                <motion.div
                  animate={{ rotate: [10, 15, 10], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-6 -right-6 z-30 cursor-pointer"
                >
                  <div className="bg-white border-4 border-black px-6 py-3 rounded-full font-black text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-12 flex items-center gap-2 hover:bg-yellow-300 transition-colors">
                    <Sparkles size={16} fill="black" />
                    Fresh Content!
                  </div>
                </motion.div>

                {/* Main Card */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-full h-full rounded-[2.5rem] border-4 border-black overflow-hidden shadow-[16px_16px_0px_0px_#000] relative z-20 bg-white"
                >
                  <ImageSlider images={heroImages} />
                </motion.div>
              </div>
            </div>
          </section>

          {/* New Section: Trending Topics Grid */}
          <section id="topics">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-1 flex-1 bg-black"></div>
              <h2 className="text-4xl font-black font-display text-center uppercase">
                Popular Topics
              </h2>
              <div className="h-1 flex-1 bg-black"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trendingTopics.map((topic, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                  className="relative aspect-square rounded-2xl border-2 border-black overflow-hidden group cursor-pointer shadow-[6px_6px_0px_0px_#000]"
                >
                  <img
                    src={topic.image}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 border-t-2 border-black translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-black text-center">{topic.title}</h3>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-300 px-3 py-1 border-2 border-black rounded-lg font-black -rotate-6 group-hover:opacity-0 transition-opacity">
                    {topic.title}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Featured Sections */}
          <section id="featured">
            <div className="flex items-end justify-between mb-12 border-b-4 border-black pb-4">
              <div>
                <h2 className="text-4xl md:text-6xl font-black font-display mb-4">
                  Fresh Drops
                </h2>
                <p className="text-xl text-gray-600 font-bold bg-yellow-200 inline-block px-2 transform -rotate-1 border-2 border-transparent">
                  Curated just for you this week.
                </p>
              </div>
              <NeoButton
                variant="secondary"
                className="hidden md:flex"
                href="/blog"
              >
                View All Stories <ArrowRight size={20} />
              </NeoButton>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredStories.map((story, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  viewport={{ once: true }}
                >
                  <StoryCard {...story} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Creators Section */}
          <section
            id="creators"
            className="bg-black text-white -mx-6 px-6 py-20 relative overflow-hidden"
          >
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(#4b5563 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            ></div>

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-black font-display mb-6">
                  Meet the Minds
                </h2>
                <p className="text-xl max-w-2xl mx-auto text-gray-300 font-medium">
                  The brilliant weirdos bringing you the content you didn't know
                  you needed.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-12">
                {creators.map((creator, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center gap-4 group cursor-pointer"
                    onClick={() => (window.location.href = "/blog")}
                  >
                    <div className="w-32 h-32 rounded-full border-4 border-yellow-300 p-1 bg-white relative">
                      <img
                        src={creator.img}
                        className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        alt=""
                      />
                      <div className="absolute -bottom-2 -right-2 bg-blue-500 p-2 rounded-full border-2 border-black">
                        <Sparkles size={16} fill="white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="font-black text-xl">{creator.name}</h4>
                      <span className="text-yellow-300 font-bold">
                        {creator.role}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <NeoButton
                  variant="secondary"
                  className="border-white justify-center text-black hover:bg-yellow-300 px-4 py-2 text-sm"
                  href="/blog"
                >
                  Join the Team
                </NeoButton>
              </div>
            </div>
          </section>

          {/* Notebook / Trending Section */}
          <section id="notebook" className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="bg-blue-50 border-4 border-black rounded-[2.5rem] p-8 md:p-12 shadow-[12px_12px_0px_0px_#000] relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="bg-black p-3 rounded-xl rotate-3">
                      <PenLine size={32} className="text-white" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black">
                      The Notebook
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        title:
                          "5 Rules for designing dense data tables in 2024",
                        meta: "Yesterday • 3 min read",
                        tag: "UI Pattern",
                      },
                      {
                        title: "React 19 Hooks: What's actually changing?",
                        meta: "2 days ago • 8 min read",
                        tag: "Dev",
                      },
                      {
                        title: "The psychology of 'Cancel' buttons",
                        meta: "Oct 20 • 4 min read",
                        tag: "UX Research",
                      },
                      {
                        title: "Why CSS Variables are a superpower",
                        meta: "Oct 25 • 6 min read",
                        tag: "CSS",
                      },
                    ].map((post, i) => (
                      <PostItem key={i} {...post} />
                    ))}
                  </div>

                  <div className="mt-10 pt-6 border-t-4 border-black border-dashed flex justify-center">
                    <NeoButton
                      variant="secondary"
                      href="/blog"
                      className="w-full justify-center"
                    >
                      Load more scratches
                    </NeoButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              {/* Newsletter Box */}
              <div className="bg-pink-300 border-4 border-black rounded-[2.5rem] p-8 shadow-[12px_12px_0px_0px_#000] text-center transform hover:rotate-1 transition-transform duration-300">
                <div className="w-20 h-20 bg-white border-2 border-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Mail size={40} />
                </div>
                <h3 className="text-3xl font-black mb-4">Join the Cult.</h3>
                <p className="font-bold mb-8 text-black/80">
                  Get our weekly breakdown of what matters in tech & design. No
                  spam, just ham.
                </p>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-5 py-4 rounded-xl border-2 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                  />
                  <NeoButton
                    className="w-full justify-center bg-black text-white hover:bg-gray-800"
                    href="/blog"
                    variant="primary"
                  >
                    Access Granted
                  </NeoButton>
                </div>
              </div>

              {/* Socials */}
              <div className="flex flex-wrap gap-4 justify-center">
                {[Twitter, Linkedin, Github].map((Icon, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="p-4 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000]"
                  >
                    <Icon size={24} strokeWidth={2.5} />
                  </motion.button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
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

        <div className="max-w-7xl mx-auto px-6 pt-24 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-black rounded-xl translate-x-2 translate-y-2"></div>
                <div className="relative bg-white border-2 border-black px-6 py-4 rounded-xl inline-block">
                  <img
                    src="/logo.svg"
                    alt="TestingMe"
                    className="h-12 w-auto"
                  />
                </div>
              </div>
              <p className="font-bold text-xl max-w-sm">
                We build tools for the builders. <br />
                We tell stories for the dreamers.
              </p>
            </div>
            <div>
              <h4 className="font-black text-lg mb-6 uppercase tracking-wider">
                Platform
              </h4>
              <ul className="space-y-4 font-bold">
                {["Home", "Stories", "Guides", "Pricing"].map((i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:underline decoration-2 underline-offset-4"
                    >
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-6 uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-4 font-bold">
                {["About", "Careers", "Legal", "Contact"].map((i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:underline decoration-2 underline-offset-4"
                    >
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-64 opacity-5 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#000 2px, transparent 2px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t-2 border-black font-bold text-sm">
            <p>&copy; 2026 TestingMe Inc. Crafted with pure chaos.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className="hover:bg-black hover:text-white px-2 py-1 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:bg-black hover:text-white px-2 py-1 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:bg-black hover:text-white px-2 py-1 transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
