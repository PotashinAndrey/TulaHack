import fetch from "node-fetch";

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
    return await r.json();
  } catch(e) {
    console.log('Huston, we have problem...:', e);
    return Promise.reject(e);
  }
}
