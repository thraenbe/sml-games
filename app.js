// ── Helpers ─────────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function cardsFor(topic) {
  return topic === "all" ? DECK : DECK.filter(c => c.topic === topic);
}

function fillTopicSelect(sel) {
  sel.innerHTML = `<option value="all">All topics (${DECK.length} cards)</option>` +
    TOPICS.map(t => `<option value="${t}">${t} (${cardsFor(t).length})</option>`).join("");
}

// ── Navigation ──────────────────────────────────────────────────
const views = ["home", "memory", "quiz", "trainer"];
function show(view) {
  views.forEach(v => $(`#view-${v}`).classList.toggle("hidden", v !== view));
  document.querySelectorAll("#nav button").forEach(b =>
    b.classList.toggle("active", b.dataset.view === view));
  if (view === "trainer") Trainer.render();
}
document.querySelectorAll("#nav button").forEach(b =>
  b.addEventListener("click", () => show(b.dataset.view)));
document.querySelectorAll(".game-card").forEach(c =>
  c.addEventListener("click", () => show(c.dataset.goto)));

// ── Home: deck browser ──────────────────────────────────────────
$("#deck-stats").textContent =
  `${DECK.length} flashcards across ${TOPICS.length} topics, built from the exercise sheets, assignment 1 and the mock exam.`;
$("#deck-list").innerHTML = TOPICS.map(t =>
  `<h3 class="deck-topic">${t}</h3>` +
  cardsFor(t).map(c =>
    `<div class="deck-entry"><b>${c.term}</b><span>${c.def}</span>` +
    (c.detail ? `<span class="detail">${c.detail}</span>` : "") + `</div>`
  ).join("")
).join("");

// ── Memory ──────────────────────────────────────────────────────
const Memory = {
  first: null, lock: false, moves: 0, matched: 0, pairs: 0,

  newGame() {
    const pool = shuffle(cardsFor($("#memory-topic").value)).slice(0, 8);
    this.pairs = pool.length;
    this.first = null; this.lock = false; this.moves = 0; this.matched = 0;
    $("#memory-done").classList.add("hidden");
    this.updateStatus();

    const tiles = shuffle(pool.flatMap((c, i) => [
      { pair: i, text: c.term, kind: "term-face" },
      { pair: i, text: c.def, kind: "def-face" },
    ]));
    $("#memory-board").innerHTML = tiles.map((t, idx) =>
      `<div class="tile closed ${t.kind}" data-pair="${t.pair}" data-idx="${idx}"></div>`).join("");
    this.tileData = tiles;
    document.querySelectorAll("#memory-board .tile").forEach(el =>
      el.addEventListener("click", () => this.flip(el)));
  },

  flip(el) {
    if (this.lock || el.classList.contains("up") || el.classList.contains("matched")) return;
    el.classList.remove("closed");
    el.classList.add("up");
    el.textContent = this.tileData[el.dataset.idx].text;

    if (!this.first) { this.first = el; return; }
    this.moves++;
    this.updateStatus();
    const a = this.first, b = el;
    this.first = null;

    if (a.dataset.pair === b.dataset.pair) {
      a.classList.add("matched"); b.classList.add("matched");
      this.matched++;
      if (this.matched === this.pairs) this.finish();
    } else {
      this.lock = true;
      setTimeout(() => {
        [a, b].forEach(t => { t.classList.remove("up"); t.classList.add("closed"); t.textContent = ""; });
        this.lock = false;
      }, 1100);
    }
  },

  updateStatus() {
    $("#memory-status").textContent = `Moves: ${this.moves} · Matched: ${this.matched}/${this.pairs}`;
  },

  finish() {
    const el = $("#memory-done");
    const perfect = this.pairs;
    el.innerHTML = `🎉 Solved in <b>${this.moves}</b> moves (perfect would be ${perfect}). ` +
      (this.moves <= perfect + 3 ? "Outstanding!" : this.moves <= perfect * 2 ? "Nice work!" : "Keep practicing!");
    el.classList.remove("hidden");
  },
};
fillTopicSelect($("#memory-topic"));
$("#memory-new").addEventListener("click", () => Memory.newGame());

