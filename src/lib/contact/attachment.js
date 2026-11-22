// What the contact form will accept as an attachment, and whether it may
// offer one at all.
//
// The switch is off until the API can take a file. Today
// POST /api/contact/submissions accepts five named fields and drops anything
// else, and the only upload endpoint needs a dashboard token, which a public
// page cannot be given. A control that silently discards a visitor's drawing
// is worse than no control, so until the endpoint exists the field is not
// drawn. See docs/BACKEND-REQUESTS.md.
//
// Turn it on with NEXT_PUBLIC_CONTACT_ATTACHMENTS=1 in the same deploy that
// ships the API change.

export const ATTACHMENTS_ENABLED =
  process.env.NEXT_PUBLIC_CONTACT_ATTACHMENTS === "1";

/** Ten megabytes. Anything a visitor sends from a phone fits inside it. */
export const MAX_BYTES = 10 * 1024 * 1024;

export const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
];

export const ACCEPT_ATTRIBUTE = ".jpg,.jpeg,.png,.webp,.heic,.heif,.pdf";

/** A size a person can read, rather than a count of bytes. */
export function readableSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Why this file cannot be sent, or nothing when it can. */
export function attachmentError(file) {
  if (!file) return null;
  if (file.size > MAX_BYTES) {
    return `That file is ${readableSize(file.size)}. The limit is ${readableSize(MAX_BYTES)}.`;
  }
  // Some browsers report no type for HEIC, so the extension is the fallback.
  const byExtension = /\.(jpe?g|png|webp|heic|heif|pdf)$/i.test(file.name);
  if (!ACCEPTED_TYPES.includes(file.type) && !byExtension) {
    return "Attach a photo or a PDF.";
  }
  return null;
}
