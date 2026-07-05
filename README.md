# Ça Va — сайт-визитка

Одностраничный лендинг барбершопа + beauty в Екатеринбурге. Собран на **Next.js** (App Router, static export).

## Запуск локально

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Сборка

```bash
npm run build
```

Статика попадает в папку `out/`. Деплой на GitHub Pages с доменом **ca-va.online** — без base path.

Если нужна сборка в подпапку (например `/ca-va-new` на github.io):

```bash
NEXT_PUBLIC_BASE_PATH=/ca-va-new npm run build
```

## Структура

- `app/` — страницы и глобальные стили
- `components/` — секции сайта
- `lib/site-data.ts` — контент (команда, отзывы, прайс)
- `public/assets/` — фото, видео, логотип

## Онлайн-запись

[YClients](https://n1332782.yclients.com/)
