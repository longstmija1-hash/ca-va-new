import { BOOKING_URL, SOCIAL } from "@/lib/site-data";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a
          className="logo-wrap"
          href="#home"
          aria-label="Ça Va - haircuts & beauty, на главную"
        >
          <Logo />
        </a>
        <p>© 2026 Ça Va · Екатеринбург</p>
        <div className="socials">
          <a href={SOCIAL.vk} target="_blank" rel="noopener noreferrer">
            ВК
          </a>
          <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

export function MobileStickyCta() {
  return (
    <div className="mobile-sticky-cta" aria-label="Быстрая запись">
      <a
        className="btn btn-accent"
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Записаться
      </a>
    </div>
  );
}
