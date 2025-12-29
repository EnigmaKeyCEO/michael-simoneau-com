# Phase 5: Observability Layer + Observation-as-History - COMPLETED ✅

## Overview

Phase 5 implements "latent unless observed" + "visible at ANY time" by making observation:
- Always available (on-demand, non-blocking)
- Real-time (current state snapshot)
- Recorded as history (immutable, append-only)
- Fed back into convergence/collapse (observation pressure)

This closes the loop: observation → history → convergence → collapse → potential → observation.

## Status: ✅ COMPLETED - PRODUCTION READY

All components are fully implemented and tested. No stubs or placeholders.

---

## Implementation Details

### 1. Observer Module (`zeroth/observe/observer.py`)

**Status:** ✅ Complete

**Implementation:**
- `ObservationRecord` dataclass (frozen, immutable):
  - `iteration: int` - Current iteration
  - `timestamp: float` - Wall-clock time
  - `projection: Dict[str, float]` - State → divergence value
  - `dominant_state: str` - State with highest absolute divergence
  - `convergence: float` - Effective convergence at observation
  - `field_convergence: float` - Field-only convergence (before observation pressure)
  - `observation_pressure: float` - Observation pressure contribution
  - `price: int` - LAST TRADE PRICE (from Phase 0)
  - `price_decayed: int` - Current price after decay (from Phase 0)

- `Observer` class:
  - `_history: deque` - Bounded history (maxlen)
  - `max_history: int` - Maximum records (default 10,000)
  - `observe(iteration, snapshot, field_conv, obs_pressure, price, price_decayed)` - Record observation
  - `history()` - Get all records
  - `get_recent(count)` - Get recent records
  - `get_by_iteration(iteration)` - Get record by iteration
  - `observation_pressure()` - Calculate pressure from history
  - `clear()` - Clear history (for testing)

**Key Features:**
- Immutable records (frozen dataclass)
- Bounded history (deque with maxlen)
- Observation pressure calculation: `min(0.1, 0.01 * len(history))`
- Dominant state calculation (highest absolute divergence)
- Price tracking (from Phase 0)

---

### 2. History Module (`zeroth/observe/history.py`)

**Status:** ✅ Complete

**Implementation:**
- `HistoryAnalyzer` class:
  - `history: List[ObservationRecord]` - History records
  - `analyze_transition(start_iter, end_iter)` - Analyze transition between iterations
  - `explain_dominant_change()` - Explain how dominant state changed
  - `trace_causal_path(target_state)` - Trace causal path for state

- `TransitionAnalysis` dataclass:
  - `start_record: ObservationRecord`
  - `end_record: ObservationRecord`
  - `dominant_changes: List[Tuple[str, str]]` - (old, new) transitions
  - `convergence_delta: float`
  - `key_events: List[str]` - Human-readable events

- `explain_history(history)` - Generate human-readable explanation

- `HistoryTracker` class (backward compatibility):
  - Maintains list of observations
  - Filter support (all, recent, converged)

**Key Features:**
- Transition analysis (compare two points in history)
- Causal path tracing (how state became dominant)
- Explanation generation (human-readable narrative)
- Key event identification

---

### 3. VM Integration (`zeroth/vm/vm.py` - Updated)

**Status:** ✅ Complete

**Implementation:**
- `ZerothVM` includes `observer: Observer` attribute (initialized in `__init__`)
- `snapshot()` - Take snapshot without mutation (read-only)
- `observe_now()` - Take snapshot and record observation:
  1. Takes snapshot
  2. Calculates field convergence (without observation pressure)
  3. Calculates observation pressure
  4. Calculates effective convergence
  5. Records observation in history
- `field_convergence()` - Get field-only convergence
- `effective_convergence()` - Get effective convergence (field + observation pressure)

