

// #quantumReady #billionDollarProof

export class InterviewError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InterviewError';
  }
}

export class ServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServiceError';
  }
} 