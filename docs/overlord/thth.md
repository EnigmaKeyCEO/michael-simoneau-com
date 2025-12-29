# THTH Token: The First Token with Intrinsic Value

**Version 1.0**  
**December 01 2025**

## Abstract

THTH (pronounced "TéCH") is the first cryptographic token where value is intrinsic, not assigned. Built on Zeroth, a living cryptographic economy, THTH tokens derive their value from positional truth encoded directly into DNA hashes. Unlike traditional cryptocurrencies that rely on scarcity, mining costs, or social consensus, THTH's value is mathematically verifiable and self-contained within its cryptographic structure.

## 1. Introduction

### 1.1 The Problem with Traditional Tokens

Traditional ERC-20 tokens face fundamental limitations:

- **Value is assigned externally**: Prices depend on market speculation and external oracles
- **No intrinsic value mechanism**: Tokens have no inherent worth beyond market perception
- **Decimal complexity**: Fractional values create rounding issues and manipulation vectors
- **Inflationary or deflationary by design**: Supply mechanics are fixed, not adaptive

### 1.2 The THTH Solution

THTH solves these problems by making value **intrinsic** to the token's underlying cryptographic structure. Every THTH token is backed by a Zeroth block whose DNA hash encodes:

- **Last Trade Price**: Embedded in the hash structure
- **Convergence State**: Current economic viability
- **Lineage**: Parent-child relationships
- **Decay State**: Metabolic value over time

Value is not assigned—it is **positional** in the hash.

## 2. Token Economics

### 2.1 Integer-Only Design

THTH tokens are **integer-only**. No decimals are allowed. This is mathematically necessary because:

- Zeroth states are discrete: `-1, 0, +1`
- Convergence is exact: `-0 = +0`
- Partial value has no meaning in a convergent system
- Price encoding uses 16-bit integers (1 to 65,535)

**All THTH operations use integers only.**

### 2.2 Value Bounds

#### Maximum Value

THTH tokens have a maximum value bound:

- Maximum price: **65,535** (2^16 - 1)
- Enforced by DNA hash structure
- No infinite valuation
- No overflow

#### Minimum Value

The system enforces:

- Minimum price: **1**
- Any transaction amount < 1 is burned
- Prevents dust and spam
- Ensures meaningful transactions only

### 2.3 Self-Verifying Value

THTH token value is **self-verifying**:

- Price is encoded in DNA hash checksum
- Cannot be tampered with without invalidating hash
- Cryptographic verification includes price verification
- No external oracle required

## 3. Minting Mechanism

### 3.1 Observation-Based Minting

THTH tokens are **not minted arbitrarily**. They are minted only when:

1. **Ethereum transaction occurs**: WTHTH transfer, WTHTH ↔ ETH swap, or contract call
2. **Zeroth VM observes event**: Transaction is treated as observation
3. **New DNA hashes generated**: Observation creates new cryptographic structures
4. **Mint eligibility evaluated**: System checks convergence delta, reinforcement, bounds
5. **Authorization created**: Zeroth produces cryptographically signed authorization
6. **Protocol0 validates**: Validation protocol verifies authorization
7. **Ethereum mints**: WTHTH contract executes mint

**Minting only occurs on meaningful state transitions, not on reads or queries.**

### 3.2 Mint Eligibility Rules

A transaction does not automatically mint. It must satisfy all:

1. **Convergence delta ≥ 10%**: `C_after - C_before >= 0.10`
2. **Base-3 reinforcement threshold**: Support count meets tier threshold (S ≥ 3^k)
3. **Price bounds valid**: Price in [1, 65535]
4. **Block halflife valid**: Decay calculations consistent
5. **Lineage consistency**: Parent hashes not converged
6. **No backward mutation**: Forward progress only

**No authorization → no mint.**

### 3.3 Authorization Flow

```python
@dataclass(frozen=True)
class MintAuthorization:
    block_id: str              # Block identifier
    amount: int                 # Amount to mint (integer, >= 1)
    dna_hash: str              # DNA hash of the block
    iteration: int              # Current iteration
    signature_scheme: str       # "ed25519" or "secp256k1"
    public_key: bytes          # Public key for verification
    signature: bytes            # Authorization signature
    event_hash: str            # Hash of canonical event bytes
```

