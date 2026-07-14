/*
  open:grounds - script.js
  zero waste, davis - tabbed layout version
  places tab: filterable list + single shared map
  guide tabs: static editorial content in index.html
*/

/* ============================================================
   APP STATE
   ============================================================ */
var mainMap      = null;
var allMarkers   = {};   // place.id -> leaflet marker
var allPlaces    = SEED_DATA.slice();
var activeFilter = 'all';



/* ============================================================
   CATEGORY HELPERS
   ============================================================ */
function catInfo(id) {
  for (var i = 0; i < CATEGORIES.length; i++) {
    if (CATEGORIES[i].id === id) return CATEGORIES[i];
  }
  return { id: id, label: id, color: '#15130F' };
}
function catColor(id) { return catInfo(id).color; }
function catLabel(id) { return catInfo(id).label; }


/* ============================================================
   TAG LABELS
   maps a tag id (as written in data.js) to its display label.
   falls back to the raw id for any tag not listed here, so a
   new tag id in data.js never breaks rendering - it just shows
   up unstyled-but-functional until added below.
   ============================================================ */
var TAG_DEFS = [
  { id: 'free',            label: 'free' },
  { id: 'donation-based',  label: 'donation-based' },
  { id: 'membership',      label: 'membership' },
  { id: 'volunteer-run',   label: 'volunteer-run' },
  { id: 'student-run',     label: 'student-run' },
  { id: 'nonprofit',       label: 'nonprofit' },
  { id: 'community',       label: 'community-owned' },
  { id: '24-7',            label: 'open 24/7' }
];
function tagLabel(id) {
  for (var i = 0; i < TAG_DEFS.length; i++) {
    if (TAG_DEFS[i].id === id) return TAG_DEFS[i].label;
  }
  return id;
}




/* ============================================================
   VERIFIED DATE FORMAT
   ============================================================ */
function formatVerified(dateStr) {
  if (!dateStr) return '';
  var d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d.getTime())) return '';
  var months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}


/* ============================================================
   FILTER BAR
   builds category filter buttons from CATEGORIES that have data
   ============================================================ */
function buildFilterBar() {
  var bar = document.querySelector('#places-filter');
  if (!bar) return;

  // clear existing except 'all'
  bar.innerHTML = '<button class="filter-btn active" data-cat="all" onclick="filterPlaces(\'all\')">all</button>';

  for (var i = 0; i < CATEGORIES.length; i++) {
    var cat = CATEGORIES[i];
    if (cat.id === 'all') continue;
    var count = 0;
    for (var j = 0; j < allPlaces.length; j++) {
      if (allPlaces[j].category === cat.id) count++;
    }
    if (count === 0) continue;

    var btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.setAttribute('data-cat', cat.id);
    btn.style.setProperty('--c', cat.color);
    btn.onclick = (function(id) { return function() { filterPlaces(id); }; })(cat.id);
    btn.innerHTML = '<span class="filter-swatch"></span>' + cat.label;
    bar.appendChild(btn);
  }
}


/* ============================================================
   PLACE LIST
   flat list on the left, all places, filtered by category
   ============================================================ */
