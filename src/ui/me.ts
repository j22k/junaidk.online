/** All personal content lives here — edit copy without touching components. */

export type Project = {
  id: string;
  name: string;
  blurb: string;
  accent: string;
  detail: string;
  bullets: string[];
  stack: string[];
  links: { label: string; href: string }[];
};

export const me = {
  name: "Muhammed Junaid K.",
  handle: "junaid",
  initials: "MJ",
  photo: "/me.jpg",
  photoAlt: "Portrait of Muhammed Junaid K., smiling",
  location: "Kochi, India",
  role: "AI Engineer",
  tagline: "Open to roles & collaborations worldwide",
  email: "junaidkaliyadan@gmail.com",
  github: "https://github.com/j22k",
  linkedin: "https://www.linkedin.com/in/junaidkaliyadan",
  lead: "RAG, real-time vision and LLM backends on AWS — built at ZoftCares, Kochi.",
  bio: "AI engineer at ZoftCares in Kochi. I build Python microservices, RAG pipelines and real-time vision systems on AWS, and I am AWS Certified ML Engineer.",
  marquee: ["AI Engineer", "RAG pipelines", "Ships on AWS", "Open to opportunities abroad", "Made by Junaid"],
  steps: ["Brief", "Prototype", "Ship"],
  stack: ["Python", "LangChain", "LlamaIndex", "Bedrock", "SageMaker", "Lambda", "SQS", "Docker", "Terraform", "PyTorch"],
  certs: ["AWS Certified Machine Learning Engineer – Associate"],
  stat: { value: 30, label: "% lower LLM token cost", caption: "caching + dynamic model selection" },
  journey: [
    { title: "Camerin Innovate", when: "Jul 2024", text: "AI intern: LSTM sequence models, BERT for medical summaries.", color: "var(--c-violet)" },
    { title: "ZoftCares intern", when: "Feb 2025", text: "Python and Node backends, OpenCV + YOLO on live streams.", color: "var(--c-cyan)" },
    { title: "Junior AI Engineer", when: "Jul 2025", text: "Vision at 30–60 FPS, RAG chatbots on FAISS and Pinecone.", color: "var(--c-orange)" },
    { title: "AI Engineer", when: "Dec 2025", text: "Bedrock, SQS and Kinesis systems; ~30% lower LLM token cost.", color: "var(--c-green)" },
    { title: "AWS ML Engineer", when: "Mar 2026", text: "Certified Machine Learning Engineer – Associate.", color: "var(--c-pink)" },
  ],
  services: [
    { title: "RAG & search", text: "Hybrid search (BM25 + vector), citations, FAISS and Pinecone.", color: "var(--c-green)" },
    { title: "LLM apps", text: "OpenAI, Gemini and Bedrock in production workflows.", color: "var(--c-pink)" },
    { title: "Real-time vision", text: "OpenCV and YOLO on live RTSP streams at 30–60 FPS.", color: "var(--c-orange)" },
    { title: "Cloud backends", text: "SQS, Lambda and Kinesis microservices; multi-tenant SaaS.", color: "var(--c-cyan)" },
  ],
  needs: ["RAG", "LLM app", "Vision", "Other"],
  projects: [
    {
      id: "fraudguard",
      name: "FraudGuard",
      blurb: "XGBoost fraud detection + Claude explanations",
      accent: "var(--c-violet)",
      detail: "A fraud detection pipeline that scores transactions and has Claude on Bedrock explain every flag in plain language.",
      bullets: ["XGBoost classifier: 0.88 ROC-AUC, 69% precision at the 0.9 alert threshold", "SageMaker Pipelines, EventBridge, Lambda and DynamoDB for training and inference", "Infrastructure in Terraform, services containerised with Docker"],
      stack: ["XGBoost", "SageMaker", "Bedrock", "Lambda", "Terraform"],
      links: [{ label: "GitHub", href: "https://github.com/j22k" }],
    },
    {
      id: "mie",
      name: "Mie",
      blurb: "Self-hosted knowledge base with cited Q&A",
      accent: "var(--c-cyan)",
      detail: "A personal knowledge base that groups notes and web pages by topic and answers questions with sources.",
      bullets: ["Auto-groups notes and pages by topic", "RAG with hybrid search (BM25 + vector, RRF)", "Every answer carries source citations"],
      stack: ["FastAPI", "Next.js", "PostgreSQL", "Elasticsearch"],
      links: [{ label: "GitHub", href: "https://github.com/j22k" }],
    },
    {
      id: "malayalam-tts",
      name: "Malayalam-TTS",
      blurb: "Malayalam speech synthesis with voice cloning",
      accent: "var(--c-pink)",
      detail: "Fine-tuning F5-TTS to speak Malayalam, with voice cloning.",
      bullets: ["F5-TTS fine-tuning in PyTorch", "Dataset EDA and preprocessing pipelines", "Voice cloning for Malayalam"],
      stack: ["PyTorch", "F5-TTS", "Python"],
      links: [{ label: "GitHub", href: "https://github.com/j22k" }],
    },
  ] as Project[],
};
