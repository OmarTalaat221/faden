"use client";

import { AlertCircle, CheckCircle2, Loader2, Paperclip, X } from "lucide-react";
import { useRef, useState } from "react";

import {
  ACCEPT_ATTRIBUTE,
  ATTACHMENTS_ENABLED,
  attachmentError,
  readableSize,
} from "@/lib/contact/attachment";

// Posts straight to the public submissions endpoint — no auth, and the
// message lands in the dashboard's Contact Inbox.
const API_URL = (
  process.env.NEXT_PUBLIC_FADEN_API_URL || "https://api.faden.digital/api"
).replace(/\/$/, "");

const INITIAL_VALUES = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function validate(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Name must be at least 2 characters";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[+\d\s()-]{8,20}$/.test(values.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!values.subject.trim()) {
    errors.subject = "Subject is required";
  } else if (values.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}

export default function ContactForm({ form }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const clearFile = () => {
    setFile(null);
    setErrors((prev) => ({ ...prev, file: undefined }));
    // The input keeps its own value, so picking the same file again after a
    // removal would not fire a change event without this.
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (e) => {
    const picked = e.target.files?.[0] ?? null;
    if (!picked) return clearFile();

    const problem = attachmentError(picked);
    if (problem) {
      setErrors((prev) => ({ ...prev, file: problem }));
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setErrors((prev) => ({ ...prev, file: undefined }));
    setFile(picked);
    if (status === "success") setStatus("idle");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (status === "success") setStatus("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");

    try {
      // With a file the message goes as multipart, so the two arrive in one
      // request and there is no upload left orphaned when a send fails.
      // Without one it stays JSON, exactly as it always has.
      const res = file
        ? await fetch(`${API_URL}/contact/submissions`, {
            method: "POST",
            body: (() => {
              const data = new FormData();
              Object.entries(values).forEach(([k, v]) => data.append(k, v));
              data.append("attachment", file, file.name);
              return data;
            })(),
          })
        : await fetch(`${API_URL}/contact/submissions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });

      if (!res.ok) throw new Error(`Submission failed (${res.status})`);
      setStatus("success");
      setValues(INITIAL_VALUES);
      clearFile();
      setErrors({});
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const inputBaseClass =
    "w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[var(--foreground)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 sm:text-[15px]";

  const inputClass = (fieldName) =>
    `${inputBaseClass} ${
      errors[fieldName]
        ? "border-red-500 focus:border-red-500"
        : "border-[var(--border)] focus:border-[var(--brand-primary)]"
    }`;

  const labelClass =
    "mb-1.5 block text-sm font-normal text-[var(--foreground)]";

  const errorClass = "mt-1 text-xs text-red-600";

  return (
    <div className="h-full">
      <h2 className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl md:text-[26px] lg:text-[32px]">
        {form.title}
      </h2>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 space-y-4 md:mt-7"
      >
        {/* Full Name + Email — 2 columns on md+ */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              {form.fields.fullName.label}
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              disabled={status === "loading"}
              autoComplete="name"
              className={inputClass("fullName")}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
            />
            {errors.fullName && (
              <p id="fullName-error" className={errorClass}>
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              {form.fields.email.label}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              disabled={status === "loading"}
              autoComplete="email"
              className={inputClass("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className={errorClass}>
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className={labelClass}>
            {form.fields.phone.label}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            disabled={status === "loading"}
            autoComplete="tel"
            className={inputClass("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className={errorClass}>
              {errors.phone}
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className={labelClass}>
            {form.fields.subject.label}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={values.subject}
            onChange={handleChange}
            disabled={status === "loading"}
            className={inputClass("subject")}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          />
          {errors.subject && (
            <p id="subject-error" className={errorClass}>
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClass}>
            {form.fields.message.label}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange}
            disabled={status === "loading"}
            className={`${inputClass("message")} resize-y`}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className={errorClass}>
              {errors.message}
            </p>
          )}
        </div>

        {/* Attachment. Optional, so it is a quiet row rather than a field
            with a label the same weight as the required ones. */}
        {ATTACHMENTS_ENABLED && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              id="attachment"
              accept={ACCEPT_ATTRIBUTE}
              onChange={handleFileChange}
              disabled={status === "loading"}
              className="sr-only"
            />

            {file ? (
              <div className="flex items-center gap-3 rounded-md border border-[var(--border)] bg-white px-3.5 py-2.5">
                <Paperclip className="h-4 w-4 shrink-0 text-[var(--brand-primary)]" />
                <span className="min-w-0 flex-1 truncate text-sm text-[var(--foreground)]">
                  {file.name}
                </span>
                <span className="shrink-0 text-xs text-[var(--muted-foreground)]">
                  {readableSize(file.size)}
                </span>
                <button
                  type="button"
                  onClick={clearFile}
                  disabled={status === "loading"}
                  aria-label={`Remove ${file.name}`}
                  className="shrink-0 rounded p-1 text-[var(--muted-foreground)] transition-colors hover:text-[var(--brand-primary)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="attachment"
                className="inline-flex cursor-pointer items-center gap-2 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--brand-primary)]"
              >
                <Paperclip className="h-4 w-4" />
                <span>
                  Attach a photo or a drawing
                  <span className="text-[var(--muted-foreground)]">
                    {" "}
                    (optional, up to 10 MB)
                  </span>
                </span>
              </label>
            )}

            {errors.file && <p className={errorClass}>{errors.file}</p>}
          </div>
        )}

        {/* Status messages */}
        {status === "success" && (
          <div
            role="status"
            className="flex items-start gap-2 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{form.successMessage}</span>
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{form.errorMessage}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--brand-primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:text-[15px]"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            form.submitLabel
          )}
        </button>
      </form>
    </div>
  );
}
