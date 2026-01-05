
/* ===== Modern itinerary data, motion & access gate ===== */
const tripData = {
  title: "Rio de Janeiro & Paraty",
  dates: { start: "2026-08-10", end: "2026-08-16" },
  tagline: "Beach energy, samba nights & rainforest escapes.",
  coverImage: "assets/cover.jpg",
  travelers: ["Ubaldo", "Guest"],
  advisor: { name: "Ubaldo Escalante", email: "ubaldo@example.com", phone: "+1 (917) 000‑0000" },
  overviewHtml: `
    <p>A colorful, photo‑forward journey through <strong>Rio de Janeiro</strong> and the colonial coast of <strong>Paraty</strong>. Expect sunrise beach walks, cable‑car views over Guanabara Bay and caipirinhas at golden hour.</p>
    <p>We balanced big‑ticket sights with relaxed windows to explore neighborhoods, take boat days and chase great light for photos.</p>
  `,
  highlights: [
    "Christ the Redeemer & Sugarloaf",
    "Sunset boat in Paraty Bay",
    "Beachfront boutique stays",
    "VIP arrival amenities at partner hotels"
  ],
  days: [
    {
      date: "2026-08-10", label: "Day 1 — Arrive Rio",
      items: [
        { time: "09:40", title: "Arrive GIG", note: "Driver meets at Terminal 2", badges: ["Transfer"], image: "assets/rio-arrival.jpg" },
        { time: "12:00", title: "Check‑in: Hotel Fasano Ipanema", note: "Sea‑view room requested", badges: ["Hotel"], link: "https://www.fasano.com.br/rio", image: "assets/fasano.jpg" },
        { time: "18:30", title: "Dinner: Zazá Bistrô Tropical", note: "Reservation under Ubaldo", badges: ["Dining"], image: "assets/zaza.jpg" }
      ]
    },
    {
      date: "2026-08-11", label: "Day 2 — Corcovado & Santa Teresa",
      items: [
        { time: "08:00", title: "Christ the Redeemer", note: "Early visit to beat crowds", badges: ["Tickets"], image: "assets/corcovado.jpg" },
        { time: "13:00", title: "Santa Teresa Art Walk", badges: ["Activity"], image: "assets/santateresa.jpg" },
        { time: "19:30", title: "Samba night in Lapa", badges: ["Leisure"], image: "assets/lapa.jpg" }
      ]
    },
    {
      date: "2026-08-13", label: "Day 4 — Paraty Boat Day",
      items: [
        { time: "10:00", title: "Private schooner from Paraty", note: "Snorkel gear onboard", badges: ["Activity"], image: "assets/paraty-boat.jpg" },
        { time: "13:30", title: "Lunch afloat", badges: ["Dining"], image: "assets/paraty-lunch.jpg" },
        { time: "18:00", title: "Sunset swim", badges: ["Leisure"], image: "assets/paraty-sunset.jpg" }
      ]
    }
  ],
  hotels: [
    { name: "Hotel Fasano Ipanema", city: "Rio de Janeiro", image: "assets/fasano.jpg", blurb: "Design‑driven beachfront icon in Ipanema.", perks: "Breakfast daily • $100 credit • Upgrade when available", link: "https://www.fasano.com.br/rio" },
    { name: "Santa Teresa MGallery", city: "Rio de Janeiro", image: "assets/santateresa-hotel.jpg", blurb: "Boutique hillside retreat with artful rooms.", perks: "Breakfast daily • Spa credit • Late checkout", link: "#" },
    { name: "Pousada Literária", city: "Paraty", image: "assets/pousada-literaria.jpg", blurb: "Charming pousada in the colonial center.", perks: "Breakfast daily • $100 credit • Upgrade when available", link: "#" }
  ],
  experiences: [
    { title: "Christ the Redeemer", kind: "Culture", image: "assets/corcovado.jpg", note: "Early access & private guide", link: "#" },
    { title: "Sugarloaf Cable Car", kind: "Activity", image: "assets/sugarloaf.jpg", note: "Golden hour views", link: "#" },
    { title: "Caipirinha & Samba", kind: "Dining", image: "assets/caipirinha.jpg", note: "Taste & music crawl", link: "#" },
    { title: "Paraty Schooner Day", kind: "Activity", image: "assets/paraty-boat.jpg", note: "Hidden coves & snorkeling", link: "#" }
  ],
  logistics: {
    flights: [
      { label: "JFK → GIG", details: "DL 80 • Dep 9:00 PM • Arr 9:40 AM (+1) • Conf: ABC123" },
      { label: "GIG → JFK", details: "AA 973 • Dep 11:20 AM • Arr 7:45 PM • Conf: XYZ789" }
    ],
    transfers: [
      { label: "GIG → Fasano", details: "Private sedan • Driver: Paulo (+55 21 99999‑9999)" },
      { label: "Rio → Paraty", details: "4h scenic drive • Private vehicle" }
    ],
    reservations: [
      { label: "Zazá Bistrô Tropical", details: "Aug 10 • 6:30 PM • 2 guests" },
      { label: "Schooner Charter", details: "Aug 13 • 10:00 AM • 6 hours" }
    ]
  },
  faq: [
    { q: "What’s included?", a: "Hotel perks, curated reservations, select tours and on‑trip support." },
    { q: "Can we change times?", a: "Absolutely—text your advisor. We’ll shuffle bookings for you." }
  ],
  gallery: [
    "assets/gal-1.jpg","assets/gal-2.jpg","assets/gal-3.jpg","assets/gal-4.jpg","assets/gal-5.jpg","assets/gal-6.jpg","assets/gal-7.jpg","assets/gal-8.jpg"
  ]
};

