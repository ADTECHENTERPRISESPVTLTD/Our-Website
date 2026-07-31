"use client";

import { useState, useCallback } from "react";
import { submitRequirementAction } from "@/lib/actions";
import { validateRequirementForm } from "@/lib/validators";

export interface RequirementFormState {
  companyName: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  businessType: string;
  projectRequirement: string;
  budget: string;
  timeline: string;
}

export interface RequirementFormErrors {
  companyName?: string;
  contactPerson?: string;
  email?: string;
  phoneNumber?: string;
  businessType?: string;
  projectRequirement?: string;
  budget?: string;
  timeline?: string;
}

interface UseRequirementReturn {
  formData: RequirementFormState;
  errors: RequirementFormErrors;
  isSubmitting: boolean;
  submitted: boolean;
  apiError: string;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const initialFormState: RequirementFormState = {
  companyName: "",
  contactPerson: "",
  email: "",
  phoneNumber: "",
  businessType: "",
  projectRequirement: "",
  budget: "",
  timeline: "",
};

/**
 * Custom hook for managing the requirement submission form.
 * Handles state, validation, and API submission.
 */
export function useRequirement(): UseRequirementReturn {
  const [formData, setFormData] =
    useState<RequirementFormState>(initialFormState);
  const [errors, setErrors] = useState<RequirementFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = useCallback((): boolean => {
    const validationResult = validateRequirementForm(formData);
    setErrors(validationResult.errors);
    return validationResult.valid;
  }, [formData]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof RequirementFormErrors]) {
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

        const result = await submitRequirementAction(formPayload);
        if (!result.success) {
          if (result.errors) setErrors(result.errors);
          throw new Error(result.message || "Failed to submit requirement");
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
    [formData, validate],
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
