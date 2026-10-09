// What the homepage shows, driven by the "Home Page Features" picks made in
// the admin dashboard.
//
// GET /home-features stores only an ordered list of ids per section — the
// content itself lives in the Gallery / Projects / Services / Clients /
// Equipment records, so the ids are resolved against those here.

import { apiGet } from "@/lib/api";
import { getGalleryList } from "@/lib/gallery/data";
import { getProjects } from "@/lib/projects/data";
import { getAllServices } from "@/lib/services/data";
import { getClientsList } from "@/lib/clients/data";
import { getEquipmentList } from "@/lib/equipment/data";

/**
 * Picks `ids` out of `rows`, in the order they were chosen. Any id with no
 * matching row is reported — that means the dashboard points at something
 * that no longer exists.
 */
function pick(section, rows, ids) {
  if (!Array.isArray(ids)) {
    console.warn(`[home] "${section}" has no picks in /home-features`);
    return [];
  }
  const byId = new Map(rows.map((r) => [String(r.id), r]));
  const missing = ids.filter((id) => !byId.has(String(id)));
  if (missing.length) {
    console.warn(
      `[home] "${section}": ${missing.length}/${ids.length} picked ids do not exist -> ${missing.join(", ")}`,
    );
  }
  const picked = ids.map((id) => byId.get(String(id))).filter(Boolean);
  console.log(`[home] "${section}": ${picked.length} of ${rows.length} rows picked`);
  return picked;
}

export async function getHomeContent() {
  const [features, gallery, projects, servicesResponse, clients, equipment] =
    await Promise.all([
      apiGet("/home-features"),
      getGalleryList(),
      getProjects(),
      getAllServices(),
      getClientsList(),
      getEquipmentList(),
    ]);

  const services = servicesResponse?.items ?? [];

  // Each section is reshaped to the props its component already expects, so
  // the components themselves stay as they are.
  return {
    gallery: pick("gallery", gallery, features.gallery),

    projects: pick("projects", projects, features.projects).map((p) => ({
      id: p.id,
      title: p.title,
      category: p.service?.name ?? "",
      image: p.img,
    })),

    services: pick("services", services, features.services).map((s) => ({
      id: s.id,
      title: s.name,
      image: s.img,
    })),

    clients: pick("clients", clients, features.clients).map((c) => ({
      id: c.id,
      name: c.name,
      logo: c.logo,
    })),

    equipment: pick("equipment", equipment, features.equipment).map((e) => ({
      id: e.id,
      name: e.name,
    })),
  };
}
