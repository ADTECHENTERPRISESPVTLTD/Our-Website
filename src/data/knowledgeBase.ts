export interface QAItem {
  keywords: string[];
  question: string;
  answer: string;
  category: 'overview' | 'services' | 'automation' | 'internship' | 'hiring' | 'contact' | 'faqs';
}

export const COMPANY_NAME = "AD Tech Enterprises Pvt. Ltd.";
export const EMAIL = "hradtechenterpriseschepvtltd@gmail.com";
export const PHONE = "+91 83193 58568";

export const KNOWLEDGE_BASE: QAItem[] = [
  {
    category: 'overview',
    keywords: ['who are you', 'about ad tech', 'company overview', 'what is ad tech', 'tell me about the company', 'introduction', 'mission', 'vision', 'adtech'],
    question: "What is AD Tech Enterprises Pvt. Ltd.?",
    answer: "AD Tech Enterprises Pvt. Ltd. is a premier technology company dedicated to \"Building Future Tech Talent.\" We focus on helping businesses transition into AI-first enterprises by designing and integrating practical, production-ready AI solutions, while simultaneously mentoring and training future technology leaders through real-world developer roles and project sprints."
  },
  {
    category: 'services',
    keywords: ['services', 'what do you offer', 'what do you build', 'capabilities', 'development', 'technologies', 'tech stack', 'products'],
    question: "What services does AD TECH provide?",
    answer: "We offer comprehensive digital transformation services including high-performance Frontend Web Development (React, Next.js, Tailwind CSS), Backend API & Database Architecting (Node.js, Express, databases), and specialized AI Integration and Knowledge Assistants (incorporating LLMs like OpenAI/Gemini APIs, LangChain, and Vector Databases)."
  },
  {
    category: 'automation',
    keywords: ['ai automation', 'artificial intelligence', 'chatbot integration', 'intelligent agents', 'process automation', 'llm', 'gpt', 'gemini'],
    question: "What is your expertise in AI Automation?",
    answer: "We specialize in building advanced, context-aware AI agents, custom customer support widgets, intelligent lead qualification tools, and automated workflows. By integrating robust LLMs with proprietary company knowledge bases, we build highly practical, secure, and production-ready assistants that enhance customer experiences and reduce operational overhead."
  },
  {
    category: 'internship',
    keywords: ['internship', 'apply for internship', 'training program', 'roles', 'intern', 'talent development', 'careers', 'opportunities', 'duration'],
    question: "What is the AD TECH Internship Program?",
    answer: "Our Internship Program is an immersive, hands-on experience designed to build the next generation of tech talent. Interns are placed in real-world team configurations with structured roles (e.g., AI Lead, Frontend Developer, Backend Developer, QA Engineer) and work on actual production-ready sprint deliverables with strict timelines (e.g., 5-day sprints), ensuring they gain authentic corporate experience."
  },
  {
    category: 'hiring',
    keywords: ['hiring process', 'how to join', 'how to apply', 'recruitment', 'interview', 'selection', 'join ad tech'],
    question: "What is the hiring process at AD TECH?",
    answer: "Our hiring process is structured to evaluate practical capabilities: 1) Application screening (resume and portfolio review), 2) Practical coding task or project assignment (like building this chatbot!), 3) Technical interview covering problem-solving and software architecture, and 4) Final alignment call. We look for individuals eager to work on cutting-edge AI and web technologies."
  },
  {
    category: 'contact',
    keywords: ['contact', 'email', 'phone number', 'address', 'office', 'reach out', 'call back', 'support', 'help', 'location'],
    question: "How can I contact AD TECH?",
    answer: "You can reach out to our team via email at hradtechenterpriseschepvtltd@gmail.com, or call us at +91 83193 58568. Alternatively, you can use the 'Book a Callback' or 'Contact Us' quick action buttons in this chat widget to schedule a session with our specialists."
  },
  {
    category: 'faqs',
    keywords: ['faq', 'duration', 'timeline', 'technologies', 'api key', 'location', 'frequently asked questions'],
    question: "Frequently Asked Questions (FAQs)",
    answer: "Common FAQs:\n\n1. **What is the typical project duration?**\nOur initial evaluation tasks (like this chatbot) have a 5-day sprint duration. Standard client projects range from 1 to 6 months.\n\n2. **Where is AD TECH located?**\nWe operate globally with a remote-first collaborative setup, providing talent development across multiple regions.\n\n3. **What tech stack is preferred?**\nWe focus heavily on Next.js, React, Tailwind CSS, Node.js, Express, and modern generative AI SDKs."
  }
];

export const QUICK_ACTIONS_RESPONSES = {
  services: {
    message: "We offer tailored web development, backend engineering, and AI automation solutions. Here are our main areas of expertise:\n\n1. **Frontend**: High-performance UI/UX using React, Next.js, and Tailwind CSS.\n2. **Backend**: Scalable microservices using Node.js, Express, and Database design.\n3. **AI Integration**: Custom chatbots, Gemini/OpenAI integration, and vector search systems.\n\nWould you like me to guide you to the Services section of our page?",
    suggestions: ["Scroll to Services", "Book a Callback"]
  },
  internship: {
    message: "Our internship program offers practical developer roles (AI Lead, Frontend, Backend, QA) working on production-ready projects. To apply, you can send your resume and portfolio directly to hradtechenterpriseschepvtltd@gmail.com.\n\nWould you like to scroll to our Careers & Internships section for more details?",
    suggestions: ["Scroll to Careers", "Contact Us"]
  },
  contact: {
    message: "You can reach our HR or Sales team directly:\n- **Email**: hradtechenterpriseschepvtltd@gmail.com\n- **Phone**: +91 83193 58568\n\nYou can also click 'Book a Callback' below to submit your details directly.",
    suggestions: ["Book a Callback", "Submit Requirements"]
  }
};
