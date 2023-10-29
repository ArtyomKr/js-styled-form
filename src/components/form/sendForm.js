const url = 'http://localhost:9090/api/registration';

export default async function sendForm(form) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: new FormData(form),
    });
    return res.json();
  } catch (e) {
    return { status: 'networkError', message: e.message || 'Network error occurred' };
  }
}
