// Career API Service
import { post, get, postFormData } from "./api";

export interface CareerFormData {
  name: string;
  email: string;
  phone: string;
  college: string;
  skills: string;
  portfolio?: string;
  linkedin?: string;
}

export interface Career extends CareerFormData {
  _id: string;
  resumeUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const careerService = {
  /**
   * Submit a career application (with resume file)
   */
  create(data: CareerFormData, resume: File) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    formData.append("resume", resume);

    return postFormData<Career>("/careers", formData);
  },

  /**
   * Get all career applications (admin)
   */
  getAll() {
    return get<Career[]>("/careers");
  },
};

