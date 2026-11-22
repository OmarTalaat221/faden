// The news page: a dated piece of writing with one picture, nothing more.
//
// The API does not serve /news yet, so every read here is optional and a 404
// answers null rather than throwing. Null means "the store is not built",
// which the page turns into a 404 of its own; an empty array means "built,
// and nobody has written anything", which is an empty state. They are
// different things and the pages treat them differently.
//
// Delete the optional reads once the endpoint ships — see
// docs/BACKEND-REQUESTS.md section 11.

import DOMPurify from "isomorphic-dompurify";

import { apiGetOptional } from "@/lib/api";

/** Newest first. Null when the endpoint does not exist yet. */
export async function getNewsList() {
  const items = await apiGetOptional("/news");
  if (!Array.isArray(items)) return items === null ? null : [];

  // Sorted here as well as on the server: the order a reader sees is the
  // point of a news page, and it should not depend on which one of the two
  // was deployed last.
  return [...items].sort(
    (a, b) => publishedAt(b).getTime() - publishedAt(a).getTime(),
  );
}

/** One article by its web address. Null when there is no such article. */
export async function getNewsItem(slug) {
  return apiGetOptional(`/news/${encodeURIComponent(slug)}`);
}

/** The banner and intro copy at the top of the page. */
export async function getNewsPageMeta() {
  return (await apiGetOptional("/news/meta")) ?? {};
}

/** The date to show and sort by: the one that was set, else when it was made. */
export function publishedAt(item) {
  const value = item?.date || item?.createdAt;
  const parsed = value ? new Date(value) : null;
  return parsed && !Number.isNaN(parsed.getTime()) ? parsed : new Date(0);
}

/**
 * The date as a reader sees it.
 *
 * The locale and the time zone are both fixed. Left to the machine, the
 * server would format in one and the browser in another, and React would
 * throw a hydration mismatch on a date that merely looked fine.
 */
export function formatNewsDate(item) {
  const date = publishedAt(item);
  if (date.getTime() === 0) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

const ARTICLE_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "li",
  "blockquote",
  "hr",
  "a",
  "code",
  "pre",
];

const HTML_TAG = /<\/?(p|h[1-6]|ul|ol|li|blockquote|br|strong|em|a)\b/i;
const BLANK_LINE = /\n\s*\n/;
const NEWLINE = /\n/g;

/**
 * The body, ready to render.
 *
 * It is written in the dashboard with a rich-text editor, so it arrives as
 * HTML. It is sanitised here rather than trusted: the editor is the only
 * thing meant to write this field, but the field is a string in a database,
 * and anything that can set a string can set a `<script>`. The allow-list
 * above is the editor's own toolbar and nothing beyond it.
 *
 * Anything written before the editor existed is plain text with blank lines
 * between paragraphs, so that still renders — each block becomes a `<p>`.
 */
export function toArticleHtml(body) {
  const text = String(body || "").trim();
  if (!text) return "";

  const html = HTML_TAG.test(text)
    ? text
    : text
        .split(BLANK_LINE)
        .map((block) => block.trim())
        .filter(Boolean)
        .map(
          (block) => `<p>${escapeHtml(block).replace(NEWLINE, "<br />")}</p>`,
        )
        .join("");

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ARTICLE_TAGS,
    // No target: whether a link opens a new tab is a decision for the design,
    // not something a writer sets per link by accident.
    ALLOWED_ATTR: ["href"],
  });
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
