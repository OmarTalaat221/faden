import {
  Award,
  Building2,
  Globe,
  Handshake,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Target,
  Users,
  Wrench,
} from "lucide-react";

// An icon picked in the dashboard arrives as a string key — a component
// cannot be stored in the database. These are the keys the dashboard's icon
// picker offers, plus the three the contact page uses. Add to both lists
// together, or the dashboard will offer an icon this cannot draw.
const ICONS = {
  wrench: Wrench,
  leaf: Leaf,
  users: Users,
  globe: Globe,
  "shield-check": ShieldCheck,
  building: Building2,
  award: Award,
  handshake: Handshake,
  target: Target,
  heart: Heart,
  "map-pin": MapPin,
  mail: Mail,
  phone: Phone,
};

export default function ContentIcon({ name, ...props }) {
  const Icon = ICONS[name];

  if (!Icon) {
    // Draws nothing rather than an invisible unknown element, and says which
    // key is missing instead of failing silently.
    console.warn(`[icon] no icon named "${name}"`);
    return null;
  }

  return <Icon {...props} />;
}
