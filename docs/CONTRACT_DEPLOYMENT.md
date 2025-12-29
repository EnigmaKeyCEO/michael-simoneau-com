# Zeroth Contract Deployment Guide

This guide walks you through setting up your environment, running a local blockchain, and deploying the **WTHTH (Wrapped THTH)** contract.

## 1. Prerequisites & Setup

We have provided an automated setup script to install all necessary dependencies (Python, Node.js, Solidity, etc.).

### Run the Setup Script
Run this from the project root:

```bash
./scripts/setup.sh
```

Follow the prompts to:
1. Install system dependencies.
2. Set up the Python virtual environment.
3. Configure your wallet (create one if you don't have one).

> **Note**: If you already have a wallet, ensure your private key is set in `.env` as `ZEROTH_PRIVATE_KEY` or linked via `zeroth contract link-wallet`.

---

## 2. Start a Local Blockchain

For testing and development, we use a local Hardhat node. This simulates the Ethereum network on your machine.

1. Open a **new terminal**.
2. Run the local node:
   ```bash
   npx hardhat node
   ```

You will see output listing 20 test accounts and their private keys, and the node started at `http://127.0.0.1:8545`.

> **Keep this terminal running.**

---

## 3. Fund Your Deployer Wallet

Your generated Zeroth wallet needs ETH to pay for gas fees.

1. Open your **original terminal** (where you ran setup).
2. Activate the environment (if not already active):
   ```bash
   source .venv/bin/activate
   ```
3. Copy one of the private keys from the Hardhat node output (e.g., Account #0).
4. Send some ETH from that test account to your Zeroth wallet address.
   *You can find your Zeroth wallet address by running `zeroth contract info` or checking `scripts/setup.sh` output.*
   
   *Alternatively, for local testing, you can just use one of the Hardhat private keys as your `ZEROTH_PRIVATE_KEY` in `.env`.*

---

## 4. Deploy the WTHTH Contract

The `WTHTH` contract requires two parameters:
- **Authorizer**: The address allowed to authorize mints/burns.
- **USDC Contract**: The address of the USDC token (for redemptions).

For local testing, we can use dummy addresses or deploy a mock USDC first. For this guide, we'll use a dummy address for USDC.

### Command Syntax

```bash
zeroth contract deploy contracts/WTHTH.sol \
  --authorizer <AUTHORIZER_ADDRESS> \
  --usdc <USDC_ADDRESS> \
  --network local
```

### Example Deployment (Local)

Assuming you are using your wallet address as the authorizer and a dummy address for USDC:

```bash
# Get your wallet address
MY_ADDRESS=$(python3 -m zeroth contract link-wallet --address 0x... | grep "Address configured" | cut -d: -f2 | xargs)
# OR manually replace with your address (e.g., from `zeroth contract create-wallet`)

# Deploy
zeroth contract deploy contracts/WTHTH.sol \
  --authorizer 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 \
  --usdc 0x5FbDB2315678afecb367f032d93F642f64180aa3 \
  --network local
```

> **Note**: 
> - `0xf39...` is the default Hardhat Account #0 (commonly used for testing).
> - `0x5Fb...` is a common address for the first contract deployed on Hardhat (useful as a dummy USDC).

### Expected Output
```
✅ Contract deployed!
Transaction: 0x...
Block: 1
Gas used: ...
Contract address: 0x...
```

---

## 5. Verify Deployment

You can verify the contract details using the CLI:

```bash
zeroth contract info <CONTRACT_ADDRESS>
```

Or check the balance of an address:

```bash
zeroth contract balance <YOUR_ADDRESS> --contract <CONTRACT_ADDRESS>
```

---

## Troubleshooting

- **RPC Error**: Ensure `npx hardhat node` is running and `ZEROTH_RPC_URL` is set to `http://127.0.0.1:8545` in your `.env`.
- **Insufficient Funds**: Make sure your deployer wallet has ETH. On a local node, you can transfer from the pre-funded Hardhat accounts.
- **Compiler Errors**: Run `./scripts/setup.sh` again to ensure `solc` and `py-solc-x` are correctly installed.

