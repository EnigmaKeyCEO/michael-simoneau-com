# Swap Specification — Phase 14

## Overview

This document specifies the USDC ↔ WTHTH swap mechanism that implements the **Lineage Limitation Price Minimum Constraint**. This constraint establishes that **1 WTHTH = minimum 1 USDC** through native swap functionality, creating the first cryptocurrency with real intrinsic value based on its own mechanics rather than market prices or social consensus.

## Core Constraint

From COMMAND.md:

> "On the THTH website, you will be able to swap USDC natively for WTHTH, which is a wrapped version of the THTH token blocks as explained before and should be fully operational via the wallet provider you choose and `contracts/WTHTH.sol`. This is not just a convenience, it is a fundamental part of the system that prevents value from exploding or collapsing illegitimately. SINCE THE SYSTEM IS INTEGER BASED, no decimals are allowed, THAT MEANS 1 WTHTH is worth MINIMUM 1 USDC. Which makes it THE FIRST CRYPTOCURRENCY TO HAVE REAL INTRINSIC VALUE BASED ON ITS OWN MECHANICS AND NOT ON MARKET PRICES OR SOCIAL CONSENSUS WHILE ALSO ALLOWING FOR NATIVE TRANSACTIONS; AND, WILL NEVER BE WORTH LESS THAN 1 USDC!"

## Key Requirements

### 1. Integer-Only Swap Mechanics

- **No decimals**: All swap amounts must be integers
- **Minimum ratio**: 1 WTHTH = 1 USDC (minimum, can be higher)
- **Enforcement**: Smart contract enforces minimum ratio at swap time
- **Rejection**: Swaps violating minimum ratio are rejected

### 2. Intrinsic Value Enforcement

The swap mechanism enforces intrinsic value through:

- **Mechanical constraint**: Smart contract code enforces 1:1 minimum
- **Not market-based**: Price floor is not determined by AMMs, liquidity pools, or market sentiment
- **System-based**: Value comes from Zeroth mechanics (DNA hash price, decay, convergence)
- **Self-verifying**: Price is encoded in DNA hash checksum

### 3. Swap Functionality

Two swap directions:

- **USDC → WTHTH**: User provides USDC, receives WTHTH (minimum 1:1 ratio)
- **WTHTH → USDC**: User provides WTHTH, receives USDC (minimum 1:1 ratio)

Both directions enforce the minimum price constraint.

## Smart Contract Specification

### WTHTH Contract Swap Functions

#### `swapUsdcForWthth(uint256 usdcAmount)`

Swaps USDC for WTHTH with minimum 1:1 ratio enforcement.

**Parameters:**
- `usdcAmount`: Amount of USDC to swap (integer only, >= 1)

**Returns:**
- `wththAmount`: Amount of WTHTH received (minimum 1:1 ratio)

**Behavior:**
1. Validates `usdcAmount >= 1`
2. Transfers USDC from user to contract
3. Mints WTHTH to user (minimum 1:1 ratio)
4. Emits `SwapUsdcForWthth` event
5. Reverts if minimum ratio violated

**Events:**
```solidity
event SwapUsdcForWthth(
    address indexed user,
    uint256 usdcAmount,
    uint256 wththAmount,
    uint256 rate
);
```

#### `swapWththForUsdc(uint256 wththAmount)`

Swaps WTHTH for USDC with minimum 1:1 ratio enforcement.

**Parameters:**
- `wththAmount`: Amount of WTHTH to swap (integer only, >= 1)

**Returns:**
- `usdcAmount`: Amount of USDC received (minimum 1:1 ratio)

**Behavior:**
1. Validates `wththAmount >= 1`
2. Validates user has sufficient WTHTH balance
3. Burns WTHTH from user
4. Transfers USDC to user (minimum 1:1 ratio)
5. Emits `SwapWththForUsdc` event
6. Reverts if minimum ratio violated or insufficient reserves

**Events:**
```solidity
event SwapWththForUsdc(
    address indexed user,
    uint256 wththAmount,
    uint256 usdcAmount,
    uint256 rate
);
```

#### `getSwapRate()`

Returns the current swap rate (USDC per WTHTH, minimum 1.0).

**Returns:**
- `rate`: Current swap rate in 18 decimals (minimum 1e18 = 1.0)

**Note:** Base rate is 1:1 (minimum). In production, this could be enhanced to fetch rate from Zeroth VM oracle or calculate based on DNA hash LAST TRADE PRICE.

### Constants

```solidity
uint256 public constant MIN_SWAP_RATE = 1; // 1 USDC per WTHTH minimum
```

## Frontend Implementation

### Swap Service (`services/swap.ts`)

Provides functions for:
- `swapUsdcForWthth(signer, amount)`: Execute USDC → WTHTH swap
- `swapWththForUsdc(signer, amount)`: Execute WTHTH → USDC swap
- `getSwapRate(signer)`: Get current swap rate
- `getUsdcBalance(signer, address)`: Get USDC balance
- `getWththBalance(signer, address)`: Get WTHTH balance
- `getThthBalance(address)`: Get THTH balance from Zeroth VM

