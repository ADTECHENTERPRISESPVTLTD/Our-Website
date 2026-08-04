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
    | 'development_approach'
    | 'intern_portal'
    | 'submit_requirement'
    | 'consultation';
}

export const COMPANY_NAME = "AD TECH ENTERPRISES PVT. LTD.";
export const EMAIL = "hradtechenterpriseschepvtltd@gmail.com";
export const PHONE = "+91 83193 58568";
export const TAGLINE = "Building Future Tech Talent";

export const KNOWLEDGE_BASE: QAItem[] = [
  // 1. COMPANY OVERVIEW & ABOUT US (Directly from PDF Page 1)
  {
    category: 'overview',
    keywords: ['who are you', 'about ad tech', 'company profile', 'what is ad tech', 'tell me about ad tech', 'about us', 'tagline', 'adtech', 'ad tech', 'company overview'],
    question: "What is AD TECH Enterprises Pvt. Ltd.?",
    answer: "AD TECH Enterprises Pvt. Ltd. is a modern software development and AI Automation company dedicated to helping organizations embrace digital transformation through intelligent technology solutions. With our motto \"Building Future Tech Talent\", we partner with schools, colleges, MSMEs, startups, and established enterprises to design, develop, and deploy scalable software products that solve real business challenges. We help organizations become AI-First Companies by integrating artificial intelligence into daily operations, decision-making, and customer experiences."
  },

  // 2. VISION & MISSION (Directly from PDF Page 1 & Page 5)
  {
    category: 'vision_mission',
    keywords: ['vision', 'mission', 'future vision', 'our vision', 'our mission', 'goals', 'purpose', 'tagline', 'values'],
    question: "What is AD TECH's Vision, Mission, and Tagline?",
    answer: "Our Tagline is \"Building Future Tech Talent.\" Our Vision is to become one of India's most trusted technology companies by empowering organizations of every size with intelligent software and AI-driven solutions. Our Mission is to make advanced technology accessible by building tailored software, enabling AI adoption, reducing operational inefficiencies through automation, and delivering measurable digital impact."
  },

  // 3. WHAT WE DO & OVERVIEW OF SERVICES (Directly from PDF Page 1 & Page 2)
  {
    category: 'services',
    keywords: ['what do you do', 'capabilities', 'what we do', 'all services', 'core services', 'solutions offered', 'services list', 'products'],
    question: "What does AD TECH do and what core services do you provide?",
    answer: "AD TECH provides end-to-end technology solutions from planning and design to development, deployment, and long-term support across six major domains:\n1) **Web Application Development** (Business Websites, Enterprise Portals, Admin Dashboards, CRM, ERP, SaaS)\n2) **Android Application Development** (Business Apps, Student Apps, Employee Management, E-commerce)\n3) **iOS Application Development** (Premium iOS applications optimized for Apple's ecosystem)\n4) **Artificial Intelligence & Automation** (AI Chatbots, AI Agents, Workflow Automation, Document Processing, Predictive Analytics)\n5) **Learning Management Systems (LMS)** (Student Portals, Teacher Dashboards, Course Management, Attendance, Progress Tracking)\n6) **EV Installment Management Solutions** (Customer Management, EMI Tracking, Dealer Dashboards, Vehicle Inventory)"
  },

  // 4. WEB APPLICATION DEVELOPMENT (Directly from PDF Page 2)
  {
    category: 'services',
    keywords: ['web development', 'web application', 'business websites', 'enterprise portals', 'admin dashboards', 'crm', 'erp', 'saas', 'next.js', 'react', 'tailwind'],
    question: "What Web Application Development solutions does AD TECH offer?",
    answer: "We design and develop responsive, modern, and scalable web applications using the latest frontend (React, Next.js, Tailwind CSS) and backend (Node.js, Express) technologies. Our solutions include Business Websites, Enterprise Portals, Admin Dashboards, CRM Systems, ERP Platforms, Customer Portals, and SaaS Applications."
  },

  // 5. ANDROID APPLICATION DEVELOPMENT (Directly from PDF Page 2)
  {
    category: 'services',
    keywords: ['android', 'android apps', 'mobile app', 'play store', 'student app', 'employee management app', 'e-commerce app', 'utility app'],
    question: "What Android Application Development solutions does AD TECH build?",
    answer: "Our Android solutions focus on performance, usability, and business value. We build Business Apps, Student Applications, Employee Management Apps, E-commerce Applications, Utility Applications, and Custom Enterprise Apps tailored for scalable organization workflows."
  },

  // 6. iOS APPLICATION DEVELOPMENT (Directly from PDF Page 2)
  {
    category: 'services',
    keywords: ['ios', 'ios app', 'iphone app', 'apple', 'app store', 'ios development', 'mobile development'],
    question: "What iOS Application Development solutions does AD TECH create?",
    answer: "We create premium iOS applications optimized specifically for Apple's ecosystem while maintaining top-tier security, native performance, and elegant, user-centric experiences for enterprise and consumer markets."
  },

  // 7. ARTIFICIAL INTELLIGENCE & AUTOMATION (Directly from PDF Page 2 & Page 3)
  {
    category: 'automation',
    keywords: ['ai automation', 'artificial intelligence', 'ai chatbots', 'ai agents', 'workflow automation', 'document processing', 'customer support automation', 'predictive analytics', 'business process automation'],
    question: "What Artificial Intelligence & Automation solutions does AD TECH provide?",
    answer: "AI is one of AD TECH's core areas of expertise. We help businesses automate repetitive work, improve operational efficiency, and enhance customer experiences. Our solutions include AI Chatbots, Autonomous AI Agents, Workflow Automation, Document Processing, Customer Support Automation, Predictive Analytics, AI Integration, and Business Process Automation."
  },

  // 8. LEARNING MANAGEMENT SYSTEMS (LMS) (Directly from PDF Page 3)
  {
    category: 'services',
    keywords: ['lms', 'learning management systems', 'student portals', 'teacher dashboards', 'course management', 'attendance', 'assignments', 'assessments', 'coaching software', 'school software'],
    question: "What features are included in AD TECH's Learning Management Systems (LMS)?",
    answer: "We build digital learning platforms for schools, colleges, coaching institutes, and organizations. Key features include Student Portals, Teacher Dashboards, Course Management, Attendance Tracking, Assignments Distribution, Online Assessments, Progress Tracking, and Learning Analytics."
  },

  // 9. EV INSTALLMENT MANAGEMENT SOLUTIONS (Directly from PDF Page 3)
  {
    category: 'services',
    keywords: ['ev solutions', 'electric vehicle', 'installment management', 'emi tracking', 'dealer dashboard', 'vehicle inventory', 'payment records', 'automated notifications'],
    question: "What are AD TECH's EV Installment Management Solutions?",
    answer: "We develop dedicated software platforms for electric vehicle (EV) businesses to manage installment-based purchasing and financing. Key features include Customer Management, EMI Tracking, Payment Records, Dealer Dashboards, Vehicle Inventory management, Analytics, and Automated Notifications."
  },

  // 10. INDUSTRIES WE SERVE (Directly from PDF Page 3 & Page 4)
  {
    category: 'industries',
    keywords: ['industries', 'sectors', 'who do you serve', 'clients', 'schools', 'colleges', 'msmes', 'startups', 'healthcare', 'manufacturing', 'retail', 'logistics', 'financial services'],
    question: "What industries does AD TECH serve?",
    answer: "AD TECH works with organizations across multiple sectors, including: Schools, Colleges, Educational Institutions, MSMEs, Startups, Healthcare, Manufacturing, Retail, Professional Services, Technology Companies, Logistics, and Financial Services."
  },

  // 11. WHY CHOOSE AD TECH (Directly from PDF Page 4)
  {
    category: 'why_choose_us',
    keywords: ['why choose ad tech', 'why ad tech', 'benefits', 'advantages', 'why work with ad tech', 'differentiators'],
    question: "Why should organizations choose AD TECH?",
    answer: "Organizations choose AD TECH because we focus on solving real business problems rather than simply delivering software. We emphasize a Modern Technology Stack, AI-First Approach, Scalable Architecture, User-Centric Design, Reliable Support, Transparent Development Process, Long-Term Partnerships, and Cost-Effective Solutions."
  },

  // 12. OUR DEVELOPMENT APPROACH (7-Step Workflow directly from PDF Page 4)
  {
    category: 'development_approach',
    keywords: ['development approach', 'development process', 'workflow', '7 step workflow', 'methodology', 'how do you work', 'steps'],
    question: "What is AD TECH's 7-Step Development Approach?",
    answer: "Every project follows our structured 7-step workflow:\n1) **Requirement Analysis** (understand client objectives and processes)\n2) **Planning** (prepare technical architecture and implementation roadmap)\n3) **Design** (create intuitive UI/UX designs prioritizing usability)\n4) **Development** (writing clean frontend, backend, database, and AI code)\n5) **Testing** (functionality, performance, security, and usability testing)\n6) **Deployment** (launching on reliable cloud infrastructure)\n7) **Support & Improvement** (ongoing maintenance, updates, and guidance)"
  },

  // 13. OUR CORE VALUES (Directly from PDF Page 4)
  {
    category: 'vision_mission',
    keywords: ['values', 'core values', 'principles', 'innovation', 'integrity', 'quality', 'collaboration', 'continuous learning'],
    question: "What are AD TECH's Core Values?",
    answer: "Our Core Values are:\n• **Innovation**: Continuously exploring emerging technologies to deliver future-ready solutions.\n• **Integrity**: Building long-term relationships based on honesty, transparency, and trust.\n• **Quality**: Developing every project with attention to detail, maintainability, and performance.\n• **Collaboration**: Believing great products are built through strong communication and teamwork.\n• **Continuous Learning**: Continuously improving our knowledge, processes, and solutions as technology evolves."
  },

  // 14. BUILDING AI-FIRST COMPANIES (Directly from PDF Page 4 & Page 5)
  {
    category: 'automation',
    keywords: ['ai-first', 'ai-first companies', 'ai transformation', 'ai integration', 'operational efficiency', 'future vision'],
    question: "How does AD TECH help build AI-First Companies?",
    answer: "We help organizations integrate AI into daily operations—not to replace people, but as a tool empowering teams to work faster, make smarter decisions, and focus on high-value tasks. Our goal is to help businesses transition from traditional operations into AI-powered organizations scaling efficiently in the modern digital economy."
  },

  // 15. INTERNSHIP & TALENT DEVELOPMENT (Directly from PDF Page 5)
  {
    category: 'internship',
    keywords: ['internship', 'talent development', 'building future tech talent', 'intern program', '5-day sprint', 'apply for internship', 'careers'],
    question: "What is the AD TECH Internship & Talent Development Program?",
    answer: "Reflecting our tagline \"Building Future Tech Talent\", our Internship Program nurtures the next generation of tech professionals through hands-on mentorship, structured developer roles (e.g. AI Lead, Frontend, Backend, QA), and real-world 5-day evaluation sprint project deliverables. Interns apply by sending resumes to hradtechenterpriseschepvtltd@gmail.com."
  },

  // 15b. HIRING & SELECTION PROCESS
  {
    category: 'hiring',
    keywords: ['hiring process', 'selection process', 'recruitment process', 'interview process', 'how are candidates selected', 'hiring steps', 'whats hiring process', 'what is hiring process'],
    question: "What is AD TECH's hiring and selection process for developer roles and internships?",
    answer: "AD TECH follows a structured, transparent 3-step hiring process for developer roles and internships:\n1) **Resume & Portfolio Screening** (reviewing technical background, GitHub repositories, and past projects)\n2) **5-Day Evaluation Sprint** (candidates are placed in structured team roles across AI, Frontend, or Backend to deliver a real project sprint)\n3) **Performance Evaluation & Offer** (successful candidates are awarded certificates, stipends, or full developer roles based on sprint performance). Send your resume to hradtechenterpriseschepvtltd@gmail.com to apply!"
  },

  // 16. CONTACT INFO (Directly from PDF Footer on All Pages)
  {
    category: 'contact',
    keywords: ['contact', 'email', 'phone', 'reach us', 'address', 'mail', 'phone number', 'contact details'],
    question: "How can I contact AD TECH Enterprises Pvt. Ltd.?",
    answer: "You can reach out to our team via email at **hradtechenterpriseschepvtltd@gmail.com** or call us directly at **+91 83193 58568**. You can also submit project scope requirements or book a callback session right on our website!"
  },

  // 17. INDUSTRY CONSULTATION — Website vs App vs AI advice for business owners
  {
    category: 'consultation',
    keywords: ['business owner', 'my company', 'my business', 'help me', 'help my business', 'how can you help', 'how ad tech can help', 'need help', 'i own', 'i run', 'i have a', 'what should i', 'should i get', 'do i need', 'website or app', 'app or website', 'which is better'],
    question: "I'm a business owner — how can AD TECH help my company? Should I get a website or an app?",
    answer: "AD TECH helps organizations across all industries (including retail, real estate, healthcare, education, and services) design, build, and scale custom digital platforms. A **website** is essential for online visibility, Google search discovery (SEO), product/service showcases, and customer lead generation. A **mobile app** (Android & iOS) is ideal for customer engagement, push notifications, and order tracking. We also build custom **AI Chatbots & Agents** to streamline daily operations 24/7. Connect with our team at hradtechenterpriseschepvtltd@gmail.com or call +91 83193 58568 to get a custom digital roadmap for your business!"
  },

  // 17b. FURNITURE & RETAIL SPECIFIC CONSULTATION
  {
    category: 'consultation',
    keywords: ['furniture', 'furniture company', 'furniture store', 'furniture owner', 'furniture business'],
    question: "A furniture company owner is asking: would an app or a website be better for my business?",
    answer: "For a furniture store or home decor business, a **high-performance website** is essential as your primary digital showroom for Google search discovery (SEO), high-resolution product catalogs, customer inquiries, and e-commerce transactions. A **mobile app** complements this by enabling customer loyalty programs, push notifications for new collections, and order tracking. At AD TECH, we recommend starting with a responsive e-commerce web platform and optionally building a native mobile app. Connect with us at hradtechenterpriseschepvtltd@gmail.com or call +91 83193 58568 to get started!"
  },

  // 18. HELP BUILDING A WEBSITE OR WEB APP
  {
    category: 'services',
    keywords: ['building a website', 'build a website', 'help me building', 'help me build', 'can you help me building', 'can you help me build', 'build website', 'create a website', 'website development', 'web application', 'custom website'],
    question: "Can AD TECH help me build a website or web application?",
    answer: "Yes, absolutely! AD TECH Enterprises specializes in designing and developing custom high-performance web applications, business websites, enterprise portals, e-commerce stores, and SaaS platforms using Next.js, React, and Tailwind CSS. We craft responsive, fast-loading, and SEO-optimized sites with admin dashboards tailored to your exact business workflow. Contact our team at hradtechenterpriseschepvtltd@gmail.com or call +91 83193 58568 to get started!"
  },

  // 19. PRICING & PROJECT SCOPE
  {
    category: 'consultation',
    keywords: ['pricing', 'cost', 'budget', 'how much', 'price', 'rate', 'charges', 'fees', 'quote', 'estimate', 'affordable', 'cheap', 'expensive', 'package', 'plan'],
    question: "How much does AD TECH charge for projects?",
    answer: "Project pricing depends on complexity, features, timeline, and technology stack. We offer flexible engagement models — from fixed-price projects to ongoing retainers. Whether you need a simple business website, a full-featured mobile app, or an enterprise AI solution, we'll provide a detailed proposal tailored to your budget. Book a free consultation call to get a personalized quote for your project!"
  },

  // 20. TIMELINE & DELIVERY
  {
    category: 'consultation',
    keywords: ['timeline', 'how long', 'delivery', 'time', 'duration', 'deadline', 'when', 'fast', 'quick', 'urgent', 'days', 'weeks', 'months'],
    question: "How long does it take to build a project with AD TECH?",
    answer: "Typical timelines vary by project scope: a business website takes 2-4 weeks, a mobile app takes 4-8 weeks, and enterprise solutions with AI integrations may take 8-16 weeks. We follow an agile development approach with regular milestone updates so you always know the progress. Book a call with our team to discuss your specific requirements and get an accurate timeline estimate!"
  },

  // 21. HOW TO APPLY & MATERIALS NEEDED FOR INTERNSHIPS
  {
    category: 'internship',
    keywords: ['how to apply', 'how can i apply', 'how to apply for internship', 'how to apply for job', 'internship application', 'apply for developer', 'requirements to apply', 'github portfolio', 'resume submission'],
    question: "How can I apply for a developer internship at AD TECH and what materials do I need to submit?",
    answer: "To apply for a developer internship at AD TECH, send an email to **hradtechenterpriseschepvtltd@gmail.com** with:\n1) Your updated **Resume / CV**\n2) Your **GitHub Profile** or project portfolio link\n3) Your primary tech stack interest (Frontend, Backend, AI, Android/iOS, or QA).\nOur team will review your application and invite qualified candidates to participate in our 5-day evaluation sprint!"
  },

  // 22. STIPENDS, CERTIFICATES & PERKS FOR INTERNS
  {
    category: 'internship',
    keywords: ['stipend', 'paid internship', 'certificate', 'internship certificate', 'perks', 'benefits for interns', 'is stipend provided', 'completion certificate'],
    question: "Does AD TECH provide stipends, certificates, or career offers for developer interns?",
    answer: "Yes! Interns who complete our 5-day evaluation sprint and developer program receive:\n1) An official **AD TECH Developer Internship Completion Certificate**\n2) Performance-based **stipends** for top-performing team roles\n3) Potential for full-time or junior developer employment offers based on project deliverables and technical contribution!"
  },

  // 23. TECH STACK & FRAMEWORKS USED BY AD TECH
  {
    category: 'services',
    keywords: ['tech stack', 'technology stack', 'technologies used', 'frameworks', 'what tech do you use', 'react', 'next.js', 'node.js', 'tailwind', 'python', 'gemini'],
    question: "What technology stack and frameworks does AD TECH use for software development?",
    answer: "AD TECH utilizes modern, industry-standard frameworks and cloud architectures:\n• **Frontend**: React, Next.js, Tailwind CSS, TypeScript\n• **Backend**: Node.js, Express, Python, REST/GraphQL APIs\n• **Mobile**: Native Android (Kotlin/Java), iOS (Swift), React Native\n• **AI & DB**: LangChain, Gemini AI, PostgreSQL, MongoDB, Pinecone / Vector DBs."
  },

  // 24. EV INSTALLMENT & EMI MANAGEMENT PLATFORMS
  {
    category: 'services',
    keywords: ['ev software', 'ev installment', 'electric vehicle financing', 'emi tracking', 'dealer dashboard', 'vehicle inventory', 'ev app'],
    question: "What features are included in AD TECH's Electric Vehicle (EV) Financing and EMI Management Software?",
    answer: "Our EV Installment Management platform provides complete financial & operational tracking for EV dealers and lenders:\n• **EMI & Payment Tracking**: Automated payment schedules, reminders, and delinquency alerts\n• **Dealer & Admin Dashboards**: Vehicle inventory management, sales analytics, and customer profiles\n• **Customer Portals**: Mobile & web access for buyers to track balance and pay installments."
  },

  // 25. LEARNING MANAGEMENT SYSTEMS (LMS) FOR SCHOOLS & COACHING
  {
    category: 'services',
    keywords: ['lms software', 'learning management system', 'school portal', 'coaching institute app', 'student dashboard', 'teacher portal', 'attendance tracking'],
    question: "What features are included in AD TECH's Learning Management Systems (LMS) for schools and coaching institutes?",
    answer: "AD TECH builds comprehensive digital learning platforms tailored for educational institutes:\n• **Student & Parent Portals**: Course materials, assignment submissions, online assessments, and attendance records\n• **Teacher & Admin Dashboards**: Automated grading, student progress analytics, schedule management, and notification broadcasts."
  }
];

export const QUICK_ACTIONS_RESPONSES = {
  services: {
    message: "We offer tailored web development, mobile apps, and AI automation solutions. Here are our main areas of expertise:\n\n1. **Web Dev**: Websites, Enterprise Portals, Admin Dashboards, CRM, ERP, SaaS.\n2. **Mobile Dev**: Android & iOS custom enterprise applications.\n3. **AI & Automation**: AI Chatbots, AI Agents, Workflow Automation, Document Processing.\n4. **LMS & EV**: Learning Management & Electric Vehicle financing software.\n\nWould you like me to guide you to the Services section of our page?",
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
