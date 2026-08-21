export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Forward the request to the Express backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
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

    return Response.json(data, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return Response.json(
      { success: false, message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ success: true, message: "Callback API is running." });
}
