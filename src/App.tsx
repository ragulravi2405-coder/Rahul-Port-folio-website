import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Edit2,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Calendar,
  Award,
  BookOpen,
  MessageSquare,
  Send,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Layers,
  Terminal,
  AlertCircle,
  Plus,
  Globe,
  Upload,
  HelpCircle,
  X,
  FileText
} from "lucide-react";
import { CustomImages, Project, ChatMessage, Certification, Achievement } from "./types";

// Default SVG Fallback Illustrations so the portfolio looks gorgeous immediately
const SVG_FALLBACKS = {
  profile: () => (
    <svg viewBox="0 0 200 200" className="w-full h-full bg-gradient-to-tr from-rose-200 via-amber-100 to-sky-200">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {/* Circle highlight */}
      <circle cx="100" cy="95" r="55" fill="white" stroke="#0f172a" strokeWidth="3" className="shadow-lg" />
      {/* Programmer Body */}
      <path d="M55,160 C55,120 70,110 100,110 C130,110 145,120 145,160 Z" fill="#38bdf8" stroke="#0f172a" strokeWidth="3" />
      {/* Hoodie string */}
      <circle cx="95" cy="120" r="3" fill="#0f172a" />
      <circle cx="105" cy="120" r="3" fill="#0f172a" />
      {/* Face */}
      <circle cx="100" cy="85" r="30" fill="#fecdd3" stroke="#0f172a" strokeWidth="3" />
      {/* Hair */}
      <path d="M70,85 C70,55 130,55 130,85 C125,70 110,65 100,70 C90,65 75,70 70,85 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
      {/* Glasses */}
      <rect x="80" y="80" width="16" height="12" rx="3" fill="none" stroke="#0f172a" strokeWidth="3" />
      <rect x="104" y="80" width="16" height="12" rx="3" fill="none" stroke="#0f172a" strokeWidth="3" />
      <line x1="96" y1="86" x2="104" y2="86" stroke="#0f172a" strokeWidth="3" />
      {/* Smiling mouth */}
      <path d="M93,98 Q100,104 107,98" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      {/* Floating Sparkles & Emojis */}
      <text x="35" y="65" fontSize="24">💻</text>
      <text x="145" y="75" fontSize="24">🚀</text>
      <text x="40" y="130" fontSize="22">🐍</text>
      <text x="140" y="130" fontSize="22">⚛️</text>
    </svg>
  ),
  college: () => (
    <svg viewBox="0 0 300 160" className="w-full h-full bg-gradient-to-tr from-sky-100 to-indigo-100">
      <defs>
        <pattern id="col_grid" width="15" height="15" patternUnits="userSpaceOnUse">
          <path d="M 15 0 L 0 0 0 15" fill="none" stroke="rgba(15,23,42,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#col_grid)" />
      {/* Ground */}
      <rect x="10" y="130" width="280" height="20" rx="3" fill="#e2e8f0" stroke="#0f172a" strokeWidth="3" />
      {/* Building Body */}
      <rect x="50" y="40" width="200" height="90" fill="white" stroke="#0f172a" strokeWidth="3" />
      {/* Dome Top */}
      <path d="M120,40 C120,10 180,10 180,40 Z" fill="#ffd2e5" stroke="#0f172a" strokeWidth="3" />
      {/* Pillars */}
      <rect x="70" y="55" width="15" height="75" fill="#e0f2fe" stroke="#0f172a" strokeWidth="3" />
      <rect x="105" y="55" width="15" height="75" fill="#e0f2fe" stroke="#0f172a" strokeWidth="3" />
      <rect x="180" y="55" width="15" height="75" fill="#e0f2fe" stroke="#0f172a" strokeWidth="3" />
      <rect x="215" y="55" width="15" height="75" fill="#e0f2fe" stroke="#0f172a" strokeWidth="3" />
      {/* Large Gate */}
      <path d="M135,130 L135,90 C135,75 165,75 165,90 L165,130 Z" fill="#fff2b2" stroke="#0f172a" strokeWidth="3" />
      {/* Clock */}
      <circle cx="150" cy="50" r="12" fill="white" stroke="#0f172a" strokeWidth="2.5" />
      <line x1="150" y1="50" x2="150" y2="44" stroke="#0f172a" strokeWidth="2.5" />
      <line x1="150" y1="50" x2="155" y2="52" stroke="#0f172a" strokeWidth="2" />
      {/* Academic Stars */}
      <text x="25" y="35" fontSize="20">🎓</text>
      <text x="255" y="35" fontSize="20">📚</text>
    </svg>
  ),
  internship: () => (
    <svg viewBox="0 0 300 160" className="w-full h-full bg-gradient-to-tr from-violet-100 to-rose-100">
      {/* Office BG */}
      <rect width="100%" height="100%" fill="none" />
      {/* Big Desk */}
      <rect x="20" y="110" width="260" height="25" rx="5" fill="#fcd34d" stroke="#0f172a" strokeWidth="3" />
      {/* Big Desktop Monitor */}
      <rect x="100" y="40" width="100" height="55" rx="4" fill="white" stroke="#0f172a" strokeWidth="3" />
      {/* Screen interior content */}
      <rect x="108" y="46" width="84" height="42" rx="2" fill="#1e293b" />
      <text x="114" y="60" fill="#34d399" fontSize="8" fontFamily="monospace">&gt; npm run build</text>
      <text x="114" y="72" fill="#38bdf8" fontSize="8" fontFamily="monospace">&gt; SUCCESS_API</text>
      <text x="114" y="82" fill="#fb7185" fontSize="8" fontFamily="monospace">AK INFOPARK_</text>
      {/* Monitor Stand */}
      <rect x="140" y="95" width="20" height="15" fill="#e2e8f0" stroke="#0f172a" strokeWidth="3" />
      <ellipse cx="150" cy="110" rx="25" ry="4" fill="#64748b" stroke="#0f172a" strokeWidth="3" />
      {/* Cute coffee cup */}
      <rect x="45" y="90" width="16" height="20" rx="3" fill="#f87171" stroke="#0f172a" strokeWidth="2.5" />
      <path d="M61,94 C65,94 65,102 61,102" fill="none" stroke="#0f172a" strokeWidth="2.5" />
      {/* Custom gear decoration */}
      <text x="230" y="65" fontSize="26">⚙️</text>
      <text x="40" y="55" fontSize="26">✨</text>
    </svg>
  ),
  proj_zentora: () => (
    <svg viewBox="0 0 300 160" className="w-full h-full bg-gradient-to-tr from-amber-100 to-rose-100">
      {/* Grid pattern */}
      <defs>
        <pattern id="proj_g1" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.5" fill="rgba(15,23,42,0.1)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#proj_g1)" />
      {/* Mock Cart and Tag */}
      <g transform="translate(110, 30)">
        <circle cx="40" cy="40" r="35" fill="white" stroke="#0f172a" strokeWidth="3" />
        <text x="21" y="50" fontSize="36">🛒</text>
      </g>
      {/* Cute Price badge */}
      <rect x="40" y="85" width="65" height="30" rx="15" fill="#fff" stroke="#0f172a" strokeWidth="2.5" transform="rotate(-12, 72, 100)" />
      <text x="48" y="105" fill="#0f172a" fontWeight="bold" fontSize="13" transform="rotate(-12, 72, 100)">Zentora</text>
      {/* Floating elements */}
      <text x="45" y="45" fontSize="20">⭐</text>
      <text x="230" y="55" fontSize="22">🛍️</text>
      <text x="220" y="115" fontSize="24">💳</text>
    </svg>
  ),
  proj_globalchat: () => (
    <svg viewBox="0 0 300 160" className="w-full h-full bg-gradient-to-tr from-cyan-100 to-blue-100">
      <defs>
        <pattern id="proj_g2" width="20" height="20" patternUnits="userSpaceOnUse">
          <line x1="0" y1="20" x2="20" y2="0" stroke="rgba(15,23,42,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#proj_g2)" />
      {/* Speech bubbles */}
      <rect x="30" y="30" width="130" height="40" rx="15" fill="white" stroke="#0f172a" strokeWidth="2.5" />
      <text x="45" y="55" fill="#0f172a" fontSize="11" fontWeight="bold">Hey Rahul! React ready? ⚛️</text>
      <path d="M50,70 L50,82 L62,70 Z" fill="white" stroke="#0f172a" strokeWidth="2.5" />
      <line x1="49" y1="69" x2="61" y2="69" stroke="white" strokeWidth="4" />

      <rect x="140" y="85" width="130" height="40" rx="15" fill="#a855f7" stroke="#0f172a" strokeWidth="2.5" />
      <text x="155" y="110" fill="white" fontSize="11" fontWeight="bold">Yes, live! Chat synced! 🚀</text>
      <path d="M250,125 L250,137 L238,125 Z" fill="#a855f7" stroke="#0f172a" strokeWidth="2.5" transform="scale(-1, 1) translate(-490, 0)" />
      <line x1="239" y1="124" x2="251" y2="124" stroke="#a855f7" strokeWidth="4" />

      <text x="25" y="110" fontSize="22">💬</text>
      <text x="250" y="45" fontSize="22">🌐</text>
    </svg>
  ),
  proj_docmind: () => (
    <svg viewBox="0 0 300 160" className="w-full h-full bg-gradient-to-tr from-purple-100 to-indigo-100">
      {/* Technical circle background */}
      <circle cx="150" cy="80" r="50" fill="white" stroke="#0f172a" strokeWidth="3" />
      <text x="130" y="93" fontSize="46">🧠</text>
      {/* File sheet representation */}
      <rect x="40" y="30" width="50" height="70" rx="4" fill="#fdf2f8" stroke="#0f172a" strokeWidth="2.5" transform="rotate(-15, 65, 65)" />
      <line x1="48" y1="50" x2="82" y2="40" stroke="#0f172a" strokeWidth="2" transform="rotate(-15, 65, 65)" />
      <line x1="48" y1="62" x2="82" y2="52" stroke="#0f172a" strokeWidth="2" transform="rotate(-15, 65, 65)" />
      <line x1="48" y1="74" x2="72" y2="66" stroke="#0f172a" strokeWidth="2" transform="rotate(-15, 65, 65)" />
      {/* Glowing chatbot */}
      <rect x="210" y="40" width="55" height="50" rx="10" fill="#e0f2fe" stroke="#0f172a" strokeWidth="2.5" />
      {/* Robot Antenna */}
      <line x1="237" y1="40" x2="237" y2="28" stroke="#0f172a" strokeWidth="2.5" />
      <circle cx="237" cy="25" r="4" fill="#a855f7" stroke="#0f172a" strokeWidth="2" />
      {/* Robot eyes */}
      <circle cx="225" cy="60" r="4" fill="#0f172a" />
      <circle cx="249" cy="60" r="4" fill="#0f172a" />
      <line x1="228" y1="72" x2="246" y2="72" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

      <text x="210" y="125" fontSize="18">⚡ DocMind AI</text>
    </svg>
  ),
  proj_rideeasy: () => (
    <svg viewBox="0 0 300 160" className="w-full h-full bg-gradient-to-tr from-emerald-100 to-amber-100">
      <defs>
        <pattern id="proj_g4" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="2.5" fill="rgba(15,23,42,0.08)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#proj_g4)" />
      {/* Curved Road */}
      <path d="M10,120 Q120,40 290,110" fill="none" stroke="#64748b" strokeWidth="12" strokeLinecap="round" />
      <path d="M10,120 Q120,40 290,110" fill="none" stroke="white" strokeWidth="2" strokeDasharray="6,6" strokeLinecap="round" />
      {/* Cute yellow car */}
      <g transform="translate(120, 50)">
        {/* Car body */}
        <rect x="10" y="12" width="55" height="18" rx="5" fill="#fcd34d" stroke="#0f172a" strokeWidth="2.5" />
        <path d="M18,12 L24,2 L44,2 L52,12 Z" fill="#ffd643" stroke="#0f172a" strokeWidth="2.5" />
        {/* Windows */}
        <path d="M23,12 L26,4 L35,4 L35,12 Z" fill="#e0f2fe" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M38,12 L38,4 L43,4 L48,12 Z" fill="#e0f2fe" stroke="#0f172a" strokeWidth="1.5" />
        {/* Wheels */}
        <circle cx="24" cy="30" r="7" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
        <circle cx="24" cy="30" r="2.5" fill="white" />
        <circle cx="51" cy="30" r="7" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
        <circle cx="51" cy="30" r="2.5" fill="white" />
      </g>
      {/* GPS Location Pin */}
      <g transform="translate(240, 45)">
        <path d="M15,0 C6.7,0 0,6.7 0,15 C0,26.2 15,40 15,40 C15,40 30,26.2 30,15 C30,6.7 23.3,0 15,0 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="2.5" />
        <circle cx="15" cy="14" r="5" fill="white" stroke="#0f172a" strokeWidth="2" />
      </g>
      <text x="25" y="45" fontSize="22">🚕</text>
    </svg>
  ),
  cert_ibm: () => (
    <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-cyan-100 to-sky-200">
      <rect width="100%" height="100%" fill="none" />
      <g transform="translate(10, 10)">
        <rect x="0" y="0" width="100" height="100" rx="10" fill="white" stroke="#0f172a" strokeWidth="2.5" />
        {/* Badge Ribbon */}
        <path d="M30,70 L30,105 L50,90 L70,105 L70,70 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="2.5" />
        {/* Center Seal */}
        <circle cx="50" cy="45" r="30" fill="#fff2b2" stroke="#0f172a" strokeWidth="2.5" />
        <circle cx="50" cy="45" r="23" fill="none" stroke="#0f172a" strokeWidth="1" strokeDasharray="3,3" />
        {/* IBM Stripes representation */}
        <rect x="38" y="32" width="24" height="2" fill="#0369a1" />
        <rect x="38" y="36" width="24" height="2" fill="#0369a1" />
        <rect x="38" y="40" width="24" height="2" fill="#0369a1" />
        <rect x="38" y="44" width="24" height="2" fill="#0369a1" />
        <rect x="38" y="48" width="24" height="2" fill="#0369a1" />
        <rect x="38" y="52" width="24" height="2" fill="#0369a1" />
        <rect x="38" y="56" width="24" height="2" fill="#0369a1" />
      </g>
    </svg>
  ),
  cert_nim: () => (
    <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-200">
      <rect width="100%" height="100%" fill="none" />
      <g transform="translate(10, 10)">
        <rect x="0" y="0" width="100" height="100" rx="10" fill="white" stroke="#0f172a" strokeWidth="2.5" />
        {/* Badge Ribbon */}
        <path d="M30,70 L30,105 L50,90 L70,105 L70,70 Z" fill="#a855f7" stroke="#0f172a" strokeWidth="2.5" />
        {/* Center Seal */}
        <circle cx="50" cy="45" r="30" fill="#ffd2e5" stroke="#0f172a" strokeWidth="2.5" />
        {/* Text/Symbol inside */}
        <text x="39" y="52" fill="#0f172a" fontWeight="bold" fontSize="18" fontFamily="monospace">&lt;/&gt;</text>
      </g>
    </svg>
  ),
  cert_csc: () => (
    <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-yellow-100 to-amber-200">
      <rect width="100%" height="100%" fill="none" />
      <g transform="translate(10, 10)">
        <rect x="0" y="0" width="100" height="100" rx="10" fill="white" stroke="#0f172a" strokeWidth="2.5" />
        {/* Badge Ribbon */}
        <path d="M30,70 L30,105 L50,90 L70,105 L70,70 Z" fill="#38bdf8" stroke="#0f172a" strokeWidth="2.5" />
        {/* Center Seal */}
        <circle cx="50" cy="45" r="30" fill="#e0fbe4" stroke="#0f172a" strokeWidth="2.5" />
        {/* Python mascot layout */}
        <text x="38" y="53" fontSize="24">🐍</text>
      </g>
    </svg>
  ),
  cert_aws: () => (
    <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-200">
      <rect width="100%" height="100%" fill="none" />
      <g transform="translate(10, 10)">
        <rect x="0" y="0" width="100" height="100" rx="10" fill="white" stroke="#0f172a" strokeWidth="2.5" />
        {/* Badge Ribbon */}
        <path d="M30,70 L30,105 L50,90 L70,105 L70,70 Z" fill="#ff7a00" stroke="#0f172a" strokeWidth="2.5" />
        {/* Center Seal */}
        <circle cx="50" cy="45" r="30" fill="#fff" stroke="#0f172a" strokeWidth="2.5" />
        {/* Cloud symbol inside */}
        <path d="M40,49 C40,45 44,41 48,41 C50,41 52,43 53,44 C54,41 58,38 62,38 C67,38 71,42 71,47 C71,48 71,49 70,50 C72,50 74,52 74,55 C74,58 71,61 68,61 L43,61 C40,61 38,58 38,55 C38,52 40,49 40,49 Z" fill="#fbcfe8" stroke="#0f172a" strokeWidth="2" />
        <text x="46" y="55" fill="#0f172a" fontWeight="bold" fontSize="7" fontFamily="sans-serif">AWS</text>
      </g>
    </svg>
  )
};

