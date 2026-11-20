"use client";

import PageBannerView from "@/components/common/page-banner-view";
import ClientsGridSection from "@/sections/clients/clients-grid-section";
import ClientsIntroSection from "@/sections/clients/intro-section";
import EquipmentIntroSection from "@/sections/equipment/intro-section";
import GalleryGridSection from "@/sections/gallery/gallery-grid-section";
import GalleryIntroSection from "@/sections/gallery/intro-section";
import HeavyEquipmentSection from "@/sections/equipment/heavy-equipment-section";
import PreviewBadge from "@/sections/preview/preview-badge";
import useDraft from "@/sections/preview/use-draft";

/**
 * The three pages that are a heading and a grid of records: the gallery, the
 * client logos and the equipment.
 *
 * One component rather than three routes' worth of near-identical files. The
 * dashboard posts { items } while someone edits the table, and { meta } when
 * they open the page-settings drawer, so either can arrive on its own and the
 * other keeps what it had.
 */
export default function ListPreviewClient({ kind, items, meta }) {
  const draft = useDraft(null);

  const list = draft?.items ?? items ?? [];
  const pageMeta = draft?.meta ?? meta ?? {};

  return (
    <main className="min-h-screen">
      <PreviewBadge />

      {pageMeta.banner && <PageBannerView {...pageMeta.banner} />}

      {kind === "gallery" && (
        <>
          <GalleryIntroSection galleryMeta={pageMeta} />
          <GalleryGridSection galleryList={list} galleryMeta={pageMeta} />
        </>
      )}

      {kind === "clients" && (
        <>
          <ClientsIntroSection intro={pageMeta.intro} />
          <ClientsGridSection clients={list} />
        </>
      )}

      {kind === "equipment" && (
        <>
          <EquipmentIntroSection intro={pageMeta.intro} />
          <HeavyEquipmentSection equipment={list} heavy={pageMeta.heavy} />
        </>
      )}
    </main>
  );
}
