# Protocol0: Validation Protocol for Zeroth

**Version 1.0**  
**December 01 2025**

## Abstract

Protocol0 is a validation protocol for verifying ledger plausibility in the Zeroth system. Unlike traditional blockchain consensus mechanisms that create truth through competition (Proof of Work) or stake (Proof of Stake), Protocol0 **validates** truth that has already been created by the Zeroth VM. Protocol0 answers a single question: "Is this transaction causally and mathematically allowed right now?"

## 1. Introduction

### 1.1 The Role of Protocol0

Protocol0 is a **validator, not a miner**. It:

- Does not create truth
- Does not compete
- Does not collect fees
- Only validates what Zeroth VM has already determined

Protocol0 validates:
- Lineage viability
- Convergence thresholds
- Block eligibility
- Deletion conditions

### 1.2 Why Validation, Not Consensus?

Traditional blockchains use consensus to **create** truth:

- Proof of Work: Miners compete to create blocks
- Proof of Stake: Validators stake to create blocks
- Both require competition and fees

Zeroth uses validation to **verify** truth:

- Zeroth VM creates truth through computation
- Protocol0 validates truth through mathematical checks
- No competition required
- No fees required

**Protocol0 is a plausibility checker, not a truth creator.**

## 2. Message Formats

### 2.1 Validation Request

```json
{
    "version": "1.0",
    "ledger_path": "ledger/zeroth.p0",
    "options": {
        "verify_signatures": true,
        "check_plausibility": true,
        "check_negative_space": true
    }
}
```

### 2.2 Validation Response

```json
{
    "is_valid": true,
    "errors": [],
    "warnings": [],
    "checked_records": 1234,
    "verified_signatures": 1200,
    "failed_signatures": 0,
    "plausibility_checks": {
        "convergence_delta": true,
        "price_bounds": true,
        "reinforcement_threshold": true,
        "halflife_decay": true,
        "lineage_consistency": true
    },
    "chain_integrity": true,
    "negative_space_valid": true
}
```

## 3. Validation Rules

### 3.1 Convergence Delta Rule

**Rule**: Convergence delta must be ≥ 10% for mint eligibility

**Check**:
```python
delta = C_after - C_before
if delta >= 0.10:
    return VALID
else:
    return INVALID
```

**Purpose**: Ensures meaningful progress before minting tokens.

### 3.2 Reinforcement Threshold Rule

**Rule**: Support count must meet tier threshold (S ≥ 3^k)

**Check**:
```python
tier = calculate_tier(support_count)
threshold = 3 ** tier
if support_count >= threshold:
    return VALID
else:
    return INVALID
```

**Purpose**: Ensures blocks have sufficient support before minting.

### 3.3 Halflife Decay Rule

**Rule**: Weight decay must follow formula `W(H, t) = floor(W₀ × 2^(-t / τ))`

**Check**:
```python
expected = floor(W₀ × 2^(-t / τ))
if current_weight == expected or current_weight > prev_weight:
    return VALID  # Allow reinforcement
else:
    return INVALID
```

**Purpose**: Ensures decay follows mathematical rules, allows reinforcement.

### 3.4 Price Bounds Rule

**Rule**: Price must be in [1, 65535]

**Check**:
```python
if 1 <= price <= 65535:
    return VALID
else:
    return INVALID
```

**Purpose**: Ensures price stays within DNA hash encoding bounds.

### 3.5 Price Decay Rule

**Rule**: Price decay must follow halflife formula

**Check**:
```python
expected = floor(P₀ × 2^(-t / τ))
if current_price == expected or current_price > prev_price:
    return VALID  # Allow reinforcement
else:
    return INVALID
```

**Purpose**: Ensures price decay follows mathematical rules.

### 3.6 Price in Hash Rule

**Rule**: Price must match DNA hash price segment

**Check**:
```python
decoded = decode_dna(dna_hash)
if decoded.price == record_price:
    return VALID
else:
    return INVALID
```