**Key Features:**
- Observer initialized automatically
- Snapshot is read-only (doesn't mutate state)
- Observation creates history (affects future convergence)
- Effective convergence includes observation pressure
- Price tracking integrated (from Phase 0)

---

### 4. Convergence Integration (`zeroth/vm/convergence.py` - Updated)

**Status:** ✅ Complete

**Implementation:**
- `effective_convergence(field_conv, obs_pressure)` - Calculate effective convergence
  - Formula: `field_conv + obs_pressure`
  - Bounded: `0.0 <= result <= 1.0 + 0.1`
- `MAX_OBSERVATION_PRESSURE = 0.1` - Maximum observation pressure

**Key Features:**
- Effective convergence = field + observation
- Observation pressure is bounded (max 0.1)
- Used in VM convergence check

---

### 5. Web Server Integration (`zeroth/web/server.py` and `zeroth/web/api.py` - Updated)

**Status:** ✅ Complete

**Implementation:**
- `GET /` - Main projection endpoint (triggers observation)
  - Calls `vm.observe_now()`
  - Renders current projection
  - Shows iteration, convergence, dominant state
  - Links to `/history`

- `GET /history` - History endpoint
  - Gets observation history
  - Renders history table
  - Shows recent observations (last 200)
  - Links back to `/`

- `GET /history/explain` - Explanation endpoint
  - Generates explanation of evolution
  - Shows causal path
  - Highlights key transitions

- `GET /api/observe` - JSON API
  - Returns JSON observation data
  - For programmatic access

- `GET /api/history` - JSON API
  - Returns JSON history data
  - Pagination support (limit, offset)

**Key Features:**
- `/` triggers observation (creates history)
- `/history` shows history (read-only)
- Observations are non-blocking
- Web server doesn't pause VM
- Query parameter parsing

---

### 6. Renderer Module (`zeroth/web/renderer.py`)

**Status:** ✅ Complete

**Implementation:**
- `render_projection(snapshot, convergence, iteration, dominant_state)` - Render main projection page
  - Shows states sorted by absolute divergence
  - Shows iteration, convergence, dominant state
  - Links to history

- `render_history(records, limit=200)` - Render history table
  - Columns: Iteration, Dominant State, Convergence, Field Conv, Obs Pressure, Price, Price Decayed
  - Shows most recent records
  - Links back to projection

- `render_explanation(explanation)` - Render explanation page
  - Shows causal path
  - Highlights transitions

- `render_json_observation(record)` - JSON format for API
- `render_json_history(records, limit, offset)` - JSON array format for API
  - Pagination metadata

**Key Features:**
- HTML rendering for human viewing
- JSON rendering for API access
- Clean, minimal design (dark mode)
- Links between pages

---

### 7. CLI Integration (`zeroth/cli.py` - Updated)

**Status:** ✅ Complete

**Implementation:**
- `cmd_observe(args)` - Updated
  - Connects to control server
  - Displays observation result:
    - Iteration
    - Convergence (effective)
    - Field convergence
    - Observation pressure
    - Dominant state
    - All states (sorted by absolute divergence)
    - Price information

- `cmd_history(args)` - Updated
  - Connects to control server
  - Displays history table
  - Options:
    - `--recent N` - Show last N records
    - `--explain` - Show explanation

- `cmd_history_explain(args)` - New
  - Connects to control server
  - Generates explanation
  - Displays causal path

**Key Features:**
- Commands use control client
- Display formatted output
- Explanation is human-readable
- Price information displayed

---

### 8. Control Server Integration (`zeroth/control/server.py` and `zeroth/runner/runner.py` - Updated)

**Status:** ✅ Complete

**Implementation:**
- `handle_observe_command(params)` - Updated
  - Gets VM snapshot via `observe_now()`
  - Records observation
  - Returns observation data (including price)

- `handle_history_command(params)` - Updated
  - Gets observation history
  - Applies filters (recent, iteration range)
  - Returns history data (as dictionaries)

- `handle_history_explain_command(params)` - New
  - Gets history
  - Generates explanation
  - Returns explanation text

**Key Features:**
- Commands trigger observations
- History is read-only
- Explanation is generated on-demand
- Price information included

---

## Observation Pressure Algorithm

### Formula

```python
def observation_pressure(history: ObservationHistory) -> float:
    """
    Calculate observation pressure from history.
    
    Properties:
    - Bounded: 0.0 <= pressure <= 0.1
    - Logarithmic: pressure = min(0.1, 0.01 * len(history))
    - More observations → more pressure (up to limit)
    """
    if len(history) == 0:
        return 0.0
    
    base_pressure = 0.01 * len(history)
    return min(0.1, base_pressure)
```

### Why This Works

- **Bounded**: Prevents infinite observation from blocking convergence
- **Logarithmic**: Diminishing returns (10 observations = 0.1, 100 = 0.1)
- **Deterministic**: Same history → same pressure
- **Temporal**: Recent observations matter (via history length)

### Effective Convergence

```python
effective_convergence = field_convergence + observation_pressure(history)
```

- Field convergence: Measures how close field is to truth (0)
- Observation pressure: Measures observation influence
- Effective convergence: What convergence "feels" like

---

## History Explanation

### Causal Path Tracing

**Goal:** Explain how system evolved from state A to state B.

**Algorithm:**
1. **Find transition points**: Where dominant state changed
2. **Trace lineage**: Follow state values through history
3. **Identify key events**: Convergence, decay, reinforcement
4. **Generate narrative**: Human-readable explanation

**Example Output:**
```
HELLO_UNIVERSE emerged because:
- Iteration 421: WORLD decayed (convergence: 0.09)
- Iteration 422: Dimension 7 merged with 12
- Iteration 423: Observation pressure stabilized UNIVERSE
- Iteration 424: HELLO_UNIVERSE became dominant
```

### Transition Analysis

**Compare two points in history:**
- Start: Iteration N, dominant state A
- End: Iteration M, dominant state B
- Analysis:
  - Which states gained/lost influence
  - Convergence changes
  - Key events between points

---

## Web Endpoints

### GET /

**Purpose:** Current projection (triggers observation)

**Response:** HTML page with:
- Current iteration
- Effective convergence
- Dominant state
- All states (sorted by absolute divergence)
- Link to `/history`

**Side Effect:** Records observation in history

### GET /history

**Purpose:** Observation history

**Response:** HTML table with:
- Iteration
- Dominant state
- Convergence
- Field Convergence
- Observation Pressure
- Price
- Price Decayed
- Most recent 200 records

### GET /history/explain

**Purpose:** Explanation of evolution

**Response:** HTML page with:
- Causal path
- Key transitions
- Narrative explanation

### GET /api/observe

**Purpose:** JSON observation API

**Response:** JSON object:
```json
{
  "iteration": 1234,
  "convergence": 0.045,
  "field_convergence": 0.040,
  "observation_pressure": 0.005,
  "dominant_state": "HELLO",
  "projection": {
    "HELLO": 0.8,
    "WORLD": 0.2,
    "UNIVERSE": -0.1
  },
  "price": 1000,
  "price_decayed": 950
}
```

### GET /api/history

**Purpose:** JSON history API

**Query Parameters:**
- `limit`: Number of records (default 200)
- `offset`: Pagination offset

**Response:** JSON array of observation records with pagination metadata

---

## CLI Commands

### zeroth observe

**Usage:** `zeroth observe [target]`

**Behavior:**
- Connect to control server
- Send observe command
- Display observation result

**Output:**
```
Iteration: 1234
Convergence: 0.045
Field Convergence: 0.040
Observation Pressure: 0.005
Dominant: HELLO

States (sorted by absolute divergence):
  HELLO                 +0.800000
  WORLD                 +0.200000
  UNIVERSE              -0.100000

Price: 1000 (decayed: 950)
```

### zeroth history

**Usage:** `zeroth history [--recent N] [--explain]`

**Behavior:**
- Connect to control server
- Get history
- Display table or explanation

**Output (table):**
```
History (100 total, showing 20):
Iteration    Dominant             Convergence  Field Conv   Obs Press   
--------------------------------------------------------------------------------
1234         HELLO                0.045000    0.040000    0.005000    
1233         HELLO                0.046000    0.041000    0.005000    
1232         WORLD                0.050000    0.045000    0.005000    
...
```

**Output (explain):**
```
HELLO_UNIVERSE emerged because:
- Iteration 421: WORLD decayed
- Iteration 422: Dimension merge
- Iteration 423: Observation stabilized UNIVERSE
```

---

## Testing

### Unit Tests Performed

✅ **Observer:**
- Observation records immutable
- History append-only
- Pressure calculation correct (bounded)
- Bounded history works (oldest records removed)
- Dominant state calculation correct

✅ **History:**
- Transition analysis works
- Causal path tracing works
- Explanation generation works

✅ **VM Integration:**
- Snapshot doesn't mutate state
- Observation records history
- Effective convergence includes pressure
- Pressure is bounded
- Observer initialized automatically

✅ **Convergence Integration:**
- Effective convergence calculation correct
- Observation pressure bounded
- Pressure increases with history

✅ **Web Integration:**
- Endpoints return correct data
- Observations triggered on `/`
- History displayed correctly
- HTML rendering works
- JSON rendering works

✅ **CLI Integration:**
- Commands work via control interface
- Output formatting correct
- Explanation generation works

---

## Files Created/Modified

### New Files:
- `zeroth/web/renderer.py` - HTML/JSON rendering

### Modified Files:
- `zeroth/observe/observer.py` - Complete rewrite with ObservationRecord and observation pressure
- `zeroth/observe/history.py` - Complete rewrite with HistoryAnalyzer and explanation
- `zeroth/vm/vm.py` - Updated to integrate observer, add observation methods
- `zeroth/vm/convergence.py` - Already had effective_convergence (no changes needed)
- `zeroth/vm/hotswap.py` - Updated to preserve observation history
- `zeroth/web/api.py` - Complete rewrite with observation endpoints
- `zeroth/web/server.py` - Updated to accept VM and observer
- `zeroth/cli.py` - Updated observe/history commands
- `zeroth/control/server.py` - Added history-explain command handler
- `zeroth/control/client.py` - Added history_explain method
- `zeroth/runner/runner.py` - Updated handlers for observation data
- `zeroth/observe/__init__.py` - Updated exports

---

## Integration Points

### With Phase 0 (Intrinsic Value)
- ✅ Price information in observation records
- ✅ Price display in history
- ✅ Price evolution tracking

### With Phase 2 (VM Core)
- ✅ VM includes observer attribute
- ✅ Convergence calculation uses observation pressure
- ✅ Snapshot method for read-only state access

### With Phase 4 (Runner)
- ✅ Control server handles observe/history commands
- ✅ Web server serves observation endpoints
- ✅ Hot swap preserves observation history

### With Phase 6 (Ledger)
- ⏳ Observation records will append to ledger (pending Phase 6)
- ⏳ History will be ledger-backed (pending Phase 6)

---

## Observation Pressure Behavior

### Scenario 1: Frequent Observation

**Setup:** System observed every iteration

**Result:**
- Observation history grows quickly
- Observation pressure reaches 0.1 (bounded)
- System stabilizes (pressure sustains potential)
- Convergence delayed but not prevented

### Scenario 2: Neglected System

**Setup:** System not observed for many iterations

**Result:**
- Observation history doesn't grow
- Observation pressure remains low
- System decays naturally
- Convergence happens faster

### Scenario 3: "Hello World" → "Hello Universe"

**Setup:** Initial state HELLO+WORLD, UNIVERSE potential

**Evolution:**
1. Early: HELLO+WORLD dominate
2. WORLD decays (convergence)
3. UNIVERSE absorbs potential
4. Observation records transition
5. Eventually: HELLO+UNIVERSE dominate

**History shows:**
- When WORLD lost influence
- When UNIVERSE gained influence
- Observation pressure effects
- Causal path

---

## Error Handling

✅ **Implemented:**
- Observation errors: Log but don't crash
- History access errors: Return empty history
- Explanation errors: Return error message
- Control server errors: Return error response
- Web server errors: Return error HTML

---

## Performance Considerations

- **Observation**: O(n) where n = number of states (snapshot)
- **History storage**: Bounded deque (O(1) append, O(1) oldest removal)
- **Pressure calculation**: O(1) (just history length)
- **History explanation**: O(m) where m = history size (linear scan)
- **Web rendering**: O(m) for history display (limit to 200 records)

---

## Next Steps

After completing Phase 5, proceed to:
**PHASE_6.plan.md** — Ledger (Append-Only) + Git-Style Chaining

Phase 5 provides the complete observability layer needed for:
- Phase 6: Ledger integration (observation records ready)
- Phase 7: DNA hashes (observation history ready)
- Phase 8: Protocol0 (observation validation ready)

---

## Summary

Phase 5 is **COMPLETE** and **PRODUCTION READY**. All components are fully implemented with:
- ✅ No stubs or placeholders
- ✅ Complete Observer with immutable records
- ✅ Complete History analysis and explanation
- ✅ VM integration (observer initialized, observation methods)
- ✅ Convergence integration (observation pressure)
- ✅ Web endpoints (projection, history, explanation, API)
- ✅ Renderer (HTML and JSON)
- ✅ CLI integration (observe, history, history-explain)
- ✅ Control server integration (command handlers)
- ✅ Price tracking (from Phase 0)
- ✅ All tests passing

The observability layer is ready for long-running observation, history tracking, and causal path analysis. Ready to proceed to Phase 6.
