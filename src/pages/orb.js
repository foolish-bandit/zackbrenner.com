export function mountOrb(canvas, opts = {}) {
  const ctx = canvas.getContext('2d', { alpha: true });
  let w = 0, h = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  let raf = null;
  const start = performance.now();
  let accent = opts.accent || '#C8502E';
  let mode = opts.mode || 'orb';

  function hexToRgb(hex) {
    const h = hex.replace('#', '');
    return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)];
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = Math.max(1, Math.floor(rect.width));
    h = Math.max(1, Math.floor(rect.height));
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function onMouse(e) {
    const rect = canvas.getBoundingClientRect();
    tmx = (e.clientX - rect.left) / rect.width - 0.5;
    tmy = (e.clientY - rect.top) / rect.height - 0.5;
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  window.addEventListener('mousemove', onMouse);
  resize();

  function drawOrb(t) {
    ctx.clearRect(0, 0, w, h);
    const cx = w * 0.5 + tmx * 20;
    const cy = h * 0.5 + tmy * 20;
    const R = Math.min(w, h) * 0.42;
    const [ar, ag, ab] = hexToRgb(accent);

    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.4);
    glow.addColorStop(0, `rgba(${ar},${ag},${ab},0.26)`);
    glow.addColorStop(0.45, `rgba(${ar},${ag},${ab},0.10)`);
    glow.addColorStop(1, `rgba(${ar},${ag},${ab},0)`);
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.lineWidth = 0.6;
    const rings = 42;
    for (let i = 0; i < rings; i++) {
      const p = i / rings;
      const r = R * (0.2 + p * 1.05);
      const alpha = 0.08 + (1 - p) * 0.24;
      ctx.beginPath();
      const segs = 140;
      for (let s = 0; s <= segs; s++) {
        const ang = (s / segs) * Math.PI * 2;
        const wob = Math.sin(ang * 3 + t * 0.0005 + i * 0.4) * 2.2
                  + Math.sin(ang * 7 - t * 0.0008 + i * 0.2) * 1.4;
        const rr = r + wob * (1 - p * 0.3);
        const x = Math.cos(ang) * rr;
        const y = Math.sin(ang) * rr;
        if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${ar},${ag},${ab},${alpha})`;
      ctx.stroke();
    }

    for (let i = 0; i < 8; i++) {
      const r = R * (0.35 + i * 0.08);
      ctx.beginPath();
      const segs = 220;
      for (let s = 0; s <= segs; s++) {
        const ang = (s / segs) * Math.PI * 2 + t * 0.00002 * (i % 2 ? 1 : -1);
        const wob = Math.sin(ang * (2 + i) + t * 0.00065) * (0.8 + i * 0.3);
        const rr = r + wob;
        const x = Math.cos(ang) * rr;
        const y = Math.sin(ang) * rr;
        if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(20,18,16,${0.05 + i * 0.01})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    ctx.restore();

    const oa = t * 0.00025;
    const ox = cx + Math.cos(oa) * R * 0.92;
    const oy = cy + Math.sin(oa) * R * 0.92;
    ctx.beginPath();
    ctx.arc(ox, oy, 3.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${ar},${ag},${ab},0.9)`;
    ctx.fill();

    ctx.save();
    ctx.strokeStyle = 'rgba(20,18,16,0.35)';
    ctx.lineWidth = 0.8;
    ctx.translate(cx, cy);
    ctx.beginPath();
    ctx.moveTo(-6, 0); ctx.lineTo(6, 0);
    ctx.moveTo(0, -6); ctx.lineTo(0, 6);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawLattice(t) {
    ctx.clearRect(0, 0, w, h);
    const [ar, ag, ab] = hexToRgb(accent);
    const cx = w * 0.5 + tmx * 30;
    const cy = h * 0.5 + tmy * 30;
    const R = Math.min(w, h) * 0.44;

    const spacing = 14;
    const cols = Math.ceil(w / spacing) + 2;
    const rows = Math.ceil(h / spacing) + 2;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const x0 = i * spacing;
        const y0 = j * spacing;
        const dx = x0 - cx, dy = y0 - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= R * 1.1) continue;
        const k = 1 - Math.min(1, dist / R);
        const warp = Math.sin(dist * 0.04 - t * 0.001) * 3 * k;
        const x = x0 + (dx / dist || 0) * warp;
        const y = y0 + (dy / dist || 0) * warp;
        const size = 0.6 + k * 1.6;
        const alpha = 0.1 + k * 0.5;
        const useAccent = k > 0.7;
        ctx.fillStyle = useAccent
          ? `rgba(${ar},${ag},${ab},${alpha})`
          : `rgba(20,18,16,${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawMasthead(t) {
    ctx.clearRect(0, 0, w, h);
    const [ar, ag, ab] = hexToRgb(accent);
    const cx = w * 0.8 + tmx * 40;
    const cy = h * 0.4 + tmy * 40;
    const R = Math.min(w, h) * 0.7;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    g.addColorStop(0, `rgba(${ar},${ag},${ab},0.18)`);
    g.addColorStop(0.5, `rgba(${ar},${ag},${ab},0.05)`);
    g.addColorStop(1, `rgba(${ar},${ag},${ab},0)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(20,18,16,0.25)';
    ctx.lineWidth = 0.6;
    const y = h * 0.5 + Math.sin(t * 0.0003) * 8;
    ctx.beginPath();
    ctx.moveTo(w * 0.1, y);
    ctx.lineTo(w * 0.9, y + Math.sin(t * 0.0005) * 2);
    ctx.stroke();
  }

  function tick(now) {
    mx += (tmx - mx) * 0.06;
    my += (tmy - my) * 0.06;
    const t = now - start;
    if (mode === 'lattice') drawLattice(t);
    else if (mode === 'masthead') drawMasthead(t);
    else drawOrb(t);
    raf = requestAnimationFrame(tick);
  }

  raf = requestAnimationFrame(tick);

  return {
    setAccent: (c) => { accent = c; },
    setMode: (m) => { mode = m; },
    destroy: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouse);
    },
  };
}
