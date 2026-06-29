"use client";

import { useCallback, useEffect, useState } from "react";
import { TEAM, assetPath } from "@/lib/site-data";
import { Reveal } from "./Reveal";

export function TeamSection() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const toggleFlip = useCallback((name: string) => {
    setFlipped((prev) => ({ ...prev, [name]: !prev[name] }));
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent, name: string) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleFlip(name);
      }
    },
    [toggleFlip],
  );

  return (
    <Reveal>
      <section className="team section" id="team">
        <div className="container">
          <h2>Команда</h2>
          <p className="section-lead">
            Нажмите на карточку, чтобы узнать о мастере чуть больше.
          </p>
          <div className="team-grid" role="list">
            {TEAM.map((member) => (
              <article
                key={member.name}
                className={`team-card${flipped[member.name] ? " is-flipped" : ""}`}
                role="listitem"
                tabIndex={0}
                aria-pressed={flipped[member.name] ?? false}
                aria-label={`Карточка мастера: ${member.name}`}
                onClick={() => toggleFlip(member.name)}
                onKeyDown={(e) => onKeyDown(e, member.name)}
              >
                <div className="team-card-inner">
                  <div className="team-card-face team-card-front">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assetPath(member.image)}
                      alt={`Мастер ${member.name}`}
                      loading="lazy"
                    />
                    <div className="team-card-front-info">
                      <h3>{member.name}</h3>
                      <p>{member.role}</p>
                    </div>
                    <span className="team-card-flip-hint" aria-hidden="true">
                      Подробнее
                    </span>
                  </div>
                  <div className="team-card-face team-card-back">
                    <h3>{member.name}</h3>
                    <p className="team-card-role">{member.roleBack}</p>
                    <p className="team-card-bio">{member.bio}</p>
                    <span className="team-card-flip-hint" aria-hidden="true">
                      Назад
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
