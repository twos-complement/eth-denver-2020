import fetch from 'isomorphic-fetch'

export async function registerFile(opts) {
  console.log('registering file', opts)
  return fetch(window.origin + '/api/register-file', {
    method: 'POST',
    body: JSON.stringify(opts),
  })
}
