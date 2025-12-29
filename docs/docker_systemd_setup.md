# Docker Systemd Testing Setup

This guide explains how to use Docker for testing systemd service installation and management on macOS.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose v2 (included with Docker Desktop)
- Zeroth project cloned and dependencies installed

## Quick Start

### 1. Build Docker Image

```bash
./scripts/docker-systemd.sh build
```

Or manually:

```bash
docker-compose -f docker-compose.systemd.yml build
```

### 2. Start Container

```bash
./scripts/docker-systemd.sh start
```

Or manually:

```bash
docker-compose -f docker-compose.systemd.yml up -d
```

### 3. Check Status

```bash
./scripts/docker-systemd.sh status
```

### 4. Execute Commands in Container

```bash
# Test systemd installation (dry-run)
./scripts/docker-systemd.sh exec 'cd /app && ./scripts/install-systemd.sh --dry-run zeroth'

# Install systemd service
./scripts/docker-systemd.sh exec 'cd /app && ./scripts/install-systemd.sh zeroth'

# Check service status
./scripts/docker-systemd.sh exec 'systemctl status zeroth@zeroth.service'

# View logs
./scripts/docker-systemd.sh exec 'journalctl -u zeroth@zeroth.service -n 50'
```

### 5. Stop Container

```bash
./scripts/docker-systemd.sh stop
```

### 6. Clean Up

```bash
./scripts/docker-systemd.sh clean
```

## Using with Autonomous Agent

The autonomous agent can automatically test systemd installation in Docker:

```bash
# Run systemd tests via autonomous agent
zeroth auto test --mode systemd-test

# Or via Python directly
python -m autonomous_agent run --mode systemd-test
```

## Container Details

### Volumes

The container mounts:
- `./scripts` → `/app/scripts` (read-only)
- `./examples` → `/app/examples` (read-only)
- `./autonomous_agent` → `/app/autonomous_agent` (read-only)
- `./.zeroth` → `/app/.zeroth` (read-write, for checkpoints)

### Ports

- `101` - ZerothVM API
- `3000` - zeroth-web
- `3001` - thth-web

### Environment Variables

Passed from host:
- `GEMINI_API_KEY` - For autonomous agent reasoning
- `ZEROTH_RPC_URL` - Ethereum RPC URL (optional)

## Troubleshooting

### Container Won't Start

Check Docker Desktop is running:

```bash
docker ps
```

### Systemd Not Running

Ensure container is started with `--privileged` flag (handled by docker-compose):

```bash
docker exec zeroth-systemd-test-1 systemctl is-system-running
```

### Permission Issues

If scripts fail with permission errors:

```bash
docker exec zeroth-systemd-test-1 chmod +x /app/scripts/*.sh
```

### View Container Logs

```bash
./scripts/docker-systemd.sh logs
```

Or:

```bash
docker-compose -f docker-compose.systemd.yml logs -f
```

## Integration with CI/CD

The Docker setup can be used in CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Build Docker image
  run: docker-compose -f docker-compose.systemd.yml build

- name: Run systemd tests
  run: |
    docker-compose -f docker-compose.systemd.yml up -d
    docker exec zeroth-systemd-test-1 ./scripts/install-systemd.sh --dry-run zeroth
    docker-compose -f docker-compose.systemd.yml down
```

## Notes

- The container runs systemd as PID 1, which requires privileged mode
- Systemd in containers has limitations compared to bare metal
- For production deployments, use actual Linux systems with systemd
- This setup is primarily for development and testing