function renderPlaceList(catFilter) {
  var list = document.querySelector('#places-list');
  if (!list) return;
  list.innerHTML = '';

  var visible = catFilter === 'all'
    ? allPlaces
    : allPlaces.filter(function(p) { return p.category === catFilter; });

  if (visible.length === 0) {
    list.innerHTML = '<div class="places-empty">no places in this category yet.</div>';
    return;
  }

  for (var i = 0; i < visible.length; i++) {
    var place = visible[i];
    var el = document.createElement('div');
    el.className = 'place-row';
    el.setAttribute('data-id', place.id);

    var tagsHtml = '';
    var placeTags = place.tags || [];
    for (var t = 0; t < placeTags.length; t++) {
      tagsHtml += '<span class="listing-tag value-tag">' + tagLabel(placeTags[t]) + '</span>';
    }

    var partsHtml = '';
    if (place.parts && place.parts.length) {
      var chips = '';
      for (var p = 0; p < place.parts.length; p++) {
        chips += '<span class="place-part-chip">' + place.parts[p].name + '</span>';
      }
      partsHtml = '<div class="place-parts">' + chips + '</div>';
    }

    el.innerHTML =
      '<div class="place-row-cat" style="background:' + catColor(place.category) + '">' + catLabel(place.category) + '</div>' +
      '<div class="place-row-name">' + place.name + '</div>' +
      (place.address ? '<div class="place-row-addr">' + place.address + '</div>' : '') +
      (tagsHtml ? '<div class="place-row-tags">' + tagsHtml + '</div>' : '') +
      partsHtml;

    el.addEventListener('click', (function(pl) {
      return function() {
        openDrawer(pl);
        // pan map to marker
        if (mainMap && pl.lat != null) {
          mainMap.panTo([pl.lat, pl.lng], { animate: true });
          var mk = allMarkers[pl.id];
          if (mk) mk.openPopup();
        }
        // highlight row
        document.querySelectorAll('.place-row').forEach(function(r) { r.classList.remove('active'); });
        el.classList.add('active');
      };
    })(place));

    list.appendChild(el);
  }
}


/* ============================================================
   CATEGORY DESCRIPTIONS
   plain-english explanations shown when a filter is active.
   written for someone who's never heard of "refill & bulk" or
   "tool library" before - the answer to "what does this mean
   for me, specifically?"
   ============================================================ */
var CAT_DESCRIPTIONS = {
  'refill':     'places where you bring your own containers - bottles, jars, bags - and fill them up instead of buying new packaging each time. cheaper over time, zero packaging waste.',
  'repair':     'places that help you fix what you already own. repairing something almost always costs less than replacing it, and keeps it out of the landfill.',
  'secondhand': 'shops and spaces built around things that already exist. buying secondhand is one of the highest-impact zero waste habits - it extends the life of objects that already took energy to make.',
  'toollib':    'borrow tools instead of buying them. most tools get used once or twice. borrowing from a library means the tool gets shared across the community instead of sitting in ten different garages.',
  'compost':    'drop-off points for things your curbside bin won\'t take - bulk recyclables, scrap metal, sharps, used oil. if you\'re not sure where something goes, it often goes here.',
  'food':       'places where buying food is inherently lower-waste: local farms, loose produce, vendors who\'ll fill your own bags. the farmers market is one of the easiest zero waste habits to build.',
  'swap':       'spaces for passing things along without money changing hands. someone always needs what you\'re about to throw away.',
  'cafe':       'coffee shops that will fill your own mug or tumbler instead of a fresh disposable cup. Starbucks locations around Davis will do this too - hand over your cup and they\'ll put a tracking sticker on it. worth noting: BYO cup usually covers to-go orders, but "for here" glassware policies vary by shop and by drink (hot vs. cold), so check the individual listing.'
};


/* ============================================================
   FILTER ACTION
   ============================================================ */
function filterPlaces(catId) {
  activeFilter = catId;

  // update button states
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-cat') === catId);
  });

  // show/hide category description
  var descEl = document.querySelector('#cat-description');
  if (descEl) {
    if (catId === 'all' || !CAT_DESCRIPTIONS[catId]) {
      descEl.classList.remove('visible');
      descEl.innerHTML = '';
    } else {
      descEl.classList.add('visible');
      descEl.innerHTML = CAT_DESCRIPTIONS[catId];
    }
  }

  renderPlaceList(catId);
  updateMarkerVisibility(catId);
}


/* ============================================================
   MAIN MAP
   one shared map, all pins always present, toggled by filter
   ============================================================ */
function initMainMap() {
  var mapEl = document.querySelector('#main-map');
  if (!mapEl) return;

  mainMap = L.map(mapEl, {
    zoomControl: true,
    scrollWheelZoom: true,
    dragging: true
  });

  var STADIA_API_KEY = 'ac4366c6-d3c7-4f8b-85fd-0e87a1202622';

  L.tileLayer(
    'https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png?api_key=' + STADIA_API_KEY,
    {
      attribution: 'map tiles by <a href="https://stamen.com">stamen design</a>, &copy; <a href="https://stadiamaps.com">stadia maps</a>, data &copy; <a href="https://openstreetmap.org">osm</a>',
      maxZoom: 20
    }
  ).addTo(mainMap);

  addMapMarkers(allPlaces, true);
}