### 3.4 WTHTH Contract Interface

```solidity
function mint(
    string memory blockId,
    uint256 amount,
    string memory dnaHash,
    uint256 iteration,
    bytes memory signature,
    bytes memory publicKey
) external;
```

The contract:
- Verifies authorization cryptographically
- Checks authorization not already used
- Mints integer tokens only
- Emits Transfer event

**Ethereum performs no valuation logic—it is a settlement layer only.**

## 4. Burning Mechanism

### 4.1 Convergence-Based Burning

THTH tokens are burned when their underlying Zeroth block **converges**:

1. **Zeroth detects full convergence**: All hashes in block decay to zero (weight = 0, price = 0)
2. **Block marked converged**: Block ceases to be value-bearing
3. **Burn authorization issued**: Zeroth produces cryptographically signed authorization
4. **Ethereum burns WTHTH**: Contract executes burn, marks block as burned

### 4.2 Block Deletion Cascade

When a Zeroth block has no non-converged hashes:

```
∀ hash ∈ block: convergence(hash) == 0
⇒ block.convergence == 0
⇒ WTHTH_supply(block) == 0
```

**ERC-20 supply mirrors living block mass, not historical issuance.**

This is fundamentally different from:
- Proof of Work (immortal blocks)
- Proof of Stake (fixed supply)
- Rebasing tokens (supply manipulation)

**THTH uses existence-conditioned supply.**

### 4.3 Burn Authorization

```python
@dataclass(frozen=True)
class BurnAuthorization:
    block_id: str              # Block identifier
    amount: int                 # Amount to burn (integer, >= 1)
    dna_hash: str              # DNA hash of converged block
    iteration: int              # Current iteration
    signature_scheme: str       # "ed25519" or "secp256k1"
    public_key: bytes          # Public key for verification
    signature: bytes            # Authorization signature
    event_hash: str            # Hash of canonical event bytes
```

### 4.4 WTHTH Contract Burn Interface

```solidity
function burn(
    string memory blockId,
    uint256 amount,
    string memory dnaHash,
    uint256 iteration,
    bytes memory signature,
    bytes memory publicKey
) external;
```

## 5. WTHTH Contract: ERC-20 Wrapper

### 5.1 Design Principles

WTHTH contracts are:

- **Dumb**: No valuation logic
- **Deterministic**: Same inputs → same outputs
- **Externally authorized**: All mint/burn requires Zeroth authorization

They are **membranes, not brains**.

### 5.2 ERC-20 Compliance

WTHTH is fully ERC-20 compliant:

- Standard transfer functions
- Standard approval functions
- Standard events (Transfer, Approval)
- Compatible with all Ethereum tooling

### 5.3 Authorization Tracking

```solidity
mapping(bytes32 => bool) private _usedAuthorizations;  // Prevents replay
mapping(string => uint256) private _blockSupply;       // Supply per block
mapping(string => bool) private _burnedBlocks;          // Burned blocks
```

### 5.4 Integration with Ethereum

WTHTH tokens can be:

- Traded on DEXs (Uniswap, etc.)
- Used in DeFi protocols
- Transferred between wallets
- Swapped for ETH

**Every transaction is observed by Zeroth VM, potentially generating new hashes and minting new tokens.**

## 6. Value Proposition

### 6.1 Self-Verifying Value

THTH token value is **self-verifying**:

- Price encoded in DNA hash checksum
- Cryptographic verification includes price
- No external oracle required
- Cannot be manipulated without invalidating hash

### 6.2 Decay-Based Economics

THTH uses **metabolic value**:

- Value decays via halflife: `P(t) = floor(P₀ × 2^(-t / τ))`
- Idle blocks lose value
- Meaningless trading destroys value
- Only reinforced, relevant usage sustains value

This is not inflationary—it is **selection-based**.

### 6.3 Living Supply

THTH supply is **living**:

- Tokens mint when blocks form
- Tokens burn when blocks converge
- Supply mirrors active block mass
- Self-pruning, not monotonic growth

### 6.4 Integer-Only Simplicity

THTH's integer-only design:

- Eliminates rounding errors
- Prevents decimal manipulation
- Simplifies calculations
- Matches Zeroth's discrete state system

