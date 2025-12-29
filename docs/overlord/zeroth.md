# Zeroth: A Living Cryptographic Economy

**Version 1.0**  
**December 01 2025**

## Abstract

Zeroth is a revolutionary cryptographic system where value is intrinsic, not assigned. Unlike traditional cryptocurrencies that derive value from scarcity, mining costs, or social consensus, Zeroth encodes value directly into cryptographic hashes through positional price arguments. This creates a self-verifying economic system where every hash carries its price, every block remembers its worth, and value emerges from mathematical truth rather than market speculation.

## 1. Introduction

### 1.1 The Problem with Traditional Cryptocurrencies

Traditional cryptocurrencies face fundamental limitations:

- **Value is assigned, not intrinsic**: Market prices reflect speculation, not mathematical truth
- **No self-verification**: External oracles and price feeds are required
- **Infinite growth assumption**: Supply often grows without bound
- **Decentralization trade-offs**: Consensus mechanisms create centralization pressures

### 1.2 The Zeroth Solution

Zeroth solves these problems by making value **intrinsic** to the cryptographic structure itself. Every DNA hash encodes:

- **Ledger**: What happened
- **Lighthouse**: What is currently viable
- **Price Oracle**: Last trade price (encoded in hash)
- **Checksum**: State verification
- **Causal Proof**: Lineage and history

Value is not assigned externally—it is **positional** in the hash structure.

## 2. Core Principles

### 2.1 Value as Positional Argument

Value in Zeroth is encoded as a **positional argument** in the DNA hash structure. The hash itself becomes an economic object that combines multiple functions:

- **Ledger**: Historical record of events
- **Lighthouse**: Current viable state
- **Price Oracle**: Last trade price embedded in hash
- **Checksum**: Cryptographic verification
- **Causal Proof**: Parent-child relationships

This makes value **self-verifying**—you cannot tamper with price without invalidating the hash.

### 2.2 Integer-Only Economics

Zeroth forbids decimals. This is mathematically necessary because:

- Zeroth states are discrete: `-1, 0, +1`
- Convergence is exact: `-0 = +0`
- Partial value has no meaning in a convergent system
- LAST TRADE PRICE is an integer—no fractions, no rounding games

**All economic operations use integers only.**

### 2.3 Enforced Bounds

#### Maximum Value

The LAST TRADE PRICE occupies a **fixed 16-bit segment** in the DNA hash:

- Maximum representable price: **65,535** (2^16 - 1)
- No infinite valuation
- No overflow
- No runaway speculation

The protocol does not allow irrational exuberance.

#### Minimum Value

The system enforces:

- Minimum price: **1**
- Any transaction below 1 is burned
- Reinforces decay
- Cannot mint forward value

This guarantees:
- No dust
- No spam
- No meaningless churn

### 2.4 Living Value (Price Decay)

The LAST TRADE PRICE is **not static**. It participates in:

- Halflife decay
- Convergence pressure
- Lineage reinforcement rules

**Decay Formula:**

```
P(t) = floor(P₀ × 2^(-t / τ))
```

Where:
- `P(t)` = Price at time t
- `P₀` = Initial price
- `t` = Iterations elapsed
- `τ` = Halflife (iterations)

**Consequences:**

- Idle blocks lose value
- Overused blocks decay faster
- Meaningless trading destroys value
- Only reinforced, relevant usage sustains value

This is not inflationary. This is **metabolic**.

### 2.5 Self-Verification

The price is part of the DNA hash checksum. This means:

- Price cannot be tampered with without invalidating the hash
- Price is cryptographically bound to the hash structure
- Verification of hash integrity includes price verification

## 3. DNA Hash System

### 3.1 Structure

DNA hashes are 64-bit hex-encoded identifiers for all Zeroth entities. They encode value, direction, lineage, price, and self-verify with checksum.

**Format:**

