# ZerothVM
> The ZerothVM is the core runtime of the Zeroth system. It is responsible for executing the Zeroth language and protocol. It is the engine that drives the Zeroth system. This is the final phase of the Zeroth system development.

## Overview

**Phase 16** is the final phase focused on taking the Zeroth system from a functional prototype to a **production-ready, decentralized network**. In this phase, all components of Zeroth (the ZerothVM, 0Force consensus collapse, and Protocol0 validation) will be integrated and deployed across multiple nodes with real-world infrastructure. The goal is to achieve a robust, secure, and scalable deployment where the Zeroth network can run reliably with **no single point of failure**, full **ledger permanence**, and seamless **Ethereum integration** for value settlement.

## Objectives

- **Decentralized Deployment:** Distribute Zeroth beyond the single "garage node" to a network of geographically redundant full nodes.
- **Consensus & Validation Integration:** Fully integrate the 0Force consensus-collapse mechanism and Protocol0 plausibility validation into the live system, ensuring deterministic truth selection and ledger integrity.
- **Permanent Ledger Storage:** Implement distributed ledger storage (e.g. IPFS and Arweave) so that all block data and state snapshots are redundantly preserved and available.
- **Frontend Integration:** Connect the Zeroth network to the front-end interface (Firebase web UI), enabling users to observe the live system, explore blocks, and initiate transactions (observations, reinforcements) through a web interface.
- **Ethereum Bridge Activation:** Deploy and integrate the Ethereum WTHTH contract for wrapping Zeroth value, and ensure that mint/burn authorizations from Zeroth are honored on Ethereum (and vice versa) securely.
- **Operational Readiness:** Establish continuous integration and delivery (CI/CD) pipelines for Zeroth components, and prepare monitoring and security measures (key management, validator isolation, etc.) to run the network continuously.

## Key Deployment Steps

The following steps detail the work needed in Phase 16 to achieve the above objectives:

1. **Define the Node API Contract:** Specify a clear API interface for Zeroth nodes. This includes defining all necessary endpoints for:
   - Reading chain data (e.g. get current chain head, fetch block or transaction details).
   - Health checks (node heartbeat, status).
   - Exporting proofs or state snapshots (e.g. a **proof bundle** that a new node can use to catch up).
   - Any administrative or synchronization calls needed between nodes.
   
   Defining a robust **Node API** ensures that front-end services and other nodes can interact with the Zeroth nodes in a consistent manner. It will include endpoints for retrieving the latest block, checking convergence status, obtaining cryptographic proof bundles for ledger state, etc.

2. **Containerize Zeroth Components:** Package the core Zeroth software into immutable container images for easy deployment and scaling. This means creating Docker (or similar) images for:
   - **ZerothVM** (the main runtime executing chain logic),
   - **Protocol0** (the plausibility validator service),
   - **0Force** (the consensus collapse service for validator sets).
   
   Each image should bundle the software, configurations, and dependencies required to run that component. Once built, these images will be published to a registry. Containerization ensures that all nodes run the exact same software environment, aiding determinism. This step ties into CI/CD pipelines: on each new release, images are automatically built and pushed, and can be pulled by nodes for update. The container approach will facilitate deploying Zeroth nodes on cloud VMs, community machines, or edge devices as needed.

3. **Deploy Seed Nodes (Initial Network Setup):** Stand up at least **three full nodes** running ZerothVM (with integrated 0Force and Protocol0). These will serve as the seed of the decentralized network:
   - One **anchor node** (the original "garage" node) which holds the full ledger and will initially act as a reference point.
   - Two additional **edge full nodes** in different geographic regions or cloud providers. These nodes also maintain the full ledger (or use a snapshot + replay mechanism) and will participate equally in block production and validation.
   
   All seed nodes should be configured to connect to each other (using the Node API and P2P protocols defined in the next step). This ensures redundancy: even if the original node goes down, the other nodes keep the network alive. The validator set for 0Force consensus should be distributed across these nodes (and potentially additional validator-only nodes if needed) with an **odd number** of total validators (e.g. 3 or 5) to satisfy 0Force requirements. As part of this step, configure secure key management for authorizer keys (consider hardware security modules or multi-sig for the keys that sign mint/burn authorizations) to mitigate risk of key compromise.

4. **Implement P2P Gossip and Sync:** Develop the peer-to-peer communication layer that allows all Zeroth nodes to stay in sync. This includes:
   - **Block Gossip:** When a node produces a new block (or observes a new valid block), it should broadcast that block to its peers. Use a gossip protocol so blocks propagate quickly and efficiently to all nodes.
   - **Snapshot Sync / Checkpoint Replay:** New nodes joining the network or nodes that have been offline need a way to catch up. Implement a mechanism where a node can request recent blocks or a state **snapshot** from peers. For example, periodically designate certain blocks as checkpoints and generate a state snapshot or summary at those points. A joining node can download the latest checkpoint (and an accompanying proof of state integrity) and then replay blocks since that checkpoint to catch up to the tip.
   - Ensure that the P2P layer handles network partitions gracefully and that there’s eventual convergence (all honest nodes end up with the same ledger given time). The **0Force consensus collapse** rules will operate on each node’s validator component to ensure any divergence in validator outputs resolves deterministically, but the P2P layer must propagate those results network-wide.
   - Include basic peer discovery so that nodes can find each other (the three seed nodes can be initial peers configured manually; beyond that, nodes can share lists of active peers).

5. **Integrate Distributed Storage (IPFS & Pinning):** Set up **IPFS** integration for block and ledger data. Each Zeroth block (or a batch of blocks, or periodic snapshot files) will be:
   - Published to the IPFS network, yielding a content-addressed hash.
   - Pinned by multiple nodes (each Zeroth node can run an IPFS daemon or use an IPFS API to pin content) to ensure the data remains available.
   
   This provides a decentralized, permanent storage layer for the ledger. Even if all Zeroth nodes went down, the block data would still be retrievable from IPFS as long as it’s pinned by some peers or stored on backing storage like Filecoin/Arweave. In this step, implement the logic in Zeroth nodes to automatically publish each new block (or periodic state) to IPFS and store the IPFS content hash. This hash could be logged or even inserted into the blockchain state for reference. Make sure to manage pinning (ensuring at least the seed nodes pin the content). 