## 7. Security Considerations

### 7.1 Authorization Replay Prevention

Each authorization can only be used once:

- `_usedAuthorizations` mapping tracks used authorizations
- Cryptographic hash prevents reuse
- One-time use enforced on-chain

### 7.2 Signature Verification

All authorizations must be cryptographically signed:

- Ed25519 (preferred) or secp256k1
- Public key included in authorization
- Signature verified before execution
- Canonical event bytes prevent malleability

### 7.3 Protocol0 Validation

Authorizations validated before execution:

- Convergence delta checked
- Reinforcement threshold verified
- Price bounds validated
- Lineage consistency enforced

### 7.4 Block Convergence

Blocks cannot be burned until fully converged:

- All hashes must have weight = 0
- All hashes must have price = 0
- Convergence verified cryptographically
- Prevents premature burn

### 7.5 Integer-Only Protection

No decimal manipulation possible:

- All amounts are integers
- Amounts < 1 are burned automatically
- No fractional operations
- Prevents rounding attacks

## 8. Technical Specifications

### 8.1 Mint Flow Example

```python
# 1. Ethereum transaction occurs
tx = wthth.transfer(recipient, amount)

# 2. Zeroth observes event
observation = zeroth_vm.observe(tx)

# 3. Zeroth evaluates mint eligibility
if observation.convergence_delta >= 0.10:
    if observation.reinforcement >= threshold:
        # 4. Create authorization
        auth = MintAuthorization(
            block_id=observation.block_id,
            amount=observation.amount,
            dna_hash=observation.dna_hash,
            iteration=observation.iteration,
            signature_scheme="ed25519",
            public_key=public_key,
            signature=sign(observation),
            event_hash=hash(observation)
        )
        
        # 5. Protocol0 validates
        if protocol0.validate(auth):
            # 6. Ethereum mints
            wthth.mint(auth)
```

### 8.2 Burn Flow Example

```python
# 1. Zeroth detects convergence
if all(hash.weight == 0 and hash.price == 0 for hash in block.hashes):
    block.converged = True
    
    # 2. Create burn authorization
    auth = BurnAuthorization(
        block_id=block.id,
        amount=block.supply,
        dna_hash=block.dna_hash,
        iteration=current_iteration,
        signature_scheme="ed25519",
        public_key=public_key,
        signature=sign(block),
        event_hash=hash(block)
    )
    
    # 3. Ethereum burns
    wthth.burn(auth)
```

## 9. Economic Model

### 9.1 Why THTH Doesn't Constantly Devalue

THTH's economic model ensures value accrues to meaningful usage:

- **Tokens don't decay uniformly**: Bad lineage collapses quickly, good lineage persists
- **Usage reinforces convergence**: Meaningful transactions extend block lifespan
- **Noise self-destructs**: Spam and meaningless trading destroy value
- **Selection engine**: Value accrues to participants in meaningful state transitions

This is not "self-mining inflation loop"—it is a **selection engine**.

### 9.2 Observation Domain Separation

| Action | Zeroth Observed? | On-chain Mutation? |
|--------|------------------|-------------------|
| Read / query | ❌ | ❌ |
| ERC-20 transfer | ✅ | ✅ (via proof) |
| ETH ↔ WTHTH swap | ✅ | ✅ |
| Contract call using WTHTH | ✅ | ✅ |
| Zeroth internal iteration | ✅ | ❌ |

**Observation = meaningful state transition, not curiosity.**

## 10. Conclusion

THTH represents a fundamental shift in token economics. By encoding value directly into cryptographic structures, THTH creates a self-verifying token where value is intrinsic, not assigned. The token's metabolic nature—where value decays and converges—ensures that only meaningful, reinforced usage sustains value over time.

THTH is not inflationary mining. It is **living computation** where token supply mirrors active cryptographic value.

## References

- **SPEC_MINT_BURN.md**: Mint and burn authorization specification
- **SPEC_INTRINSIC_VALUE.md**: Core intrinsic value mechanism
- **End_Goal_GOLD/Zeroth GOLD #1.txt**: Vision and goals
- **WTHTH.sol**: Ethereum contract implementation

---

**THTH Token Whitepaper v1.0**  
For more information, visit: https://0thth.com/whitepapers