// adds (or refreshes) markers. pass fitBounds=true to auto-fit the view.
function addMapMarkers(places, fitBounds) {
  if (!mainMap) return;

  // clear existing place markers
  Object.keys(allMarkers).forEach(function(id) {
    mainMap.removeLayer(allMarkers[id]);
  });
  allMarkers = {};

  var bounds = [];

  for (var i = 0; i < places.length; i++) {
    var place = places[i];
    if (place.lat == null || place.lng == null) continue;

    var marker = L.marker([place.lat, place.lng], {
      icon: makeIcon(place.category)
    }).addTo(mainMap);

    marker.bindTooltip(place.name, { direction: 'top', offset: [0, -10] });

    marker.on('click', (function(pl) {
      return function() {
        openDrawer(pl);
        document.querySelectorAll('.place-row').forEach(function(r) { r.classList.remove('active'); });
        var row = document.querySelector('.place-row[data-id="' + pl.id + '"]');
        if (row) {
          row.classList.add('active');
          row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      };
    })(place));

    allMarkers[place.id] = marker;
    bounds.push([place.lat, place.lng]);
  }

  if (fitBounds && bounds.length > 0) {
    mainMap.fitBounds(bounds, { padding: [24, 24] });
  }
}

function makeIcon(catId) {
  var color = catColor(catId);
  var html = '<div class="place-marker-icon" style="background:' + color + ';border:2px solid #15130F;width:14px;height:14px;border-radius:50%;box-shadow:2px 2px 0 #15130F;"></div>';
  return L.divIcon({ className: '', html: html, iconSize: [14, 14], iconAnchor: [7, 7] });
}

function updateMarkerVisibility(catId) {
  for (var id in allMarkers) {
    var place = null;
    for (var i = 0; i < allPlaces.length; i++) {
      if (allPlaces[i].id === id) { place = allPlaces[i]; break; }
    }
    if (!place) continue;
    var marker = allMarkers[id];
    var visible = catId === 'all' || place.category === catId;
    if (visible) {
      if (!mainMap.hasLayer(marker)) mainMap.addLayer(marker);
    } else {
      if (mainMap.hasLayer(marker)) mainMap.removeLayer(marker);
    }
  }
}


/* ============================================================
   DETAIL DRAWER
   ============================================================ */
function buildDrawerHtml(place) {
  var addrHtml = place.address ? '<div class="drawer-addr">' + place.address + '</div>' : '';
  var descHtml = place.description ? '<div class="drawer-desc">' + place.description + '</div>' : '';
  var noteHtml = place.personalNote ? '<div class="drawer-note">' + place.personalNote + '</div>' : '';

  var placeTags = place.tags || [];
  var tagsHtml = '';
  for (var t = 0; t < placeTags.length; t++) {
    tagsHtml += '<span class="listing-tag value-tag">' + tagLabel(placeTags[t]) + '</span>';
  }
  if (tagsHtml) tagsHtml = '<div class="drawer-tags">' + tagsHtml + '</div>';

  var verifiedHtml = place.lastVerified
    ? '<div class="drawer-verified">verified ' + formatVerified(place.lastVerified) + ' &middot; ' +
      (place.source === 'official' ? 'official source' : 'researched') + '</div>'
    : '';

  var linkBtn = place.link
    ? '<a class="btn" href="' + place.link + '" target="_blank">visit website</a>'
    : '';
  var topPdfBtn = place.pdf
    ? '<a class="btn btn-secondary" href="' + place.pdf.url + '" target="_blank">' + place.pdf.label + '</a>'
    : '';
  var actionsHtml = (linkBtn || topPdfBtn)
    ? '<div class="drawer-actions">' + linkBtn + topPdfBtn + '</div>'
    : '';

  var partsHtml = '';
  if (place.parts && place.parts.length > 0) {
    var partsInner = '';
    for (var p = 0; p < place.parts.length; p++) {
      var part = place.parts[p];
      var partPdfHtml = part.pdf
        ? '<a class="drawer-pdf" href="' + part.pdf.url + '" target="_blank">' +
            '<span class="drawer-pdf-icon">&#x2913;</span>' + part.pdf.label +
          '</a>'
        : '';
      partsInner +=
        '<div class="drawer-part">' +
          '<div class="drawer-part-name">' + part.name + '</div>' +
          '<div class="drawer-part-desc">' + part.description + '</div>' +
          partPdfHtml +
        '</div>';
    }
    partsHtml = '<div class="drawer-parts-label">what\'s here</div>' + partsInner;
  }

  return (
    '<div class="drawer-cat" style="--cat-color:' + catColor(place.category) + '">' + catLabel(place.category) + '</div>' +
    '<div class="drawer-name">' + place.name + '</div>' +
    addrHtml + descHtml + noteHtml + tagsHtml + verifiedHtml + actionsHtml + partsHtml
  );
}

function openDrawer(place) {
  var content = document.querySelector('#drawer-content');
  if (content) {
    content.innerHTML = buildDrawerHtml(place);
    content.scrollTop = 0;
  }
  var backdrop = document.querySelector('#drawer-backdrop');
  if (backdrop) backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  var backdrop = document.querySelector('#drawer-backdrop');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
  document.querySelectorAll('.place-row').forEach(function(r) { r.classList.remove('active'); });
}


/* ============================================================
   DAY TRIPS
   refill shops beyond davis, reachable without a car. separate
   data array (DAYTRIP_DATA, from data.js) and separate drawer
   content builder since these places don't live on the davis map.
   ============================================================ */

/* transit mode icons - font awesome (already loaded in index.html
   for the tab bar icons), swapped in from inline SVGs for a closer
   match to the rest of the icon set. */
var TRANSIT_ICONS = {
  train: '<i class="fa-solid fa-train"></i>',
  bart:  '<i class="fa-solid fa-train-subway"></i>',
  bus:   '<i class="fa-solid fa-bus"></i>',
  bike:  '<i class="fa-solid fa-bicycle"></i>',
  walk:  '<i class="fa-solid fa-person-walking"></i>'
};
function transitIcon(mode) { return TRANSIT_ICONS[mode] || TRANSIT_ICONS.walk; }

var STATUS_DEFS = {
  'favorite':      { label: 'favorite',      color: '#FF3E86' },
  'regular':       { label: 'goes regularly', color: '#2F9BD6' },
  'want-to-visit': { label: "hasn't been yet", color: '#75695A' }
};
function statusInfo(id) { return STATUS_DEFS[id] || { label: id, color: '#75695A' }; }


function renderDaytripList() {
  var list = document.querySelector('#daytrip-list');
  if (!list) return;
  list.innerHTML = '';

  var trips = (typeof DAYTRIP_DATA !== 'undefined') ? DAYTRIP_DATA : [];
  for (var i = 0; i < trips.length; i++) {
    var trip = trips[i];
    var st = statusInfo(trip.status);

    var itemsHtml = '';
    if (trip.items && trip.items.length) {
      var chips = '';
      for (var it = 0; it < Math.min(trip.items.length, 4); it++) {
        chips += '<span class="place-part-chip">' + trip.items[it] + '</span>';
      }
      itemsHtml = '<div class="place-parts">' + chips + '</div>';
    }

    var el = document.createElement('div');
    el.className = 'place-row daytrip-card';
    el.innerHTML =
      '<div class="place-row-cat" style="background:' + catColor(trip.category) + '">' + catLabel(trip.category) + '</div>' +
      '<span class="trip-badge" style="--tc:' + st.color + '">' + st.label + '</span>' +
      '<div class="place-row-name">' + trip.name + '</div>' +
      '<div class="place-row-addr">' + trip.city + ' &middot; ' + trip.distanceLabel + '</div>' +
      itemsHtml;

    el.addEventListener('click', (function(tp) {
      return function() { openDaytripDrawer(tp); };
    })(trip));

    list.appendChild(el);
  }
}


function renderDaytripClosed() {
  var wrap = document.querySelector('#daytrip-closed');
  if (!wrap) return;
  wrap.innerHTML = '';

  var closed = (typeof DAYTRIP_CLOSED !== 'undefined') ? DAYTRIP_CLOSED : [];
  if (closed.length === 0) return;

  var inner = '<div class="daytrip-closed-label">no longer around</div>';
  for (var i = 0; i < closed.length; i++) {
    inner += '<div class="daytrip-closed-row"><strong>' + closed[i].name + '</strong> - ' + closed[i].note + '</div>';
  }
  wrap.innerHTML = inner;
}


/* photo gallery - reads from place.images (file paths under images/daytrips/).
   empty until I drop files in and list them in data.js. clicking a
   thumbnail opens the full image in a new tab. */
function buildGalleryHtml(place) {
  if (place.images && place.images.length) {
    var grid = '';
    for (var i = 0; i < place.images.length; i++) {
      var img = place.images[i];
      var src = img.src || img;
      var caption = img.caption ? '<div class="photo-caption">' + img.caption + '</div>' : '';
      grid += '<a class="photo-item" href="' + src + '" target="_blank">' +
                '<img src="' + src + '" alt="' + place.name + ' photo" loading="lazy">' +
                caption +
              '</a>';
    }
    return '<div class="drawer-parts-label">photos</div><div class="photo-gallery">' + grid + '</div>';
  }
  var emptyMsg = place.tripStatus === 'upcoming'
    ? 'trip planned - photos will go up here once it happens.'
    : 'no photos yet.';
  return '<div class="photo-gallery-empty">' + emptyMsg + '</div>';
}


function buildDaytripDrawerHtml(place) {
  var st = statusInfo(place.status);

  var itemsHtml = '';
  if (place.items && place.items.length) {
    var chips = '';
    for (var i = 0; i < place.items.length; i++) {
      chips += '<span class="place-part-chip">' + place.items[i] + '</span>';
    }
    itemsHtml = '<div class="drawer-parts-label">what I get here</div><div class="place-parts" style="margin-bottom:1rem;">' + chips + '</div>';
  }

  var noteHtml = place.personalNote
    ? '<div class="drawer-desc">' + place.personalNote + '</div>'
    : '';

  var linkBtn = place.link
    ? '<a class="btn" href="' + place.link + '" target="_blank">visit website</a>'
    : '';
  var actionsHtml = linkBtn ? '<div class="drawer-actions">' + linkBtn + '</div>' : '';

  var transitHtml = '';
  if (place.transit) {
    var stepsHtml = '';
    for (var s = 0; s < place.transit.steps.length; s++) {
      var step = place.transit.steps[s];
      stepsHtml +=
        '<div class="transit-step">' +
          '<div class="transit-step-icon">' + transitIcon(step.mode) + '</div>' +
          '<div class="transit-step-content">' +
            '<div class="transit-step-title">' + step.title + '</div>' +
            '<div class="transit-step-body">' + step.body + '</div>' +
          '</div>' +
        '</div>';
    }
    transitHtml =
      '<div class="transit-summary">' +
        '<div class="transit-summary-label">getting there without a car</div>' +
        '<div class="transit-summary-text">' + place.transit.summary + '</div>' +
        '<div class="transit-summary-time">' + place.transit.totalTime + '</div>' +
      '</div>' +
      '<div class="transit-steps">' + stepsHtml + '</div>' +
      '<div class="transit-disclaimer">times are approximate - check Capitol Corridor, BART, or transit agency schedules day-of.</div>';
  }

  var galleryHtml = buildGalleryHtml(place);

  return (
    '<div class="drawer-cat" style="--cat-color:' + catColor(place.category) + '">' + catLabel(place.category) + '</div>' +
    '<span class="trip-badge" style="--tc:' + st.color + '">' + st.label + '</span>' +
    '<div class="drawer-name">' + place.name + '</div>' +
    '<div class="drawer-addr">' + place.address + ' &middot; ' + place.distanceLabel + '</div>' +
    noteHtml + itemsHtml + actionsHtml + transitHtml + galleryHtml
  );
}


function openDaytripDrawer(place) {
  var content = document.querySelector('#drawer-content');
  if (content) {
    content.innerHTML = buildDaytripDrawerHtml(place);
    content.scrollTop = 0;
  }
  var backdrop = document.querySelector('#drawer-backdrop');
  if (backdrop) backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}


/* ============================================================
   TAB SWITCHING
   ============================================================ */
function switchTab(id) {
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === id);
  });
  document.querySelectorAll('.tab-panel').forEach(function(panel) {
    panel.classList.toggle('active', panel.id === 'tab-' + id);
  });
  // invalidate map size when switching to places tab
  if (id === 'places' && mainMap) {
    setTimeout(function() { mainMap.invalidateSize(); }, 50);
  }
}


