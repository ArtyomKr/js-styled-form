const url = 'http://localhost:9090/api/registration';

export default function sendForm(form) {
  return fetch(url, {
    method: 'POST',
    body: new FormData(form),
  });
}
