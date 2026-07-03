import express from 'express';
import { body, param, query } from 'express-validator';
import { runAction } from '../controllers/actionController.js';
import { getCsrfToken, getHealth, getTranslationMessages } from '../controllers/systemController.js';
import {
  optionalAuth,
  requireCsrf,
  validateRequest,
} from '../middleware/core.js';
import { asyncHandler } from '../utils/core.js';

export const apiRouter = express.Router();

apiRouter.get('/health', asyncHandler(getHealth));
apiRouter.get('/security/csrf-token', asyncHandler(getCsrfToken));
apiRouter.get(
  '/translations/messages',
  query('namespace').optional().isString(),
  query('locale').optional().isString(),
  validateRequest,
  asyncHandler(getTranslationMessages),
);

apiRouter.post(
  '/actions/:actionName',
  requireCsrf,
  optionalAuth,
  param('actionName').isString().trim().notEmpty(),
  body().optional().isObject(),
  validateRequest,
  asyncHandler(runAction),
);
