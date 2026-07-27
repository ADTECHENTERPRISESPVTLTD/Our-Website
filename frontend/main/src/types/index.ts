// src/types/index.ts

import { LucideIcon } from "lucide-react";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ContactInfo {
  title: string;
  value: string;
  href?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}