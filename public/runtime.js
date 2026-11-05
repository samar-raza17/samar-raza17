if(document.readyState === 'loading'){document.addEventListener('DOMContentLoaded',()=>{try {


(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = document.getElementById('stage');
  const $ = id => document.getElementById(id);
  const INK = 0x161616;

  if (!window.THREE) { $('fallback').hidden = false; return; }
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
  catch (e) { $('fallback').hidden = false; return; }
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setClearColor(0x000000, 0);
  stage.appendChild(renderer.domElement);
  const canvas = renderer.domElement;
  const HERO_PHOTOS = ["https://avatars.githubusercontent.com/samar-raza17?size=800","data:image/webp;base64,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"];
  function loadTex(src) {
    return new Promise(res => {
      const im = new Image(); im.crossOrigin = 'anonymous'; im.crossOrigin = 'anonymous';
      im.onload = () => { const t = new THREE.Texture(im); t.encoding = THREE.sRGBEncoding; t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy()); t.needsUpdate = true; res(t); };
      im.onerror = () => res(null);
      im.src = src;
    });
  }
  let onScreen = true;
  new IntersectionObserver(es => { onScreen = es[0].isIntersecting; }).observe(stage);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(22, 1, 1, 400);
  const VIEW_H = 10;
  let viewW = 12;
  camera.position.set(0, 0, (VIEW_H / 2) / Math.tan(THREE.MathUtils.degToRad(11)));
  camera.lookAt(0, 0, 0);

  /* ---------- placeholder photos ---------- */
  const PHOTOS = [
    { a: '#2B59F0', b: '#FFB38A', fig: '#141A33', sun: '#FFE7D6', label: 'Portrait' },
    { a: '#4F7A62', b: '#ECE4CC', fig: '#1C241F', sun: '#F7F1DF', label: 'At work' },
    { a: '#F0A637', b: '#2E46A6', fig: '#1A1308', sun: '#FFF2C9', label: 'Hobby' },
    { a: '#C7647A', b: '#262A31', fig: '#F4E5E8', sun: '#FFD3DC', label: 'Candid' }
  ];
  function makePhoto(o, i) {
    const S = 1024, c = document.createElement('canvas');
    c.width = c.height = S;
    const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 0, S);
    g.addColorStop(0, o.a); g.addColorStop(1, o.b);
    x.fillStyle = g; x.fillRect(0, 0, S, S);
    x.globalAlpha = 0.6; x.fillStyle = o.sun;
    x.beginPath(); x.arc(720, 330, 210, 0, Math.PI * 2); x.fill(); x.globalAlpha = 1;
    x.fillStyle = 'rgba(255,255,255,0.16)';
    for (let k = 0; k < 6; k++) x.fillRect(0, 620 + k * 44, S, 14);
    x.fillStyle = o.fig;
    x.beginPath(); x.ellipse(512, 930, 330, 290, 0, Math.PI, 0); x.lineTo(842, S); x.lineTo(182, S); x.closePath(); x.fill();
    x.beginPath(); x.arc(512, 450, 150, 0, Math.PI * 2); x.fill();
    x.fillRect(462, 560, 100, 120);
    // doodle scribbles so tiles are easier to tell apart
    x.strokeStyle = 'rgba(255,255,255,0.85)'; x.lineWidth = 6; x.lineCap = 'round';
    x.beginPath(); x.moveTo(110, 520); x.bezierCurveTo(160, 470, 220, 560, 280, 500); x.stroke();
    x.beginPath(); x.arc(860, 720, 46, 0.3, Math.PI * 1.9); x.stroke();
    x.fillStyle = 'rgba(255,255,255,0.95)';
    x.font = '500 150px "Roboto Mono", monospace'; x.fillText('0' + (i + 1), 54, 190);
    x.font = '500 34px "Roboto Mono", monospace'; x.fillText('PLACEHOLDER: ' + o.label.toUpperCase(), 56, 975);
    const t = new THREE.CanvasTexture(c);
    t.encoding = THREE.sRGBEncoding;
    t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    return t;
  }

  /* ---------- shared materials ---------- */
  const sideMat = new THREE.MeshBasicMaterial({ color: INK });
  const edgeMat = new THREE.LineBasicMaterial({ color: INK, transparent: true });
  const tapeMat = new THREE.MeshBasicMaterial({ color: 0xEFE6C6, transparent: true, opacity: 0.88, depthWrite: false });
  const unitSquare = (() => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute([-.5,-.5,0, .5,-.5,0, .5,.5,0, -.5,.5,0], 3)); return g; })();

  /* ---------- state ---------- */
  let textures = [], photoIndex = 0;
  let N = 4, B = 6, s = 1.5;
  let pieces = [];
  let complete = false, playing = false, moves = 0, startTime = 0, zCounter = 1;
  let drag = null, hovered = null;
  const boardGroup = new THREE.Group(); scene.add(boardGroup);

  function buildBoard() {
    boardGroup.clear();
    const outline = new THREE.LineLoop(unitSquare.clone(), new THREE.LineDashedMaterial({ color: INK, dashSize: 0.018, gapSize: 0.016, transparent: true, opacity: 0.6 }));
    outline.computeLineDistances();
    boardGroup.add(outline);
    const pts = [];
    for (let k = 1; k < N; k++) { const t = -0.5 + k / N; pts.push(t, -0.5, 0, t, 0.5, 0, -0.5, t, 0, 0.5, t, 0); }
    const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    boardGroup.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.16 })));
    boardGroup.position.z = -0.01;
  }

  function slotOf(p) { return { x: -B / 2 + s * (p.c + 0.5), y: B / 2 - s * (p.r + 0.5) }; }

  function buildPieces(n) {
    pieces.forEach(p => { scene.remove(p.mesh); scene.remove(p.shadow); p.mesh.geometry.dispose(); p.front.dispose(); p.shadow.material.dispose(); });
    pieces = []; N = n;
    buildBoard(); layout();
    const tapeIdx = new Set([2, n * n - 2]);
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      const geo = new THREE.BoxGeometry(1, 1, 0.1);
      const uv = geo.attributes.uv;
      for (let i = 16; i < 20; i++) uv.setXY(i, (c + uv.getX(i)) / n, (n - 1 - r + uv.getY(i)) / n);
      uv.needsUpdate = true;
      const front = new THREE.MeshBasicMaterial({ map: textures[photoIndex] });
      const mesh = new THREE.Mesh(geo, [sideMat, sideMat, sideMat, sideMat, front, sideMat]);
      const edge = new THREE.LineLoop(unitSquare, edgeMat); edge.position.z = 0.051; mesh.add(edge);
      let tape = null;
      if (tapeIdx.has(r * n + c)) {
        tape = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.17), tapeMat);
        tape.position.set(0.12, 0.5, 0.06); tape.rotation.z = (r + c) % 2 ? 0.28 : -0.24;
        mesh.add(tape);
      }
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: INK, transparent: true, opacity: 0, depthWrite: false }));
      const p = { r, c, mesh, front, shadow, tape, placed: true, nx: 0, ny: 0, rz0: 0, x: 0, y: 0, tx: 0, ty: 0, rz: 0, lift: 0, tiltX: 0, tiltY: 0, seam: 0.97, zOrder: 0, flipStart: 0, flipTo: null, swapped: true, vx: 0, hx: 0, hy: 0, loose: 0 };
      const sl = slotOf(p); p.x = sl.x; p.y = sl.y;
      mesh.userData.piece = p;
      scene.add(shadow); scene.add(mesh); pieces.push(p);
    }
    complete = false; $('win').hidden = true; updateUI();
  }

  function layout() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, w < 600 ? 1.5 : 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    viewW = VIEW_H * camera.aspect;
    B = Math.min(viewW, VIEW_H) * (camera.aspect > 1.1 ? 0.6 : 0.56);
    s = B / N;
    boardGroup.scale.set(B, B, 1);
    boardGroup.position.y = 0;
  }

  const clampX = x => { const m = s * 0.6; return Math.max(-viewW / 2 + m, Math.min(viewW / 2 - m, x)); };
  const clampY = y => { const m = s * 0.6; return Math.max(-VIEW_H / 2 + m, Math.min(VIEW_H / 2 - m - s * 0.35, y)); };

  function looseSpot(taken) {
    let best = null, bestScore = -1;
    for (let t = 0; t < 70; t++) {
      const x = clampX((Math.random() - 0.5) * viewW), y = clampY((Math.random() - 0.5) * VIEW_H);
      const outside = Math.abs(x) > B / 2 + s * 0.4 || Math.abs(y) > B / 2 + s * 0.4;
      let minD = 99; for (const q of taken) minD = Math.min(minD, Math.hypot(q.x - x, q.y - y));
      const score = (outside ? 10 : 0) + Math.min(minD, s * 1.15);
      if (score > bestScore) { bestScore = score; best = { x, y }; }
    }
    return best;
  }

  function scatter(stagger) {
    complete = false; $('win').hidden = true;
    const taken = [];
    pieces.forEach((p, i) => {
      const spot = looseSpot(taken); taken.push(spot);
      const apply = () => { p.placed = false; p.nx = spot.x / viewW; p.ny = spot.y / VIEW_H; p.rz0 = (Math.random() - 0.5) * 0.36; p.zOrder = ++zCounter; updateUI(); };
      if (stagger && !reduced) setTimeout(apply, i * 30); else apply();
    });
    moves = 0; startTime = performance.now(); playing = true; updateUI();
  }

  function solve() {
    pieces.forEach((p, i) => {
      const apply = () => { p.placed = true; updateUI(); checkComplete(true); };
      if (!reduced) setTimeout(apply, i * 40); else apply();
    });
  }

  function nextPhoto() {
    photoIndex = (photoIndex + 1) % textures.length;
    const now = performance.now();
    pieces.forEach(p => { p.flipTo = textures[photoIndex]; p.swapped = false; p.flipStart = now + (reduced ? 0 : (p.r + p.c) * 60); });
    $('photoLabel').textContent = 'photo ' + (photoIndex + 1) + '/' + textures.length;
  }

  const placedCount = () => pieces.filter(p => p.placed).length;
  function checkComplete(viaSolve) {
    if (complete || !playing || placedCount() !== pieces.length) return;
    complete = true;
    const secs = Math.round((performance.now() - startTime) / 1000);
    const t = Math.floor(secs / 60) + ':' + String(secs % 60).padStart(2, '0');
    $('winText').textContent = viaSolve ? 'Solved for you. Try it yourself next?' : 'Nice! You put me together in ' + t + '.';
    $('win').hidden = false;
  }
  function updateUI() {
    $('count').textContent = String(placedCount()).padStart(2, '0') + '/' + String(pieces.length).padStart(2, '0');
    
  }

  /* ---------- pointer ---------- */
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), hit = new THREE.Vector3();
  function toWorld(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera); ray.ray.intersectPlane(plane, hit); return hit;
  }
  function pick(e) {
    toWorld(e);
    const hits = ray.intersectObjects(pieces.map(p => p.mesh), false);
    return hits.length ? hits[0].object.userData.piece : null;
  }
  canvas.addEventListener('pointerdown', e => {
    const p = pick(e); if (!p) return;
    e.preventDefault();
    const w = toWorld(e);
    drag = { p, ox: p.x - w.x, oy: p.y - w.y, lastX: w.x };
    p.tx = p.x; p.ty = p.y; p.placed = false; p.zOrder = ++zCounter;
    if (complete) { complete = false; $('win').hidden = true; }
    if (!playing) { playing = true; startTime = performance.now(); }
    canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing'; updateUI();
  });
  canvas.addEventListener('pointermove', e => {
    if (drag) {
      const w = toWorld(e);
      drag.p.tx = clampX(w.x + drag.ox); drag.p.ty = clampY(w.y + drag.oy);
      drag.p.vx = w.x - drag.lastX; drag.lastX = w.x; return;
    }
    const p = pick(e); hovered = p;
    if (p) { p.hx = (hit.x - p.x) / s; p.hy = (hit.y - p.y) / s; }
    canvas.style.cursor = p ? 'grab' : 'default';
  });
  function endDrag(e) {
    if (!drag) return;
    const p = drag.p, sl = slotOf(p);
    if (Math.hypot(p.tx - sl.x, p.ty - sl.y) < s * 0.42) p.placed = true;
    else { p.nx = p.tx / viewW; p.ny = p.ty / VIEW_H; p.rz0 = p.rz; }
    moves++; drag = null; canvas.style.cursor = 'grab';
    try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
    updateUI(); checkComplete(false);
  }
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('pointerleave', () => { if (!drag) hovered = null; });

  $('shuffleBtn').addEventListener('click', () => scatter(true));
  $('solveBtn').addEventListener('click', () => { if (!playing) { playing = true; startTime = performance.now(); } solve(); });
  $('photoBtn').addEventListener('click', nextPhoto);
  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 's' || e.key === 'S') scatter(true);
    if (e.key === 'n' || e.key === 'N') nextPhoto();
  });

  /* ---------- loop ---------- */
  const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  let last = performance.now();
  function tick(now) {
    requestAnimationFrame(tick);
    if (document.hidden || !onScreen) { last = now; return; }
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    const k = reduced ? 1 : 1 - Math.exp(-dt * 14);
    const kSlow = reduced ? 1 : 1 - Math.exp(-dt * 10);
    edgeMat.opacity += ((complete ? 0 : 1) - edgeMat.opacity) * kSlow;
    for (const p of pieces) {
      const isDrag = drag && drag.p === p;
      let tx, ty, trz;
      if (isDrag) { tx = p.tx; ty = p.ty; trz = p.rz * 0.85; }
      else if (p.placed) { const sl = slotOf(p); tx = sl.x; ty = sl.y; trz = 0; }
      else { tx = clampX(p.nx * viewW); ty = clampY(p.ny * VIEW_H); trz = p.rz0; }
      const kk = isDrag ? (reduced ? 1 : 1 - Math.exp(-dt * 30)) : k;
      p.x += (tx - p.x) * kk; p.y += (ty - p.y) * kk; p.rz += (trz - p.rz) * kSlow;

      const isHover = hovered === p && !drag;
      const tLift = isDrag ? s * 0.5 : isHover ? s * 0.12 : 0;
      p.lift += (tLift - p.lift) * kSlow;
      const tLoose = (p.placed && !isDrag) ? 0 : 1;
      p.loose += (tLoose - p.loose) * kSlow;

      let tTiltX = 0, tTiltY = 0;
      if (isHover) { tTiltX = -p.hy * 0.35; tTiltY = p.hx * 0.35; }
      if (isDrag) { tTiltY = Math.max(-0.35, Math.min(0.35, p.vx * 1.5)); p.vx *= 0.85; }
      p.tiltX += (tTiltX - p.tiltX) * kSlow; p.tiltY += (tTiltY - p.tiltY) * kSlow;
      p.seam += ((complete ? 1.0 : 0.97) - p.seam) * kSlow;

      let flip = 0;
      if (p.flipTo && now >= p.flipStart) {
        const ft = reduced ? 1 : Math.min(1, (now - p.flipStart) / 520), e2 = ease(ft);
        if (e2 >= 0.5 && !p.swapped) { p.front.map = p.flipTo; p.front.needsUpdate = true; p.swapped = true; }
        flip = e2 < 0.5 ? e2 * Math.PI : (e2 - 1) * Math.PI;
        if (ft >= 1) { p.flipTo = null; flip = 0; }
      }

      const baseZ = p.placed && !isDrag ? 0 : 0.02 + (p.zOrder % 4000) * 0.0004;
      p.mesh.position.set(p.x, p.y, baseZ + p.lift + s * 0.05);
      p.mesh.rotation.set(p.tiltX, p.tiltY + flip, p.rz);
      p.mesh.scale.set(s * p.seam, s * p.seam, s);
      if (p.tape) p.tape.visible = p.loose > 0.5;

      // hard "sticker" shadow, offset down-right; grows as the tile lifts
      const L = p.lift / s, off = s * (0.045 + L * 0.12) * p.loose;
      p.shadow.position.set(p.x + off, p.y - off * 1.15, 0.001 + baseZ * 0.5);
      p.shadow.rotation.z = p.rz;
      p.shadow.scale.set(s * p.seam, s * p.seam, 1);
      p.shadow.material.opacity = p.loose * (0.95 - L * 0.5);
    }
    renderer.render(scene, camera);
  }

  /* ---------- init ---------- */
  const breakpointN = () => stage.clientWidth < 520 ? 3 : 4;
  new ResizeObserver(() => {
    const n = breakpointN();
    if (n !== N && pieces.length) { buildPieces(n); if (playing) scatter(false); }
    else layout();
  }).observe(stage);

  const fontsReady = document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1500))]) : Promise.resolve();
  fontsReady.then(() => {
    Promise.all(HERO_PHOTOS.map(loadTex)).then(ts => {
      textures = ts.filter(Boolean);
      if (!textures.length) textures = PHOTOS.map(makePhoto);
      $('photoLabel').textContent = 'photo 1/' + textures.length;
      buildPieces(breakpointN());
      requestAnimationFrame(tick);
      if (!reduced) setTimeout(() => { if (!playing) scatter(true); }, 1600);
    });
  });
})();


} catch (err) { console.error('[Portfolio module 1]', err); }

