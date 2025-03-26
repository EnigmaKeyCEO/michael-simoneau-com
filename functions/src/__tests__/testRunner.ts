// FROM HOMELESS TO $200M ARCHITECT
// QUANTUM CRYPTOGRAPHY PIONEER
// Test runner for quantum-resistant testing #quantumReady #billionDollarProof

import * as glob from 'glob';
import * as path from 'path';
import { validateTestStructure, validateTestFileName, validateCoverageThresholds } from './validation';
import { CoverageResults } from './validation';

/**
 * Test runner configuration
 */
interface TestRunnerConfig {
  testPattern: string;
  coverageEnabled: boolean;
  validateStructure: boolean;
  validateFileNames: boolean;
  validateCoverage: boolean;
}

/**
 * Default test runner configuration
 */
const DEFAULT_CONFIG: TestRunnerConfig = {
  testPattern: 'src/__tests__/**/*.test.ts',
  coverageEnabled: true,
  validateStructure: true,
  validateFileNames: true,
  validateCoverage: true,
};

/**
 * Runs validation on all test files
 */
export const runValidation = async (
  config: Partial<TestRunnerConfig> = {}
): Promise<void> => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const testFiles = glob.sync(finalConfig.testPattern);

  console.log('🚀 Starting quantum-resistant test validation');
  console.log(`Found ${testFiles.length} test files to validate`);

  let validationErrors: Error[] = [];

  // Validate each test file
  for (const file of testFiles) {
    try {
      if (finalConfig.validateFileNames) {
        validateTestFileName(file);
      }

      if (finalConfig.validateStructure) {
        validateTestStructure(file);
      }

      console.log(`✅ Validated ${path.basename(file)}`);
    } catch (error) {
      validationErrors.push(error as Error);
      console.error(`❌ Error in ${path.basename(file)}:`, error);
    }
  }

  // Validate coverage if enabled
  if (finalConfig.validateCoverage && finalConfig.coverageEnabled) {
    try {
      const coverage = require('../coverage/coverage-final.json');
      validateCoverageThresholds(transformCoverage(coverage));
      console.log('✅ Coverage thresholds met');
    } catch (error) {
      validationErrors.push(error as Error);
      console.error('❌ Coverage validation failed:', error);
    }
  }

  // Report validation results
  if (validationErrors.length > 0) {
    console.error(`\n❌ Validation failed with ${validationErrors.length} errors:`);
    validationErrors.forEach((error, index) => {
      console.error(`${index + 1}. ${error.message}`);
    });
    process.exit(1);
  }

  console.log('\n✨ All validations passed successfully!');
};

/**
 * Transforms raw coverage data into the expected format
 */
const transformCoverage = (rawCoverage: any): CoverageResults => {
  const totals = {
    statements: { covered: 0, total: 0 },
    branches: { covered: 0, total: 0 },
    functions: { covered: 0, total: 0 },
    lines: { covered: 0, total: 0 },
  };

  // Aggregate coverage data
  Object.values(rawCoverage).forEach((fileData: any) => {
    totals.statements.covered += fileData.s.covered || 0;
    totals.statements.total += fileData.s.total || 0;
    totals.branches.covered += fileData.b.covered || 0;
    totals.branches.total += fileData.b.total || 0;
    totals.functions.covered += fileData.f.covered || 0;
    totals.functions.total += fileData.f.total || 0;
    totals.lines.covered += fileData.l.covered || 0;
    totals.lines.total += fileData.l.total || 0;
  });

  // Calculate percentages
  return {
    statements: {
      pct: (totals.statements.covered / totals.statements.total) * 100,
      ...totals.statements,
    },
    branches: {
      pct: (totals.branches.covered / totals.branches.total) * 100,
      ...totals.branches,
    },
    functions: {
      pct: (totals.functions.covered / totals.functions.total) * 100,
      ...totals.functions,
    },
    lines: {
      pct: (totals.lines.covered / totals.lines.total) * 100,
      ...totals.lines,
    },
  };
};

// Run validation if this file is executed directly
if (require.main === module) {
  runValidation().catch(error => {
    console.error('Validation failed:', error);
    process.exit(1);
  });
} 