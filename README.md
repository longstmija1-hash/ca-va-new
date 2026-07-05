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
npm run build:site
```

Для локальной разработки достаточно `npm run build` — отзывы подтянутся в CI перед деплоем.

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
