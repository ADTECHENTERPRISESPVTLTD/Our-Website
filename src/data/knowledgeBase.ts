export interface QAItem {
  keywords: string[];
  question: string;
  answer: string;
  category: 
    | 'overview' 
    | 'services' 
    | 'automation' 
    | 'internship' 
    | 'hiring' 
    | 'contact' 
    | 'faqs'
    | 'vision_mission'
    | 'industries'
    | 'why_choose_us'
    | 'development_approach';
}

export const COMPANY_NAME = "AD Tech Enterprises Pvt. Ltd.";
export const EMAIL = "hradtechenterpriseschepvtltd@gmail.com";
export const PHONE = "+91 83193 58568";

export const KNOWLEDGE_BASE: QAItem[] = [
  {
    category: 'overview',
    keywords: ['who are you', 'about ad tech', 'company overview', 'what is ad tech', 'tell me about the company', 'introduction', 'tagline', 'adtech'],
    question: "What is AD Tech Enterprises Pvt. Ltd.?",
    answer: "AD Tech Enterprises Pvt. Ltd. is a modern software development and AI Automation company dedicated to \"Building Future Tech Talent.\" We help businesses transition into AI-first enterprises by designing and integrating practical, production-ready AI solutions, while simultaneously nurturing and mentoring future technology leaders through structured developer roles and sprint-based project delivery."
  },
  {
    category: 'vision_mission',
    keywords: ['vision', 'mission', 'values', 'our values', 'goals', 'strategic goals', 'purpose'],
    question: "What is AD TECH's Vision, Mission, and Core Values?",
    answer: "Our Vision is to become one of India's most trusted technology companies by empowering organizations with intelligent, AI-driven solutions. Our Mission is to make advanced technology accessible to organizations of every size. Our Core Values are Innovation (exploring future-ready tech), Integrity (honesty and transparency), Quality (attention to detail and performance), Collaboration (teamwork), and Continuous Learning."
  },
  {
    category: 'services',
    keywords: ['services', 'what do you offer', 'what do you build', 'capabilities', 'development', 'technologies', 'tech stack', 'products'],
    question: "What core services does AD TECH provide?",
    answer: "AD TECH provides end-to-end technology solutions across six major service domains:\n1) **Web Application Development** (responsive sites, enterprise portals, SaaS)\n2) **Android Application Development** (business, student, and e-commerce apps)\n3) **iOS Application Development** (premium iOS solutions optimized for Apple's ecosystem)\n4) **Artificial Intelligence & Automation** (custom chatbots, agents, workflow automation)\n5) **Learning Management Systems (LMS)** (student/teacher portals, progress tracking)\n6) **EV Installment Management Solutions** (financing, EMI tracking, vehicle inventory)"
  },
  {
    category: 'services',
    keywords: ['web development', 'frontend', 'backend', 'websites', 'databases', 'next.js', 'react', 'node.js', 'express'],
    question: "Tell me about AD TECH's Web and Backend Development capabilities.",
    answer: "We design and develop responsive, modern, and scalable web applications. On the frontend, we use React, Next.js, and Tailwind CSS to ensure outstanding performance. On the backend, we build production-ready microservices using Node.js and Express, architecting secure databases and scalable API endpoints."
  },
  {
    category: 'services',
    keywords: ['android', 'ios', 'mobile app', 'iphone app', 'app development', 'phone app'],
    question: "Does AD TECH build mobile applications?",
    answer: "Yes, we build high-performance mobile apps for both platforms:\n- **Android Application Development**: We create business apps, student systems, employee management, and e-commerce apps focused on usability.\n- **iOS Application Development**: We build premium iOS applications optimized for Apple's ecosystem while maintaining top security, performance, and elegant user experiences."
  },
  {
    category: 'services',
    keywords: ['lms', 'learning management system', 'education portal', 'school portal', 'teacher portal'],
    question: "What features are included in your Learning Management Systems (LMS)?",
    answer: "Our LMS platforms are built for schools, colleges, and coaching institutes. They include Student Portals, Teacher Dashboards, Course Management, Attendance tracking, Assignments distribution, Online Assessments, Progress tracking, and Learning Analytics."
  },
  {
    category: 'services',
    keywords: ['ev solutions', 'electric vehicle', 'installment financing', 'emi tracking', 'dealer dashboard', 'vehicle inventory'],
    question: "What are your EV Installment Management Solutions?",
    answer: "We develop dedicated software platforms for electric vehicle businesses to manage installment-based purchasing and financing. Key features include Customer Management, EMI Tracking, Payment Records tracking, Dealer Dashboards, Vehicle Inventory management, detailed Analytics, and Automated Notifications."
  },
  {
    category: 'automation',
    keywords: ['ai automation', 'artificial intelligence', 'chatbot integration', 'intelligent agents', 'process automation', 'llm', 'gpt', 'gemini'],
    question: "What is your expertise in AI Automation?",
    answer: "AI is a core area of expertise. We build context-aware AI chatbots, advanced AI agents, workflow automation pipelines, document processing tools, customer support systems, and predictive analytics models to improve operational efficiency and customer engagement."
  },
  {
    category: 'industries',
    keywords: ['industries', 'sectors', 'clients', 'market', 'who do you serve', 'logistics', 'healthcare', 'manufacturing', 'retail', 'schools', 'colleges'],
    question: "What industries does AD TECH serve?",
    answer: "We work with organizations across multiple industries, including: Schools, Colleges, and Educational Institutions; MSMEs and Startups; Healthcare; Manufacturing; Retail; Professional Services; Technology Companies; Logistics; and Financial Services."
  },
  {
    category: 'why_choose_us',
    keywords: ['why choose ad tech', 'why ad tech', 'benefits', 'why hire you', 'why work with you', 'advantages'],
    question: "Why should organizations choose AD TECH?",
    answer: "Organizations choose AD TECH because we focus on solving real business problems rather than simply delivering software. We emphasize a modern technology stack, an AI-First approach, scalable architecture, user-centric designs, reliable support, a transparent development process, and cost-effective long-term partnerships."
  },
  {
    category: 'development_approach',
    keywords: ['development approach', 'development process', 'workflow', 'steps', 'how do you work', 'lifecycle', 'methodology'],
    question: "What is AD TECH's development approach?",
    answer: "Every project follows our structured 7-step workflow:\n1) **Requirement Analysis** (understand client objectives and processes)\n2) **Planning** (technical architecture and project roadmap)\n3) **Design** (intuitive UI/UX designs)\n4) **Development** (writing clean frontend, backend, database, and AI code)\n5) **Testing** (usability, security, and performance verification)\n6) **Deployment** (launching on reliable cloud infrastructure)\n7) **Support & Improvement** (ongoing maintenance and updates)"
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
    category: 'automation',
    keywords: ['custom agents', 'ai agents', 'agentic workflows', 'agent developers', 'chatbots', 'custom ai', 'llm agents'],
    question: "Does AD TECH build custom AI agents?",
    answer: "Yes! AD TECH designs custom, goal-oriented AI agents capable of executing multi-step workflows. Our agents use techniques like advanced prompting, memory persistence, tool integration, and fallback execution systems to automate complex business processes like lead scoring, customer onboarding, and content generation."
  },
  {
    category: 'internship',
    keywords: ['sprint structure', 'sprint deliverables', 'evaluations', 'how are interns evaluated', 'mentors', 'learning path', '5-day sprint'],
    question: "How is the internship at AD TECH structured?",
    answer: "The internship is organized into highly structured 5-day sprints. Each sprint begins with task planning, followed by execution, active code reviews, and final staging deployment. Interns receive direct evaluations from senior developers, helping them master real-world collaboration tools like Git, Slack, Jira-like workflows, and continuous integration."
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
