"use strict";

const STATE_NAMES = {
  "01": "Alabama",
  "02": "Alaska",
  "04": "Arizona",
  "05": "Arkansas",
  "06": "California",
  "08": "Colorado",
  "09": "Connecticut",
  "10": "Delaware",
  "12": "Florida",
  "13": "Georgia",
  "15": "Hawaii",
  "16": "Idaho",
  "17": "Illinois",
  "18": "Indiana",
  "19": "Iowa",
  "20": "Kansas",
  "21": "Kentucky",
  "22": "Louisiana",
  "23": "Maine",
  "24": "Maryland",
  "25": "Massachusetts",
  "26": "Michigan",
  "27": "Minnesota",
  "28": "Mississippi",
  "29": "Missouri",
  "30": "Montana",
  "31": "Nebraska",
  "32": "Nevada",
  "33": "New Hampshire",
  "34": "New Jersey",
  "35": "New Mexico",
  "36": "New York",
  "37": "North Carolina",
  "38": "North Dakota",
  "39": "Ohio",
  "40": "Oklahoma",
  "41": "Oregon",
  "42": "Pennsylvania",
  "44": "Rhode Island",
  "45": "South Carolina",
  "46": "South Dakota",
  "47": "Tennessee",
  "48": "Texas",
  "49": "Utah",
  "50": "Vermont",
  "51": "Virginia",
  "53": "Washington",
  "54": "West Virginia",
  "55": "Wisconsin",
  "56": "Wyoming"
};

const WEST_NAMES = {
  "020": "Andorra",
  "040": "Austria",
  "056": "Belgium",
  "208": "Denmark",
  "246": "Finland",
  "250": "France",
  "276": "Germany",
  "352": "Iceland",
  "372": "Ireland",
  "380": "Italy",
  "438": "Liechtenstein",
  "442": "Luxembourg",
  "470": "Malta",
  "528": "Netherlands",
  "578": "Norway",
  "620": "Portugal",
  "674": "San Marino",
  "724": "Spain",
  "752": "Sweden",
  "756": "Switzerland",
  "826": "United Kingdom"
};

const EAST_NAMES = {
  "008": "Albania",
  "112": "Belarus",
  "070": "Bosnia and Herzegovina",
  "100": "Bulgaria",
  "191": "Croatia",
  "196": "Cyprus",
  "203": "Czechia",
  "233": "Estonia",
  "300": "Greece",
  "348": "Hungary",
  "383": "Kosovo",
  "428": "Latvia",
  "440": "Lithuania",
  "498": "Moldova",
  "499": "Montenegro",
  "807": "North Macedonia",
  "616": "Poland",
  "642": "Romania",
  "643": "Russia",
  "688": "Serbia",
  "703": "Slovakia",
  "705": "Slovenia",
  "792": "Turkey",
  "804": "Ukraine"
};

const EUROPE_NAMES = { ...WEST_NAMES, ...EAST_NAMES };

const AFRICA_NAMES = {
  "012": "Algeria",
  "024": "Angola",
  "204": "Benin",
  "072": "Botswana",
  "854": "Burkina Faso",
  "108": "Burundi",
  "132": "Cabo Verde",
  "120": "Cameroon",
  "140": "Central African Republic",
  "148": "Chad",
  "174": "Comoros",
  "178": "Republic of the Congo",
  "384": "Côte d'Ivoire",
  "180": "Democratic Republic of the Congo",
  "262": "Djibouti",
  "818": "Egypt",
  "226": "Equatorial Guinea",
  "232": "Eritrea",
  "748": "Eswatini",
  "231": "Ethiopia",
  "266": "Gabon",
  "270": "The Gambia",
  "288": "Ghana",
  "324": "Guinea",
  "624": "Guinea-Bissau",
  "404": "Kenya",
  "426": "Lesotho",
  "430": "Liberia",
  "434": "Libya",
  "450": "Madagascar",
  "454": "Malawi",
  "466": "Mali",
  "478": "Mauritania",
  "480": "Mauritius",
  "504": "Morocco",
  "508": "Mozambique",
  "516": "Namibia",
  "562": "Niger",
  "566": "Nigeria",
  "646": "Rwanda",
  "678": "São Tomé and Príncipe",
  "686": "Senegal",
  "690": "Seychelles",
  "694": "Sierra Leone",
  "706": "Somalia",
  "710": "South Africa",
  "728": "South Sudan",
  "729": "Sudan",
  "834": "Tanzania",
  "768": "Togo",
  "788": "Tunisia",
  "800": "Uganda",
  "732": "Western Sahara",
  "894": "Zambia",
  "716": "Zimbabwe"
};

const CENTRAL_NAMES = {
  "084": "Belize",
  "188": "Costa Rica",
  "222": "El Salvador",
  "320": "Guatemala",
  "340": "Honduras",
  "558": "Nicaragua",
  "591": "Panama"
};

const SOUTH_NAMES = {
  "032": "Argentina",
  "068": "Bolivia",
  "076": "Brazil",
  "152": "Chile",
  "170": "Colombia",
  "218": "Ecuador",
  "328": "Guyana",
  "600": "Paraguay",
  "604": "Peru",
  "740": "Suriname",
  "858": "Uruguay",
  "862": "Venezuela"
};

const CANADA_NAMES = {
  AB: "Alberta",
  BC: "British Columbia",
  MB: "Manitoba",
  NB: "New Brunswick",
  NL: "Newfoundland and Labrador",
  NT: "Northwest Territories",
  NS: "Nova Scotia",
  NU: "Nunavut",
  ON: "Ontario",
  PE: "Prince Edward Island",
  QC: "Quebec",
  SK: "Saskatchewan",
  YT: "Yukon"
};