// ── Quiz ────────────────────────────────────────────────────────
const Quiz = {
  questions: [], i: 0, score: 0, streak: 0, best: 0,

  start() {
    const pool = cardsFor($("#quiz-topic").value);
    this.questions = shuffle(pool).slice(0, Math.min(10, pool.length));
    this.i = 0; this.score = 0; this.streak = 0; this.best = 0;
    this.next();
  },

  next() {
    if (this.i >= this.questions.length) return this.finish();
    const card = this.questions[this.i];
    // Ask in both directions: term→def or def→term
    const askDef = Math.random() < 0.5;
    const distractors = shuffle(DECK.filter(c => c !== card && (c.topic === card.topic || Math.random() < 0.3)))
      .slice(0, 3);
    const options = shuffle([card, ...distractors]);
    const prompt = askDef ? card.term : card.def;
    const label = askDef ? "Which definition matches this term?" : "Which term matches this definition?";

    $("#quiz-status").textContent =
      `Question ${this.i + 1}/${this.questions.length} · Score: ${this.score} · Streak: ${this.streak}`;
    $("#quiz-area").innerHTML = `
      <div class="quiz-question">
        <div class="quiz-prompt-label">${label}</div>
        <div class="quiz-prompt">${prompt}</div>
        <div class="quiz-options">
          ${options.map((o, idx) =>
            `<button data-idx="${idx}">${askDef ? o.def : o.term}</button>`).join("")}
        </div>
        <div class="quiz-detail hidden"></div>
        <button class="quiz-next primary hidden">Next →</button>
      </div>`;

    document.querySelectorAll("#quiz-area .quiz-options button").forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        const correct = options[idx] === card;
        document.querySelectorAll("#quiz-area .quiz-options button").forEach((b, j) => {
          b.disabled = true;
          if (options[j] === card) b.classList.add("correct");
        });
        if (correct) { this.score++; this.streak++; this.best = Math.max(this.best, this.streak); }
        else { btn.classList.add("wrong"); this.streak = 0; }
        if (card.detail) {
          const d = $("#quiz-area .quiz-detail");
          d.textContent = "💡 " + card.detail;
          d.classList.remove("hidden");
        }
        const nextBtn = $("#quiz-area .quiz-next");
        nextBtn.classList.remove("hidden");
        nextBtn.addEventListener("click", () => { this.i++; this.next(); });
        $("#quiz-status").textContent =
          `Question ${this.i + 1}/${this.questions.length} · Score: ${this.score} · Streak: ${this.streak}`;
      });
    });
  },

  finish() {
    const n = this.questions.length;
    const pct = Math.round((this.score / n) * 100);
    $("#quiz-status").textContent = "";
    $("#quiz-area").innerHTML = `
      <div class="result">
        🏁 <b>${this.score}/${n}</b> correct (${pct}%) · best streak: ${this.best}<br>
        ${pct === 100 ? "Perfect — exam ready! 🎓" : pct >= 70 ? "Solid! One more round?" : "Review the Trainer, then try again."}
      </div>`;
  },
};
fillTopicSelect($("#quiz-topic"));
$("#quiz-new").addEventListener("click", () => Quiz.start());

// ── Trainer (Leitner boxes) ─────────────────────────────────────
const Trainer = {
  KEY: "sml-trainer-v1",
  boxes: {},   // cardKey -> box number 1..3

  load() {
    try { this.boxes = JSON.parse(localStorage.getItem(this.KEY)) || {}; }
    catch { this.boxes = {}; }
  },
  save() { localStorage.setItem(this.KEY, JSON.stringify(this.boxes)); },
  keyOf(c) { return c.topic + "::" + c.term; },
  boxOf(c) { return this.boxes[this.keyOf(c)] || 1; },

  // Lower boxes are drawn more often: box 1 ×4, box 2 ×2, box 3 ×1
  pickCard(pool) {
    const weighted = pool.flatMap(c => Array(5 - this.boxOf(c) - (this.boxOf(c) === 1 ? 0 : 1)).fill(c));
    return weighted[Math.floor(Math.random() * weighted.length)];
  },

  render() {
    this.load();
    const pool = cardsFor($("#trainer-topic").value);
    const counts = [1, 2, 3].map(b => pool.filter(c => this.boxOf(c) === b).length);
    $("#trainer-boxes").textContent =
      `Box 1 (learning): ${counts[0]} · Box 2: ${counts[1]} · Box 3 (mastered): ${counts[2]}`;

    const card = this.pickCard(pool);
    this.current = card;
    $("#trainer-area").innerHTML = `
      <div class="trainer-card">
        <div class="trainer-box-tag">Box ${this.boxOf(card)} · ${card.topic}</div>
        <div class="trainer-term">${card.term}</div>
        <div class="trainer-actions">
          <button class="reveal primary">Reveal answer</button>
        </div>
      </div>`;
    $("#trainer-area .reveal").addEventListener("click", () => this.reveal());
  },

  reveal() {
    const card = this.current;
    $("#trainer-area").innerHTML = `
      <div class="trainer-card">
        <div class="trainer-box-tag">Box ${this.boxOf(card)} · ${card.topic}</div>
        <div class="trainer-term">${card.term}</div>
        <div class="trainer-def">${card.def}</div>
        ${card.detail ? `<div class="trainer-detail">💡 ${card.detail}</div>` : ""}
        <div class="trainer-actions">
          <button class="know">✓ Knew it</button>
          <button class="dont">✗ Didn't know</button>
        </div>
      </div>`;
    $("#trainer-area .know").addEventListener("click", () => this.grade(true));
    $("#trainer-area .dont").addEventListener("click", () => this.grade(false));
  },

  grade(knew) {
    const k = this.keyOf(this.current);
    const box = this.boxOf(this.current);
    this.boxes[k] = knew ? Math.min(3, box + 1) : 1;
    this.save();
    this.render();
  },

  reset() {
    if (!confirm("Reset all trainer progress?")) return;
    this.boxes = {};
    this.save();
    this.render();
  },
};
fillTopicSelect($("#trainer-topic"));
$("#trainer-topic").addEventListener("change", () => Trainer.render());
$("#trainer-reset").addEventListener("click", () => Trainer.reset());

// ── Boot ────────────────────────────────────────────────────────
Memory.newGame();
show("home");
