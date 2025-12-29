# Redemption Specification — Phase 14

## Lineage-Limited Redemption & Price Minimum Constraint

### Status: **CANONICAL / NON-NEGOTIABLE**

This specification implements the **Lineage-Limited Redemption Constraint**, which establishes **mechanical intrinsic value** for WTHTH while remaining fully compatible with Zeroth decay, convergence, and completion semantics.

---

## 1. Canonical Statement

> **For any WTHTH token associated with an active, unconverged Zeroth block, the protocol guarantees a minimum redemption value of 1 USDC per WTHTH, enforced mechanically and without reliance on external markets or price oracles.**

Equally important:

> **When the underlying Zeroth block converges, redemption ceases and remaining WTHTH supply is burned.**

This is not failure. This is **completion**.

---

## 2. What This Is — and Is Not

### This **IS**:

* A **redemption floor**, not a market promise
* A **mechanical constraint**, not a belief system
* A **lineage-aware value gate**
* Enforced entirely by:
  * Smart contracts
  * Zeroth VM state
  * Protocol0 plausibility checks

### This is **NOT**:

* An AMM
* A liquidity guarantee
* A perpetual backing promise
* A price oracle
* A claim about secondary markets

---

## 3. The Lineage-Limited Redemption Model

WTHTH redemption is **strictly conditional** on the state of its underlying Zeroth block.

### Definitions

* **Active Block**: A Zeroth block with at least one non-converged DNA hash.
* **Converged Block**: A block where all hashes have decayed to convergence (value = 0).

### Redemption Rule (Formal)

```
Redeemable(WTHTH, t) ⇔ BlockState(t) == ACTIVE
```

If and only if the block is active:

* WTHTH → USDC redemption is permitted
* Minimum rate = **1 WTHTH : 1 USDC**
* Integer-only amounts enforced

If the block is converged:

* Redemption is **forbidden**
* Remaining WTHTH supply is burned
* Wrapper contract becomes inert

---

## 4. Smart Contract Implementation

### WTHTH.sol Redemption Function

```solidity
function redeem(
    string memory blockId,
    uint256 wththAmount,
    uint256 usdcAmount,
    string memory dnaHash,
    uint256 iteration,
    bytes memory signature,
    bytes memory publicKey
) external
```

**Key Constraints**:

1. **Block must be active**: `require(!_burnedBlocks[blockId], "WTHTH: block converged, redemption forbidden")`
2. **Minimum rate**: `require(usdcAmount >= wththAmount, "WTHTH: minimum redemption rate violated")`
3. **Integer-only**: `require(wththAmount >= 1, "WTHTH: amount must be >= 1")`
4. **Authorization**: Requires Protocol0 authorization signature verifying block is active
5. **USDC transfer**: Transfers USDC to user
6. **WTHTH burn**: Burns WTHTH from user

### Events

```solidity
event Redemption(
    address indexed user,
    string indexed blockId,
    uint256 wththAmount,
    uint256 usdcAmount,
    uint256 rate,
    string dnaHash,
    uint256 iteration
);
```

---

## 5. Zeroth VM Responsibilities

Zeroth VM is the **source of truth** for:

* Block activity state
* LAST_TRADE_PRICE encoding
* Price decay
* Convergence detection
* Redemption eligibility

For redemptions:

* Redemption price becomes LAST_TRADE_PRICE
* DNA hash is updated
* Convergence recalculated
* Ledger appended

---

## 6. Protocol0 Validation

Protocol0 must validate every redemption-related event:

* Block is active
* Redemption amount is integer
* Redemption rate ≥ 1
* No replay or double-authorization
* Lineage consistency preserved
* No backward mutation of price or history

Invalid redemptions:

* Are rejected
* Do not affect state
* Cannot be forced via Ethereum alone

---

## 7. Redemption Observer

The `RedemptionObserver` module:

1. Watches Ethereum for redemption events
2. Updates LAST_TRADE_PRICE in DNA hashes
3. Triggers convergence recalculation
4. Records redemption history

### Implementation

```python
class RedemptionObserver:
    def observe_redemption_event(
        self,
        block_id: str,
        wthth_amount: int,
        usdc_amount: int,
        dna_hash: str,
        iteration: int,
        user_address: str
    ) -> bool:
        # Validate rate
        # Update LAST_TRADE_PRICE
        # Trigger convergence recalculation
```

---

## 8. Redemption Validator

The `RedemptionValidator` module validates:

1. Block is active (not converged)
2. Minimum redemption rate (1:1)
3. Integer-only amounts
4. DNA hash belongs to block
5. Iteration is reasonable
6. Authorization signature is valid