6. **Enable Arweave Checkpointing:** In addition to IPFS, use **Arweave** (a permanent storage blockchain) for periodic checkpointing of the Zeroth ledger state:
   - Determine a schedule or event trigger for checkpoints. For example, **every N blocks** or whenever a convergence to zero occurs (which might correspond to significant economic events), or whenever a wrap/settlement happens on Ethereum (WTHTH).
   - When a checkpoint is due, take a snapshot of the ledger state or a cryptographic summary (like the hash of the latest block or state root) and submit it as a transaction to Arweave (which costs a one-time fee per data upload but stores permanently).
   - This provides an immutable, timestamped record on an external durable chain that can be used to later verify Zeroth’s state history (even if all Zeroth-specific nodes/data were lost).
   - Implement the tooling or service that does this submission automatically. Possibly integrate this with the CI/CD or a separate daemon. Ensure the Arweave transaction IDs or proofs are recorded for future auditing.

7. **Frontend (Firebase UI) Integration:** Finally, connect the **Zeroth web interface** to the live network:
   - **Endpoint Discovery:** The frontend should be aware of multiple node endpoints and choose one (or load-balance between them) based on health and proximity. Implement a small service or config that the Firebase-hosted frontend can query to get the list of current Zeroth node URLs and their status. This could be a simple JSON config that is updated as nodes are added/removed.
   - **Chain Explorer Views:** Update the UI to display blocks, DNA hashes, convergence status, etc., by pulling data from the node API. For instance, show the latest blocks, allow users to search for a hash and see its details (lineage, price, etc.), show the current convergence percentage or state of ongoing blocks.
   - **User Wallet and Settlement:** Integrate wallet functionality for WTHTH (the Ethereum wrapper token). This involves:
     - Allowing users to connect an Ethereum wallet (e.g. MetaMask) via the frontend.
     - Triggering **mint** or **burn** actions: e.g., when the Zeroth system produces a valid authorization for minting WTHTH, the user or system can call the WTHTH smart contract to mint the corresponding tokens. Similarly, burning WTHTH should trigger an authorization that Zeroth recognizes to adjust internal supply.
     - Displaying events: The UI should listen for events such as new blocks, convergence events, or Ethereum transactions (mints/burns) and update accordingly (for example, show a notification when a mint authorization is accepted and tokens are minted on Ethereum).
   - **Interaction Controls:** Ensure the interactive parts of the system (Observe, Transact, Reinforce, Decay controls as previously designed) are wired up to actual Zeroth node actions. For example, clicking "Transact" might call a Zeroth node API to submit a new observation/transaction to the network, which then propagates and appears as a new hash or block in the visualization.
   - The frontend should remain **lightweight** and not hold any private keys or do heavy processing; it simply visualizes the state and provides controls, while the heavy logic runs on the Zeroth nodes.

8. **Testing, Monitoring, and Security Hardening:** As a concluding step in Phase 16, conduct thorough testing and set up operational monitoring:
   - **Integration Testing:** Perform end-to-end tests on a staging network to ensure all pieces work together (e.g. spin up a small network with the new containers, run through scenarios of transactions, convergence, minting/burning, node drop-out and recovery, etc., to verify stability).
   - **Security Audit:** Review the security of the system components: audit smart contracts (WTHTH), ensure the 0Force and Protocol0 logic is robust against attacks, verify that keys (for signing authorizations) are securely managed, and that the Node API is not exposing any vulnerabilities. Harden any aspect that could be abused (like rate-limit the Node API if needed, ensure validators cannot be tampered with or if one is compromised it cannot subvert consensus due to 0Force design).
   - **Monitoring & Alerts:** Set up monitoring for node performance and health (CPU, memory, but also application-level metrics like block production rate, convergence times, etc.). Use dashboards and alerts so that if a node goes down or consensus fails to form, the devops team is notified. This includes monitoring the IPFS and Arweave integrations (e.g. alert if publishing fails).
   - **Protocol Upgrade Process:** Establish how the system will handle future upgrades once in production (this might be beyond the immediate scope of Phase 16, but a plan should be in place given that containers and protocol versions are used – e.g., version negotiation among nodes to allow seamless upgrades).
   
By completing all the above steps, Zeroth will transition into a live, production-ready state in which it operates as a **living cryptographic economy** on a distributed network. Phase 16 ensures that the system’s theoretical foundations (intrinsic value, convergent truth, etc.) are backed by solid engineering: a network that is robust, transparent, and maintainable moving forward.

## Outcome

Successful execution of Phase 16 will result in:
- A **fully operational Zeroth network** running on multiple nodes across different locations.
- A **trust-minimized bridge** to Ethereum (WTHTH) such that Zeroth value can flow into the Ethereum ecosystem securely.
- A **user-facing portal** (web UI) where the dynamics of Zeroth can be observed in real-time and where users can interact (submit observations, reinforce blocks, etc.).
- The **ledger stored permanently** and redundantly (on Zeroth nodes, IPFS, and Arweave), protecting against data loss.
- Confidence in the system’s security and performance thanks to testing and monitoring, paving the way for public release and community participation.

This marks the completion of Zeroth’s development journey and the beginning of its life as a self-sustaining, living blockchain economy in the wild.

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

ZerothVM is a blockchain runtime where intrinsic value is encoded in DNA hashes, and supply is “living” — it **mints on meaningful progress and burns on convergence to zero**. The system architecture is intentionally split into distinct layers/components:

- **ZerothVM** – Executes the core logic of the chain (computes truth and performs state transitions). It’s the deterministic virtual machine that applies transactions/observations and evolves the system state.
- **0Force** – Provides deterministic *consensus collapse*. It takes the outputs of validator nodes (which can only be -1, 0, or +1 indicating their view of state) and collapses any divergence among them into a single agreed truth in specific scenarios (particularly when there’s a full three-way split).
- **Protocol0** – Acts as a plausibility validator for the ledger state. It does not create blocks or choose truth; instead, it checks that any proposed state (transactions, collapses, authorizations) is **mathematically and causally allowed** given the rules (enforcing things like decay rules, convergence thresholds, lineage validity, etc.).
- **Ethereum (WTHTH)** – Serves as an external settlement layer. Ethereum (specifically a Wrapped THTH contract on Ethereum) is used purely for value settlement. It wraps Zeroth’s native value so that tokens can move in the Ethereum ecosystem, but Ethereum is **not used for Zeroth’s consensus or state progression** — it only mints/burns tokens when presented with valid authorizations from Zeroth.

