import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('input');
const textereaRef = document.querySelector('textarea');
const btnRef = document.querySelector('button');
const STORAGE_KEY = 'feedback-form-state';
const formData = {};
saveTxt();
formRef.addEventListener('input', throttle(inpTxt, 500));
formRef.addEventListener('submit', onSubmit);

function inpTxt(evn) {
  formData[evn.target.name] = evn.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmit(evn) {
  evn.preventDefault();
  if (!inputRef.value || !textereaRef.value) {
    alert('Всі поля повинні бути заповнені!');
  }
  if (inputRef.value && textereaRef.value) {
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    evn.currentTarget.reset();
  }
}

function saveTxt(evn) {
  const saveMessage = localStorage.getItem(STORAGE_KEY);
  const parsedMessage = JSON.parse(saveMessage);
  if (saveMessage) {
    if (parsedMessage.email) {
      inputRef.value = parsedMessage.email;
    }
    if (parsedMessage.message) {
      textereaRef.value = parsedMessage.message;
    }
  }
}
