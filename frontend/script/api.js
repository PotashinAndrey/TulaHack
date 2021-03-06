export async function upload(data = {}, timeout = 5000) {
  let body = new FormData();

  Object
    .keys(data)
    .map(name => body.append(name, data[name]));

  const ctrl = new AbortController() // timeout
  setTimeout(() => ctrl.abort(), timeout);

  try {
    let r = await fetch('/upload', {
      method: "POST",
      body,
      signal: ctrl.signal
    });
    console.log('HTTP response code:', r.status);
    return await r.json();
  } catch(e) {
    console.log('Huston, we have problem...:', e);
    return Promise.reject(e);
  }
};

export default async function api(method, data = {}, timeout = 5000) {
  const ctrl = new AbortController() // timeout
  setTimeout(() => ctrl.abort(), timeout);

  try {
    let r = await fetch('/api/' + method , {
      method: "POST",
      body: JSON.stringify(data),
      signal: ctrl.signal,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
    console.log('HTTP response code:', r.status);
    return r.status === 204 ? [] : await r.json()
  } catch(e) {
    console.log('Huston, we have problem...:', e);
    return Promise.reject(e);
  }
}