**Primary objective:** Distribute ZerothVM beyond the single “garage node” into a **globally redundant node mesh** with the following in mind:
- Use Firebase as a lightweight Web2 front-end (a window into the system, not part of consensus).
- Use decentralized compute (community/edge nodes, potentially an "Etherhive" or crypto-fabric of nodes) to achieve uptime and geographic redundancy.
- Ensure permanent, distributed availability of the ledger via IPFS/Arweave and peer-to-peer replication of data.
- Achieve deterministic validation and resistance to manipulation through the combination of 0Force (for consensus) and Protocol0 (for validation).

By separating concerns — ZerothVM for execution, 0Force for consensus determination, Protocol0 for validation, and Ethereum for external settlement — the architecture aims to be robust, scalable, and secure.

---

## Consensus and Validation Stack

### 0Force Consensus Collapse

**0Force** is the deterministic consensus-collapse layer for Zeroth. Rather than a traditional consensus (where nodes come to agreement through longest-chain, voting, or staking mechanisms), 0Force *collapses* the outputs of a set of validators in a predefined way:
- Validator outputs exist in a bounded ternary space: `{ -1, 0, +1 }`. Each validator, observing the system state, submits one of these three values for a given block or event:
  - `+1` might indicate an **affirmative/directional truth** (e.g., a vote for a proposed new state),
  - `0` indicates **converged truth or equilibrium** (e.g., no change needed, or agreement on a state),
  - `-1` indicates **potential/insufficient convergence/negative space** (e.g., disagreement or an alternative direction).
- The validator set must have an **odd number of members** (minimum `N=3`) to avoid ties and enable a majority decision when one exists.
- Validators are **isolated** – they cannot see or communicate with each other’s outputs during the voting period and, crucially, they cannot know the current global truth (`T_current`) that would result from a divergence. This prevents any strategy to game the collapse outcome.
- **Collapse rules:**
  1. **Majority collapse:** If any value appears more than ⌊N/2⌋ times among the validator outputs, that value is immediately chosen as consensus. This is a straightforward majority vote decision.
     - *Examples:* In a 3-validator set, outputs `{0, 0, +1}` would collapse to `0` (two out of three chose 0). Outputs `{-1, +1, +1}` would collapse to `+1` (two out of three chose +1), and `{-1, -1, 0}` would collapse to `-1`.
  2. **Full divergence collapse (the 0Force case):** If the outputs are completely split (for N=3, one `-1`, one `0`, one `+1`), then no majority exists and the outputs span the entire space. In this case, **Consensus = T_current**, where `T_current` is determined by a deterministic replay of history under Zeroth’s ruleset after all submissions. Essentially, the system defers to the internally computed state as the deciding factor.
     - This rule ensures that when validators are maximally divergent, the truth is not *voted on* at all but instead *derived from the system’s own logic/history*, preventing an impasse.
- **Reinforcement semantics:** The outcome of the collapse also feeds back into validators’ weights or credibility:
  - In a majority collapse scenario, validators in the majority are **reinforced** (this could mean their lineage or reputation weight is increased or their effective half-life extended), whereas the minority validators’ influence decays as normal.
  - In a full divergence scenario (the second rule), only the validator whose output matched the ultimately chosen `T_current` gets reinforced (since that validator effectively aligned with the derived truth), and the others simply continue with normal decay (they are not explicitly punished beyond not being reinforced).
- **Key point:** 0Force **selects truth; it does not negotiate truth.** There is no iterative back-and-forth or fork-choice rules – given a set of validator opinions, it collapses them deterministically following the above rules. This preserves objectivity and consistency in how “what is true right now” is decided.

### Protocol0 Plausibility Validation

**Protocol0** is the validation layer that checks whether a proposed ledger update is *plausible* and valid under the system’s rules **before** it is accepted as truth. It operates alongside 0Force and ZerothVM to ensure that no invalid state transitions occur. In simpler terms, where 0Force and ZerothVM might propose a new state, Protocol0 asks: *“Is this state causally and mathematically allowed?”* Only if the answer is yes will the state be finalized.
  
Protocol0 enforces a number of invariants and rules:
- **Convergence delta thresholds:** e.g., If a block is proposing to mint new value, the convergence (decay) delta since the last mint must meet a minimum threshold (meaning sufficient progress or time has passed to justify minting). This prevents rapid repeated minting without real progress (part of Zeroth’s intrinsic value logic).
- **Reinforcement thresholds:** Ensures that any reinforcement of a block (increasing its weight or extending its half-life) is only done when certain criteria are met (for example, requiring that a support count or some metric meets a tier like `S ≥ 3^k` for some tier k).
- **Halflife decay consistency:** Checks that weights and prices decay according to the halflife formulas. It will reject any state where a weight or price hasn’t decayed as expected or has increased outside of a valid reinforcement event.
- **Price bounds and correctness:** Ensures that any price recorded in a DNA hash is within allowed bounds (e.g., 1 to 65,535 as per Zeroth’s 16-bit price encoding) and that the price encoded in any new DNA hash matches the actual last trade price in the record.
- **Lineage viability:** Validates that parent hashes referenced by a new record have not converged to zero (i.e., you cannot build on a block that has fully decayed/converged out of existence). It ensures every new block or observation has “living” ancestors where required.
- **Signature and authorization validity:** For any economic event that requires authorization (like minting or burning via Ethereum), Protocol0 verifies the cryptographic signatures and one-time-use nature of those authorizations. It also checks that the event is not a replay of an already used authorization (to prevent double-spending or duplicate mint events).
- **Ledger integrity checks:** This includes verifying there are no hash collisions in the ledger, that negative space (unused portions of the hash space) remains consistent, and any other invariants of the ledger format.

