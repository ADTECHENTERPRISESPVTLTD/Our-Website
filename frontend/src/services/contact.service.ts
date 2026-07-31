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
   * Submit a contact form message
   */
  send(data: ContactFormData) {
    return post<Contact>("/contact", data);
  },
};

