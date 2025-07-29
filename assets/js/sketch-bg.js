/* Scroll-triggered architectural sketch strokes background */
(() => {
  const CANVAS_ID = 'sketchCanvas';
  const MAX_STROKES = 40;
  const STROKE_COLOR = 'rgba(212, 175, 55, 0.35)'; // gold
  const ALT_COLOR = 'rgba(15, 35, 75, 0.25)'; // navy tone

  const canvas = document.getElementById(CANVAS_ID);
  console.log('Canvas found:', canvas);
  if (!canvas) {
    console.error('Canvas not found!');
    return;
  }
  const ctx = canvas.getContext('2d');
  let strokes = [];
  let w, h, scrollY = 0;

  const rand = (min, max) => Math.random() * (max - min) + min;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createStroke() {
    const edge = Math.floor(Math.random() * 4);
    let x0, y0;
    switch (edge) {
      case 0: // top
        x0 = rand(-w * 0.1, w * 1.1);
        y0 = -20;
        break;
      case 1: // right
        x0 = w + 20;
        y0 = rand(-h * 0.1, h * 1.1);
        break;
      case 2: // bottom
        x0 = rand(-w * 0.1, w * 1.1);
        y0 = h + 20;
        break;
      default: // left
        x0 = -20;
        y0 = rand(-h * 0.1, h * 1.1);
    }
    const x1 = rand(w * 0.1, w * 0.9);
    const y1 = rand(h * 0.1, h * 0.9);

    strokes.push({
      x0, y0, x1, y1,
      progress: 0,
      speed: rand(0.003, 0.01),
      color: Math.random() < 0.6 ? STROKE_COLOR : ALT_COLOR,
      width: rand(0.5, 1.5)
    });
    if (strokes.length > MAX_STROKES) strokes.shift();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    strokes.forEach((s) => {
      s.progress = Math.min(1, s.progress + s.speed);
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(s.x0, s.y0);
      // interpolate current point
      const cx = s.x0 + (s.x1 - s.x0) * s.progress;
      const cy = s.y0 + (s.y1 - s.y0) * s.progress;
      ctx.lineTo(cx, cy);
      ctx.stroke();
    });
    requestAnimationFrame(draw);
  }

  // Spawn strokes tied to scroll velocity
  let lastScroll = window.scrollY;
  function onScroll() {
    const delta = Math.abs(window.scrollY - lastScroll);
    lastScroll = window.scrollY;
    const spawnCount = Math.min(5, Math.floor(delta / 150));
    for (let i = 0; i < spawnCount; i++) createStroke();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial strokes
  console.log('Creating initial strokes...');
  for (let i = 0; i < 10; i++) createStroke();
  console.log('Strokes created:', strokes.length);
  console.log('Starting animation...');
  requestAnimationFrame(draw);
})();
