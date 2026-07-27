"use client";

import { useState, useCallback } from "react";
import { callbackService, CallbackFormData } from "@/services/callback.service";

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

  const validate = useCallback((): boolean => {
    const newErrors: CallbackFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    } else if (formData.phoneNumber.trim().replace(/\D/g, "").length < 10) {
      newErrors.phoneNumber = "Phone number must have at least 10 digits";
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Preferred date is required";
    } else if (formData.preferredDate < today) {
      newErrors.preferredDate = "Date must be today or a future date";
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = "Preferred time is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        const data: CallbackFormData = {
          name: formData.name,
          company: formData.company,
          phoneNumber: formData.phoneNumber,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          message: formData.message,
        };

        await callbackService.create(data);
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

