import { executeAction } from '../services/actionService.js';
import { sendSuccess } from '../utils/core.js';

export async function runAction(req, res) {
  const payload = await executeAction(req.params.actionName, {
    payload: req.body?.payload ?? req.body ?? {},
    locale: req.locale,
    t: req.t,
    requestId: req.requestId,
    isAuthenticated: req.isAuthenticated,
  });

  return sendSuccess(res, payload, { requestId: req.requestId });
}
