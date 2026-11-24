// The news page: a dated piece of writing with one picture, nothing more.
//
// There are two possible stores and this file picks between them on every
// read. The API is preferred; while it answers 404 — it has no news table
// yet — the stories come from src/content/news.js in this repo instead.
//
// That means the day the endpoint ships, the site switches to it with no
// code change and nothing to remember. The local file is then dead and can
// be deleted. See docs/BACKEND-REQUESTS.md section 11.
//
// The catch, and it is the whole reason this is a stopgap: nothing in the
// local file is editable from the dashboard. Until the API has the table,
// a new story is a code change and a deploy.

// sanitize-html, not DOMPurify. DOMPurify needs a DOM, so on the server it
// pulls in jsdom — four megabytes of it — and importing this module brought
// the whole homepage down on Vercel while every page that did not touch news
// kept working. This one is a parser, not a DOM, and runs the same in Node
// and in the browser.
import sanitizeHtml from "sanitize-html";
import { cache } from "react";

import { apiGetOptional } from "@/lib/api";
import { LOCAL_NEWS, LOCAL_NEWS_META } from "@/content/news";

/**
 * Every story, newest first. The API's if it has them, this repo's if not.
 *
 * Cached for the render: the article page reads the list as well as the
 * story, and the homepage band reads it too.
 */
export const getNewsList = cache(async () => {
  const items = await apiGetOptional("/news");
  const list = Array.isArray(items) ? items : LOCAL_NEWS;

  // Sorted here as well as on the server. The order a reader sees is the
  // point of a news page, and it should not depend on which of the two
  // stores answered.
  return [...list].sort(
    (a, b) => publishedAt(b).getTime() - publishedAt(a).getTime(),
  );
});

/**
 * One story by its web address. Null when there is no such story.
 *
 * The direct read is tried first so a live API stays the single source of
 * truth; falling back to the list covers the local store, and also means a
 * slug that no longer exists answers null rather than coming back from a
 * file the API has replaced.
 */
export async function getNewsItem(slug) {
  const direct = await apiGetOptional(`/news/${encodeURIComponent(slug)}`);
  if (direct) return direct;

  const list = await getNewsList();
  return list.find((item) => item.slug === slug) ?? null;
}

/** The banner and contact copy at the top of the page. */
export async function getNewsPageMeta() {
  return (await apiGetOptional("/news/meta")) ?? LOCAL_NEWS_META;
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

  return sanitizeHtml(html, {
    allowedTags: ARTICLE_TAGS,
    // No target: whether a link opens a new tab is a decision for the design,
    // not something a writer sets per link by accident.
    allowedAttributes: { a: ["href"] },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    // A relative href is how the client links to another page of their own
    // site, so it has to survive the scheme check.
    allowProtocolRelative: false,
  });
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
