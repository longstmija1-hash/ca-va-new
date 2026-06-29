import { BOOKING_URL, assetPath } from "@/lib/site-data";
import { Reveal } from "./Reveal";

export function HeroIntro() {
  return (
    <section className="home" id="home">
      <Reveal className="hero">
        <video
          className="hero-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={assetPath(
            "/assets/photos/eKoFLq_LO7qf6GzBJhM4fE88nTkbWhn9i4owsnEma5QJtE2iNjgUhkgWRl9uzBqKyRSWNnQhrhAd0LJe9o-DHd3I.jpg",
          )}
          aria-hidden="true"
        >
          <source src={assetPath("/assets/hero-video.mp4")} type="video/mp4" />
        </video>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content content-panel">
          <p className="hero-kicker">Екатеринбург · barbershop + beauty</p>
          <h1>Ça Va</h1>
          <p className="hero-meta">Свердлова 62 · м. Уральская</p>
          <a
            className="btn btn-accent"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Записаться
          </a>
        </div>
      </Reveal>

      <Reveal className="intro section">
        <div className="container intro-grid">
          <div className="intro-text content-panel">
            <h2>О нас</h2>
            <p className="intro-lead">
              Ça Va - барбершоп и beauty в одном месте. С французского это «всё
              хорошо» - и именно так мы хотим, чтобы ты уходил от нас.
            </p>
            <p>
              Стрижка, борода, брови, массаж - без суеты и пафоса. Сильные
              мастера, спокойная атмосфера, удобная запись онлайн. Приходи как к
              своим: садись, расслабляйся, выходи в своём лучшем виде.
            </p>
          </div>
          <div className="intro-photo-frame content-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="intro-photo"
              src={assetPath("/assets/gallery/05-salon-wide.png")}
              alt="Интерьер Ça Va - барбершоп и beauty в Екатеринбурге"
              loading="lazy"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
