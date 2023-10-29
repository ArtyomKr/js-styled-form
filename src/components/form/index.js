import IMask from 'imask';
import { displayValErrors, validateRegistrationForm } from './validation';
import sendForm from './sendForm';

const form = document.forms.registrationForm;
const numberInput = form.elements.number;
const mask = IMask(numberInput, {
  mask: '+{375} (00) 000-00-00',
  lazy: false,
});

function displayFormMsg(status, msg) {
  const formMessage = form.querySelector('.form__message');
  formMessage.innerHTML = msg;
  if (status === 'success') formMessage.classList.add('form__message_success');
  else formMessage.classList.add('form__message_error');
}

function clearFormMsg() {
  const formMessage = form.querySelector('.form__message');
  formMessage.classList.remove('form__message_error');
  formMessage.classList.remove('form__message_success');
}

function clearForm() {
  clearFormMsg();
  form.reset();
  mask.value = '';
}

function toggleSubmitButton() {
  const submitButton = form.querySelector('.button[type=submit]');
  const isDisabled = submitButton.hasAttribute('disabled');
  if (isDisabled) submitButton.removeAttribute('disabled');
  else submitButton.setAttribute('disabled', '');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  toggleSubmitButton();
  if (validateRegistrationForm(e.target)) {
    const message = await sendForm(form);

    if (message.status !== 'success' && message.fields) displayValErrors(message.fields, form);
    else if (message.status === 'success') clearForm();
    displayFormMsg(message.status, message.message);
  } else clearFormMsg();
  toggleSubmitButton();
});
