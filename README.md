# Lộ trình tập 75 → 70kg

Next.js (App Router) — trang lộ trình tập với dây kháng lực, xà ngang, tạ 3kg, dây nhảy.

## Chạy local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Build production

```bash
npm run build
npm start
```

## Deploy Vercel (khuyến nghị)

1. Đẩy repo lên GitHub/GitLab/Bitbucket
2. Vào [vercel.com/new](https://vercel.com/new) → Import project
3. Framework preset: **Next.js** (tự nhận)
4. Deploy — không cần env vars

Hoặc CLI:

```bash
npm i -g vercel
vercel
```

## Deploy Netlify

```bash
npm run build
```

Build command: `npm run build`  
Publish directory: `.next` — hoặc dùng [Netlify Next.js Runtime](https://docs.netlify.com/frameworks/next-js/overview/).

## Cấu trúc

- `src/app` — layout + trang chính
- `src/components` — lịch, thư viện bài tập, theo dõi cân
- `src/data/content.ts` — nội dung lộ trình / bài tập
