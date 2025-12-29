# Phase 7: DNA Hashes (Hex, Positional, Signed-Ternary, with Price) - COMPLETED ✅

## Overview

Phase 7 implements the DNA hash concept in Zeroth (with PRICE from Phase 0):
- "Hash as Public Key" with positional categorical markers
- "Ledger as Value Store" (hash links to ledger entries)
- Hex-encoded (machine-dense + human-readable)
- Position-aware (segments encode meaning)
- Signed-ternary encoding (-1, 0, +1 in orientation)
- **LAST TRADE PRICE encoded as positional argument (from Phase 0)**
- Self-verifying (checksum includes price)
- Lineage-preserving (parent references)
- Composite lineage (for merges)
- Hash as economic object: ledger + lighthouse + price oracle + checksum + causal proof

This provides cryptographic identity and intrinsic value for all Zeroth entities.

## Status: ✅ COMPLETED - PRODUCTION READY

All components are fully implemented and tested. No stubs or placeholders.

---

## Implementation Details

### 1. DNA Core Module (`zeroth/crypto/dna.py`)

**Status:** ✅ Complete

**Implementation:**
- `DNAClass` enum:
  - `STATE = 0x00`
  - `DIMENSION = 0x01`
  - `OBSERVATION = 0x02`
  - `COLLAPSE = 0x03`
  - `POTENTIAL = 0x04`
  - `META = 0xFF`

- `DNAHash` dataclass (frozen):
  - `hex_string: str` - 16 hex characters
  - `parent_bits: int` - 12-bit parent lineage (reduced from 16)
  - `klass: DNAClass` - Entity class
  - `field: int` - 8-bit field/regime
  - `orientation: List[int]` - 6 signed-ternary axes (reduced from 8)
  - `price: int` - 16-bit LAST TRADE PRICE
  - `checksum: int` - 16-bit checksum (truncated to 8 bits for 64-bit total)
  - `checksum_valid: bool` - Verification result

- `make_dna(parents, klass, field, orientation_axes, price)` - Create DNA hash:
  - Validates price bounds (min=1, max=65535)
  - Folds parents to 12 bits
  - Packs orientation (6 axes × 2 bits = 12 bits)
  - Calculates checksum (includes price)
  - Returns hex string (16 characters, uppercase)

- `verify_dna(dna_hex)` - Verify checksum:
  - Extracts all segments
  - Recalculates checksum
  - Returns True if valid

- `decode_dna(dna_hex)` - Decode to components:
  - Extracts all segments
  - Unpacks orientation
  - Verifies checksum
  - Returns DNAHash structure

- `fold_parents(parent_hashes)` - Fold to 12 bits:
  - Uses Blake2s (digest_size=2)
  - Sorts parents (deterministic)
  - Truncates to 12 bits

- `checksum16(data)` - Calculate 16-bit checksum:
  - Blake2s truncation
  - Returns 16-bit value (truncated to 8 bits for 64-bit total)

**Key Features:**
- Bit layout: parent(12) + class(8) + field(8) + orient(12) + price(16) + check(8) = 64 bits
- Deterministic (same inputs → same hash)
- Immutable (cannot be modified)
- Self-verifying (checksum validation)
- Price bounds enforced

---

### 2. Position Module (`zeroth/crypto/position.py`)

**Status:** ✅ Complete

**Implementation:**
- `encode_ternary(value)` - Encode single value to 2 bits:
  - -1 → 0b10 (2)
  - 0 → 0b00 (0)
  - +1 → 0b01 (1)

- `decode_ternary(bits)` - Decode 2-bit value:
  - 0b10 → -1
  - 0b00 → 0
  - 0b01 → +1

- `pack_ternary_vector(values, max_length=6)` - Pack 6 axes:
  - Returns 12-bit packed integer
  - Reduced from 8 axes to accommodate PRICE

- `unpack_ternary_vector(packed, length=6)` - Unpack to 6 axes:
  - Returns list of 6 signed-ternary values

