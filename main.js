/* PRESTIGE GROUP · main.js */

// ── Particles ──
(function(){
  const cv = document.getElementById('canvas'); if(!cv) return;
  const cx = cv.getContext('2d'); let W,H;
  function resize(){ W=cv.width=window.innerWidth; H=cv.height=window.innerHeight; }
  window.addEventListener('resize',resize,{passive:true}); resize();

  class P {
    constructor(init){ this.reset(init ?? true); }
    reset(init){
      this.x = Math.random() * W; this.y = init ? Math.random() * H : H + 12;
      this.r = Math.random() * 1.7 + .2;
      this.vx = (Math.random() - .5) * .38; this.vy = -(Math.random() * .48 + .1);
      this.life = 0; this.max = Math.random() * 360 + 160;
      this.w = Math.random() * Math.PI * 2; this.ws = Math.random() * .02 + .008;
      this.sq = Math.random() < .12; this.ma = Math.random() * .48 + .05;
    }
    tick(){
      this.w += this.ws; this.x += this.vx + Math.sin(this.w) * .3; this.y += this.vy;
      this.life++; this.a = this.ma * Math.sin(Math.PI * this.life / this.max);
      if(this.life >= this.max) this.reset(false);
    }
    draw(){
      cx.save(); cx.globalAlpha = this.a; cx.fillStyle = 'rgba(212,175,55,1)';
      if(this.sq){
        cx.translate(this.x,this.y); cx.rotate(this.w * 2);
        cx.fillRect(-this.r,-this.r,this.r*2,this.r*2);
      } else {
        cx.beginPath(); cx.arc(this.x,this.y,this.r,0,Math.PI*2); cx.fill();
      }
      cx.restore();
    }
  }
  class O {
    constructor(){ this.reset(true); }
    reset(init){
      this.x = Math.random() * W; this.y = init ? Math.random() * H : H + 90;
      this.r = Math.random() * 72 + 22; this.vy = -(Math.random() * .1 + .03);
      this.vx = (Math.random() - .5) * .1; this.life = 0;
      this.max = Math.random() * 700 + 380; this.ma = Math.random() * .036 + .007;
    }
    tick(){ this.x += this.vx; this.y += this.vy; this.life++; this.a = this.ma * Math.sin(Math.PI * this.life / this.max); if(this.life >= this.max) this.reset(false); }
    draw(){
      const g = cx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.r);
      g.addColorStop(0,`rgba(212,175,55,${this.a})`); g.addColorStop(1,'rgba(212,175,55,0)');
      cx.beginPath(); cx.arc(this.x,this.y,this.r,0,Math.PI*2); cx.fillStyle = g; cx.fill();
    }
  }
  const ps = Array.from({length:105},(_,i)=>new P(i<78));
  const os = Array.from({length:8},()=>new O());
  function loop(){ cx.clearRect(0,0,W,H); os.forEach(o=>{o.tick();o.draw();}); ps.forEach(p=>{p.tick();p.draw();}); requestAnimationFrame(loop); }
  loop();
})();

// ── Scroll Reveal ──
(function(){
  const els = document.querySelectorAll('.reveal,.reveal-l,.reveal-r');
  if(!els.length) return;
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }});
  },{threshold:.08});
  els.forEach(el=>io.observe(el));
})();

// ── General contact form ──
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  const serviceSelect = document.getElementById('contactServiceSelect');
  const towingRow = document.getElementById('contactTowingRow');
  const urgentField = document.getElementById('contactUrgentField');

  function updateContactFields(){
    if(!serviceSelect) return;
    const isTowing = serviceSelect.value === 'towing';
    if(towingRow) towingRow.style.display = isTowing ? 'grid' : 'none';
    if(urgentField) urgentField.style.display = isTowing ? 'block' : 'none';
  }

  if(serviceSelect){
    serviceSelect.addEventListener('change', updateContactFields);
    updateContactFields();
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    if(btn){
      btn.innerHTML = '<span>✦ &nbsp; Message Received — We\'ll Be In Touch Shortly</span>';
      btn.style.cssText = 'pointer-events:none;background:linear-gradient(135deg,#8a6a12,#d4af37);color:#000;border-color:#d4af37;width:100%;justify-content:center;padding:15px 34px;';
    }
  });
})();

// ── Recovery request form ──
(function(){
  const form = document.getElementById('recoveryForm');
  if(!form) return;

  const shareBtn = document.getElementById('shareLocationBtn');
  const status = document.getElementById('locationStatus');
  let hiddenLocationInput = form.querySelector('input[name="gps_location"]');

  if(!hiddenLocationInput){
    hiddenLocationInput = document.createElement('input');
    hiddenLocationInput.type = 'hidden';
    hiddenLocationInput.name = 'gps_location';
    form.appendChild(hiddenLocationInput);
  }

  if(shareBtn){
    shareBtn.addEventListener('click', () => {
      if(!navigator.geolocation){
        if(status) status.textContent = 'Location sharing is not supported on this device.';
        return;
      }

      if(status) status.textContent = 'Getting your location…';
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          hiddenLocationInput.value = `${latitude}, ${longitude}`;
          if(status) status.textContent = `Location added: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        },
        () => {
          if(status) status.textContent = 'Could not read your location. You can still type the address manually.';
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    if(btn){
      btn.innerHTML = '<span>✦ &nbsp; Recovery Request Sent — We\'ll Contact You Shortly</span>';
      btn.style.cssText = 'pointer-events:none;background:linear-gradient(135deg,#8a6a12,#d4af37);color:#000;border-color:#d4af37;justify-content:center;padding:15px 34px;';
    }
    if(status && !hiddenLocationInput.value){
      status.textContent = 'Request sent without GPS. Dispatch can still use your typed pickup location.';
    }
  });
})();

// ── Gallery tabs + lightbox ──
window.switchGTab = function(id,btn){
  document.querySelectorAll('.gallery-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.gtab').forEach(t=>t.classList.remove('active'));
  const panel = document.getElementById('gpanel-' + id);
  if(panel) panel.classList.add('active');
  btn.classList.add('active');
};
window.openLightbox = function(imgSrc,caption){
  const lb = document.getElementById('lightbox'); if(!lb) return;
  const img = document.getElementById('lb-img');
  const ph = document.getElementById('lb-ph');
  const cap = document.getElementById('lb-caption');
  if(imgSrc){ img.src = imgSrc; img.style.display = 'block'; if(ph) ph.style.display = 'none'; }
  else { if(img) img.style.display = 'none'; if(ph) ph.style.display = 'flex'; }
  if(cap) cap.textContent = caption || '';
  lb.classList.add('open');
};
window.closeLightbox = function(){
  const lb = document.getElementById('lightbox'); if(lb) lb.classList.remove('open');
};
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });
document.addEventListener('click', e => { if(e.target.id === 'lightbox') closeLightbox(); });
