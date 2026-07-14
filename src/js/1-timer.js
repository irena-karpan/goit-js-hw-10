'use strict'

// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

import errorIcon from '../img/error.svg';

const iziOptions = {
    position: 'topRight',
    titleColor: '#FFFFFF',
    messageColor: '#FFFFFF',
    iconColor: '#FFFFFF',
    timeout: 5000,
};


const button = document.querySelector('[data-start]');
button.disabled = true;

const input = document.querySelector('#datetime-picker');

const timerRefs = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if ((selectedDates[0].getTime() <= Date.now())) {
      showErrorWindow();
      button.disabled = true;

    } else {
      userSelectedDate = selectedDates[0];
      button.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

button.addEventListener('click', timer);

function timer() {
  button.disabled = true;
  input.disabled = true;
  
  updateTimer(convertMs(userSelectedDate.getTime() - Date.now()));

  const interval = setInterval(() => {
    const deltaTime = userSelectedDate.getTime() - Date.now();
    
    if (deltaTime <= 0) {
      updateTimer(convertMs(0));


    clearInterval(interval);
      input.disabled = false;
      userSelectedDate = null;

      return;
  }

    updateTimer(convertMs(deltaTime));
    
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  
  return value.toString().padStart(2, 0);

};

function showErrorWindow() {
  iziToast.error({

    ...iziOptions,
    title: 'Error',
    message: 'Please choose a date in the future',
    backgroundColor: '#EF4040',
    iconUrl:errorIcon,
      });
}

function updateTimer({days, hours, minutes, seconds}){
    timerRefs.days.textContent = days;
    timerRefs.hours.textContent = hours;
    timerRefs.minutes.textContent = minutes;
    timerRefs.seconds.textContent = seconds;
};