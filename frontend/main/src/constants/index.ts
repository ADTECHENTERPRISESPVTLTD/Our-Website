// Application Constants

// ============================================
// API Configuration
// ============================================
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ============================================
// Company Information
// ============================================
export const COMPANY = {
  name: "AD Tech Enterprises Pvt. Ltd.",
  shortName: "AD TECH",
  tagline: "Building Future Tech Talent.",
  email: "hradtechenterpriseschepvtltd@gmail.com",
  phone: "+91 83193 58568",
  address: "Nagpur, Maharashtra, India",
  workingHours: "Monday - Saturday",
} as const;

// ============================================
// Site Navigation
// ============================================
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

// ============================================
// Services
// ============================================
export const SERVICE_CATEGORIES = [
  "Web Development",
  "Mobile App Development",
  "UI / UX Design",
  "AI Solutions",
  "Cloud Solutions",
  "Maintenance & Support",
] as const;

// ============================================
// Social Links
// ============================================
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "Twitter", href: "#", icon: "𝕏" },
  { label: "Instagram", href: "#", icon: "ig" },
  { label: "GitHub", href: "#", icon: "gh" },
] as const;

// ============================================
// Route Paths
// ============================================
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  CAREERS: "/careers",
  FAQ: "/faq",
  CONTACT: "/contact",
  CALLBACK: "/callback",
  REQUIREMENT: "/requirement",
  SUBMIT_REQUIREMENT: "/submit-requirement",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  ATTENDANCE: "/attendance",
  TASKS: "/tasks",
} as const;

// ============================================
// API Endpoints
// ============================================
export const API_ENDPOINTS = {
  CALLBACK: "/callback",
  CONTACT: "/contact",
  CAREERS: "/careers",
  REQUIREMENTS: "/requirements",
  NEWSLETTER: "/newsletter",
} as const;

// ============================================
// Validation Constants
// ============================================
export const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  MESSAGE_MIN_LENGTH: 10,
  DESCRIPTION_MIN_LENGTH: 20,
  PHONE_MIN_DIGITS: 10,
  RESUME_MAX_SIZE: 5 * 1024 * 1024, // 5MB
} as const;

// ============================================
// Regex Patterns
// ============================================
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/,
} as const;

