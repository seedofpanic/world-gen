export function apiGet(path: string) {
  return fetch("/api/" + path).then(res => res.json());
}
