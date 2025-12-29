# Protocol0 Protocol Specification

## Overview

Protocol0 is a validation protocol for verifying ledger plausibility. It defines message formats, validation rules, and export/import formats.

## Version

Protocol0 version: **1.0**

## Message Formats

### Validation Request

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

### Validation Response

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
        ...
    },
    "chain_integrity": true,
    "negative_space_valid": true
}
```

## Validation Rules

### Convergence Delta Rule

**Rule**: Convergence delta must be ≥ 10% for mint eligibility

**Check**:
```python
delta = C_after - C_before
if delta >= 0.10:
    return VALID
else:
    return INVALID
```

### Reinforcement Threshold Rule

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

### Halflife Decay Rule

**Rule**: Weight decay must follow formula W(H, t) = floor(W₀ × 2^(-t / τ))

**Check**:
```python
expected = floor(W₀ × 2^(-t / τ))
if current_weight == expected or current_weight > prev_weight:
    return VALID  # Allow reinforcement
else:
    return INVALID
```

### Price Bounds Rule

**Rule**: Price must be in [1, 65535]

**Check**:
```python
if 1 <= price <= 65535:
    return VALID
else:
    return INVALID
```

### Price Decay Rule

**Rule**: Price decay must follow halflife formula

**Check**:
```python
expected = floor(P₀ × 2^(-t / τ))
if current_price == expected or current_price > prev_price:
    return VALID  # Allow reinforcement
else:
    return INVALID
```

### Price in Hash Rule

**Rule**: Price must match DNA hash price segment

**Check**:
```python
decoded = decode_dna(dna_hash)
if decoded.price == record_price:
    return VALID
else:
    return INVALID
```

## Export/Import Formats

### Proof Bundle Format

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

### Ethereum Format

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

## CLI Commands

### Validate

```bash
zeroth protocol0-validate [ledger_path]
```

### Export

```bash
zeroth protocol0-export [--start N] [--end M] [--output path] [--ethereum] [--ipfs]
```

### Import

```bash
zeroth protocol0-import <bundle_path>
```

### Verify

```bash
zeroth protocol0-verify <hash>
```

## Constants

```python
PROTOCOL0_VERSION = "1.0"
MIN_CONVERGENCE_DELTA = 0.10
BASE_REINFORCEMENT = 3
DEFAULT_HALFLIFE = 100
MAX_OBSERVATION_PRESSURE = 0.1
DEFAULT_EPSILON = 0.001
```

## Integration

### With Phase 6 (Ledger)

- Reads ledger records
- Validates chain integrity

### With Phase 7 (DNA Hashes)

- Validates DNA hash structure
- Checks price encoding

### With Phase 8 (Signing)

- Verifies signatures
- Uses SignatureProxy

### With Phase 0 (Price)

- Validates price bounds
- Validates price decay
- Validates price in DNA hash
