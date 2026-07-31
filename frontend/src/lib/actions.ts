"use server";

// Next.js Server Actions for form submissions

import { revalidatePath } from "next/cache";
import {
  validateCallbackForm,
  validateCareerForm,
  validateContactForm,
  validateRequirementForm,
} from "./validators";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Server action to submit a callback request.
 * Validates data server-side before forwarding to the Express backend.
 */
export async function submitCallbackAction(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    company: formData.get("company") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    preferredDate: formData.get("preferredDate") as string,
    preferredTime: formData.get("preferredTime") as string,
    message: formData.get("message") as string,
  };

  // Server-side validation
  const validation = validateCallbackForm(data);
  if (!validation.valid) {
    return { success: false, errors: validation.errors };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/callback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to submit callback request",
      };
    }

    revalidatePath("/callback");
    return { success: true, message: "Callback request submitted successfully" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong. Please try again.",
    };
  }
}

/**
 * Server action to submit a career application.
 * Handles file upload for resume.
 */
export async function submitCareerAction(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    college: formData.get("college") as string,
    skills: formData.get("skills") as string,
    portfolio: (formData.get("portfolio") as string) || "",
    linkedin: (formData.get("linkedin") as string) || "",
  };

  const resumeFile = formData.get("resume") as File;

  // Server-side validation
  // Note: For file validation (size/type), it's often done client-side for better UX,
  // but server-side is crucial for security. Here, we'll just check for presence.
  const validation = validateCareerForm({ ...data, resume: resumeFile });
  if (!validation.valid) {
    return { success: false, errors: validation.errors };
  }

  // Create a new FormData for the actual API call, as the original might contain
  // fields not directly mapped to the backend or need specific formatting.
  const apiFormData = new FormData();
  for (const key in data) {
    apiFormData.append(key, (data as any)[key]);
  }
  apiFormData.append("resume", resumeFile);

  try {
    const response = await fetch(`${API_BASE_URL}/careers`, {
      method: "POST",
      body: apiFormData, // No 'Content-Type' header for FormData, browser sets it
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, message: result.message || "Failed to submit career application" };
    }

    revalidatePath("/careers");
    return { success: true, message: "Career application submitted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong. Please try again." };
  }
}

/**
 * Server action to submit a contact form message.
 */
export async function submitContactAction(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const validation = validateContactForm(data);
  if (!validation.valid) {
    return { success: false, errors: validation.errors };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to send message",
      };
    }

    revalidatePath("/contact");
    return { success: true, message: "Message sent successfully" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong. Please try again.",
    };
  }
}

/**
 * Server action to submit a requirement.
 */
export async function submitRequirementAction(formData: FormData) {
  const data = {
    companyName: formData.get("companyName") as string,
    contactPerson: formData.get("contactPerson") as string,
    email: formData.get("email") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    businessType: formData.get("businessType") as string,
    projectRequirement: formData.get("projectRequirement") as string,
    budget: (formData.get("budget") as string) || "",
    timeline: (formData.get("timeline") as string) || "",
  };

  const validation = validateRequirementForm(data);
  if (!validation.valid) {
    return { success: false, errors: validation.errors };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/requirements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to submit requirement",
      };
    }

    revalidatePath("/requirement");
    return { success: true, message: "Requirement submitted successfully" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong. Please try again.",
    };
  }
}
