/* ═══════════════════════════════
   MAP — visual adventure path
═══════════════════════════════ */
const MAP_WORLDS = [
  { id:'words',     icon:'📚', name:'Word Valley',      x:0.5,  y:0.05,  color:'#4ECDC4' },
  { id:'spelling',  icon:'✏️', name:'Spelling Harbor',  x:0.75, y:0.13,  color:'#FFA663' },
  { id:'math',      icon:'🔢', name:'Math Mountain',    x:0.25, y:0.21,  color:'#FF5C5C' },
  { id:'sentences', icon:'💬', name:'Sentence City',    x:0.6,  y:0.30,  color:'#9D8DF1' },
  { id:'concepts',  icon:'🧠', name:'Think Land',       x:0.3,  y:0.39,  color:'#6BCB77' },
  { id:'reading',   icon:'📖', name:'Reading River',    x:0.65, y:0.48,  color:'#4A9FD4' },
  { id:'grammar',   icon:'🖊️', name:'Grammar Garden',  x:0.35, y:0.57,  color:'#F368E0' },
  { id:'science',   icon:'🔬', name:'Science Station',  x:0.7,  y:0.66,  color:'#00B4D8' },
  { id:'creative',  icon:'✍️', name:'Creative Cove',   x:0.25, y:0.74,  color:'#FF9B44' },
  { id:'geography', icon:'🌍', name:'Geography Grove',  x:0.6,  y:0.83,  color:'#2DC653' },
  { id:'daily',     icon:'⚡', name:'Challenge Tower',  x:0.5,  y:0.93,  color:'#FFD166' },
];

function renderMap() {
  const wrap = document.querySelector('.map-canvas-wrap');
  const W = Math.min(400, wrap.clientWidth || 400);
  const H = 900;
  const canvas = document.getElementById('map-canvas');
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const grad = ctx.createLinearGradient(0,0,0,H);
  grad.addColorStop(0,   '#D4F1F9');
  grad.addColorStop(0.3, '#C8F0E0');
  grad.addColorStop(0.6, '#D0F5D0');
  grad.addColorStop(1,   '#B8DFC0');
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,W,H);

  // Draw winding path
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(255,255,255,0.75)';
  ctx.lineWidth   = 18;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';
  ctx.setLineDash([0]);
  MAP_WORLDS.forEach((w, i) => {
    const px = w.x * W;
    const py = w.y * H;
    if (i === 0) ctx.moveTo(px, py);
    else         ctx.lineTo(px, py);
  });
  ctx.stroke();

  // Dashed progress path
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(255,220,80,0.85)';
  ctx.lineWidth   = 6;
  ctx.setLineDash([10, 10]);
  MAP_WORLDS.forEach((w, i) => {
    const px = w.x * W;
    const py = w.y * H;
    if (i === 0) ctx.moveTo(px, py);
    else         ctx.lineTo(px, py);
  });
  ctx.stroke();

  // Some decorative trees/clouds
  const decos = [
    { x:0.1, y:0.1,  em:'🌳' }, { x:0.88, y:0.08, em:'🌲' },
    { x:0.15, y:0.35, em:'🏡' }, { x:0.85, y:0.42, em:'🌊' },
    { x:0.08, y:0.6,  em:'🌸' }, { x:0.9,  y:0.65, em:'⛰️' },
    { x:0.1,  y:0.88, em:'🦋' }, { x:0.88, y:0.90, em:'🌈' },
  ];
  ctx.font = '24px serif';
  decos.forEach(d => ctx.fillText(d.em, d.x*W - 12, d.y*H + 8));

  // Place nodes
  const nodesLayer = document.getElementById('map-nodes');
  nodesLayer.style.width  = W + 'px';
  nodesLayer.style.height = H + 'px';
  nodesLayer.innerHTML    = '';

  MAP_WORLDS.forEach(w => {
    const unlock = WORLDS.find(x=>x.id===w.id)?.unlock ?? 0;
    const locked  = G.stars < unlock;
    const score   = G.scores[w.id] || 0;
    const done    = score >= 3;

    const node = document.createElement('div');
    node.className = `map-node${locked?' locked':''}${done?' done':''}`;
    node.style.cssText = `
      left:${w.x*W}px; top:${w.y*H}px;
      background:${locked?'#CCC':w.color};
    `;
    node.textContent = locked ? '🔒' : w.icon;
    node.title       = locked ? `${w.name} — unlock at ${unlock}⭐` : w.name;
    if (!locked) node.onclick = () => startWorld(w.id);

    const lbl = document.createElement('div');
    lbl.className = 'map-node-label';
    lbl.style.cssText = `left:${w.x*W}px; top:${w.y*H + 42}px;`;
    lbl.textContent   = locked ? '🔒' : w.name;

    nodesLayer.appendChild(node);
    nodesLayer.appendChild(lbl);
  });
}