/* ============================================================
   GEOCODING
   ============================================================ */
var GEO_CACHE_PREFIX = 'ogzw_geo_v1:';
function geoCache(key) {
  try { var v = localStorage.getItem(GEO_CACHE_PREFIX + key); return v ? JSON.parse(v) : null; }
  catch(e) { return null; }
}
function geoCacheSet(key, val) {
  try { localStorage.setItem(GEO_CACHE_PREFIX + key, JSON.stringify(val)); }
  catch(e) {}
}
async function geocodeOne(query) {
  var cached = geoCache(query);
  if (cached) return cached;
  try {
    var url = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&q=' + encodeURIComponent(query);
    var res  = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    var data = await res.json();
    if (data && data[0]) {
      var result = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      geoCacheSet(query, result);
      return result;
    }
  } catch(e) {}
  return null;
}
async function geocodeSeedData(places, onProgress) {
  var queue = places.filter(function(p) { return p.geocodeAddress; });
  for (var i = 0; i < queue.length; i++) {
    var p = queue[i];
    if (!geoCache(p.geocodeAddress)) {
      await new Promise(function(resolve) { setTimeout(resolve, 1100); });
    }
    var result = await geocodeOne(p.geocodeAddress);
    if (result) { p.lat = result.lat; p.lng = result.lng; }
    if (onProgress) onProgress(i + 1, queue.length);
  }
}


