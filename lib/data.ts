// ─────────────────────────────────────────────
// lib/data.ts  — all portfolio content typed
// ─────────────────────────────────────────────

export const PROFILE = {
  name: "Muhammed Junaid",
  role: "AI Engineer | Full-Stack Builder",
  location: "Kochi, Kerala, India",
  bio: "I build intelligent systems where AI meets cloud infrastructure. Passionate about turning complex machine-learning research into production-grade products. When I'm not training models, I'm shipping features.",
  email: "junaidkaliyadan@gmail.com",
  linkedin: "https://linkedin.com/in/muhammed-junaid-k-90a6791b7",
  github: "https://github.com/j22k",
  resumeUrl: "/resume.pdf", // place resume in /public
  resumeHtml: "/resume", // text-based HTML resume route
} as const;

export const TYPEWRITER_STRINGS = [
  "AI Engineer",
  "Computer Vision Expert",
  "AWS ML Engineer",
  "Full-Stack Builder",
] as const;

export const STATS = [
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Built" },
  { value: 3, suffix: "", label: "Certifications" },
  { value: 1304, suffix: "+", label: "LinkedIn Followers" },
] as const;

export type Experience = {
  id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  tech: string[];
  description: string;
  type: "full-time" | "intern" | "volunteer";
};

export const EXPERIENCES: Experience[] = [
  {
    id: "zoftcares-ai",
    role: "AI Engineer",
    company: "ZoftCares",
    startDate: "Dec 2025",
    endDate: "Present",
    tech: ["AWS IVS", "Kinesis", "Lambda", "SQS", "Bedrock", "YOLO", "PyTorch", "RAG"],
    description:
      "Designing and deploying production AI pipelines on AWS. Leading real-time video intelligence and RAG-based knowledge systems.",
    type: "full-time",
  },
  {
    id: "zoftcares-junior",
    role: "Junior AI Engineer",
    company: "ZoftCares",
    startDate: "Jul 2025",
    endDate: "Nov 2025",
    tech: ["OpenCV", "YOLO", "TensorFlow", "Stable Diffusion", "RabbitMQ", "RAG"],
    description:
      "Developed computer vision models and generative AI features. Integrated async message queues for scalable inference.",
    type: "full-time",
  },
  {
    id: "zoftcares-intern-dubai",
    role: "AI Intern",
    company: "ZoftCares Dubai",
    startDate: "Feb 2025",
    endDate: "Jun 2025",
    tech: ["Python", "OpenCV", "FastAPI", "Docker"],
    description:
      "Collaborated with the Dubai team on CV-based automation projects. Gained hands-on experience with cloud deployments.",
    type: "intern",
  },
  {
    id: "camerin",
    role: "AI Intern",
    company: "Camerin Innovate",
    location: "Kochi",
    startDate: "Jul 2024",
    endDate: "Aug 2024",
    tech: ["LSTM", "BERT", "TensorFlow", "Python"],
    description:
      "Built NLP and time-series models for hospital AI systems. Focused on patient outcome prediction using transformer-based architectures.",
    type: "intern",
  },
  {
    id: "iedc-cto",
    role: "CTO",
    company: "IEDC MESCE",
    startDate: "Jul 2024",
    endDate: "Apr 2025",
    tech: ["Leadership", "Product Strategy", "KSUM"],
    description:
      "Led technology strategy for a KSUM-registered non-profit student entrepreneurship cell. Mentored teams on AI product development.",
    type: "volunteer",
  },
  {
    id: "adtec",
    role: "Tech Lead",
    company: "ADTEC-MESCE",
    startDate: "Aug 2024",
    endDate: "Apr 2025",
    tech: ["Team Management", "AI", "Web Dev"],
    description:
      "Directed technical operations for the college tech association. Organised workshops, hackathons, and AI demonstrations.",
    type: "volunteer",
  },
  {
    id: "keltron",
    role: ".NET Intern",
    company: "Keltron",
    startDate: "Nov 2021",
    endDate: "Dec 2021",
    tech: ["C#", ".NET", "SQL Server"],
    description:
      "Assisted in developing government software tools using the .NET framework during diploma studies.",
    type: "intern",
  },
];

export type Project = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  github?: string;
  isPrivate?: boolean;
  featured?: boolean;
  tldr?: string; // short TL;DR summary for GEO
  metrics?: string[]; // citeable facts & metrics
};

export const PROJECTS: Project[] = [
  {
    id: "law-assistant",
    name: "Law Assistant Chatbot",
    description:
      "LLaMA 2 fine-tuned with QLoRA on a curated legal dataset. Achieves accurate, context-aware legal Q&A with parameter-efficient training using HuggingFace Transformers.",
    tech: ["LLaMA 2", "QLoRA", "HuggingFace", "Python", "PEFT"],
    github: "https://github.com/j22k/law-assistant",
    featured: true,
    tldr: "Fine-tuned a compact LLaMA-2 model with QLoRA for legal Q&A (high precision).",
    metrics: ["Fine-tuned on 12,400 legal documents", "Inference latency: ~120ms per query"]
  },
  {
    id: "malnurist",
    name: "Malnurist",
    description:
      "RandomForest-powered malnutrition predictor exposed via a Flask REST API. Predicts nutritional risk in children using clinical health indicators.",
    tech: ["RandomForest", "Flask", "scikit-learn", "Python"],
    github: "https://github.com/j22k/Malnurist",
    featured: false,
    tldr: "Clinical malnutrition risk classifier deployed as a Flask API.",
    metrics: ["ROC-AUC: 0.87 on held-out clinical test set", "Serves 50 requests/minute on a small EC2 instance"]
  },
  {
    id: "video-intelligence",
    name: "Real-Time Video Intelligence",
    description:
      "AWS-native pipeline: IVS streams → Kinesis → Lambda → YOLO inference. Detects objects in live streams with sub-second latency at scale.",
    tech: ["AWS IVS", "YOLO", "Kinesis", "Lambda", "PyTorch"],
    isPrivate: true,
    featured: false,
    tldr: "Built an AWS-native low-latency object detection pipeline for live streams.",
    metrics: ["Detection latency: <800ms end-to-end", "Supported 200 simultaneous streams"]
  },
  {
    id: "rag-chatbot",
    name: "RAG Chatbot",
    description:
      "Production retrieval-augmented generation system. LangChain orchestration, Chroma vector store, and OpenAI API for context-aware document Q&A.",
    tech: ["LangChain", "ChromaDB", "OpenAI API", "Python"],
    isPrivate: true,
    featured: false,
    tldr: "RAG system for fast, accurate document Q&A with vector search and LLMs.",
    metrics: ["Median answer latency: 250ms (vector search + LLM request)", "Index size: 1.2M tokens"]
  },
];

