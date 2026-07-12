// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



const button = document.querySelector('[data-start]');
button.disabled = true;

const input = document.querySelector('#datetime-picker');

const refs = {
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
    console.log(selectedDates[0]);
    if ((selectedDates[0].getTime() - Date.now()) < 0) {
      // window.alert('Please choose a date in the future');

      iziToast.show({
  title: 'Error',
  message: 'Please choose a date in the future',
  position: 'topRight',

  backgroundColor: '#EF4040',
  titleColor: '#FFFFFF',
  messageColor: '#FFFFFF',
  iconUrl:'../img/error.svg',
  iconColor: '#FFFFFF',
  
  progressBar: false,
  timeout: 5000,
      });
      
      button.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      button.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

button.addEventListener('click', timer);

function timer(event) {
  button.disabled = true;
  input.disabled = true;
  
 

  const interval = setInterval(() => {
    const deltaTime = userSelectedDate.getTime() - Date.now();
    
    if (deltaTime <= 0) {
    clearInterval(interval);
      input.disabled = false;
      return;
  }

    const formatedDate = addLeadingZero(convertMs(deltaTime));

    refs.days.textContent = formatedDate.day;
    refs.hours.textContent = formatedDate.hour;
    refs.minutes.textContent = formatedDate.minute;
    refs.seconds.textContent = formatedDate.second;

    
  }, 1000);
  
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero({days, hours, minutes, seconds}){
  const day = days.toString().padStart(2, "0");
  const hour = hours.toString().padStart(2, "0");
  const minute = minutes.toString().padStart(2, "0");
  const second = seconds.toString().padStart(2, "0");
  
  return { day, hour, minute, second };
};