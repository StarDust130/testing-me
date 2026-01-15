"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  PenLine,
  Bookmark,
  Flame,
  Sparkles,
  Calendar,
  Tag,
  ArrowRight,
  Menu,
  BookOpen,
  Share2,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

// --- Reusable Components ---

const BrutalButton = ({ children, className, icon: Icon }) => (
  <motion.button
    whileHover={{
      scale: 1.05,
      translateX: 2,
      translateY: 2,
      boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
    }}
    whileTap={{
      scale: 0.95,
      translateX: 0,
      translateY: 0,
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    }}
    className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 border-black bg-white text-black font-bold uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}
  >
    {Icon && <Icon size={18} />}
    {children}
  </motion.button>
);

const PostItem = ({ title, meta, tag, accent = "bg-sky-200" }) => (
  <div className="flex items-start gap-4 py-3 border-b-2 border-black last:border-0 hover:bg-sky-50 transition-colors cursor-pointer group">
    <motion.div
      whileHover={{ rotate: -6, scale: 1.05 }}
      className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0 ${accent}`}
    >
      <Bookmark size={16} className="text-black" />
    </motion.div>
    <div className="flex-1">
      <h4 className="font-black text-black text-sm leading-tight group-hover:underline decoration-2 underline-offset-2">
        {title}
      </h4>
      <p className="text-[11px] font-mono font-bold text-gray-500 mt-1 uppercase flex items-center gap-2">
        <Calendar size={12} /> {meta}
      </p>
      {tag && (
        <span className="inline-block mt-2 text-[10px] uppercase font-black tracking-widest px-2 py-1 bg-black text-white">
          {tag}
        </span>
      )}
    </div>
  </div>
);

const StoryCard = ({ category, title, excerpt, image, stats, tags = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    viewport={{ once: true }}
    className="relative flex flex-col bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-[14px_14px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
  >
    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-blue-700" />
    <div className="absolute top-6 left-6 -translate-y-1/2 bg-[#dbeafe] border-2 border-black px-5 py-1 rounded-full z-10">
      <span className="font-black uppercase text-xs tracking-widest flex items-center gap-2">
        <PenLine size={14} /> {category}
      </span>
    </div>

    <div className="relative w-full aspect-[4/3] bg-slate-900 border-b-4 border-black overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-3 left-3 flex gap-2 text-[10px] uppercase font-black text-white">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-black/70 px-2 py-1 border border-white/30"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute top-3 right-3 bg-white text-black text-[10px] font-black uppercase px-2 py-1 rounded-full border border-black">
        {stats.readTime}
      </div>
    </div>

    <div className="p-6 flex-1 flex flex-col gap-4">
      <h3 className="text-2xl font-black leading-tight uppercase">{title}</h3>
      <p className="text-sm font-semibold text-gray-700 leading-relaxed flex-1">
        {excerpt}
      </p>
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase">
        <span className="bg-black text-white px-2 py-1">{stats.date}</span>
        <span className="flex items-center gap-1 text-blue-600">
          <Sparkles size={14} /> {stats.trend}
        </span>
      </div>
    </div>

    <div className="border-t-2 border-black p-4 flex items-center justify-between font-black uppercase text-xs tracking-widest bg-[#e0f2fe]">
      <span className="flex items-center gap-2">
        <BookOpen size={14} /> Read Story
      </span>
      <ArrowRight size={16} />
    </div>
  </motion.div>
);

// --- Main Layout ---

export default function PodcastUI() {
  const featuredStories = [
    {
      category: "Blueprints",
      title: "Design Systems that Scale Without Getting Boring",
      excerpt:
        "A visual playbook for keeping components fresh while keeping engineers sane.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop",
      stats: {
        date: "Jan 14, 2026",
        readTime: "8 min read",
        trend: "Trending #2",
      },
      tags: ["UI", "Systems", "Ops"],
    },
    {
      category: "Strategy",
      title: "Why Blue Brands Convert Better in 2026",
      excerpt:
        "Color psychology, motion pacing, and contrast ratios that keep users clicking.",
      image:
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2070&auto=format&fit=crop",
      stats: {
        date: "Jan 11, 2026",
        readTime: "6 min read",
        trend: "Hot",
      },
      tags: ["Brand", "Color", "Conversion"],
    },
    {
      category: "Workflow",
      title: "Shipping Faster with Editorial Sprints",
      excerpt:
        "Borrow sprint rituals from product to keep your content pipeline predictable.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
      stats: {
        date: "Jan 09, 2026",
        readTime: "7 min read",
        trend: "Editor Pick",
      },
      tags: ["Process", "Teams", "Velocity"],
    },
    {
      category: "Field Notes",
      title: "Night Mode Writing: Routines for Deep Focus",
      excerpt:
        "Lighting, soundscapes, and micro-breaks that keep late sessions crisp.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070&auto=format&fit=crop",
      stats: {
        date: "Jan 07, 2026",
        readTime: "5 min read",
        trend: "Rising",
      },
      tags: ["Writing", "Habits", "Focus"],
    },
  ];

  const trendingPosts = [
    {
      title:
        "How to build an unstoppable note-taking system that survives chaos",
      meta: "Jan 14, 2026 - 6 min read",
      tag: "Systems",
      accent: "bg-sky-200",
    },
    {
      title: "The 3-part formula behind newsletters people actually finish",
      meta: "Jan 10, 2026 - 5 min read",
      tag: "Newsletter",
      accent: "bg-cyan-200",
    },
    {
      title:
        "Why personal websites are the new resumes (and how to style yours)",
      meta: "Jan 09, 2026 - 8 min read",
      tag: "Career",
      accent: "bg-blue-200",
    },
    {
      title: "Story-first product updates: release notes people want to read",
      meta: "Jan 05, 2026 - 4 min read",
      tag: "Product",
      accent: "bg-indigo-200",
    },
  ];

  const editorPicks = [
    {
      title: "The Minimalist Social Stack",
      blurb: "How to publish everywhere without burning out.",
      badge: "Playbook",
      accent: "bg-[#d9f99d]",
    },
    {
      title: "Cover Story: Indie Magazines Making Print Cool Again",
      blurb: "Tactile joy in a swipe era and what digital can borrow.",
      badge: "Feature",
      accent: "bg-[#bfdbfe]",
    },
    {
      title: "Inside the Studio: Building Rituals for Deep Work",
      blurb: "Small, repeatable actions that stack into momentum.",
      badge: "Studio",
      accent: "bg-[#fecdd3]",
    },
  ];

  const notebook = [
    {
      title: "Color palettes that read fast on mobile",
      meta: "Sketchbook - 2 min read",
      tag: "Visual",
      accent: "bg-indigo-200",
    },
    {
      title: "Questions to ask before publishing a hot take",
      meta: "Checklist - 3 min read",
      tag: "Opinion",
      accent: "bg-emerald-200",
    },
    {
      title: "Templates: hero layouts that hook scrollers",
      meta: "Toolkit - 4 min read",
      tag: "Design",
      accent: "bg-amber-200",
    },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-sky-300 selection:text-black bg-[#f5f7fb] text-black">
      <header className="bg-white text-black pt-4 border-b-4 border-blue-600 shadow-[0_8px_0_#0f172a]">
        <nav className="container mx-auto px-4 flex justify-between items-center pb-4 gap-6">
          <div className="flex items-center gap-3 bg-white border-4 border-black rounded-xl px-3 py-2 shadow-[4px_4px_0px_0px_#0ea5e9]">
            <img
              src="/logo.svg"
              alt="testingme logo"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-3xl font-black text-black tracking-tighter leading-none">
                Testingme
              </h1>
              <p className="text-[10px] uppercase font-black text-sky-600">
                Ship ideas with clarity
              </p>
            </div>
          </div>

          <div className="hidden md:flex gap-4 font-bold uppercase text-xs tracking-widest items-center">
            {[
              {
                label: "Home",
                links: ["Overview", "Releases", "Changelog"],
                image:
                  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop",
              },
              {
                label: "Stories",
                links: ["All", "Trending", "Deep Dives"],
                image:
                  "https://images.unsplash.com/photo-1529333166433-94e17876c6b6?q=80&w=600&auto=format&fit=crop",
              },
              {
                label: "Playbooks",
                links: ["Launch Kits", "Onboarding", "Growth"],
                image:
                  "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=600&auto=format&fit=crop",
              },
              {
                label: "Library",
                links: ["Templates", "Guides", "Assets"],
                image:
                  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600&auto=format&fit=crop",
              },
              {
                label: "About",
                links: ["Team", "Values", "Contact"],
                image:
                  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
              },
            ].map((item) => (
              <div key={item.label} className="relative group">
                <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                  {item.label}
                </button>
                <div className="pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 transition-all duration-200 absolute left-1/2 -translate-x-1/2 mt-3 bg-white border-2 border-black rounded-2xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] min-w-[260px] z-30">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="h-28 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <p className="absolute bottom-2 left-3 text-white text-xs font-black uppercase">
                      {item.label}
                    </p>
                  </div>
                  <div className="p-3 space-y-2">
                    {item.links.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="block text-[11px] font-black uppercase hover:text-blue-600"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 uppercase font-bold text-xs border-l border-gray-300 pl-4 text-gray-700">
              Search <Search size={16} />
            </div>
            <div className="hidden md:flex gap-2">
              <BrutalButton className="bg-white text-black border-black px-4 py-2">
                Log in
              </BrutalButton>
              <BrutalButton className="bg-blue-600  border-black px-4 py-2">
                Sign up
              </BrutalButton>
            </div>
            <Menu className="md:hidden" />
          </div>
        </nav>

        <div className="container mx-auto flex flex-col lg:flex-row min-h-[680px] gap-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 bg-gradient-to-br from-[#0f172a] via-[#0b2340] to-[#2563eb] flex flex-col justify-center p-10 lg:p-16 relative overflow-hidden text-white rounded-3xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -right-12 bottom-0 w-48 h-48 bg-blue-600 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.25),transparent_45%)]" />

            <p className="text-blue-200 font-handwriting text-4xl mb-3 rotate-[-4deg] w-fit">
              Fresh Issue
            </p>
            <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] mb-10 tracking-tighter">
              testingme
              <br />
              Creator Gazette 2026
            </h1>
            <p className="text-blue-100 text-sm font-semibold leading-relaxed max-w-xl mb-8">
              Essays, playbooks, and field notes on crafting unforgettable
              digital stories. Built for creators who publish with courage and
              taste.
            </p>

            <div className="flex flex-wrap gap-4">
              <BrutalButton
                icon={Sparkles}
                className="bg-white text-black border-black"
              >
                Start Reading
              </BrutalButton>
              <BrutalButton icon={Share2} className="bg-blue-500  border-black">
                Subscribe
              </BrutalButton>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 text-[11px] uppercase font-black tracking-widest text-black">
              {[
                "Design Systems",
                "Publishing Ops",
                "Brand Story",
                "Audience Signals",
              ].map((pill) => (
                <span
                  key={pill}
                  className="bg-white px-3 py-2 rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                >
                  <CheckCircle2 size={14} className="text-blue-600" /> {pill}
                </span>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 text-left text-xs font-mono">
              {[
                { label: "Uptime", value: "99.9%" },
                { label: "Subscribers", value: "15k" },
                { label: "UX Score", value: "4.9" },
                { label: "Words", value: "2.5k" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -2 }}
                  className="bg-white/10 border border-white/30 rounded-xl px-4 py-3 backdrop-blur-sm flex items-center justify-between"
                >
                  <span className="text-white font-semibold uppercase tracking-widest">
                    {stat.label}
                  </span>
                  <span className="text-blue-200 font-black">{stat.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 relative min-h-[420px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-transparent z-10 rounded-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop"
              alt="Modern workspace"
              className="w-full h-full object-cover rounded-3xl border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
            />

            <div className="absolute bottom-8 right-8 bg-white border-2 border-black rounded-2xl p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-xs z-20">
              <div className="flex items-center gap-2 text-xs font-black uppercase mb-2">
                <PenLine size={16} /> Live Drafting
              </div>
              <p className="text-sm font-semibold text-gray-800">
                "Writing is a sport. Train like one."
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] font-mono uppercase text-gray-500">
                <Calendar size={12} /> Updated Daily
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <section className="bg-[#e5f0ff] py-16 px-4 relative border-b-4 border-black">
        <div className="container mx-auto mb-12 flex items-center gap-4">
          <h2 className="text-4xl font-black uppercase">Featured Stories</h2>
          <div className="h-2 flex-1 bg-transparent border-t-4 border-black border-double"></div>
        </div>

        <div className="container mx-auto relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-2 -ml-1 z-0">
            <svg height="100%" width="20" className="overflow-visible">
              <path
                d="M10 0 Q 20 20 10 40 T 10 80 T 10 120 T 10 160 T 10 200 T 10 240 T 10 280 T 10 320 T 10 360 T 10 400"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="4"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {featuredStories.map((story, idx) => (
              <StoryCard key={idx} {...story} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 px-4 border-b-4 border-black">
        <div className="container mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-3xl font-black uppercase">Trending Now</h3>
              <Tag className="text-sky-500" />
            </div>
            <div className="bg-[#e0f2fe] border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="p-6">
                {trendingPosts.map((item, idx) => (
                  <PostItem key={idx} {...item} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 uppercase text-xs font-black tracking-widest">
              <Sparkles className="text-yellow-400" /> Editor's Desk
            </div>
            {editorPicks.map((pick, idx) => (
              <motion.div
                key={idx}
                whileHover={{ translateX: 4, translateY: -4, rotate: -1 }}
                className={`p-5 border-[3px] border-black rounded-2xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] bg-white ${pick.accent}`}
              >
                <span className="text-[10px] uppercase font-black tracking-widest bg-black text-white px-2 py-1 inline-block mb-3">
                  {pick.badge}
                </span>
                <h4 className="text-lg font-black mb-2 leading-tight">
                  {pick.title}
                </h4>
                <p className="text-sm font-semibold text-gray-700">
                  {pick.blurb}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111827] text-white py-16 px-4 border-y-4 border-black">
        <div className="container mx-auto grid lg:grid-cols-3 gap-10 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Flame className="text-amber-400" />
              <h3 className="text-3xl font-black uppercase">Notebook Drops</h3>
            </div>
            <p className="text-gray-300 font-semibold max-w-2xl">
              Fast, tactical notes straight from the writing floor. Steal the
              prompts, swipe the layouts, remix the rituals.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {notebook.map((note, idx) => (
                <div
                  key={idx}
                  className="bg-white text-black border-[3px] border-black rounded-2xl p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <span className="text-[10px] uppercase font-black tracking-widest bg-black text-white px-2 py-1 inline-block mb-3">
                    {note.tag}
                  </span>
                  <h4 className="font-black leading-tight mb-2">
                    {note.title}
                  </h4>
                  <p className="text-xs font-mono text-gray-600 uppercase">
                    {note.meta}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white text-black border-4 border-black rounded-3xl p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 text-xs font-black uppercase mb-3">
              <Bookmark size={16} /> Bookmark Bar
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-4">
              Save the best layouts, rituals, and prompts. Delivered Sundays.
            </p>
            <div className="flex flex-col gap-3">
              <input
                className="w-full px-4 py-3 border-2 border-black rounded-xl font-semibold"
                placeholder="Email for the drop"
              />
              <BrutalButton
                icon={ArrowRight}
                className="bg-sky-300 border-black text-black justify-center"
              >
                Subscribe Free
              </BrutalButton>
            </div>
            <p className="text-[11px] font-mono text-gray-500 mt-3 uppercase">
              No spam. Only proof-of-work ideas.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 px-4 border-b-4 border-black">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
              <Tag size={14} /> Explore Topics
            </div>
            <h3 className="text-4xl font-black uppercase">
              Dive into the stacks
            </h3>
            <p className="text-gray-700 font-semibold max-w-xl">
              Curated shelves for creators: pick a lane, binge the best, and
              bookmark the rest.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Narrative Design",
                "Publishing Systems",
                "Visual Riffs",
                "Creator Business",
                "Writing Rituals",
                "Audience Science",
              ].map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-2 bg-[#e0f2fe] border-2 border-black rounded-full font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-[#e0f2fe] border-4 border-black rounded-3xl p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 text-xs font-black uppercase mb-3">
              <ArrowRight size={16} /> Quick Dispatch
            </div>
            <p className="text-lg font-black mb-4 leading-tight">
              Get the 5-minute briefing every Monday.
            </p>
            <p className="text-sm font-semibold text-gray-700 mb-6">
              A sharp stack of 3 ideas, 2 design riffs, and 1 prompt to publish
              before coffee gets cold.
            </p>
            <div className="flex gap-3">
              <BrutalButton
                icon={Sparkles}
                className="bg-black text-white border-black"
              >
                Join Briefing
              </BrutalButton>
              <BrutalButton
                icon={Share2}
                className="bg-white text-black border-black"
              >
                Share
              </BrutalButton>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm font-mono uppercase text-gray-400">
              Built for writers who ship
            </p>
            <h4 className="text-2xl font-black">Stay bold, stay publishing.</h4>
          </div>
          <div className="flex gap-3">
            <BrutalButton
              className="bg-white text-black border-black"
              icon={ArrowRight}
            >
              Submit a Story
            </BrutalButton>
            <BrutalButton
              className="bg-sky-300 text-black border-black"
              icon={PenLine}
            >
              Pitch Us
            </BrutalButton>
          </div>
        </div>
      </footer>
    </div>
  );
}
