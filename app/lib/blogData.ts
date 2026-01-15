export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  trend: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    image: string;
    bio: string;
  };
  content: Array<{
    type: "p" | "h2" | "quote" | "img" | "code";
    text?: string;
    src?: string;
    caption?: string;
    code?: string;
  }>;
}

export const blogs: BlogPost[] = [
  {
    id: "1",
    title: "The Death of Flat Design: Why Layouts Need Chaos",
    subtitle:
      "We've spent a decade polishing pixels. Now it's time to break specific rules to gain attention.",
    excerpt:
      "Why ugly is the new beautiful and how to master the raw aesthetic.",
    image:
      "https://images.unsplash.com/photo-1594751543129-6701ad444259?q=80&w=2000&auto=format&fit=crop",
    category: "Design",
    date: "Jan 12, 2026",
    readTime: "8 min",
    trend: "+85%",
    tags: ["Design", "Trend"],
    author: {
      name: "Sarah Vollo",
      role: "Lead Designer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
      bio: "Obsessed with brutalism, typography, and breaking things.",
    },
    content: [
      {
        type: "p",
        text: "The recent resurgence of Neo-Brutalism in web design isn't just an aesthetic rebellion; it's a structural reset. By embracing raw HTML constraints, high-contrast borders, and system fonts, we aren't just mimicking the architectural brutalism of the 1950s—we’re stripping away the glossy veneer of modern SaaS kits. This anti-design movement challenges the sanitized 'premium' look, forcing users to confront the medium itself.",
      },
      { type: "h2", text: "The Homogenization of the Web" },
      {
        type: "p",
        text: "Corporate Memphis art style killed personality. When big tech companies decided that 'friendly' meant 'harmless', we lost the edge that made the web interesting in the first place. But there's a counter-movement rising.",
      },
      {
        type: "quote",
        text: "Perfection is boring. It's the imperfections that make things memorable. We are entering the era of organized chaos.",
      },
      {
        type: "img",
        src: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
        caption:
          "The contrast between old web structuralism and new wave brutalism.",
      },
      { type: "h2", text: "Why Neo-Brutalism Works" },
      {
        type: "p",
        text: "It prioritizes function and honesty over comfort, using jarring colors and asymmetrical layouts to create memorable digital experiences that stand out in a sea of sterile minimal interfaces. It stops the user's scroll. It demands attention. It says 'I am here' rather than 'I am a polite background service'.",
      },
    ],
  },
  {
    id: "2",
    title: "Scaling Node.js to 1 Million Users",
    subtitle:
      "Real-world lessons from the trenches of high-scale architecture.",
    excerpt: "Real-world lessons from the trenches of high-scale architecture.",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bm9kZSUyMGpzfGVufDB8fDB8fHww",
    category: "DevOps",
    date: "Jan 10, 2026",
    readTime: "15 min",
    trend: "Viral",
    tags: ["Backend", "Scale"],
    author: {
      name: "Mike Ross",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150",
      bio: "Building systems that don't sleep.",
    },
    content: [
      {
        type: "p",
        text: "When scaling Node.js architectures, the event loop is rarely the culprit; the bottleneck almost always shifts to the database layer. At 10,000 requests per second, your struggle won't be V8's execution speed, but rather connection pool exhaustion and blocking I/O on unindexed queries.",
      },
      { type: "h2", text: "The Database Bottleneck" },
      {
        type: "p",
        text: "Implementing read replicas and aggressive Redis caching strategies effectively buys time, but true scalability often requires architectural shifts—like moving from monolithic SQL instances to sharded clusters or adopting CQRS patterns to decouple write-heavy logic from read-heavy user interfaces.",
      },
      {
        type: "img",
        src: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2000&auto=format&fit=crop",
        caption: "Server rack architecture diagram (conceptual).",
      },
      {
        type: "code",
        code: "const pool = new Pool({\n  max: 20,\n  idleTimeoutMillis: 30000,\n  connectionTimeoutMillis: 2000,\n});",
      },
    ],
  },
  {
    id: "3",
    title: "How to Fire Your Boss and Start Creating",
    subtitle:
      "A 5-step detailed guide to financial independence for developers.",
    excerpt:
      "A 5-step detailed guide to financial independence for developers.",
    image:
      "https://images.unsplash.com/photo-1553531384-cc64ac80f931?q=80&w=2000&auto=format&fit=crop",
    category: "Career",
    date: "Oct 20, 2025",
    readTime: "10 min",
    trend: "Hot",
    tags: ["Freedom", "Money"],
    author: {
      name: "Lisa Wong",
      role: "Indie Hacker",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150",
      bio: "Leaving the 9-5 to build the 24/7 dream.",
    },
    content: [
      {
        type: "p",
        text: "For software engineers, the path to financial independence (FIRE) offers a unique leverage point: high income combined with geo-arbitrage. While the standard advice involves maxing out 401(k)s and index funds, the 'developer alpha' comes from treating your career as a venture capital portfolio.",
      },
      {
        type: "img",
        src: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2000&auto=format&fit=crop",
        caption: "The miracle of compound interest vs. linear salary growth.",
      },
      {
        type: "p",
        text: "Diversifying into side projects, SaaS micro-bets, or consulting retainers creates asynchronous income streams that decouple earning potential from hourly labor. It’s less about extreme frugality and more about optimizing your 'burn rate' while algorithmically increasing your exposure to luck.",
      },
    ],
  },
  {
    id: "4",
    title: "Generative Art: Beyond Midjourney",
    subtitle: "Exploring local stable diffusion models and custom Loras.",
    excerpt: "Exploring local stable diffusion models and custom Loras.",
    image:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2000&auto=format&fit=crop",
    category: "AI Tools",
    date: "Oct 18, 2025",
    readTime: "7 min",
    trend: "New",
    tags: ["AI", "Art"],
    author: {
      name: "Alex Chen",
      role: "AI Researcher",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150",
      bio: "Teaching robots to paint.",
    },
    content: [
      {
        type: "img",
        src: "https://images.unsplash.com/photo-1684369175836-3a726663c76d?q=80&w=2000&auto=format&fit=crop",
        caption: "Latent space visualization generated by AI.",
      },
      {
        type: "p",
        text: "Navigating the latent space of models like Stable Diffusion is less about engineering and more like exploring a high-dimensional library of everything that has ever been drawn. When we craft prompts, we are essentially calculating vectors to steer the model towards a specific cluster of concepts.",
      },
      {
        type: "p",
        text: "The magic isn't in the pixel generation itself, but in how the neural network interpolates between disparate ideas—blending the texture of oil painting with the geometry of cyberpunk architecture—to visualize concepts that previously existed only in the abstract gaps between human language.",
      },
    ],
  },
  {
    id: "5",
    title: "Productivity is a Trap",
    subtitle:
      "Why optimizing your workflow might be killing your actual creative output.",
    excerpt:
      "Why optimizing your workflow might be killing your actual creative output. Stop sharpening the axe and start chopping.",
    image:
      "https://plus.unsplash.com/premium_photo-1674489620667-eaf4a0094996?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8UHJvZHVjdGl2aXR5fGVufDB8fDB8fHww",
    category: "Opinion",
    date: "Jan 08, 2026",
    readTime: "5 min",
    trend: "Bold",
    tags: ["Life", "Work"],
    author: {
      name: "Mike Ross",
      role: "Founder",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150",
      bio: "Writing opinions that no one asked for.",
    },
    content: [
      {
        type: "p",
        text: "We have reached peak 'productivity porn,' where configuring our tools has become a clever procrastination mechanism disguising itself as work. Spending ten hours building the perfect Notion dashboard with interconnected databases and automated formulas often yields zero actual output.",
      },
      {
        type: "p",
        text: "Real productivity is messy and rarely fits into a rigid template. The danger of these all-encompassing workspace tools is that we confuse the map for the territory, optimizing our organizational systems while the actual creative work—the writing, coding, and designing—remains undone in the backlog.",
      },
    ],
  },
  {
    id: "6",
    title: "CSS Styles that feel illegal",
    subtitle: "Using :has(), container queries, and scroll-driven animations.",
    excerpt:
      "Using :has(), container queries, and scroll-driven animations to build things that previously required 20kb of JavaScript.",
    image:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2000&auto=format&fit=crop",
    category: "CSS",
    date: "Jan 05, 2026",
    readTime: "6 min",
    trend: "Tech",
    tags: ["Code", "Frontend"],
    author: {
      name: "Lisa Wong",
      role: "Frontend Lead",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150",
      bio: "Making the web beautiful, one div at a time.",
    },
    content: [
      {
        type: "p",
        text: "The introduction of :has() and Container Queries marks the most significant shift in CSS logic since Flexbox. For over a decade, we've built components that were context-dumb, unaware of their parents or content volume. With :has(), we finally have a parent selector, allowing styles to react conditionally based on child states.",
      },
      {
        type: "p",
        text: "Paired with Container Queries, which allow components to adapt based on their available wrapper space rather than the entire viewport, we are moving towards truly modular UI systems that are portable, encapsulated, and intrinsically responsive.",
      },
    ],
  },
  {
    id: "7",
    title: "The AI Tools We Actually Use",
    subtitle:
      "Filtering the hype from the helpful. A look at our internal stack.",
    excerpt:
      "Filtering the hype from the helpful. A look at our internal stack for code generation and asset creation.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop",
    category: "AI",
    date: "Dec 30, 2025",
    readTime: "9 min",
    trend: "Guide",
    tags: ["AI", "Tools"],
    author: {
      name: "Alex Chen",
      role: "AI Lead",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150",
      bio: "Automating myself out of a job.",
    },
    content: [
      {
        type: "p",
        text: "The modern developer's stack has evolved beyond IDEs and CLIs to include a layer of stochastic assistance. Integrating GitHub Copilot for boilerplate logic and Midjourney for asset generation creates a synthetic workflow where the human acts more as a conductor than a laborer.",
      },
      {
        type: "img",
        src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
        caption: "Our AI tool stack.",
      },
      {
        type: "p",
        text: "This shift requires a new skill set: rigorous code review and prompt engineering. The challenge now isn't writing the code from scratch, but validating the AI's hallucinations and ensuring security standards, effectively turning every junior developer into a senior editor of machine-generated output.",
      },
    ],
  },
  {
    id: "8",
    title: "Dark Patterns in Modern UX",
    subtitle:
      "How companies trick you into clicking, and how to spot the manipulation.",
    excerpt:
      "How companies trick you into clicking, and how to spot the manipulation.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop",
    category: "UX",
    date: "Dec 25, 2025",
    readTime: "7 min",
    trend: "Dark",
    tags: ["UX", "Ethics"],
    author: {
      name: "Sarah Vollo",
      role: "Design Ethics",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
      bio: "Fighting for the user.",
    },
    content: [
      {
        type: "p",
        text: "Dark patterns have evolved from annoying pop-ups to deeply psychological predatory designs woven into the fabric of user experience. Whether it's the 'roach motel' subscription model that is easy to enter but impossible to leave, or confirm-shaming copy that manipulates emotional states, these patterns exploit cognitive biases for short-term conversion metrics",
      },
      {
        type: "p",
        text: "While they drive immediate KPI growth, they incur massive 'trust debt.' Ethical UX isn't just a moral stance; it's a long-term retention strategy, as users inevitably migrate away from platforms that treat their attention as a resource to be mined rather than respected.",
      },
    ],
  },
];
