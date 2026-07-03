import { redirect } from 'react-router-dom';

const tokenConfig = {
  pricing: 'VITE_PRICING_ACCESS_TOKEN',
  support: 'VITE_SUPPORT_ACCESS_TOKEN',
} as const;

type GuardKey = keyof typeof tokenConfig;

function getConfiguredToken(key: GuardKey) {
  return import.meta.env[tokenConfig[key]] as string | undefined;
}

export function createProtectedPageLoader(key: GuardKey) {
  return async ({ request }: { request: Request }) => {
    const configuredToken = getConfiguredToken(key);

    if (!configuredToken || typeof window === 'undefined') {
      return null;
    }

    const url = new URL(request.url);
    const providedToken = url.searchParams.get('access');
    const storageKey = `apc.access.${key}`;

    if (providedToken === configuredToken) {
      window.sessionStorage.setItem(storageKey, configuredToken);
      return null;
    }

    if (window.sessionStorage.getItem(storageKey) === configuredToken) {
      return null;
    }

    throw redirect(`/contact?access=requested&target=${key}`);
  };
}
