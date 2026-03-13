export function serializeJsonForHtmlScript(dataOrJsonString) {
  const json = typeof dataOrJsonString === 'string' ? dataOrJsonString : JSON.stringify(dataOrJsonString);
  return json
    .replace(/</g, '\\u003c')
    .replace(/-->/g, '--\\u003e')
    .replace(/<\/script/gi, '<\\/script')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

export function enforceHttpsRedirect(locationLike) {
  if (typeof window === 'undefined' && !locationLike) return;
  const location = locationLike || window.location;
  const { protocol, hostname, href } = location;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
  if (protocol === 'http:' && !isLocalhost) {
    location.replace(href.replace(/^http:/, 'https:'));
  }
}