### Implementation

```python
class RedemptionValidator:
    def validate_redemption(
        self,
        block_id: str,
        wthth_amount: int,
        usdc_amount: int,
        dna_hash: str,
        iteration: int
    ) -> tuple[bool, List[str]]:
        # Validate all constraints
        # Return (is_valid, errors)
```

---

## 9. Frontend Implementation

### Redemption Form

The redemption UI must:

* Display block status: **Active / Completed**
* Show redeemable status: **Yes / No**
* Display minimum redemption: **1 USDC (while active)**
* Show LAST_TRADE_PRICE
* Display remaining halflife / decay indicator
* Prevent redemption for converged blocks

### User Flow

1. User selects block
2. System checks block is active
3. User enters WTHTH amount
4. System calculates minimum USDC amount (1:1)
5. User confirms redemption
6. System requests authorization from ZerothVM
7. Transaction executes on Ethereum
8. Redemption event observed by ZerothVM
9. LAST_TRADE_PRICE updated

---

## 10. Data Flow

### WTHTH → USDC Redemption Flow

```
1. User initiates redemption
   ↓
2. Contract checks:
   - blockIsActive == true
   - integer amount
   - rate >= 1
   - authorization valid
   ↓
3. USDC transferred to user
   ↓
4. WTHTH burned from user
   ↓
5. Redemption event emitted
   ↓
6. Zeroth observes event
   ↓
7. LAST_TRADE_PRICE updated
   ↓
8. Convergence recalculated
```

If any check fails → revert.

---

## 11. Intrinsic Value — Precisely Defined

WTHTH has intrinsic value because:

* It is **redeemable under protocol rules**
* Those rules are:
  * mechanical
  * deterministic
  * self-verifying
* Value decays naturally
* Value cannot be fabricated
* Value cannot outlive relevance

This is **value as truth**, not value as promise.

---

## 12. Required Documentation Language (Canonical)

Use this phrasing everywhere:

> "WTHTH is redeemable for a minimum of 1 USDC **while its underlying Zeroth block remains active**. Redemption ceases upon convergence, at which point remaining supply is burned."

Anything stronger is false.
Anything weaker undersells the system.

---

## 13. Definition of Done

* ✅ WTHTH contract enforces lineage-limited redemption
* ✅ Redemption forbidden after convergence
* ✅ Minimum 1:1 rate enforced mechanically
* ✅ Zeroth updates LAST_TRADE_PRICE from redemptions
* ✅ Protocol0 validates redemption plausibility
* ✅ Frontend communicates lifecycle clearly
* ✅ No oracle dependencies
* ✅ No insolvency possible

---

## 14. Integration Points

### With Phase 0 (Intrinsic Value)

* Redemption price becomes LAST_TRADE_PRICE in DNA hash
* Price bounds enforced (min=1, max=65535)
* Price decay applies to redemption-derived prices

### With Phase 11 (WTHTH Contract)

* Redemption uses existing WTHTH burn mechanics
* Redemption integrates with existing authorization system
* Redemption events integrate with existing event system

### With Zeroth VM

* Redemption events observed like other Ethereum events
* Redemption price updates DNA hash LAST_TRADE_PRICE
* Redemption triggers convergence recalculation

### With Protocol0

* Redemption validation ensures minimum price constraint
* Redemption validates integer-only economics
* Redemption validates price bounds

---

## 15. Security Considerations

### Critical Invariants

1. **No redemption after convergence**: Enforced by contract and Protocol0
2. **Minimum rate always enforced**: Contract-level check
3. **Integer-only**: No decimals allowed
4. **Authorization required**: Protocol0 must verify block state
5. **No double-spending**: Authorization hash tracking

### Attack Vectors Prevented

* Redemption of converged blocks → Blocked by contract check
* Rate manipulation → Minimum rate enforced
* Replay attacks → Authorization hash tracking
* Oracle manipulation → No oracles used

---

## 16. Testing Requirements

### Unit Tests

* Contract redemption function
* Redemption observer
* Redemption validator
* Authorization verification

### Integration Tests

* End-to-end redemption flow
* Block convergence → redemption forbidden
* Minimum rate enforcement
* LAST_TRADE_PRICE updates

### Frontend Tests

* Redemption form validation
* Block status checking
* Rate calculation
* Transaction handling

---

## 17. Final Statement

Zeroth does not promise eternal value.

It promises **truthful value**,
**bounded value**,
**earned value**,
and **completed value**.

Phase 14 makes that promise unbreakable.
