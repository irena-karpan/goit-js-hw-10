'use strict'
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

import errorIcon from '../img/error.svg';
import okIcon from '../img/ok.svg';


const form = document.querySelector('form');

const iziOptions = {
    position: 'topRight',
    titleColor: '#FFFFFF',
    messageColor: '#FFFFFF',
    iconColor: '#FFFFFF',
    timeout: 5000,
};

form.addEventListener('submit', makePromise);

function makePromise(event) {

    event.preventDefault();

    const radioOption = event.target.elements.state.value;
    const delay = Number(event.target.elements.delay.value);

    // delayValidation(delay);
        
    createPromise(radioOption, delay)
        .then(value => showResolve(value))
        .catch(error => showError(error));
    
        event.target.reset();
}

function createPromise(option, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            option === 'fulfilled' ? resolve(delay) : reject(delay);
            
        }, delay);
        
    })
}

function showResolve(delay) {
    iziToast.success({
        ...iziOptions,
        title: "OK",
        message: `Fulfilled promise in ${delay}ms`,
        backgroundColor:'#59a10d',
        iconUrl: okIcon,
    });
}

function showError(delay) {
    iziToast.error({
         ...iziOptions,
        title: "Error",
        message: `Rejected promise in ${delay}ms`,
        backgroundColor:'#EF4040',
        iconUrl: errorIcon,
    });
}

// function delayValidation(value) {
//     if (!value) {
//         iziToast.info({
//         title: "Caution",
//         message: `You forgot important data`,
//         position: 'topRight',

//         backgroundColor:'#ffa000',
//         titleColor: '#FFFFFF',
//         messageColor: '#FFFFFF',
//         iconUrl:'./img/caution.svg',
//         iconColor: '#FFFFFF',
//         timeout: 5000,
//     });
//     }
// }