import { env } from '../config/env.js';
import { actionRegistry } from '../actions/actionRegistry.js';
import { AppError } from '../utils/core.js';

export async function executeAction(actionName, context) {
  const action = actionRegistry[actionName];
  if (!action) {
    throw new AppError(`Unknown action: ${actionName}`, 404);
  }

  if (action.authRequired && !context.isAuthenticated) {
    throw new AppError('Authentication is required for this action', 401);
  }

  const payload = await action.handler({
    payload: context.payload,
    locale: context.locale,
    t: context.t,
    requestId: context.requestId,
    envName: env.nodeEnv,
  });

  return {
    action: actionName,
    description: action.description,
    payload,
  };
}
