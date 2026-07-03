import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app.js';

async function getCsrf(agent) {
  const response = await agent.get('/api/v1/security/csrf-token');
  return {
    token: response.body.payload.csrfToken,
    cookie: response.headers['set-cookie'],
  };
}

describe('backend app', () => {
  it('returns a health payload', async () => {
    const response = await request(app).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.payload.message).toBeTypeOf('string');
    expect(response.body.payload.database.supportedModes.relational.length).toBeGreaterThan(0);
  });

  it('returns locale-aware translation messages', async () => {
    const response = await request(app).get('/api/v1/translations/messages?locale=pt&namespace=common');

    expect(response.status).toBe(200);
    expect(response.body.payload.locale).toBe('pt');
    expect(response.body.payload.messages.messages.greeting).toContain('Bem-vindo');
  });

  it('blocks POST actions without a CSRF token', async () => {
    const response = await request(app).post('/api/v1/actions/echo').send({ payload: 'test' });

    expect(response.status).toBe(403);
    expect(response.body.error).toContain('CSRF');
  });

  it('executes a sanitized echo action with valid CSRF', async () => {
    const agent = request.agent(app);
    const { token, cookie } = await getCsrf(agent);

    const response = await agent
      .post('/api/v1/actions/echo')
      .set('Cookie', cookie)
      .set('x-csrf-token', token)
      .send({ payload: '<script>alert(1)</script> hello ' });

    expect(response.status).toBe(200);
    expect(response.body.payload.payload.payload).not.toContain('<script>');
    expect(response.body.payload.payload.payload).toContain('hello');
  });

  it('returns a localized greeting action result', async () => {
    const agent = request.agent(app);
    const { token, cookie } = await getCsrf(agent);

    const response = await agent
      .post('/api/v1/actions/localizedGreeting?locale=es')
      .set('Cookie', cookie)
      .set('x-csrf-token', token)
      .send({});

    expect(response.status).toBe(200);
    expect(response.body.payload.payload.greeting).toContain('Bienvenido');
  });

  it('protects auth-enabled actions', async () => {
    const agent = request.agent(app);
    const { token, cookie } = await getCsrf(agent);

    const unauthorized = await agent
      .post('/api/v1/actions/secureDiagnostics')
      .set('Cookie', cookie)
      .set('x-csrf-token', token)
      .send({});

    expect(unauthorized.status).toBe(401);

    const authorized = await agent
      .post('/api/v1/actions/secureDiagnostics')
      .set('Cookie', cookie)
      .set('x-csrf-token', token)
      .set('Authorization', 'Bearer test-token')
      .send({});

    expect(authorized.status).toBe(200);
    expect(authorized.body.payload.payload.envName).toBe('test');
  });
});
