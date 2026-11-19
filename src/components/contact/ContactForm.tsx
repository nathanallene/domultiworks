"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { COMPANY, INQUIRY_OPTIONS, isInquiryId, type InquiryId } from "@/lib/constants";
import { CONTACT } from "@/lib/content";

/*
 * EmailJS settings (set in .env.local and in the hosting provider's environment variables).
 * See .env.example. Without them the form reports an error instead of pretending to send.
 */
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const inputClass =
  "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/[0.1] dark:bg-white/[0.03]";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  // Links like /?inquiry=free-ai-training#contact preselect the matching option.
  const searchParams = useSearchParams();
  const preselected = searchParams.get("inquiry");
  const [chosen, setChosen] = useState<InquiryId | "" | null>(null);
  const inquiry: InquiryId | "" =
    chosen ?? (isInquiryId(preselected) ? preselected : "");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error("EmailJS is not configured");
      }

      const inquiryLabel =
        INQUIRY_OPTIONS.find((option) => option.id === inquiry)?.label ?? "";

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          reply_to: email,
          company: company || "Not provided",
          inquiry: inquiryLabel,
          message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      // Only reached once EmailJS has accepted the message.
      setStatus("sent");
      setName("");
      setEmail("");
      setCompany("");
      setChosen("");
      setMessage("");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-border/50 bg-card p-6 sm:p-8 dark:border-white/[0.08] dark:bg-white/[0.03]"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
            {CONTACT.form.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            {CONTACT.form.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
          {CONTACT.form.companyLabel}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="inquiry" className="mb-2 block text-sm font-medium text-foreground">
          {CONTACT.form.inquiryLabel}
        </label>
        <select
          id="inquiry"
          name="inquiry"
          required
          value={inquiry}
          onChange={(e) => setChosen(e.target.value as InquiryId | "")}
          className={inputClass}
        >
          <option value="" disabled>
            {CONTACT.form.inquiryPlaceholder}
          </option>
          {INQUIRY_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
          {CONTACT.form.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder={CONTACT.form.messagePlaceholder}
        />
      </div>

      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? CONTACT.form.sending : CONTACT.form.submit}
        <Send className="h-4 w-4" />
      </Button>

      {status === "sent" && (
        <p role="status" className="text-sm text-green-600 dark:text-green-400">
          {CONTACT.form.success}
        </p>
      )}

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {CONTACT.form.error}{" "}
          <a href={`mailto:${COMPANY.email}`} className="underline hover:text-primary">
            {COMPANY.email}
          </a>
        </p>
      )}
    </form>
  );
}
