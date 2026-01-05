
/* ===== Edit-friendly itinerary data & rendering =====
   HOW TO EDIT:
   1) Change the tripData object below (title, dates, travelers, overview, etc.).
   2) Replace images in /assets and update their filenames here.
   3) Swap the Google Maps iframe src in index.html under the #map section.
*/

const tripData = {
  title: "Paris & Provence Getaway",
  dates: { start: "2026-05-12", end: "2026-05-19" },
  tagline: "Culture, cuisine & countryside — with VIP hotel perks.",
  coverImage: "assets/cover.jpg", // replace with your hero image
  travelers: ["Alex", "Jordan"],
  advisor: { name: "Your Name", email: "you@example.com", phone: "+1 (212) 555‑1234" },
  overviewHtml: `
    <p>Welcome to your custom itinerary! This trip blends Parisian arts & dining with the vineyards and villages of Provence. Expect boutique stays, insider tables and unhurried days.</p>
    <p>We’ve planned a balanced pace — mornings for sights, afternoons for leisure, and curated reservations at can’t‑miss spots.</p>
  `,
  highlights: [
    "Skip‑the‑line museum entries",
    "Chef’s‑table dinner in Paris",
    "Private driver in Provence",
    "Late checkout & breakfast daily"
  ],
  days: [
    {
      date: "2026-05-12", label: "Day 1 — Arrive Paris",
      items: [
        { time: "10:30", title: "Arrive CDG", note: "Driver meets at Terminal 2E", badges: ["Transfer"], location: "CDG" },
        { time: "12:00", title: "Check‑in: Hôtel du Louvre", note: "Ask for quiet courtyard room", badges: ["Hotel"], link: "https://www.hyatt.com/en-US/hotel/france/hotel-du-louvre/parro" },
        { time: "18:30", title: "Dinner: Le Comptoir du Relais", note: "Reservation under Alex", badges: ["Dining"], link: "https://goo.gl/maps/" }
      ]
    },
    {
      date: "2026-05-13", label: "Day 2 — Left Bank & Louvre",
      items: [
        { time: "09:00", title: "Café breakfast", note: "Maison Sauvage", badges: ["Dining"] },
        { time: "10:30", title: "Louvre Highlights", note: "Skip‑the‑line", badges: ["Tickets"], link: "https://www.louvre.fr/" },
        { time: "15:30", title: "Seine stroll & gelato", note: "Berthillon", badges: ["Leisure"] }
      ]
    },
    {
      date: "2026-05-16", label: "Day 5 — Train to Avignon",
      items: [
        { time: "10:04", title: "TGV Paris → Avignon", note: "Coach 6, seats 42–43", badges: ["Train"], link: "https://www.sncf.com" },
        { time: "13:00", title: "Check‑in: Crillon le Brave", note: "Late checkout confirmed", badges: ["Hotel"] },
        { time: "19:00", title: "Wine‑pairing dinner", note: "Hotel restaurant", badges: ["Dining"] }
      ]
    }
  ],
  hotels: [
    {
      name: "Hôtel du Louvre",
      city: "Paris",
      image: "assets/hotel-paris.jpg",
      blurb: "Classic meets contemporary steps from the Musée du Louvre.",
      perks: "Breakfast daily • $100 hotel credit • Upgrade on arrival when available",
      link: "https://www.hyatt.com/en-US/hotel/france/hotel-du-louvre/parro"
    },
    {
      name: "Crillon le Brave",
      city: "Provence",
      image: "assets/hotel-provence.jpg",
      blurb: "Stone‑walled village hideaway with vineyard views.",
      perks: "Breakfast daily • $100 resort credit • Late checkout when available",
      link: "https://www.crillonlebrave.com/"
    }
  ],
  experiences: [
    { title: "Louvre Guided Highlights", kind: "Culture", image: "assets/exp-louvre.jpg", note: "2.5h private tour", link: "https://www.louvre.fr/" },
    { title: "Chef’s Table", kind: "Dining", image: "assets/exp-chef.jpg", note: "Tasting menu", link: "#" },
    { title: "Vintage 2CV Ride", kind: "Activity", image: "assets/exp-2cv.jpg", note: "Left Bank loop", link: "#" },
    { title: "Provence Wine Tasting", kind: "Activity", image: "assets/exp-wine.jpg", note: "Châteauneuf‑du‑Pape", link: "#" }
  ],
  logistics: {
    flights: [
      { label: "JFK → CDG", details: "AF 23 • Dep 7:30 PM • Arr 8:50 AM (+1) • Conf: ABC123" },
      { label: "MRS → JFK", details: "DL 180 • Dep 11:15 AM • Arr 2:45 PM • Conf: XYZ789" }
    ],
    transfers: [
      { label: "CDG → Hôtel du Louvre", details: "Private sedan • Driver: Marc (+33 6 12 34 56 78)" },
      { label: "Avignon station → Crillon le Brave", details: "Hotel transfer confirmed" }
    ],
    reservations: [
      { label: "Le Comptoir du Relais", details: "May 12 • 6:30 PM • 2 guests" },
      { label: "Chef’s Table", details: "May 13 • 7:00 PM • 2 guests" }
    ]
  },
  faq: [
    { q: "What’s included?", a: "Hotel perks, curated reservations and on‑trip support. Flights & tours as listed." },
    { q: "How do we reach support?", a: "Text or call your advisor — details below — and we’ll handle changes or hiccups." }
  ],
  gallery: [
    "assets/gal-1.jpg", "assets/gal-2.jpg", "assets/gal-3.jpg", "assets/gal-4.jpg"
  ]
};

