import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

// Initialize Gemini client if API key is present
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini API Client successfully initialized.");
  } else {
    console.warn("WARNING: GEMINI_API_KEY is not set. The AI Assistant will fall back to simulation mode.");
  }
} catch (error) {
  console.error("Failed to initialize Gemini Client:", error);
}

// Rahul's Portfolio Data Context for the AI Assistant
const RAHUL_PORTFOLIO_CONTEXT = `
You are the AI Portfolio Assistant for Rahul R. Your goal is to answer questions about Rahul R using only his official portfolio data below.

--- OFFICIAL PORTFOLIO DATA FOR RAHUL R ---
- Name: Rahul R
- Title: AI + Full Stack Developer
- Personal Summary: Rahul R is an ambitious AI and Full Stack Developer pursuing his Bachelor of Engineering (B.E.) in Computer Science & Engineering. He is passionate about combining solid full-stack software development skills with cutting-edge artificial intelligence, generative AI, and prompt engineering. He is proficient in Python, JavaScript, React.js, Node.js, Express.js, MongoDB, REST APIs, Git, GitHub, Linux, and AWS Basics.

- Contact Information:
  * Email: rahul.r.devop@gmail.com
  * Phone: +91 9514701296
  * Location: Nagercoil, Tamil Nadu, India
  * LinkedIn: linkedin.com/in/rahul-r-6536022a0
  * GitHub: github.com/ragulravi2405-coder

- Education:
  * Degree: Bachelor of Engineering (B.E.) in Computer Science & Engineering
  * College: VINS Christian College of Engineering
  * Timeline: 2023 – May 2027 (Currently pursuing)
  * CGPA: 8.5+
  * Academic Standing: Zero Arrears, secured First Rank for 3 consecutive semesters.
  * College Website Button Link in Portfolio: VINS Christian College of Engineering (https://vinsengineeringcollege.com/)

- Experience:
  * Role: Full Stack Developer Intern (Selected)
  * Company: AK INFOPARK PRIVATE LIMITED
  * Description: Selected for an internship focusing on Full Stack web application development, utilizing Python, JavaScript, and database integration.

- Skills Inventory:
  * Programming Languages: Python, JavaScript, SQL
  * Frontend Tech: HTML5, CSS3, React.js, Bootstrap, Tailwind CSS, Framer Motion
  * Backend Tech: Node.js, Express.js, REST APIs
  * Database: MongoDB
  * AI & GenAI: AI Fundamentals, Generative AI, Prompt Engineering, NumPy Basics
  * Cloud & Tools: AWS Basics, Linux, Git, GitHub, VS Code

- Featured Projects (All contain live links):
  1. Zentora (Live: https://zentora-mart.vercel.app/)
     * Description: A high-performance, modern e-commerce marketplace platform built to handle complex customer flows. Features dynamic product searching, filter tags, and an active shopping cart with local persistence.
     * Tech Stack: React.js, Tailwind CSS, LocalStorage state management, lucide-react icons.
  2. Global Chat (Live: https://pink-chat-iota.vercel.app/)
     * Description: A real-time chat application featuring active group discussion rooms, clean typography, live status indications, and seamless user interaction.
     * Tech Stack: Node.js, Express.js, React.js, WebSockets, Tailwind CSS.
  3. DocMind AI (Live: https://doc-mind-ai.onrender.com/)
     * Description: An AI-powered document intelligence and chat platform. Allows users to interact with files, extract deep analytical summaries, and conduct conversational Q&A on documents.
     * Tech Stack: React.js, Express.js, Google Gemini API, Node.js, Tailwind CSS.
  4. Ride Easy (Live: https://ride-easy-ride-booking-app.vercel.app/)
     * Description: A sleek, mobile-responsive ride-booking interface. Designed with interactive ride tier selectors, price estimators, and fluid responsive motion layouts.
     * Tech Stack: React.js, Framer Motion, Tailwind CSS, Lucide icons.

- Achievements:
  * Hackathon Success: Ranked in the Top 500 among 25,000+ participants in the TN Skill / Naan Mudhalvan Hackathon.
  * Professional Training Success: Ranked in the Top 500 among 30,000+ participants in the Wadhwani Full Stack Development Program.
  * Academic Excellence: Achieved First Rank in CSE department for 3 consecutive semesters.
  * Track Record: Maintained Zero Arrears throughout B.E. course.
  * Active Community Member: Participated in multiple national-level and college technical events and coding challenges.

- Certifications:
  * IBM Cognos Tool Operations (Data analysis & visualization operations)
  * Full Stack Development – NIM Technologies (Comprehensive software design, backend APIs, and frontend integration)
  * Python Programming – CSC Computer Education (Foundational & intermediate script writing, object-oriented concepts)
  * AWS Cloud Practitioner Essentials – Amazon Web Services (Cloud architecture, billing, and basic AWS services)

- Languages:
  * Tamil (Native)
  * English (Professional)

- Interests:
  * Artificial Intelligence & Deep Learning
  * Generative AI & Prompt Engineering
  * Full Stack Web Development & System Design
  * Cloud Computing & DevOps
  * UI/UX Design & Frontend Micro-interactions
  * Open Source Software Contribution
------------------------------------------

STRICT ASSISTANT INSTRUCTIONS:
1. You MUST only answer questions using the official portfolio data of Rahul R provided above.
2. If the answer cannot be found in the portfolio data above, or if the user asks you to write code/do tasks unrelated to explaining Rahul's credentials, you must politely respond: "This information is not available in Rahul's portfolio, as I am programmed to only share facts from his official profile." or a similar polite response. DO NOT invent or make up any facts under any circumstances.
3. Be professional, clear, friendly, and humble.
4. You can speak English, or respond in a helpful Tamil/English blend (Tanglish) if the user asks in Tamil or uses Tanglish (e.g., "enaku zentora project pathi sollu").
5. If the Gemini API key is missing (simulated mode), you will still respond beautifully as a fallback using preset rules, but here you are powered by Gemini, so give highly structured and styled markdown replies. Use bold text, lists, and spacing to make your answers extremely neat and readable.
`;

