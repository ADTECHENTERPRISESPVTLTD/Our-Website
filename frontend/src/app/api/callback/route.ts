import { sendTelegramNotification } from "@/lib/telegram";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Forward the request to the Express backend
    let backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    // Normalize backendUrl in case it ends with '/api' or '/api/'
    backendUrl = backendUrl.replace(/\/api\/?$/, "");

    const response = await fetch(`${backendUrl}/api/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { success: false, message: data.message || "Failed to submit callback request" },
        { status: response.status }
      );
    }

    // Trigger Telegram notification after successful database save
    try {
      await sendTelegramNotification({
        title: "📞 New Callback Request",
        name: body.name,
        company: body.company,
        phone: body.phoneNumber,
        message: body.message,
        additionalDetails: {
          "Preferred Date": body.preferredDate,
          "Preferred Time": body.preferredTime,
        },
      });
    } catch (telegramError) {
      console.error("[Callback API] Telegram notification failed:", telegramError);
    }

    return Response.json(data, { status: 201 });
  } catch (error: any) {
    return Response.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ success: true, message: "Callback API is running." });
}


