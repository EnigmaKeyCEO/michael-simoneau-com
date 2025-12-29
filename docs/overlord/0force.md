# 0Force: Deterministic Consensus Collapse in Zeroth Systems

**Version 1.0 — December 01 2025**
**Author: Michael Simoneau**

---

## Abstract

**0Force** is the deterministic consensus-collapse mechanism underlying Zeroth systems. Unlike traditional consensus protocols that *create* truth through competition or agreement, 0Force **selects truth** by collapsing a bounded state space into a determinate value derived from history. It operates on a ternary state model `{ -1, 0, +1 }`, uses an odd-numbered validator set, and resolves full divergence by deferring to the system’s internally computed current truth (`T_current`).

0Force is not voting.
It is not staking.
It is not mining.

It is **force-based collapse of uncertainty into truth**.

---

## 1. Motivation

All distributed systems must answer the same question:

> *“What is true right now?”*

Traditional blockchains answer this through:

* economic competition (PoW),
* stake-weighted authority (PoS),
* or social consensus (governance).

These approaches:

* conflate truth with participation,
* introduce external incentives,
* and allow truth to be influenced rather than determined.

Zeroth rejects this.

**Truth is not negotiated.
Truth is collapsed.**

0Force formalizes this collapse.

---

## 2. Foundational Principle

> **Consensus is the determinate Truth.
> Truth is relative to history and current consensus thereof.**
> — *Michael Simoneau*

In 0Force, *consensus does not create truth* — it **selects** the truth already implied by history.

---

## 3. The Ternary State Model

All validator outputs exist in the bounded state space:

```
V ∈ { -1, 0, +1 }
```

Where:

* `-1` = potential / insufficient convergence / negative space
* `0` = converged truth (equilibrium)
* `+1` = affirmative / directional truth

This aligns with Zeroth’s core invariant:

> **Truth is 0.
> Potential is ±1.**

---

## 4. Validator Set Requirements

### 4.1 Odd Cardinality

0Force requires an **odd number of validators**.

Minimum viable set:

```
N = 3
```

This is not arbitrary:

* Majority collapse requires asymmetry
* Even sets allow deadlock
* Odd sets guarantee resolution

---

### 4.2 Validator Isolation

Validators:

* **cannot observe `T_current`**
* **cannot query global truth**
* **cannot predict collapse outcome with certainty**

Each validator submits **only its computed output**.

This guarantees:

* no oracle advantage
* no guessing edge
* no coordination attack

---

## 5. Consensus Collapse Rules

Let validator outputs be:

```
S = { v₁, v₂, ..., vₙ }
```

### Rule 1 — Majority Collapse

If any value appears more than `⌊N/2⌋` times:

```
Consensus = majority(S)
```

Examples:

* `{0, 0, +1}` → `0`
* `{-1, +1, +1}` → `+1`
* `{-1, -1, 0}` → `-1`

This is deterministic and immediate.

---

### Rule 2 — Full Divergence Collapse (0Force Proper)

If and only if:

```
S == { -1, 0, +1 }   (for N = 3)
```

Then:

```
Consensus = T_current
```

Where:

```
T_current = deterministic_replay(history, ruleset)
```

**Critical constraints:**

* `T_current` does not exist prior to submission
* It is computed *after* validator outputs
* It is derived solely from ledger history and rules
* Validators cannot bias the outcome

This is the **0Force collapse**.

---

## 6. Properties of 0Force

### 6.1 Determinism

Given:

* identical history
* identical ruleset
* identical validator outputs

The collapse result is **identical everywhere**.

No forks.
No ambiguity.
No negotiation.

---

### 6.2 Non-Gameability

Guessing `T_current` provides no advantage:

* validators lack preimage access
* reinforcement depends on correctness, not confidence
* incorrect guesses decay naturally

Honest computation is strictly dominant.

---

### 6.3 No External Incentives

0Force requires:

* no fees
* no rewards for participation
* no staking
* no mining

Reinforcement is **structural**, not economic.

---

## 7. Reinforcement Semantics

When consensus resolves:

### Case A — Majority Collapse

Validators in the majority:

* receive reinforcement
* strengthen lineage
* extend halflife

Minority validators:

* decay normally

---

### Case B — Full Divergence Collapse

Only the validator whose output equals `T_current` is considered correct.

This validator:

* receives reinforcement
* is validated retroactively by history

Others:

* neither punished nor rewarded
* simply decay

This mirrors physical systems:

> *Multiple hypotheses collapse into one realized state.*

---

## 8. Relationship to Zeroth

0Force is **not a standalone protocol**.

It is:

* the consensus collapse layer of Zeroth
* used by Protocol0 for plausibility validation
* reflected in THTH mint/burn authorization

Zeroth creates truth through computation.
0Force selects truth under uncertainty.
Protocol0 validates that selection.

---

## 9. Relationship to Protocol0

Protocol0 enforces:

* convergence thresholds
* reinforcement limits
* decay consistency
* lineage viability

0Force provides the **truth input** when validators diverge.

Protocol0 answers:

> *“Is this collapse plausible?”*

0Force answers:

> *“Which value collapses?”*

---

## 10. Why 0Force Is Not Consensus As Known

| System     | Truth Source             | Mechanism     |
| ---------- | ------------------------ | ------------- |
| PoW        | Economic competition     | Probabilistic |
| PoS        | Stake-weighted authority | Political     |
| BFT        | Majority agreement       | Social        |
| **0Force** | History + rules          | Deterministic |

0Force does not *choose* truth.
It **reveals** it.

---

## 11. Formal Pseudocode

```python
def zero_force_consensus(validator_outputs, history, ruleset):
    counts = count(validator_outputs)

    # Majority collapse
    for value, c in counts.items():
        if c > len(validator_outputs) // 2:
            return value

    # Full divergence collapse
    if set(validator_outputs) == {-1, 0, +1}:
        return compute_T_current(history, ruleset)

    raise InvalidConsensusState
```

---

## 12. Conclusion

0Force completes the Zeroth system by answering the final question:

> *What happens when all valid perspectives disagree?*

The answer is not negotiation.
The answer is not power.
The answer is not probability.

The answer is **history**.

0Force ensures that:

* truth is bounded
* truth is deterministic
* truth is immune to manipulation
* truth is emergent, not assigned

**This is consensus without politics.
This is truth without trust.
This is 0Force.**
