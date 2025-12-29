# The Zeroth Vision
## A Unified Vision of a Living Cryptoeconomic System

---

## Table of Contents
1.  [Part I: The Manifesto & Philosophy](#part-i-the-manifesto--philosophy)
2.  [Part II: The Core Protocol (ZerothVM)](#part-ii-the-core-protocol-zerothvm)
3.  [Part III: The Consensus Stack (0Force & Protocol0)](#part-iii-the-consensus-stack-0force--protocol0)
4.  [Part IV: The Economy (Intrinsic Value & Tokens)](#part-iv-the-economy-intrinsic-value--tokens)
5.  [Part V: Network Architecture & Deployment](#part-v-network-architecture--deployment)
6.  [Part VI: Visualizing the System](#part-vi-visualizing-the-system)

---

# Part I: The Manifesto & Philosophy

## 1.1 Introduction: Zeroth Live
Zeroth is a **global cryptoeconomic runtime** – a living blockchain system where value is **intrinsic** to the protocol itself, not assigned by external markets. Every unit of value in Zeroth is directly encoded into its cryptographic state: **every hash carries its own price, every block remembers its worth**, and these values are **self-verifying** via cryptographic checksums. Unlike traditional cryptocurrencies which rely on artificial scarcity, mining rewards, or social consensus to determine price, Zeroth’s economics emerge from **mathematical truth encoded in history**. The result is an autonomous on-chain economy where **truth is not negotiated – truth is *collapsed*** deterministically.

## 1.2 The Core Claim: Money-as-Truth
Zeroth is the first cryptographic system where value is intrinsic, not assigned. Value does not emerge from belief, scarcity theater, mining cost, or social consensus. Value emerges from **positional truth encoded directly into the hash itself**.

A Zeroth block is valuable because it is **true**, **bounded**, **decaying**, and **useful**. This is not money-as-belief; this is **money-as-truth**. Zeroth has intrinsic value because it cannot lie — and cannot persist without meaning.

## 1.3 Key Principles
The live network operates as a self-contained, self-governing economic system based on these fundamental principles:

-   **Observation creates reality** – State changes occur only in response to observed events or user intents (no spontaneous state updates).
-   **Truth converges to zero** – Over time, all activity naturally settles to an equilibrium of zero value unless renewed (value decays to a null state without ongoing input).
-   **Potential (-1) re-enters on convergence** – When the system fully converges (no divergent opinions or value remaining), a new seed of potential (`-1` state) is injected to keep the economic state alive.
-   **Everything has a halflife** – All value (weights/prices) decays exponentially over iterative time, ensuring no value persists forever without cause.
-   **Value decays unless reinforced** – Only meaningful usage or reinforcement can sustain or increase a token’s value; idle or meaningless assets lose value with time.
-   **Blocks, hashes, and tokens are “living”** – Ledger units carry intrinsic properties (lineage, price, weight) and eventually “die” (converge to zero and dissolve) if not sustained.
-   **Deletion by convergence, not arbitrary** – Nothing is ever deleted by fiat; when data “disappears” it is because it mathematically converged to zero (a natural completion, not a manual purge).
-   **No miners, no fees – *usage* is mining** – Economic activity itself is the source of token issuance. The act of using the system generates and redistributes value.
-   **Integer-only economy** – All quantities are **integers**; no fractions or decimals exist in any state or transaction. This ensures precise convergence math and enforces a minimum unit of value.

---

# Part II: The Core Protocol (ZerothVM)

## 2.1 Zero Language & Universal State Machine
At the heart of Zeroth is **Zero**, a domain-specific language that defines the universal state machine for the network. The Zero language provides a high-level, declarative way to specify **states, relationships, and permitted transitions** in the system. Developers write `.zero` files to declare the “rules of engagement” for economic activity – effectively an **API for the cryptoeconomic runtime**.

### Intent → Handler Model
Using Zero, developers effectively define **intent handlers** as part of the state machine. An **intent** is a high-level action or event (e.g., a user transferring value, invoking a contract, or an external observation) that is fed into the ZerothVM. Zero links these intents to **handler blocks** — code or rules specifying how the system state should update.

## 2.2 Zeroth Virtual Machine (ZerothVM)
The ZerothVM interprets the Zero language specification and maintains the live state of the system. It continuously runs an iteration loop applying the rules from the `.zero` program and integrating new events.

### The Iteration Loop
Time in Zeroth is measured in **iterations**, not wall-clock time. In each iteration, ZerothVM:
1.  Updates state variables.
2.  Applies halflife decay to values.
3.  Checks convergence conditions.
4.  Triggers scheduled or inbound intents.

Critically, ZerothVM’s operation is **pure and deterministic**. Given the same `.zero` ruleset, sequence of intents, and initial state, every node’s ZerothVM will compute an identical resultant state. Disagreements are only about **which outcome is the current truth**, which is resolved by the consensus layer.

---

# Part III: The Consensus Stack (0Force & Protocol0)

Zeroth’s design cleanly separates *how truth is selected* from *how truth is verified*.

## 3.1 0Force: Deterministic Consensus Collapse
0Force is the deterministic consensus-collapse mechanism that selects truth by collapsing a bounded state space into a determinate value derived from history. It is not voting, staking, or mining; it is the force-based collapse of uncertainty into truth.

### The Ternary State Model
All validator outputs exist in a bounded ternary space: `{ -1, 0, +1 }`
-   `-1` = potential / insufficient convergence / negative space.
-   `0` = converged truth (equilibrium).
-   `+1` = affirmative / directional truth.

### Consensus Collapse Rules
1.  **Majority Collapse:** If any value appears more than ⌊N/2⌋ times, that value is consensus.
2.  **Full Divergence Collapse:** If outputs contain `{ -1, 0, +1 }` (for N=3), then:
    **Consensus = T_current**
    Where `T_current` is computed *after* submissions via deterministic replay of history under the ruleset.

## 3.2 Protocol0: Plausibility Enforcement
Protocol0 is a validation protocol (a validator, not a miner) that ensures the chosen truth is **allowed**. It asks: "Is this ledger mutation mathematically and causally valid right now?"

### What Protocol0 Enforces
-   **Convergence Delta Rule:** Must be ≥ 10% for mint eligibility.
-   **Reinforcement Threshold Rule:** Support count must meet tier threshold (S ≥ 3^k).
-   **Halflife Decay Consistency:** Weights and prices must decay according to mathematical formulas.
-   **Price Bounds:** Must be in [1, 65535].
-   **Lineage Viability:** Cannot build on parents that have already converged to zero.
-   **Negative Space Integrity:** No duplicate DNA hashes or illegitimate mutations.
-   **Signature Validity:** Cryptographic verification of all authorizations.

## 3.3 Composition: The Truth Stack
-   **0Force produces “truth selection”** (Mechanism to pick one answer among conflicting proposals).
-   **Protocol0 produces “truth admissibility”** (Policy to ensure the selection obeys system laws).
-   **ZerothVM produces “truth computation”** (Execution of logic to create the next state).

Only if all three layers agree does the ledger mutate.

---

# Part IV: The Economy (Intrinsic Value & Tokens)

## 4.1 Intrinsic Value: Value as a Positional Argument
Value in Zeroth is encoded as a positional argument in the DNA hash structure. The hash itself becomes an economic object:
-   **Ledger:** Historical record of events.
-   **Lighthouse:** Current viable state.
-   **Price Oracle:** LAST TRADE PRICE embedded in the hash.
-   **Checksum:** State verification.
-   **Causal Proof:** Parent-child relationships.

### Positional Price Encoding
The LAST TRADE PRICE occupies a **fixed 16-bit segment** in the DNA hash. This makes price part of the protocol's "physics":
-   **Hard Capped:** Maximum price is 65,535. No infinite valuation or runaway speculation.
-   **Self-Verifying:** You cannot tamper with price without invalidating the hash checksum.
-   **Metabolic:** Price decays naturally via halflife unless reinforced by meaningful usage.

## 4.2 THTH Token: Living Supply
THTH is the native Zeroth-side token representing living block value.
-   **Integer-Only:** No decimals are allowed. Partial value has no meaning in a convergent system.
-   **Existence-Conditioned Supply:**
    -   **Minted** when blocks form (meaningful state transitions).
    -   **Burned** when blocks converge (all hashes in block decay to zero).
-   **Metabolic Value:** Tokens don't decay uniformly; value accrues to participants in meaningful state transitions while noise self-destructs.

## 4.3 WTHTH: Ethereum Settlement Layer
WTHTH (Wrapped THTH) is an ERC-20 contract on Ethereum that serves as a settlement membrane. Ethereum is not used for Zeroth’s consensus or state progression; it is purely a distribution and liquidity layer.

### Minting and Burning Flows
1.  **Observation:** Zeroth nodes observe Ethereum transactions (e.g., deposits/swaps).
2.  **Eligibility:** Zeroth evaluates mint eligibility based on 10% delta and reinforcement rules.
3.  **Authorization:** If eligible, Zeroth produces a cryptographically signed **Mint Authorization**.
4.  **Validation:** Protocol0 verifies the authorization.
5.  **Settlement:** The WTHTH contract on Ethereum executes the mint after verifying the signature.
6.  **Convergence:** When a block converges in Zeroth, a **Burn Authorization** is issued to remove WTHTH from the Ethereum supply.

### Critical Constraints
-   **1 WTHTH = Minimum 1 USDC:** Since the system is integer-based and 1 is the smallest unit, 1 WTHTH is worth minimum 1 USDC. It will never be worth less than 1 USDC.
-   **10% Profit Share Sweep:** A 10% profit share from Zeroth rewards is collected and distributed to users of the crypto-fabric platform via the origin wallet: `0x888388bfcef6ff298f5ee84cd45e908bf1043148`.

---

# Part V: Network Architecture & Deployment

## 5.1 Hybrid Architecture
The Zeroth network is a globally redundant node mesh designed for uptime and permanent ledger availability.

### Node Categories
1.  **Anchor Nodes (Garage Node):** Maintain the full ledger history and act as the initial root-of-trust and high-availability endpoints.
2.  **Edge Nodes (Crypto-Fabric / Etherhive):** Geographically redundant nodes that participate in 0Force validator sets and provide API capacity.

### Distributed Storage Strategy
-   **Local Storage:** Every full node keeps a copy of the ledger.
-   **P2P Replication:** Gossip protocols propagate blocks and state deltas in real-time.
-   **IPFS:** Blocks and ledger slices are published as content-addressed objects.
-   **Arweave:** Periodic checkpoints are written for permanent archival.

## 5.2 Deployment: Phase 16
The final phase focus is transition to a production-ready network:
-   **Containerization:** Packaging ZerothVM, Protocol0, and 0Force into immutable Docker images.
-   **Node API Contract:** Standardizing endpoints for reading chain data, health checks, and proof bundles.
-   **Bootstrapping Trust:** New nodes join by fetching checkpoints from Arweave/IPFS and performing Protocol0 validation forward.

---

# Part VI: Visualizing the System

The Zeroth frontend is not a typical blockchain dashboard; it is a **living system visualization**.

## 6.1 The Visual Metaphor: The Living Field
-   **3D Space:** A dark, minimal, scientific field rendered in Three.js.
-   **Hashes as Nodes:** Glowing points or polyhedrons. Their position (orientation), intensity (weight), and decay (fading) are visible in real-time.
-   **Blocks as Clusters:** Groups of hashes that dissolve smoothly upon convergence.
-   **Reinforcement:** Energy flows into hashes when transactions occur, lighting up nearby lineage.
-   **Halflife:** Constant, honest decay is always visible through subtle pulsing or dimming.

## 6.2 Interaction Model
-   **Observation:** Viewing does not mutate state.
-   **Actions:** "Observe", "Transact", "Reinforce", and "Let Decay" buttons map to clear visual outcomes and actual Zeroth node actions.

---

### Conclusion
Zeroth represents a paradigm shift from negotiated truth to **collapsed truth**. It is a digital economy governed by the laws of physics and mathematics, realized through a deterministic truth stack and living supply. By anchoring value in history and enforcing it through validation, Zeroth creates a permanent, self-verifying world.