/* ===== Utilities ===== */
const fmtDate = (iso) => new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Password Gate ===== */
const gate = document.getElementById('gate');
const gateInput = document.getElementById('gateInput');
const gateBtn = document.getElementById('gateBtn');
const gateError = document.getElementById('gateError');

async function sha256Hex(text){
  const enc = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', enc);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('');
}

async function checkPassword(){
  const val = gateInput.value || '';
  const hex = await sha256Hex(val);
  if(hex === window.PASSWORD_HASH){
    localStorage.setItem('tripGateOk','true');
    gate.style.opacity = '0';
    setTimeout(()=>{ gate.style.display = 'none'; }, 300);
  } else {
    gateError.textContent = 'Wrong password. Try again.';
  }
}

gateBtn.addEventListener('click', checkPassword);

gateInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ checkPassword(); } });

(function initGate(){
  const url = new URL(window.location.href);
  const passParam = url.searchParams.get('pass');
  if(localStorage.getItem('tripGateOk')==='true'){ gate.style.display='none'; return; }
  if(passParam){ sha256Hex(passParam).then(hex=>{ if(hex===window.PASSWORD_HASH){ localStorage.setItem('tripGateOk','true'); gate.style.display='none'; } }); }
})();

/* ===== Hero ===== */
const hero = document.querySelector('.hero');
document.getElementById('tripTitle').textContent = tripData.title;
document.getElementById('tripDates').textContent = `${fmtDate(tripData.dates.start)} – ${fmtDate(tripData.dates.end)}`;
document.getElementById('tripTagline').textContent = tripData.tagline;
if(tripData.coverImage){ hero.style.backgroundImage = `url('${tripData.coverImage}')`; }

/* ===== Overview ===== */
const overviewText = document.getElementById('overviewText');
overviewText.innerHTML = tripData.overviewHtml;
document.getElementById('travelers').textContent = tripData.travelers.join(', ');
document.getElementById('advisor').textContent = `${tripData.advisor.name} • ${tripData.advisor.email} • ${tripData.advisor.phone}`;
const highlights = document.getElementById('highlights');
tripData.highlights.forEach(h => { const li = document.createElement('li'); li.textContent = h; highlights.appendChild(li); });

