import { sendSuccess } from '../utils/core.js';
import { getHealthSnapshot, getMessages } from '../services/systemService.js';

export async function getHealth(req, res) {
  const snapshot = await getHealthSnapshot();
  const message = await req.t('common:messages.healthOk');
  return sendSuccess(res, { ...snapshot, message }, { requestId: req.requestId });
}

export async function getCsrfToken(req, res) {
  return sendSuccess(res, { csrfToken: req.csrfToken }, { locale: req.locale });
}

export async function getTranslationMessages(req, res) {
  const payload = await getMessages(req.query.locale || req.locale, req.query.namespace || 'common');
  return sendSuccess(res, payload, { requestId: req.requestId });
}
