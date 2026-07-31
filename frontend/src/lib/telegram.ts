/**
 * Telegram Notification Service
 * Sends well-formatted HTML notifications to a specified Telegram Chat using the Telegram Bot API.
 */

interface TelegramNotificationData {
  title?: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  message: string;
  additionalDetails?: Record<string, string>;
}

// Set to true to print verbose Telegram API request/response logs in the console
const DEBUG = false;

/**
 * Escapes characters that are special in HTML to prevent Telegram parsing errors or injection.
 */
function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Sends a notification message to the configured Telegram chat.
 * Fails gracefully and logs errors without crashing the request.
 */
export async function sendTelegramNotification(data: TelegramNotificationData): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (DEBUG) {
    console.log("[Telegram Service] [DEBUG] Loaded env variables:");
    console.log(`  TELEGRAM_BOT_TOKEN: ${botToken ? `${botToken.substring(0, 6)}...${botToken.substring(botToken.length - 4)}` : "MISSING"}`);
    console.log(`  TELEGRAM_CHAT_ID: ${chatId ? chatId : "MISSING"}`);
  }

  if (!botToken || !chatId) {
    console.warn(
      "[Telegram Service] Warning: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing from environment variables. Skipping notification."
    );
    return false;
  }

  // HTML escape values
  const title = escapeHtml(data.title || "🚀 New Website Inquiry");
  const name = escapeHtml(data.name);
  const email = data.email ? escapeHtml(data.email) : null;
  const phone = data.phone ? escapeHtml(data.phone) : null;
  const company = data.company ? escapeHtml(data.company) : null;
  const message = escapeHtml(data.message);
  
  // Server timestamp
  const serverTimestamp = escapeHtml(new Date().toLocaleString());

  // Construct message using supported Telegram HTML tags
  let text = `<b>${title}</b>\n\n`;
  text += `👤 <b>Name:</b>\n${name}\n`;
  
  if (email) {
    text += `\n📧 <b>Email:</b>\n${email}\n`;
  }
  
  if (phone) {
    text += `\n📱 <b>Phone:</b>\n${phone}\n`;
  }
  
  if (company) {
    text += `\n🏢 <b>Company:</b>\n${company}\n`;
  }
  
  text += `\n💬 <b>Message:</b>\n${message}\n`;

  if (data.additionalDetails) {
    text += `\n📋 <b>Details:</b>\n`;
    for (const [key, value] of Object.entries(data.additionalDetails)) {
      if (value) {
        text += `• ${escapeHtml(key)}: ${escapeHtml(value)}\n`;
      }
    }
  }
  
  text += `\n🕒 <b>Time:</b>\n${serverTimestamp}`;

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    if (DEBUG) {
      console.log("[Telegram Service] [DEBUG] Sending request to Telegram API...");
      console.log(`  URL: ${url}`);
      console.log(`  Payload text:\n${text}`);
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
      }),
    });

    const responseBody = await response.text().catch(() => "");

    if (DEBUG) {
      console.log("[Telegram Service] [DEBUG] Telegram API response received:");
      console.log(`  Status Code: ${response.status}`);
      console.log(`  Status Text: ${response.statusText}`);
      console.log(`  Body: ${responseBody}`);
    }

    if (!response.ok) {
      console.error(
        `[Telegram Service] Error response from Telegram API: ${response.status} ${response.statusText} - ${responseBody}`
      );
      return false;
    }

    return true;
  } catch (error: any) {
    console.error("[Telegram Service] Network or unexpected error sending Telegram notification:", error);
    return false;
  }
}
