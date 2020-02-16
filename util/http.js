import fetch from 'isomorphic-fetch'

export async function registerFile(opts) {
  return fetch(window.origin + '/api/register-file', {
    method: 'POST',
    body: JSON.stringify(opts),
  })
}
