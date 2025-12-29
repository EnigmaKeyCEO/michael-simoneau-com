# Zeroth Live: A Visionary Cryptoeconomic Manifesto

## Table of Contents
- [1. Introduction](#1-introduction)
- [2. Zero Language & Universal State Machine](#2-zero-language--universal-state-machine)
- [3. 0Force: Deterministic Consensus Collapse](#3-0force-deterministic-consensus-collapse)
- [4. Protocol0: Plausibility Enforcement](#4-protocol0-plausibility-enforcement)
- [5. Intrinsic Value and THTH Token Economics](#5-intrinsic-value-and-thth-token-economics)
- [6. WTHTH: One-Way Ethereum Settlement Layer](#6-wthth-one-way-ethereum-settlement-layer)
- [7. ZerothVM Operation & Network Architecture](#7-zerothvm-operation--network-architecture)
- [8. Validator Lifecycle, Key Management & Ledger Structure](#8-validator-lifecycle-key-management--ledger-structure)
- [9. Cross-System Flow: From Intent to Settlement](#9-cross-system-flow-from-intent-to-settlement)
- [10. Security, Immutability and Decentralization](#10-security-immutability-and-decentralization)
- [11. Conclusion](#11-conclusion)

## 1. Introduction

Zeroth is a **global cryptoeconomic runtime** – a living blockchain system where value is **intrinsic** to the protocol itself, not assigned by external markets [zeroth.md](zeroth.md). Every unit of value in Zeroth is directly encoded into its cryptographic state: **every hash carries its own price, every block remembers its worth**, and these values are **self-verifying** via cryptographic checksums [zeroth.md](zeroth.md#21-value-as-positional-argument). Unlike traditional cryptocurrencies which rely on artificial scarcity, mining rewards, or social consensus to determine price, Zeroth’s economics emerge from **mathematical truth encoded in history** [0force.md](0force.md#1-motivation) [zeroth.md](zeroth.md#21-value-as-positional-argument). The result is an autonomous on-chain economy where **truth is not negotiated – truth is *collapsed*** deterministically [0force.md](0force.md#rule-2-full-divergence-collapse-0force-proper).

**Zeroth as a Functioning Cryptoeconomic Protocol:** In its fully realized form (after completing all development phases), Zeroth operates as a **self-contained, self-governing economic system**. It combines a custom state machine language (“Zero”), a novel consensus mechanism (0Force), a validation layer (Protocol0), and a bridging token model (THTH/WTHTH) to create a network where **economic value, state, and consensus are unified**. The key principles that distinguish Zeroth’s live network from traditional blockchains can be summarized as follows:

- **Observation creates reality** – State changes occur only in response to observed events or user intents (no spontaneous state updates) [thth.md](thth.md#31-observation-based-minting).
- **Truth converges to zero** – Over time, all activity naturally settles to an equilibrium of zero value unless renewed (value decays to a null state without ongoing input).
- **Potential (-1) re-enters on convergence** – When the system fully converges (no divergent opinions or value remaining), a new seed of potential (`-1` state) is injected to keep the economic state alive [zeroth.md](zeroth.md#46-potential-injection).
- **Everything has a halflife** – All value (weights/prices) decays exponentially over iterative time, ensuring no value persists forever without cause.
- **Value decays unless reinforced** – Only meaningful usage or reinforcement can sustain or increase a token’s value; idle or meaningless assets lose value with time [zeroth.md](zeroth.md#24-living-value-price-decay).
- **Blocks, hashes, and tokens are “living”** – Ledger units carry intrinsic properties (lineage, price, weight) and eventually “die” (converge to zero and dissolve) if not sustained [thth.md](thth.md#63-living-supply).
- **Deletion by convergence, not arbitrary** – Nothing is ever deleted by fiat; when data “disappears” it is because it mathematically converged to zero (a natural completion, not a manual purge).
- **No miners, no fees – *usage* is mining** – There are no mining rewards or staking incentives. The act of using the system (performing transactions or observations) is what generates and redistributes value [thth.md](thth.md#91-why-thth-doesnt-constantly-devalue). In Zeroth, **economic activity itself is the source of token issuance**, rather than external work or capital.
- **Integer-only economy** – All quantities are **integers**; no fractions or decimals exist in any state or transaction [zeroth.md](zeroth.md#22-integer-only-economics). This ensures precise convergence math (no rounding) and enforces a minimum unit of value (1 is the smallest indivisible token) [thth.md](thth.md#minimum-value).

These principles make Zeroth a **deterministic, mathematically-grounded economy**. Value is encoded directly in the protocol’s state transitions, and the system continually prunes and reinforces itself based on usage. In the following sections, we detail how each component of Zeroth works in its ultimate live state, now that the full vision has been implemented.

## 2. Zero Language & Universal State Machine

At the heart of Zeroth is **Zero**, a domain-specific language that defines the universal state machine for the network. The Zero language provides a high-level, declarative way to specify **states, relationships, and permitted transitions** in the system. Developers write `.zero` files to declare the “rules of engagement” for economic activity – effectively an **API for the cryptoeconomic runtime**. In a `.zero` specification, one can define state variables (e.g. economic states or tokens), alignment between states, and how the system should respond to inputs (intents) and converge over time.

For example, a simple Zero program might declare some states and how they relate:

```plaintext
state HELLO
state WORLD
state UNIVERSE

align HELLO WORLD strength 0.7
align HELLO UNIVERSE strength 0.3

observe convergence epsilon 0.0001
```

In this snippet, **HELLO**, **WORLD**, and **UNIVERSE** are states, and `align` statements define their coupling strengths. The program also specifies an observation convergence threshold — an epsilon at which the system considers the states converged. This illustrates how Zero encodes a state machine: states have relationships (like edges in a graph with weights), and the system will iterate until a convergence criterion is met.

---

### Intent → Handler Model

Using Zero, developers effectively define **intent handlers** as part of the state machine. An **intent** is a high-level action or event (for example, a user transferring value, invoking a contract, or an external observation like an Ethereum transaction) that is fed into the ZerothVM.

The Zero language links these intents to **handler blocks** — code or rules that specify how the system state should update in response. Because ZerothVM executes the `.zero` specification deterministically on all nodes, every node will process a given intent in exactly the same way, yielding the same new state or record.

Zero thus serves as a **universal API** for interacting with the Zeroth network. Instead of arbitrary smart contract code, Zeroth exposes a controlled, mathematical state machine defined in `.zero` files. This state machine governs what actions are possible and how they affect the global ledger.

It abstracts complex consensus and cryptoeconomic rules behind a developer-friendly interface: one simply declares what should happen (the intent and its effect on state), and the ZerothVM ensures it happens consistently across the decentralized network.

---

### Deterministic State Execution (ZerothVM)

The **Zeroth Virtual Machine (ZerothVM)** interprets the Zero language specification and maintains the live state of the system. It continuously runs an iteration loop applying the rules from the `.zero` program and integrating new events.

Time in Zeroth is measured in **iterations**, not seconds.

In each iteration, ZerothVM:
- Updates state variables
- Applies halflife decay to values
- Checks convergence conditions
- Triggers scheduled or inbound intents

This constant loop yields a reactive, living system — one that evolves as users interact with it and as time-based rules take effect.

Critically, ZerothVM’s operation is **pure and deterministic**. Given:
- the same `.zero` ruleset
- the same sequence of intents
- the same initial state  

every node’s ZerothVM will compute the **identical resultant state**.

This determinism underpins the higher layers of consensus (0Force and Protocol0) by ensuring that disagreements are only about **which outcome is the current truth**, not about how to execute the logic.

---

## 3. 0Force — Deterministic Consensus Collapse

Zeroth does not use Proof-of-Work or traditional Proof-of-Stake consensus. Instead, it introduces **0Force**, a deterministic consensus mechanism that collapses validator outputs into a single truth.

0Force operates on a **ternary state model** for validator outputs:

```
{ -1, 0, +1 }
```

Where:
- `-1` = potential / insufficient convergence
- `0`  = converged truth (equilibrium)
- `+1` = affirmative / directional truth

Validators independently compute their output based on ZerothVM execution.

---

### Odd Validator Set & Isolation

- Validator sets must have **odd cardinality** (minimum 3).
- Validators are **isolated**:
  - They cannot observe `T_current`
  - They cannot see other validator outputs
  - They cannot predict collapse outcomes

This prevents coordination, guessing attacks, and oracle advantages.

---

### Consensus Collapse Rules

#### 1. Majority Collapse

If any value appears more than ⌊N/2⌋ times:

```
Consensus = majority(value)
```

Example (5 validators):
```
{0, 0, 0, +1, -1} → 0
```

Immediate and deterministic.

---

#### 2. Full Divergence Collapse (0Force Proper)

If all three values appear and no majority exists:

```
{-1, 0, +1}
```

Then:

```
Consensus = T_current
```

Where `T_current` is computed **after submissions** via deterministic replay of:
- ledger history
- ruleset

Key properties:
- `T_current` does not exist prior to submission
- Validators cannot know or influence it
- History selects truth

> **0Force does not choose truth.  
> It reveals it.**

---

### Reinforcement & Decay

- **Majority case**:
  - Majority validators are reinforced
  - Minority validators decay normally
- **Full divergence**:
  - Only the validator matching `T_current` is reinforced
  - Others are neither punished nor rewarded

There are:
- no fees
- no slashing
- no staking
- no mining rewards

Correct computation is the only dominant strategy.

---

## 4. Protocol0 — Plausibility Enforcement

While 0Force selects **which truth collapses**, **Protocol0** ensures that the chosen truth is **allowed**.

Protocol0 asks:

> “Is this ledger mutation mathematically and causally valid right now?”

Protocol0 is a **validator**, not a miner.

---

### What Protocol0 Enforces

- Convergence delta thresholds (e.g. ≥10% for minting)
- Reinforcement thresholds (base-3 exponential)
- Halflife decay correctness
- Price bounds `[1, 65535]`
- Price-in-hash consistency
- Lineage viability (no building on converged parents)
- Negative space integrity (no duplicate DNA hashes)
- Signature validity and replay protection

Invalid states are simply **not admitted**.

---

### Composition with 0Force

The separation is clean:

- **ZerothVM** computes candidate state transitions
- **0Force** selects truth when validators disagree
- **Protocol0** validates admissibility of the selected truth

Only if **all three** agree does the ledger mutate.

This allows Zeroth to function with:
- no gas
- no transaction fees
- no economic spam incentives

Invalid or meaningless actions simply do nothing.

---

### Summary

- Zero defines the state machine and API
- ZerothVM executes deterministically
- 0Force collapses uncertainty into truth
- Protocol0 enforces mathematical law
- History, not power, governs outcomes

This is consensus without politics,  
validation without fees,  
and truth selected by history.

---

## 5. Intrinsic Value and THTH Token Economics

THTH (pronounced "TéCH") is the first cryptographic token where value is **intrinsic**, not assigned. Unlike traditional cryptocurrencies that rely on scarcity, mining costs, or social consensus, THTH's value is **mathematically verifiable** and self-contained within its cryptographic structure [thth.md](thth.md).

### Integer-Only Economics
THTH tokens are **integer-only**. No decimals are allowed. This is mathematically necessary because Zeroth states are discrete (`-1, 0, +1`) and convergence is exact (`-0 = +0`). Partial value has no meaning in a convergent system [thth.md](thth.md#21-integer-only-design).

### Metabolic Value and Decay
Value in Zeroth is **metabolic**: it decays over time unless reinforced. The price of a token is encoded directly in its DNA hash and follows a halflife decay formula:
`P(t) = floor(P₀ × 2^(-t / τ))`
Idle blocks lose value, while meaningful usage reinforces validity and extends lifespan [thth.md](thth.md#62-decay-based-economics).

### Living Supply
The supply of THTH is **living**:
- Tokens are minted only when blocks form (observation of meaningful events).
- Tokens are burned when blocks converge (decay to zero).
- Supply mirrors active block mass, not historical issuance [thth.md](thth.md#63-living-supply).

---

## 6. WTHTH: One-Way Ethereum Settlement Layer

**WTHTH (Wrapped THTH)** is the Ethereum ERC-20 token that serves as the settlement layer for the Zeroth economy. The WTHTH contract is "dumb" – it contains no valuation logic. It acts purely as a membrane to allow Zeroth value to flow into the Ethereum ecosystem [thth.md](thth.md#51-design-principles).

### Minting and Burning
Minting and burning are strictly controlled by Zeroth's internal state:
1.  **Minting:** Occurs only when Zeroth observes a meaningful event (like an ETH deposit) and generates a cryptographically signed **Mint Authorization**. The WTHTH contract verifies this signature before minting tokens [thth.md](thth.md#3-minting-mechanism).
2.  **Burning:** Occurs when a Zeroth block fully converges to zero. Zeroth issues a **Burn Authorization**, which the contract uses to burn the corresponding WTHTH tokens, ensuring the Ethereum supply matches the living Zeroth state [thth.md](thth.md#4-burning-mechanism).

This creates a one-way flow of logic: Zeroth determines truth, and Ethereum settles value based on that truth.

---

## 7. ZerothVM Operation & Network Architecture

The Zeroth network is designed for resilience, determinism, and permanence. It moves beyond a single "garage node" to a globally redundant mesh of nodes [ZerothVM.md](ZerothVM.md#overview).

### Node Types
-   **Anchor Nodes:** Maintain the full ledger history and serve as reference points for bootstrapping.
-   **Edge Nodes (Crypto-Fabric):** Community-run nodes that provide geographic redundancy and participate in 0Force validator sets [ZerothVM.md](ZerothVM.md#zerothvm-nodes).

### Distributed Storage Strategy
To ensure the ledger is permanent and censorship-resistant, Zeroth employs a hybrid storage model:
-   **P2P Gossip:** Active nodes replicate blocks and state in real-time.
-   **IPFS:** Every block is pinned to IPFS, making the data content-addressable and retrievable even if specific nodes go offline.
-   **Arweave:** Periodic checkpoints are written to Arweave for permanent, immutable archival of the chain history [ZerothVM.md](ZerothVM.md#distributed-ledger-storage-strategy).

---

## 8. Validator Lifecycle, Key Management & Ledger Structure

### Validator Isolation
Validators in the 0Force system must remain **isolated**. They cannot observe the global truth `T_current` or seeing other validators' outputs during a collapse round. This prevents coordination attacks and ensures that the consensus collapse is purely a function of the deterministic rules [0force.md](0force.md#42-validator-isolation).

### Key Management
Critical operations, such as signing Mint/Burn authorizations, require high-security key management (e.g., HSMs or multi-sig schemes) to prevent unauthorized value creation. The keys that authorize Ethereum settlement are distinct from the keys used for daily block signing [ZerothVM.md](ZerothVM.md#risks-and-security-considerations).

### Ledger Structure: DNA Hashes
The ledger is built from **DNA Hashes** – 64-bit identifiers that encode lineage, price, orientation, and class. These hashes are self-verifying; tampering with any property invalidates the checksum. The ledger also enforces **Negative Space Integrity**, ensuring that unused portions of the hash space remain empty to prevent collisions [zeroth.md](zeroth.md#3-dna-hash-system).

---

## 9. Cross-System Flow: From Intent to Settlement

The interaction between users, Ethereum, and Zeroth follows a strict causal flow:

1.  **Intent:** A user initiates an action (e.g., swapping ETH for WTHTH on Uniswap).
2.  **Observation:** Zeroth nodes observe this Ethereum transaction.
3.  **State Computation:** ZerothVM computes the new state. If the transaction represents valid value injection, it calculates the new intrinsic value.
4.  **Validation:** Protocol0 checks the plausibility (convergence delta, price bounds).
5.  **Consensus:** 0Force validators collapse the state update to a single truth.
6.  **Authorization:** If a mint is required, Zeroth signs a Mint Authorization.
7.  **Settlement:** The authorization is submitted to the WTHTH contract on Ethereum, minting the tokens to the user [thth.md](thth.md#31-observation-based-minting).

---

## 10. Security, Immutability and Decentralization

Zeroth achieves security through **determinism and history**, not economic competition.

-   **Truth without Trust:** 0Force ensures that even if validators diverge, the system collapses to a deterministic truth derived from history (`T_current`), making the system ungamable [0force.md](0force.md#62-non-gameability).
-   **Immutability:** Once a state is finalized and checkpointed to Arweave, it is permanent. The use of Protocol0 prevents invalid states from ever entering the ledger.
-   **Decentralization:** The combination of diverse edge nodes, IPFS/Arweave storage, and isolated validators ensures no single point of failure or control [ZerothVM.md](ZerothVM.md#risks-and-security-considerations).

---

## 11. Conclusion

Zeroth represents a paradigm shift from **negotiated truth** to **collapsed truth**. By encoding value intrinsically in the cryptographic structure (DNA hashes) and enforcing it through deterministic consensus (0Force) and mathematical validation (Protocol0), Zeroth creates a living economy that is:

-   **Self-Verifying:** Price and value are mathematical facts, not market opinions.
-   **Self-Sustaining:** Value decays and regenerates based on meaningful usage.
-   **Permanent:** Anchored in distributed, immutable storage.

This is the realization of a **Zeroth Order** system: a digital economy governed by the laws of physics and mathematics, rather than the whims of markets or miners.
