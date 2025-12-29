# Zeroth Deployment Guide

## Overview

This guide covers deploying Zeroth as a garage-scale blockchain operation. The system runs on a single server and integrates with Ethereum for settlement.

## Architecture

```
┌────────────────────────────────────────┐
│         Garage Server                  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │      Zeroth VM (Python)          │  │
│  │  ┌────────────────────────────┐  │  │
│  │  │    Observability Layer     │  │  │
│  │  │    (Web API / TCP)         │  │  │
│  │  │      Port 101 / 4040       │  │  │
│  │  └─────────────┬──────────────┘  │  │
│  │                │                 │  │
│  │  ┌─────────────▼──────────────┐  │  │
│  │  │      Living State          │  │  │
│  │  │  (Iteration, DNA, Block)   │  │  │
│  │  └─────────────┬──────────────┘  │  │
│  │                │                 │  │
│  │  ┌─────────────▼──────────────┐  │  │
│  │  │    Protocol0 Validator     │  │  │
│  │  └────────────────────────────┘  │  │
│  └────────────────┬─────────────────┘  │
│                   │                    │
│  ┌────────────────▼─────────────────┐  │
│  │             Ethereum             │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

## Prerequisites

### Hardware

- **Server**: Any Linux/macOS server (garage server is fine)
- **CPU**: 2+ cores recommended
- **RAM**: 4GB+ recommended
- **Storage**: 10GB+ for ledger storage
- **Network**: Internet connection for Ethereum RPC

### Software

- **Python 3.11+**
- **Node.js 18+** (for visualization, optional)
- **Ethereum RPC access** (Infura, Alchemy, or local node)

## Installation

### 1. Install Zeroth

```bash
# Clone repository
git clone <repository-url>
cd zeroth

# Install Python package
pip install -e .

# Install development dependencies (optional)
pip install -r requirements-dev.txt
```

### 2. Install Visualization (Optional)

```bash
cd zeroth-web
npm install
```

### 3. Configure Ethereum

Create configuration file `~/.zeroth/config.yaml`:

```yaml
ethereum:
  rpc_url: "https://mainnet.infura.io/v3/YOUR_API_KEY"
  wthth_contract_address: "0x..."  # Deploy WTHTH contract first
  chain_id: 1  # Mainnet
```

## Deployment Steps

### 1. Deploy WTHTH Contract

```bash
# Compile contract
solc contracts/WTHTH.sol --abi --bin

# Deploy to Ethereum (using Remix, Hardhat, or Truffle)
# Note contract address for configuration
```

### 2. Initialize Zeroth

```bash
# Create data directory
mkdir -p ~/.zeroth/data
mkdir -p ~/.zeroth/ledger

# Generate keys (optional, for signing)
zeroth keygen --scheme ed25519
```

### 3. Start Zeroth VM

```bash
# Run program
zeroth run examples/hello_world.zero

# Or run in foreground (debug)
zeroth run examples/hello_world.zero --no-daemon
```

### 4. Start Web API (if not auto-started)

The Web API server starts automatically with `zeroth run`. It runs on port 101.

### 5. Start Visualization (Optional)

```bash
cd zeroth-web
npm run dev
```

Visit `http://localhost:3000` to see visualization.

## Configuration

### Environment Variables

```bash
export ZEROTH_DATA_DIR=~/.zeroth/data
export ZEROTH_LEDGER_DIR=~/.zeroth/ledger
export ZEROTH_RPC_URL=https://mainnet.infura.io/v3/YOUR_API_KEY
export ZEROTH_WTHTH_ADDRESS=0x...
```

### Configuration File

`~/.zeroth/config.yaml`:

```yaml
vm:
  epsilon: 0.001
  halflife: 100
  convergence_delta: 0.10

ethereum:
  rpc_url: "https://mainnet.infura.io/v3/YOUR_API_KEY"
  wthth_contract_address: "0x..."
  poll_interval: 12.0

web:
  port: 101
  cors_enabled: true

control:
  port: 4040
```

## Operation

### Starting the System

```bash
# Start VM daemon
zeroth run program.zero

# Check status
zeroth status

# View logs (if logging configured)
tail -f ~/.zeroth/logs/zeroth.log
```

### Monitoring

```bash
# Check VM state
zeroth observe

# View history
zeroth history --recent 10

# Check blocks
zeroth blocks

# Check Ethereum integration
zeroth ethereum-status

# Check mint/burn status
zeroth mint-status
zeroth burn-status
```

### Stopping the System

```bash
# Stop daemon
zeroth stop

# Or send SIGTERM to PID
kill $(cat ~/.zeroth/pid)
```

## Ethereum Integration

### Watching for Events

Zeroth automatically watches Ethereum for WTHTH events when Ethereum integration is configured.

### Minting Flow

1. Ethereum transaction occurs (WTHTH transfer)
2. Zeroth observes event
3. Mint authorization created (if eligible)
4. Protocol0 validates authorization
5. Ethereum mints WTHTH

### Burning Flow

1. Block converges (all hashes decay to zero)
2. Burn authorization created
3. Protocol0 validates authorization
4. Ethereum burns WTHTH

## Maintenance

### Ledger Backup

```bash
# Backup ledger
cp ~/.zeroth/ledger/zeroth.p0 ~/.zeroth/backups/zeroth-$(date +%Y%m%d).p0
```

### Log Rotation

Configure log rotation in `/etc/logrotate.d/zeroth`:

```
~/.zeroth/logs/*.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
}
```

### Health Checks

```bash
# Check VM is running
zeroth status

# Check API is responding
curl http://localhost:101/api/state

# Check Ethereum connection
zeroth ethereum-status
```

