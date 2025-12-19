// THTH specific types
export interface ThthSection {
  title: string;
  description: string;
  features?: string[];
}

export interface ThthConfig {
  sections: ThthSection[];
}
