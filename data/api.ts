export function apiGet(path: string) {
  return fetch("http://localhost:3000/api/" + path).then(res => res.json());
}
