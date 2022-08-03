export function apiGet<R>(path: string): Promise<R> {
  return fetch("http://localhost:3000/api/" + path).then(res => res.json());
}

export function apiPost<T, R>(path: string, body?: T): Promise<T> {
  return fetch("http://localhost:3000/api/" + path, {method: "post", body: JSON.stringify(body)}).then(res => res.json());
}
