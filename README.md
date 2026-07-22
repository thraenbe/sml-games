# SML Study Games 🎓

A tiny static website with three learning games for the **Statistical Machine Learning** course (Uni Tübingen), built from the exercise sheets, assignment 1 and the mock exam.

## Games

- **🃏 Memory** — flip tiles and match each term with its definition (8 pairs per round, filterable by topic).
- **❓ Quiz** — 10 multiple-choice questions per round, asked in both directions (term→definition and definition→term), with score and streak tracking.
- **📦 Trainer** — Leitner-box flashcards: recall the definition, reveal, self-grade. Cards you miss come back more often; progress is stored in `localStorage`.

## Explainers

- **📐 Residual Geometry** (`residual.html`) — an interactive walk-through of Exercise 1 (Linear Regression & Orthogonality): what the residual is, why a minimizer forces ⟨r, Xv⟩ = 0 for all v, the normal equations, and the projection picture. Two live figures: a weight slider showing the loss parabola and residual segments, and a draggable point on image(X) demonstrating the Pythagorean inequality.
- **📏 Regimes & Ridge** (`regimes.html`) — Exercise 2 (Linear Regression in Different Regimes): a regime map of n vs d, why XᵀX / XXᵀ are invertible (the "norm trick"), the minimum-norm interpolant as the origin's shadow on the solution set, and ridge regression as OLS on an augmented system. Interactive figures: a draggable w along the line of perfect fits (Pythagoras in weight space), and a λ slider tracing the ridge path from ŵ_mn to 0.
- **✂️ Sparsity & LASSO** (`lasso.html`) — Exercise 3 (Why ℓ1 Regularization Produces Sparse Solutions): soft-thresholding from the kink of |·|, the dead zone |XᵀY_j| ≤ λ, the ridge contrast (shrinks, never kills), and the ℓ1 ball's corners. Interactive figures: Y and λ sliders driving the 1-d objective and the soft-threshold vs ridge-shrinkage curves, and a draggable target projected onto a diamond vs a circle of equal budget.
- **🧭 Reading Coefficients** (`coefficients.html`) — Assignment 7, Exercises 1–2 (Weighted Least Squares & Interpreting Coefficients): the partial-effect meaning of ŵⱼ (Frisch–Waugh–Lovell), why zero coefficient ≠ zero correlation, the Communities & Crime sign flip at d ≈ n, and the bootstrap bias–variance experiment. Interactive figures: click-to-reweight least squares, a marginal-vs-partial dial with the sheet's counterexamples as presets, and a λ dial over the bootstrap mean/variance curves.
- **🌲 Bagging & Variance** (`bagging.html`) — Assignment 7, Exercise 3 (Why Bagging Reduces Variance): the bias²+variance+noise decomposition, the ideal bagged predictor, variance ÷ B for independent samples, and the correlation floor (ρ + (1−ρ)/B)σ² that random forests attack. Interactive figures: a live ensemble of B noisy regressograms with an error-decomposition bar, and the variance-floor curve with ρ and B sliders.
- **✏️ Sheet 7 Practice** (`practice7.html`) — eleven shorter tasks with hidden solutions covering Assignment 7's big picture: weighted LS, partial vs marginal, the d ≈ n danger, bias–variance arithmetic, the bagging floor, and the bootstrap's fine print — plus a one-screen map of the sheet.
- **⚖️ AdaBoost by Hand** (`adaboost.html`) — Assignment 8, Exercise 1 (Boosting Decision Stumps): the reweighting loop on the five-point square, why the constant rule wins round 1, the + | − | + three-stump vote, and the e^(−2γ²T) exponential clock. Interactive figures: a stump explorer with a round-1 reweighting toggle, a toggleable three-stump vote, and the bound racing the 1/n line with γ and n dials.
- **🌉 Boosting Past Zero** (`margins.html`) — Assignment 8, Exercise 2 (Implementing AdaBoost): a genuine 500-round AdaBoost run trained in the browser on load. Interactive figures: train/test error curves with a round slider, the decision-region staircase refining into the empty band, and the normalized-margin histogram marching toward +1 after training error is long zero.
- **⛷️ Gradient Boosting** (`gradboost.html`) — Assignment 8, Exercise 3 (Gradient Boosting & Base Learners): pseudo-residuals as the downhill signal (squared vs absolute loss, with a draggable outlier), why OLS base learners stall after one round, and the base-learner race — linear vs stump vs fully grown tree — with live fits and loss curves.
- **📝 Sheet 8 Practice** (`practice8.html`) — twelve shorter tasks with hidden solutions covering Assignment 8's big picture: vote weights, the ½-after-update identity, the exponential clock, margins past zero error, pseudo-residuals, and base-learner choice — plus a one-screen map of the sheet's three lenses.
- **🎓 Mock Exam, Worked** (`mockexam.html`) — every question of the July 2026 mock exam explained in full detail with the official rubric's point splits: the perceptron run, the consistency/generalization multiple choice, cost-sensitive Bayes, ROC curves & equalized odds, spiky-smooth interpolation, stability of the averaging rule, the AdaBoost training-error bound, and VC dimensions of interval classes. Seven interactive figures: a step-through perceptron worksheet, the two generalization bounds racing in n, a Bayes threshold dial (cost a and prior π), an ROC randomization explorer, the spiky-smooth cartoon, the two inequalities of the AdaBoost proof, and a click-to-flip VC shatter lab.
- **🩺 Cost-Sensitive Bayes** (`bayes.html`) — Mock Exam Q3 expanded into a full explainer of Bayesian decision theory, in the exam's own notation (prior π, marginal μ(x), posterior η(x), classifier f°, miss cost a): the joint distribution drawn as a mosaic of areas (Bayes' rule as an area ratio, with a rare-disease base-rate preset), the two conditional risks R(1|x) = 1−η and R(0|x) = a·η as lines whose crossing is the threshold 1/(1+a), and the posteriors as functions of the prior with both tipping points π₀* = 4/(4+a), π₁* = 1/(1+4a) marked.
- **🧮 Matrix Basics** (`matrices.html`) — the foundations page: matrices as machines, built from the operations every sheet relies on — addition, the two readings of Xw (rows dot / columns mix), transpose rules, determinants, inverses, quadratic forms, positive definiteness, and eigenvalues — each with a worked 2×2 example, ending at the six formulas the course runs on (normal equations, OLS, ridge, min-norm, projection, kernel matrix). Interactive figures: a matrix-multiplication stepper, a 2×2 machine transforming the plane with det/inverse readouts, and a quadratic-form explorer (bowl / flat valley / saddle) with a ridge-λ dial that lifts eigenvalues.

## Deck

60 flashcards across 10 topics: Bayes & decision theory, evaluation metrics, learning theory (VC dimension, Sauer–Shelah), concentration inequalities, perceptron, regression & regularization, ensembles & boosting, algorithmic stability, overparameterization / double descent, and fairness & explainability.

Edit `deck.js` to add or change cards — everything else adapts automatically.

## Running

It's a plain static site — open `index.html` in a browser, or serve it:

```bash
python3 -m http.server
```

Deployed via GitHub Pages.