- `pack_orientation(axes)` - Alias for pack_ternary_vector
- `unpack_orientation(bits)` - Alias for unpack_ternary_vector
- `validate_ternary(value)` - Validate value in {-1, 0, 1}
- `validate_orientation(axes)` - Validate 6 axes

**Key Features:**
- 6 axes (reduced from 8 to accommodate PRICE)
- 2 bits per axis (12 bits total)
- Deterministic encoding

---

### 3. Lineage Module (`zeroth/crypto/lineage.py`)

**Status:** ✅ Complete

**Implementation:**
- `LineageNode` dataclass:
  - `dna_hash: str`
  - `parent_hashes: List[str]`
  - `composite: bool` - True if from merge

- `create_lineage(parent_hashes)` - Create lineage hash:
  - Folds parents to 12 bits
  - Returns hex string (for display)

- `create_composite_lineage(parent_lineages)` - Composite lineage:
  - Preserves all parent information
  - Used for merge events
  - Returns sorted list of unique hashes

- `trace_lineage(dna_hash, lineage_map)` - Trace ancestry:
  - Traces back to genesis
  - Returns list of DNA hashes

- `get_parents(dna_hash, lineage_map)` - Get direct parents:
  - Returns list of parent DNA hashes

- `LineageTracker` class:
  - `compress_lineage()` - Compress to 12 bits
  - `get_lineage_depth()` - Get depth
  - `merge_lineages()` - Merge two lineages
  - `register_node()` - Register lineage node
  - `get_node()` - Get node by hash

**Key Features:**
- Composite lineage preserves all parents
- Lineage tracing works backwards
- Deterministic lineage creation
- 12-bit compression (reduced from 16)

---

### 4. Registry Module (`zeroth/crypto/registry.py`)

**Status:** ✅ Complete

**Implementation:**
- `DNARegistry` class:
  - `_hash_to_entity: Dict[str, Any]` - DNA hash → entity
  - `_entity_to_hash: Dict[Any, str]` - Entity → DNA hash
  - Thread-safe (uses locks)

- `register(dna_hash, entity)` - Register mapping:
  - Bidirectional mapping
  - Thread-safe

- `get_entity(dna_hash)` - Get entity by hash
- `get_hash(entity)` - Get hash by entity
- `get_all_hashes()` - Get all registered hashes
- `unregister(dna_hash)` - Unregister hash
- `clear()` - Clear all registrations
- `has_hash(dna_hash)` - Check if registered
- `count()` - Get registration count

**Key Features:**
- Bidirectional mapping
- Fast lookup (O(1))
- Thread-safe

---

### 5. VM Integration (`zeroth/vm/vm.py` - Updated)

**Status:** ✅ Complete

**Implementation:**
- `ZerothVM` includes `dna_registry: DNARegistry` attribute
- `create_state_dna(state_name, parent_hashes)` - Create STATE DNA:
  - Field based on convergence regime
  - Orientation based on state divergence
  - Price from hash if available

- `create_dimension_dna(dimension_id, parent_hashes)` - Create DIMENSION DNA:
  - Field based on dimension properties
  - Orientation based on dimension vector
  - Price default minimum

- `create_collapse_dna(convergence_value, parent_hashes)` - Create COLLAPSE DNA:
  - Field based on convergence value
  - Orientation converged (all zeros)
  - Price = 1 (converged)

- `create_potential_dna(value, target, parent_hashes)` - Create POTENTIAL DNA:
  - Field based on system state
  - Orientation based on potential value (-1)
  - Price default minimum

- States get DNA hashes on initialization
- DNA hashes registered in registry

**Key Features:**
- DNA hashes created when entities are created
- Parent hashes link to previous entities
- Orientation reflects entity state
- Field reflects regime/condition

---

### 6. Observer Integration (`zeroth/observe/observer.py` - Updated)

**Status:** ✅ Complete

**Implementation:**
- `ObservationRecord` includes `dna_hash: str` field
- `observe()` method updated:
  - Creates DNA hash for observation
  - Includes in observation record
  - Parent: Previous observation or collapse
  - Field: Based on convergence
  - Orientation: Based on dominant state
  - Price: From observation parameters

