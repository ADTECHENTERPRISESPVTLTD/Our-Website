"use client";

import { useState, useCallback } from "react";
import {
  requirementService,
  RequirementFormData,
} from "@/services/requirement.service";

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
    const newErrors: RequirementFormErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "Contact person name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (
      formData.phoneNumber.trim().replace(/\D/g, "").length < 10
    ) {
      newErrors.phoneNumber = "Phone number must have at least 10 digits";
    }

    if (!formData.businessType.trim()) {
      newErrors.businessType = "Business type is required";
    }

    if (!formData.projectRequirement.trim()) {
      newErrors.projectRequirement = "Project requirement description is required";
    } else if (formData.projectRequirement.trim().length < 20) {
      newErrors.projectRequirement =
        "Please provide a detailed description (at least 20 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        const data: RequirementFormData = {
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          businessType: formData.businessType,
          projectRequirement: formData.projectRequirement,
          budget: formData.budget,
          timeline: formData.timeline,
        };

        await requirementService.create(data);
        setSubmitted(true);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
        setApiError(message);
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
  };
}

