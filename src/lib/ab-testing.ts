type Variant = 'control' | 'variant_a' | 'variant_b';

interface Experiment {
  key: string;
  variants: Record<Variant, number>;
  selected?: Variant;
}

const experiments: Record<string, Experiment> = {};

function getVariant(key: string): Variant {
  const experiment = experiments[key];
  if (!experiment) {
    experiments[key] = {
      key,
      variants: { control: 0.5, variant_a: 0.25, variant_b: 0.25 },
    };
    return 'control';
  }
  return experiment.selected || 'control';
}

export function abTest<T>(key: string, variants: Record<Variant, T>): T {
  const variant = getVariant(key);
  return variants[variant];
}

export function trackExperiment(key: string, variant: Variant, event: string) {
  if (typeof window === 'undefined') return;
  try {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event,
      experimentKey: key,
      variant,
      timestamp: new Date().toISOString(),
    });
  } catch {
    // ignore analytics errors
  }
}

export function getExperiments() {
  return experiments;
}
