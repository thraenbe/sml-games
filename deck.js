// SML flashcard deck — built from Tübingen SML course (summer 2026)
// Each card: topic, term, def (short, used for matching/quiz), detail (optional longer note),
// viz (optional inline SVG sketch, colors come from CSS variables — see .viz in style.css)

const VIZ = {
  doubleDescent: `<svg class="viz" viewBox="0 0 320 180" role="img" aria-label="Double descent: test risk falls, spikes at the interpolation threshold, then falls again">
    <path class="vz-ax" d="M36 14 V148 H306"/>
    <path class="vz-dash" d="M175 16 V148"/>
    <path class="vz-l2" d="M40 80 C 90 118, 140 136, 175 142 L 302 145"/>
    <path class="vz-l1" d="M40 62 C 70 100, 105 108, 128 92 C 150 76, 165 40, 174 18 C 184 52, 215 96, 302 108"/>
    <text class="vz-t vz-c1" x="70" y="52">test risk</text>
    <text class="vz-t vz-c2" x="220" y="132">train risk</text>
    <text class="vz-t" x="182" y="28">p ≈ n</text>
    <text class="vz-t" x="180" y="166">model size p →</text>
    <text class="vz-t" x="10" y="90" transform="rotate(-90 14 90)">risk</text>
  </svg>`,

  biasVariance: `<svg class="viz" viewBox="0 0 320 180" role="img" aria-label="Bias-variance tradeoff: bias falls, variance rises, total error is U-shaped">
    <path class="vz-ax" d="M36 14 V148 H306"/>
    <path class="vz-l2" d="M40 38 C 90 92, 150 118, 300 128"/>
    <path class="vz-l1" d="M40 128 C 130 122, 220 88, 300 34"/>
    <path class="vz-dashi" d="M40 66 C 100 98, 130 104, 165 103 C 210 100, 255 78, 300 52"/>
    <circle class="vz-dot3" cx="165" cy="103" r="4"/>
    <text class="vz-t vz-c2" x="46" y="30">bias²</text>
    <text class="vz-t vz-c1" x="238" y="30">variance</text>
    <text class="vz-t" x="150" y="90">total</text>
    <text class="vz-t" x="150" y="126">sweet spot</text>
    <text class="vz-t" x="168" y="166">model complexity →</text>
    <text class="vz-t" x="10" y="90" transform="rotate(-90 14 90)">error</text>
  </svg>`,

  roc: `<svg class="viz" viewBox="0 0 320 180" role="img" aria-label="ROC curve bowing to the top-left above the random-guess diagonal; area under it is the AUC">
    <path class="vz-ax" d="M36 14 V148 H306"/>
    <path class="vz-f1" d="M36 148 C 60 55, 105 26, 306 14 L 306 148 Z"/>
    <path class="vz-dash" d="M36 148 L306 14"/>
    <path class="vz-l1" d="M36 148 C 60 55, 105 26, 306 14"/>
    <circle class="vz-dot1" cx="88" cy="46" r="4"/>
    <text class="vz-t" x="98" y="66">one threshold</text>
    <text class="vz-t" x="190" y="110">AUC</text>
    <text class="vz-t" x="212" y="66">random</text>
    <text class="vz-t" x="150" y="166">FPR →</text>
    <text class="vz-t" x="10" y="90" transform="rotate(-90 14 90)">TPR</text>
  </svg>`,

  margin: `<svg class="viz" viewBox="0 0 320 180" role="img" aria-label="Two point classes separated by a line with a margin band of width rho">
    <path class="vz-dash" d="M40 138 L280 18"/>
    <path class="vz-dash" d="M80 166 L316 48"/>
    <path class="vz-l1" d="M60 152 L298 33"/>
    <circle class="vz-dot1" cx="70" cy="38" r="5"/><circle class="vz-dot1" cx="105" cy="55" r="5"/>
    <circle class="vz-dot1" cx="60" cy="85" r="5"/><circle class="vz-dot1" cx="135" cy="28" r="5"/>
    <rect class="vz-dot2" x="216" y="140" width="9" height="9"/><rect class="vz-dot2" x="246" y="118" width="9" height="9"/>
    <rect class="vz-dot2" x="278" y="142" width="9" height="9"/><rect class="vz-dot2" x="196" y="158" width="9" height="9"/>
    <path class="vz-axl" d="M150 88 L168 124"/>
    <text class="vz-t" x="174" y="136">margin ρ</text>
    <text class="vz-t vz-c1" x="46" y="20">+1</text>
    <text class="vz-t vz-c2" x="290" y="170">−1</text>
  </svg>`,

  l1l2: `<svg class="viz" viewBox="0 0 320 180" role="img" aria-label="An l1 diamond makes loss contours touch at a corner (a zero coefficient); an l2 circle touches off-axis">
    <path class="vz-l1" d="M95 35 L145 85 L95 135 L45 85 Z" fill="none"/>
    <ellipse class="vz-ctr" cx="152" cy="40" rx="46" ry="22" transform="rotate(-22 152 40)"/>
    <ellipse class="vz-ctr" cx="152" cy="40" rx="26" ry="12" transform="rotate(-22 152 40)"/>
    <circle class="vz-dot2" cx="95" cy="35" r="5"/>
    <circle class="vz-l1c" cx="235" cy="85" r="50"/>
    <ellipse class="vz-ctr" cx="288" cy="42" rx="40" ry="19" transform="rotate(-22 288 42)"/>
    <ellipse class="vz-ctr" cx="288" cy="42" rx="22" ry="10" transform="rotate(-22 288 42)"/>
    <circle class="vz-dot2" cx="271" cy="51" r="5"/>
    <text class="vz-t" x="60" y="166">ℓ1 — corner ⇒ exact zero</text>
    <text class="vz-t" x="216" y="166">ℓ2 — no corners</text>
  </svg>`,

  softThreshold: `<svg class="viz" viewBox="0 0 320 180" role="img" aria-label="Soft-thresholding: output is zero inside minus lambda to lambda, shifted identity outside">
    <path class="vz-ax" d="M20 90 H304 M160 16 V164"/>
    <path class="vz-dash" d="M60 140 L260 40"/>
    <path class="vz-l1" d="M40 135 L130 90 H190 L280 45"/>
    <path class="vz-tick" d="M130 86 V94 M190 86 V94"/>
    <text class="vz-t" x="110" y="112">−λ</text>
    <text class="vz-t" x="192" y="108">λ</text>
    <text class="vz-t" x="230" y="30">identity</text>
    <text class="vz-t vz-c1" x="46" y="164">soft-threshold</text>
  </svg>`,

  tails: `<svg class="viz" viewBox="0 0 320 180" role="img" aria-label="Hoeffding's exponential tail bound drops far faster than Chebyshev's polynomial bound">
    <path class="vz-ax" d="M36 14 V148 H306"/>
    <path class="vz-l2" d="M60 20 C 90 70, 130 105, 300 128"/>
    <path class="vz-l1" d="M60 20 C 75 90, 95 135, 140 144 L 300 146"/>
    <text class="vz-t vz-c2" x="188" y="106">Chebyshev ∝ 1/t²</text>
    <text class="vz-t vz-c1" x="150" y="134">Hoeffding ∝ e^(−2t²)</text>
    <text class="vz-t" x="270" y="166">t →</text>
    <text class="vz-t" x="10" y="100" transform="rotate(-90 14 100)">P(dev ≥ t)</text>
  </svg>`,

  adaboost: `<svg class="viz" viewBox="0 0 320 180" role="img" aria-label="AdaBoost training error staircase falling under the exponential bound curve">
    <path class="vz-ax" d="M36 14 V148 H306"/>
    <path class="vz-l1" d="M40 24 C 90 60, 140 110, 300 138"/>
    <path class="vz-l2" d="M40 30 H70 V70 H100 V95 H130 V115 H160 V128 H200 V140 H240 V146 H302"/>
    <text class="vz-t vz-c1" x="170" y="52">bound e^(−2γ²T)</text>
    <text class="vz-t vz-c2" x="52" y="112">training error</text>
    <text class="vz-t" x="200" y="166">boosting rounds T →</text>
  </svg>`,

  ridgePath: `<svg class="viz" viewBox="0 0 320 180" role="img" aria-label="Ridge coefficient paths shrinking smoothly toward zero as lambda grows">
    <path class="vz-ax" d="M36 14 V148 H306"/>
    <path class="vz-dash" d="M36 100 H306"/>
    <path class="vz-l1" d="M40 30 C 120 45, 200 80, 300 96"/>
    <path class="vz-l2" d="M40 60 C 120 70, 200 90, 300 98"/>
    <path class="vz-l3" d="M40 146 C 120 134, 200 110, 300 103"/>
    <text class="vz-t vz-c1" x="44" y="24">w₁</text>
    <text class="vz-t vz-c2" x="44" y="54">w₂</text>
    <text class="vz-t vz-c3" x="44" y="164">w₃</text>
    <text class="vz-t" x="270" y="94">→ 0</text>
    <text class="vz-t" x="150" y="166">penalty λ →</text>
  </svg>`,

  bagging: `<svg class="viz" viewBox="0 0 320 180" role="img" aria-label="Variance of a bagged average decays with the number of models toward a correlation floor">
    <path class="vz-ax" d="M36 14 V148 H306"/>
    <path class="vz-dash" d="M36 118 H306"/>
    <path class="vz-l1" d="M40 24 C 80 70, 130 100, 300 114"/>
    <text class="vz-t vz-c1" x="110" y="56">Var of the average</text>
    <text class="vz-t" x="170" y="136">correlation floor ρσ²</text>
    <text class="vz-t" x="170" y="166">number of models m →</text>
  </svg>`,

  spikySmooth: `<svg class="viz" viewBox="0 0 320 180" role="img" aria-label="A smooth curve with thin spikes through each noisy training point: interpolation without hurting the global fit">
    <path class="vz-ax" d="M36 14 V148 H306"/>
    <path class="vz-l1" d="M40 100 C 90 58, 130 60, 160 95 C 195 132, 240 78, 300 72"/>
    <path class="vz-l1s" d="M74 79 L80 46 L86 78"/>
    <path class="vz-l1s" d="M144 82 L150 120 L156 86"/>
    <path class="vz-l1s" d="M214 116 L220 138 L226 112"/>
    <path class="vz-l1s" d="M262 74 L268 44 L274 73"/>
    <circle class="vz-dot2" cx="80" cy="46" r="4"/><circle class="vz-dot2" cx="150" cy="120" r="4"/>
    <circle class="vz-dot2" cx="220" cy="138" r="4"/><circle class="vz-dot2" cx="268" cy="44" r="4"/>
    <text class="vz-t vz-c1" x="44" y="30">spiky-smooth predictor</text>
    <text class="vz-t vz-c2" x="196" y="164">noisy training points</text>
  </svg>`,
};

