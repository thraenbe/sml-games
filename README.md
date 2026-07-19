# SML Study Games 🎓

A tiny static website with three learning games for the **Statistical Machine Learning** course (Uni Tübingen), built from the exercise sheets, assignment 1 and the mock exam.

## Games

- **🃏 Memory** — flip tiles and match each term with its definition (8 pairs per round, filterable by topic).
- **❓ Quiz** — 10 multiple-choice questions per round, asked in both directions (term→definition and definition→term), with score and streak tracking.
- **📦 Trainer** — Leitner-box flashcards: recall the definition, reveal, self-grade. Cards you miss come back more often; progress is stored in `localStorage`.

## Deck

60 flashcards across 10 topics: Bayes & decision theory, evaluation metrics, learning theory (VC dimension, Sauer–Shelah), concentration inequalities, perceptron, regression & regularization, ensembles & boosting, algorithmic stability, overparameterization / double descent, and fairness & explainability.

Edit `deck.js` to add or change cards — everything else adapts automatically.

## Running

It's a plain static site — open `index.html` in a browser, or serve it:

```bash
python3 -m http.server
```

Deployed via GitHub Pages.
