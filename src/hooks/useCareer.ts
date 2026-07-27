"use client";

import { useState, useCallback } from "react";
import { careerService, CareerFormData } from "@/services/career.service";

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

  const validate = useCallback((): boolean => {
    const newErrors: CareerFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.trim().replace(/\D/g, "").length < 10) {
      newErrors.phone = "Phone number must have at least 10 digits";
    }

    if (!formData.college.trim()) {
      newErrors.college = "College/University name is required";
    }

    if (!formData.skills.trim()) {
      newErrors.skills = "Skills are required";
    }

    if (!resumeFile) {
      newErrors.resume = "Resume file is required";
    } else if (resumeFile.size > 5 * 1024 * 1024) {
      newErrors.resume = "Resume file must be under 5MB";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        const data: CareerFormData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          college: formData.college,
          skills: formData.skills,
          portfolio: formData.portfolio,
          linkedin: formData.linkedin,
        };

        if (!resumeFile) {
          throw new Error("Resume file is required");
        }

        await careerService.create(data, resumeFile);
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