// High-quality, professional, realistic fallback images for each portfolio asset are no longer used by default.
// The app will display custom uploaded photos, falling back beautifully to our branded vector SVG illustrations.

const PROJECTS: Project[] = [
  {
    id: "zentora",
    title: "Zentora",
    description: "A premium, high-performance e-commerce marketplace platform built to handle complex customer purchasing pipelines.",
    extraPoints: [
      "Dynamic product querying, multi-attribute filter tags, and real-time query matchers.",
      "Sleek shopping cart module with fluid quantity adjustments and LocalStorage session recovery.",
      "Modern visual bento layouts, aesthetic pastel cards, and lightning-fast loading speeds."
    ],
    techStack: ["React.js", "Tailwind CSS", "LocalStorage State", "lucide-react"],
    liveLink: "https://zentora-mart.vercel.app/",
    githubLink: "https://github.com/ragulravi2405-coder",
    color: "bg-rose-100",
    imageKey: "proj_zentora"
  },
  {
    id: "globalchat",
    title: "Global Chat",
    description: "A secure, instant group-messaging workspace facilitating dynamic conversational rooms and peer updates.",
    extraPoints: [
      "Instant message syncing across active client channels using dedicated WebSockets.",
      "Live user typing status triggers and visual active-presence indicator dots.",
      "Responsive, touch-optimized conversation feeds engineered for zero-lag mobile scrolling."
    ],
    techStack: ["React.js", "Node.js", "Express.js", "WebSockets", "Tailwind CSS"],
    liveLink: "https://pink-chat-iota.vercel.app/",
    githubLink: "https://github.com/ragulravi2405-coder",
    color: "bg-sky-100",
    imageKey: "proj_globalchat"
  },
  {
    id: "docmind",
    title: "DocMind AI",
    description: "An AI-powered document intelligence canvas that parses reports and files into an interactive conversational dashboard.",
    extraPoints: [
      "Context-rich document parsing with dynamic summary extraction and deep analytical search.",
      "Interactive conversational workspace to ask deep Q&A, request abstract summaries, or execute translations.",
      "Secure backend proxy services shielding Google Gemini API developer secrets safely."
    ],
    techStack: ["React.js", "Express.js", "Google Gemini API", "Node.js", "Tailwind CSS"],
    liveLink: "https://doc-mind-ai.onrender.com/",
    githubLink: "https://github.com/ragulravi2405-coder",
    color: "bg-violet-100",
    imageKey: "proj_docmind"
  },
  {
    id: "rideeasy",
    title: "Ride Easy",
    description: "A clean, responsive ride-hailing and booking interface focusing on micro-animations and estimation pipelines.",
    extraPoints: [
      "Intuitive booking tier selector with dynamic pricing estimators calculated against luxury grades.",
      "Stunning responsive layout transitions styled dynamically using Framer Motion.",
      "One-tap ride reservation logs with clean, printable ticket invoice layouts."
    ],
    techStack: ["React.js", "Framer Motion", "Tailwind CSS", "lucide-react"],
    liveLink: "https://ride-easy-ride-booking-app.vercel.app/",
    githubLink: "https://github.com/ragulravi2405-coder",
    color: "bg-amber-100",
    imageKey: "proj_rideeasy"
  }
];