const FLAG_CODES = {
  "008": "AL",
  "012": "DZ",
  "020": "AD",
  "024": "AO",
  "032": "AR",
  "040": "AT",
  "056": "BE",
  "068": "BO",
  "070": "BA",
  "072": "BW",
  "076": "BR",
  "084": "BZ",
  "100": "BG",
  "108": "BI",
  "112": "BY",
  "120": "CM",
  "132": "CV",
  "140": "CF",
  "148": "TD",
  "152": "CL",
  "170": "CO",
  "174": "KM",
  "178": "CG",
  "180": "CD",
  "188": "CR",
  "191": "HR",
  "196": "CY",
  "203": "CZ",
  "204": "BJ",
  "208": "DK",
  "218": "EC",
  "222": "SV",
  "226": "GQ",
  "231": "ET",
  "232": "ER",
  "233": "EE",
  "246": "FI",
  "250": "FR",
  "262": "DJ",
  "266": "GA",
  "270": "GM",
  "276": "DE",
  "288": "GH",
  "300": "GR",
  "320": "GT",
  "324": "GN",
  "328": "GY",
  "340": "HN",
  "348": "HU",
  "352": "IS",
  "372": "IE",
  "380": "IT",
  "383": "XK",
  "384": "CI",
  "404": "KE",
  "426": "LS",
  "428": "LV",
  "430": "LR",
  "434": "LY",
  "438": "LI",
  "440": "LT",
  "442": "LU",
  "450": "MG",
  "454": "MW",
  "466": "ML",
  "470": "MT",
  "478": "MR",
  "480": "MU",
  "498": "MD",
  "499": "ME",
  "504": "MA",
  "508": "MZ",
  "516": "NA",
  "528": "NL",
  "558": "NI",
  "562": "NE",
  "566": "NG",
  "578": "NO",
  "591": "PA",
  "600": "PY",
  "604": "PE",
  "616": "PL",
  "620": "PT",
  "624": "GW",
  "642": "RO",
  "643": "RU",
  "646": "RW",
  "674": "SM",
  "678": "ST",
  "686": "SN",
  "688": "RS",
  "690": "SC",
  "694": "SL",
  "703": "SK",
  "705": "SI",
  "706": "SO",
  "710": "ZA",
  "724": "ES",
  "728": "SS",
  "729": "SD",
  "732": "EH",
  "740": "SR",
  "748": "SZ",
  "752": "SE",
  "756": "CH",
  "768": "TG",
  "788": "TN",
  "792": "TR",
  "800": "UG",
  "804": "UA",
  "807": "MK",
  "818": "EG",
  "826": "GB",
  "834": "TZ",
  "854": "BF",
  "858": "UY",
  "862": "VE",
  "894": "ZM",
  "716": "ZW"
};

const QUIZ_COPY = {
  states: {
    kicker: "Click this state",
    spellKicker: "Spell this state",
    mapLabel: "Map of the United States",
    title: "Fifty — US States Quiz",
    foundAll: "Every state found",
    maxZoom: 8,
    topPad: 0
  },
  west: {
    kicker: "Click this country",
    spellKicker: "Spell this country",
    mapLabel: "Map of Western Europe",
    title: "Western Europe — Countries Quiz",
    foundAll: "Every country found",
    countries: true,
    maxZoom: 20,
    topPad: 110
  },
  east: {
    kicker: "Click this country",
    spellKicker: "Spell this country",
    mapLabel: "Map of Eastern Europe",
    title: "Eastern Europe — Countries Quiz",
    foundAll: "Every country found",
    countries: true,
    maxZoom: 20,
    topPad: 110
  },
  africa: {
    kicker: "Click this country",
    spellKicker: "Spell this country",
    mapLabel: "Map of Africa",
    title: "Africa — Countries Quiz",
    foundAll: "Every country found",
    countries: true,
    maxZoom: 24,
    topPad: 110
  },
  central: {
    kicker: "Click this country",
    spellKicker: "Spell this country",
    mapLabel: "Map of Central America",
    title: "Central America — Countries Quiz",
    foundAll: "Every country found",
    countries: true,
    maxZoom: 8,
    topPad: 110
  },
  south: {
    kicker: "Click this country",
    spellKicker: "Spell this country",
    mapLabel: "Map of South America",
    title: "South America — Countries Quiz",
    foundAll: "Every country found",
    countries: true,
    maxZoom: 12,
    topPad: 110
  },
  canada: {
    kicker: "Click this province",
    spellKicker: "Spell this province",
    mapLabel: "Map of Canada",
    title: "Canada — Provinces Quiz",
    foundAll: "Every province found",
    maxZoom: 16,
    topPad: 110
  }
};

function regionProjection(features, options = {}) {
  const inside = options.inside || inEurope;
  const projection = options.projection
    ? options.projection()
    : d3.geoConicConformal().parallels([40, 64]);
  let west = 180;
  let south = 90;
  let east = -180;
  let north = -90;
  features.forEach((feature) => {
    visitCoordinates(feature.geometry, (longitude, latitude) => {
      if (!inside(longitude, latitude)) {
        return;
      }
      west = Math.min(west, longitude);
      east = Math.max(east, longitude);
      south = Math.min(south, latitude);
      north = Math.max(north, latitude);
    });
  });
  const frame = {
    type: "MultiPoint",
    coordinates: [
      [west - 2.4, south - 1.6],
      [east + 2.4, south - 1.6],
      [east + 2.4, north + 1.4],
      [west - 2.4, north + 1.4]
    ]
  };
  const width = 1000;
  const height = 760;
  projection.rotate([-(west + east) / 2, 0]);
  projection.fitExtent([[28, 28], [width - 28, height - 28]], frame);
  projection.clipExtent([[0, 0], [width, height]]);
  return projection;
}

function visitCoordinates(geometry, visit) {
  if (!geometry) {
    return;
  }
  const dig = (node) => {
    if (typeof node[0] === "number") {
      visit(node[0], node[1]);
      return;
    }
    node.forEach(dig);
  };
  dig(geometry.coordinates);
}

function inEurope(longitude, latitude) {
  return longitude >= -24 && longitude <= 46 && latitude >= 34 && latitude <= 72;
}

function inAfrica(longitude, latitude) {
  return longitude >= -26 && longitude <= 60 && latitude >= -36 && latitude <= 38;
}

