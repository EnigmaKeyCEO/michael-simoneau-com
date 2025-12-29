# ZerothVM Decentralized Network Architecture

## Table of Contents

* [Overview and Goals](#overview-and-goals)
* [Consensus and Validation Stack](#consensus-and-validation-stack)

  * [0Force Consensus Collapse](#0force-consensus-collapse)
  * [Protocol0 Plausibility Validation](#protocol0-plausibility-validation)
  * [How 0Force and Protocol0 Compose](#how-0force-and-protocol0-compose)
* [Hybrid Architecture and Components](#hybrid-architecture-and-components)

  * [Front-End Window (Firebase Hosting)](#front-end-window-firebase-hosting)
  * [ZerothVM Nodes](#zerothvm-nodes)
  * [Validator Layer: 0Force Sets + Protocol0 Validators](#validator-layer-0force-sets--protocol0-validators)
  * [Ethereum Settlement Layer (WTHTH)](#ethereum-settlement-layer-wthth)
* [Distributed Ledger Storage Strategy](#distributed-ledger-storage-strategy)
* [Bootstrapping Trust for New Nodes](#bootstrapping-trust-for-new-nodes)
* [Convergence and Block State Propagation](#convergence-and-block-state-propagation)
* [CI/CD Integration](#cicd-integration)
* [Cost and Capacity Analysis](#cost-and-capacity-analysis)
* [Risks and Security Considerations](#risks-and-security-considerations)
* [Recommended First 7 Deployment Steps](#recommended-first-7-deployment-steps)
* [Conclusion](#conclusion)

---

## Overview and Goals

ZerothVM is a blockchain runtime where intrinsic value is encoded in DNA hashes, and supply is “living” (mints on meaningful progress; burns on convergence to zero). The system is intentionally split:

* **ZerothVM** computes truth + authorizations (native chain execution).
* **0Force** collapses validator uncertainty into a determinate truth when outputs fully diverge.
* **Protocol0** verifies plausibility of ledger state, decay rules, lineage viability, and authorization validity.
* **Ethereum (WTHTH)** is settlement-only: it mints/burns wrapped tokens when presented with valid authorizations.

Primary objective: **distribute ZerothVM beyond the garage node** into a globally redundant node mesh, with:

* Firebase as the lightweight Web2 window
* Decentralized compute (edge nodes) for uptime + geographic redundancy
* Permanent, distributed ledger availability (IPFS/Arweave + peer replication)
* Deterministic validation and anti-gameability via 0Force + Protocol0

---

## Consensus and Validation Stack

### 0Force Consensus Collapse

**0Force** is the deterministic consensus-collapse layer for Zeroth systems:

* Validator outputs exist in a bounded ternary space: `{ -1, 0, +1 }`
* Validator set **must be odd** (minimum `N=3`)
* Validators are **isolated**: they cannot see or query `T_current` and cannot predict collapse with certainty
* Collapse rules:

  1. **Majority collapse**: if any value appears > ⌊N/2⌋, that value is consensus
  2. **Full divergence collapse** (“0Force proper”): if outputs contain `{ -1, 0, +1 }` (for `N=3`), then consensus becomes:

     * `Consensus = T_current`
     * where `T_current` is computed **after submission** via deterministic replay of history under the ruleset

Reinforcement semantics:

* Majority case: majority validators receive reinforcement (lineage strength / halflife extension); minority decays normally
* Full divergence: only the validator matching `T_current` is reinforced; others simply decay (not punished)

What this means operationally: **0Force selects truth; it does not negotiate truth.**

---

### Protocol0 Plausibility Validation

**Protocol0** is a validator (not a miner) that answers:

> “Is this transaction / collapse / authorization causally and mathematically allowed right now?”

It enforces:

* Convergence delta thresholds (e.g., mint eligibility gating)
* Reinforcement thresholds (base-3 tiers)
* Halflife decay consistency
* Price bounds and price-in-hash correctness
* Lineage viability (e.g., parents not converged)
* Signature verification and canonical event bytes
* Ledger integrity checks (including negative space integrity)

---

### How 0Force and Protocol0 Compose

A clean separation:

* **0Force** resolves *which* value collapses when validators disagree inside `{ -1, 0, +1 }`
* **Protocol0** verifies that:

  * the validator outputs are admissible,
  * the collapse is consistent with history and ruleset,
  * the resulting ledger mutation and any mint/burn authorization is valid and non-replayable.

Practical rule of thumb:

* **0Force produces “truth selection”**
* **Protocol0 produces “truth admissibility”**
* **ZerothVM produces “truth computation + state mutation”**

---

## Hybrid Architecture and Components

### Front-End Window (Firebase Hosting)

Firebase Hosting serves:

* Static UI (dashboard, chain explorer, block views, wallets)
* Optional auth layer for UI conveniences (not chain authority)
* A “router” to pick the best Zeroth node endpoint (geo/health)

Firebase does **not** need to host ZerothVM execution.

---

### ZerothVM Nodes

Two categories:

1. **Anchor Full Node (Garage)**

   * Full ledger
   * High-availability public endpoint (initially)
   * Seed for bootstrap and indexing
   * Can be one of the authorized authorizers for settlement, but should not remain a single point of failure

2. **Edge Full Nodes (Crypto-Fabric / Etherhive)**

   * Run the same ZerothVM deterministically
   * Maintain full ledger replicas or validated snapshots + recent replay
   * Provide geographic redundancy + user-facing API capacity
   * Participate in validator sets and serve reads

Node mesh responsibilities:

* P2P ledger replication
* Event ingestion (Ethereum WTHTH + native Zeroth observation domain)
* Deterministic block creation and state stepping
* Publishing blocks/slices to decentralized storage

---

### Validator Layer: 0Force Sets + Protocol0 Validators

Model this as two coupled services:

* **0Force Validator Sets**

  * Odd cardinality groups (e.g., 3, 5, 7…)
  * Each validator submits only `{ -1, 0, +1 }`
  * Collapse happens deterministically:

    * majority → that value
    * full divergence → `T_current` computed from history after submissions

* **Protocol0 Validators**

  * Validate:

    * admissibility of each validator output
    * correctness of `T_current` computation inputs (history/ruleset)
    * plausibility of state mutation and authorizations

Operationally, Zeroth can run both roles on the same machines but **as separate processes** (fault containment).

---

### Ethereum Settlement Layer (WTHTH)

Ethereum remains:

* Settlement-only for mint/burn of wrapped tokens
* Event feed that ZerothVM observes (WTHTH transfers, swaps, contract calls)
* Replay-protection enforcement for authorizations (single-use)

Critical deployment implication:

* The Zeroth system’s *truth* is not on Ethereum.
* Ethereum is the **accounting membrane**, not the economic brain.

---

## Distributed Ledger Storage Strategy

Use **three layers** simultaneously:

1. **Local Full Ledger on Every Full Node**

   * Fast reads
   * Deterministic replay
   * Integrity checks

2. **P2P Replication**

   * Gossip/pubsub for new blocks and state deltas
   * Peer reconciliation for drift recovery

3. **Decentralized Storage**

   * **IPFS**: publish each block / ledger slice as content-addressed objects
   * **Arweave**: publish periodic checkpoints (e.g., every K iterations or every settlement event) for permanent archival

Best practice:

* Pin the latest K checkpoints across multiple independent pinning operators (Zeroth + trusted peers).

---

## Bootstrapping Trust for New Nodes

A new node must join without trusting any single server:

1. Configure:

   * genesis id / chain id
   * ruleset version hash
   * current authorized public keys / governance source (The Zeroth initial root-of-trust)

2. Fetch:

   * latest checkpoint from Arweave (or multiple) + verify hashes
   * missing slices from IPFS by CID
   * peer corroboration (multiple peers) for recent head

3. Validate:

   * Protocol0 full-chain validation (or from checkpoint forward)
   * 0Force behavior matches expected collapse outcomes (test vectors)

4. Activate:

   * subscribe to event feeds
   * enter validator rotation / assignment schedule

---

## Convergence and Block State Propagation

Core dynamics:

* Value decays by halflife; convergence to zero triggers burn authorization.
* Reinforcement extends life and strengthens lineage.

Propagation channels:

* P2P broadcast of new blocks / convergence transitions
* Ethereum events confirming settlement outcomes (mint/burn)
* Decentralized storage provides backfill source-of-truth for offline nodes

When validators disagree about an intermediate truth state:

* 0Force collapses to a determinate value
* Protocol0 validates that collapse is admissible
* ZerothVM commits the ledger mutation

---

## CI/CD Integration

### Frontend (Firebase)

* Build + deploy on main branch
* Versioned configs for:

  * node endpoint list
  * chain id
  * contract addresses

### Node + Validator Stack

* Build immutable images (container) for:

  * ZerothVM
  * Protocol0
  * 0Force validator service
* Publish artifacts (registry)
* Automated rollout for:

  * The Zeroth managed seed nodes
  * The Zeroth edge fleet (Etherhive/Crypto-Fabric-controlled nodes)

Decentralized reality:

* Community nodes will upgrade on their own cadence.
* Enforce compatibility via protocol version negotiation.

---

## Cost and Capacity Analysis

Relative costs:

* **On-chain execution of Zeroth logic**: not viable (gas, throughput)
* **Cloud VMs**: predictable but centralized and recurring
* **Edge compute + community nodes**: most scalable and most aligned with decentralization

Most important scaling constraint is not CPU — it’s:

* node ops maturity (monitoring, auto-repair)
* key custody
* protocol upgrade discipline

---

## Risks and Security Considerations

Key risks:

* **Key compromise** (authorizations): mitigate with HSM/secure enclave + multi-signer threshold over time
* **Validator manipulation**: 0Force isolation requirement reduces coordination attacks
* **Data availability**: mitigate via IPFS replication + Arweave checkpoints + multiple peers
* **State drift**: mitigate via Protocol0 validation + periodic checkpoint hashes
* **Replay/duplicate settlement txs**: mitigate via on-chain single-use authorization tracking

---

## Recommended First 7 Deployment Steps

1. Define the **node API contract** (read endpoints + health + chain head + proof bundle export)
2. Package ZerothVM + Protocol0 + 0Force validator into **container images**
3. Stand up **3 seed nodes** (garage + 2 edge regions) as full nodes
4. Implement **P2P block gossip + snapshot sync** (checkpoint → replay)
5. Add **IPFS publish + pin** of blocks and ledger slices
6. Add **Arweave checkpointing** on a fixed schedule or on settlement events
7. Integrate the Firebase UI with:

   * endpoint discovery (health + geo)
   * chain explorer views (blocks, DNA hashes, convergence status)
   * wallet settlement calls (WTHTH) + event monitoring

---

## Conclusion

With 0Force integrated, Zeroth’s distributed truth stack becomes:

* **ZerothVM** computes truth + state transitions
* **0Force** deterministically collapses validator uncertainty into truth under divergence
* **Protocol0** enforces plausibility and prevents invalid ledger mutations
* **Ethereum (WTHTH)** settles value transitions without hosting Zeroth’s economics
* **IPFS/Arweave + P2P** make the ledger permanent and globally redundant

## GOAL:
**truth is bounded, deterministic, and selected by history — not negotiated.**
