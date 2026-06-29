"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BOOKING_URL,
  NAV_LINKS,
  PHONE,
  PHONE_HREF,
  SOCIAL,
} from "@/lib/site-data";
import { Logo } from "./Logo";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);

  useEffect(() => {
    document.body.classList.toggle("lightbox-open", menuOpen);
    document.body.classList.toggle("mobile-menu-open", menuOpen);
    return () => {
      document.body.classList.remove("lightbox-open", "mobile-menu-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header className="site-header" id="top">
        <div className="header-bg" aria-hidden="true">
          <span className="header-bg-pattern" />
          <span className="header-bg-scrim" />
        </div>
        <a
          className="logo-wrap"
          href="#home"
          aria-label="Ça Va - haircuts & beauty, на главную"
        >
          <Logo />
        </a>
        <nav className="site-nav" aria-label="Основная навигация">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a
          className="header-phone"
          href={PHONE_HREF}
          aria-label="Позвонить в Ça Va"
        >
          {PHONE}
        </a>
        <a
          className="btn btn-accent header-cta"
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Записаться
        </a>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label="Открыть меню"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          onClick={openMenu}
        >
          <span className="menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </header>

      <div
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top">
            <a
              className="logo-wrap"
              href="#home"
              aria-label="Ça Va - haircuts & beauty, на главную"
              onClick={closeMenu}
            >
              <Logo />
            </a>
            <button
              className="mobile-menu-close"
              type="button"
              aria-label="Закрыть меню"
              onClick={closeMenu}
            >
              <span className="close-icon" aria-hidden="true" />
            </button>
          </div>
          <nav className="mobile-menu-nav" aria-label="Мобильная навигация">
            {NAV_LINKS.map((link, index) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                <span className="mm-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="mm-label">{link.label}</span>
                <span className="mm-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </nav>
          <div className="mobile-menu-footer">
            <div className="mobile-menu-info">
              <span className="mobile-menu-eyebrow">Адрес</span>
              <p>Екатеринбург, ул. Свердлова, 62</p>
              <p>5 минут от м. Уральская</p>
            </div>
            <div className="mobile-menu-socials">
              <a href={SOCIAL.vk} target="_blank" rel="noopener noreferrer">
                ВКонтакте
              </a>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
          <div className="mobile-menu-bottom">
            <a className="mobile-menu-phone" href={PHONE_HREF}>
              {PHONE}
            </a>
            <a
              className="btn btn-accent"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Записаться
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
