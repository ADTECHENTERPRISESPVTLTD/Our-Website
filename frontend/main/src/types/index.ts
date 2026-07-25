// src/types/index.ts

import { ReactNode } from "react";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
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