try {

(() => {
  document.documentElement.classList.add('js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // nav: shadow once scrolled, squiggle under the section in view
  const nav = document.getElementById('siteNav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const links = [...document.querySelectorAll('.nav a.link')];
  const ids = ['home', 'work', 'ai', 'studio', 'about', 'skills', 'caps', 'kind-words', 'contact', 'play'];
  const map = { 'play': 'contact', 'skills': 'about', 'caps': 'about', 'kind-words': 'about' };
  const seen = new Map();
  const io = new IntersectionObserver(es => {
    es.forEach(e => seen.set(e.target.id, e.isIntersecting));
    const active = ids.find(id => seen.get(id));
    if (!active) return;
    const t = map[active] || active;
    links.forEach(a => a.classList.toggle('current', a.dataset.target === t));
  }, { rootMargin: '-40% 0px -55% 0px' });
  ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
  // gentle rise as sections arrive
  if (!reduced) {
    const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
})();

} catch (err) { console.error('[Portfolio module 2]', err); }

try {

(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) document.documentElement.classList.add('no-anim');

  /* "view" sticker that follows the cursor over project thumbnails */
  const cur = document.getElementById('viewCursor');
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.thumb').forEach(t => {
      t.addEventListener('pointerenter', () => cur.classList.add('on'));
      t.addEventListener('pointerleave', () => cur.classList.remove('on'));
      t.addEventListener('pointermove', e => { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; });
    });
  }

  /* Story TV: play the recording only while it is on screen */
  const vid = document.getElementById('storyVideo');
  if (vid && !reduced) {
    new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) vid.play().catch(() => {}); else vid.pause();
    }), { threshold: 0.35 }).observe(vid);
  }

  /* Spin the wheel */
  const PRIZES = [
    ['#E5484D', '100 coins', 'You won <b>100 coins</b>. Spend them wisely.'],
    ['#4CAF7A', 'chai chat', 'You won <b>a chai chat</b> with me. Say hello below!'],
    ['#FFC93C', 'case study', 'You won <b>the full case study</b>.'],
    ['#2B59F0', 'good mood', 'You won <b>+1 good mood</b>. Free, no claim needed.'],
    ['#8E5BD9', 'spin again', 'So close! <b>Spin again</b>, the wheel likes you.'],
    ['#F0A637', 'high five', 'You won <b>a high five</b>. Consider it given.']
  ];
  const wheel = document.getElementById('wheel'), btn = document.getElementById('wheelBtn'), out = document.getElementById('wheelResult');
  if (!wheel) return;
  const NS = 'http://www.w3.org/2000/svg', N = PRIZES.length, SEG = 360 / N, R = 92;
  const pt = (deg, r) => { const a = (deg - 90) * Math.PI / 180; return [Math.cos(a) * r, Math.sin(a) * r]; };
  let svg = `<circle r="100" fill="#FFFFFF" stroke="#161616" stroke-width="3"/>`;
  PRIZES.forEach(([c, label], i) => {
    const a0 = i * SEG, a1 = a0 + SEG, [x0, y0] = pt(a0, R), [x1, y1] = pt(a1, R);
    svg += `<path d="M0 0 L${x0.toFixed(2)} ${y0.toFixed(2)} A${R} ${R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z" fill="${c}" stroke="#161616" stroke-width="2"/>`;
    const mid = a0 + SEG / 2, [tx, ty] = pt(mid, 60);
    svg += `<text x="${tx.toFixed(2)}" y="${ty.toFixed(2)}" transform="rotate(${mid} ${tx.toFixed(2)} ${ty.toFixed(2)})" text-anchor="middle" dominant-baseline="middle" font-family="Roboto Mono, monospace" font-weight="500" font-size="11" fill="${c === '#FFC93C' ? '#161616' : '#FFFFFF'}">${label}</text>`;
  });
  for (let i = 0; i < 18; i++) { const [bx, by] = pt(i * 20, 96.5); svg += `<circle cx="${bx.toFixed(2)}" cy="${by.toFixed(2)}" r="2.6" fill="${i % 2 ? '#FFC93C' : '#FFFFFF'}" stroke="#161616" stroke-width="1"/>`; }
  wheel.innerHTML = svg;

  let rot = 0, spinning = false, pending = -1;
  const link = '<br><a href="https://rabbitxlogistics.com" target="_blank" rel="noopener">see how I designed it &#8599;</a>';
  function show(i) {
    out.innerHTML = PRIZES[i][2] + link;
    out.hidden = false; out.classList.remove('pop'); void out.offsetWidth; out.classList.add('pop');
    spinning = false; btn.querySelector('.wheel-hub').textContent = 'again';
  }
  btn.addEventListener('click', () => {
    if (spinning) return;
    spinning = true; out.hidden = true;
    const i = Math.floor(Math.random() * N);
    const centre = i * SEG + SEG / 2, jitter = (Math.random() - .5) * (SEG * .6);
    const need = ((360 - centre - jitter) - (rot % 360) + 720) % 360;
    rot += 360 * 5 + need;
    pending = i;
    if (reduced) { wheel.style.transform = `rotate(${rot}deg)`; show(i); return; }
    wheel.style.transform = `rotate(${rot}deg)`;
  });
  wheel.addEventListener('transitionend', () => { if (pending > -1) { const i = pending; pending = -1; show(i); } });
})();

} catch (err) { console.error('[Portfolio module 3]', err); }

try {

(() => {
  /* AI explorations: the kitten clip plays only while it is on screen */
  const v = document.getElementById('kittenCard');
  if (!v || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }), { threshold: 0.3 }).observe(v);
})();

} catch (err) { console.error('[Portfolio module 4]', err); }

try {

(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- skills: two taped strips sliding in opposite directions ---------- */
  const TOOLS = [
    ['Illustrator', '<path d="M5 19 L12 4 L19 19" /><path d="M8 14 H16"/>'],
    ['Photoshop', '<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 15 L9 10 L13 14 L16 11 L20 15"/>'],
    ['Figma', '<circle cx="9" cy="7" r="3"/><circle cx="15" cy="7" r="3"/><circle cx="9" cy="13" r="3"/><circle cx="15" cy="13" r="3"/><circle cx="9" cy="19" r="2.5"/>'],
    ['Framer', '<path d="M6 4 H18 V10 H12 L18 16 H12 V21 L6 16 V10 H12 Z"/>'],
    ['InDesign', '<rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M8 9 H16 M8 13 H16 M8 17 H12"/>'],
    ['After Effects', '<path d="M6 5 L19 12 L6 19 Z"/>'],
    ['Claude Code', '<path d="M5 7 L10 12 L5 17"/><path d="M12 17 H19"/>'],
    ['ChatGPT', '<path d="M4 6 H20 V16 H11 L6 20 V16 H4 Z"/>'],
    ['Spine 2D', '<circle cx="6" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="18" r="2"/><path d="M7.5 7.5 L10.5 10.5 M13.5 13.5 L16.5 16.5"/>'],
    ['Figma Make', '<path d="M12 3 L13.8 10.2 L21 12 L13.8 13.8 L12 21 L10.2 13.8 L3 12 L10.2 10.2 Z"/>']
  ];
  const ico = d => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="#161616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const strips = [...document.querySelectorAll('.skills .track')];
  strips.forEach(track => {
    const back = track.closest('.back');
    const set = TOOLS.map(([n, d]) => back
      ? `<span class="sk-tool">${n.toLowerCase()}<span class="sep">*</span></span>`
      : `<span class="sk-tool">${n}<span class="sep">&#10033;</span></span>`).join('');
    track.innerHTML = `<div class="set" style="display:flex">${set}</div>`;
    const w = track.firstElementChild.getBoundingClientRect().width || 1;
    const need = Math.ceil((innerWidth * 1.3) / w) + 1;
    track.innerHTML = Array.from({ length: need + 1 }, () => `<div class="set" style="display:flex">${set}</div>`).join('');
  });
  if (!reduced && strips.length) {
    const band = document.getElementById('skills');
    let x = [0, 0], last = performance.now(), boost = 0, lastY = scrollY, onScreen = false, hover = false;
    new IntersectionObserver(es => { onScreen = es[0].isIntersecting; }).observe(band);
    band.addEventListener('pointerenter', () => hover = true);
    band.addEventListener('pointerleave', () => hover = false);
    addEventListener('scroll', () => { boost = Math.min(6, boost + Math.abs(scrollY - lastY) * 0.02); lastY = scrollY; }, { passive: true });
    (function loop(now) {
      const dt = Math.min(50, now - last) / 1000; last = now;
      if (onScreen && !hover) {
        boost *= 0.94;
        strips.forEach((t, i) => {
          const setW = t.firstElementChild.getBoundingClientRect().width;
          const dir = t.closest('.back') ? 1 : -1;
          x[i] += dir * (60 + boost * 60) * dt;
          if (dir < 0 && x[i] <= -setW) x[i] += setW;
          if (dir > 0 && x[i] >= 0) x[i] -= setW;
          t.style.transform = `translateX(${x[i]}px)`;
        });
      }
      requestAnimationFrame(loop);
    })(last);
    strips.forEach((t, i) => { if (t.closest('.back')) x[i] = -t.firstElementChild.getBoundingClientRect().width; });
  }

  /* ---------- about: count up the sticky-note numbers ---------- */
  const counts = document.querySelectorAll('.count');
  if (!reduced) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; io.unobserve(e.target);
      const el = e.target, to = +el.dataset.to, t0 = performance.now();
      (function tick(n) { const k = Math.min(1, (n - t0) / 900); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); })(t0);
    }), { threshold: .6 });
    counts.forEach(c => { c.textContent = '0'; io.observe(c); });
  }

  /* ---------- kind words: a swipeable deck of cards ---------- */
  const deck = document.getElementById('deck');
  if (deck) {
    const cards = [...deck.querySelectorAll('.qcard')];
    const N = cards.length, countEl = document.getElementById('kwCount'), dots = [...document.querySelectorAll('#kwDots i')];
    let order = cards.map((_, i) => i), busy = false;
    const pose = [ 'translate(0,0) rotate(0deg)', 'translate(14px,16px) rotate(2.4deg)', 'translate(-12px,26px) rotate(-2.8deg)' ];
    function layout() {
      order.forEach((ci, depth) => {
        const c = cards[ci];
        c.style.zIndex = String(10 - depth);
        c.style.transform = pose[Math.min(depth, pose.length - 1)];
        c.setAttribute('aria-hidden', depth ? 'true' : 'false');
      });
      const top = order[0];
      countEl.textContent = `${String(top + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')}`;
      dots.forEach((d, i) => d.classList.toggle('on', i === top));
    }
    function next(dir = -1) {
      if (busy) return; busy = true;
      const c = cards[order[0]];
      c.style.transform = `translate(${dir * 120}%, 40px) rotate(${dir * 14}deg)`;
      c.style.opacity = '0';
      setTimeout(() => {
        order.push(order.shift());
        c.style.transition = 'none'; c.style.opacity = '1'; layout();
        void c.offsetWidth; c.style.transition = ''; busy = false;
      }, reduced ? 0 : 380);
    }
    function prev() {
      if (busy) return; busy = true;
      const ci = order.pop(); order.unshift(ci);
      const c = cards[ci];
      c.style.transition = 'none'; c.style.opacity = '0'; c.style.zIndex = '11';
      c.style.transform = 'translate(120%, 40px) rotate(14deg)';
      void c.offsetWidth; c.style.transition = '';
      requestAnimationFrame(() => { c.style.opacity = '1'; layout(); setTimeout(() => busy = false, 350); });
    }
    document.getElementById('kwNext').addEventListener('click', () => next(-1));
    document.getElementById('kwPrev').addEventListener('click', prev);
    deck.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next(-1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    });
    // drag / swipe the top card
    let drag = null;
    deck.addEventListener('pointerdown', e => {
      const c = cards[order[0]];
      if (busy || !c.contains(e.target) || e.button > 0) return;
      drag = { c, x0: e.clientX, y0: e.clientY, dx: 0, id: e.pointerId, moved: false };
      c.classList.add('dragging');
    });
    deck.addEventListener('pointermove', e => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
      if (!drag.moved && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) { end(true); return; } // let vertical scroll win
      if (Math.abs(dx) > 4 && !drag.moved) { drag.moved = true; try { deck.setPointerCapture(e.pointerId); } catch (_) {} }
      drag.dx = dx;
      drag.c.style.transform = `translate(${dx}px, ${Math.abs(dx) * .08}px) rotate(${dx * .04}deg)`;
    });
    function end(cancel) {
      if (!drag) return;
      const { c, dx } = drag; drag = null; c.classList.remove('dragging');
      if (!cancel && Math.abs(dx) > Math.min(120, deck.clientWidth * .22)) next(dx < 0 ? -1 : 1);
      else layout();
    }
    deck.addEventListener('pointerup', () => end(false));
    deck.addEventListener('pointercancel', () => end(true));
    layout();
  }

  /* ---------- studio: the two jewellery clips play while on screen ---------- */
  if (!reduced) {
    const vio = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }), { threshold: .35 });
    document.querySelectorAll('.st-vid').forEach(v => { v.preload = 'metadata'; vio.observe(v); });
  }

  /* ---------- contact: copy email ---------- */
  const copyBtn = document.getElementById('copyMail'), note = document.getElementById('copyNote');
  if (copyBtn) copyBtn.addEventListener('click', async () => {
    const mail = 'samarjs786@gmail.com';
    let ok = false;
    try { await navigator.clipboard.writeText(mail); ok = true; } catch (_) {
      const t = document.createElement('textarea'); t.value = mail; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select(); try { ok = document.execCommand('copy'); } catch (__) {} t.remove();
    }
    copyBtn.textContent = ok ? 'copied!' : 'copy';
    copyBtn.classList.toggle('done', ok);
    note.textContent = ok ? 'see you in my inbox' : 'select the address above to copy it';
    setTimeout(() => { copyBtn.textContent = 'copy'; copyBtn.classList.remove('done'); note.textContent = ''; }, 2400);
  });
})();

} catch (err) { console.error('[Portfolio module 5]', err); }