const DECK = [
  // ── Bayes decision theory ─────────────────────────────────────
  { topic: "Bayes & Decision Theory", term: "Bayes classifier (0-1 loss)",
    def: "Predict the class with highest posterior: argmax_y P(y|x)",
    detail: "For binary labels: f°(x) = 1 iff η(x) = P(Y=1|X=x) ≥ 1/2." },
  { topic: "Bayes & Decision Theory", term: "Bayes-optimal predictor (squared loss)",
    def: "f*(x) = E[Y | X = x], the conditional expectation",
    detail: "Its risk is the irreducible noise floor: R(f*) = E[Var(Y|X)]." },
  { topic: "Bayes & Decision Theory", term: "Bayes risk",
    def: "The lowest achievable risk of any predictor, R* = R(f*)",
    detail: "Under squared loss R* = E[Var(Y|X)] — irreducible noise." },
  { topic: "Bayes & Decision Theory", term: "ML vs. Bayes classifier",
    def: "ML ignores the class prior; Bayes weights class-conditionals by prior π(y)",
    detail: "They agree exactly when the prior is uniform." },
  { topic: "Bayes & Decision Theory", term: "Cost-sensitive classification",
    def: "Asymmetric losses shift the decision threshold on η(x) away from 1/2",
    detail: "Minimize conditional risk: predict 1 iff η(x)·cost(FN) ≥ (1−η(x))·cost(FP)." },
  { topic: "Bayes & Decision Theory", term: "Conditional risk",
    def: "Expected loss of a decision given x; the Bayes rule minimizes it pointwise",
    detail: "R(ŷ|x) = Σ_y L(y, ŷ) P(y|x)." },

  // ── Evaluation metrics ────────────────────────────────────────
  { topic: "Evaluation Metrics", term: "Confusion matrix",
    def: "2×2 table of TP, FP, FN, TN counts",
    detail: "Basis for accuracy, TPR, FPR, precision, recall." },
  { topic: "Evaluation Metrics", term: "Accuracy under class imbalance",
    def: "Misleading: 'approve everything' gets 95% accuracy at 5% positives",
    detail: "Use precision/recall or AUC instead when classes are imbalanced." },
  { topic: "Evaluation Metrics", term: "TPR (recall)",
    def: "TP / (TP + FN) — fraction of actual positives found",
    detail: "Also called sensitivity or hit rate." },
  { topic: "Evaluation Metrics", term: "FPR",
    def: "FP / (FP + TN) — fraction of negatives falsely flagged",
    detail: "x-axis of the ROC curve." },
  { topic: "Evaluation Metrics", term: "Precision",
    def: "TP / (TP + FP) — fraction of flagged items that are truly positive",
    detail: "Sensitive to class imbalance, unlike TPR/FPR." },
  { topic: "Evaluation Metrics", term: "ROC curve",
    def: "TPR plotted against FPR while sweeping the decision threshold",
    detail: "The diagonal is random guessing." },
  { topic: "Evaluation Metrics", term: "AUC",
    def: "P(random positive is scored above random negative)",
    detail: "Insensitive to class imbalance, but hides false-alarm volume (TN sits in the FPR denominator)." },
  { topic: "Evaluation Metrics", term: "Precision-Recall curve",
    def: "Invariant to TN count; exposes false alarms under heavy imbalance",
    detail: "Random baseline equals the positive prevalence, not 0.5." },

  // ── Learning theory ───────────────────────────────────────────
  { topic: "Learning Theory", term: "Consistency",
    def: "The risk converges to the Bayes risk: R(f_n) → R*",
    detail: "Convergence of risk, not pointwise convergence of the function." },
  { topic: "Learning Theory", term: "Universal consistency (k-NN)",
    def: "k-NN is universally consistent if k(n) → ∞ and k(n)/n → 0",
    detail: "Consistent for every data distribution." },
  { topic: "Learning Theory", term: "VC dimension",
    def: "Size of the largest set of points the class can shatter",
    detail: "Shatter = realize all 2^n labelings. Intervals on ℝ: VC = 2; union of ≤2 intervals: VC = 4." },
  { topic: "Learning Theory", term: "Shattering",
    def: "A class shatters n points if it realizes all 2^n possible labelings",
    detail: "Used to define VC dimension." },
  { topic: "Learning Theory", term: "Growth function",
    def: "N(F, n): maximum number of distinct labelings of n points by class F",
    detail: "Intervals on ℝ: N(n) = 1 + n + n(n−1)/2." },
  { topic: "Learning Theory", term: "Sauer–Shelah lemma",
    def: "VC dim d ⇒ growth function ≤ (en/d)^d — polynomial, not 2^n",
    detail: "N(F,n) ≤ Σ_{i≤d} C(n,i) ≤ (en/d)^d = O(n^d) for n ≥ d." },
  { topic: "Learning Theory", term: "Generalization bound (VC)",
    def: "Excess risk ≈ √( (d·log(n/d) + log(1/δ)) / n )",
    detail: "Holds with probability 1−δ; d = VC dimension." },
  { topic: "Learning Theory", term: "No Free Lunch theorem",
    def: "Averaged over all distributions, no learner beats any other",
    detail: "Escape it by assuming structure (priors, smoothness) about the world." },

  // ── Concentration inequalities ────────────────────────────────
  { topic: "Concentration Inequalities", term: "Markov inequality",
    def: "P(Z ≥ a) ≤ E[Z] / a for nonnegative Z",
    detail: "The weakest bound; needs only the mean." },
  { topic: "Concentration Inequalities", term: "Chebyshev inequality",
    def: "P(|Y − E[Y]| ≥ t) ≤ Var(Y) / t²",
    detail: "Derived by applying Markov to (Y − E[Y])²." },
  { topic: "Concentration Inequalities", term: "Hoeffding inequality",
    def: "Exponential tail bound for sums of bounded i.i.d. variables",
    detail: "Gives sample complexity n = Θ(1/ε²) for estimating a mean to accuracy ε." },
  { topic: "Concentration Inequalities", term: "Union bound",
    def: "P(A₁ ∪ … ∪ A_m) ≤ Σ P(Aᵢ)",
    detail: "Validate m classifiers simultaneously by allocating δ/m failure probability each." },
  { topic: "Concentration Inequalities", term: "Sample complexity (mean estimation)",
    def: "n = Θ(1/ε²) samples to estimate a mean to accuracy ε",
    detail: "Follows from Hoeffding's inequality." },

  // ── Perceptron ────────────────────────────────────────────────
  { topic: "Perceptron", term: "Perceptron update rule",
    def: "On a mistake (yᵢ⟨w, xᵢ⟩ ≤ 0): w ← w + yᵢxᵢ",
    detail: "Only updates on mistakes; converges if data is linearly separable." },
  { topic: "Perceptron", term: "Perceptron mistake bound",
    def: "M ≤ (R/ρ)² with ‖xᵢ‖ ≤ R and margin ρ",
    detail: "Independent of dimension and number of samples." },
  { topic: "Perceptron", term: "Margin perceptron mistake bound",
    def: "M ≤ (R² + 2ρ₀) / ρ² when updating whenever margin < ρ₀",
    detail: "Trades more updates for a guaranteed margin." },

  // ── Regression & regularization ───────────────────────────────
  { topic: "Regression & Regularization", term: "Normal equations",
    def: "XᵀX w = Xᵀ Y — characterizes the least-squares solution",
    detail: "Comes from orthogonality: residual ⊥ column space of X." },
  { topic: "Regression & Regularization", term: "OLS solution",
    def: "ŵ = (XᵀX)⁻¹ Xᵀ Y (when XᵀX is invertible)",
    detail: "Requires rank(X) = d, so needs n ≥ d." },
  { topic: "Regression & Regularization", term: "Ridge regression",
    def: "Minimize ‖Xw − Y‖² + λ‖w‖²; ŵ_λ = (XᵀX + λI)⁻¹XᵀY",
    detail: "Unique solution even when d > n, since XᵀX + λI is always invertible." },
  { topic: "Regression & Regularization", term: "LASSO / ℓ1 regularization",
    def: "ℓ1 penalty produces exactly-zero coefficients (sparsity)",
    detail: "Soft-thresholding; geometrically, the ℓ1 ball has corners on the axes." },
  { topic: "Regression & Regularization", term: "1-D regression coefficient",
    def: "w* = Cov(X, Y) / Var(X)",
    detail: "Interpretation caveat: association, not causation." },
  { topic: "Regression & Regularization", term: "Weighted least squares",
    def: "Reweight samples: solve XᵀWX w = XᵀWY",
    detail: "W is a diagonal matrix of per-sample weights." },
  { topic: "Regression & Regularization", term: "Gradient of ‖Bx − a‖²",
    def: "∇ = 2Bᵀ(Bx − a)",
    detail: "Standard matrix-calculus identity; also ∇(xᵀAx) = (A + Aᵀ)x." },

  // ── Ensembles & boosting ──────────────────────────────────────
  { topic: "Ensembles & Boosting", term: "Bagging",
    def: "Average models trained on bootstrap samples → variance reduction",
    detail: "Reduction depends on correlation ρ between the models." },
  { topic: "Ensembles & Boosting", term: "Bootstrap sample",
    def: "Draw n points from the training set with replacement",
    detail: "≈ 63% of unique points appear in each bootstrap sample." },
  { topic: "Ensembles & Boosting", term: "AdaBoost weight update",
    def: "Sample weights Dᵢ ∝ exp(−yᵢ f_{t−1}(xᵢ)) — upweight mistakes",
    detail: "Misclassified points get exponentially more weight each round." },
  { topic: "Ensembles & Boosting", term: "AdaBoost classifier weight",
    def: "w_t = ½ log((1 − ε_t) / ε_t)",
    detail: "Weak learners with lower weighted error ε_t get more say." },
  { topic: "Ensembles & Boosting", term: "AdaBoost training-error bound",
    def: "Training error ≤ exp(−2γ²T) if every round has ε_t ≤ ½ − γ",
    detail: "Via normalizer product: error ≤ Π_t 2√(ε_t(1−ε_t))." },
  { topic: "Ensembles & Boosting", term: "Gradient boosting",
    def: "Each base learner fits the pseudo-residuals (negative loss gradient)",
    detail: "For squared loss, pseudo-residuals are just the residuals y − ŷ." },
  { topic: "Ensembles & Boosting", term: "Decision stump",
    def: "A one-split decision tree; the classic AdaBoost weak learner",
    detail: "Thresholds a single feature." },

  // ── Algorithmic stability ─────────────────────────────────────
  { topic: "Algorithmic Stability", term: "Uniform stability",
    def: "Max loss change when one training point is replaced: sup |ℓ(A(S),z) − ℓ(A(Sⁱ),z)|",
    detail: "Small stability ⇒ small expected generalization gap." },
  { topic: "Algorithmic Stability", term: "Stability of the averaging rule",
    def: "Replacing one of n points changes the average by ≤ 2/n",
    detail: "So the averaging rule is uniformly stable with Δ = O(1/n)." },
  { topic: "Algorithmic Stability", term: "Stability ⇒ generalization",
    def: "Expected generalization gap is bounded by the uniform stability Δ",
    detail: "A key alternative route to generalization besides VC bounds." },
  { topic: "Algorithmic Stability", term: "SGD stability condition",
    def: "One-pass SGD on convex β-smooth losses is stable if η ≤ 2/β",
    detail: "Coupling argument: gradient step is a contraction with factor |1 − ηβ|." },

  // ── Overparameterization ──────────────────────────────────────
  { topic: "Overparameterization", term: "Double descent",
    def: "Test risk peaks at the interpolation threshold (p ≈ n), then falls again as p grows",
    detail: "Contradicts the classical U-shaped bias-variance picture.",
    viz: VIZ.doubleDescent },
  { topic: "Overparameterization", term: "Interpolation threshold",
    def: "The model size p ≈ n where the model can just barely fit all training data",
    detail: "Where the double-descent risk spike occurs." },
  { topic: "Overparameterization", term: "Random Fourier features",
    def: "φ(x) = cos(ωᵀx + b), ω ~ N(0, I), b ~ Unif[0, 2π]",
    detail: "Random nonlinear features used to demonstrate double descent." },
  { topic: "Overparameterization", term: "Minimum-norm interpolator",
    def: "θ̂ = Xᵀ(XXᵀ)⁻¹y — the smallest-norm solution fitting all data",
    detail: "What gradient descent converges to in the overparameterized linear regime." },
  { topic: "Overparameterization", term: "Benign overfitting",
    def: "Interpolating noise yet achieving vanishing excess risk when d ≫ n",
    detail: "Whether overfitting is benign or harmful is decided by the covariance spectrum Σ (four regimes)." },
  { topic: "Overparameterization", term: "Near-orthogonality in high dimensions",
    def: "Random unit vectors are nearly orthogonal: P(|⟨u,v⟩| > t) ≤ 2e^(−c·d·t²)",
    detail: "Lets spiky interpolating components not hurt predictions elsewhere." },
  { topic: "Overparameterization", term: "Variance-preserving initialization",
    def: "Scale initial weights with Var ∝ 1/fan-in to keep activation variance constant",
    detail: "The Xavier/He initialization derivation." },

  // ── Fairness & explainability ─────────────────────────────────
  { topic: "Fairness & Explainability", term: "Equalized odds",
    def: "Equal TPR and equal FPR across protected groups",
    detail: "A single global threshold is generally insufficient when per-group ROC curves differ; may require randomization." },
  { topic: "Fairness & Explainability", term: "Fairness through unawareness (flaw)",
    def: "Dropping the protected attribute is not enough — proxies leak it",
    detail: "Correlated features (e.g. ZIP code) reconstruct the protected attribute." },
  { topic: "Fairness & Explainability", term: "Counterfactual explanation",
    def: "The minimal feature change that flips the model's decision",
    detail: "Basis for algorithmic recourse — actionable advice to affected users." },
  { topic: "Fairness & Explainability", term: "Algorithmic recourse",
    def: "Giving affected users an actionable path to change their outcome",
    detail: "Recourse actions should be actionable (not 'decrease your age')." },
  { topic: "Fairness & Explainability", term: "SHAP values",
    def: "Shapley-value-based feature attributions for a prediction",
    detail: "Caveat: they measure association within the model, not causation in the world." },

  // ── Visual cards ──────────────────────────────────────────────
  { topic: "Learning Theory", term: "Bias–variance tradeoff (classical picture)",
    def: "Bias² falls and variance rises with complexity; total error is U-shaped",
    detail: "The classical sweet spot sits at the minimum of the U — double descent later revises this picture beyond p ≈ n.",
    viz: VIZ.biasVariance },
  { topic: "Evaluation Metrics", term: "ROC curve geometry",
    def: "Sweeping the threshold traces TPR vs FPR; bowing toward the top-left beats the random diagonal",
    detail: "Each point on the curve is one threshold; the area under it is the AUC.",
    viz: VIZ.roc },
  { topic: "Perceptron", term: "Margin geometry",
    def: "The margin ρ is the gap between the separator and the closest points of either class",
    detail: "The mistake bound (R/ρ)² says: the wider the margin band, the fewer perceptron mistakes.",
    viz: VIZ.margin },
  { topic: "Regression & Regularization", term: "ℓ1 vs ℓ2 constraint geometry",
    def: "Loss contours hit the ℓ1 diamond at a corner (a zero coefficient); the ℓ2 circle has no corners",
    detail: "This is the geometric reason LASSO produces sparse solutions and ridge only shrinks.",
    viz: VIZ.l1l2 },
  { topic: "Regression & Regularization", term: "Soft-thresholding operator",
    def: "LASSO's coordinate update: exactly zero inside [−λ, λ], shifted identity outside",
    detail: "S(x, λ) = sign(x) · max(|x| − λ, 0) — the flat zero region is where sparsity comes from.",
    viz: VIZ.softThreshold },
  { topic: "Concentration Inequalities", term: "Polynomial vs exponential tails",
    def: "Chebyshev's bound decays like 1/t²; Hoeffding's decays like e^(−2t²) — far faster",
    detail: "That is why Hoeffding gives useful sample-complexity bounds where Chebyshev is loose.",
    viz: VIZ.tails },
  { topic: "Ensembles & Boosting", term: "AdaBoost error decay curve",
    def: "Training error drops below the exponential bound e^(−2γ²T) as rounds T increase",
    detail: "Holds whenever every weak learner beats random guessing by margin γ (ε_t ≤ ½ − γ).",
    viz: VIZ.adaboost },
  { topic: "Regression & Regularization", term: "Ridge shrinkage path",
    def: "As λ grows, all ridge coefficients shrink smoothly toward zero — none hit exactly zero",
    detail: "Contrast with LASSO paths, which hit exact zeros one by one.",
    viz: VIZ.ridgePath },
  { topic: "Ensembles & Boosting", term: "Bagging variance curve",
    def: "Variance of the bagged average falls with the number of models m, down to a correlation floor",
    detail: "Var ≈ ρσ² + (1−ρ)σ²/m — perfectly correlated models (ρ = 1) gain nothing from averaging.",
    viz: VIZ.bagging },
  { topic: "Overparameterization", term: "Spiky-smooth interpolation",
    def: "A smooth predictor plus thin spikes fits every noisy point without hurting the global fit",
    detail: "In high dimensions the spikes are so narrow they carry almost no risk — how interpolation can generalize (mock exam Q5).",
    viz: VIZ.spikySmooth },
];

const TOPICS = [...new Set(DECK.map(c => c.topic))];
