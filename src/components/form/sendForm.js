export default function sendForm(form) {
  return fetch('http://localhost:9090', {
    method: 'POST',
    body: new FormData(form),
  });
}
