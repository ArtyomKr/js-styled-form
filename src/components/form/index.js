import IMask from 'imask';
import { displayValErrors, validateRegistrationForm } from './validation';
import sendForm from './sendForm';

const form = document.forms.feedbackForm;
const numberInput = form.elements.number;
const mask = IMask(numberInput, {
  mask: '+{375} (00) 000-00-00',
  lazy: false,
});

function displayFormMsg(status, msg) {
  const formMessage = form.querySelector('.form__message');
  formMessage.innerHTML = msg;
  if (status === 'success') formMessage.classList.add('form__message-success');
  else formMessage.classList.add('form__message-error');
}

function clearFormMsg() {
  const formMessage = form.querySelector('.form__message');
  formMessage.classList.remove('form__message-error');
  formMessage.classList.remove('form__message-success');
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
    const res = await sendForm(form);
    const message = await res.json();

    if (message.status !== 'success' && message.fields) displayValErrors(message.fields, form);
    else clearForm();
    displayFormMsg(message.status, message.message);
  } else clearFormMsg();
  toggleSubmitButton();
});
