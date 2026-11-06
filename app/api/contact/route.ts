import { Resend } from "resend";

export const runtime = "nodejs";

type ContactField = "fullName" | "email" | "subject" | "message";
type ContactErrors = Partial<Record<ContactField, string>>;
type ContactPayload = Record<string, unknown>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is ContactPayload {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isConfiguredEmail(value: string): boolean {
  const angleAddress = value.match(/<([^<>]+)>\s*$/)?.[1];
  return emailPattern.test((angleAddress ?? value).trim());
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request): Promise<Response> {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("application/json")) {
    return jsonResponse({ message: "Send the form as JSON." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > 12_000) {
    return jsonResponse({ message: "The message is too large." }, 413);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ message: "The request body must be valid JSON." }, 400);
  }

  if (!isRecord(payload)) {
    return jsonResponse({ message: "The contact form data is invalid." }, 400);
  }

  // Quietly accept honeypot submissions without sending email.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return jsonResponse({ message: "Message received." });
  }

  const fullName = typeof payload.fullName === "string" ? payload.fullName.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const subject = typeof payload.subject === "string" ? payload.subject.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const fieldErrors: ContactErrors = {};

  if (!fullName) fieldErrors.fullName = "Enter your name.";
  else if (fullName.length > 120) fieldErrors.fullName = "Your name must be 120 characters or fewer.";

  if (!email) fieldErrors.email = "Enter your email address.";
  else if (email.length > 254 || !emailPattern.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (!subject) fieldErrors.subject = "Add a subject.";
  else if (subject.length > 160) fieldErrors.subject = "Your subject must be 160 characters or fewer.";

  if (!message) fieldErrors.message = "Write a message.";
  else if (message.length > 8_000) fieldErrors.message = "Your message must be 8,000 characters or fewer.";

  if (Object.keys(fieldErrors).length > 0) {
    return jsonResponse({ message: "Please check the highlighted fields.", fieldErrors }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = process.env.CONTACT_TO_EMAIL?.trim();
  const sender = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !recipient || !sender || !isConfiguredEmail(recipient) || !isConfiguredEmail(sender)) {
    return jsonResponse({ message: "The contact email service is not configured." }, 503);
  }

  try {
    const resend = new Resend(apiKey);
    const safeSubject = subject.replace(/[\r\n]+/g, " ");
    const { error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: email,
      subject: `Portfolio contact: ${safeSubject}`,
      text: [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Subject: ${safeSubject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend contact email failed.", error.name);
      return jsonResponse({ message: "We could not send your message. Please try again." }, 502);
    }

    return jsonResponse({ message: "Message sent." });
  } catch (error) {
    console.error(
      "Resend contact email failed.",
      error instanceof Error ? error.name : "UnknownError",
    );
    return jsonResponse({ message: "We could not send your message. Please try again." }, 502);
  }
}
