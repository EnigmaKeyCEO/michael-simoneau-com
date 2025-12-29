# Protocol0 Overview

## What is Protocol0?

Protocol0 is a validator system that verifies ledger plausibility without requiring miners, consensus, or fees. It validates whether a claimed history could have happened according to Zeroth rules, checking plausibility rather than truth.

## Core Principles

### Validator, Not Consensus

Protocol0 validators:
- Do not compete
- Do not resolve conflicts
- Do not require incentives
- Do not care about agreement
- Verify only: "Could this history have happened?"

Unlike blockchain validators:
- No competition
- No economic rules
- No conflict resolution
- No incentives needed

### Plausibility, Not Truth

Protocol0 does not decide truth. It decides plausibility.

**Valid history** = Could have happened given Zeroth rules  
**Invalid history** = Impossible given Zeroth rules

### Negative Space Validation

Protocol0 validates:
- "Was there room for this to happen?"
- Negative space (potential) is meaningful
- Absence is information
- Decay is information
- Forgetting is compression

## How It Works

### Signature Verification

Protocol0 verifies signatures using both schemes:
- **Ed25519**: Primary scheme for local-first fast signing
- **secp256k1**: Optional scheme for Ethereum compatibility

```python
validator = Protocol0Validator()
result = validator.validate_ledger(ledger)

if result.verified_signatures > 0:
    print(f"Verified {result.verified_signatures} signatures")
```

### Chain Integrity

Protocol0 verifies git-style hash chain:

```python
is_valid, errors = validator.verify_chain_integrity(ledger)

if is_valid:
    print("Chain integrity verified")
else:
    for error in errors:
        print(f"Error: {error}")
```

### Plausibility Checks

Protocol0 replays events and checks plausibility:

1. **Convergence Delta**: ΔC ≥ 0.10 for mint eligibility
2. **Reinforcement**: S ≥ 3^k for tier k
3. **Halflife Decay**: W(H, t) = floor(W₀ × 2^(-t / τ))
4. **Orientation**: Values in {-1, 0, +1}
5. **Lineage**: Parent hashes exist
6. **Potential Injection**: Only when convergence < ε
7. **Merge Lineage**: Complete composite lineage
8. **Integer-Only**: All values are integers
9. **Price Bounds**: 1 ≤ price ≤ 65535
10. **Price Decay**: Follows halflife formula
11. **Price in Hash**: Matches DNA hash price segment
12. **No Deletions**: Forgetting is convergence to 0

## Plausibility Rules

### Convergence Delta Rule

Checks that convergence changes are plausible:

```python
delta = C_after - C_before
if delta >= 0.10:
    # Valid
else:
    # Invalid (below minimum)
```

### Reinforcement Threshold Rule

Checks base-3 reinforcement progression:

```python
tier = calculate_tier(support_count)
threshold = 3 ** tier
if support_count >= threshold:
    # Valid
else:
    # Invalid
```

### Halflife Decay Rule

Checks weight decay follows formula:

```python
expected = floor(W₀ × 2^(-t / τ))
if current_weight == expected:
    # Valid
else:
    # Invalid (unless reinforcement)
```

### Price Bounds Rule

Checks price is within bounds:

```python
if 1 <= price <= 65535:
    # Valid
else:
    # Invalid
```

### Price Decay Rule

Checks price decay follows halflife:

```python
expected = floor(P₀ × 2^(-t / τ))
if current_price == expected:
    # Valid
else:
    # Invalid (unless reinforcement)
```

### Price in Hash Rule

Checks price matches DNA hash:

```python
decoded = decode_dna(dna_hash)
if decoded.price == record_price:
    # Valid
else:
    # Invalid
```

## Negative Space Validation

### Unobserved Latency

Validates unobserved truth remains latent:

```python
# Unobserved states don't affect convergence
# until observed
```

### Observation Creates History

Validates every observation creates history:

```python
# All observations must:
# - Create ledger records
# - Be signed
# - Include DNA hash
```

### Forgetting is Derivative

Validates forgetting is convergence to 0:

```python
# No explicit deletions
# Only convergence to 0
```

### Potential is Meaningful

Validates potential (-1) is directional:

```python
# Potential value must be -1
# Potential must have target
```

## Export/Import

### Proof Bundles

Protocol0 can export proof bundles:

```python
from zeroth.protocol0.export import export_proof_bundle

bundle = export_proof_bundle(
    ledger=ledger,
    start_iter=1000,
    end_iter=1100,
    include_keys=True
)

save_proof_bundle(bundle, "proof_bundle.zip")
```

### Import and Validate

Proof bundles can be imported and validated:

```python
from zeroth.protocol0.bundle_import import load_proof_bundle, validate_imported_bundle

bundle = load_proof_bundle("proof_bundle.zip")
result = validate_imported_bundle(bundle)

if result.is_valid:
    print("Bundle is valid")
```

## Usage

### Validate Ledger

```bash
zeroth protocol0-validate ledger/zeroth.p0
```

### Export Proof Bundle

```bash
zeroth protocol0-export --start 1000 --end 1100 --output proof.zip
```

### Import Proof Bundle

```bash
zeroth protocol0-import proof.zip
```

### Verify Record

```bash
zeroth protocol0-verify <record_hash>
```

## Integration

### With Phase 6 (Ledger)

- Reads ledger records
- Validates chain integrity
- Uses ledger replay

### With Phase 7 (DNA Hashes)

- Validates DNA hash structure
- Checks price encoding
- Verifies checksums

### With Phase 8 (Signing)

- Verifies Ed25519 signatures
- Verifies secp256k1 signatures
- Uses SignatureProxy

### With Phase 0 (Price)

- Validates price bounds
- Validates price decay
- Validates price in DNA hash

## Performance

Protocol0 validation is efficient:
- Chain verification: O(n) where n = number of records
- Signature verification: O(n) where n = number of signed records
- Replay: O(n) where n = number of records
- Plausibility checks: O(n) where n = number of records

## Determinism

Protocol0 validation is deterministic:
- Same ledger → same result
- No randomness
- No network access required
- Can be run locally