In summary, **Protocol0 does not choose or create the true state** – that’s ZerothVM’s job (with 0Force ensuring a single truth in case of divergence) – but Protocol0 acts as the gatekeeper to prevent *impossible or invalid truths* from ever being considered. If ZerothVM outputs a state that violates a rule, or if validators submit something off-spec, Protocol0 will flag it and the system can reject the block or transaction.

### How 0Force and Protocol0 Compose

Zeroth’s design cleanly separates *how truth is selected* from *how truth is verified*:
- **0Force** determines *which* outcome becomes truth when validators disagree, without regard to whether that outcome is “good” or “bad” – it’s about reaching a single answer (deterministically).
- **Protocol0** determines whether that outcome is *allowed* under the rules. It ensures the outcome (and the process to get there) obeyed all the system’s constraints.

In practice:
- The ZerothVM produces candidate blocks (applying transactions/observations).
- Validators (running ZerothVM in parallel perhaps) each indicate via 0Force’s scheme what they think (–1, 0, +1).
- 0Force collapses their opinions into a single result `R`.
- **Before finalizing R**, Protocol0 runs a thorough validation:
  - Did all validators’ outputs adhere to rules (no invalid states proposed)?
  - Is the collapse outcome consistent with history and rules (for example, if a full divergence collapse happened, was `T_current` correctly computed from the prior state)?
  - Is any resulting token mint or burn authorization valid and non-replayable?
  - Essentially, “plausibility” and internal consistency checks.

Only if Protocol0 gives the green light (all checks pass) is the block `R` finalized and accepted into the ledger (and if needed, an authorization for mint/burn is issued to Ethereum).

**Rule of thumb:**
- 0Force = “truth selection” (mechanism to pick truth among conflicting proposals).
- Protocol0 = “truth admissibility” (policy to ensure the truth adheres to system laws).
- ZerothVM = “truth computation and state mutation” (executes logic to create new state).

This layered approach means the system is resilient:
- You can’t get stuck in consensus deadlock (0Force ensures a decision).
- But you also can’t finalize a nonsensical or malicious decision (Protocol0 ensures legitimacy).
- And the heavy lifting of state changes is done by ZerothVM deterministically, so all honest nodes compute the same `T_current` given the same inputs.

---

## Hybrid Architecture and Components

### Front-End Window (Firebase Hosting)

The front-end for Zeroth is a web application (dashboard, explorer, wallet interface, etc.) hosted on **Firebase Hosting**. It serves as a **window** into the Zeroth system, but not as an active participant in consensus or validation.

Key points about the front-end:
- It delivers the static assets (HTML/CSS/JS) for the user interface, which includes visualizations of the Zeroth network (possibly using Three.js for a living system visual as per design specs), wallet integration prompts, and data displays.
- It can include an optional authentication layer (via Firebase Auth) for user convenience features (like remembering user settings or enabling certain user-specific views), **but this auth is not related to chain authority**. In Zeroth, identity is cryptographic (based on lineage/hashes), not tied to user accounts. Any login on the front-end would only be for UI personalization or linking a user’s Ethereum wallet, etc., not for controlling Zeroth protocol actions.
- The front-end communicates with ZerothVM nodes via API calls. It might have a list of known node endpoints and will choose one (perhaps the closest or healthiest) to query for data or send transactions.
- Importantly, **Firebase** does **not** host or execute the ZerothVM itself. It’s purely a static front-end host + maybe some simple serverless functions for ancillary tasks. All blockchain logic runs on the distributed Zeroth nodes.

This separation ensures that even if the front-end is offline, the Zeroth network continues unaffected (one could interact with it via direct API calls or a different interface).

### ZerothVM Nodes

In the production architecture, Zeroth will run on multiple nodes. There are a couple of categories of nodes:

1. **Anchor Full Node (Garage Node):** This is the original, full ledger node that was running in development (in the proverbial “garage”). In the decentralized network:
   - It continues to maintain the **entire ledger** (from genesis to latest block).
   - It is initially a high-availability public endpoint (so that others can easily connect to the network and bootstrap). Over time its role should diminish to avoid centralization (it should become one node among many).
   - It can be one of the authorized entities to sign off on Ethereum settlement transactions (mint/burn authorizations), but it **must not remain a single point of failure** for those. Eventually, other nodes or a multi-sig of nodes should also handle authorizations.

2. **Edge Full Nodes (Community/Partner Nodes, e.g. Crypto-Fabric or Etherhive nodes):** 
   - These run the exact same ZerothVM software, validating all transactions and maintaining either the full ledger or at least a recent portion plus the ability to reconstruct via checkpoints.
   - They provide **geographic and infrastructural redundancy**. For example, nodes could be run in North America, Europe, Asia, etc., on different providers or by different organizations, to ensure the network has no single point of failure or single jurisdiction control.
   - They **participate in the 0Force validator sets** and serve API requests to clients. They also help propagate blocks (p2p gossip) and can serve as entry points for new nodes to sync from.
   - Some edge nodes might choose to store only a **pruned ledger** (e.g., keep the last X blocks and compressed history) to save space, but as long as there is a way to get old data from somewhere (IPFS/Arweave or an anchor node), that can work. Ideally at least a few nodes always keep full history.

