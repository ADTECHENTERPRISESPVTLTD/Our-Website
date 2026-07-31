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
   * Submit a new callback request
   */
  create(data: CallbackFormData) {
    return post<Callback>("/callback", data);
  },

  /**
   * Get all callback requests (admin)
   */
  getAll() {
    return get<Callback[]>("/callback");
  },
};