export type SkillCategory = {
  label: string;
  items: string[];
};

export const SKILLS: SkillCategory[] = [
  {
    label: "AI / ML",
    items: ["PyTorch", "TensorFlow", "OpenCV", "YOLO", "Stable Diffusion", "SageMaker", "BERT"],
  },
  {
    label: "LLMs / GenAI",
    items: ["LLaMA 2", "QLoRA", "RAG", "LangChain", "OpenAI API", "HuggingFace", "Bedrock"],
  },
  {
    label: "Cloud / AWS",
    items: ["AWS IVS", "Kinesis", "Lambda", "SQS", "EC2", "S3", "Rekognition", "Comprehend"],
  },
  {
    label: "Backend",
    items: ["Python", "FastAPI", "Flask", "Node.js", "RabbitMQ"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "ChromaDB", "Redis", "DynamoDB"],
  },
  {
    label: "Tools",
    items: ["Git", "Docker", "Linux", "Jupyter"],
  },
];

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  expiresDate?: string;
  credentialId: string;
  placeholder?: boolean;
  badgeUrl?: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: "aws-ml-associate",
    name: "AWS Certified Machine Learning Engineer - Associate (MLA-C01)",
    issuer: "Amazon Web Services",
    issuedDate: "Mar 2026",
    expiresDate: "Mar 2029",
    credentialId: "86f08f6b-b7fe-4cb2-9fb9-a675521d6102",
    badgeUrl: "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png"
  },
  {
    id: "aws-cloud-essentials",
    name: "AWS Cloud Technical Essentials",
    issuer: "Amazon Web Services",
    issuedDate: "Nov 2024",
    credentialId: "4BXKSZ88F41I",
    badgeUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
  },
  {
    id: "placeholder-1",
    name: "Coming Soon",
    issuer: "—",
    issuedDate: "—",
    credentialId: "—",
    placeholder: true,
  },
  {
    id: "placeholder-2",
    name: "Coming Soon",
    issuer: "—",
    issuedDate: "—",
    credentialId: "—",
    placeholder: true,
  },
  {
    id: "placeholder-3",
    name: "Coming Soon",
    issuer: "—",
    issuedDate: "—",
    credentialId: "—",
    placeholder: true,
  },
  {
    id: "placeholder-4",
    name: "Coming Soon",
    issuer: "—",
    issuedDate: "—",
    credentialId: "—",
    placeholder: true,
  },
  {
    id: "placeholder-5",
    name: "Coming Soon",
    issuer: "—",
    issuedDate: "—",
    credentialId: "—",
    placeholder: true,
  },
];

export type Education = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  cgpa: string;
  logoUrl?: string;
};

export const EDUCATION: Education[] = [
  {
    id: "btech",
    degree: "B.Tech — AI & Data Science",
    institution: "MES Engineering College",
    location: "Malappuram, Kerala",
    startYear: "2022",
    endYear: "2025",
    cgpa: "7.25",
    logoUrl: "/MESCE.png"
  },
  {
    id: "diploma",
    degree: "Diploma — Computer Engineering",
    institution: "Government Polytechnic College",
    location: "Malappuram, Kerala",
    startYear: "2019",
    endYear: "2022",
    cgpa: "8.18",
    logoUrl: "/SBTE.jpg"
  },
];

export const PRELOADER_WORDS = [
  "Hello",        // English
  "നമസ്കാരം",     // Malayalam
  "مرحبا",        // Arabic
  "Hola",         // Spanish
  "こんにちは",     // Japanese
  "Bonjour",      // French
  "नमस्ते",       // Hindi
  "Ciao",         // Italian
  "안녕하세요",      // Korean
  "Olá",          // Portuguese

  "Hallo",        // German
  "Привет",       // Russian
  "你好",          // Chinese (Simplified)
  "你好嗎",        // Chinese (Traditional / conversational)
  "Selam",        // Turkish
  "Sawubona",     // Zulu
  "Jambo",        // Swahili
  "Hej",          // Swedish
  "Hei",          // Norwegian
  "Halo",         // Indonesian
  "Kamusta",      // Filipino (Tagalog)
  "Salam",        // Persian/Urdu informal
  "Ahoj",         // Czech/Slovak
  "Merhaba",      // Turkish (formal/common)
  "Shalom",       // Hebrew
  "Xin chào",     // Vietnamese
  "Sawasdee",     // Thai (transliterated)
  "Ayubowan",     // Sinhala
  "Vanakkam",     // Tamil
  "Namaskara",    // Kannada
  "Nomoshkar",    // Bengali
] as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
