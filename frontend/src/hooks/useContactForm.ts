"use client";
import { validateContactForm } from "@/lib/validators"; // Import the centralized validator

import { useState, useCallback } from "react";

export interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface UseContactFormReturn {
  formData: ContactFormState;
  errors: ContactFormErrors;
  isSubmitting: boolean;
  submitted: boolean;
  apiError: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/**
 * Custom hook for managing contact form state, validation, and submission.
 */
export function useContactForm(
  onSubmit?: (data: ContactFormState) => Promise<void>
): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormState>(initialFormState);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = useCallback(() => {
    const validationResult = validateContactForm(formData);
    setErrors(validationResult.errors);
    return validationResult.valid;
  }, [formData]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear field error on change
      if (errors[name as keyof ContactFormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setApiError("");

      if (!validate()) return;

      setIsSubmitting(true);

      try {
        if (onSubmit) {
          await onSubmit(formData);
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
    [formData, validate, onSubmit]
  );

  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setErrors({});
    setSubmitted(false);
    setApiError("");
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    submitted,
    apiError,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
