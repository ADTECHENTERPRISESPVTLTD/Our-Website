// Requirement API Service
import { post, get } from "./api";

export interface RequirementFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  businessType: string;
  projectRequirement: string;
  budget?: string;
  timeline?: string;
}

export interface Requirement extends RequirementFormData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export const requirementService = {
  /**
   * Submit a new requirement
   */
  create(data: RequirementFormData) {
    return post<Requirement>("/requirements", data);
  },

  /**
   * Get all requirements (admin)
   */
  getAll() {
    return get<Requirement[]>("/requirements");
  },
};

