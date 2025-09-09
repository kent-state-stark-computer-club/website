import { NextRequest } from "next/server";

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (!email || !message) {
      return new Response("Missing fields", { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !to) {
      return new Response("Email not configured", { status: 500 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: [to],
        subject: `Website contact from ${email}`,
        html: `<p><strong>From:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(
          message
        )}</p>`,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return new Response(`Email send failed: ${text}`, { status: 502 });
    }

    // Redirect back with a success flag
    return new Response(null, {
      status: 303,
      headers: { Location: `/?contact=sent` },
    });
  } catch (_err) {
    return new Response("Server error", { status: 500 });
  }
}