/* ===== Render helpers ===== */
const fmtDate = (iso) => new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();

// Hero
document.getElementById('tripTitle').textContent = tripData.title;
document.getElementById('tripDates').textContent = `${fmtDate(tripData.dates.start)} – ${fmtDate(tripData.dates.end)}`;
document.getElementById('tripTagline').textContent = tripData.tagline;

// Overview
const overviewText = document.getElementById('overviewText');
overviewText.innerHTML = tripData.overviewHtml;

document.getElementById('travelers').textContent = tripData.travelers.join(', ');
document.getElementById('advisor').textContent = `${tripData.advisor.name} • ${tripData.advisor.email} • ${tripData.advisor.phone}`;

const highlights = document.getElementById('highlights');
tripData.highlights.forEach(h => {
  const li = document.createElement('li'); li.textContent = h; highlights.appendChild(li);
});

// Days
const dayList = document.getElementById('dayList');
tripData.days.forEach(day => {
  const wrap = document.createElement('article'); wrap.className = 'day-card';
  wrap.innerHTML = `<header><h3>${day.label}</h3><div class="muted">${fmtDate(day.date)}</div></header>`;
  const tl = document.createElement('div'); tl.className = 'timeline';
  day.items.forEach(item => {
    const row = document.createElement('div'); row.className = 'timeline-item';
    const badges = (item.badges||[]).map(b => `<span class="badge">${b}</span>`).join('');
    const link = item.link ? `<a href="${item.link}" target="_blank" rel="noopener">${item.title}</a>` : `<strong>${item.title}</strong>`;
    row.innerHTML = `<div class="time">${item.time||''}</div><div><p class="item-title">${link}</p><p class="muted">${item.note||''}</p><div class="badges">${badges}</div></div>`;
    tl.appendChild(row);
  });
  wrap.appendChild(tl);
  dayList.appendChild(wrap);
});

// Hotels
const hotelList = document.getElementById('hotelList');
tripData.hotels.forEach(h => {
  const card = document.createElement('div'); card.className = 'card-sm';
  card.innerHTML = `
    <img src="${h.image}" alt="${h.name}">
    <h3>${h.name}</h3>
    <p class="muted">${h.city}</p>
    <p>${h.blurb}</p>
    <p class="property-perks">${h.perks}</p>
    <p><a href="${h.link}" target="_blank" rel="noopener">Learn more</a></p>
  `;
  hotelList.appendChild(card);
});

// Experiences + filters
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
    const card = document.createElement('div'); card.className = 'card-sm';
    card.innerHTML = `
      <img src="${e.image}" alt="${e.title}">
      <h3>${e.title}</h3>
      <p class="muted">${e.kind}</p>
      <p>${e.note}</p>
      <p><a href="${e.link}" target="_blank" rel="noopener">View</a></p>
    `;
    experienceList.appendChild(card);
  });
}
renderExperiences();

// Logistics
const flightList = document.getElementById('flightList');
tripData.logistics.flights.forEach(f => {
  const line = document.createElement('div'); line.className = 'line';
  line.innerHTML = `<div class="label">Flight</div><div>${f.label}</div><div class="muted">${f.details}</div>`;
  flightList.appendChild(line);
});

const transferList = document.getElementById('transferList');
tripData.logistics.transfers.forEach(t => {
  const line = document.createElement('div'); line.className = 'line';
  line.innerHTML = `<div class="label">Transfer</div><div>${t.label}</div><div class="muted">${t.details}</div>`;
  transferList.appendChild(line);
});

const reservationList = document.getElementById('reservationList');
tripData.logistics.reservations.forEach(r => {
  const line = document.createElement('div'); line.className = 'line';
  line.innerHTML = `<div class="label">Reservation</div><div>${r.label}</div><div class="muted">${r.details}</div>`;
  reservationList.appendChild(line);
});

// FAQ
const faqList = document.getElementById('faqList');
tripData.faq.forEach(pair => {
  const d = document.createElement('details');
  const s = document.createElement('summary'); s.textContent = pair.q; d.appendChild(s);
  const a = document.createElement('div'); a.className = 'answer'; a.textContent = pair.a; d.appendChild(a);
  faqList.appendChild(d);
});

// Gallery
const galleryGrid = document.getElementById('galleryGrid');
tripData.gallery.forEach(src => {
  const img = document.createElement('img'); img.src = src; img.alt = 'Trip photo'; galleryGrid.appendChild(img);
});

// Contact block
const contactBlock = document.getElementById('contactBlock');
contactBlock.innerHTML = `
  <div>
    <h3>Advisor</h3>
    <p>${tripData.advisor.name}<br>${tripData.advisor.email}<br>${tripData.advisor.phone}</p>
    <div class="cta"><a class="btn ghost" href="mailto:${tripData.advisor.email}">Email</a><a class="btn ghost" href="tel:${tripData.advisor.phone}">Call</a></div>
  </div>
  <div>
    <h3>On‑Trip Support</h3>
    <p>Text for changes or emergencies. We’ll handle the rest.</p>
  </div>
`;

/* ===== Actions ===== */
document.getElementById('printBtn').addEventListener('click', () => window.print());

// Simple ICS generator: builds calendar for day items with time
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
      // 90-minute default duration
      const end = toStamp(day.date, item.time ? String(Number(item.time.split(':')[0])+1)+':'+item.time.split(':')[1] : '10:30');
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
  const a = document.createElement('a'); a.href = url; a.download = `${tripData.title.replace(/\s+/g,'_')}.ics`; a.click();
  setTimeout(()=>URL.revokeObjectURL(url), 5000);
});
