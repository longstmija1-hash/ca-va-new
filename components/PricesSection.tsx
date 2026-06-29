"use client";

import { useCallback, useEffect, useState } from "react";
import { BOOKING_URL, PRICE_TABS } from "@/lib/site-data";
import { Reveal } from "./Reveal";

type TabId = (typeof PRICE_TABS)[number]["id"];

export function PricesSection() {
  const [activeTab, setActiveTab] = useState<TabId>("haircuts");

  const activateTab = useCallback((tabId: TabId) => {
    setActiveTab(tabId);
  }, []);

  useEffect(() => {
    const syncTabWithHash = () => {
      if (window.location.hash === "#massage") {
        setActiveTab("massage");
        document.getElementById("prices")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    syncTabWithHash();
    window.addEventListener("hashchange", syncTabWithHash);
    return () => window.removeEventListener("hashchange", syncTabWithHash);
  }, []);

  return (
    <Reveal>
      <section className="services section" id="prices">
        <div className="container content-panel content-panel--wide">
          <h2>Прайс</h2>
          <p className="section-lead">
            Актуальные цены. Запись - онлайн или по телефону.
          </p>
          <div className="services-tabs" role="tablist" aria-label="Категории услуг">
            {PRICE_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`services-tab${isActive ? " is-active" : ""}`}
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  type="button"
                  onClick={() => activateTab(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {PRICE_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <article
                key={tab.id}
                className={`service-group${isActive ? " is-active" : ""}`}
                id={`panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${tab.id}`}
                hidden={!isActive}
              >
                <h3>{tab.title}</h3>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Услуга</th>
                        <th>Время</th>
                        <th>Цена</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tab.rows.map((row) => (
                        <tr key={`${tab.id}-${row.service}-${row.time}`}>
                          <td>{row.service}</td>
                          <td>{row.time}</td>
                          <td>{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            );
          })}

          <div className="services-cta-wrap">
            <a
              className="btn btn-accent"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Записаться онлайн
            </a>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
