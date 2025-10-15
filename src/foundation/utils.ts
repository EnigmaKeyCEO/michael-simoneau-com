import { DeepPartial } from './types';

export const deepMerge = <T extends Record<string, any>>(target: T, source: DeepPartial<T>): T => {
  const output: Record<string, any> = Array.isArray(target) ? [...target] : { ...target };

  Object.entries(source ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      output[key] = [...value];
      return;
    }

    if (typeof value === 'object' && value) {
      const targetValue = output[key];
      output[key] = deepMerge(
        targetValue && typeof targetValue === 'object' ? targetValue : {},
        value as DeepPartial<Record<string, any>>,
      );
      return;
    }

    output[key] = value;
  });

  return output as T;
};