function inCentral(longitude, latitude) {
  return longitude >= -93.5 && longitude <= -77 && latitude >= 7 && latitude <= 18.8;
}

function inSouth(longitude, latitude) {
  return longitude >= -82 && longitude <= -34 && latitude >= -56 && latitude <= 13.5;
}

function inCanada(longitude, latitude) {
  return longitude >= -142 && longitude <= -50 && latitude >= 41 && latitude <= 84;
}

function foldPlace(value) {
  return value
    .trim()
    .toLocaleLowerCase("en")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`]/g, "'")
    .replace(/[-]/g, " ")
    .replace(/[^a-z0-9' ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function flagEmoji(code) {
  const base = 0x1F1E6;
  return String.fromCodePoint(base + code.charCodeAt(0) - 65, base + code.charCodeAt(1) - 65);
}

function fillCountryMark(parent, name, code, correct, showMark) {
  parent.replaceChildren();
  const flag = document.createElement("span");
  flag.className = "flag";
  flag.textContent = flagEmoji(code);
  flag.setAttribute("aria-hidden", "true");
  parent.append(flag);
  if (showMark) {
    const mark = document.createElement("span");
    mark.className = "answer-mark";
    mark.textContent = correct ? "✓" : "✕";
    parent.append(mark);
  }
  const label = document.createElement("span");
  label.className = "country-name";
  label.textContent = name;
  parent.append(label);
}

function keepWithin(feature, inside) {
  const geometry = feature.geometry;
  if (!geometry || geometry.type !== "MultiPolygon") {
    return feature;
  }
  const kept = geometry.coordinates.filter((polygon) => {
    const centroid = d3.geoCentroid({ type: "Polygon", coordinates: polygon });
    return inside(centroid[0], centroid[1]);
  });
  if (kept.length === 0) {
    return feature;
  }
  return {
    type: feature.type,
    id: feature.id,
    properties: feature.properties,
    geometry: {
      type: kept.length === 1 ? "Polygon" : "MultiPolygon",
      coordinates: kept.length === 1 ? kept[0] : kept
    }
  };
}

function shuffle(items) {
  const copy = items.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    const current = copy[index];
    copy[index] = copy[swap];
    copy[swap] = current;
  }
  return copy;
}

function formatClock(milliseconds) {
  const total = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const paddedSeconds = String(seconds).padStart(2, "0");
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${paddedSeconds}`;
  }
  return `${minutes}:${paddedSeconds}`;
}

class MapViewport {
  constructor(svg, view, onChange, maxZoom = 8) {
    this.svg = svg;
    this.base = view;
    this.onChange = onChange;
    this.maxZoom = maxZoom;
    this.pointers = new Map();
    this.moved = false;
    this.suppressClick = false;
    this.pinchStart = 0;
    this.pan = null;
    this.reset();
    this.attach();
  }

  attach() {
    this.svg.addEventListener("wheel", (event) => this.onWheel(event), { passive: false });
    this.svg.addEventListener("touchmove", (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }, { passive: false });
    this.svg.addEventListener("gesturestart", (event) => event.preventDefault());
    this.svg.addEventListener("pointerdown", (event) => this.onDown(event));
    this.svg.addEventListener("pointermove", (event) => this.onMove(event));
    this.svg.addEventListener("pointerup", (event) => this.onUp(event));
    this.svg.addEventListener("pointercancel", (event) => this.onUp(event));
    this.svg.addEventListener("dblclick", (event) => {
      event.preventDefault();
      this.reset();
    });
  }

  reset() {
    this.x = this.base.x;
    this.y = this.base.y;
    this.w = this.base.w;
    this.h = this.base.h;
    this.apply();
  }

  setBase(view) {
    this.base = view;
    this.reset();
  }

  isZoomed() {
    return this.w < this.base.w * 0.98;
  }

  apply() {
    this.svg.setAttribute("viewBox", `${this.x} ${this.y} ${this.w} ${this.h}`);
    this.onChange(this.isZoomed());
  }

  zoomAt(clientX, clientY, factor) {
    const rect = this.svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return;
    }
    const px = (clientX - rect.left) / rect.width;
    const py = (clientY - rect.top) / rect.height;
    const anchorX = this.x + px * this.w;
    const anchorY = this.y + py * this.h;
    const minW = this.base.w / this.maxZoom;
    const nextW = Math.min(this.base.w, Math.max(minW, this.w * factor));
    const nextH = nextW * (this.base.h / this.base.w);
    this.w = nextW;
    this.h = nextH;
    this.x = anchorX - px * this.w;
    this.y = anchorY - py * this.h;
    this.clamp();
    this.apply();
  }

  clamp() {
    if (this.w >= this.base.w * 0.995) {
      this.x = this.base.x;
      this.y = this.base.y;
      this.w = this.base.w;
      this.h = this.base.h;
      return;
    }
    const minX = this.base.x - this.w * 0.25;
    const maxX = this.base.x + this.base.w - this.w * 0.75;
    const minY = this.base.y - this.h * 0.25;
    const maxY = this.base.y + this.base.h - this.h * 0.75;
    this.x = Math.min(maxX, Math.max(minX, this.x));
    this.y = Math.min(maxY, Math.max(minY, this.y));
  }

  onWheel(event) {
    event.preventDefault();
    const factor = Math.exp(event.deltaY * 0.0016);
    this.zoomAt(event.clientX, event.clientY, factor);
  }

  onDown(event) {
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    this.moved = false;
    if (this.pointers.size === 1) {
      this.pan = { x: event.clientX, y: event.clientY, vx: this.x, vy: this.y };
    }
    if (this.pointers.size === 2) {
      this.pinchStart = this.pinchDistance();
    }
  }

  onMove(event) {
    if (!this.pointers.has(event.pointerId)) {
      return;
    }
    const previous = this.pointers.get(event.pointerId);
    if (Math.hypot(event.clientX - previous.x, event.clientY - previous.y) > 5) {
      this.moved = true;
      if (this.svg.setPointerCapture) {
        this.svg.setPointerCapture(event.pointerId);
      }
    }
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (this.pointers.size >= 2) {
      const distance = this.pinchDistance();
      if (this.pinchStart > 0 && distance > 0) {
        const center = this.pinchCenter();
        this.zoomAt(center.x, center.y, this.pinchStart / distance);
        this.pinchStart = distance;
      }
      return;
    }
    if (this.pointers.size === 1 && this.moved && this.isZoomed() && this.pan) {
      const rect = this.svg.getBoundingClientRect();
      const scale = this.w / rect.width;
      this.x = this.pan.vx - (event.clientX - this.pan.x) * scale;
      this.y = this.pan.vy - (event.clientY - this.pan.y) * scale;
      this.clamp();
      this.apply();
    }
  }

  onUp(event) {
    const pinched = this.pointers.size >= 2;
    this.pointers.delete(event.pointerId);
    if (this.moved || pinched) {
      this.suppressClick = true;
    }
    if (this.pointers.size < 2) {
      this.pinchStart = 0;
    }
    if (this.pointers.size === 0) {
      this.pan = null;
    }
  }

  pinchDistance() {
    const points = [...this.pointers.values()];
    if (points.length < 2) {
      return 0;
    }
    return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
  }

  pinchCenter() {
    const points = [...this.pointers.values()];
    return {
      x: (points[0].x + points[1].x) / 2,
      y: (points[0].y + points[1].y) / 2
    };
  }

  takeSuppressedClick() {
    const suppressed = this.suppressClick;
    this.suppressClick = false;
    return suppressed;
  }
}

