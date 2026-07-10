/* eslint-disable */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

type GalleryImage = {
  src: string;
  alt: string;
};

type GallerySection = {
  id: string;
  title: string;
  subtitle: string;
  images: GalleryImage[];
};

type GalleryVideo = {
  src: string;
};

const gallerySections: GallerySection[] = [
  {
    id: "food",
    title: "Food",
    subtitle: "Signature plates, snacks, mains, desserts, and late-night cravings.",
    images: [
      { src: "/gallery/gallerynewf1.webp", alt: "Food at Sharrazz Cafe" },
      { src: "/gallery/gallerynewf2.webp", alt: "Food platter at Sharrazz Cafe" },
      { src: "/gallery/gallerynewf3.webp", alt: "Cafe food at Sharrazz" },
      { src: "/gallery/gallerynewf4.webp", alt: "Sharrazz Cafe dish" },
      { src: "/gallery/gallerynewf5.webp", alt: "Food item at Sharrazz Cafe" },
      { src: "/gallery/gallerynewf6.webp", alt: "Sharrazz Cafe food presentation" },
      { src: "/gallery/gallerynewf10.webp", alt: "Special food at Sharrazz Cafe" },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    subtitle: "Mocktails, shakes, coffees, and refreshing rooftop sips.",
    images: [
      { src: "/gallery/gallerynewd1.webp", alt: "Drink at Sharrazz Cafe" },
      { src: "/gallery/gallerynewd2.webp", alt: "Mocktail at Sharrazz Cafe" },
      { src: "/gallery/gallerynewd3.webp", alt: "Beverage at Sharrazz Cafe" },
      { src: "/gallery/gallerynewd4.webp", alt: "Cafe drink at Sharrazz" },
      { src: "/gallery/gallerynewd5.webp", alt: "Refreshing drink at Sharrazz Cafe" },
    ],
  },
  {
    id: "interior",
    title: "Interior",
    subtitle: "Aesthetic corners, cozy seating, and the Sharrazz vibe.",
    images: [
      { src: "/gallery/gallerynew1.webp", alt: "Interior of Sharrazz Cafe" },
      { src: "/gallery/gallerynew2.webp", alt: "Seating area at Sharrazz Cafe" },
      { src: "/gallery/gallerynew3.webp", alt: "Cafe interior at Sharrazz" },
      { src: "/gallery/gallerynew4.webp", alt: "Sharrazz Cafe ambience" },
      { src: "/gallery/gallerynew5.webp", alt: "Indoor seating at Sharrazz Cafe" },
    ],
  },
  {
    id: "rooftop",
    title: "Rooftop",
    subtitle: "Open-sky dining, evening lights, and rooftop memories.",
    images: [
      { src: "/gallery/gallerynewr1.webp", alt: "Rooftop view at Sharrazz Cafe" },
      { src: "/gallery/gallerynewr2.webp", alt: "Sharrazz Cafe rooftop seating" },
      { src: "/gallery/gallerynewr3.webp", alt: "Rooftop dining at Sharrazz Cafe" },
      { src: "/gallery/gallerynewr4.webp", alt: "Evening rooftop at Sharrazz Cafe" },
      { src: "/gallery/gallerynewr5.webp", alt: "Rooftop ambience at Sharrazz Cafe" },
      { src: "/gallery/gallerynewr6.webp", alt: "Open-air rooftop at Sharrazz Cafe" },
    ],
  },
  {
    id: "videos",
    title: "Videos",
    subtitle: "Rooftop moments, ambience clips, food shots, and Sharrazz memories in motion.",
    images: [],
  },
];

const galleryVideos: GalleryVideo[] = [
  { src: "/gallery/gallerynewv1.mp4" },
  { src: "/gallery/gallerynewv2.mp4" },
  { src: "/gallery/gallerynewv3.mp4" },
  { src: "/gallery/gallerynewv4.mp4" },
];

function VideosGrid() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="videos"
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        {galleryVideos.map((video, index) => (
          <motion.div
            key={video.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: (index % 2) * 0.08 }}
            className="relative aspect-video overflow-hidden rounded-2xl bg-black border border-primary/10 shadow-[0_10px_35px_rgba(0,0,0,0.55)] hover:border-primary/40 hover:shadow-[0_0_35px_rgba(255,45,133,0.22)] transition-all duration-500"
          >
            <video
              src={video.src}
              controls
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Gallery() {
  const [activeSectionId, setActiveSectionId] = useState("food");
  const [lightbox, setLightbox] = useState<number | null>(null);
const [activeVideo, setActiveVideo] = useState<string | null>(null);
const [mounted, setMounted] = useState(false);

  const activeSection = useMemo(() => {
    return gallerySections.find((section) => section.id === activeSectionId) ?? gallerySections[0];
  }, [activeSectionId]);

  const activeImages = activeSection.images;

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeLightbox = () => {
    setLightbox(null);
  };

  const navigateLightbox = useCallback(
    (dir: number) => {
      if (lightbox === null || activeImages.length === 0) return;

      setLightbox((prev) => {
        if (prev === null) return null;
        return (prev + dir + activeImages.length) % activeImages.length;
      });
    },
    [lightbox, activeImages.length]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightbox === null) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, navigateLightbox]);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightbox]);

  return (
    <main className="pt-32 aura-bg text-foreground min-h-screen relative overflow-hidden">
      <style>{`
        @keyframes auraBreath {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 50% 100%; }
        }

        .aura-bg {
          background-color: transparent;
          background-image:
            radial-gradient(circle at 15% 50%, rgba(255, 45, 133, 0.15), transparent 50%),
            radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.15), transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(212, 175, 55, 0.1), transparent 60%);
          background-attachment: fixed;
          background-size: 200% 200%;
          animation: auraBreath 12s ease-in-out infinite alternate;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <section className="px-4 text-center mb-8 relative z-10">
        <SectionReveal>
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary tracking-[0.15em] mb-4 drop-shadow-[0_0_15px_rgba(255,45,133,0.5)]">
              THE GALLERY
            </h1>

            <p className="text-muted-foreground text-xs md:text-sm tracking-[0.4em] uppercase font-bold drop-shadow-md">
              Food. Drinks. Interior. Rooftop. Videos.
            </p>

            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8 shadow-[0_0_10px_rgba(255,45,133,0.8)]" />
          </motion.div>
        </SectionReveal>
      </section>

      <nav className="sticky top-20 z-[80] px-4 py-4 bg-[#0f050a]/70 backdrop-blur-xl border-y border-primary/10">
        <div className="max-w-5xl mx-auto flex gap-3 overflow-x-auto hide-scrollbar justify-start md:justify-center">
          {gallerySections.map((section) => {
            const isActive = activeSectionId === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  setActiveSectionId(section.id);
                  setLightbox(null);
                }}
                className={`shrink-0 px-5 py-3 rounded-full border text-[10px] uppercase tracking-[0.25em] transition-all duration-300 ${
                  isActive
                    ? "bg-primary/25 text-white border-primary shadow-[0_0_20px_rgba(255,45,133,0.45)]"
                    : "border-primary/20 text-primary hover:bg-primary/15 hover:text-white"
                }`}
              >
                {section.title}
              </button>
            );
          })}
        </div>
      </nav>

      <section className="relative px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="mb-10 text-center">
              <p className="text-primary text-xs tracking-[0.45em] uppercase mb-3">
                Sharrazz Collection
              </p>

              <h2 className="font-serif text-4xl md:text-6xl text-white tracking-widest mb-4">
                {activeSection.title}
              </h2>

              <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                {activeSection.subtitle}
              </p>

              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8 shadow-[0_0_10px_rgba(255,45,133,0.8)]" />
            </div>
          </SectionReveal>

          {activeSectionId === "videos" ? (
            <VideosGrid />
          ) : activeImages.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection.id}
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {activeImages.map((image, index) => (
                  <motion.button
                    key={image.src}
                    type="button"
                    onClick={() => setLightbox(index)}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0f050a] border border-primary/10 shadow-[0_10px_35px_rgba(0,0,0,0.55)] hover:border-primary/40 hover:shadow-[0_0_35px_rgba(255,45,133,0.22)] transition-all duration-500"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      quality={95}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain bg-[#0f050a] p-2 transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f050a]/60 via-transparent to-transparent opacity-50 group-hover:opacity-15 transition-opacity duration-500" />

                    <div className="absolute left-5 bottom-5 right-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
                        View Image
                      </p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="min-h-[260px] flex items-center justify-center rounded-2xl border border-primary/15 bg-[#0f050a]/70 text-center px-6">
              <div>
                <p className="font-serif text-3xl text-primary mb-3">Videos Coming Soon</p>
                <p className="text-muted-foreground text-sm tracking-widest uppercase">
                  Add video files later and we will connect them here.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {mounted &&
        lightbox !== null &&
        activeImages[lightbox] &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key="lightbox-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-[#0f050a]/98 backdrop-blur-2xl flex flex-col items-center justify-center"
              onClick={closeLightbox}
            >
              <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
                <span className="font-serif text-primary tracking-[0.3em] text-xs uppercase font-bold drop-shadow-[0_0_8px_rgba(255,45,133,0.5)]">
                  SHARRAZZ CAFE ARCHIVES
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                  }}
                  className="text-white/50 hover:text-primary hover:drop-shadow-[0_0_10px_rgba(255,45,133,0.8)] transition-all duration-300 p-2 hover:rotate-90 transform"
                  aria-label="Close gallery image"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(-1);
                }}
                className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary hover:drop-shadow-[0_0_10px_rgba(255,45,133,0.8)] transition-all duration-300 p-4 z-50 hover:-translate-x-2 transform"
                aria-label="Previous gallery image"
              >
                <ChevronLeft className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1} />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(1);
                }}
                className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary hover:drop-shadow-[0_0_10px_rgba(255,45,133,0.8)] transition-all duration-300 p-4 z-50 hover:translate-x-2 transform"
                aria-label="Next gallery image"
              >
                <ChevronRight className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1} />
              </button>

              <div className="relative w-full max-w-6xl h-full flex items-center justify-center p-4 md:p-12">
                <motion.div
                  key={lightbox}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full h-full max-h-[85vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={activeImages[lightbox].src}
                    alt={activeImages[lightbox].alt}
                    fill
                    quality={100}
                    sizes="100vw"
                    className="object-contain rounded-sm shadow-[0_0_50px_rgba(255,45,133,0.15)]"
                  />
                </motion.div>
              </div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
                <span className="font-serif text-primary tracking-[0.4em] text-sm flex items-center gap-3 drop-shadow-[0_0_8px_rgba(255,45,133,0.5)]">
                  {String(lightbox + 1).padStart(2, "0")}
                  <span className="w-8 h-[1px] bg-primary/40 shadow-[0_0_5px_rgba(255,45,133,0.5)]" />
                  {String(activeImages.length).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
              {mounted &&
        activeVideo &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key="video-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-[#0f050a]/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
              onClick={() => setActiveVideo(null)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveVideo(null);
                }}
                className="absolute top-6 right-6 text-white/50 hover:text-primary hover:drop-shadow-[0_0_10px_rgba(255,45,133,0.8)] transition-all duration-300 p-2 hover:rotate-90 transform z-50"
                aria-label="Close video"
              >
                <X className="w-8 h-8" />
              </button>

              <motion.div
                initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full max-w-6xl max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src={activeVideo}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  className="w-full max-h-[85vh] object-contain rounded-2xl bg-black shadow-[0_0_50px_rgba(255,45,133,0.18)]"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </main>
  );
}