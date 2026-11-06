"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site";

type ContactField = "fullName" | "email" | "subject" | "message";
type ContactErrors = Partial<Record<ContactField, string>>;
type IconName = "mail" | "linkedin" | "github" | "location";

function ContactIcon({ name }: { name: IconName }) {
  const common = {
    "aria-hidden": true as const,
    className: "contact-icon-svg",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
    viewBox: "0 0 24 24",
  };

  if (name === "mail") {
    return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
  }

  if (name === "linkedin") {
    return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7m0-10h.01M12 17v-4a3 3 0 0 1 6 0v4m-6-7v7" /></svg>;
  }

  if (name === "github") {
    return <svg {...common}><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.46-1.17-1.11-1.48-1.11-1.48-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.02 1.59 1.02 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.67.92.67 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>;
  }

  return <svg {...common}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}

function validateContact(values: Record<ContactField, string>): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.fullName.trim()) errors.fullName = "Enter your name.";
  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.subject.trim()) errors.subject = "Add a subject.";
  if (!values.message.trim()) errors.message = "Write a message.";
  return errors;
}

export function ContactSection() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values: Record<ContactField, string> = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };
    const nextErrors = validateContact(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFormMessage("Please correct the highlighted fields and try again.");
      return;
    }

    setErrors({});
    setSubmitting(true);
    setFormMessage("Preparing your email…");

    const subject = encodeURIComponent(values.subject.trim());
    const body = encodeURIComponent(
      `Name: ${values.fullName.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`,
    );

    await new Promise((resolve) => window.setTimeout(resolve, 250));

    try {
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setFormMessage("Your email app should open with your message ready. Review it there and press Send.");
      setSubmitting(false);
    } catch {
      setSubmitting(false);
      setFormMessage("We couldn’t open your email app. Please use the email link to contact Muhammad Ali directly.");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopyMessage("Email address copied.");
    } catch {
      setCopyMessage("Copy isn’t available here. Select the email address to copy it.");
    }
  }

  const errorFor = (field: ContactField) => errors[field];

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="shell contact-layout">
        <div className="contact-intro">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Let’s <span className="accent-text">Connect.</span></h2>
          <p className="contact-copy">
            I’m always open to discussing data analytics, AI-powered applications, backend development
            opportunities, and interesting collaborations. Feel free to reach out!
          </p>

          <div className="contact-details" aria-label="Contact information">
            <div className="contact-detail">
              <span className="contact-icon"><ContactIcon name="mail" /></span>
              <div className="contact-detail-copy">
                <span className="contact-detail-label">Email</span>
                <a className="contact-detail-value" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </div>
              <button className="copy-email-button" type="button" onClick={copyEmail} aria-label="Copy email address">
                {copyMessage === "Email address copied." ? "Copied" : "Copy"}
              </button>
            </div>

            <a className="contact-detail contact-detail-link" href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <span className="contact-icon"><ContactIcon name="linkedin" /></span>
              <span className="contact-detail-copy"><span className="contact-detail-label">LinkedIn</span><span className="contact-detail-value">Connect professionally</span></span>
              <span className="contact-detail-arrow" aria-hidden="true">↗</span>
            </a>

            <a className="contact-detail contact-detail-link" href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">
              <span className="contact-icon"><ContactIcon name="github" /></span>
              <span className="contact-detail-copy"><span className="contact-detail-label">GitHub</span><span className="contact-detail-value">Explore my projects</span></span>
              <span className="contact-detail-arrow" aria-hidden="true">↗</span>
            </a>

            <div className="contact-detail">
              <span className="contact-icon"><ContactIcon name="location" /></span>
              <span className="contact-detail-copy"><span className="contact-detail-label">Location</span><span className="contact-detail-value">Karachi, Pakistan</span></span>
            </div>
          </div>
          <p className="copy-status" role="status" aria-live="polite">{copyMessage}</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-form-heading">
            <p className="eyebrow">Send a message</p>
            <p>Tell me a little about what’s on your mind.</p>
          </div>

          <div className="contact-fields-grid">
            <div className="form-field">
              <label htmlFor="contact-name">Full name <span aria-hidden="true">*</span></label>
              <input id="contact-name" name="fullName" type="text" autoComplete="name" required aria-invalid={Boolean(errorFor("fullName"))} aria-describedby={errorFor("fullName") ? "contact-name-error" : undefined} />
              {errorFor("fullName") ? <p className="field-error" id="contact-name-error">{errorFor("fullName")}</p> : null}
            </div>

            <div className="form-field">
              <label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errorFor("email"))} aria-describedby={errorFor("email") ? "contact-email-error" : undefined} />
              {errorFor("email") ? <p className="field-error" id="contact-email-error">{errorFor("email")}</p> : null}
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="contact-subject">Subject <span aria-hidden="true">*</span></label>
              <input id="contact-subject" name="subject" type="text" required aria-invalid={Boolean(errorFor("subject"))} aria-describedby={errorFor("subject") ? "contact-subject-error" : undefined} />
              {errorFor("subject") ? <p className="field-error" id="contact-subject-error">{errorFor("subject")}</p> : null}
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label>
              <textarea id="contact-message" name="message" rows={5} required aria-invalid={Boolean(errorFor("message"))} aria-describedby={errorFor("message") ? "contact-message-error" : undefined} />
              {errorFor("message") ? <p className="field-error" id="contact-message-error">{errorFor("message")}</p> : null}
            </div>
          </div>

          <div className="contact-form-footer">
            <button className="button button-primary contact-submit" type="submit" disabled={submitting}>
              {submitting ? "Preparing email…" : "Open email app"}
              <span aria-hidden="true">{submitting ? "…" : "↗"}</span>
            </button>
            <p className="mailto-note">Your message opens in your email app for you to review and send.</p>
          </div>
          <p className={`form-status${formMessage.startsWith("Please") || formMessage.startsWith("We couldn’t") ? " form-status-error" : ""}`} role={formMessage.startsWith("Please") || formMessage.startsWith("We couldn’t") ? "alert" : "status"} aria-live="polite">{formMessage}</p>
        </form>
      </div>
    </section>
  );
}