class StateQuiz {
  constructor() {
    this.app = document.querySelector("#app");
    this.mapSvg = d3.select("#map");
    this.startOverlay = document.querySelector("#start-overlay");
    this.finishOverlay = document.querySelector("#finish-overlay");
    this.nameEl = document.querySelector("#state-name");
    this.progressEl = document.querySelector("#progress-copy");
    this.feedbackEl = document.querySelector("#feedback");
    this.pipsEl = document.querySelector("#pips");
    this.scoreEl = document.querySelector("#score");
    this.timeEl = document.querySelector("#time");
    this.finalScoreEl = document.querySelector("#final-score");
    this.finalTimeEl = document.querySelector("#final-time");
    this.missedLabelEl = document.querySelector("#missed-label");
    this.missedChipsEl = document.querySelector("#missed-chips");
    this.resultLists = document.querySelector("#result-lists");
    this.hoverNameEl = document.querySelector("#hover-name");
    this.resetButton = document.querySelector("#reset-view");
    this.pinchHint = document.querySelector("#pinch-hint");
    this.pinchHintTimer = 0;
    this.flagPop = document.querySelector("#flag-pop");
    this.flagSlot = document.querySelector("#flag-slot");
    this.flagSlotFlag = document.querySelector("#flag-slot-flag");
    this.flagSlotName = document.querySelector("#flag-slot-name");
    this.progressList = document.querySelector("#progress-list");
    this.flagTarget = null;
    this.flagFlight = 0;
    this.spellForm = document.querySelector("#spell-form");
    this.spellInput = document.querySelector("#spell-input");
    this.mode = "click";
    this.tries = 0;
    this.revealTimer = 0;
    this.features = [];
    this.order = [];
    this.pips = [];
    this.status = new Map();
    this.index = 0;
    this.correct = 0;
    this.active = false;
    this.locked = false;
    this.startedAt = 0;
    this.timerId = 0;
    this.path = null;
    this.viewport = null;
    this.names = STATE_NAMES;
    this.foundAll = QUIZ_COPY.states.foundAll;
    this.quizKey = "";
    this.catalog = null;
  }

