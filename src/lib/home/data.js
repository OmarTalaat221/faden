// What the homepage shows, driven by the "Home Page Features" picks made in
// the admin dashboard: that endpoint stores an ordered list of ids per
// section, which are resolved here against the real Gallery / Projects /
// Services / Clients / Equipment records.
//
// Every section falls back to the hardcoded copy in
// src/sections/home/data.js if the API is unreachable or a pick is missing,
// so the homepage always renders something sensible.

import { apiGet } from "@/lib/api";
import { getGalleryList } from "@/lib/gallery/data";
import { getProjects } from "@/lib/projects/data";
import { getAllServices } from "@/lib/services/data";
import { getClientsList } from "@/lib/clients/data";
import { getEquipmentList } from "@/lib/equipment/data";
import {
  clients as CLIENTS_FALLBACK,
  equipment as EQUIPMENT_FALLBACK,
  projects as PROJECTS_FALLBACK,
  services as SERVICES_FALLBACK,
} from "@/sections/home/data";

const GALLERY_FALLBACK = [
  { id: "g1", src: "/images/faden/gallery-1.webp", alt: "Luxury FADEN project entrance" },
  { id: "g2", src: "/images/faden/gallery-2.webp", alt: "Modern FADEN villa" },
  { id: "g3", src: "/images/faden/gallery-3.webp", alt: "FADEN landscaped courtyard" },
  { id: "g4", src: "/images/faden/gallery-4.webp", alt: "FADEN completed palace" },
];

/** Picks `ids` out of `rows` in the order they were chosen. */
function pick(rows, ids) {
  if (!Array.isArray(ids) || ids.length === 0) return [];
  const byId = new Map(rows.map((r) => [String(r.id), r]));
  return ids.map((id) => byId.get(String(id))).filter(Boolean);
}

/** Uses the picks when they resolve to anything, the old copy otherwise. */
function orFallback(picked, fallback) {
  return picked.length > 0 ? picked : fallback;
}

export async function getHomeContent() {
  const [features, gallery, projects, servicesResponse, clients, equipment] =
    await Promise.all([
      apiGet("/home-features", {}),
      getGalleryList(),
      getProjects(),
      getAllServices(),
      getClientsList(),
      getEquipmentList(),
    ]);

  const services = servicesResponse?.items ?? [];

  return {
    gallery: orFallback(pick(gallery, features.gallery), GALLERY_FALLBACK),

    // Each section below is reshaped to the props its component already
    // expects, so the components themselves stay as they are.
    projects: orFallback(
      pick(projects, features.projects).map((p) => ({
        id: p.id,
        title: p.title,
        category: p.service?.name ?? "",
        image: p.img,
      })),
      PROJECTS_FALLBACK,
    ),

    services: orFallback(
      pick(services, features.services).map((s) => ({
        id: s.id,
        title: s.name,
        image: s.img,
      })),
      SERVICES_FALLBACK,
    ),

    clients: orFallback(
      pick(clients, features.clients).map((c) => ({
        id: c.id,
        name: c.name,
        logo: c.logo,
      })),
      CLIENTS_FALLBACK,
    ),

    equipment: orFallback(
      pick(equipment, features.equipment).map((e) => ({ id: e.id, name: e.name })),
      EQUIPMENT_FALLBACK,
    ),
  };
}