const CERTIFICATIONS: Certification[] = [
  {
    id: "ibm",
    title: "IBM Cognos Tool Operations",
    issuer: "IBM Corporation",
    imageKey: "cert_ibm",
    color: "bg-cyan-50"
  },
  {
    id: "nim",
    title: "Full Stack Development",
    issuer: "NIM Technologies",
    imageKey: "cert_nim",
    color: "bg-emerald-50"
  },
  {
    id: "csc",
    title: "Python Programming",
    issuer: "CSC Computer Education",
    imageKey: "cert_csc",
    color: "bg-indigo-50"
  },
  {
    id: "aws",
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (AWS)",
    imageKey: "cert_aws",
    color: "bg-orange-50"
  }
];

const ACHIEVEMENTS: Achievement[] = [
  {
    title: "TN Skill Hackathon Top 500",
    desc: "Ranked in the Top 500 out of 25,000+ state-wide participants in the prestigious Naan Mudhalvan Innovation Hackathon.",
    badge: "🏆 Top 500 / 25,000+ Candidates",
    color: "bg-[#ffe4e6]"
  },
  {
    title: "Wadhwani Full Stack Program Top 500",
    desc: "Ranked in the Top 500 out of 30,000+ national candidates, demonstrating top-tier software design proficiency.",
    badge: "💻 Top 500 / 30,000+ Candidates",
    color: "bg-[#f3e8ff]"
  },
  {
    title: "Consecutive 3x Semester First Rank",
    desc: "Secured Department First Rank for 3 consecutive semesters in Computer Science & Engineering.",
    badge: "🥇 CSE Department First Rank",
    color: "bg-[#fef9c3]"
  },
  {
    title: "Flawless Academic Standing",
    desc: "Maintained a strong cumulative score of 8.5+ CGPA with exactly Zero Arrears throughout his B.E. journey.",
    badge: "⭐ 8.5+ CGPA & Zero Arrears",
    color: "bg-[#ccfbf1]"
  }
];