  async load() {
    if (!window.US_ATLAS || !window.EUROPE_ATLAS || !window.AFRICA_ATLAS || !window.AMERICAS_ATLAS || !window.CANADA_GEO) {
      throw new Error("Map data failed to load");
    }
    const states = this.featuresFrom(window.US_ATLAS, "states", STATE_NAMES);
    const countries = this.featuresFrom(window.EUROPE_ATLAS, "countries", EUROPE_NAMES)
      .map((feature) => keepWithin(feature, inEurope));
    const west = countries.filter((feature) => WEST_NAMES[feature.id]);
    const east = countries.filter((feature) => EAST_NAMES[feature.id]);
    const africa = this.featuresFrom(window.AFRICA_ATLAS, "countries", AFRICA_NAMES)
      .map((feature) => keepWithin(feature, inAfrica));
    const central = this.featuresFrom(window.AMERICAS_ATLAS, "countries", CENTRAL_NAMES)
      .map((feature) => keepWithin(feature, inCentral));
    const south = this.featuresFrom(window.AMERICAS_ATLAS, "countries", SOUTH_NAMES)
      .map((feature) => keepWithin(feature, inSouth));
    const canada = this.featuresFrom(window.CANADA_GEO, "provinces", CANADA_NAMES);
    if (states.length !== 50) {
      throw new Error("Expected 50 states");
    }
    if (west.length !== Object.keys(WEST_NAMES).length || east.length !== Object.keys(EAST_NAMES).length) {
      throw new Error("Europe map is incomplete");
    }
    if (africa.length !== Object.keys(AFRICA_NAMES).length) {
      throw new Error("Africa map is incomplete");
    }
    if (central.length !== Object.keys(CENTRAL_NAMES).length || south.length !== Object.keys(SOUTH_NAMES).length) {
      throw new Error("Americas map is incomplete");
    }
    if (canada.length !== Object.keys(CANADA_NAMES).length) {
      throw new Error("Canada map is incomplete");
    }
    const africaProjection = () => d3.geoConicEqualArea().parallels([-18, 20]);
    const centralProjection = () => d3.geoConicEqualArea().parallels([9, 17]);
    const southProjection = () => d3.geoConicEqualArea().parallels([-32, -8]);
    const canadaProjection = () => d3.geoConicEqualArea().parallels([49, 77]);
    this.catalog = {
      states: { ...QUIZ_COPY.states, names: STATE_NAMES, features: states, path: d3.geoPath() },
      west: { ...QUIZ_COPY.west, names: WEST_NAMES, features: west, path: d3.geoPath(regionProjection(west)) },
      east: { ...QUIZ_COPY.east, names: EAST_NAMES, features: east, path: d3.geoPath(regionProjection(east)) },
      africa: {
        ...QUIZ_COPY.africa,
        names: AFRICA_NAMES,
        features: africa,
        path: d3.geoPath(regionProjection(africa, { inside: inAfrica, projection: africaProjection }))
      },
      central: {
        ...QUIZ_COPY.central,
        names: CENTRAL_NAMES,
        features: central,
        path: d3.geoPath(regionProjection(central, { inside: inCentral, projection: centralProjection }))
      },
      south: {
        ...QUIZ_COPY.south,
        names: SOUTH_NAMES,
        features: south,
        path: d3.geoPath(regionProjection(south, { inside: inSouth, projection: southProjection }))
      },
      canada: {
        ...QUIZ_COPY.canada,
        names: CANADA_NAMES,
        features: canada,
        path: d3.geoPath(regionProjection(canada, { inside: inCanada, projection: canadaProjection }))
      }
    };
    this.useQuiz("states");
    document.querySelector("#mode-click").addEventListener("click", () => this.setMode("click"));
    document.querySelector("#mode-spell").addEventListener("click", () => this.setMode("spell"));
    this.spellForm.addEventListener("submit", (event) => this.submitSpell(event));
    document.querySelector("#start-states").addEventListener("click", () => this.play("states"));
    document.querySelector("#start-canada").addEventListener("click", () => this.play("canada"));
    document.querySelector("#start-central").addEventListener("click", () => this.play("central"));
    document.querySelector("#start-south").addEventListener("click", () => this.play("south"));
    document.querySelector("#start-west").addEventListener("click", () => this.play("west"));
    document.querySelector("#start-east").addEventListener("click", () => this.play("east"));
    document.querySelector("#start-africa").addEventListener("click", () => this.play("africa"));
    document.querySelector("#replay").addEventListener("click", () => this.start());
    document.querySelector("#change-map").addEventListener("click", () => this.showChooser());
    this.resetButton.addEventListener("click", () => this.viewport.reset());
    const dismissPinchHint = () => this.hidePinchHint();
    this.mapSvg.node().addEventListener("pointerdown", dismissPinchHint);
    this.mapSvg.node().addEventListener("wheel", dismissPinchHint);
    window.addEventListener("resize", () => this.layoutLabels());
  }

  featuresFrom(atlas, objectName, names) {
    const collection = atlas.type === "FeatureCollection"
      ? atlas
      : topojson.feature(atlas, atlas.objects[objectName]);
    return collection.features.filter((feature) => names[feature.id]);
  }

  setMode(mode) {
    this.mode = mode;
    document.querySelector("#mode-click").classList.toggle("is-selected", mode === "click");
    document.querySelector("#mode-spell").classList.toggle("is-selected", mode === "spell");
    document.querySelector("#mode-click").setAttribute("aria-pressed", String(mode === "click"));
    document.querySelector("#mode-spell").setAttribute("aria-pressed", String(mode === "spell"));
    document.querySelector("#mode-copy").textContent = mode === "spell"
      ? "A place lights up. Spell its name. You get three tries."
      : "A name appears. Click that place on the map.";
  }

  play(key) {
    this.useQuiz(key);
    this.start();
  }

  useQuiz(key) {
    const quiz = this.catalog[key];
    this.quizKey = key;
    this.names = quiz.names;
    this.features = quiz.features;
    this.path = quiz.path;
    this.foundAll = quiz.foundAll;
    this.topPad = quiz.topPad;
    const view = this.measure(this.features);
    this.draw(view);
    const onView = (zoomed) => {
      this.resetButton.hidden = !zoomed;
      this.layoutLabels();
    };
    if (this.viewport) {
      this.viewport.maxZoom = quiz.maxZoom;
      this.viewport.onChange = onView;
      this.viewport.setBase(view);
    } else {
      this.viewport = new MapViewport(this.mapSvg.node(), view, onView, quiz.maxZoom);
    }
    document.title = quiz.title;
    this.mapSvg.attr("aria-label", quiz.mapLabel);
    document.querySelector("#eyebrow").textContent = this.mode === "spell" ? quiz.spellKicker : quiz.kicker;
    const total = ` / ${quiz.features.length}`;
    document.querySelectorAll(".place-total").forEach((node) => {
      node.textContent = total;
    });
    this.renderPips(Object.keys(quiz.names));
  }

  showChooser() {
    this.active = false;
    this.locked = true;
    this.stopTimer();
    this.hidePinchHint();
    window.clearTimeout(this.revealTimer);
    this.spellForm.hidden = true;
    this.nameEl.hidden = false;
    this.clearTarget();
    this.clearFlag();
    this.nameEl.classList.remove("is-correct", "is-missed");
    this.finishOverlay.hidden = true;
    this.startOverlay.hidden = false;
  }

  measure(features) {
    const bounds = this.path.bounds({ type: "FeatureCollection", features });
    const pad = 10;
    const topPad = this.topPad || 0;
    return {
      x: bounds[0][0] - pad,
      y: bounds[0][1] - pad - topPad,
      w: bounds[1][0] - bounds[0][0] + pad * 2,
      h: bounds[1][1] - bounds[0][1] + pad * 2 + topPad
    };
  }

