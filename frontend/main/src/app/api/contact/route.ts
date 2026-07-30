export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Forward the request to the Express backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { success: false, message: data.message || "Failed to submit contact form" },
        { status: response.status }
      );
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
  return Response.json({ success: true, message: "Contact API is running." });
}