const SKILLS_INVENTORY = [
  { category: "Programming Languages", items: ["Python", "JavaScript", "SQL", "HTML5", "CSS3"], color: "bg-rose-100" },
  { category: "Frontend Core", items: ["React.js", "Bootstrap", "Tailwind CSS", "Framer Motion"], color: "bg-sky-100" },
  { category: "Backend & Databases", items: ["Node.js", "Express.js", "MongoDB", "REST APIs"], color: "bg-violet-100" },
  { category: "AI & Clouds", items: ["Generative AI", "Prompt Engineering", "NumPy", "AWS Basics", "Linux", "Git", "GitHub"], color: "bg-amber-100" }
];

export default function App() {
  // State for Customizable Images stored in LocalStorage
  const [customImages, setCustomImages] = useState<CustomImages>(() => {
    const saved = localStorage.getItem("rahul_portfolio_images");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load local portfolio photos:", e);
      }
    }
    return {
      profile: "",
      college: "",
      internship: "",
      cert_ibm: "",
      cert_nim: "",
      cert_csc: "",
      cert_aws: "",
      proj_zentora: "",
      proj_globalchat: "",
      proj_docmind: "",
      proj_rideeasy: ""
    };
  });

  // State to control Customize Mode (ON/OFF)
  const [customizeMode, setCustomizeMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("about");

  // State for Contact Message / WhatsApp Form
  const [contactName, setContactName] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");

  // State for AI Assistant Widget
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Vanakkam! I am Rahul R's AI Assistant. I have complete knowledge of Rahul's skills, projects, studies at VINS College, internship at AK Infopark, achievements, and certifications. How can I assist you today? Feel free to ask in English or Tanglish (Tamil-English blend)!"
    }
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to chat bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isTyping]);

  // Fetch persistent uploaded photos from server on mount
  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object") {
          setCustomImages((prev) => {
            const merged = { ...prev, ...data };
            localStorage.setItem("rahul_portfolio_images", JSON.stringify(merged));
            
            // Check if there are any custom photos stored in localStorage that are not on the server yet.
            // If so, let's sync them to the server so they become visible to everyone!
            const hasNewLocalImages = Object.keys(prev).some(
              (key) => prev[key as keyof CustomImages] && !data[key]
            );
            
            if (hasNewLocalImages) {
              fetch("/api/images", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ images: merged }),
              })
                .then((r) => r.json())
                .then((resData) => {
                  if (resData.success) {
                    console.log("Synced local photos to server successfully.");
                  }
                })
                .catch((e) => console.error("Error syncing local photos to server:", e));
            }
            
            return merged;
          });
        }
      })
      .catch((err) => console.error("Error loading persistent photos from server:", err));
  }, []);

  // Helper to persist images to the backend server
  const saveImagesToServer = (updatedImages: CustomImages) => {
    fetch("/api/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images: updatedImages }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          console.log("Images successfully persisted publicly on server.");
        }
      })
      .catch((err) => console.error("Failed to persist photos on server:", err));
  };

  // Handle local picture uploads
  const triggerImageUpload = (key: keyof CustomImages) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          const updated = { ...customImages, [key]: base64 };
          setCustomImages(updated);
          localStorage.setItem("rahul_portfolio_images", JSON.stringify(updated));
          saveImagesToServer(updated);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Reset all uploaded photos to default vectors
  const resetAllPhotos = () => {
    if (window.confirm("Are you sure you want to reset all custom photos back to default illustrations?")) {
      const empty: CustomImages = {
        profile: "",
        college: "",
        internship: "",
        cert_ibm: "",
        cert_nim: "",
        cert_csc: "",
        cert_aws: "",
        proj_zentora: "",
        proj_globalchat: "",
        proj_docmind: "",
        proj_rideeasy: ""
      };
      setCustomImages(empty);
      localStorage.removeItem("rahul_portfolio_images");
      saveImagesToServer(empty);
    }
  };

  // Chat message submit handler
  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || userInput;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { role: "user", text: textToSend };
    setChatHistory((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: chatHistory,
          userMessage: textToSend
        })
      });

      const data = await response.json();
      if (response.ok) {
        setChatHistory((prev) => [...prev, { role: "assistant", text: data.text }]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "My apologies, I ran into an error connecting to the AI system. Please try again."
          }
        ]);
      }
    } catch (err) {
      console.error("Chat API error:", err);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I could not reach the server right now. Let me know if your server is running!"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Quick helper to render bold text, lists, and links from response Markdown
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split("\n");
    return lines.map((line, idx) => {
      // Bullet point
      if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
        const content = line.replace(/^[\s*-]+/, "").trim();
        return (
          <li key={idx} className="ml-4 list-disc mt-1 text-slate-800 font-sans leading-relaxed text-[14px]">
            {parseInlineMarkdown(content)}
          </li>
        );
      }
      // Numbered List
      if (/^\d+\.\s+/.test(line.trim())) {
        const content = line.replace(/^\d+\.\s+/, "").trim();
        return (
          <li key={idx} className="ml-4 list-decimal mt-1 text-slate-800 font-sans leading-relaxed text-[14px]">
            {parseInlineMarkdown(content)}
          </li>
        );
      }
      // Normal Line
      return (
        <p key={idx} className="min-h-[1.2rem] mt-1.5 text-slate-800 font-sans leading-relaxed text-[14px]">
          {parseInlineMarkdown(line)}
        </p>
      );
    });
  };

  // Parse bold and links within text
  const parseInlineMarkdown = (text: string) => {
    // Basic regex matchers
    const parts = [];
    let currentText = text;

    // Detect Bold text **something**
    // Detect Links [title](url)
    const combinedRegex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
    const segments = currentText.split(combinedRegex);

    return segments.map((seg, sIdx) => {
      if (seg.startsWith("**") && seg.endsWith("**")) {
        return (
          <strong key={sIdx} className="font-extrabold text-slate-950">
            {seg.slice(2, -2)}
          </strong>
        );
      }
      if (seg.startsWith("[") && seg.includes("](")) {
        const label = seg.substring(1, seg.indexOf("]"));
        const url = seg.substring(seg.indexOf("](") + 2, seg.length - 1);
        return (
          <a
            key={sIdx}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 font-bold hover:underline inline-flex items-center gap-0.5"
          >
            {label} <ExternalLink className="w-3 h-3 inline" />
          </a>
        );
      }
      return seg;
    });
  };

  // Customizable Picture Wrapper Component
  const PictureComponent = ({
    imageKey,
    aspectRatioClass = "aspect-square",
    roundedClass = "rounded-2xl"
  }: {
    imageKey: keyof CustomImages;
    aspectRatioClass?: string;
    roundedClass?: string;
  }) => {
    const displaySrc = customImages[imageKey];
    const Fallback = SVG_FALLBACKS[imageKey];

    return (
      <div className={`relative group overflow-hidden border-4 border-brand-dark ${aspectRatioClass} ${roundedClass} bg-white shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]`}>
        {displaySrc ? (
          <img
            src={displaySrc}
            alt={`Rahul Portfolio - ${imageKey}`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : Fallback ? (
          <Fallback />
        ) : (
          <div className="w-full h-full bg-slate-50 flex items-center justify-center font-mono text-xs text-brand-dark/40">
            No Image
          </div>
        )}

        {/* Subtle, highly elegant upload trigger button that appears on hover */}
        <button
          onClick={() => triggerImageUpload(imageKey)}
          className="absolute top-3 right-3 p-2 bg-white hover:bg-brand-pink text-brand-dark hover:scale-110 transform transition-all duration-200 border-2 border-brand-dark rounded-full shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] opacity-0 group-hover:opacity-100 flex items-center justify-center"
          title="Upload / Change Photo"
          id={`btn-upload-${imageKey}`}
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-brand-dark selection:bg-brand-pink/30 selection:text-brand-dark font-sans pb-16">
      {/* Top Navigation Header */}
      <header className="sticky top-4 mx-4 md:mx-8 z-40 bg-white border-4 border-brand-dark rounded-3xl p-4 px-6 md:px-8 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-brand-pink border-2 border-brand-dark rounded-full flex items-center justify-center font-black text-lg text-brand-dark shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
              R
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tight leading-none text-brand-dark">RAHUL.PORTFOLIO</h1>
              <p className="text-[10px] font-mono font-bold text-brand-dark/60 mt-1 uppercase">Computer Science Engineer</p>
            </div>
          </div>

          {/* Clean Navigation Links */}
          <nav className="flex items-center gap-4 md:gap-6 text-xs md:text-sm font-black text-brand-dark uppercase tracking-wider">
            <a href="#section-experience" className="hover:text-brand-pink transition-colors">Experience</a>
            <a href="#section-skills" className="hover:text-brand-blue transition-colors">Skills</a>
            <a href="#section-projects" className="hover:text-brand-yellow transition-colors">Projects</a>
            <a href="#section-education" className="hover:text-brand-teal transition-colors">Education</a>
            <a href="#section-contact" className="hover:text-brand-pink bg-brand-yellow border-2 border-brand-dark px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-y-[-1px] transition-all">Let's Talk</a>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 mt-10">
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mb-16 pt-4" id="section-hero">
          <div className="md:col-span-5 max-w-sm mx-auto w-full flex">
            <PictureComponent imageKey="profile" aspectRatioClass="aspect-[4/5] w-full" roundedClass="rounded-[40px]" />
          </div>

          <div className="md:col-span-7 bg-brand-blue border-4 border-brand-dark rounded-[40px] p-6 md:p-8 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] text-white">
            <div className="space-y-4">
              <div>
                <span className="inline-block bg-brand-dark text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-white/20 mb-4">
                  🌟 Portfolio of Rahul R
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-white">
                  Creative Developer & UX Designer.
                </h2>
              </div>

              <p className="text-md md:text-lg font-medium text-white/90 leading-relaxed">
                Hi there! I am an ambitious and focused Computer Science Engineering student with deep expertise in full stack systems and generative models. I build performant, neat, and colorful digital solutions combining **Python**, **JavaScript**, **React.js**, **Node.js**, **Express.js**, and **MongoDB**.
              </p>

              {/* Quick Contact Chips */}
              <div className="flex flex-wrap gap-2 text-xs font-bold text-brand-dark font-mono pt-2">
                <div className="flex items-center gap-1.5 bg-white border-2 border-brand-dark px-2.5 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                  <Mail className="w-3.5 h-3.5 text-brand-blue" /> rahul.r.devop@gmail.com
                </div>
                <div className="flex items-center gap-1.5 bg-brand-yellow border-2 border-brand-dark px-2.5 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                  <Phone className="w-3.5 h-3.5 text-brand-dark" /> +91 9514701296
                </div>
                <div className="flex items-center gap-1.5 bg-brand-teal border-2 border-brand-dark px-2.5 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                  <MapPin className="w-3.5 h-3.5 text-brand-dark" /> Nagercoil, TN 🇮🇳
                </div>
              </div>
            </div>

            {/* Actions & Links */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/20 mt-6">
              <button
                onClick={() => setChatOpen(true)}
                className="bg-brand-pink hover:scale-105 transform transition-transform text-brand-dark border-4 border-brand-dark px-6 py-2.5 rounded-full font-black text-sm flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
                id="btn-hero-chat"
              >
                <MessageSquare className="w-4 h-4 text-brand-dark" />
                Talk to My AI Assistant
              </button>

              <a
                href="#section-contact"
                className="bg-white hover:scale-105 transform transition-transform text-brand-dark border-4 border-brand-dark px-6 py-2.5 rounded-full font-black text-sm flex items-center gap-1.5 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
                id="btn-hero-contact"
              >
                Contact Me
              </a>

              {/* Social Circles */}
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/ragulravi2405-coder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-white border-2 border-brand-dark rounded-full flex items-center justify-center hover:bg-brand-pink hover:scale-105 transform transition-all shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5 text-brand-dark" />
                </a>
                <a
                  href="https://linkedin.com/in/rahul-r-6536022a0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-white border-2 border-brand-dark rounded-full flex items-center justify-center hover:bg-brand-pink hover:scale-105 transform transition-all shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5 text-brand-dark" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Internship / Experience Section */}
        <section className="mb-16" id="section-experience">
          <div className="border-4 border-brand-dark rounded-[40px] bg-white p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 h-28 w-28 bg-brand-teal/20 rounded-bl-full border-l-4 border-b-4 border-brand-dark pointer-events-none flex items-start justify-end p-4">
              <span className="text-3xl">💼</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <div className="space-y-1">
                  <span className="bg-brand-teal border-2 border-brand-dark text-brand-dark text-xs px-3 py-1 rounded-full font-black uppercase tracking-wider inline-block shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                    Selected Intern Role
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-brand-dark">AK INFOPARK PRIVATE LIMITED</h3>
                  <p className="text-brand-dark/70 font-bold font-mono text-xs uppercase">Full Stack Developer Intern</p>
                </div>

                <p className="text-sm md:text-base text-brand-dark/80 leading-relaxed font-semibold">
                  Selected as a Full Stack Intern at AK Infopark. Focused on building modular full-stack applications, designing robust REST APIs, writing clean Python and JavaScript, and establishing solid MongoDB database interactions. Contributing to production-level deliverables and agile code deployment cycles.
                </p>

                <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-brand-dark">
                  <span className="bg-brand-yellow/30 border-2 border-brand-dark px-2.5 py-0.5 rounded-md shadow-[1px_1px_0px_0px_rgba(26,26,26,1)]">Python Scripts</span>
                  <span className="bg-brand-pink/30 border-2 border-brand-dark px-2.5 py-0.5 rounded-md shadow-[1px_1px_0px_0px_rgba(26,26,26,1)]">REST Integrations</span>
                  <span className="bg-brand-teal/30 border-2 border-brand-dark px-2.5 py-0.5 rounded-md shadow-[1px_1px_0px_0px_rgba(26,26,26,1)]">JavaScript Core</span>
                  <span className="bg-brand-blue/30 border-2 border-brand-dark px-2.5 py-0.5 rounded-md shadow-[1px_1px_0px_0px_rgba(26,26,26,1)]">Database Queries</span>
                </div>
              </div>

              <div className="md:col-span-4 max-w-[240px] mx-auto w-full">
                <p className="text-[10px] font-mono font-black text-brand-dark/40 mb-1.5 uppercase text-center">Company Photo / Logo</p>
                <PictureComponent imageKey="internship" aspectRatioClass="aspect-video" />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Catalog */}
        <section className="mb-16" id="section-skills">
          <div className="text-center mb-8 space-y-2">
            <h3 className="text-3xl font-black text-brand-dark tracking-tight">Core Technical Skills</h3>
            <p className="text-sm text-brand-dark/70 font-bold">Rahul's comprehensive suite of full-stack engineering tools.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS_INVENTORY.map((cat, idx) => {
              // Map index to vibrant palette colors
              const colors = [
                { bg: "bg-brand-pink", text: "text-brand-dark" },
                { bg: "bg-brand-blue", text: "text-white" },
                { bg: "bg-brand-yellow", text: "text-brand-dark" },
                { bg: "bg-brand-teal", text: "text-brand-dark" }
              ];
              const colorTheme = colors[idx % colors.length];

              return (
                <div key={idx} className="border-4 border-brand-dark rounded-3xl bg-white p-5 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className={`inline-block px-3 py-1 rounded-full border-2 border-brand-dark font-black text-xs tracking-wide uppercase ${colorTheme.bg} ${colorTheme.text}`}>
                      {cat.category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((skill, sIdx) => (
                        <motion.div
                          key={sIdx}
                          whileHover={{ scale: 1.05, rotate: 1 }}
                          className="bg-white hover:bg-brand-yellow/10 border-2 border-brand-dark text-brand-dark text-xs font-black px-2.5 py-1.5 rounded-xl flex items-center gap-1 cursor-default shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                        >
                          <span className="w-2 h-2 bg-brand-dark rounded-full" />
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Projects with Live Links */}
        <section className="mb-16" id="section-projects">
          <div className="text-center mb-10 space-y-2">
            <span className="inline-block px-4 py-1 bg-brand-pink border-2 border-brand-dark rounded-full text-xs font-black uppercase text-brand-dark shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
              Proven Capabilities
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight">Featured Portfolio Projects</h3>
            <p className="text-sm text-brand-dark/70 font-bold">Every project is fully functional and includes live interactive links.</p>
          </div>

          <div className="space-y-10">
            {PROJECTS.map((proj, idx) => (
              <div
                key={proj.id}
                className={`border-4 border-brand-dark rounded-[40px] bg-brand-yellow p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]`}
              >
                {/* Visual Preview Side */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <span className="text-[10px] font-mono font-black text-brand-dark/60 mb-1.5 uppercase text-center lg:text-left">Project Screen Shot</span>
                  <PictureComponent imageKey={proj.imageKey} aspectRatioClass="aspect-[4/3]" />
                </div>

                {/* Details Side */}
                <div className="lg:col-span-7 bg-white border-4 border-brand-dark rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-brand-dark/40 font-mono">0{idx + 1}.</span>
                        <h4 className="text-2xl md:text-3xl font-black text-brand-dark">{proj.title}</h4>
                      </div>

                      {/* Accent Category badge */}
                      <span className="border-2 border-brand-dark text-brand-dark text-xs px-2.5 py-1 rounded-full font-black bg-brand-yellow shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                        Live & Active
                      </span>
                    </div>

                    <p className="text-sm md:text-base text-brand-dark/80 leading-relaxed font-semibold">
                      {proj.description}
                    </p>

                    {/* Detailed bullet highlights */}
                    <div className="space-y-1.5">
                      {proj.extraPoints.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-brand-dark/80">
                          <CheckCircle2 className="w-4 h-4 text-brand-teal mt-0.5 flex-shrink-0" />
                          <span className="font-semibold leading-relaxed">{pt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.techStack.map((tag, tIdx) => (
                        <span key={tIdx} className="bg-brand-dark/5 border-2 border-brand-dark text-[11px] font-mono font-black text-brand-dark px-2.5 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions (with LIVE DEMO links strictly active) */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t-2 border-dashed border-brand-dark/10">
                    <a
                      href={proj.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-brand-teal hover:scale-105 transform transition-transform text-brand-dark border-2 border-brand-dark px-5 py-2.5 rounded-full font-black text-xs md:text-sm shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] flex items-center gap-1.5"
                      id={`btn-live-${proj.id}`}
                    >
                      <Globe className="w-4 h-4" />
                      Visit Live Website
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={proj.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:scale-105 transform transition-transform text-brand-dark border-2 border-brand-dark px-5 py-2.5 rounded-full font-black text-xs md:text-sm shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] flex items-center gap-1.5"
                      id={`btn-code-${proj.id}`}
                    >
                      <Github className="w-4 h-4" />
                      View Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Timeline */}
        <section className="mb-16" id="section-education">
          <div className="text-center mb-8 space-y-2">
            <h3 className="text-3xl font-black text-brand-dark tracking-tight">Academic Foundations</h3>
            <p className="text-sm text-brand-dark/70 font-bold">Rahul's higher studies, academic records, and rankings.</p>
          </div>

          <div className="border-4 border-brand-dark rounded-[40px] bg-white p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 bg-brand-yellow/20 rounded-bl-full border-l-4 border-b-4 border-brand-dark pointer-events-none flex items-start justify-end p-3">
              <span className="text-3xl">🎓</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-brand-pink border-2 border-brand-dark text-brand-dark text-xs px-2.5 py-0.5 rounded-full font-black uppercase shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                      Undergraduate Studies
                    </span>
                    <span className="text-xs font-mono font-bold text-brand-dark/60 bg-brand-dark/5 px-2.5 py-0.5 rounded-md border-2 border-brand-dark">
                      2023 – May 2027
                    </span>
                  </div>
                  <h4 className="text-2xl font-black text-brand-dark">VINS Christian College of Engineering</h4>
                  <p className="text-sm font-bold text-brand-dark/70 font-mono uppercase">Bachelor of Engineering (B.E.) – Computer Science & Engineering</p>
                </div>

                <p className="text-sm text-brand-dark/80 leading-relaxed font-semibold">
                  Currently pursuing Computer Science & Engineering, building deep algorithms, database layers, systems, and cloud fundamentals. Maintains a highly stellar profile showing consistent academic milestones.
                </p>

                {/* Academic Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-brand-teal border-2 border-brand-dark p-3 rounded-2xl shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] text-center">
                    <p className="text-[10px] font-mono text-brand-dark/70 font-black uppercase">CGPA Grade</p>
                    <p className="text-xl font-black text-brand-dark mt-1">8.5+ CGPA</p>
                  </div>
                  <div className="bg-brand-pink border-2 border-brand-dark p-3 rounded-2xl shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] text-center">
                    <p className="text-[10px] font-mono text-brand-dark/70 font-black uppercase">Semester Rank</p>
                    <p className="text-xl font-black text-brand-dark mt-1">First Rank 3x</p>
                  </div>
                  <div className="bg-brand-yellow border-2 border-brand-dark p-3 rounded-2xl shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] text-center">
                    <p className="text-[10px] font-mono text-brand-dark/70 font-black uppercase">Arrear Status</p>
                    <p className="text-xl font-black text-brand-dark mt-1">Zero Arrears</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://vinsengineeringcollege.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-brand-yellow hover:scale-105 transform transition-transform text-brand-dark border-2 border-brand-dark px-4 py-2 rounded-full font-black text-xs shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                    id="btn-visit-college"
                  >
                    Visit College Website <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 max-w-[280px] mx-auto w-full">
                <p className="text-[10px] font-mono font-black text-brand-dark/40 mb-1.5 uppercase text-center">College Campus Photo</p>
                <PictureComponent imageKey="college" aspectRatioClass="aspect-video" />
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid: Achievements & Certifications */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16" id="section-credentials">
          {/* Achievements (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-brand-dark">Key Milestones & Achievements</h3>
              <p className="text-xs text-brand-dark/60 font-bold">Proof of competitive performance, academics, and programs.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ACHIEVEMENTS.map((ach, idx) => {
                const colors = ["bg-brand-pink", "bg-brand-blue", "bg-brand-yellow", "bg-brand-teal"];
                const cardColor = colors[idx % colors.length];

                return (
                  <div key={idx} className={`border-4 border-brand-dark rounded-3xl ${cardColor} p-5 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] flex flex-col justify-between gap-4 text-brand-dark`}>
                    <div className="space-y-3">
                      <span className="inline-block bg-white border-2 border-brand-dark px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-[1px_1px_0px_0px_rgba(26,26,26,1)]">
                        {ach.badge}
                      </span>
                      <h4 className="font-black text-sm text-brand-dark">{ach.title}</h4>
                      <p className="text-xs font-semibold leading-relaxed text-brand-dark/90">{ach.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certifications (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-brand-dark">Official Certifications</h3>
              <p className="text-xs text-brand-dark/60 font-bold">Industry accredited professional certificates.</p>
            </div>

            <div className="space-y-3">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="border-4 border-brand-dark rounded-2xl bg-white p-3 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex-shrink-0">
                      <PictureComponent imageKey={cert.imageKey} roundedClass="rounded-lg" />
                    </div>
                    <div>
                      <h4 className="font-black text-xs text-brand-dark">{cert.title}</h4>
                      <p className="text-[10px] text-brand-dark/50 font-mono font-bold uppercase">{cert.issuer}</p>
                    </div>
                  </div>

                  <span className="border-2 border-brand-dark text-[9px] font-black font-mono px-2 py-0.5 rounded-full bg-brand-teal text-brand-dark shadow-[1px_1px_0px_0px_rgba(26,26,26,1)]">
                    VERIFIED
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Languages, Interests & Metadata summary */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" id="section-meta">
          {/* Languages */}
          <div className="border-4 border-brand-dark rounded-3xl bg-white p-5 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] space-y-3">
            <div className="flex items-center gap-1.5 border-b-2 border-dashed border-brand-dark/10 pb-2">
              <span className="text-lg">🗣️</span>
              <h4 className="font-black text-brand-dark text-sm uppercase">Spoken Languages</h4>
            </div>
            <div className="space-y-2 text-xs font-bold font-mono">
              <div className="flex items-center justify-between bg-brand-pink/20 border-2 border-brand-dark p-2 rounded-xl shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                <span>Tamil</span>
                <span className="text-[9px] font-black text-brand-dark bg-brand-pink border border-brand-dark px-1.5 rounded-full">Native (தாய்மொழி)</span>
              </div>
              <div className="flex items-center justify-between bg-brand-blue/20 border-2 border-brand-dark p-2 rounded-xl shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                <span>English</span>
                <span className="text-[9px] font-black text-brand-dark bg-brand-blue border border-brand-dark px-1.5 rounded-full">Professional</span>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="border-4 border-brand-dark rounded-3xl bg-white p-5 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] space-y-3 md:col-span-2">
            <div className="flex items-center gap-1.5 border-b-2 border-dashed border-brand-dark/10 pb-2">
              <span className="text-lg">🎯</span>
              <h4 className="font-black text-brand-dark text-sm uppercase">Technical Interests & Focus</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Artificial Intelligence", "Generative AI", "Full Stack Development", "Cloud Computing", "UI/UX Micro-Interactions", "Open Source Software"].map((item, idx) => (
                <span key={idx} className="bg-brand-yellow/30 border-2 border-brand-dark text-brand-dark font-black text-xs px-2.5 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                  🚀 {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact form & Details */}
        <section className="border-4 border-brand-dark rounded-[40px] bg-brand-dark text-white p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] relative overflow-hidden mb-12" id="section-contact">
          <div className="absolute top-0 right-0 h-32 w-32 bg-white/5 rounded-bl-full pointer-events-none opacity-20" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="bg-brand-pink text-brand-dark text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-2 border-brand-dark inline-block shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
                  Get In Touch
                </span>
                <h3 className="text-3xl font-black tracking-tight text-white">Let's Build Something Awesome!</h3>
                <p className="text-xs text-white/80 font-semibold leading-relaxed max-w-md">
                  I am open to internships, collaboration, open-source projects, and full-stack system architecture development. Drop me an email or call!
                </p>
              </div>

              {/* Direct Details with copy indicators */}
              <div className="space-y-4 font-mono text-xs md:text-sm text-slate-200">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-brand-pink" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-white/50">EMAIL ADDRESS</p>
                    <p className="font-bold text-white">rahul.r.devop@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-brand-pink" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-white/50">PHONE LINE</p>
                    <p className="font-bold text-white">+91 9514701296</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-brand-pink" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-white/50">LOCATION</p>
                    <p className="font-bold text-white">Nagercoil, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Message (WhatsApp) Card Display */}
            <div className="lg:col-span-6 bg-white border-4 border-brand-dark rounded-3xl p-6 text-left space-y-4 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] text-brand-dark font-semibold">
              <div className="flex items-center gap-2 border-b-2 border-dashed border-brand-dark/10 pb-2">
                <span className="text-xl">💬</span>
                <h4 className="font-black text-lg text-brand-dark">Send a Direct Message</h4>
              </div>
              <p className="text-xs text-brand-dark/70 leading-relaxed font-semibold">
                Type your message below to connect with me directly on WhatsApp!
              </p>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-brand-dark mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#FDFCF0]/50 border-2 border-brand-dark rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-pink text-brand-dark placeholder:text-brand-dark/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-brand-dark mb-1">Your Message</label>
                  <textarea
                    rows={3}
                    placeholder="Type your message here..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full bg-[#FDFCF0]/50 border-2 border-brand-dark rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-pink text-brand-dark placeholder:text-brand-dark/30 resize-none"
                  />
                </div>
                
                <button
                  onClick={() => {
                    if (!contactMessage.trim()) {
                      alert("Please type a message first!");
                      return;
                    }
                    const namePrefix = contactName.trim() ? `Hi Rahul, I am ${contactName.trim()}. ` : "Hi/Vanakkam Rahul, ";
                    const formattedMsg = encodeURIComponent(`${namePrefix}${contactMessage.trim()}`);
                    window.open(`https://wa.me/919514701296?text=${formattedMsg}`, "_blank");
                  }}
                  className="w-full bg-[#06D6A0] hover:scale-105 transform transition-transform text-brand-dark border-2 border-brand-dark px-5 py-2.5 rounded-full font-black text-xs md:text-sm shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] flex items-center justify-center gap-2 mt-2"
                >
                  Send to WhatsApp 💬
                </button>
              </div>

              {/* Resume download section integrated elegantly inside */}
              <div className="pt-4 border-t-2 border-dashed border-brand-dark/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[10px] text-brand-dark/60 font-semibold">Need a printed resume PDF?</span>
                <button
                  onClick={() => {
                    alert("Rahul's detailed PDF resume structure has been loaded! Email is: rahul.r.devop@gmail.com");
                  }}
                  className="bg-brand-pink hover:scale-105 transform transition-transform text-brand-dark font-black text-[10px] px-3.5 py-1.5 rounded-full border-2 border-brand-dark shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] flex items-center gap-1"
                  id="btn-download-resume"
                >
                  <FileText className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer credits with clean design */}
      <footer className="border-t-4 border-brand-dark pt-8 pb-12 mt-12 px-4 text-center space-y-4">
        <div className="inline-block bg-[#FFD166] text-[#1A1A1A] font-black text-xs px-4 py-1.5 border-2 border-[#1A1A1A] rounded-full shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
          Designed for Professional Excellence • Responsive for Mobile Optimized • 2026
        </div>
        <p className="text-xs font-mono font-bold text-brand-dark/60 mt-2">
          Designed with Vibrant Palette &hearts; Built for Rahul R.
        </p>
        <div className="flex items-center justify-center gap-4 text-xs font-bold text-brand-dark">
          <a href="https://github.com/ragulravi2405-coder" target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink underline decoration-2">GitHub</a>
          <span>•</span>
          <a href="https://linkedin.com/in/rahul-r-6536022a0" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue underline decoration-2">LinkedIn</a>
          <span>•</span>
          <a href="#section-hero" className="hover:text-brand-teal underline decoration-2">Back to Top</a>
        </div>
      </footer>

      {/* FLOATING CHAT ASSISTANT PANEL */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="w-[90vw] sm:w-[380px] h-[500px] bg-white border-4 border-brand-dark rounded-[30px] shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] flex flex-col overflow-hidden mb-4"
              id="chat-assistant-panel"
            >
              {/* Header */}
              <div className="bg-brand-pink border-b-4 border-brand-dark p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🤖</span>
                  <div>
                    <h4 className="font-black text-sm text-brand-dark leading-none">Rahul's AI Assistant</h4>
                    <p className="text-[10px] font-black text-brand-dark/60 mt-1">Status: Active & Verified</p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="h-7 w-7 bg-white border-2 border-brand-dark rounded-lg flex items-center justify-center hover:bg-slate-50 shadow-[1px_1px_0px_0px_rgba(26,26,26,1)]"
                  id="btn-close-chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FDFCF0]/30">
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] border-2 border-brand-dark p-3 rounded-2xl text-[13px] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] ${
                        msg.role === "user" ? "bg-brand-yellow text-brand-dark font-semibold" : "bg-white text-brand-dark font-semibold"
                      }`}
                    >
                      {msg.role === "assistant" ? renderFormattedText(msg.text) : <p>{msg.text}</p>}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border-2 border-brand-dark p-3 rounded-2xl text-xs shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] text-brand-dark/50 font-mono font-bold flex items-center gap-1.5">
                      <span className="animate-ping h-1.5 w-1.5 bg-brand-pink rounded-full" />
                      Assisting...
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Quick Reply suggestion chips */}
              <div className="p-2 bg-slate-50 border-t-2 border-dashed border-brand-dark/10 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
                {[
                  "Tell me about Zentora",
                  "Rahul's skills",
                  "Studies & college CGPA",
                  "Academic Rank achievements",
                  "How to contact him?"
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className="bg-white hover:bg-brand-pink/20 border-2 border-brand-dark text-[11px] font-black text-brand-dark px-2.5 py-1 rounded-full flex-shrink-0 transition-transform active:scale-95 shadow-[1px_1px_0px_0px_rgba(26,26,26,1)]"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t-4 border-brand-dark p-3 bg-white flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                  placeholder="Ask me anything about Rahul..."
                  className="flex-1 border-2 border-brand-dark rounded-xl px-3 py-2 text-xs font-black focus:outline-none focus:ring-2 focus:ring-brand-pink"
                  id="chat-input-text"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="bg-brand-pink hover:bg-brand-pink/90 border-2 border-brand-dark p-2.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] flex items-center justify-center transition-all"
                  id="btn-chat-send"
                >
                  <Send className="w-4 h-4 text-brand-dark" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Chat Trigger button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setChatOpen(!chatOpen)}
          className="h-14 w-14 bg-brand-pink border-4 border-brand-dark rounded-full shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] flex items-center justify-center text-brand-dark relative cursor-pointer"
          id="btn-chat-toggle"
        >
          {chatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          {!chatOpen && (
            <span className="absolute -top-1 -right-1 bg-brand-yellow text-brand-dark text-[9px] font-black h-5 w-5 rounded-full flex items-center justify-center animate-bounce border-2 border-brand-dark">
              AI
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