// Path to store uploaded photos persistently on the server side
const IMAGES_FILE_PATH = path.join(process.cwd(), "uploaded_images.json");

// Helper to read images
const readUploadedImages = (): Record<string, string> => {
  try {
    if (fs.existsSync(IMAGES_FILE_PATH)) {
      const data = fs.readFileSync(IMAGES_FILE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading uploaded images:", error);
  }
  return {};
};

// Helper to write images
const writeUploadedImages = (images: Record<string, string>) => {
  try {
    fs.writeFileSync(IMAGES_FILE_PATH, JSON.stringify(images, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing uploaded images:", error);
  }
};

// API endpoint to load custom photos publicly
app.get("/api/images", (req, res) => {
  const images = readUploadedImages();
  res.json(images);
});

// API endpoint to save custom photos publicly
app.post("/api/images", (req, res) => {
  const { images } = req.body;
  if (!images || typeof images !== "object") {
    return res.status(400).json({ error: "Invalid images payload." });
  }
  writeUploadedImages(images);
  res.json({ success: true, message: "Images persisted successfully." });
});

// API endpoint for Portfolio AI Chat
app.post("/api/chat", async (req, res) => {
  const { messages, userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "Missing userMessage parameter." });
  }

  // If Gemini API is not available, we fall back to a simple keyword matcher or pre-authored responses
  if (!ai) {
    console.log("No Gemini API client configured. Running custom rule-based engine.");
    const query = userMessage.toLowerCase();
    let responseText = "";

    if (query.includes("zentora") || query.includes("ecommerce") || query.includes("shopping")) {
      responseText = `**Zentora** is an E-Commerce Marketplace platform built by Rahul. 
* **Live Link**: [https://zentora-mart.vercel.app/](https://zentora-mart.vercel.app/)
* **Key Features**: Dynamic product search, filtering options, and custom shopping cart persistence.
* **Tech Stack**: React.js, Tailwind CSS, and LocalStorage state.`;
    } else if (query.includes("chat") || query.includes("global chat")) {
      responseText = `**Global Chat** is a real-time messaging application.
* **Live Link**: [https://pink-chat-iota.vercel.app/](https://pink-chat-iota.vercel.app/)
* **Key Features**: Active group rooms, typing indicators, and user-friendly visual styling.
* **Tech Stack**: React.js, Node.js, Express.js, WebSockets, and Tailwind CSS.`;
    } else if (query.includes("docmind") || query.includes("doc mind") || query.includes("document")) {
      responseText = `**DocMind AI** is an AI document assistant.
* **Live Link**: [https://doc-mind-ai.onrender.com/](https://doc-mind-ai.onrender.com/)
* **Key Features**: Conversational Q&A on PDF/text documents, abstract summarization, and prompt extraction.
* **Tech Stack**: Google Gemini API, React.js, Express.js, and Node.js.`;
    } else if (query.includes("ride") || query.includes("ride easy") || query.includes("booking")) {
      responseText = `**Ride Easy** is a ride booking application interface.
* **Live Link**: [https://ride-easy-ride-booking-app.vercel.app/](https://ride-easy-ride-booking-app.vercel.app/)
* **Key Features**: Clean, responsive layout, fluid Framer Motion transitions, and ride tiers with live cost estimation.
* **Tech Stack**: React.js, Framer Motion, and Tailwind CSS.`;
    } else if (query.includes("project") || query.includes("work")) {
      responseText = `Rahul has completed 4 major projects:
1. **Zentora** (E-commerce Mart): [https://zentora-mart.vercel.app/](https://zentora-mart.vercel.app/)
2. **Global Chat** (Real-time group chat): [https://pink-chat-iota.vercel.app/](https://pink-chat-iota.vercel.app/)
3. **DocMind AI** (Gemini-powered document Q&A): [https://doc-mind-ai.onrender.com/](https://doc-mind-ai.onrender.com/)
4. **Ride Easy** (Modern booking ride UI): [https://ride-easy-ride-booking-app.vercel.app/](https://ride-easy-ride-booking-app.vercel.app/)
Which project would you like to know more about?`;
    } else if (query.includes("skills") || query.includes("language") || query.includes("python") || query.includes("react")) {
      responseText = `Rahul's technical skills include:
* **Languages**: Python, JavaScript, SQL
* **Frontend**: HTML5, CSS3, React.js, Tailwind CSS, Bootstrap
* **Backend**: Node.js, Express.js, REST APIs
* **Database**: MongoDB
* **AI/GenAI**: Generative AI, Prompt Engineering, NumPy
* **Cloud**: AWS Basics, Linux, Git, GitHub`;
    } else if (query.includes("education") || query.includes("college") || query.includes("vins")) {
      responseText = `Rahul R is pursuing his **Bachelor of Engineering (B.E.) in Computer Science & Engineering** at **VINS Christian College of Engineering** (2023 - 2027). He has a **CGPA of 8.5+**, Zero Arrears, and has been awarded **First Rank** in CSE for 3 consecutive semesters. You can visit the college website here: [https://vinsengineeringcollege.com/](https://vinsengineeringcollege.com/).`;
    } else if (query.includes("internship") || query.includes("experience") || query.includes("ak infopark")) {
      responseText = `Rahul is a **Full Stack Developer Intern** at **AK INFOPARK PRIVATE LIMITED**. He was selected for this role to work on full-stack web application development, utilizing Python, JavaScript, and databases.`;
    } else if (query.includes("achieve") || query.includes("hackathon") || query.includes("naan mudhalvan") || query.includes("rank")) {
      responseText = `Rahul's notable achievements:
* **TN Skill / Naan Mudhalvan Hackathon**: Ranked in the Top 500 among 25,000+ participants!
* **Wadhwani Full Stack Program**: Ranked in the Top 500 among 30,000+ participants!
* **First Rank in CSE** for 3 consecutive semesters.
* **Zero Arrears** throughout his engineering studies.`;
    } else if (query.includes("certif") || query.includes("aws") || query.includes("ibm") || query.includes("cognos")) {
      responseText = `Rahul holds the following certifications:
1. **IBM Cognos Tool Operations**
2. **Full Stack Development** – NIM Technologies
3. **Python Programming** – CSC Computer Education
4. **AWS Cloud Practitioner Essentials**`;
    } else if (query.includes("contact") || query.includes("phone") || query.includes("email") || query.includes("nagercoil")) {
      responseText = `You can connect with Rahul via:
* **Email**: rahul.r.devop@gmail.com
* **Phone**: +91 9514701296
* **Location**: Nagercoil, Tamil Nadu, India
* **LinkedIn**: [linkedin.com/in/rahul-r-6536022a0](https://linkedin.com/in/rahul-r-6536022a0)
* **GitHub**: [github.com/ragulravi2405-coder](https://github.com/ragulravi2405-coder)`;
    } else {
      responseText = `Hello! I am Rahul R's AI Portfolio Assistant. I can tell you about his **Projects**, **Skills**, **Internship at AK Infopark**, **Academic achievements** (First Rank, Zero Arrears), **Certifications**, or **Contact details**. 

Feel free to ask questions like:
* "Tell me about Zentora project"
* "Enaku Rahul pathi sollu" (Tamil/Tanglish is welcome!)
* "What skills does Rahul have?"
* "Where is he studying?"`;
    }

    return res.json({ text: responseText, simulated: true });
  }

  // If Gemini client IS initialized, query it!
  try {
    // Format conversation history for Gemini Content object
    // messages: Array of { role: 'user' | 'assistant', text: string }
    const contents: any[] = [];

    if (messages && Array.isArray(messages)) {
      messages.forEach((msg: any) => {
        contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.text }],
        });
      });
    }

    // Append the current message
    contents.push({
      role: "user",
      parts: [{ text: userMessage }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: RAHUL_PORTFOLIO_CONTEXT,
        temperature: 0.7,
      },
    });

    const responseText = response.text || "I apologize, I couldn't generate an answer. Please ask again.";
    return res.json({ text: responseText, simulated: false });
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    return res.status(500).json({ error: "Sorry, I ran into an error talking with the AI Assistant service." });
  }
});

// Setup dev server with Vite, or static production files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite Development Server Middleware loaded.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