try {


(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const GOAL = 10;
  const $ = id => document.getElementById(id);

  /* ---------- best score (this browser only) ---------- */
  let best = 0;
  try { best = +localStorage.getItem('pb-snake-best') || 0; } catch (_) {}
  $('sn-best').textContent = best;

  /* ---------- board ---------- */
  const board = $('sn-board'), cv = $('sn-cv'), ctx = cv.getContext('2d');
  let COLS = 24, ROWS = 16, cell = 20, W = 0, H = 0, dpr = 1;
  function fit() {
    const r = board.getBoundingClientRect();
    if (state !== 'playing' && state !== 'paused') { const sq = innerWidth <= 640; COLS = sq ? 15 : 24; ROWS = sq ? 15 : 16; }
    dpr = Math.min(2, devicePixelRatio || 1);
    W = r.width; H = r.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cell = Math.min(W / COLS, H / ROWS);
    draw(1);
  }

  /* ---------- game state ---------- */
  let state = 'idle', snake = [], prev = [], dir = [1, 0], queue = [], food = null, score = 0, step = 140, acc = 0, last = 0, bursts = [], foodT = 0;
  const QUIPS = ['yum!', 'crunch!', 'tasty!', 'nom nom', 'so juicy', 'keep going!', 'halfway there!', 'getting long...', 'two more!', 'one more apple!'];
  function placeFood() {
    const free = [];
    for (let x = 0; x < COLS; x++) for (let y = 0; y < ROWS; y++) if (!snake.some(s => s[0] === x && s[1] === y)) free.push([x, y]);
    food = free[(Math.random() * free.length) | 0]; foodT = 0;
  }
  function reset() {
    const y = (ROWS / 2) | 0, x = Math.max(4, (COLS / 3) | 0);
    snake = [[x, y], [x - 1, y], [x - 2, y], [x - 3, y]]; prev = snake.map(s => s.slice());
    dir = [1, 0]; queue = []; score = 0; step = 140; acc = 0; bursts = [];
    $('sn-score').textContent = '0';
    placeFood();
  }
  function setState(s) {
    state = s;
    $('sn-startO').hidden = s !== 'idle';
    $('sn-pauseO').hidden = s !== 'paused';
    $('sn-overO').hidden = s !== 'over';
    $('sn-pauseBtn').hidden = s !== 'playing';
  }
  function start() { fit(); reset(); setState('playing'); board.focus({ preventScroll: true }); last = performance.now(); }
  function turn(dx, dy) {
    if (state === 'idle' || state === 'over' || state === 'dying') return;
    if (state === 'paused') { setState('playing'); last = performance.now(); }
    const ref = queue.length ? queue[queue.length - 1] : dir;
    if ((dx === -ref[0] && dy === -ref[1]) || (dx === ref[0] && dy === ref[1])) return;
    if (queue.length < 3) queue.push([dx, dy]);
  }
  function tick() {
    if (queue.length) dir = queue.shift();
    prev = snake.map(s => s.slice());
    const h = [snake[0][0] + dir[0], snake[0][1] + dir[1]];
    const hitWall = h[0] < 0 || h[1] < 0 || h[0] >= COLS || h[1] >= ROWS;
    const eating = food && h[0] === food[0] && h[1] === food[1];
    const body = eating ? snake : snake.slice(0, -1);
    if (hitWall || body.some(s => s[0] === h[0] && s[1] === h[1])) return end(false, hitWall);
    snake.unshift(h);
    if (eating) {
      prev.push(prev[prev.length - 1].slice());
      score++; step = Math.max(80, step - 5);
      $('sn-score').textContent = score;
      const chip = $('sn-scoreChip'); chip.classList.remove('pop'); void chip.offsetWidth; chip.classList.add('pop');
      if (!reduced) for (let k = 0; k < 9; k++) bursts.push({ x: food[0], y: food[1], a: k / 9 * Math.PI * 2, t: 0, c: k % 2 ? '#E5484D' : '#4CAF7A' });
      if (score >= GOAL) { food = null; return end(true); }
      toast(`<b>${QUIPS[score - 1]}</b> ${score} / ${GOAL} apples`);
      placeFood();
    } else snake.pop();
  }
  function end(won, wall) {
    const isBest = score > best;
    if (isBest) { best = score; $('sn-best').textContent = best; try { localStorage.setItem('pb-snake-best', String(best)); } catch (_) {} }
    $('sn-finalScore').textContent = score;
    $('sn-newBest').hidden = !isBest || score === 0 || won;
    $('sn-overTitle').textContent = won ? 'You found all 10 apples!' : wall ? 'Oops, you hit the edge.' : 'Oops, you bit your own tail.';
    $('sn-overMsg').innerHTML = won ? 'Just like old times. Now leave a note on the notepad so I know you were here.' : score >= 7 ? 'So close! Have another go?' : 'Happens to the best of us. Have another go?';
    $('sn-againBtn').textContent = won ? 'play again' : 'try again';
    if (won && !reduced) for (let k = 0; k < 40; k++) bursts.push({ x: snake[0][0], y: snake[0][1], a: Math.random() * Math.PI * 2, t: -Math.random() * .6, c: ['#E5484D', '#FFE45C', '#2B59F0', '#4CAF7A'][k % 4], big: true });
    state = 'dying';
    setTimeout(() => setState('over'), reduced ? 0 : won ? 900 : 450);
  }
  let toastT;
  function toast(html) {
    const el = $('sn-toast'); el.innerHTML = html; el.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), 1400);
  }

  /* ---------- drawing ---------- */
  const PEN = '#2B59F0', INK = '#161616';
  const ox = () => (W - cell * COLS) / 2, oy = () => (H - cell * ROWS) / 2;
  function cxy(p) { return [(p[0] + .5) * cell + ox(), (p[1] + .5) * cell + oy()]; }
  function apple(x, y, r, rot) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    // shadow offset like the rest of the stickers
    const body = () => { ctx.beginPath(); ctx.moveTo(0, -r * .62); ctx.bezierCurveTo(r * .55, -r * 1.05, r * 1.15, -r * .55, r * .98, r * .18); ctx.bezierCurveTo(r * .85, r * .9, r * .3, r * 1.05, 0, r * .84); ctx.bezierCurveTo(-r * .3, r * 1.05, -r * .85, r * .9, -r * .98, r * .18); ctx.bezierCurveTo(-r * 1.15, -r * .55, -r * .55, -r * 1.05, 0, -r * .62); ctx.closePath(); };
    ctx.save(); ctx.translate(2, 2); body(); ctx.fillStyle = INK; ctx.fill(); ctx.restore();
    body(); ctx.fillStyle = '#E5484D'; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = INK; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(-r * .45, -r * .2, r * .14, r * .26, -.5, 0, 7); ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, -r * .6); ctx.quadraticCurveTo(r * .05, -r * .95, r * .2, -r * 1.12); ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(r * .1, -r * .88); ctx.quadraticCurveTo(r * .55, -r * 1.3, r * .85, -r * .95); ctx.quadraticCurveTo(r * .45, -r * .7, r * .1, -r * .88); ctx.fillStyle = '#4CAF7A'; ctx.fill(); ctx.lineWidth = 1.6; ctx.stroke();
    ctx.restore();
  }
  function draw(k) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (cell < 6) return;
    ctx.fillStyle = 'rgba(22,22,22,.16)';
    for (let x = 0; x < COLS; x++) for (let y = 0; y < ROWS; y++) { const [px, py] = cxy([x, y]); ctx.beginPath(); ctx.arc(px, py, Math.max(1, cell * .05), 0, 7); ctx.fill(); }
    if (!snake.length) { idleDoodle(); return; }
    if (food) {
      const [fx, fy] = cxy(food), bob = reduced ? 0 : Math.sin(foodT * 4) * cell * .05, g = reduced ? 1 : Math.min(1, foodT * 5);
      apple(fx, fy + bob, cell * .4 * (g < 1 ? .4 + g * .6 : 1), -.12);
    }
    const pts = snake.map((s, i) => { const p = prev[i] || s, a = cxy(p), b = cxy(s); return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]; });
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
    ctx.strokeStyle = INK; ctx.lineWidth = cell * .72; ctx.stroke();
    ctx.strokeStyle = PEN; ctx.lineWidth = cell * .72 - 4; ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.28)'; ctx.lineWidth = cell * .14; ctx.stroke();
    const [hx, hy] = pts[0], dying = state === 'dying' || state === 'over', won = score >= GOAL;
    ctx.beginPath(); ctx.arc(hx, hy, cell * .46, 0, 7); ctx.fillStyle = PEN; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = INK; ctx.stroke();
    const [dx, dy] = dir, px = -dy, py = dx;
    for (const side of [-1, 1]) {
      const ex = hx + dx * cell * .12 + px * side * cell * .2, ey = hy + dy * cell * .12 + py * side * cell * .2;
      ctx.beginPath(); ctx.arc(ex, ey, cell * .13, 0, 7); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = INK; ctx.stroke();
      if (dying && !won) { const r = cell * .08; ctx.beginPath(); ctx.moveTo(ex - r, ey - r); ctx.lineTo(ex + r, ey + r); ctx.moveTo(ex + r, ey - r); ctx.lineTo(ex - r, ey + r); ctx.lineWidth = 1.6; ctx.stroke(); }
      else if (dying && won) { ctx.beginPath(); ctx.arc(ex, ey + cell * .03, cell * .07, Math.PI * 1.1, Math.PI * 1.9); ctx.lineWidth = 1.8; ctx.stroke(); }
      else { ctx.beginPath(); ctx.arc(ex + dx * cell * .04, ey + dy * cell * .04, cell * .065, 0, 7); ctx.fillStyle = INK; ctx.fill(); }
    }
    if (!dying && !reduced && (performance.now() % 1800) < 220) {
      const tx = hx + dx * cell * .46, ty = hy + dy * cell * .46, L = cell * .26;
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx + dx * L, ty + dy * L);
      ctx.moveTo(tx + dx * L, ty + dy * L); ctx.lineTo(tx + dx * cell * .34 + px * cell * .08, ty + dy * cell * .34 + py * cell * .08);
      ctx.moveTo(tx + dx * L, ty + dy * L); ctx.lineTo(tx + dx * cell * .34 - px * cell * .08, ty + dy * cell * .34 - py * cell * .08);
      ctx.strokeStyle = '#E5484D'; ctx.lineWidth = 2; ctx.stroke();
    }
    bursts.forEach(b => {
      if (b.t < 0) return;
      const [bx, by] = cxy([b.x, b.y]), sc = b.big ? 4 : 1.4, r1 = cell * (.5 + b.t * sc), r2 = r1 + cell * .3 * (1 - b.t);
      ctx.beginPath(); ctx.moveTo(bx + Math.cos(b.a) * r1, by + Math.sin(b.a) * r1); ctx.lineTo(bx + Math.cos(b.a) * r2, by + Math.sin(b.a) * r2);
      ctx.strokeStyle = b.c; ctx.globalAlpha = 1 - b.t; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.stroke(); ctx.globalAlpha = 1;
    });
  }
  function idleDoodle() {
    const y = H * .8, amp = cell * .6, t = reduced ? 0 : performance.now() / 600;
    ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const x = W * .14 + (W * .56) * i / 40; ctx.lineTo(x, y + Math.sin(i / 40 * Math.PI * 3 + t) * amp); }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = cell * .7; ctx.stroke(); ctx.strokeStyle = PEN; ctx.lineWidth = cell * .7 - 4; ctx.stroke();
    apple(W * .82, y - cell * .2, cell * .42, -.12);
  }

  /* ---------- loop ---------- */
  let visible = true;
  function loop(now) {
    const dt = Math.min(100, now - last); last = now;
    if (state === 'playing' && visible) { acc += dt; while (acc >= step && state === 'playing') { acc -= step; tick(); } }
    if (state !== 'paused') foodT += dt / 1000;
    bursts.forEach(b => b.t += dt / (b.big ? 900 : 450)); bursts = bursts.filter(b => b.t < 1);
    draw(state === 'playing' && !reduced ? Math.min(1, acc / step) : 1);
    requestAnimationFrame(loop);
  }

  /* ---------- input ---------- */
  const KEYS = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0], W: [0, -1], S: [0, 1], A: [-1, 0], D: [1, 0] };
  addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input, textarea')) return;   // typing in the notepad
    const active = state === 'playing' || state === 'paused' || state === 'dying';
    const focused = document.activeElement === board || board.contains(document.activeElement);
    if (KEYS[e.key]) {
      if ((state === 'idle' || state === 'over') && focused) { e.preventDefault(); start(); turn(...KEYS[e.key]); return; }
      if (active) { e.preventDefault(); turn(...KEYS[e.key]); }
    }
    if (e.key === ' ' && (active || focused)) {
      e.preventDefault();
      if (state === 'playing') setState('paused'); else if (state === 'paused') { setState('playing'); last = performance.now(); }
      else if (state === 'idle' || state === 'over') start();
    }
    if (e.key === 'Escape' && state === 'playing') setState('paused');
  });
  let sw = null;
  board.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') sw = { x: e.clientX, y: e.clientY }; });
  board.addEventListener('pointermove', e => {
    if (!sw) return;
    const dx = e.clientX - sw.x, dy = e.clientY - sw.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 22) return;
    if (Math.abs(dx) > Math.abs(dy)) turn(Math.sign(dx), 0); else turn(0, Math.sign(dy));
    sw = { x: e.clientX, y: e.clientY };
  });
  const endSwipe = () => { sw = null; };
  board.addEventListener('pointerup', endSwipe); board.addEventListener('pointercancel', endSwipe);
  document.querySelectorAll('.sn-dpad button').forEach(b => b.addEventListener('pointerdown', e => {
    e.preventDefault(); const [x, y] = b.dataset.dir.split(',').map(Number);
    if (state === 'idle' || state === 'over') start();
    turn(x, y);
  }));
  $('sn-playBtn').addEventListener('click', start);
  $('sn-againBtn').addEventListener('click', start);
  $('sn-resumeBtn').addEventListener('click', () => { setState('playing'); last = performance.now(); board.focus({ preventScroll: true }); });
  $('sn-pauseBtn').addEventListener('click', () => setState('paused'));
  if (coarse) $('sn-keysHint').textContent = 'swipe on the board or use the arrow buttons';

  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (!visible && state === 'playing') setState('paused'); }, { threshold: .3 }).observe(board);
  document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'playing') setState('paused'); });
  new ResizeObserver(fit).observe(board);

  /* ---------- guestbook notepad: people write whatever they like ---------- */
  // Notes are shared through Firestore (REST, no SDK). The web API key is public by design; the
  // security rules only allow reading and creating short notes. Without config, notes stay in this browser.
  const FIREBASE = { projectId: '', apiKey: '' };
  const FS = FIREBASE.projectId && FIREBASE.apiKey
    ? `https://firestore.googleapis.com/v1/projects/${FIREBASE.projectId}/databases/(default)/documents` : '';
  const KEY = 'samar-guestbook-v1';
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(KEY) || '[]'); if (!Array.isArray(saved)) saved = []; } catch (_) { saved = []; }
  const list = $('sn-entries'), pad = $('sn-notepad'), pen = $('sn-pen');
  function addEntry(txt, fresh) {
    $('sn-empty').hidden = true;
    const li = document.createElement('li'), sp = document.createElement('span');
    sp.textContent = txt; li.appendChild(sp); if (fresh) li.classList.add('new');
    list.appendChild(li); return li;
  }
  function showAll(notes) {
    list.querySelectorAll('li:not(#sn-empty)').forEach(li => li.remove());
    $('sn-empty').hidden = notes.length > 0;
    notes.forEach(t => addEntry(t, false));
  }
  async function loadShared() {
    const r = await fetch(`${FS}:runQuery?key=${FIREBASE.apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ structuredQuery: { from: [{ collectionId: 'guestbook' }], orderBy: [{ field: { fieldPath: 'at' }, direction: 'DESCENDING' }], limit: 50 } }) });
    if (!r.ok) throw new Error(r.status);
    return (await r.json()).map(x => x.document && x.document.fields.note.stringValue).filter(Boolean).reverse();
  }
  function saveShared(txt) {
    const id = Array.from(crypto.getRandomValues(new Uint8Array(10)), b => b.toString(16).padStart(2, '0')).join('');
    return fetch(`${FS}:commit?key=${FIREBASE.apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ writes: [{ update: { name: `projects/${FIREBASE.projectId}/databases/(default)/documents/guestbook/${id}`, fields: { note: { stringValue: txt } } },
        currentDocument: { exists: false }, updateTransforms: [{ fieldPath: 'at', setToServerValue: 'REQUEST_TIME' }] }] }) })
      .then(r => { if (!r.ok) throw new Error(r.status); });
  }
  showAll(saved);
  if (FS) loadShared().then(showAll).catch(() => {});
  let writing = false;
  function penRest() {
    if (writing) return;
    pen.getAnimations().forEach(a => a.cancel());
    pen.style.left = (pad.clientWidth - 150) + 'px'; pen.style.top = (pad.clientHeight - 8) + 'px'; pen.style.transform = 'rotate(-28deg)';
  }
  function penWrite(span, dur) {
    if (reduced) return;
    writing = true;
    const pr = pad.getBoundingClientRect(), rects = span.getClientRects(), first = rects[0], lastR = rects[rects.length - 1];
    const tipX = 176 * .96, tipY = 35 / 2, frames = [];
    const lines = [...rects];
    lines.forEach((r, li) => {
      for (let i = 0; i <= 6; i++) {
        const x = r.left - pr.left + r.width * i / 6, y = r.top - pr.top + r.height * .75;
        frames.push({ left: (x - tipX) + 'px', top: (y - tipY + (i % 2 ? -3 : 2)) + 'px', transform: 'rotate(-38deg)' });
      }
    });
    const from = { left: pen.style.left, top: pen.style.top, transform: 'rotate(-28deg)' };
    const a = pen.animate([from, frames[0]], { duration: 260, easing: 'ease-out', fill: 'forwards' });
    a.onfinish = () => {
      const b = pen.animate(frames, { duration: dur, easing: 'linear', fill: 'forwards' });
      b.onfinish = () => { const c = pen.animate([frames[frames.length - 1], from], { duration: 380, easing: 'ease-in-out', fill: 'forwards' }); c.onfinish = () => { writing = false; penRest(); }; };
    };
  }
  pad.addEventListener('submit', e => {
    e.preventDefault();
    const inp = $('sn-note'), txt = inp.value.trim().replace(/\s+/g, ' ');
    if (!txt) { $('sn-err').hidden = false; inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake'); inp.focus(); return; }
    $('sn-err').hidden = true;
    const dur = Math.min(2200, 400 + txt.length * 30);
    const li = addEntry(txt, true); li.style.setProperty('--dur', dur + 'ms');
    li.scrollIntoView({ block: 'nearest' });
    requestAnimationFrame(() => penWrite(li.firstChild, dur));
    saved.push(txt); try { localStorage.setItem(KEY, JSON.stringify(saved.slice(-50))); } catch (_) {}
    if (FS) saveShared(txt).catch(() => {});
    inp.value = '';
  });
  $('sn-note').addEventListener('input', () => { $('sn-err').hidden = true; });
  new ResizeObserver(penRest).observe(pad);

  window.__snake = { get state() { return state; }, get score() { return score; }, get snake() { return snake; }, get food() { return food; }, turn, start };
  setState('idle'); fit(); penRest(); requestAnimationFrame(t => { last = t; loop(t); });
})();

