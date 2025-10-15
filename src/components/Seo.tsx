import { useEffect, type FC } from 'react';

type StructuredData = Record<string, unknown>;

type SeoProps = {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  structuredData?: StructuredData | StructuredData[];
};

const updateMetaTag = (
  key: string,
  value: string | undefined,
  attribute: 'name' | 'property',
  managedElements: ManagedElement[],
) => {
  if (!value) {
    return;
  }

  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  let created = false;
  let previousValue: string | null = null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
    created = true;
  } else {
    previousValue = element.getAttribute('content');
  }

  element.setAttribute('content', value);
  managedElements.push({ element, attributeName: 'content', previousValue, created });
};

const updateLinkTag = (
  rel: string,
  href: string | undefined,
  managedElements: ManagedElement[],
) => {
  if (!href) {
    return;
  }

  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  let created = false;
  let previousValue: string | null = null;

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
    created = true;
  } else {
    previousValue = element.getAttribute('href');
  }

  element.setAttribute('href', href);
  managedElements.push({ element, attributeName: 'href', previousValue, created });
};

type ManagedElement = {
  element: HTMLElement;
  attributeName: string;
  previousValue: string | null;
  created: boolean;
};

export const Seo: FC<SeoProps> = ({
  title,
  description,
  canonicalUrl,
  keywords,
  image = 'https://www.michaelsimoneau.com/profile-image.png',
  noIndex,
  structuredData,
}) => {
  const keywordContent = keywords?.join(', ');
  const serializedStructuredData = structuredData ? JSON.stringify(structuredData) : null;

  useEffect(() => {
    const previousTitle = document.title;
    if (title) {
      document.title = title;
    }

    const managedElements: ManagedElement[] = [];

    updateMetaTag('description', description, 'name', managedElements);
    updateMetaTag('keywords', keywordContent, 'name', managedElements);
    updateMetaTag('author', 'Michael Simoneau', 'name', managedElements);
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow', 'name', managedElements);

    updateMetaTag('og:title', title, 'property', managedElements);
    updateMetaTag('og:description', description, 'property', managedElements);
    updateMetaTag('og:type', 'website', 'property', managedElements);
    updateMetaTag('og:url', canonicalUrl, 'property', managedElements);
    updateMetaTag('og:image', image, 'property', managedElements);
    updateMetaTag('og:site_name', 'Michael Simoneau', 'property', managedElements);
    updateMetaTag('og:locale', 'en_US', 'property', managedElements);

    updateMetaTag('twitter:card', 'summary_large_image', 'name', managedElements);
    updateMetaTag('twitter:title', title, 'name', managedElements);
    updateMetaTag('twitter:description', description, 'name', managedElements);
    updateMetaTag('twitter:creator', '@enigmakeyceo', 'name', managedElements);
    updateMetaTag('twitter:site', '@enigmakeyceo', 'name', managedElements);
    updateMetaTag('twitter:image', image, 'name', managedElements);

    updateLinkTag('canonical', canonicalUrl, managedElements);

    let structuredDataItems: StructuredData[] = [];

    if (serializedStructuredData) {
      const parsed = JSON.parse(serializedStructuredData) as StructuredData | StructuredData[];
      structuredDataItems = Array.isArray(parsed) ? parsed : [parsed];
    }
    const scriptElements: HTMLScriptElement[] = [];

    structuredDataItems.forEach(data => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
      scriptElements.push(script);
    });

    return () => {
      document.title = previousTitle;

      managedElements.forEach(({ element, attributeName, previousValue, created }) => {
        if (created) {
          element.remove();
        } else if (previousValue !== null) {
          element.setAttribute(attributeName, previousValue);
        } else {
          element.removeAttribute(attributeName);
        }
      });

      scriptElements.forEach(script => {
        script.remove();
      });
    };
  }, [title, description, canonicalUrl, keywordContent, image, noIndex, serializedStructuredData]);

  return null;
};

export default Seo;