**Key Features:**
- Each observation gets DNA hash
- Parent links to previous events
- DNA hash stored in observation record

---

### 7. Tokenizer Integration (`zeroth/vm/tokenizer.py` - Updated)

**Status:** ✅ Complete

**Implementation:**
- `Dimension` includes `dna_hash: str` field
- `grow_dimension()` updated:
  - Creates DNA hash for new dimension
  - Registers in DNA registry
  - Parent hashes from existing dimensions

- `merge_dimensions()` updated:
  - Creates composite lineage from merged dimensions
  - Creates DNA hash for merged dimension
  - Composite lineage includes both parent dimension hashes
  - Stores DNA hash in merged dimension

**Key Features:**
- Merges create composite lineage
- All parent dimension hashes preserved
- New dimensions get DNA hashes

---

### 8. Ledger Integration (`zeroth/ledger/ledger.py` - Updated)

**Status:** ✅ Complete

**Implementation:**
- `LedgerRecord` includes `dna_hash: str` field (already in format)
- All append methods updated:
  - `append_observe()`: Include observation DNA hash
  - `append_collapse()`: Include collapse DNA hash
  - `append_merge()`: Include merge DNA hash
  - `append_potential()`: Include potential DNA hash

- `get_record_by_dna(dna_hash)` - New method:
  - Get ledger record by DNA hash
  - Content-addressed lookup
  - Returns record or None

**Key Features:**
- DNA hashes link ledger records to entities
- Content-addressed lookup by DNA hash
- DNA hash stored in every record

---

### 9. CLI Integration (`zeroth/cli.py` - Updated)

**Status:** ✅ Complete

**Implementation:**
- `cmd_dna_decode(args)` - Decode DNA hash:
  - Shows all components
  - Shows price
  - Shows checksum validity

- `cmd_dna_verify(args)` - Verify DNA hash:
  - Shows decoded components
  - Shows checksum validation result

- `cmd_dna_lineage(args)` - Trace lineage:
  - Shows ancestry chain
  - Uses ledger for lookup

**Key Features:**
- Commands use control client
- Display formatted output
- Error handling

---

### 10. Control Server Integration (`zeroth/control/server.py` and `zeroth/runner/runner.py` - Updated)

**Status:** ✅ Complete

**Implementation:**
- `handle_dna_decode(hash)` - Decode DNA hash
- `handle_dna_verify(hash)` - Verify DNA hash
- `handle_dna_lineage(hash)` - Trace lineage

**Key Features:**
- Commands routed to runner handlers
- JSON response format
- Error handling

---

## DNA Hash Bit Layout

### Structure

```
[ PARENT ][ CLASS ][ FIELD ][ ORIENT ][ PRICE ][ CHECK ]
  12 bits   8 bits   8 bits   12 bits   16 bits   8 bits
```

**Total: 64 bits = 16 hex characters**

Note: Checksum is 8 bits (truncated from 16-bit Blake2s) to fit in 64-bit total.

### Hex Representation Example

```
000000004903E812
^^^^^^^^^^^^^^^^
│     │   │   │     │     └─ checksum (8 bits, truncated)
│     │   │   │     └─────── price (16 bits, LAST TRADE PRICE)
│     │   │   └─────────────── orientation (6 axes × 2 bits = 12 bits)
│     │   └─────────────────── field/regime byte (8 bits)
│     └─────────────────────── class/category byte (8 bits)
└───────────────────────────── parent lineage (12 bits)
```

---

## DNA Hash Generation Examples

### State DNA Hash

```python
state_dna = make_dna(
    parents=[],  # Genesis state
    klass=DNAClass.STATE,
    field=0x00,  # Low convergence
    orientation_axes=[1, -1, 0, 1, 0, 0],  # State divergence (6 axes)
    price=1000  # LAST TRADE PRICE
)
# Result: "000000004903E812"
```

### Observation DNA Hash

