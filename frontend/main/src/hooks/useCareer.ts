"use client";

import { useState, useCallback } from "react";
import { validateCareerForm } from "@/lib/validators"; // Import the centralized validator
import { submitCareerAction } from "@/lib/actions"; // Import the server action

export interface CareerFormState {
  name: string;
  email: string;
  phone: string;
  college: string;
  skills: string;
  portfolio: string;
  linkedin: string;
}

export interface CareerFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  college?: string;
  skills?: string;
  resume?: string;
  portfolio?: string;
  linkedin?: string;
}

interface UseCareerReturn {
  formData: CareerFormState;
  errors: CareerFormErrors;
  resumeFile: File | null;
  isSubmitting: boolean;
  submitted: boolean;
  apiError: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleResumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const initialFormState: CareerFormState = {
  name: "",
  email: "",
  phone: "",
  college: "",
  skills: "",
  portfolio: "",
  linkedin: "",
};

/**
 * Custom hook for managing the career application form.
 * Handles state, file upload, validation, and API submission.
 */
export function useCareer(): UseCareerReturn {
  const [formData, setFormData] = useState<CareerFormState>(initialFormState);
  const [errors, setErrors] = useState<CareerFormErrors>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = useCallback(() => {
    const validationResult = validateCareerForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      college: formData.college,
      skills: formData.skills,
      portfolio: formData.portfolio,
      linkedin: formData.linkedin,
      resume: resumeFile, // Pass resumeFile for client-side presence/size validation
    });
    setErrors(validationResult.errors);
    if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
      validationResult.valid = false;
      setErrors((prev) => ({ ...prev, resume: "Resume file must be under 5MB" }));
    }
    
    return validationResult.valid;
  }, [formData, resumeFile]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof CareerFormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleResumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setResumeFile(file);
      if (errors.resume) {
        setErrors((prev) => ({ ...prev, resume: undefined }));
      }
    },
    [errors.resume]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setApiError("");

      if (!validate()) return;
      setIsSubmitting(true);

      try {
        if (!resumeFile) {
          throw new Error("Resume file is required");
        }
        
        const formPayload = new FormData();
        formPayload.append("name", formData.name);
        formPayload.append("email", formData.email);
        formPayload.append("phone", formData.phone);
        formPayload.append("college", formData.college);
        formPayload.append("skills", formData.skills);
        formPayload.append("portfolio", formData.portfolio);
        formPayload.append("linkedin", formData.linkedin);
        formPayload.append("resume", resumeFile);

        const result = await submitCareerAction(formPayload); // Use the server action
        if (!result.success) {
          throw new Error(result.message || "Failed to submit career application");
        }
        setSubmitted(true);
      } catch (error: any) {
        setApiError(
          error.message || "Something went wrong. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, resumeFile, validate]
  );

  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setErrors({});
    setResumeFile(null);
    setSubmitted(false);
    setApiError("");
  }, []);

  return {
    formData,
    errors,
    resumeFile,
    isSubmitting,
    submitted,
    apiError,
    handleChange,
    handleResumeChange,
    handleSubmit,
    resetForm,
  };
}