## Security Considerations

### Key Management

- **Private Keys**: Store securely, never commit to git
- **Key Rotation**: Rotate keys periodically
- **Access Control**: Restrict access to key files

### Network Security

- **Firewall**: Only expose necessary ports (101 for web, 4040 for control)
- **TLS**: Use HTTPS in production (reverse proxy)
- **Authentication**: Add authentication for control server

### Ethereum Security

- **RPC Access**: Use secure RPC endpoints (API keys)
- **Contract Verification**: Verify WTHTH contract on Etherscan
- **Authorization**: Ensure only authorized addresses can mint/burn

## Troubleshooting

### VM Not Starting

1. Check Python version: `python3 --version` (must be 3.11+)
2. Check dependencies: `pip list | grep zeroth`
3. Check logs: `~/.zeroth/logs/zeroth.log`

### API Not Responding

1. Check server is running: `zeroth status`
2. Check port 101 is not in use: `lsof -i :101`
3. Check firewall rules

### Ethereum Integration Issues

1. Check RPC connection: `zeroth ethereum-status`
2. Check contract address is correct
3. Check authorization signatures are valid

### Performance Issues

1. Check system resources: `htop`
2. Check ledger size: `ls -lh ~/.zeroth/ledger/`
3. Optimize iteration speed if needed

## Scaling Considerations

### Single Server

- **Current Design**: Single authoritative server
- **Limitations**: Single point of failure
- **Mitigation**: Regular backups, monitoring

### Future Scaling

- **Multiple Instances**: Run multiple VM instances (different programs)
- **Load Balancing**: Use reverse proxy for API
- **Database**: Consider database for ledger storage (if needed)

## Backup and Recovery

### Backup Strategy

1. **Ledger**: Daily backups of ledger file
2. **Keys**: Secure backup of private keys
3. **Configuration**: Backup configuration files

### Recovery

1. **Restore Ledger**: Copy backup ledger file
2. **Restore Keys**: Restore key files
3. **Restart VM**: `zeroth run program.zero`

## Production Checklist

- [ ] WTHTH contract deployed and verified
- [ ] Ethereum RPC access configured
- [ ] Keys generated and secured
- [ ] Configuration file created
- [ ] Ledger directory created
- [ ] Logging configured
- [ ] Monitoring set up
- [ ] Backup strategy implemented
- [ ] Firewall rules configured
- [ ] Health checks configured

## Crypto-Fabric Deployment

ZerothVM can be deployed as a managed service in the crypto-fabric infrastructure system using Kubernetes (MicroK8s).

### Prerequisites

- MicroK8s cluster running
- Crypto-fabric core services installed
- kubectl configured to access cluster

### Deployment via Wizard

1. **Access Admin UI**: Navigate to crypto-fabric Admin UI
2. **Install Zeroth Stack**: Click on ZerothVM tile and follow wizard
3. **Configure**:
   - Program path (default: `/app/program.zero`)
   - Ethereum RPC URL
   - WTHTH contract address
   - Private key (stored as secret)
4. **Deploy**: Wizard generates and applies Kubernetes manifests

### Manual Deployment

```bash
# Apply ZerothVM manifests
kubectl apply -f crypto-fabric/services/zeroth/manifests/

# Check deployment status
kubectl get deployment zeroth-vm -n crypto-fabric
kubectl get pods -n crypto-fabric -l app=zeroth-vm
```

### Kubernetes Resources

The wizard creates:
- **Deployment**: ZerothVM pod with resource limits
- **Service**: ClusterIP service (ports 101, 4040)
- **ConfigMap**: Non-sensitive configuration
- **Secret**: Sensitive data (RPC URL, private keys)
- **PersistentVolumeClaim**: Ledger storage (10Gi default)

### Metrics and Observability

- **Metrics Exporter**: Prometheus-compatible metrics at `/metrics`
- **Profit Exporter**: Economic metrics for orchestrator
- **Integration**: Full integration with crypto-fabric observability stack

### Scaling

- **Current**: Single-instance (replicas: 1)
- **Future**: Multi-instance support based on profitability
- **Orchestrator**: Manages lifecycle based on profitability index

### Environment Configuration

Support for multi-environment:
- **Dev**: Testnet contracts, emulators
- **Staging**: Testnet contracts, real services
- **Production**: Mainnet contracts, production services

Configure via environment variables:
- `ZEROTH_ENV`: dev/staging/prod
- `ZEROTH_RPC_URL`: Environment-specific RPC
- `ZEROTH_WTHTH_ADDRESS`: Environment-specific contract

### Health Checks

Kubernetes probes:
- **Liveness**: `/api/state` endpoint
- **Readiness**: `/api/state` + iteration > 0
- **Startup**: Wait for initial observation

### Service Management

```bash
# View logs
kubectl logs -n crypto-fabric -l app=zeroth-vm -f

# Restart deployment
kubectl rollout restart deployment/zeroth-vm -n crypto-fabric

# Scale (if multi-instance enabled)
kubectl scale deployment/zeroth-vm --replicas=2 -n crypto-fabric
```

### Admin UI Integration

ZerothVM tile in Admin UI provides:
- Service status (Up/Down/Degraded)
- Key metrics (iteration, convergence, blocks, tokens)
- Quick actions (restart, observe, view logs)
- Link to visualization

## Support

For issues or questions:
- Check logs: `~/.zeroth/logs/` (local) or `kubectl logs` (K8s)
- Check documentation: `docs/`
- Review Phase documentation: `docs/PHASE_*.md`
- Crypto-fabric docs: `crypto-fabric/docs/`
