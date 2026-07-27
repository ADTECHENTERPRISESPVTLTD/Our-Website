// Server-side validation utilities
// These can be used in API routes and server actions

import { REGEX, VALIDATION } from "@/constants";

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate callback form data
 */
export function validateCallbackForm(data: {
  name: string;
  company: string;
  phoneNumber: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < VALIDATION.NAME_MIN_LENGTH) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.company || !data.company.trim()) {
    errors.company = "Company name is required";
  }

  if (!data.phoneNumber || !REGEX.PHONE.test(data.phoneNumber)) {
    errors.phoneNumber = "Valid phone number is required";
  }

  if (!data.preferredDate) {
    errors.preferredDate = "Preferred date is required";
  }

  if (!data.preferredTime) {
    errors.preferredTime = "Preferred time is required";
  }

  if (
    !data.message ||
    data.message.trim().length < VALIDATION.MESSAGE_MIN_LENGTH
  ) {
    errors.message = "Message must be at least 10 characters";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate contact form data
 */
export function validateContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < VALIDATION.NAME_MIN_LENGTH) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email || !REGEX.EMAIL.test(data.email)) {
    errors.email = "Valid email address is required";
  }

  if (!data.subject || !data.subject.trim()) {
    errors.subject = "Subject is required";
  }

  if (
    !data.message ||
    data.message.trim().length < VALIDATION.MESSAGE_MIN_LENGTH
  ) {
    errors.message = "Message must be at least 10 characters";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate career application form data
 */
export function validateCareerForm(data: {
  name: string;
  email: string;
  phone: string;
  college: string;
  skills: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || !data.name.trim()) {
    errors.name = "Name is required";
  }

  if (!data.email || !REGEX.EMAIL.test(data.email)) {
    errors.email = "Valid email address is required";
  }

  if (!data.phone || data.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Valid phone number with at least 10 digits is required";
  }

  if (!data.college || !data.college.trim()) {
    errors.college = "College/University is required";
  }

  if (!data.skills || !data.skills.trim()) {
    errors.skills = "Skills are required";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate requirement form data
 */
export function validateRequirementForm(data: {
  companyName: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  businessType: string;
  projectRequirement: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.companyName || !data.companyName.trim()) {
    errors.companyName = "Company name is required";
  }

  if (!data.contactPerson || !data.contactPerson.trim()) {
    errors.contactPerson = "Contact person name is required";
  }

  if (!data.email || !REGEX.EMAIL.test(data.email)) {
    errors.email = "Valid email address is required";
  }

  if (
    !data.phoneNumber ||
    data.phoneNumber.replace(/\D/g, "").length < VALIDATION.PHONE_MIN_DIGITS
  ) {
    errors.phoneNumber = "Valid phone number is required";
  }

  if (!data.businessType || !data.businessType.trim()) {
    errors.businessType = "Business type is required";
  }

  if (
    !data.projectRequirement ||
    data.projectRequirement.trim().length < VALIDATION.DESCRIPTION_MIN_LENGTH
  ) {
    errors.projectRequirement =
      "Project requirement must be at least 20 characters";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

