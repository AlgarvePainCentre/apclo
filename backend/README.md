# APC Backend

Production-ready Express foundation intended to grow with the website's backend needs.

## Included Foundations

- Environment separation for `development`, `staging`, `production`, and `test`
- Modular folders for `routes`, `controllers`, `services`, `models`, `middleware`, `config`, and `utils`
- Database abstraction scaffolding for:
  - PostgreSQL / MySQL with native drivers
  - PostgreSQL / MySQL with Sequelize
  - MongoDB with the native driver
  - MongoDB with Mongoose
- JSON-based translation storage with locale-aware middleware
- Standardized server-side action execution pipeline
- Security middleware for:
  - Helmet headers
  - CORS
  - Rate limiting
  - Input validation
  - CSRF protection
  - Input sanitization
- OpenAPI documentation exposed through Swagger UI
- Vitest + Supertest coverage for the base foundation

## Install

```bash
cd backend
npm install
```

## Run

```bash
npm run dev
npm run start:staging
npm run start
```

## Test

```bash
npm test
```

## API Surface

- `GET /` : root status
- `GET /openapi.json` : raw OpenAPI spec
- `GET /api-docs` : Swagger UI
- `GET /api/v1/health` : health check
- `GET /api/v1/security/csrf-token` : issues CSRF token
- `GET /api/v1/translations/messages` : returns locale namespace messages
- `POST /api/v1/actions/:actionName` : executes a registered business action

## Extending The Architecture

### New Business Endpoint

1. Add the service logic in `src/services`
2. Add or extend a controller in `src/controllers`
3. Register validation in `src/routes/index.js`
4. Add integration tests in `tests`

### New Action

1. Add a new entry to `src/actions/actionRegistry.js`
2. Define whether the action requires auth
3. Reuse `payload`, `locale`, `t`, and `requestId` from the action context
4. Document the action in `src/config/openapi.js`

### New Translation Namespace

1. Add `src/i18n/<locale>/<namespace>.json`
2. Request it via `/api/v1/translations/messages?namespace=<namespace>`
3. Use `req.t('namespace:path.to.key')` in controllers and services

### New Database Integration

1. Set `DB_CLIENT` to `postgres`, `mysql`, or `mongodb`
2. Set `DB_ORM` to `native`, `sequelize`, or `mongoose`
3. Fill in the matching connection variables
4. Add concrete models to `src/models/index.js`

## Security Notes

- Use parameterized queries or ORM-generated queries only
- Keep `AUTH_BEARER_TOKEN` and database credentials out of source control
- Enforce HTTPS in production deployments
- Pair the CSRF token endpoint with frontend header injection on unsafe HTTP methods
