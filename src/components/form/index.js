import IMask from 'imask';
import { validateFeedbackForm } from './validation';

const form = document.forms.feedbackForm;
const numberInput = form.elements.number;

IMask(numberInput, {
  mask: '+{375} (00) 000-00-00',
  lazy: false,
});

form.addEventListener('submit', (e) => {
  validateFeedbackForm(e.target);
  e.preventDefault();
});
