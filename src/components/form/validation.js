function displayValErr(input, text) {
  const textfield = input.closest('.textfield');
  const errorText = textfield.querySelector('.textfield__error-text');
  textfield.classList.add('textfield-error');
  errorText.innerHTML = text;
}

function clearValErr(input) {
  const textfield = input.closest('.textfield');
  textfield.classList.remove('textfield-error');
}

export function displayValErrors(errorsObj, form) {
  Object.entries(errorsObj).forEach(([fieldName, errorText]) => {
    if (form.elements[fieldName]) displayValErr(form.elements[fieldName], errorText);
  });
}

export function validateRegistrationForm(form) {
  let isValid = true;

  Array.from(form.elements).forEach((elem) => {
    if (elem.tagName !== 'INPUT' && elem.tagName !== 'TEXTAREA') return;
    if (elem.value.length < 1) {
      isValid = false;
      displayValErr(elem, 'This field is required');
    } else if (elem.name === 'number' && elem.value.includes('_')) {
      isValid = false;
      displayValErr(elem, 'Invalid phone number');
    } else if (elem.name === 'email' && !elem.value.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i)) {
      isValid = false;
      displayValErr(elem, 'Invalid email address');
    } else clearValErr(elem);
  });

  return isValid;
}