(() => { const t = document.getElementById('top'); if (t) t.onclick = () => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); })();

} catch (err) { console.error('[Portfolio module 6]', err); }}, {once:true});}else{try {


(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = document.getElementById('stage');
  const $ = id => document.getElementById(id);
  const INK = 0x161616;

  if (!window.THREE) { $('fallback').hidden = false; return; }
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
  catch (e) { $('fallback').hidden = false; return; }
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setClearColor(0x000000, 0);
  stage.appendChild(renderer.domElement);
  const canvas = renderer.domElement;
  const HERO_PHOTOS = ["https://avatars.githubusercontent.com/samar-raza17?size=800","data:image/webp;base64,UklGRpoIAABXRUJQVlA4II4IAADQJwCdASpkAGQAPpU8l0gloyIhMlLs8LASiWgAznHaW15q/ffNosX+L3uYyUL3cRc6/p2fogUCX3n34+Wf4ZLdp04K5xDC7TtaAHjCaNnqv2EP1eIFh0PxK0mmHW7yFOth+w7ZKOrGDJQduNF5SSBtkQ6nRFzIiwGwoyMro2mPwGwZ7KT3PHuo3B7f5W/Jha2O9cqmo5CrbHj4eVF0Nj2YVqAWiMwYyX3pkbpE1xOLpQQzU2trdYPVUNzj5umjGfZedP2jIGGhOpi3QKitalbMUinAehOLVYxYuyZ4AePoJq+T/Vc1dSR6fk0UaMNvlpy1waCcJbhwb5I0QWTRFsS9FmrurfiGsXyv83WWDoynYbkr4zaHNxQVj3YHes9OEgm5pXiFbJKqb9i/7XyHPVFZczRKEZ1XuvcmwyFDuS55rqN6hkb02gAA/vR6MYRrb2oM4rj2vDK1qVQhinMg72SoxCtKVtQXcx/+kJ591orR+AC5CHXQ48rYxXgdgb3ddemt/hT+wo/NdImdKxM99oZ8e0ufDWKmlqGeof4/daEKPqd3WW4aHfXXntsl0ahOZwhdTvfuSSPfTm9c4/HU2A+tYNbrxZQG+IxIfwCUMfQ0KRjU+zeSS442UgJINQXxQuWFb+eW2rmSGxl6L+H57Ax/BpGOMpBq7fijGo4zl/mbtT4PGa01RcMatsF+szxSAaFEam6RUjcRJR/trCuJkvBgs4p2g5vF5po1Vy3I6AZ+D9xnuPzR4YlhadSGOi35S9n+WvpE/RAA/gKw2SuRV2dbOz4pTPLvRj6SHzM4Z25zYqPoj9SUifq5l2j0nGRqIvwUWBcJn022vVUe4l8vr5yaWi6QyqrQQQgbjKSxFlGanjj9aujvwg0+zQ1ac/nBMqnN37nH71v5CaFg0Yl+lNCYmr4ep8TUtu9j6jJ8DOGkbjNwoz7836rkFaD7sEodec15g4KEDacszuRXP+9Whukctf9+zGfC3bxw1e+8vJN5dqJodYriZNOElscxwrbiUqmDWwT2GiNrLq4hKM6B+39SUJYq6n7AOLKZOehHLK7GiTaPQmpDWDppcCx2JC3eO3Cx3ZNPcQB729QmknZWM4o0TsHyLm269An2xaywySmuY1iACsGnLW09uhClgmwoSnehJuHy38iOpavH1hALCQnR7qevuPwqHk0QuPwqmDN3xgT7cdsZr9cccGuFs8I8IbpvYyhLb5Q6hxOwh+HPid/9bIUoCtgakbDheMW8cVKsZOQkY8e3c3Jqs4ekSSizBTgddgnF8fkNZOWMYzlSJ40EYMl9tndKIY2/dOWe/HX/hGRMwrc+R9BfCLoZMObKFuT1teNJAqYO9ZTaUh4px8np0Hd6MbsAQbTztDNF8PJ9VjTQBuoFBNUXVFiXIZ2Kyy0jikv3ErYy5u6lTgGcPoapRPTrMyB8gP5JjHj97rvXEXR2EWOKq6WI3/hBue4fid7RfW191tgNAkUB2ghSt9jhVzpcXQuTCN5+Dlbcu69YzNI6dhOke8cmsU8zq6HR7wBs8J+BJ9qm3MAOHGrj3KTGKey1xPewo001nG+m7zPPnDyPtw3NcKahCv/jC6L9Nnn6iVe52qPvKqZA7cBHlSmf/geaUA3arKNXlrSZ/Xd3C+d+LwwCoYAveJAWL/r8pcfcB2HhhlZFeVHKnTayGHj+r1YTCAMy3tDfGRZjkzT2ocaTtdJYTABrhY/8JRH3reDxid73Z1kWChgQ7xeaFe55CDolls4E//gFUqflYsXbxc7qDRaz3xomA2SpE7MKEU3hajb0OFXHzmIwv2g9n896Uo37CuML4AAfdoYW8GuMf8iVWFEHk8zmWgHsauWvOHQBm6e6U/atY3+sbM3FRe0FKmL7vGgaKS+tV4FL2PFzphXNFdwdnTtPA7RufDAXXGbJ98raJr1GuCLvgfG7DOW5gn5TvFCE5ByUgKAHgUl9p+pMU1WTPBdhUeoC+KYv8L9OOBCCmmCQB5xP6n9tNFKgpkQgWWYd/UysAHiFA5tNYLESyQ7tisfvIKT0ePfqusrCqjvSvgy/Dx/TnS3Cxo0dmFp76voD3Hf+NI/kynWskPGVrPDvGoI1zKhrpkt8eu76OaX4hZ91bQUdYSOfzE8exWdroKuVRYWcBYCFMH4CZbYG86uGNdIN9CkJ5NzwRCt9mUwfVv38lTIviiWcSWMxfn/kcgvoXErMkNjrkMHr4n9EluL6U1/KCuAQGtjMHOOaMu6DPWFF5W6o18VDeZzsVavLB+uU0QJvIlO29WXOjvzMEUlF9dZGF//DfksYvtDQKe5haP3GTfH8A1gSXjuqXr9Nxzp5ahl8W2qWqGkaVI5uM7u+ZA/sFPaIWy36l3heXfSq4nvtxnceNpCsQ0lov58MQe89pGuNLXApOf4VbIxpuSII1lmSXYLF/B9qzojnxsMJkIazuETb/pc95K9Lf6ki7l8KtMqFSr4Z9hF3hMVmGArmRsCuZY4JA6GCujMdvgWPHgfimyzONXPU3y9lk5MQc9D7xK9cp+3emnFX3yIN2gUrVO2B8JFGUX0sgc/D3x63AQKCEY+d/N9kJi3QXs0gd9eltlQt8zh8hioyuSiOF3etdaWxUO5pfdAMcIfe368CJJA+xf5R6wR8YBdVk2Mt45JUrFfokmWUQ+pgmvwO8xg8b9xmwDTsa0gBTqbKfOPm8CQr09GZH2Wd5EG4rqewZKPG4w0E8xwpGkj8qSqGp+yxawUwwy3Vy7WfaQe52y+9vtFAirvvNYuIW/cjXdTfiEf4WrMAm8nSfPKcV4QkL/52BUYk0tmM5NsX8CrAvoh61E1ezs283RA2//lWqEUQWnhraelGkPpftQDQ2EYeO4tKEQ8y2Lt/IhIbeYx0HSe2CI6+hLoWDemQB5BqAP82E7phEAAAAAAAAAA="];
  function loadTex(src) {
    return new Promise(res => {
      const im = new Image(); im.crossOrigin = 'anonymous'; im.crossOrigin = 'anonymous';
      im.onload = () => { const t = new THREE.Texture(im); t.encoding = THREE.sRGBEncoding; t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy()); t.needsUpdate = true; res(t); };
      im.onerror = () => res(null);
      im.src = src;
    });
  }
  let onScreen = true;
  new IntersectionObserver(es => { onScreen = es[0].isIntersecting; }).observe(stage);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(22, 1, 1, 400);
  const VIEW_H = 10;
  let viewW = 12;
  camera.position.set(0, 0, (VIEW_H / 2) / Math.tan(THREE.MathUtils.degToRad(11)));
  camera.lookAt(0, 0, 0);

  /* ---------- placeholder photos ---------- */
  const PHOTOS = [
    { a: '#2B59F0', b: '#FFB38A', fig: '#141A33', sun: '#FFE7D6', label: 'Portrait' },
    { a: '#4F7A62', b: '#ECE4CC', fig: '#1C241F', sun: '#F7F1DF', label: 'At work' },
    { a: '#F0A637', b: '#2E46A6', fig: '#1A1308', sun: '#FFF2C9', label: 'Hobby' },
    { a: '#C7647A', b: '#262A31', fig: '#F4E5E8', sun: '#FFD3DC', label: 'Candid' }
  ];
  function makePhoto(o, i) {
    const S = 1024, c = document.createElement('canvas');
    c.width = c.height = S;
    const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 0, S);
    g.addColorStop(0, o.a); g.addColorStop(1, o.b);
    x.fillStyle = g; x.fillRect(0, 0, S, S);
    x.globalAlpha = 0.6; x.fillStyle = o.sun;
    x.beginPath(); x.arc(720, 330, 210, 0, Math.PI * 2); x.fill(); x.globalAlpha = 1;
    x.fillStyle = 'rgba(255,255,255,0.16)';
    for (let k = 0; k < 6; k++) x.fillRect(0, 620 + k * 44, S, 14);
    x.fillStyle = o.fig;
    x.beginPath(); x.ellipse(512, 930, 330, 290, 0, Math.PI, 0); x.lineTo(842, S); x.lineTo(182, S); x.closePath(); x.fill();
    x.beginPath(); x.arc(512, 450, 150, 0, Math.PI * 2); x.fill();
    x.fillRect(462, 560, 100, 120);
    // doodle scribbles so tiles are easier to tell apart
    x.strokeStyle = 'rgba(255,255,255,0.85)'; x.lineWidth = 6; x.lineCap = 'round';
    x.beginPath(); x.moveTo(110, 520); x.bezierCurveTo(160, 470, 220, 560, 280, 500); x.stroke();
    x.beginPath(); x.arc(860, 720, 46, 0.3, Math.PI * 1.9); x.stroke();
    x.fillStyle = 'rgba(255,255,255,0.95)';
    x.font = '500 150px "Roboto Mono", monospace'; x.fillText('0' + (i + 1), 54, 190);
    x.font = '500 34px "Roboto Mono", monospace'; x.fillText('PLACEHOLDER: ' + o.label.toUpperCase(), 56, 975);
    const t = new THREE.CanvasTexture(c);
    t.encoding = THREE.sRGBEncoding;
    t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    return t;
  }

  /* ---------- shared materials ---------- */
  const sideMat = new THREE.MeshBasicMaterial({ color: INK });
  const edgeMat = new THREE.LineBasicMaterial({ color: INK, transparent: true });
  const tapeMat = new THREE.MeshBasicMaterial({ color: 0xEFE6C6, transparent: true, opacity: 0.88, depthWrite: false });
  const unitSquare = (() => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute([-.5,-.5,0, .5,-.5,0, .5,.5,0, -.5,.5,0], 3)); return g; })();

  /* ---------- state ---------- */
  let textures = [], photoIndex = 0;
  let N = 4, B = 6, s = 1.5;
  let pieces = [];
  let complete = false, playing = false, moves = 0, startTime = 0, zCounter = 1;
  let drag = null, hovered = null;
  const boardGroup = new THREE.Group(); scene.add(boardGroup);

  function buildBoard() {
    boardGroup.clear();
    const outline = new THREE.LineLoop(unitSquare.clone(), new THREE.LineDashedMaterial({ color: INK, dashSize: 0.018, gapSize: 0.016, transparent: true, opacity: 0.6 }));
    outline.computeLineDistances();
    boardGroup.add(outline);
    const pts = [];
    for (let k = 1; k < N; k++) { const t = -0.5 + k / N; pts.push(t, -0.5, 0, t, 0.5, 0, -0.5, t, 0, 0.5, t, 0); }
    const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    boardGroup.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.16 })));
    boardGroup.position.z = -0.01;
  }

  function slotOf(p) { return { x: -B / 2 + s * (p.c + 0.5), y: B / 2 - s * (p.r + 0.5) }; }

  function buildPieces(n) {
    pieces.forEach(p => { scene.remove(p.mesh); scene.remove(p.shadow); p.mesh.geometry.dispose(); p.front.dispose(); p.shadow.material.dispose(); });
    pieces = []; N = n;
    buildBoard(); layout();
    const tapeIdx = new Set([2, n * n - 2]);
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      const geo = new THREE.BoxGeometry(1, 1, 0.1);
      const uv = geo.attributes.uv;
      for (let i = 16; i < 20; i++) uv.setXY(i, (c + uv.getX(i)) / n, (n - 1 - r + uv.getY(i)) / n);
      uv.needsUpdate = true;
      const front = new THREE.MeshBasicMaterial({ map: textures[photoIndex] });
      const mesh = new THREE.Mesh(geo, [sideMat, sideMat, sideMat, sideMat, front, sideMat]);
      const edge = new THREE.LineLoop(unitSquare, edgeMat); edge.position.z = 0.051; mesh.add(edge);
      let tape = null;
      if (tapeIdx.has(r * n + c)) {
        tape = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.17), tapeMat);
        tape.position.set(0.12, 0.5, 0.06); tape.rotation.z = (r + c) % 2 ? 0.28 : -0.24;
        mesh.add(tape);
      }
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: INK, transparent: true, opacity: 0, depthWrite: false }));
      const p = { r, c, mesh, front, shadow, tape, placed: true, nx: 0, ny: 0, rz0: 0, x: 0, y: 0, tx: 0, ty: 0, rz: 0, lift: 0, tiltX: 0, tiltY: 0, seam: 0.97, zOrder: 0, flipStart: 0, flipTo: null, swapped: true, vx: 0, hx: 0, hy: 0, loose: 0 };
      const sl = slotOf(p); p.x = sl.x; p.y = sl.y;
      mesh.userData.piece = p;
      scene.add(shadow); scene.add(mesh); pieces.push(p);
    }
    complete = false; $('win').hidden = true; updateUI();
  }

  function layout() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, w < 600 ? 1.5 : 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    viewW = VIEW_H * camera.aspect;
    B = Math.min(viewW, VIEW_H) * (camera.aspect > 1.1 ? 0.6 : 0.56);
    s = B / N;
    boardGroup.scale.set(B, B, 1);
    boardGroup.position.y = 0;
  }

  const clampX = x => { const m = s * 0.6; return Math.max(-viewW / 2 + m, Math.min(viewW / 2 - m, x)); };
  const clampY = y => { const m = s * 0.6; return Math.max(-VIEW_H / 2 + m, Math.min(VIEW_H / 2 - m - s * 0.35, y)); };

  function looseSpot(taken) {
    let best = null, bestScore = -1;
    for (let t = 0; t < 70; t++) {
      const x = clampX((Math.random() - 0.5) * viewW), y = clampY((Math.random() - 0.5) * VIEW_H);
      const outside = Math.abs(x) > B / 2 + s * 0.4 || Math.abs(y) > B / 2 + s * 0.4;
      let minD = 99; for (const q of taken) minD = Math.min(minD, Math.hypot(q.x - x, q.y - y));
      const score = (outside ? 10 : 0) + Math.min(minD, s * 1.15);
      if (score > bestScore) { bestScore = score; best = { x, y }; }
    }
    return best;
  }

  function scatter(stagger) {
    complete = false; $('win').hidden = true;
    const taken = [];
    pieces.forEach((p, i) => {
      const spot = looseSpot(taken); taken.push(spot);
      const apply = () => { p.placed = false; p.nx = spot.x / viewW; p.ny = spot.y / VIEW_H; p.rz0 = (Math.random() - 0.5) * 0.36; p.zOrder = ++zCounter; updateUI(); };
      if (stagger && !reduced) setTimeout(apply, i * 30); else apply();
    });
    moves = 0; startTime = performance.now(); playing = true; updateUI();
  }

  function solve() {
    pieces.forEach((p, i) => {
      const apply = () => { p.placed = true; updateUI(); checkComplete(true); };
      if (!reduced) setTimeout(apply, i * 40); else apply();
    });
  }

  function nextPhoto() {
    photoIndex = (photoIndex + 1) % textures.length;
    const now = performance.now();
    pieces.forEach(p => { p.flipTo = textures[photoIndex]; p.swapped = false; p.flipStart = now + (reduced ? 0 : (p.r + p.c) * 60); });
    $('photoLabel').textContent = 'photo ' + (photoIndex + 1) + '/' + textures.length;
  }

  const placedCount = () => pieces.filter(p => p.placed).length;
  function checkComplete(viaSolve) {
    if (complete || !playing || placedCount() !== pieces.length) return;
    complete = true;
    const secs = Math.round((performance.now() - startTime) / 1000);
    const t = Math.floor(secs / 60) + ':' + String(secs % 60).padStart(2, '0');
    $('winText').textContent = viaSolve ? 'Solved for you. Try it yourself next?' : 'Nice! You put me together in ' + t + '.';
    $('win').hidden = false;
  }
  function updateUI() {
    $('count').textContent = String(placedCount()).padStart(2, '0') + '/' + String(pieces.length).padStart(2, '0');
    
  }

  /* ---------- pointer ---------- */
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), hit = new THREE.Vector3();
  function toWorld(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera); ray.ray.intersectPlane(plane, hit); return hit;
  }
  function pick(e) {
    toWorld(e);
    const hits = ray.intersectObjects(pieces.map(p => p.mesh), false);
    return hits.length ? hits[0].object.userData.piece : null;
  }
  canvas.addEventListener('pointerdown', e => {
    const p = pick(e); if (!p) return;
    e.preventDefault();
    const w = toWorld(e);
    drag = { p, ox: p.x - w.x, oy: p.y - w.y, lastX: w.x };
    p.tx = p.x; p.ty = p.y; p.placed = false; p.zOrder = ++zCounter;
    if (complete) { complete = false; $('win').hidden = true; }
    if (!playing) { playing = true; startTime = performance.now(); }
    canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing'; updateUI();
  });
  canvas.addEventListener('pointermove', e => {
    if (drag) {
      const w = toWorld(e);
      drag.p.tx = clampX(w.x + drag.ox); drag.p.ty = clampY(w.y + drag.oy);
      drag.p.vx = w.x - drag.lastX; drag.lastX = w.x; return;
    }
    const p = pick(e); hovered = p;
    if (p) { p.hx = (hit.x - p.x) / s; p.hy = (hit.y - p.y) / s; }
    canvas.style.cursor = p ? 'grab' : 'default';
  });
  function endDrag(e) {
    if (!drag) return;
    const p = drag.p, sl = slotOf(p);
    if (Math.hypot(p.tx - sl.x, p.ty - sl.y) < s * 0.42) p.placed = true;
    else { p.nx = p.tx / viewW; p.ny = p.ty / VIEW_H; p.rz0 = p.rz; }
    moves++; drag = null; canvas.style.cursor = 'grab';
    try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
    updateUI(); checkComplete(false);
  }
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('pointerleave', () => { if (!drag) hovered = null; });

  $('shuffleBtn').addEventListener('click', () => scatter(true));
  $('solveBtn').addEventListener('click', () => { if (!playing) { playing = true; startTime = performance.now(); } solve(); });
  $('photoBtn').addEventListener('click', nextPhoto);
  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 's' || e.key === 'S') scatter(true);
    if (e.key === 'n' || e.key === 'N') nextPhoto();
  });

  /* ---------- loop ---------- */
  const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  let last = performance.now();
  function tick(now) {
    requestAnimationFrame(tick);
    if (document.hidden || !onScreen) { last = now; return; }
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    const k = reduced ? 1 : 1 - Math.exp(-dt * 14);
    const kSlow = reduced ? 1 : 1 - Math.exp(-dt * 10);
    edgeMat.opacity += ((complete ? 0 : 1) - edgeMat.opacity) * kSlow;
    for (const p of pieces) {
      const isDrag = drag && drag.p === p;
      let tx, ty, trz;
      if (isDrag) { tx = p.tx; ty = p.ty; trz = p.rz * 0.85; }
      else if (p.placed) { const sl = slotOf(p); tx = sl.x; ty = sl.y; trz = 0; }
      else { tx = clampX(p.nx * viewW); ty = clampY(p.ny * VIEW_H); trz = p.rz0; }
      const kk = isDrag ? (reduced ? 1 : 1 - Math.exp(-dt * 30)) : k;
      p.x += (tx - p.x) * kk; p.y += (ty - p.y) * kk; p.rz += (trz - p.rz) * kSlow;

      const isHover = hovered === p && !drag;
      const tLift = isDrag ? s * 0.5 : isHover ? s * 0.12 : 0;
      p.lift += (tLift - p.lift) * kSlow;
      const tLoose = (p.placed && !isDrag) ? 0 : 1;
      p.loose += (tLoose - p.loose) * kSlow;

      let tTiltX = 0, tTiltY = 0;
      if (isHover) { tTiltX = -p.hy * 0.35; tTiltY = p.hx * 0.35; }
      if (isDrag) { tTiltY = Math.max(-0.35, Math.min(0.35, p.vx * 1.5)); p.vx *= 0.85; }
      p.tiltX += (tTiltX - p.tiltX) * kSlow; p.tiltY += (tTiltY - p.tiltY) * kSlow;
      p.seam += ((complete ? 1.0 : 0.97) - p.seam) * kSlow;

      let flip = 0;
      if (p.flipTo && now >= p.flipStart) {
        const ft = reduced ? 1 : Math.min(1, (now - p.flipStart) / 520), e2 = ease(ft);
        if (e2 >= 0.5 && !p.swapped) { p.front.map = p.flipTo; p.front.needsUpdate = true; p.swapped = true; }
        flip = e2 < 0.5 ? e2 * Math.PI : (e2 - 1) * Math.PI;
        if (ft >= 1) { p.flipTo = null; flip = 0; }
      }

      const baseZ = p.placed && !isDrag ? 0 : 0.02 + (p.zOrder % 4000) * 0.0004;
      p.mesh.position.set(p.x, p.y, baseZ + p.lift + s * 0.05);
      p.mesh.rotation.set(p.tiltX, p.tiltY + flip, p.rz);
      p.mesh.scale.set(s * p.seam, s * p.seam, s);
      if (p.tape) p.tape.visible = p.loose > 0.5;

      // hard "sticker" shadow, offset down-right; grows as the tile lifts
      const L = p.lift / s, off = s * (0.045 + L * 0.12) * p.loose;
      p.shadow.position.set(p.x + off, p.y - off * 1.15, 0.001 + baseZ * 0.5);
      p.shadow.rotation.z = p.rz;
      p.shadow.scale.set(s * p.seam, s * p.seam, 1);
      p.shadow.material.opacity = p.loose * (0.95 - L * 0.5);
    }
    renderer.render(scene, camera);
  }

  /* ---------- init ---------- */
  const breakpointN = () => stage.clientWidth < 520 ? 3 : 4;
  new ResizeObserver(() => {
    const n = breakpointN();
    if (n !== N && pieces.length) { buildPieces(n); if (playing) scatter(false); }
    else layout();
  }).observe(stage);

  const fontsReady = document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1500))]) : Promise.resolve();
  fontsReady.then(() => {
    Promise.all(HERO_PHOTOS.map(loadTex)).then(ts => {
      textures = ts.filter(Boolean);
      if (!textures.length) textures = PHOTOS.map(makePhoto);
      $('photoLabel').textContent = 'photo 1/' + textures.length;
      buildPieces(breakpointN());
      requestAnimationFrame(tick);
      if (!reduced) setTimeout(() => { if (!playing) scatter(true); }, 1600);
    });
  });
})();


} catch (err) { console.error('[Portfolio module 1]', err); }

