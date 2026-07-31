// Contact API Service
import { post } from "./api";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Contact extends ContactFormData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export const contactService = {
  /**
   * Submit a contact form message via local Next.js API route to trigger Telegram notification
   */
  send(data: ContactFormData) {
    return fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to submit contact form");
      }
      return result;
    });
  },
};