```python
obs_dna = make_dna(
    parents=[state_dna],  # Parent state
    klass=DNAClass.OBSERVATION,
    field=0x7F,  # Medium convergence
    orientation_axes=[1, 0, 0, 0, 0, 0],  # Dominant state (6 axes)
    price=950  # Decayed price
)
```

### Collapse DNA Hash

```python
collapse_dna = make_dna(
    parents=[state_dna, obs_dna],  # Multiple parents
    klass=DNAClass.COLLAPSE,
    field=0xFF,  # High convergence (truth)
    orientation_axes=[0, 0, 0, 0, 0, 0],  # Converged (6 axes)
    price=1  # Converged (minimum)
)
```

### Merge DNA Hash (Composite Lineage)

```python
dim1_dna = "D0E63B4D7F6C0A25"
dim2_dna = "E9F54C5E8G7D1B36"

# Composite lineage
composite_parents = create_composite_lineage([dim1_dna, dim2_dna])

merge_dna = make_dna(
    parents=composite_parents,  # Composite lineage
    klass=DNAClass.DIMENSION,
    field=0x7F,
    orientation_axes=[1, 1, 0, 0, 0, 0]  # Merged vector (6 axes)
)
```

---

## Testing

### Unit Tests Performed

✅ **DNA Core:**
- Hash generation works
- Verification works
- Decode works
- Checksum validation correct
- Price bounds enforced

✅ **Position:**
- Ternary encoding/decoding works
- Pack/unpack works (6 axes)
- Validation works

✅ **Lineage:**
- Lineage creation works
- Composite lineage works
- Lineage tracing works
- Parent folding works (12 bits)

✅ **Registry:**
- Registration works
- Lookup works
- Bidirectional mapping works
- Thread-safe

✅ **Integration:**
- States get DNA hashes
- Dimensions get DNA hashes
- Collapses get DNA hashes
- Potential gets DNA hashes
- Observations get DNA hashes
- Merges create composite lineage
- Ledger records include DNA hashes
- Lookup by DNA hash works

---

## Files Created/Modified

### New Files:
- `zeroth/crypto/registry.py` - DNA hash registry

### Modified Files:
- `zeroth/crypto/dna.py` - Complete rewrite with Phase 7 specification
- `zeroth/crypto/position.py` - Updated for 6 axes (reduced from 8)
- `zeroth/crypto/lineage.py` - Updated with composite lineage support
- `zeroth/crypto/__init__.py` - Updated exports
- `zeroth/vm/vm.py` - DNA hash creation methods, registry integration
- `zeroth/vm/tokenizer.py` - DNA hash creation for dimensions and merges
- `zeroth/observe/observer.py` - DNA hash in observation records
- `zeroth/ledger/ledger.py` - DNA hash in all record types, lookup by DNA
- `zeroth/cli.py` - DNA commands (decode, verify, lineage)
- `zeroth/control/server.py` - DNA command handlers
- `zeroth/runner/runner.py` - DNA command handlers

---

## Integration Points

### With Phase 0 (Intrinsic Value)
- ✅ DNA hash structure with PRICE segment (16 bits)
- ✅ Price encoding/decoding functions
- ✅ Price bounds enforcement (min=1, max=65535)
- ✅ Price in checksum calculation
- ✅ Reduced parent (16→12 bits) and orientation (8→6 axes) to accommodate price

### With Phase 2 (VM Core)
- ✅ States get DNA hashes
- ✅ Dimensions get DNA hashes
- ✅ Collapses get DNA hashes
- ✅ Potential injections get DNA hashes

### With Phase 5 (Observer)
- ✅ Observations get DNA hashes
- ✅ DNA hashes stored in observation records

### With Phase 6 (Ledger)
- ✅ Ledger records include DNA hashes
- ✅ Content-addressed lookup by DNA hash

### With Phase 8 (Signing)
- ⏳ DNA hashes used for signing (ready)
- ⏳ Signed DNA events (ready)

### With Phase 9 (Protocol0)
- ⏳ DNA hashes used for validation (ready)
- ⏳ Lineage verification (ready)

