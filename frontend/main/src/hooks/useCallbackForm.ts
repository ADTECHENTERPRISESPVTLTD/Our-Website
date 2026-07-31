"use client";

import { useState, useCallback } from "react";
import { validateCallbackForm } from "@/lib/validators"; // Import the centralized validator
import { submitCallbackAction } from "@/lib/actions"; // Import the server action

export interface CallbackFormState {
  name: string;
  company: string;
  phoneNumber: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export interface CallbackFormErrors {
  name?: string;
  company?: string;
  phoneNumber?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

interface UseCallbackFormReturn {
  formData: CallbackFormState;
  errors: CallbackFormErrors;
  isSubmitting: boolean;
  submitted: boolean;
  apiError: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  today: string;
}

const initialFormState: CallbackFormState = {
  name: "",
  company: "",
  phoneNumber: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

/**
 * Custom hook for managing the callback request form.
 * Handles state, validation, and API submission.
 */
export function useCallbackForm(): UseCallbackFormReturn {
  const [formData, setFormData] = useState<CallbackFormState>(initialFormState);
  const [errors, setErrors] = useState<CallbackFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const validate = useCallback(() => {
    const validationResult = validateCallbackForm(formData);
    // Additional client-side check for preferredDate against today
    if (formData.preferredDate && formData.preferredDate < today) {
      validationResult.valid = false;
      validationResult.errors.preferredDate = "Date must be today or a future date";
    }
    setErrors(validationResult.errors);
    return validationResult.valid;
  }, [formData, today]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof CallbackFormErrors]) {
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
        const formPayload = new FormData();
        for (const key in formData) {
          formPayload.append(key, (formData as any)[key]);
        }

        const result = await submitCallbackAction(formPayload); // Use the server action
        if (!result.success) {
          // If server-side validation returns errors, update client-side errors
          if (result.errors) setErrors(result.errors);
          throw new Error(result.message || "Failed to submit callback request");
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
    [formData, validate]
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
    today,
  };
}
