# Zeroth Runtime Model

## Overview

The Zeroth VM implements a living computational system where value is intrinsic, not assigned. The system evolves through iterations, with convergence, decay, and reinforcement driving its dynamics.

## Iteration Loop

### Time = Iteration Count

Time in Zeroth is measured in iterations, not wall-clock time. Each iteration represents one computational step.

```python
# Infinite loop
while True:
    vm.step()  # One iteration
    iteration_count += 1
```

### Convergence Detection

Each iteration, the VM checks for convergence:

```python
if convergence < epsilon:
    # System has converged
    record_truth()  # Create collapse record
    inject_potential()  # Reinject -1 to continue
```

## Memory and Decay

### Divergence Vectors

Memory stores divergence vectors `D` for each state:

```python
memory.D = [d₁, d₂, ..., dₙ]  # Divergence for each state
```

### Normalization

Memory is normalized to preserve "truth is 0" equilibrium:

```python
total = sum(memory.D)
adjustment = total / len(memory.D)
memory.D = [d - adjustment for d in memory.D]
```

### Halflife Decay

All value-bearing entities decay according to halflife:

```
W(H, t) = floor(W₀ × 2^(-t / τ))
```

Where:
- `W₀` = initial weight
- `t` = iterations elapsed
- `τ` = halflife (iterations)

### Price Decay

Price also decays according to halflife (from Phase 0):

```
P(t) = floor(P₀ × 2^(-t / τ))
```

Price → 0 on convergence.

## Convergence

### Convergence Calculation

Convergence is calculated from token distribution entropy:

```python
convergence = 1 - (entropy / max_entropy)
```

Where entropy measures distribution uniformity.

### 10% Delta Rule

For mint eligibility, convergence delta must be ≥ 10%:

```python
delta = C_after - C_before
if delta >= 0.10:
    # Mint eligible
```

### Observation Pressure

Observation adds pressure to convergence:

```python
effective_convergence = field_convergence + observation_pressure
```

Observation pressure is bounded: `0 ≤ obs_pressure ≤ 0.1`

### Epsilon Threshold

When convergence < epsilon, system has converged:

```python
if convergence < epsilon:
    # Converged - trigger collapse
```

## Potential Injection

### When Potential is Injected

Potential (-1) is injected when:
1. System converges (convergence < epsilon)
2. After recording truth (collapse)

### Why -1

Potential value is -1 (not 0) to:
- Provide directional information
- Distinguish from absence
- Enable continued existence

### Loop Continuation

Potential injection prevents system termination:

```python
if converged:
    record_truth()  # Collapse
    inject_potential(-1)  # Reinject
    # System continues
```

## Field Dynamics

### Dimension Growth

Dimensions grow when convergence is low:

```python
if convergence < growth_threshold:
    # Create new dimension
    create_dimension()
```

### Dimension Merge

Dimensions merge when signs align:

```python
if signs_aligned(dim1, dim2):
    merge_dimensions(dim1, dim2)
```

### Dimension Decay

Dimensions decay when mean absolute value → 0:

```python
mean_abs = mean(|dimension.vector|)
if mean_abs < decay_threshold:
    dimension.active = False
```

### Dimension Inversion

Dimensions invert when convergence is high:

```python
if convergence > inversion_threshold:
    dimension.vector = [-v for v in dimension.vector]
```

## State Persistence

### Memory Persists

Memory persists across:
- Iterations
- Observations
- Hot swaps (if states match)

### History Affects Convergence

Observation history affects convergence:

```python
observation_pressure = calculate_pressure(history)
effective_convergence = field_convergence + observation_pressure
```

## Price Integration (Phase 0)

### Price in DNA Hash

Price (LAST TRADE PRICE) is encoded in DNA hash:
- 16 bits (min=1, max=65535)
- Part of checksum
- Self-verifying

### Price Decay

Price decays with halflife:
- Formula: `P(t) = floor(P₀ × 2^(-t / τ))`
- Price → 0 on convergence
- Price < 1 is burned

### Price Bounds

Price is bounded:
- Minimum: 1
- Maximum: 65535 (2^16 - 1)
- Values outside bounds are clamped

## Example Flow

```python
# 1. Initialize VM
vm = ZerothVM(program=program)

# 2. Run iterations
for _ in range(1000):
    vm.step()
    
    # 3. Check convergence
    snapshot, convergence = vm.observe_now()
    
    # 4. If converged, inject potential
    if convergence < epsilon:
        vm.record_truth()
        vm.inject_potential(-1)
    
    # 5. Memory decays
    # 6. Dimensions evolve
    # 7. System continues
```

## Key Invariants

1. **Truth is 0**: Memory divergence sums to 0
2. **Decay is monotonic**: Weight/price never increase without reinforcement
3. **Convergence is bounded**: 0 ≤ convergence ≤ 1.1 (allows observation pressure)
4. **Price is bounded**: 1 ≤ price ≤ 65535
5. **Integer-only**: All values are integers
6. **No deletions**: Forgetting is convergence to 0, not deletion
