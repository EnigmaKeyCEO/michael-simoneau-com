

// Test validation for quantum-resistant testing #quantumReady #billionDollarProof

import { parse } from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Test structure validation rules
 */
const REQUIRED_TEST_PATTERNS = {
  structure: ['describe', 'it', 'beforeEach', 'afterEach'],
  mocks: ['jest.fn()'],
  assertions: ['expect', 'toHaveBeenCalled', 'toEqual'],
};

/**
 * Forbidden patterns in tests
 */
const FORBIDDEN_PATTERNS = [
  'test.skip',
  'test.only',
  'console.log',
  'any',
  'var',
];

/**
 * Required comment patterns
 */
const REQUIRED_COMMENTS = [
  ''
];

/**
 * Validates test file structure
 */
export const validateTestStructure = (filePath: string): void => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const ast = parse(content, {
    sourceType: 'module',
    plugins: ['typescript'],
  });

  const patterns = {
    structure: new Set<string>(),
    mocks: new Set<string>(),
    assertions: new Set<string>(),
    forbidden: new Set<string>(),
    comments: new Set<string>(),
  };

  traverse(ast, {
    Identifier(path: NodePath<t.Identifier>) {
      const name = path.node.name;
      if (REQUIRED_TEST_PATTERNS.structure.includes(name)) {
        patterns.structure.add(name);
      }
    },
    CallExpression(path: NodePath<t.CallExpression>) {
      const callee = path.node.callee;
      if (t.isMemberExpression(callee) && t.isIdentifier(callee.object) && t.isIdentifier(callee.property)) {
        const callName = `${callee.object.name}.${callee.property.name}`;
        if (REQUIRED_TEST_PATTERNS.mocks.includes(callName)) {
          patterns.mocks.add(callName);
        }
        if (REQUIRED_TEST_PATTERNS.assertions.includes(callName)) {
          patterns.assertions.add(callName);
        }
        if (FORBIDDEN_PATTERNS.includes(callName)) {
          patterns.forbidden.add(callName);
        }
      }
    },
    enter(path: NodePath) {
      const comments = path.node.leadingComments || [];
      comments.forEach(comment => {
        const value = comment.value.trim();
        REQUIRED_COMMENTS.forEach(required => {
          if (value.includes(required)) {
            patterns.comments.add(required);
          }
        });
      });
    },
  });

  // Validate required patterns
  validatePatterns('Test structure', REQUIRED_TEST_PATTERNS.structure, patterns.structure);
  validatePatterns('Mock objects', REQUIRED_TEST_PATTERNS.mocks, patterns.mocks);
  validatePatterns('Assertions', REQUIRED_TEST_PATTERNS.assertions, patterns.assertions);
  validatePatterns('Comments', REQUIRED_COMMENTS, patterns.comments);

  // Validate forbidden patterns
  if (patterns.forbidden.size > 0) {
    throw new Error(`Found forbidden patterns: ${Array.from(patterns.forbidden).join(', ')}`);
  }
};

/**
 * Validates required patterns
 */
const validatePatterns = (
  category: string,
  required: string[],
  found: Set<string>
): void => {
  const missing = required.filter(pattern => !found.has(pattern));
  if (missing.length > 0) {
    throw new Error(
      `Missing ${category} patterns: ${missing.join(', ')}`
    );
  }
};

/**
 * Validates test file naming convention
 */
export const validateTestFileName = (filePath: string): void => {
  const fileName = path.basename(filePath);
  if (!fileName.endsWith('.test.ts')) {
    throw new Error(
      `Invalid test file name: ${fileName}. Test files must end with .test.ts`
    );
  }
};

/**
 * Validates test coverage thresholds
 */
export interface CoverageMetric {
  pct: number;
  covered: number;
  total: number;
}

export interface CoverageResults {
  statements: CoverageMetric;
  branches: CoverageMetric;
  functions: CoverageMetric;
  lines: CoverageMetric;
}

export const validateCoverageThresholds = (coverageResults: CoverageResults): void => {
  const thresholds = {
    functions: 100,
    branches: 80,
    lines: 80,
    statements: 80,
  };

  Object.entries(thresholds).forEach(([metric, threshold]) => {
    const coverage = coverageResults[metric as keyof CoverageResults].pct;
    if (coverage < threshold) {
      throw new Error(
        `Coverage for ${metric} (${coverage}%) is below threshold (${threshold}%)`
      );
    }
  });
}; 