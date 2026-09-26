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
  constructor(svg, view, onChange) {
    this.svg = svg;
    this.base = view;
    this.onChange = onChange;
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
    const minW = this.base.w / 8;
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
    this.hoverNameEl = document.querySelector("#hover-name");
    this.resetButton = document.querySelector("#reset-view");
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
  }

  async load() {
    if (!window.US_ATLAS) {
      throw new Error("Map data failed to load");
    }
    const collection = topojson.feature(window.US_ATLAS, window.US_ATLAS.objects.states);
    this.features = collection.features.filter((feature) => STATE_NAMES[feature.id]);
    if (this.features.length !== 50) {
      throw new Error("Expected 50 states");
    }
    this.path = d3.geoPath();
    const view = this.measure(this.features);
    this.draw(view);
    this.viewport = new MapViewport(this.mapSvg.node(), view, (zoomed) => {
      this.resetButton.hidden = !zoomed;
    });
    this.renderPips(Object.keys(STATE_NAMES));
    document.querySelector("#start").addEventListener("click", () => this.start());
    document.querySelector("#replay").addEventListener("click", () => this.start());
    this.resetButton.addEventListener("click", () => this.viewport.reset());
  }

  measure(features) {
    const bounds = this.path.bounds({ type: "FeatureCollection", features });
    const pad = 10;
    return {
      x: bounds[0][0] - pad,
      y: bounds[0][1] - pad,
      w: bounds[1][0] - bounds[0][0] + pad * 2,
      h: bounds[1][1] - bounds[0][1] + pad * 2
    };
  }

  draw(view) {
    this.mapSvg.attr("viewBox", `${view.x} ${view.y} ${view.w} ${view.h}`);
    this.mapSvg
      .selectAll("path")
      .data(this.features)
      .join("path")
      .attr("class", "state")
      .attr("data-fips", (feature) => feature.id)
      .attr("d", this.path)
      .attr("role", "button")
      .attr("tabindex", "0")
      .attr("aria-label", (feature) => STATE_NAMES[feature.id])
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
    this.startedAt = performance.now();
    this.app.classList.add("is-playing");
    this.app.classList.remove("is-finished");
    this.clearColors();
    this.renderPips(this.order);
    this.scoreEl.textContent = "0";
    this.timeEl.textContent = "0:00";
    this.hoverNameEl.textContent = "";
    this.hoverNameEl.classList.remove("is-on");
    this.setFeedback("", "");
    this.startOverlay.hidden = true;
    this.finishOverlay.hidden = true;
    if (this.viewport) {
      this.viewport.reset();
    }
    this.showCurrent();
    this.timerId = window.setInterval(() => this.tick(), 200);
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
    this.nameEl.textContent = STATE_NAMES[id];
    this.progressEl.textContent = `${this.index + 1} of ${this.order.length}`;
    this.nameEl.classList.remove("rise");
    void this.nameEl.offsetWidth;
    this.nameEl.classList.add("rise");
    this.pips.forEach((star) => {
      star.classList.remove("is-current");
    });
  }

  handlePick(fips) {
    if (!this.active || this.locked || this.index >= this.order.length) {
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
      this.setFeedback("Correct", "is-correct");
    } else {
      this.setStatus(target, "missed");
      this.flash(fips);
      this.setFeedback(STATE_NAMES[fips], "is-missed");
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
    document.querySelectorAll(`[data-fips="${fips}"]`).forEach((path) => {
      path.classList.remove("is-correct", "is-missed");
      path.classList.add(status === "correct" ? "is-correct" : "is-missed");
    });
  }

  flash(fips) {
    document.querySelectorAll(`[data-fips="${fips}"]`).forEach((path) => {
      path.classList.add("is-flash");
      window.setTimeout(() => path.classList.remove("is-flash"), 420);
    });
  }

  setHover(fips, hot) {
    document.querySelectorAll(`[data-fips="${fips}"]`).forEach((path) => {
      path.classList.toggle("is-hot", hot);
    });
    if (!this.app.classList.contains("is-finished")) {
      return;
    }
    this.hoverNameEl.textContent = hot ? STATE_NAMES[fips] : "";
    this.hoverNameEl.classList.toggle("is-on", hot);
  }

  clearColors() {
    document.querySelectorAll(".state").forEach((path) => {
      path.classList.remove("is-correct", "is-missed", "is-flash", "is-hot");
    });
  }

  setFeedback(message, kind) {
    this.feedbackEl.textContent = message;
    this.feedbackEl.classList.remove("is-correct", "is-missed");
    if (kind) {
      this.feedbackEl.classList.add(kind);
    }
  }

  finish() {
    const elapsed = performance.now() - this.startedAt;
    this.active = false;
    this.locked = true;
    this.stopTimer();
    this.app.classList.remove("is-playing");
    this.app.classList.add("is-finished");
    this.timeEl.textContent = formatClock(elapsed);
    this.finalScoreEl.textContent = String(this.correct);
    this.finalTimeEl.textContent = `Finished in ${formatClock(elapsed)}`;
    const missed = this.order
      .filter((id) => this.status.get(id) === "missed")
      .map((id) => STATE_NAMES[id])
      .sort((left, right) => left.localeCompare(right));
    this.missedChipsEl.replaceChildren();
    if (missed.length === 0) {
      this.missedLabelEl.textContent = "Every state found";
    } else {
      this.missedLabelEl.textContent = missed.length === 1 ? "Missed 1" : `Missed ${missed.length}`;
      missed.forEach((name) => {
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = name;
        this.missedChipsEl.appendChild(chip);
      });
    }
    this.finishOverlay.hidden = false;
    document.querySelector("#replay").focus();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const quiz = new StateQuiz();
  quiz.load().catch(() => {
    document.querySelector("#state-name").textContent = "The map could not be loaded";
  });
});