```
[ PARENT ][ CLASS ][ FIELD ][ ORIENT ][ PRICE ][ CHECK ]
  12 bits   4 bits  8 bits  12 bits  16 bits  16 bits
```

Total: 64 bits = 16 hex characters

### 3.2 Segment Layout

#### Parent Lineage (12 bits)

Compressed parent DNA hashes:
- Uses Blake2s (digest_size=2) to hash parent hashes
- Truncates to 12 bits
- Sorts parents before hashing (deterministic)

#### Entity Class (4 bits)

Entity type:
- `0x00`: STATE
- `0x01`: DIMENSION
- `0x02`: OBSERVATION
- `0x03`: COLLAPSE
- `0x04`: POTENTIAL
- `0xFF`: META

#### Field/Regime (8 bits)

8-bit field identifier.

#### Orientation (12 bits)

6 signed-ternary axes packed into 12 bits:
- Each axis: 2 bits (-1, 0, +1)
- Encoding: -1 → 0b10, 0 → 0b00, +1 → 0b01
- Total: 6 axes × 2 bits = 12 bits

#### Price (16 bits)

LAST TRADE PRICE:
- Integer value
- Bounds: min=1, max=65535
- Part of checksum
- Self-verifying

#### Checksum (16 bits)

Blake2s truncation:
- Includes all segments (including price)
- 16-bit checksum for verification
- Self-verifying

### 3.3 Hex Representation Example

```
A3F9  1C  0A  7E4B  9D21  5F3A
^^^^  ^^  ^^  ^^^^  ^^^^  ^^^^
│     │   │   │     │     └─ checksum (includes price)
│     │   │   │     └─────── price (16 bits, LAST TRADE PRICE = 40225)
│     │   │   └─────────────── orientation (6 axes × 2 bits)
│     │   └─────────────────── field/regime byte
│     └─────────────────────── class/category byte
└───────────────────────────── parent lineage (12 bits)
```

## 4. Runtime Model

### 4.1 Iteration Loop

Time in Zeroth is measured in iterations, not wall-clock time. Each iteration represents one computational step.

```python
# Infinite loop
while True:
    vm.step()  # One iteration
    iteration_count += 1
```

### 4.2 Convergence Detection

Each iteration, the VM checks for convergence:

```python
if convergence < epsilon:
    # System has converged
    record_truth()  # Create collapse record
    inject_potential()  # Reinject -1 to continue
```

### 4.3 Memory and Decay

#### Divergence Vectors

Memory stores divergence vectors `D` for each state:

```python
memory.D = [d₁, d₂, ..., dₙ]  # Divergence for each state
```

#### Normalization

Memory is normalized to preserve "truth is 0" equilibrium:

```python
total = sum(memory.D)
adjustment = total / len(memory.D)
memory.D = [d - adjustment for d in memory.D]
```

#### Halflife Decay

All value-bearing entities decay according to halflife:

```
W(H, t) = floor(W₀ × 2^(-t / τ))
```

Where:
- `W₀` = initial weight
- `t` = iterations elapsed
- `τ` = halflife (iterations)

### 4.4 Convergence Calculation

Convergence is calculated from token distribution entropy:

```python
convergence = 1 - (entropy / max_entropy)
```

Where entropy measures distribution uniformity.

### 4.5 10% Delta Rule

For mint eligibility, convergence delta must be ≥ 10%:

```python
delta = C_after - C_before
if delta >= 0.10:
    # Mint eligible
```

### 4.6 Potential Injection

Potential (-1) is injected when:
1. System converges (convergence < epsilon)
2. After recording truth (collapse)

Potential value is -1 (not 0) to:
- Provide directional information
- Distinguish from absence
- Enable continued existence

## 5. Economic Primitives

### 5.1 Integer-Only Economics

- All values are integers
- No decimal operations
- Transactions < 1 are burned
- No fractional minting

### 5.2 Price Bounds