try {

(() => {
  document.documentElement.classList.add('js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // nav: shadow once scrolled, squiggle under the section in view
  const nav = document.getElementById('siteNav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const links = [...document.querySelectorAll('.nav a.link')];
  const ids = ['home', 'work', 'ai', 'studio', 'about', 'skills', 'caps', 'kind-words', 'contact', 'play'];
  const map = { 'play': 'contact', 'skills': 'about', 'caps': 'about', 'kind-words': 'about' };
  const seen = new Map();
  const io = new IntersectionObserver(es => {
    es.forEach(e => seen.set(e.target.id, e.isIntersecting));
    const active = ids.find(id => seen.get(id));
    if (!active) return;
    const t = map[active] || active;
    links.forEach(a => a.classList.toggle('current', a.dataset.target === t));
  }, { rootMargin: '-40% 0px -55% 0px' });
  ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
  // gentle rise as sections arrive
  if (!reduced) {
    const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
})();

} catch (err) { console.error('[Portfolio module 2]', err); }

try {

(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) document.documentElement.classList.add('no-anim');

  /* "view" sticker that follows the cursor over project thumbnails */
  const cur = document.getElementById('viewCursor');
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.thumb').forEach(t => {
      t.addEventListener('pointerenter', () => cur.classList.add('on'));
      t.addEventListener('pointerleave', () => cur.classList.remove('on'));
      t.addEventListener('pointermove', e => { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; });
    });
  }

  /* Story TV: play the recording only while it is on screen */
  const vid = document.getElementById('storyVideo');
  if (vid && !reduced) {
    new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) vid.play().catch(() => {}); else vid.pause();
    }), { threshold: 0.35 }).observe(vid);
  }

  /* Spin the wheel */
  const PRIZES = [
    ['#E5484D', '100 coins', 'You won <b>100 coins</b>. Spend them wisely.'],
    ['#4CAF7A', 'chai chat', 'You won <b>a chai chat</b> with me. Say hello below!'],
    ['#FFC93C', 'case study', 'You won <b>the full case study</b>.'],
    ['#2B59F0', 'good mood', 'You won <b>+1 good mood</b>. Free, no claim needed.'],
    ['#8E5BD9', 'spin again', 'So close! <b>Spin again</b>, the wheel likes you.'],
    ['#F0A637', 'high five', 'You won <b>a high five</b>. Consider it given.']
  ];
  const wheel = document.getElementById('wheel'), btn = document.getElementById('wheelBtn'), out = document.getElementById('wheelResult');
  if (!wheel) return;
  const NS = 'http://www.w3.org/2000/svg', N = PRIZES.length, SEG = 360 / N, R = 92;
  const pt = (deg, r) => { const a = (deg - 90) * Math.PI / 180; return [Math.cos(a) * r, Math.sin(a) * r]; };
  let svg = `<circle r="100" fill="#FFFFFF" stroke="#161616" stroke-width="3"/>`;
  PRIZES.forEach(([c, label], i) => {
    const a0 = i * SEG, a1 = a0 + SEG, [x0, y0] = pt(a0, R), [x1, y1] = pt(a1, R);
    svg += `<path d="M0 0 L${x0.toFixed(2)} ${y0.toFixed(2)} A${R} ${R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z" fill="${c}" stroke="#161616" stroke-width="2"/>`;
    const mid = a0 + SEG / 2, [tx, ty] = pt(mid, 60);
    svg += `<text x="${tx.toFixed(2)}" y="${ty.toFixed(2)}" transform="rotate(${mid} ${tx.toFixed(2)} ${ty.toFixed(2)})" text-anchor="middle" dominant-baseline="middle" font-family="Roboto Mono, monospace" font-weight="500" font-size="11" fill="${c === '#FFC93C' ? '#161616' : '#FFFFFF'}">${label}</text>`;
  });
  for (let i = 0; i < 18; i++) { const [bx, by] = pt(i * 20, 96.5); svg += `<circle cx="${bx.toFixed(2)}" cy="${by.toFixed(2)}" r="2.6" fill="${i % 2 ? '#FFC93C' : '#FFFFFF'}" stroke="#161616" stroke-width="1"/>`; }
  wheel.innerHTML = svg;

  let rot = 0, spinning = false, pending = -1;
  const link = '<br><a href="https://rabbitxlogistics.com" target="_blank" rel="noopener">see how I designed it &#8599;</a>';
  function show(i) {
    out.innerHTML = PRIZES[i][2] + link;
    out.hidden = false; out.classList.remove('pop'); void out.offsetWidth; out.classList.add('pop');
    spinning = false; btn.querySelector('.wheel-hub').textContent = 'again';
  }
  btn.addEventListener('click', () => {
    if (spinning) return;
    spinning = true; out.hidden = true;
    const i = Math.floor(Math.random() * N);
    const centre = i * SEG + SEG / 2, jitter = (Math.random() - .5) * (SEG * .6);
    const need = ((360 - centre - jitter) - (rot % 360) + 720) % 360;
    rot += 360 * 5 + need;
    pending = i;
    if (reduced) { wheel.style.transform = `rotate(${rot}deg)`; show(i); return; }
    wheel.style.transform = `rotate(${rot}deg)`;
  });
  wheel.addEventListener('transitionend', () => { if (pending > -1) { const i = pending; pending = -1; show(i); } });
})();

} catch (err) { console.error('[Portfolio module 3]', err); }

