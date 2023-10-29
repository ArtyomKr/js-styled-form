const modal = document.querySelector('.modal');
const openerButton = document.querySelector('.button-modal');
const closeButton = document.querySelector('.modal__close');
const body = document.querySelector('.body');

function closeModal() {
  modal.classList.remove('modal_open');
  body.classList.remove('body_noscroll');
}

function openModal() {
  modal.classList.add('modal_open');
  body.classList.add('body_noscroll');
}

openerButton.addEventListener('click', () => {
  openModal();
});

closeButton.addEventListener('click', () => {
  closeModal();
});

document.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
