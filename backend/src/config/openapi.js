import { env } from './env.js';

export const openapiSpec = {
  openapi: '3.1.0',
  info: {
    title: 'APC Backend API',
    version: '1.0.0',
    description: 'Scalable backend foundation for business logic, localization, security, and future database features.',
  },
  servers: [
    {
      url: env.swaggerServerUrl,
      description: `${env.nodeEnv} server`,
    },
  ],
  tags: [
    { name: 'System' },
    { name: 'Actions' },
    { name: 'Translations' },
    { name: 'Security' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
      csrfToken: {
        type: 'apiKey',
        in: 'header',
        name: env.csrfHeaderName,
      },
    },
  },
  paths: {
    '/': {
      get: {
        tags: ['System'],
        summary: 'Root status endpoint',
        responses: {
          '200': {
            description: 'Backend root metadata',
          },
        },
      },
    },
    [`${env.apiPrefix}/health`]: {
      get: {
        tags: ['System'],
        summary: 'Health check endpoint',
        responses: {
          '200': {
            description: 'Service health payload',
          },
        },
      },
    },
    [`${env.apiPrefix}/security/csrf-token`]: {
      get: {
        tags: ['Security'],
        summary: 'Issues a CSRF token cookie and returns the token',
        responses: {
          '200': {
            description: 'CSRF token response',
          },
        },
      },
    },
    [`${env.apiPrefix}/translations/messages`]: {
      get: {
        tags: ['Translations'],
        summary: 'Returns locale messages for a namespace',
        parameters: [
          { name: 'locale', in: 'query', schema: { type: 'string' } },
          { name: 'namespace', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          '200': {
            description: 'Translation payload',
          },
        },
      },
    },
    [`${env.apiPrefix}/actions/{actionName}`]: {
      post: {
        tags: ['Actions'],
        summary: 'Executes a registered business action',
        security: [{ csrfToken: [] }],
        parameters: [
          { name: 'actionName', in: 'path', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: false,
          content: {
            'application/json': {
              schema: {
                type: 'object',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Action response',
          },
        },
      },
    },
  },
};