try {

(() => {
  /* AI explorations: the kitten clip plays only while it is on screen */
  const v = document.getElementById('kittenCard');
  if (!v || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }), { threshold: 0.3 }).observe(v);
})();

} catch (err) { console.error('[Portfolio module 4]', err); }

try {

(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- skills: two taped strips sliding in opposite directions ---------- */
  const TOOLS = [
    ['Illustrator', '<path d="M5 19 L12 4 L19 19" /><path d="M8 14 H16"/>'],
    ['Photoshop', '<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 15 L9 10 L13 14 L16 11 L20 15"/>'],
    ['Figma', '<circle cx="9" cy="7" r="3"/><circle cx="15" cy="7" r="3"/><circle cx="9" cy="13" r="3"/><circle cx="15" cy="13" r="3"/><circle cx="9" cy="19" r="2.5"/>'],
    ['Framer', '<path d="M6 4 H18 V10 H12 L18 16 H12 V21 L6 16 V10 H12 Z"/>'],
    ['InDesign', '<rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M8 9 H16 M8 13 H16 M8 17 H12"/>'],
    ['After Effects', '<path d="M6 5 L19 12 L6 19 Z"/>'],
    ['Claude Code', '<path d="M5 7 L10 12 L5 17"/><path d="M12 17 H19"/>'],
    ['ChatGPT', '<path d="M4 6 H20 V16 H11 L6 20 V16 H4 Z"/>'],
    ['Spine 2D', '<circle cx="6" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="18" r="2"/><path d="M7.5 7.5 L10.5 10.5 M13.5 13.5 L16.5 16.5"/>'],
    ['Figma Make', '<path d="M12 3 L13.8 10.2 L21 12 L13.8 13.8 L12 21 L10.2 13.8 L3 12 L10.2 10.2 Z"/>']
  ];
  const ico = d => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="#161616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const strips = [...document.querySelectorAll('.skills .track')];
  strips.forEach(track => {
    const back = track.closest('.back');
    const set = TOOLS.map(([n, d]) => back
      ? `<span class="sk-tool">${n.toLowerCase()}<span class="sep">*</span></span>`
      : `<span class="sk-tool">${n}<span class="sep">&#10033;</span></span>`).join('');
    track.innerHTML = `<div class="set" style="display:flex">${set}</div>`;
    const w = track.firstElementChild.getBoundingClientRect().width || 1;
    const need = Math.ceil((innerWidth * 1.3) / w) + 1;
    track.innerHTML = Array.from({ length: need + 1 }, () => `<div class="set" style="display:flex">${set}</div>`).join('');
  });
  if (!reduced && strips.length) {
    const band = document.getElementById('skills');
    let x = [0, 0], last = performance.now(), boost = 0, lastY = scrollY, onScreen = false, hover = false;
    new IntersectionObserver(es => { onScreen = es[0].isIntersecting; }).observe(band);
    band.addEventListener('pointerenter', () => hover = true);
    band.addEventListener('pointerleave', () => hover = false);
    addEventListener('scroll', () => { boost = Math.min(6, boost + Math.abs(scrollY - lastY) * 0.02); lastY = scrollY; }, { passive: true });
    (function loop(now) {
      const dt = Math.min(50, now - last) / 1000; last = now;
      if (onScreen && !hover) {
        boost *= 0.94;
        strips.forEach((t, i) => {
          const setW = t.firstElementChild.getBoundingClientRect().width;
          const dir = t.closest('.back') ? 1 : -1;
          x[i] += dir * (60 + boost * 60) * dt;
          if (dir < 0 && x[i] <= -setW) x[i] += setW;
          if (dir > 0 && x[i] >= 0) x[i] -= setW;
          t.style.transform = `translateX(${x[i]}px)`;
        });
      }
      requestAnimationFrame(loop);
    })(last);
    strips.forEach((t, i) => { if (t.closest('.back')) x[i] = -t.firstElementChild.getBoundingClientRect().width; });
  }

  /* ---------- about: count up the sticky-note numbers ---------- */
  const counts = document.querySelectorAll('.count');
  if (!reduced) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; io.unobserve(e.target);
      const el = e.target, to = +el.dataset.to, t0 = performance.now();
      (function tick(n) { const k = Math.min(1, (n - t0) / 900); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); })(t0);
    }), { threshold: .6 });
    counts.forEach(c => { c.textContent = '0'; io.observe(c); });
  }

  /* ---------- kind words: a swipeable deck of cards ---------- */
  const deck = document.getElementById('deck');
  if (deck) {
    const cards = [...deck.querySelectorAll('.qcard')];
    const N = cards.length, countEl = document.getElementById('kwCount'), dots = [...document.querySelectorAll('#kwDots i')];
    let order = cards.map((_, i) => i), busy = false;
    const pose = [ 'translate(0,0) rotate(0deg)', 'translate(14px,16px) rotate(2.4deg)', 'translate(-12px,26px) rotate(-2.8deg)' ];
    function layout() {
      order.forEach((ci, depth) => {
        const c = cards[ci];
        c.style.zIndex = String(10 - depth);
        c.style.transform = pose[Math.min(depth, pose.length - 1)];
        c.setAttribute('aria-hidden', depth ? 'true' : 'false');
      });
      const top = order[0];
      countEl.textContent = `${String(top + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')}`;
      dots.forEach((d, i) => d.classList.toggle('on', i === top));
    }
    function next(dir = -1) {
      if (busy) return; busy = true;
      const c = cards[order[0]];
      c.style.transform = `translate(${dir * 120}%, 40px) rotate(${dir * 14}deg)`;
      c.style.opacity = '0';
      setTimeout(() => {
        order.push(order.shift());
        c.style.transition = 'none'; c.style.opacity = '1'; layout();
        void c.offsetWidth; c.style.transition = ''; busy = false;
      }, reduced ? 0 : 380);
    }
    function prev() {
      if (busy) return; busy = true;
      const ci = order.pop(); order.unshift(ci);
      const c = cards[ci];
      c.style.transition = 'none'; c.style.opacity = '0'; c.style.zIndex = '11';
      c.style.transform = 'translate(120%, 40px) rotate(14deg)';
      void c.offsetWidth; c.style.transition = '';
      requestAnimationFrame(() => { c.style.opacity = '1'; layout(); setTimeout(() => busy = false, 350); });
    }
    document.getElementById('kwNext').addEventListener('click', () => next(-1));
    document.getElementById('kwPrev').addEventListener('click', prev);
    deck.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next(-1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    });
    // drag / swipe the top card
    let drag = null;
    deck.addEventListener('pointerdown', e => {
      const c = cards[order[0]];
      if (busy || !c.contains(e.target) || e.button > 0) return;
      drag = { c, x0: e.clientX, y0: e.clientY, dx: 0, id: e.pointerId, moved: false };
      c.classList.add('dragging');
    });
    deck.addEventListener('pointermove', e => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
      if (!drag.moved && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) { end(true); return; } // let vertical scroll win
      if (Math.abs(dx) > 4 && !drag.moved) { drag.moved = true; try { deck.setPointerCapture(e.pointerId); } catch (_) {} }
      drag.dx = dx;
      drag.c.style.transform = `translate(${dx}px, ${Math.abs(dx) * .08}px) rotate(${dx * .04}deg)`;
    });
    function end(cancel) {
      if (!drag) return;
      const { c, dx } = drag; drag = null; c.classList.remove('dragging');
      if (!cancel && Math.abs(dx) > Math.min(120, deck.clientWidth * .22)) next(dx < 0 ? -1 : 1);
      else layout();
    }
    deck.addEventListener('pointerup', () => end(false));
    deck.addEventListener('pointercancel', () => end(true));
    layout();
  }

  /* ---------- studio: the two jewellery clips play while on screen ---------- */
  if (!reduced) {
    const vio = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }), { threshold: .35 });
    document.querySelectorAll('.st-vid').forEach(v => { v.preload = 'metadata'; vio.observe(v); });
  }

  /* ---------- contact: copy email ---------- */
  const copyBtn = document.getElementById('copyMail'), note = document.getElementById('copyNote');
  if (copyBtn) copyBtn.addEventListener('click', async () => {
    const mail = 'samarjs786@gmail.com';
    let ok = false;
    try { await navigator.clipboard.writeText(mail); ok = true; } catch (_) {
      const t = document.createElement('textarea'); t.value = mail; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select(); try { ok = document.execCommand('copy'); } catch (__) {} t.remove();
    }
    copyBtn.textContent = ok ? 'copied!' : 'copy';
    copyBtn.classList.toggle('done', ok);
    note.textContent = ok ? 'see you in my inbox' : 'select the address above to copy it';
    setTimeout(() => { copyBtn.textContent = 'copy'; copyBtn.classList.remove('done'); note.textContent = ''; }, 2400);
  });
})();

} catch (err) { console.error('[Portfolio module 5]', err); }