---

## Example Usage

### Create DNA Hash

```python
from zeroth.crypto.dna import make_dna, DNAClass

dna_hash = make_dna(
    parents=[],
    klass=DNAClass.STATE,
    field=0x00,
    orientation_axes=[1, -1, 0, 1, 0, 0],
    price=1000
)
# Result: "000000004903E812"
```

### Decode DNA Hash

```python
from zeroth.crypto.dna import decode_dna

decoded = decode_dna("000000004903E812")
print(f"Class: {decoded.klass.name}")
print(f"Price: {decoded.price}")
print(f"Orientation: {decoded.orientation}")
```

### Verify DNA Hash

```python
from zeroth.crypto.dna import verify_dna

is_valid = verify_dna("000000004903E812")
print(f"Valid: {is_valid}")
```

### CLI Commands

```bash
# Decode DNA hash
$ zeroth dna-decode 000000004903E812
DNA Hash: 000000004903E812
  Parent: 000 (12 bits)
  Class: STATE (0x00)
  Field: 0x00 (0)
  Orientation: [1, -1, 0, 1, 0, 0]
  Price: 1000 (LAST TRADE PRICE)
  Checksum: 12 (Valid ✓)

# Verify DNA hash
$ zeroth dna-verify 000000004903E812
DNA Hash: 000000004903E812
  Parent: 000 (12 bits)
  Class: STATE (0x00)
  Field: 0x00
  Orientation: [1, -1, 0, 1, 0, 0] (6 axes)
  Price: 1000 (LAST TRADE PRICE: 1000)
  Checksum: 12 (includes price)
Checksum: Valid ✓

# Trace lineage
$ zeroth dna-lineage 000000004903E812
Lineage for 000000004903E812:
  └─ 000000004903E812 (STATE)
```

---

## Performance Considerations

- **Hash generation**: O(1) per hash
- **Parent folding**: O(n) where n = number of parents
- **Checksum calculation**: O(1)
- **Verification**: O(1)
- **Decode**: O(1)
- **Registry lookup**: O(1) with dict

### Optimizations

- **Caching**: Cache decoded DNA hashes
- **Lazy decoding**: Decode only when needed
- **Registry indexing**: Fast entity lookup

---

## Error Handling

✅ **Implemented:**
- Invalid hex string: Returns None, doesn't crash
- Invalid length: Validates 16 hex characters
- Invalid checksum: Verification fails gracefully
- Invalid ternary values: Validates -1, 0, 1 only
- Invalid class: Validates enum values
- Price out of bounds: Raises ValueError with clear message

---

## Summary

Phase 7 is **COMPLETE** and **PRODUCTION READY**. All components are fully implemented with:
- ✅ No stubs or placeholders
- ✅ Complete DNA hash engine (DNAClass, make_dna, verify_dna, decode_dna)
- ✅ Complete position module (6 axes, signed-ternary encoding)
- ✅ Complete lineage module (composite lineage, tracing)
- ✅ Complete registry module (bidirectional mapping, thread-safe)
- ✅ VM integration (states, dimensions, collapses, potential get DNA hashes)
- ✅ Observer integration (observations get DNA hashes)
- ✅ Tokenizer integration (dimensions and merges get DNA hashes)
- ✅ Ledger integration (all records include DNA hashes, lookup by DNA)
- ✅ CLI commands (decode, verify, lineage)
- ✅ Control server integration (command handlers)
- ✅ Price integration (from Phase 0, bounds enforced, in checksum)
- ✅ All tests passing

The DNA hash system provides cryptographic identity and intrinsic value for all Zeroth entities. Ready to proceed to Phase 8.

---

## Next Steps

After completing Phase 7, proceed to:
**PHASE_8.plan.md** — DNA-Backed Observation Signing (Ed25519 + secp256k1)

Phase 7 provides the complete DNA hash infrastructure needed for:
- Phase 8: Signing (DNA hashes ready)
- Phase 9: Protocol0 validation (lineage verification ready)
