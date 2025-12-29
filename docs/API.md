# Zeroth Web API Documentation

## Overview

The Zeroth Web API provides REST endpoints and WebSocket streaming for accessing VM state, history, blocks, hashes, and ledger data.

**Crucially, the API is not a static set of endpoints, but a dynamic reflection of the running `.zero` program.** Accessing an API resource is equivalent to observing a state in the Zeroth VM.

## Base URL

- **HTTP**: `http://localhost:101`
- **WebSocket**: `ws://localhost:101/ws` (if implemented)

## Dynamic State Observation

Any state defined in the running `.zero` program can be observed via the API.

### GET `/api/state/<state_name>`

Observe a specific state. This returns the current value (influence/divergence) of the state and its contribution to convergence.

**Response**:
```json
{
  "name": "HELLO",
  "value": 0.8,
  "convergence": 0.456789,
  "iteration": 1234
}
```

## REST Endpoints

### GET `/api/state`

Get current VM global state.

**Response**:
```json
{
  "iteration": 1234,
  "convergence": 0.456789,
  "epsilon": 0.001,
  "num_hashes": 42,
  "num_tokens": 10,
  "num_dimensions": 5
}
```

### GET `/api/history`

Get observation history.

**Query Parameters**:
- `limit` (optional): Maximum number of records (default: all)
- `offset` (optional): Offset for pagination (default: 0)

**Response**:
```json
{
  "records": [
    {
      "iteration": 1234,
      "timestamp": 1234567890.0,
      "convergence": 0.456789,
      "dominant_state": "HELLO",
      "projection": {"HELLO": 0.8, "WORLD": 0.2}
    }
  ],
  "count": 100,
  "offset": 0
}
```

### GET `/api/blocks`

Get active blocks.

**Response**:
```json
{
  "blocks": [
    {
      "id": "block_1",
      "tier": 2,
      "convergence": 0.123,
      "halflife": 100,
      "num_hashes": 5,
      "created_iteration": 1000
    }
  ],
  "count": 1
}
```

### GET `/api/hashes`

Get DNA hashes (limited to 100 for performance).

**Response**:
```json
{
  "hashes": [
    {
      "id": "A1B2C3D4E5F67890...",
      "weight": 1000,
      "price": 5000,
      "halflife": 100,
      "iteration": 1234
    }
  ],
  "count": 42
}
```

### GET `/api/ledger`

Get ledger records.

**Query Parameters**:
- `limit` (optional): Maximum number of records
- `offset` (optional): Offset for pagination

**Response**:
```json
{
  "records": [
    {
      "type": "OBSERVE",
      "iteration": 1,
      "timestamp": 1234567890.0,
      "record_hash": "...",
      "dna_hash": "...",
      "parent_hash": "..."
    }
  ],
  "count": 100,
  "total": 1234,
  "offset": 0
}
```

### GET `/api/observe`

Trigger observation and get current projection.

**Response**:
```json
{
  "iteration": 1234,
  "convergence": 0.456789,
  "dominant_state": "HELLO",
  "projection": {
    "HELLO": 0.8,
    "WORLD": 0.2
  }
}
```

### GET `/api/projection`

Get current projection.

**Response**:
```json
{
  "projection": {
    "HELLO": 0.8,
    "WORLD": 0.2
  }
}
```

## WebSocket Streaming

### Connection

Connect to `ws://localhost:101/ws` (if implemented).

### Message Types

#### `initial_state`
Sent when client connects.

```json
{
  "type": "initial_state",
  "data": {
    "iteration": 1234,
    "convergence": 0.456789,
    "projection": {...},
    "num_hashes": 42
  }
}
```

#### `state_update`
Sent periodically with VM state updates.

```json
{
  "type": "state_update",
  "data": {
    "iteration": 1235,
    "convergence": 0.456890,
    "projection": {...},
    "num_hashes": 43
  }
}
```

#### `history_update`
Sent when new observation is recorded.

```json
{
  "type": "history_update",
  "data": {
    "iteration": 1235,
    "timestamp": 1234567891.0,
    "convergence": 0.456890,
    "dominant_state": "HELLO"
  }
}
```

## CORS

All endpoints support CORS with:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type`

## Error Responses

All endpoints return JSON error responses:

```json
{
  "error": "Error message"
}
```

## Examples

### Get Current State

```bash
curl http://localhost:101/api/state
```

### Observe a Specific State

```bash
curl http://localhost:101/api/state/HELLO
```

### Get Recent History

```bash
curl "http://localhost:101/api/history?limit=10&offset=0"
```

### Get Active Blocks

```bash
curl http://localhost:101/api/blocks
```

### Trigger Observation

```bash
curl http://localhost:101/api/observe
```

## Integration

### JavaScript/TypeScript

```javascript
// Fetch state
const response = await fetch('http://localhost:101/api/state');
const state = await response.json();
console.log(`Iteration: ${state.iteration}, Convergence: ${state.convergence}`);

// Observe specific state
const helloResponse = await fetch('http://localhost:101/api/state/HELLO');
const hello = await helloResponse.json();
console.log(`HELLO Value: ${hello.value}`);
```

### Python

```python
import requests

# Get state
response = requests.get('http://localhost:101/api/state')
state = response.json()
print(f"Iteration: {state['iteration']}, Convergence: {state['convergence']}")

# Observe specific state
hello_response = requests.get('http://localhost:101/api/state/HELLO')
hello = hello_response.json()
print(f"HELLO Value: {hello['value']}")
```

## Notes

- All endpoints return JSON
- State endpoints trigger observations (may affect VM state)
- History endpoints are read-only
- Blocks and hashes endpoints are read-only
- Ledger endpoint provides pagination support