/* ============================================================
   ABOUT MODAL
   ============================================================ */
function openAbout()  { document.querySelector('#about-modal').classList.add('open'); }
function closeAbout() { document.querySelector('#about-modal').classList.remove('open'); }


/* ============================================================
   SCROLL REVEAL (for editorial tabs)
   ============================================================ */
function initScrollReveal() {
  var targets = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function(el) { el.classList.add('revealed'); });
    return;
  }
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  targets.forEach(function(el) { observer.observe(el); });
}


/* ============================================================
   BOOT
   ============================================================ */
function loadAll() {
  allPlaces = SEED_DATA.slice();
  buildFilterBar();
  renderPlaceList('all');
  initMainMap();
  renderDaytripList();
  renderDaytripClosed();
  initScrollReveal();

  if (mainMap) {
    setTimeout(function() { mainMap.invalidateSize(); }, 50);
  }

  // geocode any places that have a geocodeAddress.
  // renders immediately with fallback lat/lng from data.js, then refreshes
  // markers once nominatim returns accurate coords. results are cached in
  // localStorage so nominatim is only ever hit once per address.
  var needsGeocode = allPlaces.filter(function(p) { return p.geocodeAddress; });
  if (needsGeocode.length === 0) return;

  geocodeSeedData(allPlaces, null).then(function() {
    addMapMarkers(allPlaces, false);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var aboutModal = document.querySelector('#about-modal');
  if (aboutModal) aboutModal.addEventListener('click', function(e) {
    if (e.target === aboutModal) closeAbout();
  });
  var drawerBackdrop = document.querySelector('#drawer-backdrop');
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', function(e) {
    if (e.target === drawerBackdrop) closeDrawer();
  });
  var drawerCloseBtn = document.querySelector('#drawer-close');
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);

  loadAll();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeAbout(); closeDrawer(); }
});