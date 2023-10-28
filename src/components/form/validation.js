export function displayErr(input, text) {
  const textfield = input.closest('.textfield');
  const errorText = textfield.querySelector('.textfield__error-text');
  textfield.classList.add('textfield-error');
  errorText.innerHTML = text;
}

export function clearErr(input) {
  const textfield = input.closest('.textfield');
  textfield.classList.remove('textfield-error');
}

export function validateFeedbackForm(form) {
  let isValid = true;

  Array.from(form.elements).forEach((elem) => {
    if (elem.tagName !== 'INPUT' && elem.tagName !== 'TEXTAREA') return;
    if (elem.value.length < 1) {
      isValid = false;
      displayErr(elem, 'This field is required');
    } else if (elem.name === 'number' && elem.value.includes('_')) {
      isValid = false;
      displayErr(elem, 'Invalid phone number');
    } else if (elem.name === 'email' && !elem.value.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i)) {
      isValid = false;
      displayErr(elem, 'Invalid email address');
    } else clearErr(elem);
  });

  return isValid;
}