- Minimum: 1 (enforced)
- Maximum: 65,535 (enforced by bit width)
- Out-of-range values are clamped

### 5.3 Price Decay

- Decays via halflife mechanism
- Formula: `P(t) = floor(P₀ × 2^(-t / τ))`
- Price < 1 triggers burn
- Reinforcement resets decay clock

### 5.4 Intrinsic Value Calculation

Intrinsic value is calculated from:

1. **Price**: LAST TRADE PRICE (decaying)
2. **Decay State**: Current decay level
3. **Lineage**: Parent hash relationships
4. **Convergence**: Convergence state

Intrinsic value is **not market-based**. It is calculated from the hash's structural properties.

## 6. Architecture

### 6.1 VM Core

The Zeroth VM implements a living computational system where value is intrinsic, not assigned. The system evolves through iterations, with convergence, decay, and reinforcement driving its dynamics.

### 6.2 Memory System

Memory persists across:
- Iterations
- Observations
- Hot swaps (if states match)

### 6.3 Field Dynamics

#### Dimension Growth

Dimensions grow when convergence is low:

```python
if convergence < growth_threshold:
    # Create new dimension
    create_dimension()
```

#### Dimension Merge

Dimensions merge when signs align:

```python
if signs_aligned(dim1, dim2):
    merge_dimensions(dim1, dim2)
```

#### Dimension Decay

Dimensions decay when mean absolute value → 0:

```python
mean_abs = mean(|dimension.vector|)
if mean_abs < decay_threshold:
    dimension.active = False
```

## 7. Key Invariants

1. **Truth is 0**: Memory divergence sums to 0
2. **Decay is monotonic**: Weight/price never increase without reinforcement
3. **Convergence is bounded**: 0 ≤ convergence ≤ 1.1 (allows observation pressure)
4. **Price is bounded**: 1 ≤ price ≤ 65535
5. **Integer-only**: All values are integers
6. **No deletions**: Forgetting is convergence to 0, not deletion

## 8. Technical Specifications

### 8.1 DNA Hash Encoding

```python
from zeroth.crypto.dna import make_dna, decode_dna, verify_dna

# Create DNA hash
dna_hash = make_dna(
    klass=DNAClass.STATE,
    field=1,
    orientation=[1, 0, -1, 0, 1, 0],
    price=1000,
    parent_hashes=[]
)

# Decode DNA hash
decoded = decode_dna(dna_hash)
# Returns: {
#     "parent_bits": 1234,
#     "klass": DNAClass.STATE,
#     "field": 1,
#     "orientation": [1, 0, -1, 0, 1, 0],
#     "price": 1000,
#     "checksum": 5678,
#     "checksum_valid": True
# }

# Verify checksum
is_valid = verify_dna(dna_hash)
```

### 8.2 Price Decay Example

```python
# Initial price
P0 = 1000
halflife = 100  # iterations

# After 100 iterations (one halflife)
P100 = apply_price_decay(P0, 100, 100)  # Returns 500

# After 200 iterations (two halflives)
P200 = apply_price_decay(P0, 200, 100)  # Returns 250
```

## 9. Conclusion

Zeroth represents a fundamental shift in how we think about cryptographic value. By encoding price directly into hash structures, Zeroth creates a self-verifying economic system where value is intrinsic, not assigned. The system's metabolic nature—where value decays and converges—ensures that only meaningful, reinforced usage sustains value over time.

This is not inflationary mining. This is **living computation** where value emerges from mathematical truth encoded in cryptographic structures.

## References

- **SPEC_INTRINSIC_VALUE.md**: Core intrinsic value mechanism
- **SPEC_DNA_HASH.md**: DNA hash structure specification
- **RUNTIME_MODEL.md**: VM operation and iteration model
- **End_Goal_GOLD/Zeroth GOLD #1.txt**: Vision and goals

---

**Zeroth Whitepaper v1.0**  
For more information, visit: https://0thth.com/whitepapers
