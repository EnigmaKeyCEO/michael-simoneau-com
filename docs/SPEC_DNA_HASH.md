# DNA Hash Specification

## Overview

DNA hashes are 64-bit hex-encoded identifiers for all Zeroth entities. They encode value, direction, lineage, price, and self-verify with checksum.

## Format

DNA hash is 16 hex characters (64 bits):

```
[ PARENT ][ CLASS ][ FIELD ][ ORIENT ][ PRICE ][ CHECK ]
  12 bits   4 bits  8 bits  12 bits  16 bits  16 bits
```

Total: 64 bits = 16 hex characters

## Segment Layout

### Parent Lineage (12 bits)

Compressed parent DNA hashes:
- Uses Blake2s (digest_size=2) to hash parent hashes
- Truncates to 12 bits
- Sorts parents before hashing (deterministic)

### Entity Class (4 bits)

Entity type:
- `0x00`: STATE
- `0x01`: DIMENSION
- `0x02`: OBSERVATION
- `0x03`: COLLAPSE
- `0x04`: POTENTIAL
- `0xFF`: META

### Field/Regime (8 bits)

8-bit field identifier.

### Orientation (12 bits)

6 signed-ternary axes packed into 12 bits:
- Each axis: 2 bits (-1, 0, +1)
- Encoding: -1 → 0b10, 0 → 0b00, +1 → 0b01
- Total: 6 axes × 2 bits = 12 bits

### Price (16 bits)

LAST TRADE PRICE (from Phase 0):
- Integer value
- Bounds: min=1, max=65535
- Part of checksum
- Self-verifying

### Checksum (16 bits)

Blake2s truncation:
- Includes all segments (including price)
- 16-bit checksum for verification
- Self-verifying

## Encoding

### Hex Encoding

DNA hash is hex-encoded for human readability:

```python
dna_hash = "A1B2C3D4E5F67890"  # 16 hex characters
```

### Price Encoding

Price is encoded as 16-bit integer:

```python
price = 1000  # Integer
price_bits = price & 0xFFFF  # 16 bits
```

## Decoding

### Decode DNA Hash

```python
from zeroth.crypto.dna import decode_dna

decoded = decode_dna("A1B2C3D4E5F67890")
# Returns:
# {
#     "parent_bits": 1234,
#     "klass": DNAClass.STATE,
#     "field": 1,
#     "orientation": [1, 0, -1, 0, 1, 0],
#     "price": 1000,
#     "checksum": 5678,
#     "checksum_valid": True
# }
```

## Verification

### Verify Checksum

```python
from zeroth.crypto.dna import verify_dna

is_valid = verify_dna("A1B2C3D4E5F67890")
# Returns True if checksum is valid
```

### Price Validation

Price is validated as part of checksum:

```python
decoded = decode_dna(dna_hash)
if decoded.checksum_valid:
    # Price is valid (part of checksum)
    assert 1 <= decoded.price <= 65535
```

## Examples

### State DNA Hash

```python
dna_hash = make_dna(
    klass=DNAClass.STATE,
    field=1,
    orientation=[1, 0, -1, 0, 1, 0],
    price=1000,
    parent_hashes=[]
)
# Returns: "A1B2C3D4E5F67890" (example)
```

### Observation DNA Hash

```python
dna_hash = make_dna(
    klass=DNAClass.OBSERVATION,
    field=2,
    orientation=[0, 1, -1, 1, 0, -1],
    price=5000,
    parent_hashes=["parent_hash_1", "parent_hash_2"]
)
```

## Integration with Phase 0

DNA hash includes price from Phase 0:
- Price segment: 16 bits
- Price bounds: min=1, max=65535
- Price in checksum: Self-verifying
- Price decay: Follows halflife

## Integration with Phase 7

DNA hash structure from Phase 7:
- Hex-encoded: 16 characters
- Positional: Orientation encodes direction
- Signed-ternary: -1, 0, +1 values
- Lineage-preserving: Parent references
- Self-verifying: Checksum validation
