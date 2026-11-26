const il = c((m) => {
  const D = Math.sin(m * 127.1 + 311.7) * 43758.5453;
  return D - Math.floor(D);
}, "hash"), hc = c((m, D, B) => m < D ? D : m > B ? B : m, "clamp"), dh = c((m, D, B) => {
  const v = [], H = [];
  let U = 0;
  const Q = (Number.isFinite(D) ? D : 0) * B;
  for (let $ = 0; $ < m.length; $++) {
    const O = Number.isFinite(m[$]) && m[$] > 0 ? m[$] : 0;
    v.push(U), H.push(O), U += O + ($ < m.length - 1 ? Q : 0);
  }
  return { x: v, w: H, width: Math.max(0, U) };
}, "layoutWord"), hh = c((m, D, B, v, H, U) => {
  const Q = D + B * (0.5 + (Number.isFinite(H) ? H : 0));
  return m === "top" ? { x: Q, y: -v } : m === "behind" ? { x: Q, y: -v + 30 * U } : { x: Q, y: 0 };
}, "seatPoint"), mh = c((m, D, B, v, H, U) => {
  const Q = B - m, $ = v - D, O = Math.hypot(Q, $);
  if (!Number.isFinite(O) || O < 1e-6 || H <= 0) return { x: 0, y: 0 };
  const S = H * Math.min(1, O / Math.max(1e-6, U)) / O;
  return { x: Q * S, y: $ * S };
}, "lookAt"), yh = c((m, D, B, v, H, U, Q, $, O) => {
  const S = hc(Number.isFinite(D) ? D : 0, 0, 0.05), Y = 40;
  if (m.pop > 0) return m.pop -= S, m.pop <= 0 && (m.pop = 0, m.x = O() * v, m.y = -Y, m.vx = 0, m.vy = m.fall), m;
  const ot = Math.sin(B * 0.7 + m.phase) * 14;
  if (Number.isFinite(U) && Number.isFinite(Q) && $ > 0) {
    const Et = m.x - U, Ot = m.y - Q, St = Math.hypot(Et, Ot);
    if (St < $ && St > 0.01) {
      const Nt = (1 - St / $) * (1 - St / $) * 2400;
      m.vx += Et / St * Nt * S, m.vy += Ot / St * Nt * S, m.vr += (Et > 0 ? 1 : -1) * Nt * 4e-3 * S;
    }
  }
  const ct = Math.min(1, S * 2.4);
  return m.vx += (ot - m.vx) * ct, m.vy += (m.fall - m.vy) * ct, m.vr += (Math.sin(m.phase * 3) * 18 - m.vr) * Math.min(1, S * 0.8), m.x += m.vx * S, m.y += m.vy * S, m.rot = (m.rot + m.vr * S) % 360, m.y > H + Y ? (m.y = -Y, m.x = O() * v) : m.y < -Y * 3 && (m.y = H + Y), m.x < -Y ? m.x = v + Y : m.x > v + Y && (m.x = -Y), m;
}, "stepFloater"), vh = c((m, D, B, v) => {
  const H = Math.max(0, Math.floor(m) || 0), U = Math.max(0, Math.floor(D) || 0), Q = Math.max(0, Math.floor(B) || 0), $ = Math.max(0, Math.floor(v) || 0), O = c((Kt) => 160 + Kt * 80, "letter"), S = O(Math.max(0, H - 1)) + 420, Y = c((Kt) => S + Kt * 130, "member"), ot = S + Math.max(0, U - 1) * 130 * 0.5, ct = S + 260, Et = c((Kt) => ct + Kt * 45, "word"), Ot = Et(Q) + 120, St = c((Kt) => Ot + Kt * 110, "action"), Nt = Math.max(Y(Math.max(0, U - 1)) + 720, St(Math.max(0, $ - 1)) + 600, O(Math.max(0, H - 1)) + 560);
  return { ground: 60, letter: O, crewStart: S, member: Y, doodles: ot, word: Et, action: St, total: Nt };
}, "timeline"), Od = { auto: { background: "var(--color-background, #ffffff)", ink: "var(--color-foreground, #0d0d0d)", accent: "#ff6b2c" }, paper: { background: "#ffffff", ink: "#0d0d0d", accent: "#ff6b2c" }, night: { background: "#0e0e10", ink: "#f4f1ea", accent: "#ff8a3d" }, riso: { background: "#f4f2ff", ink: "#2433c9", accent: "#ff4f8b" }, sunny: { background: "#ffd94a", ink: "#141414", accent: "#e8402a" } }, gh = [{ kind: "yeti", letter: 0, seat: "front", offset: -0.32, name: "Bruno", says: "Hungry. Got snacks?" }, { kind: "bird", letter: 1, seat: "top", offset: 0.02, name: "Pip", says: "Tweet us! Seriously." }, { kind: "mushroom", letter: 2, seat: "front", offset: 0.12, scale: 0.95, name: "Morel", says: "I'm a fun guy." }, { kind: "kid", letter: 4, seat: "top", offset: -0.05, name: "Juno", says: "Up here! Best seat in the house." }, { kind: "ghost", letter: 6, seat: "behind", offset: 0, name: "Boo", says: "Boo! \u2026sorry. Hi." }, { kind: "cat", letter: 7, seat: "front", offset: 0.42, flip: true, name: "Patch", says: "Arr. Nice cursor." }], bh = [{ title: "Play", links: [{ label: "Download", href: "#" }, { label: "Patch notes", href: "#" }, { label: "Roadmap", href: "#" }, { label: "Wiki", href: "#" }] }, { title: "Shop", links: [{ label: "Sticker packs", href: "#" }, { label: "Plushies", href: "#" }, { label: "Art prints", href: "#" }, { label: "Gift cards", href: "#" }] }, { title: "Community", links: [{ label: "Discord", href: "#" }, { label: "Fan art", href: "#" }, { label: "Events", href: "#" }, { label: "Creators", href: "#" }] }, { title: "Studio", links: [{ label: "About", href: "#" }, { label: "Careers", href: "#" }, { label: "Press kit", href: "#" }, { label: "Contact", href: "#" }] }], ph = [{ label: "Grab a sticker pack", href: "#", icon: "sandwich", variant: "outline" }, { label: "Play free", href: "#", icon: "bolt", variant: "solid" }], xh = ["flame", "sandwich", "star", "flame", "heart", "sandwich", "bolt", "sparkle"], ya = { flame: "#ff7a1a", flameCore: "#ffd23f", gold: "#ffd23f", heart: "#ff5c7a", bread: "#f2c48d", leaf: "#5fb247" }, Sh = { yeti: { k: 1, box: { l: -72, r: 60, t: -140, b: 6 }, seat: "front", eyes: [{ x: -15, y: -86, r: 8, pupil: 3.6, max: 3.6 }, { x: 13, y: -88, r: 8, pupil: 3.6, max: 3.6 }], body: c((m) => o.jsxs(o.Fragment, { children: [o.jsx("ellipse", { className: "dcf-shadow", cx: "0", cy: "2", rx: "54", ry: "5" }), o.jsx("path", { d: "M-40 -92 C-62 -92 -70 -76 -68 -56 L-66 -30 C-64 -18 -54 -16 -44 -20 Z" }), o.jsx("path", { d: "M-40 -92 C-62 -92 -70 -76 -68 -56 L-66 -30 C-64 -18 -54 -16 -44 -20 Z", fill: m, stroke: "none" }), o.jsx("path", { className: "n", d: "M-67 -64 C-58 -59 -50 -59 -43 -64" }), o.jsx("path", { d: "M-30 -104 C-40 -112 -44 -124 -40 -138 C-32 -129 -22 -122 -13 -114 Z" }), o.jsx("path", { d: "M18 -114 C26 -124 36 -130 47 -133 C45 -120 41 -110 32 -101 Z" }), o.jsx("path", { className: "n", d: "M-38 -124 L-28 -119 M39 -125 L33 -116" }), o.jsx("path", { d: "M-44 -2 C-54 -28 -54 -66 -42 -90 C-32 -110 -14 -118 2 -118 C22 -118 40 -108 48 -88 C58 -64 58 -28 48 -2 C30 4 -26 4 -44 -2 Z" }), o.jsx("path", { d: "M40 -96 C54 -66 54 -30 46 -4 C40 -2 34 -1 30 0 C40 -30 42 -64 33 -101 Z", fill: m, stroke: "none" }), o.jsx("path", { className: "n", d: "M-7 -117 C-5 -126 1 -128 3 -120 C5 -127 11 -126 11 -116" }), o.jsx("path", { className: "n thin", d: "M-14 -24 l-3 4 M8 -40 l3 4 M14 -46 l3 3 M20 -30 l3 3" }), o.jsx("path", { className: "n", d: "M-48 -62 C-22 -50 10 -32 49 -26 M-50 -52 C-24 -40 8 -22 49 -16" }), o.jsx("rect", { x: "-12", y: "-46", width: "15", height: "13", rx: "2.5", transform: "rotate(26 -4.5 -39.5)" }), o.jsx("path", { d: "M-46 -60 C-62 -50 -63 -29 -51 -19 C-45 -15 -38 -19 -40 -28 C-43 -36 -40 -46 -36 -52" }), o.jsx("path", { d: "M46 -58 C61 -46 61 -26 51 -18 C45 -14 38 -18 40 -26 C43 -34 41 -44 37 -50" }), o.jsx("path", { d: "M-37 -2 C-41 -14 -23 -19 -16 -7 C-14 0 -26 4 -37 -2 Z" }), o.jsx("path", { d: "M37 -2 C41 -14 23 -19 16 -7 C14 0 26 4 37 -2 Z" }), o.jsx("path", { className: "n thin", d: "M-30 -4 l1 -4 M-24 -3 l1 -4 M30 -4 l-1 -4 M24 -3 l-1 -4" }), o.jsx("path", { className: "n", d: "M-23 -98 L-9 -96 M6 -98 L20 -100" }), o.jsx("path", { className: "n", d: "M-12 -70 C-6 -64 6 -64 12 -71" }), o.jsx("path", { d: "M3 -66.5 L5.5 -60 L8 -67.5 Z" })] }), "body") }, kid: { k: 1.28, box: { l: -30, r: 30, t: -88, b: 42 }, seat: "top", eyes: [{ x: -6, y: -58, r: 0, pupil: 2.5, max: 1.8 }, { x: 6.5, y: -58, r: 0, pupil: 2.5, max: 1.8 }], body: c((m) => o.jsxs(o.Fragment, { children: [o.jsx("path", { d: "M-15 -6 L-3 -6 C-3 8 -5 20 -6 30 L-15 30 C-15 18 -16 6 -15 -6 Z" }), o.jsx("path", { d: "M3 -6 L15 -6 C17 6 19 16 22 27 L12 30 C10 18 6 6 3 -6 Z" }), o.jsx("path", { d: "M3 -6 L15 -6 C17 6 19 16 22 27 L12 30 C10 18 6 6 3 -6 Z", fill: m, stroke: "none" }), o.jsx("path", { className: "k", d: "M-17 30 C-20 34 -20 40 -14 41 L-2 41 C2 40 0 34 -5 30 Z" }), o.jsx("path", { className: "k", d: "M11 29 C8 34 10 40 16 40 L26 38 C29 36 27 30 22 27 Z" }), o.jsx("path", { d: "M-20 -4 C-22 -20 -18 -38 -10 -44 L10 -44 C18 -38 22 -20 20 -4 Z" }), o.jsx("path", { className: "n thick", d: "M-19.5 -14 L19.5 -14 M-18.5 -26 L18.5 -26 M-14 -36 L14 -36" }), o.jsx("path", { className: "n", d: "M-18 -36 C-28 -28 -30 -14 -26 -5" }), o.jsx("circle", { cx: "-26", cy: "-3", r: "4" }), o.jsx("path", { className: "n", d: "M18 -36 C27 -30 30 -18 28 -7" }), o.jsx("circle", { cx: "28", cy: "-4", r: "4" }), o.jsx("circle", { cx: "-17", cy: "-58", r: "4" }), o.jsx("circle", { cx: "17", cy: "-58", r: "4" }), o.jsx("circle", { cx: "0", cy: "-60", r: "17" }), o.jsx("path", { className: "n thin", d: "M-11 -52 l2 -2 M-8 -52 l2 -2 M8 -52 l2 -2 M11 -52 l2 -2" }), o.jsx("path", { className: "n", d: "M-5 -50 C-2 -47 2 -47 5 -50" }), o.jsx("path", { d: "M-15 -70 C-14 -87 14 -87 15 -70 Z" }), o.jsx("path", { d: "M-27 -68 C-16 -75 16 -75 27 -68 C18 -63 -18 -63 -27 -68 Z" }), o.jsx("path", { className: "n thick", d: "M-14.5 -74 C-6 -77 6 -77 14.5 -74" })] }), "body") }, bird: { k: 1.22, box: { l: -34, r: 30, t: -62, b: 2 }, seat: "top", eyes: [{ x: 3, y: -30, r: 4.6, pupil: 2.3, max: 2 }, { x: 12, y: -31, r: 4.6, pupil: 2.3, max: 2 }], idle: "dcf-peck", body: c((m) => o.jsxs(o.Fragment, { children: [o.jsx("path", { className: "n", d: "M-5 0 L-5 -7 M-9 0 L-1 0 M5 0 L5 -7 M1 0 L9 0" }), o.jsx("path", { d: "M-17 -16 C-26 -18 -31 -14 -33 -9 C-26 -10 -20 -8 -15 -10 Z" }), o.jsx("path", { d: "M-18 -14 C-20 -30 -10 -40 2 -40 C16 -40 22 -28 20 -16 C18 -6 8 -4 0 -4 C-10 -4 -17 -8 -18 -14 Z" }), o.jsx("path", { d: "M-11 -25 C-3 -26 1 -18 -3 -13 C-9 -12 -15 -17 -11 -25 Z", fill: m }), o.jsx("path", { className: "o", d: "M19 -30 L29 -27 L19 -23 Z" }), o.jsx("path", { className: "a", d: "M-3 -38 L4 -59 L12 -37 Z" }), o.jsx("path", { className: "n thin", d: "M-1 -44 L10 -46 M1 -51 L8 -52" }), o.jsx("circle", { cx: "4", cy: "-60", r: "2.8" })] }), "body") }, cat: { k: 1.06, box: { l: -30, r: 52, t: -110, b: 4 }, seat: "front", eyes: [{ x: 10, y: -76, r: 6, pupil: 2.8, max: 2.6 }], body: c((m) => o.jsxs(o.Fragment, { children: [o.jsx("ellipse", { className: "dcf-shadow", cx: "4", cy: "2", rx: "32", ry: "4" }), o.jsxs("g", { className: "dcf-tail", children: [o.jsx("path", { d: "M18 -4 C42 -4 52 -24 46 -44 C44 -51 36 -53 34 -46 C40 -30 34 -16 16 -14 Z" }), o.jsx("path", { className: "n thin", d: "M40 -16 l5 4 M45 -30 l6 1 M43 -42 l6 -3" })] }), o.jsx("path", { d: "M-22 0 C-28 -18 -24 -42 -14 -52 L14 -52 C24 -42 28 -18 22 0 C10 3 -10 3 -22 0 Z" }), o.jsx("path", { d: "M14 -46 C24 -36 26 -16 22 0 C18 1 14 2 12 2 C16 -14 16 -32 10 -46 Z", fill: m, stroke: "none" }), o.jsx("path", { className: "n", d: "M-8 -30 L-9 -1 M8 -30 L9 -1" }), o.jsx("path", { d: "M-16 1 C-16 -5 -3 -5 -3 1 Z M3 1 C3 -5 16 -5 16 1 Z" }), o.jsx("path", { className: "a", d: "M-18 -55 C-6 -49 6 -49 18 -55 L17 -46 C6 -40 -6 -40 -17 -46 Z" }), o.jsx("path", { className: "a", d: "M9 -45 L18 -32 L6 -37 Z" }), o.jsx("path", { d: "M-22 -86 L-25 -107 L-7 -96 Z" }), o.jsx("path", { d: "M8 -96 L23 -108 L22 -86 Z" }), o.jsx("path", { className: "n thin", d: "M-20 -92 L-21 -101 M18 -101 L18 -92" }), o.jsx("path", { d: "M-26 -70 C-28 -88 -16 -98 0 -98 C16 -98 28 -88 26 -70 C24 -56 12 -50 0 -50 C-12 -50 -24 -56 -26 -70 Z" }), o.jsx("path", { className: "n thin", d: "M-4 -97 L-3 -90 M3 -97 L3 -91" }), o.jsx("path", { className: "n", d: "M-26 -80 C-14 -83 4 -87 25 -93" }), o.jsx("ellipse", { className: "k", cx: "-10", cy: "-76", rx: "7.5", ry: "6.5" }), o.jsx("path", { className: "k", d: "M-2.5 -68 L2.5 -68 L0 -64.5 Z" }), o.jsx("path", { className: "n", d: "M0 -64.5 C-1 -60.5 -5 -60.5 -6 -62.5 M0 -64.5 C1 -60.5 5 -60.5 6 -62.5" }), o.jsx("path", { className: "n thin", d: "M-15 -66 L-29 -68 M-15 -63 L-28 -59 M15 -66 L29 -68 M15 -63 L28 -59" })] }), "body") }, ghost: { k: 1.3, box: { l: -26, r: 26, t: -70, b: 0 }, seat: "behind", eyes: [{ x: -8, y: -44, r: 6.5, pupil: 3.2, max: 3 }, { x: 9, y: -44, r: 6.5, pupil: 3.2, max: 3 }], idle: "dcf-bob", body: c((m) => o.jsxs(o.Fragment, { children: [o.jsx("path", { d: "M-23 -14 L-23 -40 C-23 -59 -12 -67 0 -67 C12 -67 23 -59 23 -40 L23 -14 C12 -10 -12 -10 -23 -14 Z" }), o.jsx("path", { d: "M13 -61 C21 -54 23 -46 23 -36 L23 -15 L15 -13 L15 -36 C15 -46 15 -54 13 -61 Z", fill: m, stroke: "none" }), o.jsx("path", { className: "n thin", d: "M-16 -56 C-12 -61 -6 -63 -2 -63" }), o.jsx("path", { className: "k", d: "M-5 -33 C-3 -27 4 -27 6 -33 Z" }), o.jsx("path", { className: "n thin", d: "M-17 -35 l3 -2 M-14 -34 l3 -2 M14 -35 l3 -2 M17 -34 l3 -2" })] }), "body"), front: c(() => o.jsxs(o.Fragment, { children: [o.jsx("path", { d: "M-25 -32 C-27 -38 -21 -42 -17 -38 C-15 -42 -10 -41 -10 -36 L-11 -30 C-15 -28 -22 -28 -25 -32 Z" }), o.jsx("path", { d: "M25 -32 C27 -38 21 -42 17 -38 C15 -42 10 -41 10 -36 L11 -30 C15 -28 22 -28 25 -32 Z" })] }), "front") }, mushroom: { k: 1.12, box: { l: -27, r: 27, t: -56, b: 4 }, seat: "front", eyes: [{ x: -4.5, y: -16, r: 0, pupil: 1.9, max: 1.3 }, { x: 4.5, y: -16, r: 0, pupil: 1.9, max: 1.3 }], idle: "dcf-sway", body: c((m) => o.jsxs(o.Fragment, { children: [o.jsx("ellipse", { className: "dcf-shadow", cx: "0", cy: "2", rx: "18", ry: "3" }), o.jsx("path", { className: "n", d: "M-10 -15 L-17 -9 M10 -15 L17 -11" }), o.jsx("path", { d: "M-10 0 C-12 -10 -10 -22 -8 -28 L8 -28 C10 -22 12 -10 10 0 C4 2 -4 2 -10 0 Z" }), o.jsx("path", { d: "M5 -27 C9 -20 11 -10 10 0 C8 1 6 1.5 4 1.5 C6 -8 6 -18 2 -27 Z", fill: m, stroke: "none" }), o.jsx("path", { className: "r", d: "M-25 -28 C-27 -45 -12 -55 0 -55 C12 -55 27 -45 25 -28 C14 -23 -14 -23 -25 -28 Z" }), o.jsx("circle", { cx: "-12", cy: "-40", r: "4.2" }), o.jsx("circle", { cx: "6", cy: "-46", r: "3.4" }), o.jsx("circle", { cx: "15", cy: "-34", r: "3" }), o.jsx("circle", { cx: "-2", cy: "-33", r: "2.4" }), o.jsx("path", { className: "n", d: "M-2 -10 C-1 -8 1 -8 2 -10" })] }), "body") } }, Rd = c(({ kind: m }) => {
  switch (m) {
    case "flame":
      return o.jsxs(o.Fragment, { children: [o.jsx("path", { fill: ya.flame, d: "M0 14 C-9 14 -12 6 -10 0 C-8 -5 -4 -6 -4 -12 C1 -9 3 -5 2 -1 C4 -3 5 -6 5 -8 C10 -3 11 4 8 9 C6 12 3 14 0 14 Z" }), o.jsx("path", { fill: ya.flameCore, d: "M0 11.5 C-4 11.5 -6 8 -5 5 C-4 2 -1 1 -1 -3 C2 -1 4 3 3 6 C4 5 5 4 5 3 C7 6 5 11.5 0 11.5 Z" })] });
    case "sandwich":
      return o.jsxs(o.Fragment, { children: [o.jsx("path", { fill: ya.bread, d: "M-13 5 L13 5 L12.5 9.5 C4 11 -4 11 -12.5 9.5 Z" }), o.jsx("path", { fill: ya.gold, d: "M-12 2 L12 2 L11 5 L5 5 L3 9 L1 5 L-12 5 Z" }), o.jsx("path", { fill: "none", stroke: ya.leaf, strokeWidth: "2.6", d: "M-13 1 q2.2 2.4 4.4 0 q2.2 2.4 4.4 0 q2.2 2.4 4.4 0 q2.2 2.4 4.4 0 q2.2 2.4 4.4 0 q2.2 2.4 4.4 0" }), o.jsx("path", { fill: ya.bread, d: "M-13 -1 C-14 -8 -10 -11 -6 -10 C-3 -13.5 3 -13.5 6 -10 C10 -11 14 -8 13 -1 Z" }), o.jsx("path", { fill: "none", strokeWidth: "1.2", d: "M-6 -6 l1.5 -1 M0 -8 l1.5 -1 M6 -6 l1.5 -1" })] });
    case "star":
      return o.jsx("path", { fill: ya.gold, d: "M0 -13 L3.6 -4.4 L13 -4 L5.8 2.2 L8.2 12 L0 6.6 L-8.2 12 L-5.8 2.2 L-13 -4 L-3.6 -4.4 Z" });
    case "heart":
      return o.jsx("path", { fill: ya.heart, d: "M0 11 C-6 6 -13 1 -13 -5 C-13 -10 -8 -13 -4 -11 C-2 -10 -1 -8 0 -6 C1 -8 2 -10 4 -11 C8 -13 13 -10 13 -5 C13 1 6 6 0 11 Z" });
    case "bolt":
      return o.jsx("path", { fill: ya.gold, d: "M3 -14 L-8 2 L-1 2 L-4 14 L8 -3 L1 -3 Z" });
    case "sparkle":
      return o.jsx("path", { fill: "#8fdcff", d: "M0 -13 C1 -4 4 -1 13 0 C4 1 1 4 0 13 C-1 4 -4 1 -13 0 C-4 -1 -1 -4 0 -13 Z" });
    case "spiral":
      return o.jsx("path", { fill: "none", d: "M0 0 C2 -2 4 0 3 3 C1 6 -4 5 -5 1 C-6 -4 -1 -8 4 -7 C9 -5 10 2 7 6" });
    case "plane":
      return o.jsxs(o.Fragment, { children: [o.jsx("path", { className: "dcf-paperfill", d: "M-13 -1 L13 -10 L4 12 L0 3 Z" }), o.jsx("path", { fill: "none", d: "M0 3 L13 -10 M0 3 L-2 9 L2 5" })] });
  }
  return null;
}, "Doodle"), Mh = c(({ kind: m, size: D = 18 }) => o.jsx("svg", { className: "dcf-icon", viewBox: "-16 -16 32 32", width: D, height: D, "aria-hidden": "true", children: o.jsx(Rd, { kind: m }) }), "DoodleIcon"), Ke = 200, Th = '"Arial Black", "Inter Display", Inter, "Helvetica Neue", Helvetica, Arial, sans-serif', Eh = '"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif', Ah = c((m) => ({ advances: Array.from(m).map((D) => (D === " " ? 0.3 : /[IJ1]/.test(D) ? 0.42 : /[MW]/.test(D) ? 0.98 : 0.76) * Ke), cap: 0.73 * Ke }), "estimate"), zh = c((m, D) => {
  if (typeof document > "u") return null;
  const B = document.createElement("canvas").getContext("2d");
  if (!B) return null;
  B.font = "900 " + Ke + "px " + D;
  const v = Array.from(m), H = [];
  let U = 0;
  for (let O = 0; O < v.length; O++) {
    const S = B.measureText(v.slice(0, O + 1).join("")).width;
    H.push(S - U), U = S;
  }
  const Q = B.measureText(m.replace(/\s/g, "") || "H"), $ = Q.actualBoundingBoxAscent > 0 ? Q.actualBoundingBoxAscent : 0.73 * Ke;
  return { advances: H, cap: $ };
}, "measure"), Nd = typeof window < "u" ? st.useLayoutEffect : st.useEffect, Df = c(({ link: m, className: D }) => m.href ? o.jsxs("a", { className: D, href: m.href, children: [o.jsx("span", { children: m.label }), o.jsx("svg", { className: "dcf-squiggle", viewBox: "0 0 100 8", preserveAspectRatio: "none", "aria-hidden": "true", children: o.jsx("path", { pathLength: 1, d: "M1 5 C10 1 16 7 25 4 S40 1 50 4 S66 7 75 4 S90 1 99 4" }) })] }) : o.jsx("span", { className: D, children: m.label }), "Link");
function _h({ wordmark: m = "MISCHIEF", brand: D = "mischief", blurb: B = "We draw every frame by hand and ship a new chapter every season. Come make a little trouble with us.", tagline: v = "A hand-drawn world for the troublemaker in all of us.", columns: H = bh, actions: U = ph, copyright: Q = "\xA9 2026 Mischief Games. Drawn by hand in Lisbon.", legal: $ = [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }, { label: "Cookies", href: "#" }], socials: O = [{ label: "Discord", href: "#" }, { label: "YouTube", href: "#" }, { label: "TikTok", href: "#" }, { label: "X", href: "#" }], backToTop: S = true, crew: Y = gh, doodles: ot = xh, doodleCount: ct = 12, preset: Et = "auto", palette: Ot, fontFamily: St = Th, serifFamily: Nt = Eh, tracking: Kt = -0.02, interactive: kt = true, height: Jt = "760px", className: dl }) {
  const I = st.useId().replace(/[^a-zA-Z0-9_-]/g, ""), Zt = m.toUpperCase(), Gt = st.useMemo(() => Array.from(Zt), [Zt]), Pt = { ...Od[Et] || Od.auto, ...Ot || {} }, gl = st.useRef(null), Fl = st.useRef(null), bl = st.useRef(null), Ht = st.useRef([]), pl = st.useRef([]), Xl = st.useRef([]), [Yt, M] = st.useState(() => Ah(Zt)), [N, w] = st.useState(false), [it, r] = st.useState(false), [z, C] = st.useState(-1), [j, X] = st.useState(-1), nt = st.useRef(0);
  Nd(() => {
    var k;
    const h = c(() => {
      const R = zh(Zt, St);
      R && M(R);
    }, "run");
    h();
    const _ = typeof document < "u" ? document.fonts : void 0;
    if (!_) return;
    let L = true;
    return _.ready.then(() => L && h()), (k = _.addEventListener) == null || k.call(_, "loadingdone", h), () => {
      var R;
      L = false, (R = _.removeEventListener) == null || R.call(_, "loadingdone", h);
    };
  }, [Zt, St]);
  const Z = st.useMemo(() => dh(Yt.advances, Kt, Ke), [Yt, Kt]), Xt = Yt.cap, P = st.useMemo(() => Y.map((h, _) => {
    const L = Sh[h.kind];
    if (!L || !Gt.length) return null;
    const k = hc(Math.floor(h.letter) || 0, 0, Gt.length - 1), R = Xt / 144 * L.k * (h.scale ?? 1), W = h.seat || L.seat, ht = hh(W, Z.x[k], Z.w[k], Xt, h.offset ?? 0, R);
    return { i: _, m: h, art: L, seat: W, scale: R, ...ht, flip: h.flip ? -1 : 1 };
  }).filter(Boolean), [Y, Gt.length, Z, Xt]), zt = st.useMemo(() => {
    let h = 0, _ = Z.width, L = -Xt, k = 30;
    for (const W of P) {
      const ht = W.flip > 0 ? [W.art.box.l, W.art.box.r] : [-W.art.box.r, -W.art.box.l];
      h = Math.min(h, W.x + ht[0] * W.scale), _ = Math.max(_, W.x + ht[1] * W.scale), L = Math.min(L, W.y + W.art.box.t * W.scale), k = Math.max(k, W.y + W.art.box.b * W.scale);
    }
    const R = 24;
    return { x: h - R, y: L - R, w: _ - h + R * 2, h: k - L + R * 2 };
  }, [Z, P, Xt]), ue = v.split(/\s+/).filter(Boolean), fl = vh(Gt.length, P.length, ue.length, U.length), Za = st.useMemo(() => {
    const h = zt.x + 6, _ = zt.x + zt.w - 6;
    let L = "M" + h.toFixed(1) + " 6";
    const k = 14;
    for (let ht = 1; ht <= k; ht++) {
      const vt = h + (_ - h) * ht / k;
      L += " Q" + (vt - (_ - h) / k / 2).toFixed(1) + " " + (6 + (il(ht * 3.1) - 0.5) * 5).toFixed(1) + " " + vt.toFixed(1) + " " + (6 + (il(ht * 7.7) - 0.5) * 2).toFixed(1);
    }
    let R = "";
    for (let ht = 0; ht < 22; ht++) {
      const vt = h + 20 + il(ht * 11.3) * (_ - h - 40), at = 0.7 + il(ht * 5.9) * 0.6;
      R += "M" + vt.toFixed(1) + " 6 l" + (2 * at).toFixed(1) + " " + (-9 * at).toFixed(1) + " M" + (vt + 3 * at).toFixed(1) + " 6 l" + (1 * at).toFixed(1) + " " + (-12 * at).toFixed(1) + " M" + (vt + 6 * at).toFixed(1) + " 6 l" + (-1 * at).toFixed(1) + " " + (-7 * at).toFixed(1) + " ";
    }
    const W = Array.from({ length: 9 }, (ht, vt) => ({ x: h + 40 + il(vt * 17.1) * (_ - h - 80), y: 14 + il(vt * 2.3) * 8, r: 2 + il(vt * 9.4) * 2.6 }));
    return { d: L, tufts: R, pebbles: W };
  }, [zt]), Ql = st.useMemo(() => {
    const h = ot.length ? ot : [], _ = h.length ? hc(Math.floor(ct) || 0, 0, 40) : 0;
    return Array.from({ length: _ }, (L, k) => ({ kind: h[k % h.length], size: 22 + il(k * 4.7) * 14, seed: k }));
  }, [ot, ct]), xl = st.useRef({ floaters: [], w: 0, h: 0, px: NaN, py: NaN, inside: false, visible: false, gaze: [], seed: 1, start: 0 });
  Nd(() => {
    const h = bl.current;
    if (!h) return;
    const _ = xl.current, L = c(() => {
      const R = h.getBoundingClientRect(), W = _.w, ht = _.h;
      if (_.w = R.width, _.h = R.height, _.floaters.length !== Ql.length || !W) _.floaters = Ql.map((vt, at) => ({ x: (0.04 + 0.92 * ((at + il(at * 9.1) * 0.8) / Math.max(1, Ql.length))) * R.width, y: (0.02 + il(at * 3.3) * 0.56) * R.height, vx: 0, vy: 0, rot: (il(at * 1.7) - 0.5) * 50, vr: (il(at * 6.1) - 0.5) * 30, fall: 9 + il(at * 2.9) * 16, phase: il(at * 8.3) * Math.PI * 2, pop: 0 }));
      else if (W && ht) for (const vt of _.floaters) vt.x *= R.width / W, vt.y *= R.height / ht;
      ke();
    }, "size");
    if (L(), typeof ResizeObserver > "u") return;
    const k = new ResizeObserver(L);
    return k.observe(h), () => k.disconnect();
  }, [Ql]);
  const ke = c(() => {
    const h = xl.current, _ = hc(h.w / 1100, 0.5, 1);
    for (let L = 0; L < h.floaters.length; L++) {
      const k = Xl.current[L], R = h.floaters[L];
      if (!k || !R) continue;
      let W = _, ht = 1;
      if (R.pop > 0) {
        const vt = 1.4 - R.pop;
        W = _ * (1 + Math.min(1, vt / 0.3) * 0.7), ht = Math.max(0, 1 - vt / 0.3);
      }
      k.style.transform = "translate3d(" + R.x.toFixed(1) + "px," + R.y.toFixed(1) + "px,0) rotate(" + R.rot.toFixed(1) + "deg) scale(" + W.toFixed(3) + ")", k.style.opacity = String(ht);
    }
  }, "paintDoodles");
  st.useEffect(() => {
    var L;
    if (typeof window > "u" || !window.matchMedia) return;
    const h = window.matchMedia("(prefers-reduced-motion: reduce)"), _ = c(() => r(h.matches), "on");
    return _(), (L = h.addEventListener) == null || L.call(h, "change", _), () => {
      var k;
      return (k = h.removeEventListener) == null ? void 0 : k.call(h, "change", _);
    };
  }, []), st.useEffect(() => {
    const h = gl.current;
    if (!h) return;
    const _ = xl.current;
    if (typeof IntersectionObserver > "u") {
      _.visible = true, w(true);
      return;
    }
    const L = new IntersectionObserver((k) => {
      for (const R of k) _.visible = R.isIntersecting, R.isIntersecting && R.intersectionRatio > 0.12 && w(true);
    }, { threshold: [0, 0.12, 0.3] });
    return L.observe(h), () => L.disconnect();
  }, []), st.useEffect(() => {
    N && !xl.current.start && (xl.current.start = performance.now());
  }, [N]), st.useEffect(() => {
    if (typeof window > "u") return;
    const h = xl.current;
    let _ = 0, L = performance.now(), k = 0, R = 0;
    const W = c(() => (h.seed = h.seed * 16807 % 2147483647, h.seed / 2147483647), "rand"), ht = c((at, tl, ll) => {
      const wl = at.getScreenCTM();
      if (!wl) return null;
      const sl = wl.inverse();
      return { x: sl.a * tl + sl.c * ll + sl.e, y: sl.b * tl + sl.d * ll + sl.f };
    }, "svgPoint"), vt = c((at) => {
      var $e;
      if (_ = requestAnimationFrame(vt), !h.visible || document.hidden) {
        L = at;
        return;
      }
      const tl = Math.min(0.05, (at - L) / 1e3);
      L = at;
      const ll = at / 1e3, wl = Fl.current, sl = bl.current;
      let Il = null;
      wl && h.inside && kt && (Il = ht(wl, h.px, h.py));
      for (let ol = 0; ol < P.length; ol++) {
        const Rt = P[ol], Tt = ($e = h.gaze)[ol] || ($e[ol] = { x: 0, y: 0, tx: 0, ty: 0, next: 0, blinkAt: ll + 1 + il(ol * 3.7) * 3, blink: 0 });
        if (!Il && ll > Tt.next) {
          const Sl = P[(ol + 1 + Math.floor(W() * Math.max(1, P.length - 1))) % P.length];
          Sl && W() < 0.45 ? (Tt.tx = Sl.x, Tt.ty = Sl.y - 60 * Sl.scale) : (Tt.tx = Rt.x + (W() - 0.5) * 900, Tt.ty = Rt.y - 80 * Rt.scale + (W() - 0.5) * 500), Tt.next = ll + 1.4 + W() * 2.6;
        }
        ll > Tt.blinkAt && (Tt.blink = 0.16, Tt.blinkAt = ll + 2.2 + W() * 4), Tt.blink = Math.max(0, Tt.blink - tl);
        const ce = Tt.blink > 0 ? 0.12 + Math.abs(Tt.blink - 0.08) / 0.08 * 0.88 : 1, ie = pl.current[ol] || [];
        for (let Sl = 0; Sl < Rt.art.eyes.length; Sl++) {
          const va = Rt.art.eyes[Sl], Fe = Rt.x + va.x * Rt.scale * Rt.flip, Pu = Rt.y + va.y * Rt.scale, yc = Il ? Il.x : Tt.tx, Vl = Il ? Il.y : Tt.ty, Qt = mh(Fe, Pu, yc, Vl, va.max, 220), qt = ie[Sl];
          if (!qt) continue;
          const Pl = "_o" + Sl, ga = Tt[Pl] || { x: 0, y: 0 }, tn = Math.min(1, tl * (Il ? 14 : 6)), ln = ga.x + (Qt.x * Rt.flip - ga.x) * tn, Ie = ga.y + (Qt.y - ga.y) * tn;
          Tt[Pl] = { x: ln, y: Ie }, qt.pupil && qt.pupil.setAttribute("transform", "translate(" + ln.toFixed(2) + " " + Ie.toFixed(2) + ")"), qt.blink && qt.blink.setAttribute("transform", "translate(0 " + (va.y * (1 - ce)).toFixed(2) + ") scale(1 " + ce.toFixed(3) + ")");
        }
      }
      if (sl && h.floaters.length && (N && h.start ? at - h.start > fl.doodles || it : false)) {
        const Rt = sl.getBoundingClientRect(), Tt = h.inside && kt ? h.px - Rt.left : NaN, ce = h.inside && kt ? h.py - Rt.top : NaN;
        if (!it) for (const ie of h.floaters) yh(ie, tl, ll, h.w, h.h, Tt, ce, 110, W);
        ke();
      }
      if (!it && at - k > 125) {
        k = at, R = (R + 1) % 3;
        const ol = "url(#" + I + "-boil" + R + ")";
        for (const Rt of Ht.current) Rt && Rt.setAttribute("filter", ol);
      }
    }, "frame");
    return _ = requestAnimationFrame(vt), () => cancelAnimationFrame(_);
  }, [P, N, it, kt, I, fl.doodles]), st.useEffect(() => () => window.clearTimeout(nt.current), []);
  const Wu = c((h) => {
    const _ = xl.current;
    _.px = h.clientX, _.py = h.clientY, _.inside = true;
  }, "onPointerMove"), Nl = c(() => {
    xl.current.inside = false;
  }, "onPointerLeave"), $u = c((h) => {
    kt && (C(h), X(-1), requestAnimationFrame(() => X(h)), window.clearTimeout(nt.current), nt.current = window.setTimeout(() => {
      C(-1), X(-1);
    }, 2600));
  }, "poke"), Fu = c((h) => {
    if (!kt) return;
    const _ = xl.current.floaters[h];
    _ && _.pop <= 0 && (_.pop = 1.4, ke());
  }, "popDoodle"), Iu = c(() => {
    typeof window > "u" || window.scrollTo({ top: 0, behavior: it ? "auto" : "smooth" });
  }, "toTop"), ne = "url(#" + I + "-hatch)", mc = { "--dcf-bg": Pt.background, "--dcf-ink": Pt.ink, "--dcf-accent": Pt.accent, "--dcf-serif": Nt, "--dcf-display": St, minHeight: Jt }, Je = c((h, _, L) => ((h - _) / L * 100).toFixed(3) + "%", "pct"), We = c((h, _) => {
    var L, k;
    return o.jsx("g", { transform: "translate(" + h.x.toFixed(2) + " " + h.y.toFixed(2) + ") scale(" + (h.scale * h.flip).toFixed(4) + " " + h.scale.toFixed(4) + ")", children: o.jsx("g", { className: "dcf-arrive dcf-arrive-" + h.seat, style: { "--d": fl.member(h.i) + "ms" }, children: o.jsx("g", { className: "dcf-hopper" + (j === h.i ? " is-hop" : ""), children: o.jsx("g", { className: "dcf-art" + (h.art.idle ? " " + h.art.idle : ""), style: { "--i": h.i }, children: _ === "body" ? o.jsxs(o.Fragment, { children: [h.art.body(ne), h.art.eyes.map((R, W) => o.jsxs("g", { ref: c((ht) => {
      var vt, at, tl;
      ((vt = pl.current)[at = h.i] || (vt[at] = []))[W] = { ...((tl = pl.current[h.i]) == null ? void 0 : tl[W]) || { pupil: null }, blink: ht };
    }, "ref"), children: [R.r > 0 && o.jsx("circle", { cx: R.x, cy: R.y, r: R.r }), o.jsxs("g", { ref: c((ht) => {
      var vt, at, tl;
      ((vt = pl.current)[at = h.i] || (vt[at] = []))[W] = { ...((tl = pl.current[h.i]) == null ? void 0 : tl[W]) || { blink: null }, pupil: ht };
    }, "ref"), children: [o.jsx("circle", { className: "k", cx: R.x, cy: R.y, r: R.pupil }), o.jsx("circle", { className: "dcf-glint", cx: R.x + R.pupil * 0.35, cy: R.y - R.pupil * 0.4, r: R.pupil * 0.32 })] })] }, W))] }) : (k = (L = h.art).front) == null ? void 0 : k.call(L) }) }) }) }, h.i + _);
  }, "renderCrew");
  return o.jsxs("footer", { ref: gl, className: "dcf" + (dl ? " " + dl : ""), "data-play": N || it ? "1" : "0", "data-interactive": kt ? "1" : "0", style: mc, onPointerMove: Wu, onPointerDown: Wu, onPointerLeave: Nl, children: [o.jsx("style", { children: Oh }), o.jsxs("div", { className: "dcf-top dcf-rise", style: { "--d": "0ms" }, children: [o.jsxs("div", { className: "dcf-brand", children: [o.jsx("span", { className: "dcf-logo", "aria-hidden": "true", children: o.jsx("svg", { viewBox: "-60 -150 120 120", width: "30", height: "30", children: o.jsxs("g", { className: "dcf-art", children: [o.jsx("path", { d: "M-30 -104 C-40 -112 -44 -124 -40 -138 C-32 -129 -22 -122 -13 -114 Z" }), o.jsx("path", { d: "M18 -114 C26 -124 36 -130 47 -133 C45 -120 41 -110 32 -101 Z" }), o.jsx("path", { d: "M-44 -30 C-54 -56 -54 -70 -42 -90 C-32 -110 -14 -118 2 -118 C22 -118 40 -108 48 -88 C58 -68 56 -54 48 -30 Z" }), o.jsx("circle", { className: "k", cx: "-15", cy: "-84", r: "5.5" }), o.jsx("circle", { className: "k", cx: "13", cy: "-86", r: "5.5" }), o.jsx("path", { className: "n", d: "M-12 -66 C-6 -60 6 -60 12 -67" })] }) }) }), o.jsx("span", { className: "dcf-brandname", children: D })] }), B && o.jsx("p", { className: "dcf-blurb", children: B }), H.length > 0 && o.jsx("nav", { className: "dcf-cols", "aria-label": "Footer", children: H.map((h) => o.jsxs("div", { className: "dcf-col", children: [o.jsx("h3", { className: "dcf-coltitle", children: h.title }), o.jsx("ul", { children: h.links.map((_) => o.jsx("li", { children: o.jsx(Df, { link: _, className: "dcf-link" }) }, _.label)) })] }, h.title)) })] }), o.jsxs("div", { className: "dcf-world", ref: bl, children: [o.jsxs("div", { className: "dcf-stage", children: [o.jsx("h2", { className: "dcf-sr", children: m }), o.jsxs("svg", { ref: Fl, className: "dcf-svg", viewBox: zt.x.toFixed(1) + " " + zt.y.toFixed(1) + " " + zt.w.toFixed(1) + " " + zt.h.toFixed(1), "aria-hidden": "false", role: "group", "aria-label": m + " \u2014 meet the crew", children: [o.jsxs("defs", { children: [o.jsx("pattern", { id: I + "-hatch", width: "4.6", height: "4.6", patternUnits: "userSpaceOnUse", patternTransform: "rotate(38)", children: o.jsx("line", { x1: "0", y1: "0", x2: "0", y2: "4.6", style: { stroke: "var(--dcf-ink)" }, strokeWidth: "1.25" }) }), [0, 1, 2].map((h) => o.jsxs("filter", { id: I + "-boil" + h, x: "-10%", y: "-10%", width: "120%", height: "120%", children: [o.jsx("feTurbulence", { type: "fractalNoise", baseFrequency: "0.035", numOctaves: "2", seed: h * 7 + 3, result: "n" }), o.jsx("feDisplacementMap", { in: "SourceGraphic", in2: "n", scale: "2.6", xChannelSelector: "R", yChannelSelector: "G" })] }, h)), o.jsxs("filter", { id: I + "-ink", x: "-4%", y: "-6%", width: "108%", height: "112%", children: [o.jsx("feTurbulence", { type: "fractalNoise", baseFrequency: "0.045", numOctaves: "3", seed: "11", result: "edge" }), o.jsx("feDisplacementMap", { in: "SourceGraphic", in2: "edge", scale: "5", xChannelSelector: "R", yChannelSelector: "G", result: "rough" }), o.jsx("feTurbulence", { type: "fractalNoise", baseFrequency: "0.018 0.32", numOctaves: "2", seed: "4", result: "streak" }), o.jsx("feColorMatrix", { in: "streak", type: "matrix", values: "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -16 5.6", result: "streakA" }), o.jsx("feTurbulence", { type: "fractalNoise", baseFrequency: "0.7", numOctaves: "1", seed: "9", result: "speck" }), o.jsx("feColorMatrix", { in: "speck", type: "matrix", values: "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -24 7.0", result: "speckA" }), o.jsx("feComposite", { in: "streakA", in2: "speckA", operator: "arithmetic", k1: "0", k2: "1", k3: "1", k4: "0", result: "holes" }), o.jsx("feComposite", { in: "rough", in2: "holes", operator: "out" })] })] }), o.jsxs("g", { ref: c((h) => void (Ht.current[0] = h), "ref"), children: [o.jsxs("g", { className: "dcf-ground", children: [o.jsx("path", { className: "dcf-draw", pathLength: 1, d: Za.d, style: { "--d": fl.ground + "ms" } }), o.jsx("path", { className: "dcf-tufts dcf-fade", d: Za.tufts, style: { "--d": fl.ground + 500 + "ms" } }), Za.pebbles.map((h, _) => o.jsx("ellipse", { className: "dcf-pebble dcf-fade", cx: h.x, cy: h.y, rx: h.r * 1.5, ry: h.r, style: { "--d": fl.ground + 600 + "ms" } }, _))] }), P.filter((h) => h.seat === "behind").map((h) => We(h, "body"))] }), Gt.map((h, _) => h === " " ? null : o.jsxs("g", { className: "dcf-letter", style: { "--d": fl.letter(_) + "ms", "--r": ((il(_ * 2.3) - 0.5) * 9).toFixed(2) + "deg" }, children: [o.jsx("g", { className: "dcf-glyph", children: o.jsx("text", { x: Z.x[_], y: 0, fontSize: Ke, fontWeight: 900, style: { fontFamily: St }, filter: "url(#" + I + "-ink)", children: h }) }), o.jsx("path", { className: "dcf-dust", d: "M" + (Z.x[_] - 6) + " -6 l-16 -6 M" + (Z.x[_] - 4) + " -16 l-12 -12 M" + (Z.x[_] + Z.w[_] + 6) + " -6 l16 -6 M" + (Z.x[_] + Z.w[_] + 4) + " -16 l12 -12" })] }, _)), o.jsxs("g", { ref: c((h) => void (Ht.current[1] = h), "ref"), children: [P.filter((h) => h.seat === "behind").map((h) => We(h, "front")), P.filter((h) => h.seat !== "behind").map((h) => We(h, "body"))] }), kt && P.map((h) => {
    const _ = h.flip > 0 ? [h.art.box.l, h.art.box.r] : [-h.art.box.r, -h.art.box.l], L = (h.seat === "behind", h.art.box.t), k = h.seat === "behind" ? -30 : h.art.box.b;
    return o.jsx("rect", { className: "dcf-hit", x: h.x + _[0] * h.scale, y: h.y + L * h.scale, width: (_[1] - _[0]) * h.scale, height: (k - L) * h.scale, rx: 12, role: "button", tabIndex: 0, "aria-label": (h.m.name || h.m.kind) + (h.m.says ? ": " + h.m.says : ""), onClick: c(() => $u(h.i), "onClick"), onKeyDown: c((R) => {
      (R.key === "Enter" || R.key === " ") && (R.preventDefault(), $u(h.i));
    }, "onKeyDown") }, "hit" + h.i);
  })] }), o.jsx("div", { className: "dcf-bubbles", "aria-live": "polite", children: P.map((h) => z === h.i && h.m.says ? o.jsx("div", { className: "dcf-bubble" + (h.x > zt.x + zt.w * 0.72 ? " is-left" : ""), style: { left: Je(h.x, zt.x, zt.w), top: Je(h.y + h.art.box.t * h.scale - 6, zt.y, zt.h) }, children: h.m.says }, h.i) : null) })] }), Ql.length > 0 && o.jsx("div", { className: "dcf-doodles", "aria-hidden": "true", children: Ql.map((h, _) => o.jsx("div", { className: "dcf-doodle", ref: c((L) => void (Xl.current[_] = L), "ref"), style: { width: h.size, height: h.size, marginLeft: -h.size / 2, marginTop: -h.size / 2 }, onPointerDown: c(() => Fu(_), "onPointerDown"), children: o.jsx("span", { className: "dcf-doodle-in", style: { "--d": fl.doodles + _ * 70 + "ms" }, children: o.jsx("svg", { viewBox: "-16 -16 32 32", width: h.size, height: h.size, children: o.jsx(Rd, { kind: h.kind }) }) }) }, _)) }), o.jsxs("div", { className: "dcf-cta", children: [o.jsx("p", { className: "dcf-tagline", children: ue.map((h, _) => o.jsxs("span", { className: "dcf-word", style: { "--d": fl.word(_) + "ms" }, children: [h, " "] }, _)) }), U.length > 0 && o.jsx("div", { className: "dcf-actions", children: U.map((h, _) => {
    const L = o.jsxs(o.Fragment, { children: [h.icon && o.jsx(Mh, { kind: h.icon }), o.jsx("span", { children: h.label })] }), k = "dcf-btn dcf-pop " + (h.variant === "outline" ? "is-outline" : "is-solid"), R = { "--d": fl.action(_) + "ms" };
    return h.href ? o.jsx("a", { className: k, style: R, href: h.href, onClick: h.onClick, children: L }, h.label) : o.jsx("button", { type: "button", className: k, style: R, onClick: h.onClick, children: L }, h.label);
  }) })] })] }), o.jsxs("div", { className: "dcf-bar dcf-rise", style: { "--d": "120ms" }, children: [o.jsx("p", { className: "dcf-copy", children: Q }), $.length > 0 && o.jsx("ul", { className: "dcf-inline", children: $.map((h) => o.jsx("li", { children: o.jsx(Df, { link: h, className: "dcf-link" }) }, h.label)) }), O.length > 0 && o.jsx("ul", { className: "dcf-inline dcf-socials", children: O.map((h) => o.jsx("li", { children: o.jsx(Df, { link: h, className: "dcf-link" }) }, h.label)) }), S && o.jsxs("button", { type: "button", className: "dcf-totop", onClick: Iu, children: [o.jsx("span", { children: "Back to top" }), o.jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", "aria-hidden": "true", children: o.jsx("path", { d: "M12 20 C11 14 12.5 9 12 4 M6 10 C8 8 10 6 12 4 C14 6 16 8 18.5 9.5" }) })] })] })] });
}
c(_h, "DoodleCrewFooter");
const Oh = ".dcf{position:relative;isolation:isolate;overflow:hidden;overflow:clip;width:100%;box-sizing:border-box;display:flex;flex-direction:column;background:var(--dcf-bg);color:var(--dcf-ink);font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Inter,Roboto,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;--dcf-soft:color-mix(in oklab,var(--dcf-ink) 62%,var(--dcf-bg));--dcf-line:color-mix(in oklab,var(--dcf-ink) 14%,var(--dcf-bg));--dcf-pad:clamp(16px,4vw,56px)}:where(.dcf) *,:where(.dcf) *::before,:where(.dcf) *::after{box-sizing:border-box}:where(.dcf) a{color:inherit;text-decoration:none}:where(.dcf) button{appearance:none;background:none;border:0;padding:0;margin:0;font:inherit;color:inherit;cursor:pointer}:where(.dcf) h2,:where(.dcf) h3,:where(.dcf) p,:where(.dcf) ul{margin:0;padding:0}:where(.dcf) ul{list-style:none}.dcf svg{max-width:none;overflow:visible}.dcf :focus-visible{outline:2px dashed var(--dcf-ink);outline-offset:4px;border-radius:6px}.dcf-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.dcf-top{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,2fr);grid-template-rows:auto 1fr;column-gap:clamp(24px,5vw,80px);row-gap:14px;padding:clamp(28px,4.5vw,56px) var(--dcf-pad) 0;max-width:1360px;width:100%;margin:0 auto;position:relative;z-index:3}.dcf-brand{display:flex;align-items:center;gap:10px;grid-column:1;grid-row:1}.dcf-logo{display:grid;place-items:center;width:40px;height:40px;border-radius:999px;border:2px solid var(--dcf-ink);background:var(--dcf-bg);transform:rotate(-6deg);transition:transform .35s cubic-bezier(.3,1.6,.5,1)}.dcf-brand:hover .dcf-logo{transform:rotate(8deg) scale(1.06)}.dcf-brandname{font-weight:800;font-size:19px;letter-spacing:-.02em}.dcf-blurb{grid-column:1;grid-row:2;font-family:var(--dcf-serif);font-size:15px;line-height:1.55;color:var(--dcf-soft);max-width:34ch}.dcf-cols{grid-column:2;grid-row:1/span 2;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}.dcf-coltitle{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-bottom:12px}.dcf-col li{margin:0 0 7px}.dcf-link{position:relative;display:inline-block;font-size:14px;font-weight:550;color:var(--dcf-soft);padding:2px 0;transition:color .2s}.dcf-link:hover{color:var(--dcf-ink)}.dcf-squiggle{position:absolute;left:-2px;right:-2px;bottom:-4px;width:calc(100% + 4px);height:7px;pointer-events:none}.dcf-squiggle path{fill:none;stroke:var(--dcf-accent);stroke-width:2.2;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .35s cubic-bezier(.4,0,.2,1)}.dcf-link:hover .dcf-squiggle path,.dcf-link:focus-visible .dcf-squiggle path{stroke-dashoffset:0}.dcf-world{position:relative;flex:1;display:flex;flex-direction:column;justify-content:flex-end;padding:clamp(22px,4vw,48px) var(--dcf-pad) 0;max-width:1360px;width:100%;margin:0 auto}.dcf-stage{position:relative;z-index:1}.dcf-svg{display:block;width:100%;height:auto;user-select:none;-webkit-user-select:none}.dcf-svg text{fill:var(--dcf-ink)}.dcf-art{fill:var(--dcf-bg);stroke:var(--dcf-ink);stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}.dcf-art .n{fill:none}.dcf-art .k{fill:var(--dcf-ink)}.dcf-art .a{fill:var(--dcf-accent)}.dcf-art .o{fill:#ff9f1c}.dcf-art .r{fill:#ff4d4d}.dcf-art .thin{stroke-width:1.5}.dcf-art .thick{stroke-width:3.4}.dcf-art .dcf-glint{fill:var(--dcf-bg);stroke:none}.dcf-art .dcf-shadow{fill:var(--dcf-ink);stroke:none;opacity:.14}.dcf-ground path{fill:none;stroke:var(--dcf-ink);stroke-width:2.4;stroke-linecap:round}.dcf-ground .dcf-tufts{stroke-width:1.8}.dcf-pebble{fill:var(--dcf-bg);stroke:var(--dcf-ink);stroke-width:1.6}.dcf-dust{fill:none;stroke:var(--dcf-ink);stroke-width:3;stroke-linecap:round;opacity:0}.dcf-hit{fill:transparent;stroke:none;cursor:pointer;outline:none}.dcf-hit:focus-visible{stroke:var(--dcf-ink);stroke-width:2.5;stroke-dasharray:6 6}.dcf-glyph{transform-box:fill-box;transform-origin:50% 100%}.dcf[data-interactive='1'] .dcf-glyph:hover{animation:dcf-jiggle .6s cubic-bezier(.3,1.5,.5,1)}.dcf-art.dcf-bob{animation:dcf-bob 3.2s ease-in-out infinite}.dcf-art.dcf-sway{transform-box:fill-box;transform-origin:50% 100%;animation:dcf-swing 4s ease-in-out infinite}.dcf-art.dcf-peck{transform-box:fill-box;transform-origin:50% 100%;animation:dcf-peck 5.5s ease-in-out infinite}.dcf-tail{transform-box:fill-box;transform-origin:0% 100%;animation:dcf-tail 2.8s ease-in-out infinite}.dcf-hopper{transform-box:fill-box;transform-origin:50% 100%}.dcf-hopper.is-hop{animation:dcf-hop .62s cubic-bezier(.3,.7,.4,1)}.dcf-arrive{transform-box:fill-box;transform-origin:50% 100%}.dcf-bubbles{position:absolute;inset:0;pointer-events:none;z-index:2}.dcf-bubble{position:absolute;transform:translate(-50%,-100%) rotate(-2deg);transform-origin:50% 100%;background:var(--dcf-bg);color:var(--dcf-ink);border:2px solid var(--dcf-ink);border-radius:16px;padding:7px 12px;font-size:13px;font-weight:700;line-height:1.25;white-space:nowrap;box-shadow:3px 3px 0 var(--dcf-ink);animation:dcf-bubble .32s cubic-bezier(.3,1.6,.5,1) both;margin-top:-4px}.dcf-bubble::after{content:'';position:absolute;left:50%;bottom:-9px;width:14px;height:14px;background:var(--dcf-bg);border-right:2px solid var(--dcf-ink);border-bottom:2px solid var(--dcf-ink);transform:translateX(-50%) rotate(45deg) skew(8deg,8deg)}.dcf-bubble.is-left{transform:translate(-88%,-100%) rotate(2deg);transform-origin:88% 100%}.dcf-bubble.is-left::after{left:88%}.dcf-doodles{position:absolute;inset:0;pointer-events:none;z-index:2;overflow:hidden}.dcf-doodle{position:absolute;left:0;top:0;pointer-events:auto;cursor:pointer;will-change:transform;touch-action:manipulation}.dcf-doodle-in{display:block;width:100%;height:100%}.dcf[data-interactive='0'] .dcf-doodle{pointer-events:none}.dcf-doodle svg,.dcf-icon{display:block;stroke:var(--dcf-ink);stroke-width:1.9;stroke-linejoin:round;stroke-linecap:round}.dcf-doodle svg{width:100%;height:100%;filter:drop-shadow(2px 2px 0 color-mix(in oklab,var(--dcf-ink) 18%,transparent))}.dcf-paperfill{fill:var(--dcf-bg)}.dcf-cta{position:relative;z-index:3;display:flex;flex-direction:column;align-items:center;gap:20px;padding:clamp(20px,3vw,34px) 0 clamp(30px,4vw,48px);text-align:center}.dcf-tagline{font-family:var(--dcf-serif);font-size:clamp(17px,1.9vw,22px);line-height:1.4;letter-spacing:-.005em;max-width:44ch;text-wrap:balance}.dcf-word{display:inline-block;white-space:pre}.dcf-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}.dcf-btn{display:inline-flex;align-items:center;gap:8px;height:46px;padding:0 20px 0 16px;border-radius:999px;border:2px solid var(--dcf-ink);font-size:14.5px;font-weight:750;letter-spacing:-.01em;box-shadow:0 3px 0 var(--dcf-ink);transition:transform .18s cubic-bezier(.3,1.4,.5,1),box-shadow .18s cubic-bezier(.3,1.4,.5,1)}.dcf-btn.is-outline{background:var(--dcf-bg);color:var(--dcf-ink)}.dcf-btn.is-solid{background:var(--dcf-ink);color:var(--dcf-bg);box-shadow:0 3px 0 var(--dcf-accent)}.dcf-btn.is-solid .dcf-icon{stroke:var(--dcf-bg)}.dcf-btn:hover{transform:translateY(-2px) rotate(-1.2deg);box-shadow:0 5px 0 var(--dcf-ink)}.dcf-btn.is-solid:hover{box-shadow:0 5px 0 var(--dcf-accent)}.dcf-btn:active{transform:translateY(2px);box-shadow:0 1px 0 var(--dcf-ink);transition-duration:.06s}.dcf-btn.is-solid:active{box-shadow:0 1px 0 var(--dcf-accent)}.dcf-btn:hover .dcf-icon{animation:dcf-wiggle .5s ease-in-out}.dcf-bar{position:relative;z-index:3;display:flex;flex-wrap:wrap;align-items:center;gap:10px 26px;padding:18px var(--dcf-pad) 22px;max-width:1360px;width:100%;margin:0 auto;border-top:1.5px dashed var(--dcf-line);font-size:13px}.dcf-copy{color:var(--dcf-soft);margin-right:auto}.dcf-inline{display:flex;flex-wrap:wrap;gap:4px 18px}.dcf-inline .dcf-link{font-size:13px}.dcf-socials .dcf-link{color:var(--dcf-ink);font-weight:700}.dcf-totop{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;padding:6px 12px;border-radius:999px;border:1.5px solid var(--dcf-ink);transition:transform .2s cubic-bezier(.3,1.5,.5,1)}.dcf-totop svg{fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.dcf-totop:hover{transform:translateY(-2px)}.dcf-totop:hover svg{animation:dcf-up .6s ease-in-out infinite}.dcf[data-play='0'] .dcf-letter,.dcf[data-play='0'] .dcf-arrive,.dcf[data-play='0'] .dcf-word,.dcf[data-play='0'] .dcf-pop,.dcf[data-play='0'] .dcf-rise,.dcf[data-play='0'] .dcf-fade,.dcf[data-play='0'] .dcf-doodle-in{opacity:0}.dcf[data-play='0'] .dcf-draw{stroke-dasharray:1;stroke-dashoffset:1}.dcf-letter{transform-box:fill-box;transform-origin:50% 100%}.dcf[data-play='1'] .dcf-letter{animation:dcf-stamp .62s cubic-bezier(.2,.8,.25,1.15) var(--d) both}.dcf[data-play='1'] .dcf-dust{animation:dcf-dust .5s ease-out calc(var(--d) + .22s) both}.dcf[data-play='1'] .dcf-draw{stroke-dasharray:1;animation:dcf-draw 1.1s cubic-bezier(.6,0,.3,1) var(--d) both}.dcf[data-play='1'] .dcf-fade{animation:dcf-fade .6s ease-out var(--d) both}.dcf[data-play='1'] .dcf-arrive-front{animation:dcf-rise-up .75s cubic-bezier(.3,1.5,.5,1) var(--d) both}.dcf[data-play='1'] .dcf-arrive-top{animation:dcf-plop .8s cubic-bezier(.3,.9,.4,1) var(--d) both}.dcf[data-play='1'] .dcf-arrive-behind{animation:dcf-peek .9s cubic-bezier(.3,1.4,.5,1) var(--d) both}.dcf[data-play='1'] .dcf-word{animation:dcf-word .6s cubic-bezier(.2,.8,.3,1) var(--d) both}.dcf[data-play='1'] .dcf-pop{animation:dcf-popin .55s cubic-bezier(.3,1.6,.5,1) var(--d) both}.dcf[data-play='1'] .dcf-rise{animation:dcf-fadeup .7s cubic-bezier(.2,.8,.3,1) var(--d) both}.dcf[data-play='1'] .dcf-doodle-in{animation:dcf-fade .6s ease-out var(--d) both}@keyframes dcf-stamp{0%{opacity:0;transform:translateY(-34%) scale(1.28) rotate(var(--r))}55%{opacity:1;transform:translateY(2%) scale(.95,1.05) rotate(0deg)}75%{transform:translateY(0) scale(1.04,.95)}100%{opacity:1;transform:none}}@keyframes dcf-dust{0%{opacity:0;stroke-dasharray:0 40}30%{opacity:.9}100%{opacity:0;stroke-dasharray:14 40;stroke-dashoffset:-16}}@keyframes dcf-draw{to{stroke-dashoffset:0}}@keyframes dcf-fade{from{opacity:0}to{opacity:1}}@keyframes dcf-rise-up{0%{opacity:0;transform:translateY(30%) scale(.7,.3)}45%{opacity:1;transform:translateY(-8%) scale(.92,1.12)}70%{transform:translateY(0) scale(1.08,.92)}100%{opacity:1;transform:none}}@keyframes dcf-plop{0%{opacity:0;transform:translateY(-90%)}50%{opacity:1;transform:translateY(0) scale(1.1,.86)}68%{transform:translateY(-10%) scale(.96,1.04)}84%{transform:translateY(0) scale(1.03,.97)}100%{opacity:1;transform:none}}@keyframes dcf-peek{0%{opacity:0;transform:translateY(55%)}60%{opacity:1;transform:translateY(-6%)}100%{opacity:1;transform:none}}@keyframes dcf-word{from{opacity:0;transform:translateY(.6em) rotate(3deg)}to{opacity:1;transform:none}}@keyframes dcf-popin{0%{opacity:0;transform:translateY(10px) scale(.6) rotate(-4deg)}100%{opacity:1;transform:none}}@keyframes dcf-fadeup{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}@keyframes dcf-jiggle{0%{transform:none}25%{transform:rotate(-4deg) scale(1.03,.97)}50%{transform:rotate(3deg) translateY(-3%)}75%{transform:rotate(-1.5deg)}100%{transform:none}}@keyframes dcf-hop{0%{transform:none}18%{transform:scale(1.12,.84)}45%{transform:translateY(-28%) scale(.94,1.08)}72%{transform:translateY(0) scale(1.1,.88)}86%{transform:scale(.97,1.03)}100%{transform:none}}@keyframes dcf-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes dcf-swing{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2.5deg)}}@keyframes dcf-peck{0%,62%,100%{transform:none}66%{transform:rotate(14deg) translateY(2px)}70%{transform:none}74%{transform:rotate(12deg) translateY(2px)}78%{transform:none}}@keyframes dcf-tail{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-12deg)}}@keyframes dcf-bubble{from{opacity:0;scale:.6}to{opacity:1;scale:1}}@keyframes dcf-wiggle{0%,100%{transform:none}30%{transform:rotate(-14deg) scale(1.15)}60%{transform:rotate(10deg)}}@keyframes dcf-up{0%,100%{transform:none}50%{transform:translateY(-3px)}}@media (max-width:860px){.dcf-top{grid-template-columns:1fr;grid-template-rows:auto}.dcf-brand,.dcf-blurb,.dcf-cols{grid-column:1;grid-row:auto}.dcf-cols{grid-template-columns:repeat(2,minmax(0,1fr));margin-top:14px;row-gap:22px}.dcf-copy{width:100%;margin-right:0}}@media (max-width:480px){.dcf-btn{height:42px;font-size:13.5px;padding:0 16px 0 13px}.dcf-bubble{font-size:12px;padding:6px 10px}.dcf-totop span{display:none}}@media (prefers-reduced-motion:reduce){.dcf *,.dcf *::before,.dcf *::after{animation:none!important;transition:none!important}.dcf .dcf-letter,.dcf .dcf-arrive,.dcf .dcf-word,.dcf .dcf-pop,.dcf .dcf-rise,.dcf .dcf-fade,.dcf .dcf-doodle-in{opacity:1!important}.dcf .dcf-draw{stroke-dashoffset:0!important}.dcf .dcf-dust{opacity:0!important}}";
function Nh() {
  return o.jsx("div", { className: "w-full", children: o.jsx(_h, {}) });
}
c(Nh, "Demo");
function Dh() {
  const D = new URL(window.location.href).searchParams.get("theme");
  return o.jsx(lh, { defaultTheme: D || "light", enableSystem: true, children: o.jsx("div", { className: "w-screen min-h-screen flex justify-center items-center", children: o.jsx(rh, {}) }) });
}
c(Dh, "App");
P1.createRoot(document.getElementById("root")).render(o.jsx(V1.StrictMode, { children: o.jsx(Dh, {}) }));