try {


(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const GOAL = 10;
  const $ = id => document.getElementById(id);

  /* ---------- best score (this browser only) ---------- */
  let best = 0;
  try { best = +localStorage.getItem('pb-snake-best') || 0; } catch (_) {}
  $('sn-best').textContent = best;

  /* ---------- board ---------- */
  const board = $('sn-board'), cv = $('sn-cv'), ctx = cv.getContext('2d');
  let COLS = 24, ROWS = 16, cell = 20, W = 0, H = 0, dpr = 1;
  function fit() {
    const r = board.getBoundingClientRect();
    if (state !== 'playing' && state !== 'paused') { const sq = innerWidth <= 640; COLS = sq ? 15 : 24; ROWS = sq ? 15 : 16; }
    dpr = Math.min(2, devicePixelRatio || 1);
    W = r.width; H = r.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cell = Math.min(W / COLS, H / ROWS);
    draw(1);
  }

  /* ---------- game state ---------- */
  let state = 'idle', snake = [], prev = [], dir = [1, 0], queue = [], food = null, score = 0, step = 140, acc = 0, last = 0, bursts = [], foodT = 0;
  const QUIPS = ['yum!', 'crunch!', 'tasty!', 'nom nom', 'so juicy', 'keep going!', 'halfway there!', 'getting long...', 'two more!', 'one more apple!'];
  function placeFood() {
    const free = [];
    for (let x = 0; x < COLS; x++) for (let y = 0; y < ROWS; y++) if (!snake.some(s => s[0] === x && s[1] === y)) free.push([x, y]);
    food = free[(Math.random() * free.length) | 0]; foodT = 0;
  }
  function reset() {
    const y = (ROWS / 2) | 0, x = Math.max(4, (COLS / 3) | 0);
    snake = [[x, y], [x - 1, y], [x - 2, y], [x - 3, y]]; prev = snake.map(s => s.slice());
    dir = [1, 0]; queue = []; score = 0; step = 140; acc = 0; bursts = [];
    $('sn-score').textContent = '0';
    placeFood();
  }
  function setState(s) {
    state = s;
    $('sn-startO').hidden = s !== 'idle';
    $('sn-pauseO').hidden = s !== 'paused';
    $('sn-overO').hidden = s !== 'over';
    $('sn-pauseBtn').hidden = s !== 'playing';
  }
  function start() { fit(); reset(); setState('playing'); board.focus({ preventScroll: true }); last = performance.now(); }
  function turn(dx, dy) {
    if (state === 'idle' || state === 'over' || state === 'dying') return;
    if (state === 'paused') { setState('playing'); last = performance.now(); }
    const ref = queue.length ? queue[queue.length - 1] : dir;
    if ((dx === -ref[0] && dy === -ref[1]) || (dx === ref[0] && dy === ref[1])) return;
    if (queue.length < 3) queue.push([dx, dy]);
  }
  function tick() {
    if (queue.length) dir = queue.shift();
    prev = snake.map(s => s.slice());
    const h = [snake[0][0] + dir[0], snake[0][1] + dir[1]];
    const hitWall = h[0] < 0 || h[1] < 0 || h[0] >= COLS || h[1] >= ROWS;
    const eating = food && h[0] === food[0] && h[1] === food[1];
    const body = eating ? snake : snake.slice(0, -1);
    if (hitWall || body.some(s => s[0] === h[0] && s[1] === h[1])) return end(false, hitWall);
    snake.unshift(h);
    if (eating) {
      prev.push(prev[prev.length - 1].slice());
      score++; step = Math.max(80, step - 5);
      $('sn-score').textContent = score;
      const chip = $('sn-scoreChip'); chip.classList.remove('pop'); void chip.offsetWidth; chip.classList.add('pop');
      if (!reduced) for (let k = 0; k < 9; k++) bursts.push({ x: food[0], y: food[1], a: k / 9 * Math.PI * 2, t: 0, c: k % 2 ? '#E5484D' : '#4CAF7A' });
      if (score >= GOAL) { food = null; return end(true); }
      toast(`<b>${QUIPS[score - 1]}</b> ${score} / ${GOAL} apples`);
      placeFood();
    } else snake.pop();
  }
  function end(won, wall) {
    const isBest = score > best;
    if (isBest) { best = score; $('sn-best').textContent = best; try { localStorage.setItem('pb-snake-best', String(best)); } catch (_) {} }
    $('sn-finalScore').textContent = score;
    $('sn-newBest').hidden = !isBest || score === 0 || won;
    $('sn-overTitle').textContent = won ? 'You found all 10 apples!' : wall ? 'Oops, you hit the edge.' : 'Oops, you bit your own tail.';
    $('sn-overMsg').innerHTML = won ? 'Just like old times. Now leave a note on the notepad so I know you were here.' : score >= 7 ? 'So close! Have another go?' : 'Happens to the best of us. Have another go?';
    $('sn-againBtn').textContent = won ? 'play again' : 'try again';
    if (won && !reduced) for (let k = 0; k < 40; k++) bursts.push({ x: snake[0][0], y: snake[0][1], a: Math.random() * Math.PI * 2, t: -Math.random() * .6, c: ['#E5484D', '#FFE45C', '#2B59F0', '#4CAF7A'][k % 4], big: true });
    state = 'dying';
    setTimeout(() => setState('over'), reduced ? 0 : won ? 900 : 450);
  }
  let toastT;
  function toast(html) {
    const el = $('sn-toast'); el.innerHTML = html; el.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), 1400);
  }

  /* ---------- drawing ---------- */
  const PEN = '#2B59F0', INK = '#161616';
  const ox = () => (W - cell * COLS) / 2, oy = () => (H - cell * ROWS) / 2;
  function cxy(p) { return [(p[0] + .5) * cell + ox(), (p[1] + .5) * cell + oy()]; }
  function apple(x, y, r, rot) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    // shadow offset like the rest of the stickers
    const body = () => { ctx.beginPath(); ctx.moveTo(0, -r * .62); ctx.bezierCurveTo(r * .55, -r * 1.05, r * 1.15, -r * .55, r * .98, r * .18); ctx.bezierCurveTo(r * .85, r * .9, r * .3, r * 1.05, 0, r * .84); ctx.bezierCurveTo(-r * .3, r * 1.05, -r * .85, r * .9, -r * .98, r * .18); ctx.bezierCurveTo(-r * 1.15, -r * .55, -r * .55, -r * 1.05, 0, -r * .62); ctx.closePath(); };
    ctx.save(); ctx.translate(2, 2); body(); ctx.fillStyle = INK; ctx.fill(); ctx.restore();
    body(); ctx.fillStyle = '#E5484D'; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = INK; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(-r * .45, -r * .2, r * .14, r * .26, -.5, 0, 7); ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, -r * .6); ctx.quadraticCurveTo(r * .05, -r * .95, r * .2, -r * 1.12); ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(r * .1, -r * .88); ctx.quadraticCurveTo(r * .55, -r * 1.3, r * .85, -r * .95); ctx.quadraticCurveTo(r * .45, -r * .7, r * .1, -r * .88); ctx.fillStyle = '#4CAF7A'; ctx.fill(); ctx.lineWidth = 1.6; ctx.stroke();
    ctx.restore();
  }
  function draw(k) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (cell < 6) return;
    ctx.fillStyle = 'rgba(22,22,22,.16)';
    for (let x = 0; x < COLS; x++) for (let y = 0; y < ROWS; y++) { const [px, py] = cxy([x, y]); ctx.beginPath(); ctx.arc(px, py, Math.max(1, cell * .05), 0, 7); ctx.fill(); }
    if (!snake.length) { idleDoodle(); return; }
    if (food) {
      const [fx, fy] = cxy(food), bob = reduced ? 0 : Math.sin(foodT * 4) * cell * .05, g = reduced ? 1 : Math.min(1, foodT * 5);
      apple(fx, fy + bob, cell * .4 * (g < 1 ? .4 + g * .6 : 1), -.12);
    }
    const pts = snake.map((s, i) => { const p = prev[i] || s, a = cxy(p), b = cxy(s); return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]; });
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
    ctx.strokeStyle = INK; ctx.lineWidth = cell * .72; ctx.stroke();
    ctx.strokeStyle = PEN; ctx.lineWidth = cell * .72 - 4; ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.28)'; ctx.lineWidth = cell * .14; ctx.stroke();
    const [hx, hy] = pts[0], dying = state === 'dying' || state === 'over', won = score >= GOAL;
    ctx.beginPath(); ctx.arc(hx, hy, cell * .46, 0, 7); ctx.fillStyle = PEN; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = INK; ctx.stroke();
    const [dx, dy] = dir, px = -dy, py = dx;
    for (const side of [-1, 1]) {
      const ex = hx + dx * cell * .12 + px * side * cell * .2, ey = hy + dy * cell * .12 + py * side * cell * .2;
      ctx.beginPath(); ctx.arc(ex, ey, cell * .13, 0, 7); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = INK; ctx.stroke();
      if (dying && !won) { const r = cell * .08; ctx.beginPath(); ctx.moveTo(ex - r, ey - r); ctx.lineTo(ex + r, ey + r); ctx.moveTo(ex + r, ey - r); ctx.lineTo(ex - r, ey + r); ctx.lineWidth = 1.6; ctx.stroke(); }
      else if (dying && won) { ctx.beginPath(); ctx.arc(ex, ey + cell * .03, cell * .07, Math.PI * 1.1, Math.PI * 1.9); ctx.lineWidth = 1.8; ctx.stroke(); }
      else { ctx.beginPath(); ctx.arc(ex + dx * cell * .04, ey + dy * cell * .04, cell * .065, 0, 7); ctx.fillStyle = INK; ctx.fill(); }
    }
    if (!dying && !reduced && (performance.now() % 1800) < 220) {
      const tx = hx + dx * cell * .46, ty = hy + dy * cell * .46, L = cell * .26;
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx + dx * L, ty + dy * L);
      ctx.moveTo(tx + dx * L, ty + dy * L); ctx.lineTo(tx + dx * cell * .34 + px * cell * .08, ty + dy * cell * .34 + py * cell * .08);
      ctx.moveTo(tx + dx * L, ty + dy * L); ctx.lineTo(tx + dx * cell * .34 - px * cell * .08, ty + dy * cell * .34 - py * cell * .08);
      ctx.strokeStyle = '#E5484D'; ctx.lineWidth = 2; ctx.stroke();
    }
    bursts.forEach(b => {
      if (b.t < 0) return;
      const [bx, by] = cxy([b.x, b.y]), sc = b.big ? 4 : 1.4, r1 = cell * (.5 + b.t * sc), r2 = r1 + cell * .3 * (1 - b.t);
      ctx.beginPath(); ctx.moveTo(bx + Math.cos(b.a) * r1, by + Math.sin(b.a) * r1); ctx.lineTo(bx + Math.cos(b.a) * r2, by + Math.sin(b.a) * r2);
      ctx.strokeStyle = b.c; ctx.globalAlpha = 1 - b.t; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.stroke(); ctx.globalAlpha = 1;
    });
  }
  function idleDoodle() {
    const y = H * .8, amp = cell * .6, t = reduced ? 0 : performance.now() / 600;
    ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const x = W * .14 + (W * .56) * i / 40; ctx.lineTo(x, y + Math.sin(i / 40 * Math.PI * 3 + t) * amp); }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = cell * .7; ctx.stroke(); ctx.strokeStyle = PEN; ctx.lineWidth = cell * .7 - 4; ctx.stroke();
    apple(W * .82, y - cell * .2, cell * .42, -.12);
  }

  /* ---------- loop ---------- */
  let visible = true;
  function loop(now) {
    const dt = Math.min(100, now - last); last = now;
    if (state === 'playing' && visible) { acc += dt; while (acc >= step && state === 'playing') { acc -= step; tick(); } }
    if (state !== 'paused') foodT += dt / 1000;
    bursts.forEach(b => b.t += dt / (b.big ? 900 : 450)); bursts = bursts.filter(b => b.t < 1);
    draw(state === 'playing' && !reduced ? Math.min(1, acc / step) : 1);
    requestAnimationFrame(loop);
  }

  /* ---------- input ---------- */
  const KEYS = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0], W: [0, -1], S: [0, 1], A: [-1, 0], D: [1, 0] };
  addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input, textarea')) return;   // typing in the notepad
    const active = state === 'playing' || state === 'paused' || state === 'dying';
    const focused = document.activeElement === board || board.contains(document.activeElement);
    if (KEYS[e.key]) {
      if ((state === 'idle' || state === 'over') && focused) { e.preventDefault(); start(); turn(...KEYS[e.key]); return; }
      if (active) { e.preventDefault(); turn(...KEYS[e.key]); }
    }
    if (e.key === ' ' && (active || focused)) {
      e.preventDefault();
      if (state === 'playing') setState('paused'); else if (state === 'paused') { setState('playing'); last = performance.now(); }
      else if (state === 'idle' || state === 'over') start();
    }
    if (e.key === 'Escape' && state === 'playing') setState('paused');
  });
  let sw = null;
  board.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') sw = { x: e.clientX, y: e.clientY }; });
  board.addEventListener('pointermove', e => {
    if (!sw) return;
    const dx = e.clientX - sw.x, dy = e.clientY - sw.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 22) return;
    if (Math.abs(dx) > Math.abs(dy)) turn(Math.sign(dx), 0); else turn(0, Math.sign(dy));
    sw = { x: e.clientX, y: e.clientY };
  });
  const endSwipe = () => { sw = null; };
  board.addEventListener('pointerup', endSwipe); board.addEventListener('pointercancel', endSwipe);
  document.querySelectorAll('.sn-dpad button').forEach(b => b.addEventListener('pointerdown', e => {
    e.preventDefault(); const [x, y] = b.dataset.dir.split(',').map(Number);
    if (state === 'idle' || state === 'over') start();
    turn(x, y);
  }));
  $('sn-playBtn').addEventListener('click', start);
  $('sn-againBtn').addEventListener('click', start);
  $('sn-resumeBtn').addEventListener('click', () => { setState('playing'); last = performance.now(); board.focus({ preventScroll: true }); });
  $('sn-pauseBtn').addEventListener('click', () => setState('paused'));
  if (coarse) $('sn-keysHint').textContent = 'swipe on the board or use the arrow buttons';

  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (!visible && state === 'playing') setState('paused'); }, { threshold: .3 }).observe(board);
  document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'playing') setState('paused'); });
  new ResizeObserver(fit).observe(board);

  /* ---------- guestbook notepad: people write whatever they like ---------- */
  // Notes are shared through Firestore (REST, no SDK). The web API key is public by design; the
  // security rules only allow reading and creating short notes. Without config, notes stay in this browser.
  const FIREBASE = { projectId: '', apiKey: '' };
  const FS = FIREBASE.projectId && FIREBASE.apiKey
    ? `https://firestore.googleapis.com/v1/projects/${FIREBASE.projectId}/databases/(default)/documents` : '';
  const KEY = 'samar-guestbook-v1';
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(KEY) || '[]'); if (!Array.isArray(saved)) saved = []; } catch (_) { saved = []; }
  const list = $('sn-entries'), pad = $('sn-notepad'), pen = $('sn-pen');
  function addEntry(txt, fresh) {
    $('sn-empty').hidden = true;
    const li = document.createElement('li'), sp = document.createElement('span');
    sp.textContent = txt; li.appendChild(sp); if (fresh) li.classList.add('new');
    list.appendChild(li); return li;
  }
  function showAll(notes) {
    list.querySelectorAll('li:not(#sn-empty)').forEach(li => li.remove());
    $('sn-empty').hidden = notes.length > 0;
    notes.forEach(t => addEntry(t, false));
  }
  async function loadShared() {
    const r = await fetch(`${FS}:runQuery?key=${FIREBASE.apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ structuredQuery: { from: [{ collectionId: 'guestbook' }], orderBy: [{ field: { fieldPath: 'at' }, direction: 'DESCENDING' }], limit: 50 } }) });
    if (!r.ok) throw new Error(r.status);
    return (await r.json()).map(x => x.document && x.document.fields.note.stringValue).filter(Boolean).reverse();
  }
  function saveShared(txt) {
    const id = Array.from(crypto.getRandomValues(new Uint8Array(10)), b => b.toString(16).padStart(2, '0')).join('');
    return fetch(`${FS}:commit?key=${FIREBASE.apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ writes: [{ update: { name: `projects/${FIREBASE.projectId}/databases/(default)/documents/guestbook/${id}`, fields: { note: { stringValue: txt } } },
        currentDocument: { exists: false }, updateTransforms: [{ fieldPath: 'at', setToServerValue: 'REQUEST_TIME' }] }] }) })
      .then(r => { if (!r.ok) throw new Error(r.status); });
  }
  showAll(saved);
  if (FS) loadShared().then(showAll).catch(() => {});
  let writing = false;
  function penRest() {
    if (writing) return;
    pen.getAnimations().forEach(a => a.cancel());
    pen.style.left = (pad.clientWidth - 150) + 'px'; pen.style.top = (pad.clientHeight - 8) + 'px'; pen.style.transform = 'rotate(-28deg)';
  }
  function penWrite(span, dur) {
    if (reduced) return;
    writing = true;
    const pr = pad.getBoundingClientRect(), rects = span.getClientRects(), first = rects[0], lastR = rects[rects.length - 1];
    const tipX = 176 * .96, tipY = 35 / 2, frames = [];
    const lines = [...rects];
    lines.forEach((r, li) => {
      for (let i = 0; i <= 6; i++) {
        const x = r.left - pr.left + r.width * i / 6, y = r.top - pr.top + r.height * .75;
        frames.push({ left: (x - tipX) + 'px', top: (y - tipY + (i % 2 ? -3 : 2)) + 'px', transform: 'rotate(-38deg)' });
      }
    });
    const from = { left: pen.style.left, top: pen.style.top, transform: 'rotate(-28deg)' };
    const a = pen.animate([from, frames[0]], { duration: 260, easing: 'ease-out', fill: 'forwards' });
    a.onfinish = () => {
      const b = pen.animate(frames, { duration: dur, easing: 'linear', fill: 'forwards' });
      b.onfinish = () => { const c = pen.animate([frames[frames.length - 1], from], { duration: 380, easing: 'ease-in-out', fill: 'forwards' }); c.onfinish = () => { writing = false; penRest(); }; };
    };
  }
  pad.addEventListener('submit', e => {
    e.preventDefault();
    const inp = $('sn-note'), txt = inp.value.trim().replace(/\s+/g, ' ');
    if (!txt) { $('sn-err').hidden = false; inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake'); inp.focus(); return; }
    $('sn-err').hidden = true;
    const dur = Math.min(2200, 400 + txt.length * 30);
    const li = addEntry(txt, true); li.style.setProperty('--dur', dur + 'ms');
    li.scrollIntoView({ block: 'nearest' });
    requestAnimationFrame(() => penWrite(li.firstChild, dur));
    saved.push(txt); try { localStorage.setItem(KEY, JSON.stringify(saved.slice(-50))); } catch (_) {}
    if (FS) saveShared(txt).catch(() => {});
    inp.value = '';
  });
  $('sn-note').addEventListener('input', () => { $('sn-err').hidden = true; });
  new ResizeObserver(penRest).observe(pad);

  window.__snake = { get state() { return state; }, get score() { return score; }, get snake() { return snake; }, get food() { return food; }, turn, start };
  setState('idle'); fit(); penRest(); requestAnimationFrame(t => { last = t; loop(t); });
})();

(() => { const t = document.getElementById('top'); if (t) t.onclick = () => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); })();

} catch (err) { console.error('[Portfolio module 6]', err); }}
