"use server";

// Next.js Server Actions for form submissions

import { revalidatePath } from "next/cache";
import {
  validateCallbackForm,
  validateContactForm,
  validateRequirementForm,
} from "./validators";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

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

