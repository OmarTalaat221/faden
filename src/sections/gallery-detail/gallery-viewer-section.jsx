"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import Container from "@/components/layout/container";
import DecorativePattern from "@/components/common/decorative-pattern";
import { GALLERY_LIST } from "@/lib/gallery/data";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const mainImageVariants = {
  enter: ({ direction, reducedMotion }) => {
    if (reducedMotion) return { opacity: 0 };
    return { x: direction > 0 ? 28 : -28, scale: 0.995, opacity: 0 };
  },
  center: { x: 0, scale: 1, opacity: 1 },
  exit: ({ direction, reducedMotion }) => {
    if (reducedMotion) return { opacity: 0 };
    return { x: direction > 0 ? -20 : 20, scale: 1.005, opacity: 0 };
  },
};

function findGalleryIndex(id) {
  const index = GALLERY_LIST.findIndex(
    (item) => String(item.id) === String(id),
  );
  return index >= 0 ? index : 0;
}

function getNavigationDirection(fromIndex, toIndex, total) {
  const forwardDistance = (toIndex - fromIndex + total) % total;
  const backwardDistance = (fromIndex - toIndex + total) % total;
  return forwardDistance <= backwardDistance ? 1 : -1;
}

function isModifiedClick(event) {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

export default function GalleryViewerSection() {
  const shouldReduceMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const total = GALLERY_LIST.length;

  // Read image ID from search params
  const currentIdFromUrl = searchParams.get("image");
  const currentPageFromUrl = searchParams.get("page");

  const initialIndex = useMemo(
    () => findGalleryIndex(currentIdFromUrl),
    [], // Only on mount — LOCAL state takes over after
  );

  const wrapperRef = useRef(null);
  const selectedIndexRef = useRef(initialIndex);
  const displayedIndexRef = useRef(initialIndex);
  const stripInitializedRef = useRef(false);

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [displayedIndex, setDisplayedIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(1);

  const [measurements, setMeasurements] = useState({
    wrapperWidth: 0,
    thumbWidth: 0,
    gap: 0,
    ready: false,
  });

  const stripX = useMotionValue(0);

  const displayedItem = GALLERY_LIST[displayedIndex] || GALLERY_LIST[0];
  const selectedItem = GALLERY_LIST[selectedIndex] || GALLERY_LIST[0];
  const pendingItem = selectedIndex !== displayedIndex ? selectedItem : null;

  const previousIndex = (selectedIndex - 1 + total) % total;
  const nextIndex = (selectedIndex + 1) % total;
  const previousItem = GALLERY_LIST[previousIndex];
  const nextItem = GALLERY_LIST[nextIndex];

  const animationCustom = useMemo(
    () => ({ direction, reducedMotion: Boolean(shouldReduceMotion) }),
    [direction, shouldReduceMotion],
  );

  const mainImageTransition = useMemo(() => {
    if (shouldReduceMotion) return { duration: 0.12 };
    return {
      x: { type: "spring", stiffness: 420, damping: 42, mass: 0.6 },
      scale: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.24, ease: "easeOut" },
    };
  }, [shouldReduceMotion]);

  // Update URL SILENTLY using router.replace (no scroll, no re-render)
  const updateUrl = useCallback(
    (imageId) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("image", String(imageId));
      // Use replace + scroll:false — DOESN'T unmount component
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const selectImage = useCallback(
    (targetIndex, forcedDirection, updateHistory = true) => {
      if (
        targetIndex < 0 ||
        targetIndex >= total ||
        targetIndex === selectedIndexRef.current
      ) {
        return;
      }

      const fromIndex = selectedIndexRef.current;
      const nextDirection =
        forcedDirection ??
        getNavigationDirection(fromIndex, targetIndex, total);

      selectedIndexRef.current = targetIndex;
      setDirection(nextDirection);
      setSelectedIndex(targetIndex);

      if (updateHistory) {
        updateUrl(GALLERY_LIST[targetIndex].id);
      }
    },
    [total, updateUrl],
  );

  const goPrevious = useCallback(() => {
    selectImage(previousIndex, -1);
  }, [previousIndex, selectImage]);

  const goNext = useCallback(() => {
    selectImage(nextIndex, 1);
  }, [nextIndex, selectImage]);

  const handleNavigationClick = useCallback(
    (event, targetIndex, forcedDirection) => {
      if (isModifiedClick(event)) return;
      event.preventDefault();
      selectImage(targetIndex, forcedDirection, true);
    },
    [selectImage],
  );

  const handlePendingImageLoad = useCallback(
    async (event, targetIndex) => {
      const imageElement = event.currentTarget;
      try {
        if (typeof imageElement.decode === "function") {
          await imageElement.decode();
        }
      } catch {}

      if (selectedIndexRef.current !== targetIndex) return;

      requestAnimationFrame(() => {
        if (selectedIndexRef.current !== targetIndex) return;
        displayedIndexRef.current = targetIndex;
        setDisplayedIndex(targetIndex);
      });
    },
    [],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrevious]);

  // Close viewer → back to grid
  const handleClose = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("image");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  // Measurements
  useIsoLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    let animationFrameId;

    const measure = () => {
      const strip = wrapper.querySelector("[data-gallery-strip]");
      const firstThumbnail = wrapper.querySelector("[data-gallery-thumbnail]");
      if (!strip || !firstThumbnail) return;

      const wrapperWidth = wrapper.getBoundingClientRect().width;
      const thumbWidth = firstThumbnail.getBoundingClientRect().width;
      const computedStyles = window.getComputedStyle(strip);
      const gap =
        Number.parseFloat(computedStyles.columnGap || computedStyles.gap) || 0;

      setMeasurements((previous) => {
        if (
          previous.wrapperWidth === wrapperWidth &&
          previous.thumbWidth === thumbWidth &&
          previous.gap === gap &&
          previous.ready
        ) {
          return previous;
        }
        return { wrapperWidth, thumbWidth, gap, ready: true };
      });
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(measure);
    };

    measure();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleMeasure)
        : null;

    resizeObserver?.observe(wrapper);
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, []);

  const translateX = useMemo(() => {
    const { wrapperWidth, thumbWidth, gap, ready } = measurements;
    if (!ready || wrapperWidth === 0 || thumbWidth === 0) return 0;
    const fullThumbWidth = thumbWidth + gap;
    const centeredPosition = wrapperWidth / 2 - thumbWidth / 2;
    return centeredPosition - selectedIndex * fullThumbWidth;
  }, [measurements, selectedIndex]);

  useEffect(() => {
    if (!measurements.ready) return undefined;

    if (!stripInitializedRef.current) {
      stripX.set(translateX);
      stripInitializedRef.current = true;
      return undefined;
    }

    const controls = animate(
      stripX,
      translateX,
      shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 430, damping: 46, mass: 0.7 },
    );

    return () => controls.stop();
  }, [measurements.ready, shouldReduceMotion, stripX, translateX]);

  if (!displayedItem || total === 0) return null;

  return (
    <section className="relative overflow-hidden py-10 sm:py-14 md:py-16">
      <DecorativePattern
        variant="trianglesOutlined"
        className="right-0 top-4 h-auto w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px]"
      />

      <DecorativePattern
        variant="trianglesOutlined"
        className="bottom-16 left-0 h-auto w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px]"
      />

      <Container className="relative z-10">
        {/* Close button - back to grid */}
        <div className="mx-auto mb-4 flex max-w-4xl justify-end">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close viewer and return to gallery"
            className="group flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-[var(--muted-foreground)] transition hover:bg-[var(--muted)] hover:text-[var(--brand-primary)]"
          >
            <X size={18} />
            <span className="text-xs font-medium uppercase tracking-wide">
              Close
            </span>
          </button>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-[var(--muted)] sm:aspect-[16/9]">
            <div
              className="pointer-events-none absolute inset-0 opacity-0"
              aria-hidden="true"
            >
              {pendingItem && (
                <Image
                  key={`pending-${pendingItem.id}`}
                  src={pendingItem.src}
                  alt=""
                  fill
                  quality={90}
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 900px"
                  onLoad={(event) =>
                    handlePendingImageLoad(event, selectedIndex)
                  }
                />
              )}
            </div>

            <div
              className="pointer-events-none absolute inset-0 opacity-0"
              aria-hidden="true"
            >
              <Image
                src={previousItem.src}
                alt=""
                fill
                quality={90}
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
              <Image
                src={nextItem.src}
                alt=""
                fill
                quality={90}
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>

            <AnimatePresence
              initial={false}
              mode="sync"
              custom={animationCustom}
            >
              <motion.div
                key={displayedItem.id}
                custom={animationCustom}
                variants={mainImageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={mainImageTransition}
                className="absolute inset-0"
                style={{ willChange: "transform, opacity" }}
              >
                <Image
                  src={displayedItem.src}
                  alt={displayedItem.alt}
                  fill
                  priority={displayedIndex === initialIndex}
                  quality={90}
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <Link
            href={`?image=${previousItem.id}`}
            scroll={false}
            aria-label="Previous image"
            onClick={(event) =>
              handleNavigationClick(event, previousIndex, -1)
            }
            className="group absolute left-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[var(--foreground)] shadow-md ring-1 ring-black/5 backdrop-blur-sm transition-[transform,background-color,color,box-shadow] duration-300 hover:scale-110 hover:bg-white hover:text-[var(--brand-primary)] hover:shadow-lg active:scale-95 sm:left-4 sm:size-11 md:-left-5 md:size-12"
          >
            <ChevronLeft
              size={22}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
          </Link>

          <Link
            href={`?image=${nextItem.id}`}
            scroll={false}
            aria-label="Next image"
            onClick={(event) => handleNavigationClick(event, nextIndex, 1)}
            className="group absolute right-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[var(--foreground)] shadow-md ring-1 ring-black/5 backdrop-blur-sm transition-[transform,background-color,color,box-shadow] duration-300 hover:scale-110 hover:bg-white hover:text-[var(--brand-primary)] hover:shadow-lg active:scale-95 sm:right-4 sm:size-11 md:-right-5 md:size-12"
          >
            <ChevronRight
              size={22}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div
          ref={wrapperRef}
          className="mx-auto mt-6 max-w-4xl overflow-hidden py-3 sm:mt-8"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <motion.div
            data-gallery-strip
            className="flex w-max items-center gap-2 sm:gap-3"
            style={{
              x: stripX,
              opacity: measurements.ready ? 1 : 0,
              willChange: "transform",
            }}
          >
            {GALLERY_LIST.map((thumbnail, index) => {
              const isActive = index === selectedIndex;

              return (
                <Link
                  key={thumbnail.id}
                  data-gallery-thumbnail
                  href={`?image=${thumbnail.id}`}
                  scroll={false}
                  aria-label={`Go to ${thumbnail.alt}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(event) => handleNavigationClick(event, index)}
                  className="group relative aspect-[4/3] w-14 shrink-0 rounded sm:w-20 md:w-24 lg:w-28"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isActive ? 1.055 : 1,
                      opacity: isActive ? 1 : 0.5,
                    }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 500,
                            damping: 42,
                            mass: 0.55,
                          }
                    }
                    className="absolute inset-0 overflow-hidden rounded"
                    style={{ willChange: "transform, opacity" }}
                  >
                    <Image
                      src={thumbnail.src}
                      alt={thumbnail.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 60px, (max-width: 1024px) 96px, 112px"
                    />
                  </motion.div>

                  <motion.span
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.94,
                    }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 520,
                            damping: 40,
                            mass: 0.5,
                          }
                    }
                    className="pointer-events-none absolute -inset-1 z-20 rounded-[6px] ring-2 ring-[var(--brand-primary)] ring-offset-2 ring-offset-white"
                  />
                </Link>
              );
            })}
          </motion.div>
        </div>

        <p className="mt-4 flex items-center justify-center text-xs text-[var(--muted-foreground)] sm:text-sm">
          <span className="relative inline-flex min-w-5 justify-center overflow-hidden font-semibold text-[var(--brand-primary)]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={displayedItem.id}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { y: direction > 0 ? 8 : -8, opacity: 0 }
                }
                animate={{ y: 0, opacity: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { y: direction > 0 ? -8 : 8, opacity: 0 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0.1 : 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {String(displayedIndex + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </span>

          <span className="mx-1 opacity-50">/</span>
          <span>{String(total).padStart(2, "0")}</span>
        </p>
      </Container>
    </section>
  );
}