export const actionRegistry = {
  echo: {
    authRequired: false,
    description: 'Echoes a sanitized payload back to the client.',
    handler: async ({ payload, locale }) => ({
      payload,
      locale,
    }),
  },
  localizedGreeting: {
    authRequired: false,
    description: 'Returns a locale-aware greeting for UI integration.',
    handler: async ({ locale, t }) => {
      const greeting = await t('common:messages.greeting');
      return {
        locale,
        greeting,
      };
    },
  },
  secureDiagnostics: {
    authRequired: true,
    description: 'Example protected server-side action.',
    handler: async ({ requestId, envName }) => ({
      requestId,
      envName,
    }),
  },
};
