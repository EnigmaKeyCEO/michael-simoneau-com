# Intrinsic Value Specification

## Overview

This document specifies the intrinsic value mechanism for Zeroth, based on the THTH.MD principles. The mechanism encodes LAST TRADE PRICE directly into DNA hashes, making value intrinsic rather than assigned.

## Core Principles

### 1. Value as Positional Argument

Value in Zeroth is not assigned externally. It is encoded as a **positional argument** in the DNA hash structure itself. This makes the hash an economic object that combines:

- **Ledger** - What happened
- **Lighthouse** - What is currently viable
- **Price Oracle** - Last trade price
- **Checksum** - State verification
- **Causal Proof** - Lineage and history

### 2. Integer-Only Economics

Zeroth forbids decimals. This is mathematically necessary because:

- Zeroth states are discrete: `-1, 0, +1`
- Convergence is exact
- `-0 = +0`
- Partial value has no meaning in a convergent system

**LAST TRADE PRICE is an integer** - no fractions, no rounding games, no floating-point values.

### 3. Enforced Bounds

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
- Any transaction below 1:
  - Is burned
  - Reinforces decay
  - Cannot mint forward value

This guarantees:
- No dust
- No spam
- No meaningless churn

### 4. Living Value (Price Decay)

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

### 5. Self-Verification

The price is part of the DNA hash checksum. This means:

- Price cannot be tampered with without invalidating the hash
- Price is cryptographically bound to the hash structure
- Verification of hash integrity includes price verification

## DNA Hash Structure

### Bit Allocation

The DNA hash structure (64 bits total) includes PRICE as a positional segment:

```
[ PARENT ][ CLASS ][ FIELD ][ ORIENT ][ PRICE ][ CHECK ]
  12 bits   8 bits   8 bits   12 bits   16 bits   16 bits
```

### PRICE Segment (16 bits)

- **Position**: Bits 40-55 (0-indexed from left)
- **Range**: 0-65,535 (enforced minimum = 1)
- **Encoding**: Direct integer encoding
- **Decay**: Participates in halflife decay
- **Verification**: Included in checksum calculation

### Hex Representation Example

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

## Price Encoding Rules

### Encoding

1. **Input Validation**: Price must be an integer
2. **Bounds Checking**: `1 <= price <= 65535`
3. **Clamping**: Out-of-range values are clamped to bounds
4. **Encoding**: Direct 16-bit integer encoding

### Decoding

1. **Extraction**: Extract 16 bits from DNA hash
2. **Conversion**: Convert to integer
3. **Validation**: Verify bounds (should always pass if hash is valid)

### Decay

1. **Formula**: `P(t) = floor(P₀ × 2^(-t / τ))`
2. **Minimum**: Decayed price cannot go below 0
3. **Burn Threshold**: Price < 1 triggers burn
4. **Reinforcement**: Reinforcement resets decay clock

## Economic Primitives

### Integer-Only Economics

- All values are integers
- No decimal operations
- Transactions < 1 are burned
- No fractional minting

### Price Bounds

- Minimum: 1 (enforced)
- Maximum: 65,535 (enforced by bit width)
- Out-of-range values are clamped

### Price Decay

- Decays via halflife mechanism
- Formula: `P(t) = floor(P₀ × 2^(-t / τ))`
- Price < 1 triggers burn
- Reinforcement resets decay clock

### Intrinsic Value Calculation

Intrinsic value is calculated from:

1. **Price**: LAST TRADE PRICE (decaying)
2. **Decay State**: Current decay level
3. **Lineage**: Parent hash relationships
4. **Convergence**: Convergence state

Intrinsic value is **not market-based**. It is calculated from the hash's structural properties.

## Integration Points

### DNA Hash Construction

When constructing a DNA hash:

1. Price must be provided as parameter
2. Price is validated (bounds checking)
3. Price is encoded into 16-bit segment
4. Price is included in checksum calculation

### VM Core

The VM must:

1. Track price for all hashes/blocks
2. Apply price decay on each iteration
3. Check burn conditions (price < 1)
4. Reset decay clock on reinforcement

### Convergence

On convergence:

1. Price → 0
2. Hash ceases to be value-bearing
3. Block may be deleted (value-wise)
4. Wrapper contracts burn remaining supply

### Observation

Observations record:

1. Price at observation time
2. Price evolution over time
3. Price decay history
4. Price reinforcement events

### Ledger

Ledger records include:

1. Price in DNA hash
2. Price history
3. Price decay events
4. Price reinforcement events

### Protocol0 Validation

Protocol0 validates:

1. Price bounds (min=1, max=65535)
2. Price decay consistency
3. Price in checksum
4. Price reinforcement rules

### Swap Mechanism (Phase 14)

The swap mechanism enforces intrinsic value through:

1. **Minimum Price Constraint**: 1 WTHTH = minimum 1 USDC
2. **Swap Price Updates**: Swap price becomes LAST TRADE PRICE
3. **Price Propagation**: Swap price updates propagate to DNA hashes
4. **System-Based Value**: Value comes from Zeroth mechanics, not markets

See **SPEC_SWAP.md** for complete swap specification.

## Examples

### Example 1: Price Encoding

```python
# Encode price
price = 1000
encoded = encode_price(price)  # Returns 1000 (16-bit)

# Decode price
decoded = decode_price(encoded)  # Returns 1000
```

### Example 2: Price Decay

```python
# Initial price
P0 = 1000
halflife = 100  # iterations

# After 100 iterations (one halflife)
P100 = apply_price_decay(P0, 100, 100)  # Returns 500

# After 200 iterations (two halflives)
P200 = apply_price_decay(P0, 200, 100)  # Returns 250
```

### Example 3: Price Bounds

```python
# Valid price
validate_price(1)    # Returns True
validate_price(65535) # Returns True

# Invalid prices (clamped)
encode_price(0)      # Clamped to 1
encode_price(100000) # Clamped to 65535
```

### Example 4: Burn Detection

```python
# Price below burn threshold
burn_price(0)   # Returns True
burn_price(1)   # Returns False

# Decayed price below threshold
decayed = apply_price_decay(10, 1000, 10)  # Returns 0
burn_price(decayed)  # Returns True
```

## Implementation Notes

### Phase 0 (Foundation)

- Define price encoding/decoding functions
- Define price bounds and decay rules
- Create economic primitives module
- Document intrinsic value mechanism

### Phase 7 (DNA Hashes)

- Implement price encoding in DNA hash construction
- Include price in checksum calculation
- Update DNA hash structure to include PRICE segment

### Phase 2 (VM Core)

- Track price for hashes/blocks
- Apply price decay on iterations
- Check burn conditions
- Reset decay clock on reinforcement

### Phase 9 (Protocol0)

- Validate price bounds
- Validate price decay consistency
- Verify price in checksum
- Enforce price reinforcement rules

## References

- **THTH.MD**: Core intrinsic value principles
- **PHASE_0.plan.md**: Phase 0 implementation plan
- **PHASE_7.plan.md**: DNA hash implementation (includes price)
- **PHASE_2.plan.md**: VM core (includes price tracking)