### Swap Hook (`hooks/useSwap.ts`)

React hook that manages swap state:
- Swap rate fetching
- Balance management
- Transaction handling
- Error handling

### Swap UI Components

- **SwapForm**: Main swap interface with direction toggle
- **SwapPage**: Page layout for swap functionality

## Backend Integration

### Swap Observer (`zeroth/ethereum/swap_observer.py`)

Observes swap events from Ethereum and:
1. Processes swap events
2. Updates LAST_TRADE_PRICE in DNA hashes for active blocks
3. Triggers convergence recalculation
4. Records swap history

**Key Methods:**
- `observe_swap_event()`: Process a swap event
- `watch_swap_events()`: Watch for swap events on Ethereum
- `get_swap_history()`: Get swap event history

### Swap Validation (`zeroth/protocol0/swap_validation.py`)

Validates swap transactions according to Phase 14 rules:

**Validations:**
1. Integer-only amounts
2. Minimum swap rate (1:1)
3. Rate matches amounts
4. Plausibility checks

**Key Methods:**
- `validate_swap()`: Validate swap transaction
- `validate_swap_usdc_for_wthth()`: Validate USDC → WTHTH swap
- `validate_swap_wthth_for_usdc()`: Validate WTHTH → USDC swap
- `check_swap_plausibility()`: Check if swap is plausible

## Data Flow

### USDC → WTHTH Swap Flow

```
1. User initiates swap on THTH website
   ↓
2. Frontend calls swapUsdcForWthth(amount)
   ↓
3. Smart contract validates:
   - USDC balance sufficient
   - Swap rate >= 1:1 minimum
   - Amounts are integers
   ↓
4. Contract executes swap:
   - Transfers USDC from user
   - Mints WTHTH to user
   - Emits SwapUsdcForWthth event
   ↓
5. Zeroth VM observes SwapUsdcForWthth event
   ↓
6. Zeroth updates LAST_TRADE_PRICE in DNA hash
   ↓
7. Protocol0 validates swap plausibility
   ↓
8. Price update propagates through system
```

### WTHTH → USDC Swap Flow

```
1. User initiates swap on THTH website
   ↓
2. Frontend calls swapWththForUsdc(amount)
   ↓
3. Smart contract validates:
   - WTHTH balance sufficient
   - Swap rate >= 1:1 minimum
   - Amounts are integers
   - USDC reserves sufficient
   ↓
4. Contract executes swap:
   - Burns WTHTH from user
   - Transfers USDC to user
   - Emits SwapWththForUsdc event
   ↓
5. Zeroth VM observes SwapWththForUsdc event
   ↓
6. Zeroth updates LAST_TRADE_PRICE in DNA hash
   ↓
7. Protocol0 validates swap plausibility
   ↓
8. Price update propagates through system
```

## Integration Points

### With Phase 0 (Intrinsic Value)

- Swap price becomes LAST TRADE PRICE in DNA hash
- Price bounds enforced (min=1, max=65535)
- Price decay applies to swap-derived prices

### With Phase 11 (WTHTH Contract)

- Swap uses existing WTHTH mint/burn mechanics
- Swap events integrate with existing event system

### With THTH Website

- Swap page added to navigation
- Swap component integrated with wallet connection
- Swap transactions visible in transaction history

### With Zeroth VM

- Swap events observed like other Ethereum events
- Swap price updates DNA hash LAST TRADE PRICE
- Swap triggers convergence recalculation

### With Protocol0

- Swap validation ensures minimum price constraint
- Swap validates integer-only economics
- Swap validates price bounds

## Success Criteria

### Smart Contract

- ✅ Swap functions enforce 1:1 minimum ratio
- ✅ Integer-only amounts enforced
- ✅ Swap events emitted for observation
- ✅ USDC integration works correctly
- ✅ Swap rate calculation is correct

### Frontend

- ✅ Swap UI displays minimum 1:1 rate
- ✅ Swap form validates inputs
- ✅ Swap transactions execute successfully
- ✅ Balance updates after swap
- ✅ Error handling works correctly

### Backend Integration

- ✅ Zeroth VM observes swap events
- ✅ Swap price updates DNA hash LAST TRADE PRICE
- ✅ Protocol0 validates swap plausibility
- ✅ Price constraints enforced throughout system

## Notes

- The swap mechanism is **fundamental**, not optional. It enforces intrinsic value.
- The 1:1 minimum ratio is **hard-coded** in the smart contract, not determined by markets.
- Swap price becomes LAST TRADE PRICE, ensuring price memory in DNA hashes.
- This creates the first cryptocurrency with **real intrinsic value** based on system mechanics.
- The constraint prevents value from "exploding or collapsing illegitimately" as stated in COMMAND.md.
