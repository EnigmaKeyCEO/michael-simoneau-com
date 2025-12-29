# Ledger Format Specification

## Overview

The Zeroth ledger is an append-only, git-style hash-chained record system. Records are immutable and tamper-evident.

## Record Format

### LedgerRecord Structure

```python
@dataclass(frozen=True)
class LedgerRecord:
    # Header
    record_type: RecordType
    iteration: int
    timestamp: float
    
    # Hash identifiers
    record_hash: str  # Content-addressed hash
    parent_hash: str  # Git-style parent reference
    dna_hash: str  # DNA hash of entity
    
    # Payload
    payload_hash: str  # Hash of payload
    payload: Dict[str, Any]  # Payload data
    
    # Chain integrity
    prev_hash: str  # Previous record hash
    
    # Signatures (Phase 8)
    signature_scheme: Optional[str]  # "ed25519" or "secp256k1"
    public_key: Optional[bytes]
    signature: Optional[bytes]
    event_hash: Optional[str]  # Hash of canonical event bytes
```

## Record Types

### OBSERVE

Observation event:

```python
{
    "projection": {"HELLO": 0.8, "WORLD": 0.2},
    "dominant_state": "HELLO",
    "convergence": 0.5,
    "field_convergence": 0.4,
    "observation_pressure": 0.1,
    "price": 1000
}
```

### COLLAPSE

Truth convergence:

```python
{
    "convergence_value": 0.001,
    "truth_record": {"HELLO": 1.0},
    "injected_potential": -1,
    "composite_lineage": ["hash1", "hash2"]
}
```

### MERGE

Dimension merge:

```python
{
    "merged_dimensions": [0, 1],
    "new_dimension_id": 2,
    "composite_lineage": ["hash1", "hash2"]
}
```

### POTENTIAL

Potential injection:

```python
{
    "value": -1,
    "target": "HELLO"
}
```

### META

Metadata record (genesis):

```python
{
    "type": "genesis",
    "program": {"states": [...], "alignments": [...]}
}
```

## Chain Hashing

### Record Hash Calculation

```python
record_hash = hash(prev_hash + serialize_record(record))
```

Where:
- `prev_hash`: Previous record hash (or GENESIS_HASH for first record)
- `serialize_record`: Deterministic JSON serialization
- `hash`: Blake2s (32 bytes, hex-encoded to 64 chars)

### Genesis Hash

```python
GENESIS_HASH = "0" * 64  # 64 zeros
```

## Serialization

### JSON Format

Records are serialized as JSON lines:

```json
{"type":"OBSERVE","iteration":1,"timestamp":1234567890.0,"record_hash":"...","parent_hash":"...","dna_hash":"...","payload":{...},"prev_hash":"..."}
```

### Deterministic Serialization

- Sorted keys
- No whitespace
- Consistent formatting

## Storage

### File Format

Ledger stored as `.p0` file:
- JSON lines format
- One record per line
- Append-only

### File Locking

- Single writer enforced
- File lock prevents concurrent writes
- Fsync for durability (optional)

## Chain Integrity

### Verification

```python
is_valid, errors = ledger.verify()

if is_valid:
    print("Chain integrity verified")
else:
    for error in errors:
        print(f"Error: {error}")
```

### Checks

1. Genesis record is first
2. Each record's `prev_hash` matches previous `record_hash`
3. Record hashes are correct
4. Iteration order is correct

## Replay

### Deterministic Replay

Ledger can be replayed to reconstruct state:

```python
from zeroth.ledger.replay import replay_ledger

result = replay_ledger(ledger)
# Returns: ReplayResult with events, state_snapshots, errors
```

### State Reconstruction

Replay reconstructs VM state at each iteration:

```python
state_history = reconstruct_state(ledger)
# Returns: Dict[iteration, state]
```

## Signatures (Phase 8)

### Signature Fields

Records can include signatures:
- `signature_scheme`: "ed25519" or "secp256k1"
- `public_key`: Public key bytes (hex-encoded in JSON)
- `signature`: Signature bytes (hex-encoded in JSON)
- `event_hash`: Hash of canonical event bytes

### Signature Verification

```python
is_valid = ledger.verify_record_signature(record)
```

Verification:
1. Reconstruct canonical event bytes
2. Verify event hash matches
3. Verify signature using public key

## Integration

### With Phase 6

- Ledger format defined
- Storage implemented
- Replay implemented

### With Phase 7

- DNA hash in records
- Lineage tracking

### With Phase 8

- Signature storage
- Signature verification

### With Phase 9

- Protocol0 validation
- Chain integrity checks
