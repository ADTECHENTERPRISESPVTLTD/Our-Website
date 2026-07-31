// Callback API Service
import { post, get } from "./api";

export interface CallbackFormData {
  name: string;
  company: string;
  phoneNumber: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export interface Callback extends CallbackFormData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export const callbackService = {
  /**
   * Submit a new callback request via local Next.js API route to trigger Telegram notification
   */
  create(data: CallbackFormData) {
    return fetch("/api/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to submit callback request");
      }
      return result;
    });
  },

  /**
   * Get all callback requests (admin)
   */
  getAll() {
    return get<Callback[]>("/callback");
  },
};

