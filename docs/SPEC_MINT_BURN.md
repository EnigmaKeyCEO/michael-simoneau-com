# Mint and Burn Authorization Specification

## Overview

This document specifies the mint and burn authorization system for WTHTH tokens. Authorizations are created by Zeroth VM, validated by Protocol0, and executed on Ethereum.

## Authorization Structures

### MintAuthorization

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

### BurnAuthorization

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

## Mint Flow

### 1. Ethereum Transaction Occurs

- WTHTH transfer
- WTHTH ↔ ETH swap
- Contract call using WTHTH

**No minting happens here.**

### 2. Zeroth Observes Event

- Watches Ethereum via RPC
- Treats transaction as observation
- Generates new DNA hashes
- Advances iteration
- Updates prices
- Applies halflife decay

### 3. Zeroth Evaluates Mint Eligibility

Checks all rules:
- Convergence delta ≥ 10% (MIN_CONVERGENCE_DELTA)
- Base-3 reinforcement threshold (1 → 3 → 9 → …)
- Price bounds valid
- Block halflife valid
- Lineage consistency
- No backward mutation

### 4. Mint Authorization Created

Zeroth produces `MintAuthorization` with:
- Block ID
- Amount (integer, >= 1)
- DNA hash
- Iteration
- Cryptographic signature

### 5. Protocol0 Validates Authorization

Protocol0 checks:
- Math (convergence delta, reinforcement)
- Lineage (parents not converged)
- Decay (halflife valid)
- Bounds (price bounds)
- Signatures (Ed25519/secp256k1)
- Authorization not already used

### 6. Ethereum Mints WTHTH

WTHTH contract:
- Verifies authorization
- Checks authorization not used
- Mints integer tokens
- Emits Transfer event

**Ethereum performs no valuation logic.**

## Burn Flow

### 1. Zeroth Detects Full Convergence

When:
- All hashes in block decay to zero (weight = 0)
- LAST_TRADE_PRICE decays to zero

Block is marked **converged**.

### 2. Burn Authorization Issued

Zeroth produces `BurnAuthorization` with:
- Block ID
- Amount to burn
- DNA hash
- Iteration
- Cryptographic signature

### 3. Ethereum Burns WTHTH

WTHTH contract:
- Validates authorization
- Checks authorization not used
- Burns tokens
- Marks block as burned
- Emits BurnAuthorization event

## Authorization Verification

### Signature Verification

Authorizations use canonical event bytes:

```python
event_data = {
    'type': 'MINT_AUTHORIZATION' or 'BURN_AUTHORIZATION',
    'block_id': block_id,
    'amount': amount,
    'dna_hash': dna_hash,
    'iteration': iteration
}
```

Signature schemes:
- Ed25519 (preferred)
- secp256k1 (alternative)

### Protocol0 Validation

Protocol0 validates:
- Convergence delta ≥ 0.10
- Reinforcement threshold met (base-3)
- Price bounds [1, 65535]
- Block halflife valid
- Lineage consistency
- No backward mutation

## Ethereum Contract Interface

### WTHTH Contract Functions

```solidity
function mint(
    string memory blockId,
    uint256 amount,
    string memory dnaHash,
    uint256 iteration,
    bytes memory signature,
    bytes memory publicKey
) external;

function burn(
    string memory blockId,
    uint256 amount,
    string memory dnaHash,
    uint256 iteration,
    bytes memory signature,
    bytes memory publicKey
) external;
```

### Authorization Tracking

- `mapping(bytes32 => bool) private _usedAuthorizations` - Tracks used authorizations
- `mapping(string => uint256) private _blockSupply` - Tracks supply per block
- `mapping(string => bool) private _burnedBlocks` - Tracks burned blocks

## Rules

### Mint Eligibility

1. Convergence delta ≥ 10%
2. Base-3 reinforcement threshold met
3. Amount >= 1 (integer-only)
4. Block not converged
5. Authorization not already used

### Burn Eligibility

1. Block fully converged (all hashes weight = 0, price = 0)
2. Amount >= 1 (integer-only)
3. Block not already burned
4. Authorization not already used

### Integer-Only Economics

- No decimals
- Amount must be >= 1
- Amounts < 1 are burned automatically
- All calculations use integers

## Integration Points

### With Zeroth VM

- Observations trigger mint eligibility checks
- Convergence detection triggers burn authorization
- Block lifecycle managed by BlockManager

### With Protocol0

- Validates authorizations before execution
- Checks plausibility rules
- Verifies signatures
- Ensures authorization not reused

### With Ethereum

- WTHTH contract enforces authorization-only mint/burn
- No valuation logic on Ethereum
- Settlement layer only

### With Swap Mechanism (Phase 14)

- Swaps use WTHTH mint/burn mechanics:
  - **USDC → WTHTH**: Mints WTHTH (uses existing mint infrastructure)
  - **WTHTH → USDC**: Burns WTHTH (uses existing burn infrastructure)
- Swap events observed by Zeroth VM
- Swap price becomes LAST TRADE PRICE
- Swap validation ensures minimum 1:1 ratio

See **SPEC_SWAP.md** for complete swap specification.

## Security Considerations

1. **Authorization Replay Prevention**: Each authorization can only be used once
2. **Signature Verification**: All authorizations must be cryptographically signed
3. **Protocol0 Validation**: Authorizations validated before execution
4. **Block Convergence**: Blocks cannot be burned until fully converged
5. **Integer-Only**: No decimal manipulation possible

## Production Readiness

All components are production-ready:
- Authorization structures with signatures
- Ethereum watcher for events
- Block lifecycle management
- WTHTH contract implementation
- Complete integration flow
