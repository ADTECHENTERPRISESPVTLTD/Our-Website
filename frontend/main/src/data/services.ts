// src/data/services.ts

import { Service, ProcessStep } from "@/types";

export const services: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Modern, responsive and scalable websites built with the latest technologies.",
    icon: "💻" as any,
  },
  {
    id: 2,
    title: "Mobile App Development",
    description:
      "High-performance Android and iOS applications tailored to your business.",
    icon: "📱" as any,
  },
  {
    id: 3,
    title: "UI / UX Design",
    description:
      "Beautiful, intuitive interfaces focused on user experience and conversion.",
    icon: "🎨" as any,
  },
  {
    id: 4,
    title: "AI Solutions",
    description:
      "AI chatbots, automation and intelligent solutions for modern businesses.",
    icon: "🤖" as any,
  },
  {
    id: 5,
    title: "Cloud Solutions",
    description:
      "Secure cloud infrastructure, deployment and scalable hosting services.",
    icon: "☁️" as any,
  },
  {
    id: 6,
    title: "Maintenance & Support",
    description:
      "Continuous monitoring, updates and technical support for your applications.",
    icon: "🛠️" as any,
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Requirement Analysis",
    description:
      "Understanding your business goals and project requirements.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Creating user-focused designs and interactive prototypes.",
  },
  {
    step: "03",
    title: "Development",
    description:
      "Building secure, scalable and high-quality digital products.",
  },
  {
    step: "04",
    title: "Launch & Support",
    description:
      "Deployment, optimization and long-term technical support.",
  },
];