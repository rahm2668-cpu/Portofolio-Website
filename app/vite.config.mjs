import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
const mirror={name:'portfolio-pages',configureServer(server){server.middlewares.use((req,res,next)=>{const parsed=new URL(req.url||'/','http://localhost');if(/^\/(blog|today-i-learned|work\/studio)(\/|$)/.test(parsed.pathname)){res.statusCode=404;res.setHeader('Content-Type','text/html; charset=utf-8');res.end('<title>Page removed — Rahmawan</title><body style="background:#05070b;color:#e2e8f0;font-family:system-ui;padding:48px"><h1>Halaman ini sudah dihapus.</h1><a style="color:#b9cae6" href="/">Kembali ke beranda</a></body>');return;}if(parsed.pathname==='/_next/image'){const img=parsed.searchParams.get('url');if(img?.startsWith('/assets/'))req.url=img;}next();});}};

export default defineConfig({
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [mirror,react(),tailwindcss()],
});

