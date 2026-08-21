export interface KnowledgeEntry {
  category: 'overview' | 'services' | 'internship' | 'contact' | 'consultation';
  keywords: string[];
  question: string;
  answer: string;
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // 1. COMPANY OVERVIEW & IDENTITY
  {
    category: 'overview',
    keywords: ['who are you', 'what is ad tech', 'about company', 'company overview', 'adtech', 'ad tech enterprises', 'what do you do', 'tagline', 'mission'],
    question: "Who is AD TECH Enterprises Pvt. Ltd. and what is your core mission?",
    answer: "AD TECH Enterprises Pvt. Ltd. is a premier software development, AI automation, and IT consulting firm with the core mission of **'Building Future Tech Talent.'** We build custom enterprise software, mobile apps, SaaS platforms, and AI workflows for businesses while mentoring top developer talent."
  },

  // 2. WEB DEVELOPMENT SERVICES
  {
    category: 'services',
    keywords: ['web dev', 'web development', 'website', 'custom website', 'frontend', 'nextjs', 'react', 'tailwind', 'ecommerce', 'web app'],
    question: "What web development services does AD TECH offer?",
    answer: "We build modern, high-performance websites, web applications, admin dashboards, and e-commerce platforms using Next.js, React, TypeScript, and Tailwind CSS. All our web solutions are SEO-optimized, responsive, and secure."
  },

  // 3. AI & AUTOMATION SERVICES
  {
    category: 'services',
    keywords: ['ai', 'ai automation', 'ai agents', 'chatbots', 'voice assistant', 'rag', 'automation', 'machine learning', 'llm'],
    question: "What AI and automation capabilities does AD TECH provide?",
    answer: "We design AI Chatbots, Voice Assistants (like Asha AI!), RAG (Retrieval-Augmented Generation) knowledge engines, document processing bots, and automated business workflows that reduce manual effort and boost productivity."
  },

  // 4. MOBILE APP DEVELOPMENT
  {
    category: 'services',
    keywords: ['mobile app', 'android', 'ios', 'app dev', 'react native', 'flutter', 'application'],
    question: "Does AD TECH develop native and cross-platform mobile apps?",
    answer: "Yes! We build high-performance native Android (Kotlin/Java), iOS (Swift), and cross-platform mobile applications tailored for businesses, including real-time tracking, push notifications, and payment gateways."
  },

  // 5. EV FINANCING & EMI MANAGEMENT PLATFORM
  {
    category: 'services',
    keywords: ['ev', 'ev software', 'electric vehicle', 'emi tracking', 'installment software', 'financing app'],
    question: "What features are included in AD TECH's EV Financing & EMI Management software?",
    answer: "Our EV Financing platform offers automated EMI payment schedules, dealer inventory management, customer loan tracking, automated payment reminders, and admin analytics dashboards for EV dealers and financiers."
  },

  // 6. LEARNING MANAGEMENT SYSTEMS (LMS)
  {
    category: 'services',
    keywords: ['lms', 'learning management system', 'school app', 'coaching portal', 'student dashboard', 'teacher portal'],
    question: "What is AD TECH's Learning Management System (LMS) solution?",
    answer: "Our LMS platform provides student & parent dashboards, course material sharing, online tests, automated grading, attendance tracking, and teacher portals designed specifically for schools, colleges, and coaching institutes."
  },

  // 7. INTERNSHIP PROGRAM & EVALUATION SPRINT
  {
    category: 'internship',
    keywords: ['internship', 'intern', 'developer program', 'evaluation sprint', '5-day sprint', 'apply for internship', 'stipend', 'certificate'],
    question: "How does the AD TECH Developer Internship Program work?",
    answer: "Our Internship Program embodies our mission of 'Building Future Tech Talent.' Candidates undergo a 5-day hands-on evaluation sprint working on real project tasks. Successful interns earn official Completion Certificates, stipends, and full-time hiring opportunities!"
  },

  // 8. HOW TO APPLY FOR INTERNSHIPS
  {
    category: 'internship',
    keywords: ['how to apply', 'internship application', 'apply for job', 'resume email', 'github link'],
    question: "How can I apply for a developer internship at AD TECH?",
    answer: "To apply, send an email to **hradtechenterpriseschepvtltd@gmail.com** with your updated Resume/CV, GitHub profile or portfolio link, and preferred tech stack (Frontend, Backend, AI, or Mobile)."
  },

  // 9. PRICING & QUOTATION
  {
    category: 'consultation',
    keywords: ['pricing', 'cost', 'how much', 'budget', 'rate', 'quote', 'charges', 'fees', 'estimate'],
    question: "How much does AD TECH charge for software development projects?",
    answer: "Project costs depend on scope, features, and timeline. We offer flexible fixed-price and retainer packages. Submit your project scope via the chat or book a callback with our team to get a detailed proposal!"
  },

  // 10. PROJECT TIMELINES
  {
    category: 'consultation',
    keywords: ['timeline', 'how long', 'delivery time', 'duration', 'weeks', 'deadline'],
    question: "What is the typical project delivery timeline?",
    answer: "Business websites typically take 2-4 weeks, mobile apps 4-8 weeks, and enterprise AI or custom SaaS platforms 8-16 weeks. We follow agile sprints with weekly progress updates."
  },

  // 11. CONTACT INFORMATION & LOCATION
  {
    category: 'contact',
    keywords: ['contact', 'email', 'phone', 'location', 'address', 'call', 'reach'],
    question: "How can I contact AD TECH Enterprises?",
    answer: "You can reach us directly:\n- **Email**: hradtechenterpriseschepvtltd@gmail.com\n- **Phone**: +91 83193 58568\n- **Website**: AD TECH Enterprises Pvt. Ltd."
  }
];

export const QUICK_ACTIONS_RESPONSES = {
  services: {
    message: "We offer tailored web development, mobile apps, and AI automation solutions. Here are our main areas of expertise:\n\n1. **Web Dev**: Websites, Enterprise Portals, Admin Dashboards, CRM, ERP, SaaS.\n2. **Mobile Dev**: Android & iOS custom enterprise applications.\n3. **AI & Automation**: AI Chatbots, AI Agents, Workflow Automation.\n4. **LMS & EV**: Learning Management & EV financing software.\n\nWould you like me to guide you to the Services section of our page?",
    suggestions: ["Scroll to Services", "Book a Callback"]
  },
  internship: {
    message: "Our internship program embodies our tagline 'Building Future Tech Talent', offering practical developer roles working on 5-day evaluation sprint deliverables. To apply, send your resume and portfolio to hradtechenterpriseschepvtltd@gmail.com.\n\nWould you like to open our Careers & Internships page?",
    suggestions: ["Scroll to Careers", "Contact Us"]
  },
  contact: {
    message: "You can connect directly with AD TECH Enterprises Pvt. Ltd.:\n- **Email**: hradtechenterpriseschepvtltd@gmail.com\n- **Phone**: +91 83193 58568\n\nYou can also click 'Book a Callback' below to submit your details directly.",
    suggestions: ["Book a Callback", "Submit Requirements"]
  }
};