/* ===== Days (with thumbnails) + sticky index ===== */
const dayList = document.getElementById('dayList');
const dayIndex = document.getElementById('dayIndex');
const indexList = document.createElement('ul'); indexList.className = 'index-list';

tripData.days.forEach(day => {
  const id = `day-${day.date}`;
  const wrap = document.createElement('article'); wrap.className = 'day-card reveal'; wrap.id = id;
  wrap.innerHTML = `<header><h3>${day.label}</h3><div class="muted">${fmtDate(day.date)}</div></header>`;
  const tl = document.createElement('div'); tl.className = 'timeline';
  day.items.forEach(item => {
    const row = document.createElement('div'); row.className = 'timeline-item';
    const badges = (item.badges||[]).map(b => `<span class="badge">${b}</span>`).join('');
    const link = item.link ? `<a href="${item.link}" target="_blank" rel="noopener">${item.title}</a>` : `<strong>${item.title}</strong>`;
    const img = item.image ? `<img class='thumb' src='${item.image}' alt='${item.title}' loading='lazy'>` : `<img class='thumb' src='assets/placeholder.jpg' alt='${item.title}' loading='lazy'>`;
    row.innerHTML = `<div class="time">${item.time||''}</div><div><p class="item-title">${link}</p><p class="muted">${item.note||''}</p><div class="badges">${badges}</div></div>${img}`;
    tl.appendChild(row);
  });
  wrap.appendChild(tl);
  dayList.appendChild(wrap);

  // Build index item
  const li = document.createElement('li');
  li.className = 'index-item';
  li.innerHTML = `<span>•</span><span>${day.label}</span>`;
  li.addEventListener('click', () => {
    const y = document.getElementById(id).getBoundingClientRect().top + window.scrollY - 74; // offset for sticky header
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
  li.dataset.target = id;
  indexList.appendChild(li);
});

dayIndex.appendChild(indexList);

// Scrollspy: highlight active day in index
const dayCards = [...document.querySelectorAll('.day-card')];
const indexItems = [...document.querySelectorAll('.index-item')];
const spy = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const id = e.target.id;
      indexItems.forEach(i=>i.classList.toggle('active', i.dataset.target===id));
    }
  });
},{ rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

dayCards.forEach(dc=>spy.observe(dc));

/* ===== Hotels (photo-forward) ===== */
const hotelList = document.getElementById('hotelList');
tripData.hotels.forEach(h => {
  const card = document.createElement('div'); card.className = 'card-sm reveal';
  card.innerHTML = `
    <img class='cover' src='${h.image}' alt='${h.name}' loading='lazy'>
    <div class='content'>
      <h3>${h.name}</h3>
      <p class='muted'>${h.city}</p>
      <p>${h.blurb}</p>
      <p class='property-perks'>${h.perks}</p>
      <p><a href='${h.link}' target='_blank' rel='noopener' style='color:#fff;text-decoration:underline'>Learn more</a></p>
    </div>
  `;
  hotelList.appendChild(card);
});

/* ===== Experiences + filters ===== */
const experienceFilters = document.getElementById('experienceFilters');
const kinds = [...new Set(tripData.experiences.map(e => e.kind))];
let activeKind = 'All';
['All', ...kinds].forEach(k => {
  const chip = document.createElement('button'); chip.className = 'filter-chip' + (k==='All' ? ' active' : '');
  chip.textContent = k; chip.onclick = () => { activeKind = k; renderExperiences(); document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active')); chip.classList.add('active'); };
  experienceFilters.appendChild(chip);
});

const experienceList = document.getElementById('experienceList');
function renderExperiences(){
  experienceList.innerHTML = '';
  tripData.experiences.filter(e => activeKind==='All' || e.kind===activeKind).forEach(e => {
    const card = document.createElement('div'); card.className = 'card-sm reveal';
    card.innerHTML = `
      <img class='cover' src='${e.image}' alt='${e.title}' loading='lazy'>
      <div class='content'>
        <h3>${e.title}</h3>
        <p class='muted'>${e.kind}</p>
        <p>${e.note}</p>
        <p><a href='${e.link}' target='_blank' rel='noopener' style='color:#fff;text-decoration:underline'>View</a></p>
      </div>
    `;
    experienceList.appendChild(card);
  });
}
renderExperiences();

/* ===== Logistics ===== */
const flightList = document.getElementById('flightList');
tripData.logistics.flights.forEach(f => { const line = document.createElement('div'); line.className = 'line reveal'; line.innerHTML = `<div class='label'>Flight</div><div>${f.label}</div><div class='muted'>${f.details}</div>`; flightList.appendChild(line); });
const transferList = document.getElementById('transferList');
tripData.logistics.transfers.forEach(t => { const line = document.createElement('div'); line.className = 'line reveal'; line.innerHTML = `<div class='label'>Transfer</div><div>${t.label}</div><div class='muted'>${t.details}</div>`; transferList.appendChild(line); });
const reservationList = document.getElementById('reservationList');
tripData.logistics.reservations.forEach(r => { const line = document.createElement('div'); line.className = 'line reveal'; line.innerHTML = `<div class='label'>Reservation</div><div>${r.label}</div><div class='muted'>${r.details}</div>`; reservationList.appendChild(line); });

/* ===== FAQ ===== */
const faqList = document.getElementById('faqList');
tripData.faq.forEach(pair => { const d = document.createElement('details'); const s = document.createElement('summary'); s.textContent = pair.q; d.appendChild(s); const a = document.createElement('div'); a.className = 'answer'; a.textContent = pair.a; d.appendChild(a); d.classList.add('reveal'); faqList.appendChild(d); });

/* ===== Gallery masonry ===== */
const masonry = document.getElementById('galleryMasonry');
tripData.gallery.forEach(src => { const img = document.createElement('img'); img.src = src; img.alt = 'Trip photo'; img.loading = 'lazy'; masonry.appendChild(img); });

/* ===== Header actions ===== */
document.getElementById('printBtn').addEventListener('click', () => window.print());

// ICS generation (fixed)
function buildICS(){
  const pad = (n)=> (n<10?'0':'')+n;
  const toStamp = (isoDate, time) => {
    const d = new Date(`${isoDate}T${time||'09:00'}:00`);
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  };
  let ics = 'BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Trip Template//EN
';
  tripData.days.forEach(day => {
    day.items.forEach(item => {
      const start = toStamp(day.date, item.time || '09:00');
      const hour = item.time ? Number(item.time.split(':')[0]) : 9;
      const minute = item.time ? Number(item.time.split(':')[1]) : 0;
      const endHour = hour + 1; // default 1h duration
      const end = toStamp(day.date, `${String(endHour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`);
      ics += 'BEGIN:VEVENT
';
      ics += `UID:${crypto.randomUUID()}
`;
      ics += `DTSTAMP:${start}
`;
      ics += `DTSTART:${start}
`;
      ics += `DTEND:${end}
`;
      ics += `SUMMARY:${item.title}
`;
      ics += `DESCRIPTION:${(item.note||'').replace(/
/g,' ')}
`;
      ics += 'END:VEVENT
';
    });
  });
  ics += 'END:VCALENDAR
';
  return ics;
}

document.getElementById('icsBtn').addEventListener('click', () => {
  const ics = buildICS();
  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `${tripData.title.replace(/\s+/g,'_')}.ics`; a.click(); setTimeout(()=>URL.revokeObjectURL(url), 5000);
});

/* ===== Motion ===== */
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in-view'); obs.unobserve(e.target); } });
},{ threshold: 0.15 });
reveals.forEach(el=>obs.observe(el));

/* Parallax banner & progress */
const heroEl = document.querySelector('[data-parallax]');
window.addEventListener('scroll', ()=>{
  const y = window.scrollY; heroEl.style.backgroundPosition = `center ${y*0.15}px`;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const p = Math.max(0, Math.min(1, y / docH));
  document.querySelector('.scroll-progress .bar').style.width = (p*100)+'%';
});