All ZerothVM nodes collectively form a mesh:
- They share new events (blocks, observations) with each other.
- They perform deterministic block creation and state transitions (each node can independently compute the next state, given transactions).
- They replicate the ledger among themselves (through the gossip and sync protocols).
- They publish data to decentralized storage for permanence (so that even if a node is down, the data isn't lost).

### Validator Layer: 0Force Sets + Protocol0 Validators

Within the network, there is a conceptual **validator layer** composed of two coupled services:
- **0Force Validator Sets:** Groups of validators (processes or nodes) that run the 0Force algorithm:
  - Each set has an odd number of members (3, 5, 7, etc.).
  - They each independently run ZerothVM on proposed inputs and output either -1, 0, or +1.
  - They do not communicate with each other during a validation round beyond submitting their output.
  - They rely on the 0Force collapse rules (as described earlier) to yield a result. This could be done either inside each node (where a node simulates multiple validator perspectives), or more likely each Zeroth node may host one validator and then a coordinating service performs the collapse. In a decentralized scenario, validators could themselves be distributed (which would require networking the 0Force logic, which complicates isolation; more likely the initial approach is that validators are co-located processes with the node).
  
- **Protocol0 Validators:** This is essentially the implementation of the Protocol0 rules:
  - They run alongside block production to check every proposed block or state transition for compliance.
  - They can be thought of as a **validation function** that each node can run locally on a candidate block. Alternatively, a separate set of nodes could run Protocol0 as a service and sign off on validity (similar to how in some networks a subset validates transactions), but since Protocol0’s checks are deterministic and not heavy, it might just run within each ZerothVM node’s process as a final gate before accepting a block.
  - Key checks include those listed earlier (convergence delta, halflife, lineage, etc.). If any check fails on a proposed block, that block is rejected and not gossiped further.

**How these interact:** In producing a new block, a ZerothVM node will:
- Apply transactions and compute the new state tentatively.
- Run Protocol0 checks on that new state. If it fails, abort the block.
- If it passes, then propose the block and gather validator outputs (if using an internal validator set) or send to external validators.
- Use 0Force to decide on the single outcome (which could be “accept block”, “reject block”, or some variation if -1 means reject, 0 means stall, +1 accept, for example).
- If the block is accepted via 0Force, finalize it and broadcast it; if not, handle according to result (e.g., in a -1 case, maybe rework or wait).

### Ethereum Settlement Layer (WTHTH)

In the Zeroth architecture, Ethereum plays a narrow but crucial role:
- Ethereum hosts the **WTHTH contract**, a wrapped token that represents Zeroth value in the Ethereum ecosystem. This contract likely allows minting and burning of WTHTH tokens when presented with proper authorization signatures from Zeroth.
- **Minting:** When Zeroth determines that new value should be minted (intrinsically, due to convergence thresholds being met, etc.), it will produce an **authorization** (signed by designated key(s) within Zeroth’s governance) that can be submitted to the WTHTH contract on Ethereum to mint the corresponding amount of WTHTH to a specified address. This effectively transfers the intrinsic Zeroth value into a tradable ERC-20 token.
- **Burning:** Conversely, when WTHTH is sent back to the contract for redemption, the contract will burn those tokens and issue an authorization that Zeroth recognizes to internally mark those tokens as converged/burned in its own ledger (thus preventing re-use). Essentially, burning WTHTH in Ethereum should trigger a corresponding removal of value in Zeroth’s ledger, maintaining parity.
- Ethereum is **settlement-only**: It does not inform Zeroth’s truth beyond providing a way to cash in/out Zeroth value. Ethereum doesn’t run Zeroth logic; it just enforces the simple rules of the WTHTH token.
- **Why use Ethereum at all?** Because Zeroth’s on-chain value is intrinsic and perhaps not directly ERC-20 compatible, Ethereum provides a bridge to the wider crypto world (exchanges, wallets, DeFi) by wrapping Zeroth value in a familiar token format. However, the architecture is careful to not rely on Ethereum for anything except this wrapping:
  - Zeroth does not use Ethereum for consensus (no Ethereum oracle or finality needed for Zeroth’s state).
  - If Ethereum is down or congested, Zeroth still runs; it just means wrapping/unwrapping might be delayed.

Architecturally:
- Zeroth nodes or a specific **bridge service** will listen for events from the WTHTH contract (like a Burn event indicating someone wants to redeem tokens) and feed that into Zeroth as an observation (which Protocol0 will validate as a legitimate burn authorization).
- Likewise, Zeroth’s output of a mint authorization is communicated (perhaps via the front-end or an automated script) to Ethereum.
- This is somewhat off-chain from Zeroth’s perspective but is integral to the overall system’s utility.

By design, Ethereum’s role is minimized to avoid it being a bottleneck. It’s essentially a stateless token wrapper governed by Zeroth’s state.

---

## Distributed Ledger Storage Strategy

To achieve persistence and resilience, the Zeroth architecture uses a combination of **peer-to-peer replication** and decentralized storage networks:
- **P2P Replication:** As described, every Zeroth node actively shares blocks and state with its peers. This means that even if a node goes offline, others have copies of all data (assuming sufficient overlap in connectivity). The network is intended to function similarly to other blockchains in this regard: every full node is a full copy of the ledger.
- **IPFS for Blocks:** Each block (or perhaps each group of blocks or checkpoint) is also stored in the InterPlanetary File System (IPFS). IPFS provides content-addressable storage; the hash of the content acts as an address. Storing blocks on IPFS and having nodes pin them means that the data is not only in the context of Zeroth’s own network but also retrievable through the IPFS network. This guards against the scenario of *all* Zeroth nodes going down or losing data — as long as the IPFS network has the content, it can be recovered. It also allows lightweight clients to fetch specific blocks or states by IPFS hash without querying a Zeroth node directly.
- **Arweave for Checkpoints:** To complement IPFS (which is great for distribution but does not guarantee permanent storage unless pinned), Zeroth will use Arweave to store periodic snapshots or key ledger checkpoints for permanence. Arweave is a permaweb/blockchain designed for permanent data storage. By writing, say, a state hash or compressed ledger segment to Arweave every so often, we create an immutable, permanent ledger of Zeroth’s history that is extremely difficult to lose. This can be thought of as an out-of-band backup that’s publicly verifiable.
- **Data Format:** Likely, the ledger data stored to IPFS/Arweave might include:
  - Block data (transactions, DNA hashes, signatures, etc.).
  - A rolling state root or accumulator that can be used to verify authenticity.
  - Possibly the outputs of Protocol0 for each block (to prove validity).
  - Any mint/burn authorizations that were issued (so that an archive exists of all such events).
- **Retrieval and Use:** If a new node wants to join and there are few peers, it could retrieve the entire history from IPFS/Arweave. Or it could retrieve the latest checkpoint from Arweave and then the recent blocks from IPFS to get up to sync. This bootstrap mechanism means the network can always be rebuilt from the permanent record even if active nodes are lost.

The combination of these strategies ensures **ledger availability**:
Even in worst-case scenarios, the data that represents the "truth" of Zeroth cannot be easily destroyed or censored.

---

## Bootstrapping Trust for New Nodes

When a new node comes online (for instance, a community member wants to run a node), it faces the challenge of **trust bootstrap** – i.e., how does it know what is the current true state of Zeroth without trusting a single node blindly?
Zeroth’s architecture addresses this in several ways:
- **Genesis and Hash Chain:** Like any blockchain, if a new node knows the genesis block and the rules, it can verify everything given enough data. We ensure that every block is cryptographically linked (via hashes) so there’s a single verifiable chain of history. A new node can obtain the latest block hash (perhaps from several sources for comparison) and then fetch backwards or fetch a snapshot.
- **Checkpoint Signatures:** We can use signed checkpoints by well-known nodes. For example, the anchor node or a quorum of existing reputable nodes might periodically sign the hash of the latest state. A new node can use these signatures to know “at block X, the state hash was Y as attested by nodes A, B, C.” This still involves some trust in those nodes, but if multiple independent nodes agree, it’s a reasonable shortcut.
- **Arweave/Blockchain Anchor:** As mentioned, because Zeroth checkpoints are stored on Arweave (and possibly we could also drop hashes onto Ethereum or another chain for additional anchoring), a new node can retrieve the latest checkpoint from these sources which are trust-minimized. For example, if an Arweave transaction says that at a certain block height the state root was H, and that transaction is signed by the Zeroth deployer key, a new node could accept that as a starting point.
- **Protocol0 Verification on Sync:** As the new node pulls history from peers or IPFS, it will run Protocol0 checks on everything it downloads. Even if it initially connects to a malicious peer, that peer cannot convince it of an invalid history because the Protocol0 validation will fail if something was tampered (like if a block’s data doesn’t check out, or a convergence rule was violated).
- **Negative Space and Lineage Checks:** New nodes also verify that the “negative space” (unused hash space) in the DNA system is intact – this ensures the ledger has no gaps or inconsistencies. They also verify lineage (parent-child relationships of blocks) so an attacker can’t feed a new node a fake fork without having the necessary lineage proofs.

Through these measures, any new participant can join the Zeroth network and independently verify the current state without having to fully trust any single existing node.

---

## Convergence and Block State Propagation

Convergence in Zeroth refers to blocks decaying toward zero (losing weight/value over time unless reinforced). This dynamic affects how state is propagated and handled:
- Each block or observation has an associated **weight or value** that decays each iteration (per the halflife rules).
- If a block’s value decays to zero (meaning it has fully converged), that block is considered **converged** – effectively “completed” or finalized in terms of economic effect (it can’t contribute further or be used to mint new value). However, it remains in the ledger history as a record.
- Nodes must propagate not just new blocks, but also **state updates** like “block X has converged” (which could simply be inferred from time, but it’s useful to synchronize on it). In practice, convergence is deterministic with respect to time, so all nodes will independently calculate when a block should converge. They might not need to send a network message; they just know after T iterations, block X’s weight is 0.
- An interesting aspect is **block deletion**: If the system chooses to prune converged blocks (since after convergence they hold no value and no active state), Protocol0 would ensure that deletion only happens under allowed conditions (for example, maybe converged blocks can be dropped from memory but their hashes remain as part of history through the DNA references).
- **State propagation** also includes things like new reinforcement events. If a transaction reinforces a particular block, that changes its decay schedule (it might get a weight boost or halflife extension). Such an event is included in a new block, so it naturally propagates as part of block gossip.
- The network should handle **slice propagation** for efficiency: rather than sending one block at a time, nodes could send slices of the chain (multiple blocks) if a peer is lagging behind. Coupled with snapshot syncing, the idea is to minimize the time and bandwidth for a node to catch up.

The key is that **convergence is an inherent part of state**: every block has a time-varying state (converging to inert). The Zeroth protocol ensures all nodes apply convergence uniformly (through the halflife function) so they stay consistent.

Nodes will likely utilize a **clock or iteration counter** to keep track of convergence progress. Since time in Zeroth is measured in discrete iterations (blocks), if no blocks are produced, one could consider that an iteration has still passed for decay purposes (or perhaps iterations correspond to block heights or explicit ticks).

This needs careful design to ensure that if the network stalls (no new transactions), the decay still happens and all nodes agree on how many ticks have passed. Possibly the system uses block height as a proxy for time (so if no new blocks, time doesn’t advance in the model – meaning value doesn’t decay without activity, which might not be desired). Alternatively, there could be “empty blocks” or ticks to advance time. This is an edge consideration in the architecture: making sure convergence (time-based) and block production (event-based) remain in sync.

For propagation, it’s enough that all nodes process blocks in the same order and keep a consistent global iteration count to apply decay. This falls out of the consensus mechanism combined with a shared understanding of the halflife parameter τ (tau).

---

## CI/CD Integration

Continuous integration and deployment (CI/CD) will play a role in maintaining the Zeroth network software:

### Frontend (Firebase)
- The front-end code (UI) should be built and deployed automatically when updates are made (e.g., when code is merged into a main branch). Given it’s on Firebase Hosting, this could be done via Firebase’s CLI in a CI pipeline.
- Configurations for the front-end (such as the list of Zeroth node endpoints, chain IDs, contract addresses for WTHTH, etc.) should be version-controlled. That way, any changes (like adding a new seed node address or updating the WTHTH contract on a different network) go through code review and get deployed alongside code.
- Ensuring the front-end is always in sync with the current network parameters is crucial for a smooth user experience.

### Node & Validator Stack
- For ZerothVM, Protocol0, and 0Force, use CI to run tests on every commit. Given the critical nature of consensus code, a robust test suite is needed (unit tests, integration tests, maybe even formal verification for consensus logic if possible).
- On merging changes, automatically build the **container images** for each component. This likely involves creating Docker images named like `zerothvm:<git-hash>` or a semantic version, etc.
- These images should be pushed to a container registry (Docker Hub or a private registry). Having immutable images ensures that any node can be reproduced exactly.
- **Automated rollout:** For the Zeroth-managed nodes (the seed nodes under the project team’s control), set up infrastructure-as-code and deployment scripts so that an update can be rolled out in a controlled manner (maybe one node at a time to avoid all going down). This can be tied to the CI pipeline (e.g., deploying to a staging network first, running health checks, then deploying to production nodes).
- For community-run nodes, they won’t auto-update from our CI (they operate on their own schedule). However, by implementing a **protocol version negotiation**, the software can ensure that if a node is running an outdated version, it will not participate if it’s incompatible (or maybe run in a degraded mode). This prevents consensus errors if someone lags behind on software updates.

In summary, the CI/CD integration ensures rapid and safe iteration on the codebase. It enforces discipline:
- Only compatible, tested code is deployed.
- Nodes can be updated reliably.
- The community knows how to update their nodes (pull new Docker images, etc.) to stay in sync with protocol upgrades.

Decentralization adds complexity to CI/CD (can’t force others to upgrade), but with clear versioning and communication, plus designing the protocol to be backwards compatible when possible, we mitigate disruption.

---

## Cost and Capacity Analysis

Running Zeroth in production involves different types of costs and capacity considerations:
- **On-chain vs off-chain:** We deliberately keep Zeroth logic off of Ethereum to avoid gas costs and throughput limitations. Running ZerothVM on dedicated nodes is far cheaper and more scalable than trying to perform the same logic as smart contracts. The trade-off is needing our own infrastructure, but it’s justified for performance and cost.
- **Cloud VMs:** If the initial seed nodes run on cloud providers, there is a predictable cost (server instances, bandwidth, maybe storage). This is fine for initial bootstrapping but is centralized and incurs ongoing expenses. It’s manageable with a few nodes but should not grow without bound.
- **Community/Edge nodes:** Encouraging independent nodes to join spreads out cost (each operator bears their own) and improves decentralization. Ideally, the architecture should allow many such nodes to run without needing massive hardware. Zeroth’s design (ternary states, small hash footprint, etc.) suggests that CPU and memory requirements might be modest, but this needs measurement. It’s likely that typical commodity servers can handle it.
- **Scalability constraints:** The biggest limits are not likely raw transaction throughput at first, but:
  - **Operational overhead:** Having good monitoring, auto-restart, deployment, etc., for nodes. If those processes are not mature, that becomes a human scalability issue.
  - **Key management:** As more nodes and signers are involved (for authorizations), ensuring keys are secure is vital. Losing a key or having one compromised could be catastrophic (imagine a signing key that can mint infinite WTHTH if abused).
  - **Protocol upgrades:** Without a centralized authority, how do we efficiently coordinate changes? This is more organizational but crucial for long-term capacity to evolve.
- **Performance:** We should model how heavy Zeroth’s computation is. Each block’s state update involves halflife calculations and hashing; these are generally cheap operations. The negative space calculation might be more intense (checking unused hash space), but likely manageable. The key is that as usage grows (more transactions, more observations per block), nodes need to keep up. Horizontal scaling (more nodes) helps on the read side but not on the write side (all full nodes process all writes). However, since Zeroth doesn’t aim for a super high TPS like a payments network, this might be fine. It’s more akin to a **scientific computation** that evolves slowly and meaningfully, rather than thousands of trades per second.
- **Storage:** DNA hashes and blocks are quite small (64-bit identifiers plus some metadata). Even with long history, the data might stay relatively compact. That said, we are duplicating storage (every full node stores everything, plus IPFS, plus Arweave copies), but storage is cheap compared to ensuring integrity. We should estimate, for example, if one block per minute, 1440 blocks/day, each block maybe a few KB, that’s only a few MB per day of raw data. Even with overhead, a year of data could be a couple of GB, which is trivial for modern systems.
- **Bandwidth:** Nodes gossiping blocks – also low, given small block size. Even snapshot transfers or new node sync might be the heaviest (transferring a few GB), which is fine on broadband.

In conclusion, the architecture is chosen to minimize costs where possible (no on-chain computation costs, leveraging community infrastructure) while acknowledging that investment in good devops (monitoring, security) is needed for smooth operation. The most important scalability factors will be keeping the system **operationally efficient and secure**, rather than pure technical TPS or data size limits.

---

## Risks and Security Considerations

Any production blockchain system has risks; here are the key ones identified for Zeroth and how the architecture addresses them:

- **Key Compromise (Authorizations):** Zeroth uses cryptographic keys to sign mint/burn authorizations (and possibly for other governance or validation tasks). If an adversary were to steal these keys, they could potentially mint unauthorized WTHTH or disrupt the system. Mitigations:
  - Use Hardware Security Modules (HSMs) or secure enclaves for key storage and signing operations, especially for any keys that authorize value changes on Ethereum.
  - Over time, transition to a **multi-sig or threshold signature** scheme for authorizations, so that no single key compromise is fatal. For instance, require 2-of-3 trusted signers to co-sign any mint authorization. Those signers could be on different nodes in different orgs.
  - Regularly rotate keys where possible and have a process to revoke a key’s privileges if a compromise is suspected.

- **Validator Manipulation or Collusion:** Validators in 0Force must be isolated and ideally honest. If a majority colluded, they could try to always vote `+1` for some malicious state. However, because Protocol0 would catch an invalid state, they can’t force an invalid truth, they could only deny service (e.g., always disagree to stall consensus if they are majority). Also, 0Force’s isolation assumption is critical: if validators can share info, they might try to influence each other or predict T_current.
  - Keep the validator nodes/processes as independent as possible. If they run on the same physical node for development, maybe introduce random delays or obfuscation so one can’t easily read another’s state.
  - If validators are spread across different operators, that naturally improves honesty assumption.
  - Since 0Force requires an odd number, a collusion of all but one still can’t fake a full divergence scenario – if they all collude to pick +1, that’s just majority and it will pass, but if it was invalid, Protocol0 stops it. So the main risk is them *stalling* (one says +1, one -1, one 0 consistently to force divergence every time). In that case T_current always wins, which actually bypasses them. So the design inherently handles collusion by falling back to deterministic truth if they can’t agree. This is a strength: **Truth is not negotiable; if validators play games, the system ignores them (to an extent).**

- **Data Availability:** If some blocks or data were lost (say a new node joins but some old blocks aren’t available anywhere), that’s a problem for trust. We mitigate this via:
  - IPFS replication of every block (multiple nodes pin them).
  - Arweave permanent storage for checkpoints.
  - Having multiple full nodes online (redundancy).
  - Regular backups by the core team of the ledger (even off-chain backups).
  With these, it’s unlikely to lose data. Additionally, by having the ledger’s important pieces anchored in external systems, even a complete network outage can be recovered.

- **State Drift / Forks:** Could the network split into two different truths (fork) without realizing it? In typical blockchains this is a concern if consensus fails. In Zeroth, 0Force should prevent sustained forks by always collapsing to one truth. However, a risk is if some nodes use 0Force and others don’t (or have a bug) they might diverge.
  - Strictly ensure all nodes run the same version and the rules are clear. Use protocol version checks to prevent a misconfigured node from continuing.
  - The periodic checkpoint hashes (published on Arweave or so) act as global reference points. If a node is on a fork that doesn’t match the checkpoint hash everyone else published, it knows it’s on the wrong fork and can correct.
  - Protocol0 validation also ensures that any fork that violates rules (like double-minting or inconsistent lineage) won’t be accepted by honest nodes.

- **Replay/Duplicate Settlement Transactions:** Someone could take an old mint authorization that was already used on Ethereum and try to use it again (replay attack), or similarly try to trick Zeroth into recognizing a stale burn.
  - The WTHTH contract on Ethereum should enforce that each authorization (maybe identified by a nonce or hash) is only usable once. Once used, it’s invalid to use again (store a flag in contract storage).
  - Zeroth’s Protocol0 must track the authorizations it has seen (like storing a list of used nonce/hashes in its state) and reject any duplicates. Essentially, each wrap/unwrap event has a unique ID that is consumed exactly once.
  - The bridge between Zeroth and Ethereum thus remains synchronized on which events are pending or done. Robust event tracking (with retries, confirmations) is necessary to avoid race conditions or missed events.

- **General Cybersecurity:** Running nodes means opening network ports; the Node API could be attacked (DDoS or exploits).
  - Lock down the API: if certain calls are only for internal use (like a debug or admin function), secure them or disable in production.
  - Rate limit public calls to prevent spam (especially if “Observe” or “Transact” is open to public, ensure one entity can’t spam thousands of observations per second to strain the system).
  - Use standard security practices for the server software (regular updates, firewall rules, etc.).
  - Monitoring helps here: if someone is trying something malicious, we’d catch abnormal patterns.

The above considerations will be continuously revisited, but the architecture’s division of responsibilities (separation of concerns) already provides a lot of inherent security:
If one part fails or is compromised, other parts mitigate the damage (e.g., a compromised validator can’t single-handedly fork the chain, an Ethereum issue can’t alter Zeroth’s state, etc.).

---

## Recommended First 7 Deployment Steps

Taking the architecture from design to reality, here are the first seven steps to deploy Zeroth in a production environment (these align with Phase 16 plan tasks):

1. **Define the node API contract** – Finalize and document all external API endpoints for Zeroth nodes (for reads, health checks, state proofs, etc.). Ensure any client (like the front-end or CLI tools) knows how to interact with the nodes.
2. **Package ZerothVM, Protocol0, and 0Force into container images** – Create Docker images for each component, so they can be easily deployed and updated. This includes setting up Dockerfiles, choosing a base OS, and making sure the build is reproducible.
3. **Deploy 3 seed nodes (garage + 2 edge)** – Set up the initial network by launching three nodes in coordination. They should find each other (via configured peer addresses), sync up, and start processing any transactions. Use the container images to deploy them on, say, cloud instances or physical machines in different regions.
4. **Implement P2P block gossip and snapshot sync** – Ensure the networking layer is up: nodes should automatically share new blocks. Also implement the ability for a node that starts fresh to quickly catch up by getting a snapshot (checkpoint) and then recent blocks (replay from checkpoint to tip).
5. **Add IPFS publish & pin for blocks/ledger** – Integrate an IPFS client on each node or use an external script so that whenever a block is produced, its data is added to IPFS and pinned. Verify that retrieving the block via IPFS CID works across the nodes.
6. **Add Arweave checkpointing** – Write a script or service to periodically take the state (or at least the state hash) and store it in Arweave. Perhaps start with manual checkpoints (triggered at milestones) and later automate on a schedule. After a checkpoint, test restoring from it on a fresh node to validate the concept.
7. **Integrate the Firebase UI** – Connect the front-end to the network: update configuration to include the addresses of the three seed nodes, test the explorer features against the live data, ensure that wallet interactions (if any at this stage) are functioning with the actual WTHTH contract (which should be deployed on a testnet or mainnet as appropriate).

These steps set up the core backbone of Zeroth’s live network. They largely focus on infrastructure and integration. Following these, additional steps (like adding more community nodes, performing load tests, etc.) will continue as the network opens up.

---

## Conclusion

With 0Force integrated, Zeroth’s **distributed truth stack** achieves its full design goals:
- **ZerothVM** – computes truth and handles state transitions deterministically for each block.
- **0Force** – deterministically collapses any validator uncertainty or disagreement into a single truth when validators diverge (ensuring consensus without traditional voting or mining).
- **Protocol0** – enforces plausibility, acting as a guardian that prevents any invalid transaction or state from ever entering the ledger, thereby upholding the system’s rules (decay, lineage, etc.).
- **Ethereum (WTHTH)** – provides an external value settlement layer, allowing Zeroth value to be realized and transacted in the broader crypto ecosystem without burdening Zeroth with financial infrastructure concerns.
- **IPFS/Arweave + P2P Network** – together make the ledger permanent, tamper-evident, and globally available, eliminating reliance on any single server or database.

**GOAL:** truth in Zeroth is **bounded, deterministic, and selected by history — not negotiated or dictated by any central party**. By completing the full architecture and deployment, Zeroth transforms from an experimental concept into a living, autonomous cryptographic economy anchored in mathematical truth and decentralized infrastructure.
