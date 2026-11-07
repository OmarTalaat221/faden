"use client";

import { useEffect } from "react";

/**
 * Every mention of the partner on the site is normalised to "Global Energy SAE"
 * and turned into a link to their site.
 *
 * It runs over the DOM rather than over the content itself because the copy
 * arrives from the API, so there is no single place to patch: a mention can
 * appear in any field of any record. A MutationObserver keeps it applied to
 * anything rendered later (client navigation, modals, reveal animations).
 */

const PARTNER_URL = "https://globalenergy-eg.com/";

// "Global Energy", optionally followed by the long legal name or by SAE, and
// optionally possessive. Case-insensitive, and tolerant of the spacing and of
// "&" vs "and". The longest alternative has to come first so the regex does not
// stop at the short form and leave " for Investment & Industry" behind.
const MENTION =
  /global[\s\u00A0]+energy(?:[\s\u00A0]+for[\s\u00A0]+investment[\s\u00A0]*(?:&|and)[\s\u00A0]*industry|[\s\u00A0]+s\.?a\.?e\.?|[\s\u00A0]+sae)?(['\u2019]s)?/gi;

const CANONICAL = "Global Energy SAE";

// Nowhere a link may be injected: inside another link, inside code or form
// controls, or inside our own output.
const SKIP = new Set([
  "A",
  // Controls: a link inside one would navigate instead of toggling it.
  "BUTTON",
  "LABEL",
  "SUMMARY",
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "TEXTAREA",
  "INPUT",
  "SELECT",
  "OPTION",
  "CODE",
  "PRE",
  "SVG",
]);

const MARK = "data-global-energy";

function isUpper(text) {
  return text === text.toUpperCase() && text !== text.toLowerCase();
}

function makeLink(matched, possessive) {
  const a = document.createElement("a");
  a.href = PARTNER_URL;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.setAttribute(MARK, "");
  a.className =
    "font-semibold text-[var(--brand-primary)] underline decoration-[var(--brand-primary)]/40 underline-offset-2 transition-colors hover:decoration-[var(--brand-primary)]";
  // An all-caps mention sits in an eyebrow or a heading that is capitalised in
  // the copy itself, so the replacement matches it instead of breaking the line.
  a.textContent =
    (isUpper(matched) ? CANONICAL.toUpperCase() : CANONICAL) +
    (possessive || "");
  return a;
}

function skipped(node) {
  for (let el = node.parentElement; el; el = el.parentElement) {
    if (SKIP.has(el.tagName)) return true;
    if (el.hasAttribute?.(MARK)) return true;
  }
  return false;
}

function linkify(root) {
  if (!root || !root.ownerDocument) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || node.nodeValue.length < 13) {
        return NodeFilter.FILTER_REJECT;
      }
      MENTION.lastIndex = 0;
      if (!MENTION.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      return skipped(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });

  const targets = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) targets.push(n);

  for (const node of targets) {
    const text = node.nodeValue;
    const fragment = document.createDocumentFragment();
    let last = 0;
    MENTION.lastIndex = 0;

    for (let m = MENTION.exec(text); m; m = MENTION.exec(text)) {
      if (m.index > last) {
        fragment.appendChild(
          document.createTextNode(text.slice(last, m.index)),
        );
      }
      fragment.appendChild(makeLink(m[0], m[1]));
      last = m.index + m[0].length;
    }

    if (last < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(last)));
    }
    node.parentNode?.replaceChild(fragment, node);
  }
}

export default function GlobalEnergyLinks() {
  useEffect(() => {
    let frame = 0;
    const run = () => {
      frame = 0;
      linkify(document.body);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };

    schedule();

    // Batched through a frame so a burst of mutations costs one pass, and so a
    // pass never reacts to the nodes it has just inserted.
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