**Purpose**: Ensures price is correctly encoded in hash.

### 3.7 Lineage Consistency Rule

**Rule**: Parent hashes must not be converged

**Check**:
```python
for parent_hash in parent_hashes:
    if parent_hash.convergence == 0:
        return INVALID
return VALID
```

**Purpose**: Ensures blocks are built on viable parents.

### 3.8 Negative Space Rule

**Rule**: Negative space (unused hash space) must be valid

**Check**:
```python
if negative_space_valid(ledger):
    return VALID
else:
    return INVALID
```

**Purpose**: Ensures ledger integrity and prevents hash collisions.

## 4. Plausibility Checks

### 4.1 What is Plausibility?

Plausibility checks verify that ledger records are:

- **Mathematically consistent**: Decay formulas, bounds, thresholds
- **Causally consistent**: Lineage, parent-child relationships
- **Cryptographically consistent**: Signatures, checksums, hashes

**Plausibility ≠ Truth**: Protocol0 validates plausibility, Zeroth VM creates truth.

### 4.2 Convergence Delta Check

Verifies that convergence delta meets minimum threshold:

```python
def check_convergence_delta(record):
    delta = record.convergence_after - record.convergence_before
    return delta >= MIN_CONVERGENCE_DELTA  # 0.10
```

### 4.3 Reinforcement Check

Verifies that support count meets tier threshold:

```python
def check_reinforcement(record):
    tier = calculate_tier(record.support_count)
    threshold = BASE_REINFORCEMENT ** tier  # 3^k
    return record.support_count >= threshold
```

### 4.4 Decay Consistency Check

Verifies that weight/price decay follows halflife formula:

```python
def check_decay(record):
    expected = floor(record.initial_value * 2 ** (-record.iterations / record.halflife))
    return record.current_value == expected or record.current_value > record.previous_value
```

### 4.5 Price Bounds Check

Verifies that price stays within bounds:

```python
def check_price_bounds(record):
    return 1 <= record.price <= 65535
```

### 4.6 Lineage Check

Verifies that parent hashes are viable:

```python
def check_lineage(record):
    for parent_hash in record.parent_hashes:
        parent = get_record(parent_hash)
        if parent.convergence == 0:
            return False
    return True
```

## 5. Signature Verification

### 5.1 Signature Schemes

Protocol0 supports two signature schemes:

- **Ed25519** (preferred): Fast, secure, compact
- **secp256k1** (alternative): Ethereum-compatible

### 5.2 Canonical Event Bytes

Authorizations use canonical event bytes to prevent malleability:

```python
event_data = {
    'type': 'MINT_AUTHORIZATION' or 'BURN_AUTHORIZATION',
    'block_id': block_id,
    'amount': amount,
    'dna_hash': dna_hash,
    'iteration': iteration
}

canonical_bytes = serialize(event_data)
signature = sign(canonical_bytes, private_key)
```

### 5.3 Verification Process

```python
def verify_signature(authorization):
    canonical_bytes = serialize_authorization(authorization)
    return verify(
        signature=authorization.signature,
        message=canonical_bytes,
        public_key=authorization.public_key,
        scheme=authorization.signature_scheme
    )
```

## 6. Export/Import Formats

### 6.1 Proof Bundle Format

```json
{
    "version": "1.0",
    "ledger_slice": [
        {
            "type": "OBSERVE",
            "iteration": 1,
            "timestamp": 1234567890.0,
            "record_hash": "...",
            "dna_hash": "...",
            "payload": {...},
            "signature_scheme": "ed25519",
            "public_key": "...",
            "signature": "...",
            "event_hash": "..."
        }
    ],
    "public_keys": {
        "hash1": "public_key_hex",
        "hash2": "public_key_hex"
    },
    "dna_hashes": ["hash1", "hash2"],
    "validation_result": {
        "is_valid": true,
        "errors": [],
        "warnings": []
    },
    "metadata": {
        "start_iteration": 1000,
        "end_iteration": 1100,
        "exported_at": 1234567890.0,
        "exporter": "Protocol0"
    }
}
```

