// ─────────────────────────────────────────────
// lib/data.ts  — all portfolio content typed
// ─────────────────────────────────────────────

export const PROFILE = {
  name: "Muhammed Junaid",
  role: "AI ML Engineer | Full-Stack Builder | AWS Certified",
  location: "Kochi, Kerala, India",
  bio: "I build intelligent systems where AI meets cloud infrastructure. Passionate about turning complex machine-learning research into production-grade products. When I'm not training models, I'm shipping features.",
  email: "junaidkaliyadan@gmail.com",
  linkedin: "https://linkedin.com/in/muhammed-junaid-k-90a6791b7",
  github: "https://github.com/j22k",
  resumeUrl: "/resume.pdf", // place resume in /public
  resumeHtml: "/resume", // text-based HTML resume route
} as const;





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
  imageUrl?: string; // Optional custom image URL
};

export const PROJECTS: Project[] = [
  {
    id: "finance-flo",
    name: "Finance-Flo",
    description:
      "AI-powered personal finance tracking application. Features an AI assistant capable of interpreting financial data, a full-stack dashboard with interactive charts, and a custom secure authentication system.",
    tech: ["Next.js", "Tailwind CSS", "MongoDB", "Generative AI", "Anthropic SDK", "recharts"],
    featured: true,
    tldr: "Full-stack AI-integrated financial dashboard for tracking and analyzing personal finances.",
    metrics: ["Integrated Gemini & Anthropic models", "Custom JWT auth with bcrypt"],
    imageUrl: "/projects/finance-flo.png"
  },
  {
    id: "mindme",
    name: "MindMe",
    description:
      "AI-powered note-taking app that instantly categorizes notes. Uses a low-latency Llama 3.1 model to auto-tag notes based on context, syncing directly to a Supabase backend.",
    tech: ["Next.js", "React 19", "Tailwind CSS", "Supabase", "Groq SDK", "Llama 3.1"],
    featured: true,
    tldr: "Instant AI note categorization using ultra-fast Groq inference.",
    metrics: ["Sub-second classification latency", "Real-time sync with Supabase"],
    imageUrl: "/projects/MindMe.png"
  },
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

export const SERVICES = [
  "AI Research",
  "Computer Vision",
  "LLM Fine-tuning",
  "Cloud Architecture",
  "Full-Stack AI Apps",
  "RAG Systems",
] as const;

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
    badgeUrl: "/badge.png"
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

