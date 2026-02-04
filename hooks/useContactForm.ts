import type { FormEvent } from "react";
import { useState } from "react";
import { toast } from "sonner";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface UseContactFormReturn {
  formState: FormState;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submittedName: string;
  updateField: (field: keyof FormState, value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  reset: () => void;
}

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateForm(formState: FormState): boolean {
  if (!formState.name.trim()) {
    toast.error("Please enter your name");
    return false;
  }

  if (!formState.email.trim()) {
    toast.error("Please enter your email");
    return false;
  }

  if (!isValidEmail(formState.email)) {
    toast.error("Please enter a valid email address");
    return false;
  }

  if (!formState.message.trim()) {
    toast.error("Please enter a message");
    return false;
  }

  return true;
}

export function useContactForm(): UseContactFormReturn {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setIsSubmitted(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return;

    if (!validateForm(formState)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const nextSubmittedName = formState.name;
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSubmitted(true);
      setSubmittedName(nextSubmittedName);
      setFormState(initialState);
      toast.success("Message sent. I'll get back to you soon.");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setIsSubmitted(false);
    setSubmittedName("");
  };

  return {
    formState,
    isSubmitting,
    isSubmitted,
    submittedName,
    updateField,
    handleSubmit,
    reset,
  };
}