### 6.2 Ethereum Format

```json
{
    "version": "1.0",
    "records": [
        {
            "iteration": 1,
            "record_hash": "...",
            "dna_hash": "...",
            "payload_hash": "...",
            "signature": "...",
            "public_key": "...",
            "scheme": "ed25519"
        }
    ],
    "validation": {
        "is_valid": true,
        "errors": []
    }
}
```

## 7. Integration

### 7.1 With Zeroth VM

Protocol0 validates what Zeroth VM creates:

- Reads ledger records created by VM
- Validates convergence calculations
- Verifies decay consistency
- Checks lineage viability

**Protocol0 does not create truth—it validates truth.**

### 7.2 With Ethereum

Protocol0 validates authorizations before Ethereum execution:

- Validates mint authorizations before minting
- Validates burn authorizations before burning
- Ensures authorization not already used
- Verifies cryptographic signatures

### 7.3 With Ledger

Protocol0 validates ledger integrity:

- Checks chain integrity
- Verifies record hashes
- Validates negative space
- Ensures no gaps or inconsistencies

## 8. CLI Commands

### 8.1 Validate

```bash
zeroth protocol0-validate [ledger_path]
```

Validates entire ledger for plausibility.

### 8.2 Export

```bash
zeroth protocol0-export [--start N] [--end M] [--output path] [--ethereum] [--ipfs]
```

Exports ledger slice in proof bundle format.

### 8.3 Import

```bash
zeroth protocol0-import <bundle_path>
```

Imports proof bundle and validates.

### 8.4 Verify

```bash
zeroth protocol0-verify <hash>
```

Verifies single record by hash.

## 9. Constants

```python
PROTOCOL0_VERSION = "1.0"
MIN_CONVERGENCE_DELTA = 0.10
BASE_REINFORCEMENT = 3
DEFAULT_HALFLIFE = 100
MAX_OBSERVATION_PRESSURE = 0.1
DEFAULT_EPSILON = 0.001
```

## 10. Security Considerations

### 10.1 Authorization Replay Prevention

Protocol0 ensures each authorization is used only once:

- Tracks used authorizations
- Verifies authorization not already used
- Prevents double-spending

### 10.2 Signature Verification

All authorizations must be cryptographically signed:

- Ed25519 or secp256k1 signatures
- Public key included in authorization
- Canonical event bytes prevent malleability

### 10.3 Plausibility Enforcement

Protocol0 enforces plausibility rules:

- Convergence delta ≥ 10%
- Reinforcement threshold met
- Price bounds [1, 65535]
- Decay consistency
- Lineage viability

### 10.4 Chain Integrity

Protocol0 validates chain integrity:

- No gaps in iteration sequence
- Record hashes chain correctly
- Negative space valid
- No hash collisions

## 11. Conclusion

Protocol0 represents a fundamental shift in blockchain validation. Unlike consensus mechanisms that create truth through competition, Protocol0 validates truth that has already been created by computational processes. This makes Protocol0:

- **Efficient**: No competition, no fees
- **Deterministic**: Same inputs → same outputs
- **Secure**: Cryptographic verification of all rules
- **Scalable**: Validation is O(n), not O(n²)

Protocol0 is not a miner. It is a **plausibility checker** that ensures Zeroth's cryptographic economy operates within mathematical bounds.

## References

- **SPEC_PROTOCOL0.md**: Protocol0 specification
- **PROTOCOL0.md**: Protocol0 implementation details
- **SPEC_MINT_BURN.md**: Authorization structures
- **SPEC_DNA_HASH.md**: DNA hash validation

---

**Protocol0 Whitepaper v1.0**  
For more information, visit: https://0thth.com/whitepapers
