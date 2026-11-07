// DEMO — the vision & mission records carry no icon field yet, so the icon is
// guessed from the card's own title. The moment the API starts sending an
// `icon` key, it wins and this is only the fallback for a title it has not
// been set on.
//
// Keys are the ones src/components/common/content-icon.jsx can draw.

const KEYWORD_ICONS = [
  [/vision|future|lead/i, "eye"],
  [/mission|purpose of|direction/i, "compass"],
  [/purpose|innovat|growth/i, "sparkles"],
  // Team before culture: "Teamwork Culture" is about the team.
  [/team|people|workforce|staff|collaborat/i, "users"],
  [/culture|integrity|value/i, "heart"],
  [/quality|premium|craft/i, "gem"],
  [/time|deadline|delivery|schedule/i, "clock"],
  [/satisf|client|customer|support/i, "smile"],
  [/improve|continuous|develop|progress/i, "trending-up"],
  [/service|professional|expert/i, "badge-check"],
  [/safe|secure|protect|compliance/i, "shield-check"],
  [/sustain|environment|green/i, "leaf"],
  [/partner/i, "handshake"],
  [/award|excellence|certif/i, "award"],
  [/goal|target|objective/i, "target"],
];

/** The icon a card should draw: the one it carries, else one read off its title. */
export function iconForTitle(title, explicit) {
  if (explicit) return explicit;
  const text = String(title ?? "");
  for (const [pattern, icon] of KEYWORD_ICONS) {
    if (pattern.test(text)) return icon;
  }
  return "lightbulb";
}
