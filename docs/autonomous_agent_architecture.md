# Autonomous Agent Architecture

## Overview

The autonomous agent system provides fully automated testing and deployment workflows for the Zeroth cryptographic system. It uses Gemini API for reasoning and vision capabilities to make intelligent decisions about what commands to execute next.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Zeroth CLI Interface                      │
│  ┌──────────────┐              ┌──────────────┐            │
│  │ auto test    │              │ auto deploy  │            │
│  └──────┬───────┘              └──────┬───────┘            │
└─────────┼────────────────────────────┼────────────────────┘
          │                              │
          └──────────────┬───────────────┘
                         │
          ┌──────────────▼──────────────┐
          │   AutonomousAgent (core)     │
          │  - Orchestrates workflow     │
          │  - Manages state            │
          │  - Coordinates components   │
          └──────────────┬───────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                 │
┌───────▼──────┐ ┌──────▼──────┐ ┌───────▼──────┐
│  Reasoner    │ │  Executor   │ │  Validator   │
│  (Gemini)    │ │  (CLI)      │ │  (Results)   │
└───────┬──────┘ └──────┬──────┘ └───────┬──────┘
        │                │                 │
        │         ┌──────▼──────┐          │
        │         │ State Mgr   │          │
        │         │ (Checkpoints)│          │
        │         └─────────────┘          │
        │                                  │
┌───────▼─────────────────────────────────▼──────┐
│            Workflow Orchestrator                 │
│  - Phase management                              │
│  - Dependency checking                           │
│  - Progress tracking                             │
└──────────────────────────────────────────────────┘
```

## Component Details

### 1. Agent Core (`agent/core.py`)

**AutonomousAgent** class is the main orchestrator:

- **Responsibilities**:
  - Coordinates all components
  - Executes workflow phases
  - Manages error recovery
  - Generates reports

- **Key Methods**:
  - `run_workflow()`: Main execution loop
  - `execute_phase()`: Execute individual phase
  - `handle_error()`: Error recovery logic
  - `check_success_condition()`: Validate phase completion
  - `generate_report()`: Create final report

### 2. Reasoner (`agent/reasoner.py`)

**Reasoner** class uses Gemini API:

- **Purpose**: Intelligent decision-making
- **Capabilities**:
  - Determines next command to execute
  - Validates results using vision
  - Suggests error recovery actions

- **Methods**:
  - `reason_about_next_action()`: Determine next command
  - `validate_with_vision()`: Analyze screenshots
  - `reason_about_recovery()`: Error recovery suggestions

### 3. CLI Executor (`cli/executor.py`)

**CLIExecutor** executes Zeroth commands:

- **Features**:
  - Subprocess execution
  - Output capture (stdout/stderr)
  - Timeout handling
  - Command history tracking

- **Methods**:
  - `execute()`: Execute generic command
  - `execute_zeroth()`: Execute Zeroth CLI command
  - `get_history()`: Get command history

### 4. Command Builder (`cli/command_builder.py`)

**CommandBuilder** constructs commands:

- **Purpose**: Build Zeroth CLI commands programmatically
- **Methods**:
  - `build_run_command()`: Build 'zeroth run' command
  - `build_contract_deploy_command()`: Build deployment command
  - Various other command builders

### 5. Validator (`agent/validator.py`)

**Validator** validates results:

- **Validation Types**:
  - Command output validation
  - API response validation
  - Vision-based validation
  - Dry-run output validation

### 6. State Manager (`agent/state_manager.py`)

**StateManager** tracks workflow state:

- **State Tracking**:
  - Current phase
  - Command history
  - VM status
  - Contract addresses
  - Web service status
  - Errors

- **Checkpoints**:
  - Create checkpoints after phases
  - Load checkpoints for resuming
  - Checkpoint validation

### 7. Workflow Orchestrator (`workflow/orchestrator.py`)

**WorkflowOrchestrator** manages phases:

- **Features**:
  - Phase progression
  - Dependency checking
  - Progress tracking
  - Phase failure handling

### 8. API Clients (`api/`)

**ZerothVMClient**: REST API client
- `get_state()`, `get_blocks()`, `observe()`, `health_check()`

**WebSocketClient**: WebSocket client
- Real-time state updates
- Message handling

**EthereumClient**: Ethereum RPC client
- Transaction monitoring
- Balance checks

### 9. Vision (`vision/`)

**GeminiClient**: Gemini API integration
- Text reasoning
- Vision analysis (screenshots)
- Structured JSON responses

**ScreenshotCapture**: Web UI screenshots
- Selenium-based capture
- Headless browser support

**ImageAnalyzer**: Image utilities
- Image info extraction
- Basic validation

## Workflow Execution Flow

```
1. User runs: zeroth auto test/deploy
   │
   ▼
2. CLI calls run_autonomous_workflow()
   │
   ▼
3. AutonomousAgent initialized
   │
   ▼
4. WorkflowOrchestrator gets phases for mode
   │
   ▼
5. For each phase:
   │
   ├─► Check dependencies
   │
   ├─► Execute phase commands
   │   │
   │   ├─► Reasoner determines action (if needed)
   │   │
   │   ├─► CLIExecutor executes command
   │   │
   │   ├─► Validator validates result
   │   │
   │   └─► StateManager records command
   │
   ├─► Check success conditions
   │
   ├─► Create checkpoint
   │
   └─► Advance to next phase
   │
6. Generate final report
```

## Error Recovery Flow

```
Error occurs
   │
   ▼
Capture error message
   │
   ▼
Send to Gemini API (Reasoner)
   │
   ▼
Receive recovery suggestion
   │
   ├─► retry: Retry command
   │
   ├─► modify_command: Retry with modification
   │
   ├─► skip: Skip to next phase
   │
   └─► abort: Abort workflow
```

## Vision Usage

Vision is used for:

1. **Web UI Validation**:
   - Capture screenshot
   - Send to Gemini with expected state
   - Receive validation result

2. **Error Analysis**:
   - Capture terminal/output screenshot
   - Analyze with Gemini
   - Get recovery suggestions

## State Management

State is tracked in `WorkflowState`:

- Current phase
- Mode (test/deploy)
- Command history
- VM status
- Contract addresses
- Web services status
- Test results
- Errors

Checkpoints save complete state for resuming workflows.

## Configuration

Configuration via environment variables:

- `GEMINI_API_KEY`: Required for reasoning
- `GEMINI_MODEL`: Model name (default: gemini-1.5-pro)
- `ZEROTH_RPC_URL`: Ethereum RPC (optional)
- `AGENT_*`: Various agent settings

## Testing

Test suite covers:

- CLI executor
- Validator
- Workflow phases
- Agent core (mocked)
- Reasoner (mocked)

## Extension Points

To add new functionality:

1. **New Phase**: Add to `workflow/phases.py`
2. **New Command**: Add builder to `cli/command_builder.py`
3. **New Validation**: Extend `agent/validator.py`
4. **New API**: Add client to `api/`

## Performance Considerations

- Commands execute sequentially (can be parallelized)
- Gemini API calls are rate-limited
- Screenshots add latency (only when needed)
- Checkpoints enable resuming long workflows

## Security Considerations

- API keys stored in environment variables
- No sensitive data in checkpoints
- Dry-run mode prevents accidental deployments
- Deploy mode requires explicit instruction
