export interface ProjectMetric {
  label: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export interface ProjectShowcase {
  title: string;
  company: string;
  description: string;
  metrics: ProjectMetric[];
  technologies: string[];
  achievements: string[];
}

