import { Foundation } from './types';

export const defaultFoundationConfig: Foundation = {
  metadata: {
    siteName: 'React Foundation',
    defaultTitle: 'React Foundation Application',
    description: 'A React experience bootstrapped with React Foundation.',
    canonicalUrl: typeof window !== 'undefined' ? window.location.href : 'https://localhost',
    keywords: ['react', 'foundation'],
    image: {
      default: 'https://react.dev/images/logo.svg',
      alt: 'React Foundation logo',
    },
    structuredData: [],
  },
  features: {
    cryptoFabricLaunch: {
      enabled: false,
      highlightLabel: 'Preview',
      name: 'New capability',
      description: 'Feature description goes here.',
      keyBenefits: [],
      cta: {
        label: 'Learn more',
        href: '#',
      },
    },
    cookieNotice: {
      heading: 'Cookie Notice',
      body: 'We use cookies to enhance your experience.',
      acceptLabel: 'Accept',
      declineLabel: 'Decline',
      autoPlayOptIn: false,
    },
    voiceAssistant: {
      enabled: false,
      autoPlayDelayMs: 0,
      voice: {
        rate: 1,
        pitch: 1,
      },
      messages: [],
    },
  },
  runtime: {
    isBrowser: typeof window !== 'undefined',
    locale: typeof navigator !== 'undefined' ? navigator.language : 'en-US',
    timezone:
      typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'UTC' : 'UTC',
    hydrationId: 'react-foundation-root',
  },
  analytics: {
    track: event => {
      if (typeof window !== 'undefined' && 'dispatchEvent' in window) {
        window.dispatchEvent(new CustomEvent('foundation:event', { detail: event }));
      }
      if (typeof console !== 'undefined') {
        console.debug('[Foundation event]', event);
      }
    },
  },
  boundaries: [],
  registerBoundary: () => {
    // noop by default; overridden by provider
  },
};
