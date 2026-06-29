"use client";

import { useCallback, useEffect, useState } from "react";
import { GALLERY, assetPath } from "@/lib/site-data";
import { Reveal } from "./Reveal";

export function GallerySection() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const current = GALLERY[activeIndex];

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    setOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setOpen(false), []);

  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length);
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % GALLERY.length);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("lightbox-open", open);
    return () => document.body.classList.remove("lightbox-open");
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeLightbox, showPrev, showNext]);

  const onKeyDownItem = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(index);
    }
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) < 45) return;
    if (deltaX > 0) showPrev();
    else showNext();
  };

  return (
    <>
      <Reveal>
        <section className="gallery section" id="gallery">
          <div className="container">
            <h2>Галерея</h2>
            <p className="section-lead">
              Кадры из зала, работа мастеров и атмосфера Ça Va.
            </p>
            <div className="gallery-grid">
              {GALLERY.map((item, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={item.src}
                  src={assetPath(item.src)}
                  alt={item.alt}
                  loading="lazy"
                  className="gallery-item"
                  tabIndex={0}
                  onClick={() => openLightbox(index)}
                  onKeyDown={(e) => onKeyDownItem(e, index)}
                />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <div
        className={`lightbox${open ? " is-open" : ""}`}
        id="gallery-lightbox"
        aria-hidden={!open}
      >
        <div
          className="lightbox-backdrop"
          onClick={closeLightbox}
          aria-hidden="true"
        />
        <button
          className="lightbox-close"
          type="button"
          aria-label="Закрыть"
          onClick={closeLightbox}
        >
          ×
        </button>
        <button
          className="lightbox-nav lightbox-prev"
          type="button"
          aria-label="Предыдущее фото"
          onClick={showPrev}
        >
          ‹
        </button>
        <figure className="lightbox-content">
          {current && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={assetPath(current.src)}
              alt={current.alt}
              className="lightbox-image"
              onTouchStart={(e) => setTouchStartX(e.changedTouches[0].clientX)}
              onTouchEnd={onTouchEnd}
            />
          )}
          <p className="lightbox-hint">Свайпайте влево/вправо</p>
          <figcaption className="lightbox-caption">{current?.alt}</figcaption>
        </figure>
        <button
          className="lightbox-nav lightbox-next"
          type="button"
          aria-label="Следующее фото"
          onClick={showNext}
        >
          ›
        </button>
      </div>
    </>
  );
}