  draw(view) {
    this.mapSvg.attr("viewBox", `${view.x} ${view.y} ${view.w} ${view.h}`);
    this.mapSvg
      .selectAll("path")
      .data(this.features, (feature) => feature.id)
      .join("path")
      .attr("class", "state")
      .attr("data-fips", (feature) => feature.id)
      .attr("d", this.path)
      .attr("role", "button")
      .attr("tabindex", "0")
      .attr("aria-label", (feature) => (this.mode === "spell" ? "Place" : this.names[feature.id]))
      .on("click", (event, feature) => {
        if (this.viewport && this.viewport.takeSuppressedClick()) {
          event.preventDefault();
          return;
        }
        event.preventDefault();
        this.handlePick(feature.id);
      })
      .on("keydown", (event, feature) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.handlePick(feature.id);
        }
      })
      .on("pointerenter", (event, feature) => this.setHover(feature.id, true))
      .on("pointerleave", (event, feature) => this.setHover(feature.id, false));
    this.clearLabels();
    let labels = this.mapSvg.select("g.country-labels");
    if (labels.empty()) {
      labels = this.mapSvg.append("g").attr("class", "country-labels");
    }
    this.mapSvg.node().appendChild(labels.node());
  }

  clearLabels() {
    this.mapSvg.selectAll(".country-label").remove();
  }

  largestPart(feature) {
    const geometry = feature.geometry;
    if (!geometry || geometry.type === "Polygon") {
      return feature;
    }
    let best = geometry.coordinates[0];
    let bestArea = -1;
    geometry.coordinates.forEach((polygon) => {
      const part = { type: "Feature", geometry: { type: "Polygon", coordinates: polygon } };
      const area = Math.abs(this.path.area(part));
      if (area > bestArea) {
        bestArea = area;
        best = polygon;
      }
    });
    return { type: "Feature", id: feature.id, geometry: { type: "Polygon", coordinates: best } };
  }

  labelLines(name) {
    if (name.length <= 12 || !name.includes(" ")) {
      return [name];
    }
    const words = name.split(" ");
    if (words.length === 2) {
      return words;
    }
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
  }

  addLabel(id, status) {
    if (this.catalog[this.quizKey].countries) {
      return;
    }
    const spelling = this.mode === "spell";
    const labelRegion = this.quizKey !== "states";
    const labelMissedState = this.quizKey === "states" && status === "missed";
    if (!spelling && !labelRegion && !labelMissedState) {
      return;
    }
    const feature = this.features.find((item) => item.id === id);
    if (!feature) {
      return;
    }
    const part = this.largestPart(feature);
    const point = this.path.centroid(part);
    if (!point || !Number.isFinite(point[0]) || !Number.isFinite(point[1])) {
      return;
    }
    const bounds = this.path.bounds(part);
    const width = Math.max(0, bounds[1][0] - bounds[0][0]);
    const lines = this.labelLines(this.names[id]);
    const text = this.mapSvg.select("g.country-labels")
      .append("text")
      .attr("class", "country-label")
      .attr("data-fips", id)
      .attr("data-width", width)
      .attr("x", point[0])
      .attr("y", point[1])
      .classed("is-green", spelling && status === "correct");
    if (lines.length === 1) {
      text.text(lines[0]);
    } else {
      lines.forEach((line, index) => {
        text.append("tspan")
          .attr("x", point[0])
          .attr("dy", index === 0 ? "-0.5em" : "1.05em")
          .text(line);
      });
    }
    this.layoutLabels();
  }

  layoutLabels() {
    if (!this.viewport) {
      return;
    }
    const svg = this.mapSvg.node();
    const transform = svg.getScreenCTM();
    if (!transform || transform.a === 0) {
      return;
    }
    const pixelsPerUnit = Math.hypot(transform.a, transform.b);
    this.mapSvg.selectAll(".country-label").each(function () {
      const text = d3.select(this);
      const countryWidth = Number(text.attr("data-width")) * pixelsPerUnit;
      const screen = countryWidth < 52 ? 10 : countryWidth < 96 ? 12 : 14;
      text.attr("font-size", screen / pixelsPerUnit);
      text.attr("stroke-width", 2.6 / pixelsPerUnit);
    });
  }

  renderPips(ids) {
    this.pipsEl.replaceChildren();
    this.pips = ids.map(() => {
      const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      star.setAttribute("class", "star");
      star.setAttribute("viewBox", "0 0 24 24");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M12 2.2l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 16.2 6.4 19.2l1.3-6.2L3 8.7l6.3-.7L12 2.2z");
      star.appendChild(path);
      this.pipsEl.appendChild(star);
      return star;
    });
  }

  start() {
    this.stopTimer();
    this.order = shuffle(this.features.map((feature) => feature.id));
    this.index = 0;
    this.correct = 0;
    this.status = new Map();
    this.active = true;
    this.locked = false;
    this.tries = 0;
    this.startedAt = performance.now();
    this.app.classList.toggle("is-spell", this.mode === "spell");
    this.app.classList.add("is-playing");
    this.app.classList.remove("is-finished");
    this.clearColors();
    this.clearLabels();
    this.renderPips(this.order);
    this.scoreEl.textContent = "0";
    this.timeEl.textContent = "0:00";
    this.hoverNameEl.textContent = "";
    this.hoverNameEl.classList.remove("is-on");
    this.setFeedback("", "");
    this.clearFlag();
    this.startOverlay.hidden = true;
    this.finishOverlay.hidden = true;
    if (this.viewport) {
      this.viewport.reset();
    }
    this.showCurrent();
    this.showPinchHint();
    this.timerId = window.setInterval(() => this.tick(), 200);
  }

  showPinchHint() {
    this.pinchHint.hidden = false;
    window.clearTimeout(this.pinchHintTimer);
    this.pinchHintTimer = window.setTimeout(() => this.hidePinchHint(), 5000);
  }

  hidePinchHint() {
    this.pinchHint.hidden = true;
    window.clearTimeout(this.pinchHintTimer);
    this.pinchHintTimer = 0;
  }

  stopTimer() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = 0;
    }
  }

  tick() {
    if (!this.active) {
      return;
    }
    this.timeEl.textContent = formatClock(performance.now() - this.startedAt);
  }

  showCurrent() {
    const id = this.order[this.index];
    this.tries = 0;
    this.nameEl.classList.remove("is-correct", "is-missed", "rise");
    if (this.mode === "spell") {
      this.nameEl.hidden = true;
      this.spellForm.hidden = false;
      this.spellInput.value = "";
      this.spellInput.disabled = false;
      this.markTarget(id);
      this.spellInput.focus();
    } else {
      this.nameEl.hidden = false;
      this.nameEl.textContent = this.names[id];
      this.spellForm.hidden = true;
      this.clearTarget();
    }
    this.progressEl.textContent = `${this.index + 1} of ${this.order.length}`;
    void this.nameEl.offsetWidth;
    this.nameEl.classList.add("rise");
    this.pips.forEach((star) => {
      star.classList.remove("is-current");
    });
  }

  markTarget(id) {
    this.clearTarget();
    this.mapSvg.selectAll("path.state").filter((feature) => feature.id === id).classed("is-target", true);
  }

  clearTarget() {
    this.mapSvg.selectAll("path.state").classed("is-target", false);
  }

  revealName(id, status) {
    this.spellForm.hidden = true;
    this.nameEl.hidden = false;
    this.nameEl.classList.remove("rise", "is-correct", "is-missed");
    this.nameEl.textContent = this.names[id];
    this.nameEl.classList.add(status === "correct" ? "is-correct" : "is-missed");
    void this.nameEl.offsetWidth;
    this.nameEl.classList.add("rise");
  }

  submitSpell(event) {
    event.preventDefault();
    if (this.mode !== "spell" || !this.active || this.locked || this.index >= this.order.length) {
      return;
    }
    const typed = foldPlace(this.spellInput.value);
    if (!typed) {
      return;
    }
    const id = this.order[this.index];
    if (typed === foldPlace(this.names[id])) {
      this.resolveSpell(id, "correct");
      return;
    }
    this.tries += 1;
    if (this.tries < 3) {
      const left = 3 - this.tries;
      this.setFeedback(left === 1 ? "1 try left" : `${left} tries left`, "is-missed");
      this.spellInput.select();
      return;
    }
    this.resolveSpell(id, "missed");
  }

  resolveSpell(id, status) {
    this.locked = true;
    this.spellInput.disabled = true;
    if (status === "correct") {
      this.correct += 1;
    }
    this.setStatus(id, status);
    this.clearTarget();
    this.revealName(id, status);
    this.showMark(id, status, status === "correct" ? "Correct" : this.names[id]);
    const pip = this.pips[this.index];
    pip.classList.remove("is-current");
    pip.classList.add(status === "correct" ? "is-correct" : "is-missed");
    this.scoreEl.textContent = String(this.correct);
    window.clearTimeout(this.revealTimer);
    this.revealTimer = window.setTimeout(() => {
      if (!this.active) {
        return;
      }
      this.index += 1;
      this.locked = false;
      if (this.index >= this.order.length) {
        this.finish();
        return;
      }
      this.setFeedback("", "");
      this.showCurrent();
    }, 700);
  }

  handlePick(fips) {
    if (this.mode === "spell" || !this.active || this.locked || this.index >= this.order.length) {
      return;
    }
    const target = this.order[this.index];
    const gotIt = fips === target;
    this.locked = true;
    window.setTimeout(() => {
      this.locked = false;
    }, 220);

    if (gotIt) {
      this.correct += 1;
      this.setStatus(target, "correct");
      this.showMark(target, "correct", "Correct");
    } else {
      this.setStatus(target, "missed");
      this.flash(fips);
      this.showMark(target, "missed", this.names[fips]);
    }

    const pip = this.pips[this.index];
    pip.classList.remove("is-current");
    pip.classList.add(gotIt ? "is-correct" : "is-missed");
    this.scoreEl.textContent = String(this.correct);
    this.index += 1;

    if (this.index >= this.order.length) {
      this.finish();
      return;
    }
    this.showCurrent();
  }

  setStatus(fips, status) {
    this.status.set(fips, status);
    document.querySelectorAll(`path[data-fips="${fips}"]`).forEach((path) => {
      path.classList.remove("is-correct", "is-missed", "is-target");
      path.classList.add(status === "correct" ? "is-correct" : "is-missed");
      path.setAttribute("aria-label", this.names[fips]);
    });
    this.addLabel(fips, status);
  }

  flash(fips) {
    document.querySelectorAll(`[data-fips="${fips}"]`).forEach((path) => {
      path.classList.add("is-flash");
      window.setTimeout(() => path.classList.remove("is-flash"), 420);
    });
  }

  setHover(fips, hot) {
    if (this.mode === "spell" && !this.app.classList.contains("is-finished")) {
      return;
    }
    document.querySelectorAll(`[data-fips="${fips}"]`).forEach((path) => {
      path.classList.toggle("is-hot", hot);
    });
    if (!this.app.classList.contains("is-finished")) {
      return;
    }
    this.hoverNameEl.textContent = hot ? this.names[fips] : "";
    this.hoverNameEl.classList.toggle("is-on", hot);
  }

  clearColors() {
    document.querySelectorAll(".state").forEach((path) => {
      path.classList.remove("is-correct", "is-missed", "is-flash", "is-hot", "is-target");
    });
  }

  setFeedback(message, kind) {
    this.feedbackEl.textContent = message;
    this.feedbackEl.classList.remove("is-correct", "is-missed");
    if (kind) {
      this.feedbackEl.classList.add(kind);
    }
  }

  showMark(id, status, fallback) {
    const kind = status === "correct" ? "is-correct" : "is-missed";
    const code = FLAG_CODES[id];
    if (!this.catalog[this.quizKey].countries || !code) {
      this.setFeedback(fallback, kind);
      return;
    }
    this.feedbackEl.classList.remove("is-correct", "is-missed");
    this.feedbackEl.classList.add(kind);
    fillCountryMark(this.feedbackEl, this.names[id], code, status === "correct", true);
    this.noteCountry(id, status);
    this.launchFlag(id, status);
  }

  noteCountry(id, status) {
    this.progressList.querySelectorAll(".is-waiting").forEach((row) => {
      row.classList.remove("is-waiting");
    });
    const item = document.createElement("li");
    item.className = status === "correct" ? "progress-row is-correct is-waiting" : "progress-row is-missed is-waiting";
    fillCountryMark(item, this.names[id], FLAG_CODES[id], status === "correct", false);
    this.progressList.hidden = false;
    this.progressList.appendChild(item);
    this.flagTarget = item.querySelector(".flag");
    this.progressList.scrollTop = this.progressList.scrollHeight;
  }

  clearFlag() {
    this.flagFlight += 1;
    this.flagPop.getAnimations().forEach((anim) => anim.cancel());
    this.flagPop.hidden = true;
    this.flagPop.textContent = "";
    this.flagSlot.hidden = true;
    this.flagSlot.classList.remove("is-correct", "is-missed", "is-waiting");
    this.progressList.replaceChildren();
    this.progressList.hidden = true;
    this.flagTarget = null;
  }

  launchFlag(id, status) {
    const emoji = flagEmoji(FLAG_CODES[id]);
    const token = this.flagFlight + 1;
    this.flagFlight = token;
    this.flagPop.getAnimations().forEach((anim) => anim.cancel());
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (this.flagTarget) {
        this.flagTarget.closest(".progress-row").classList.remove("is-waiting");
      }
      this.flagPop.hidden = true;
      return;
    }
    const pop = this.flagPop;
    pop.hidden = false;
    pop.textContent = emoji;
    const intro = pop.animate([
      { transform: "translate(-50%, -50%) scale(0.25)", opacity: 0 },
      { transform: "translate(-50%, -50%) scale(1.08)", opacity: 1, offset: 0.62 },
      { transform: "translate(-50%, -50%) scale(1)", opacity: 1 }
    ], { duration: 420, easing: "cubic-bezier(0.16, 0.84, 0.32, 1)", fill: "forwards" });
    intro.finished
      .then(() => this.holdFlag(560, token))
      .then(() => this.flyFlag(token))
      .catch(() => {});
  }

  holdFlag(milliseconds, token) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        if (this.flagFlight !== token) {
          reject(new Error("replaced"));
          return;
        }
        resolve();
      }, milliseconds);
    });
  }

  flyFlag(token) {
    if (this.flagFlight !== token) {
      return Promise.resolve();
    }
    const pop = this.flagPop;
    const from = pop.getBoundingClientRect();
    const target = this.flagTarget;
    const to = target ? target.getBoundingClientRect() : null;
    if (!from.width || !to || !to.width) {
      if (target) {
        target.closest(".progress-row").classList.remove("is-waiting");
      }
      pop.hidden = true;
      return Promise.resolve();
    }
    const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
    const dy = (to.top + to.height / 2) - (from.top + from.height / 2);
    const scale = to.width / from.width;
    const flight = pop.animate([
      { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale})`, opacity: 1 }
    ], { duration: 520, easing: "cubic-bezier(0.45, 0, 0.2, 1)", fill: "forwards" });
    return flight.finished.then(() => {
      if (this.flagFlight !== token) {
        return;
      }
      pop.getAnimations().forEach((anim) => anim.cancel());
      pop.hidden = true;
      if (this.flagTarget) {
        this.flagTarget.closest(".progress-row").classList.remove("is-waiting");
      }
    });
  }

  renderCountryResults() {
    const wrong = this.order
      .filter((id) => this.status.get(id) === "missed")
      .map((id) => ({ id, name: this.names[id] }))
      .sort((left, rightRow) => left.name.localeCompare(rightRow.name));
    this.resultLists.replaceChildren();
    this.appendResultBlock("Wrong", wrong, false);
    this.resultLists.hidden = wrong.length === 0;
    this.missedChipsEl.hidden = true;
    this.missedLabelEl.textContent = wrong.length === 0 ? this.foundAll : "";
  }

  appendResultBlock(title, rows, correct) {
    if (rows.length === 0) {
      return;
    }
    const block = document.createElement("section");
    block.className = "result-block";
    const heading = document.createElement("h3");
    heading.textContent = `${title} ${rows.length}`;
    const list = document.createElement("ul");
    rows.forEach((row) => {
      const item = document.createElement("li");
      item.className = correct ? "result-row is-correct" : "result-row is-missed";
      fillCountryMark(item, row.name, FLAG_CODES[row.id], correct, false);
      list.appendChild(item);
    });
    block.append(heading, list);
    this.resultLists.appendChild(block);
  }

  finish() {
    const elapsed = performance.now() - this.startedAt;
    this.active = false;
    this.locked = true;
    this.stopTimer();
    window.clearTimeout(this.revealTimer);
    this.spellForm.hidden = true;
    this.nameEl.hidden = false;
    this.clearTarget();
    this.clearFlag();
    this.app.classList.remove("is-playing");
    this.app.classList.add("is-finished");
    this.timeEl.textContent = formatClock(elapsed);
    this.finalScoreEl.textContent = String(this.correct);
    this.finalTimeEl.textContent = `Finished in ${formatClock(elapsed)}`;
    const missed = this.order
      .filter((id) => this.status.get(id) === "missed")
      .map((id) => this.names[id])
      .sort((left, right) => left.localeCompare(right));
    this.missedChipsEl.replaceChildren();
    this.resultLists.replaceChildren();
    if (this.catalog[this.quizKey].countries) {
      this.renderCountryResults();
    } else {
      this.resultLists.hidden = true;
      this.missedChipsEl.hidden = false;
      if (missed.length === 0) {
        this.missedLabelEl.textContent = this.foundAll;
      } else {
        this.missedLabelEl.textContent = missed.length === 1 ? "Missed 1" : `Missed ${missed.length}`;
        missed.forEach((name) => {
          const chip = document.createElement("span");
          chip.className = "chip";
          chip.textContent = name;
          this.missedChipsEl.appendChild(chip);
        });
      }
    }
    this.hidePinchHint();
    this.finishOverlay.hidden = false;
    document.querySelector("#replay").focus();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const quiz = new StateQuiz();
  quiz.load().catch((error) => {
    console.error(error);
    document.querySelector("#state-name").textContent = "The map could not be loaded";
  });
});
