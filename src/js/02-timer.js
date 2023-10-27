import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timerDiv = document.querySelector('.timer');

const labels = { 
    daysLabel: document.querySelector('[data-days]'),
    hoursLabel: document.querySelector('[data-hours]'),
    minutesLable: document.querySelector('[data-minutes]'),
    secondsLable: document.querySelector('[data-seconds]'),
}


// Мінімальне іналайнове css оформлення
timerDiv.style.display = 'flex';
timerDiv.style.flexDirection = 'row';
timerDiv.style.justifyContent = 'left';
timerDiv.style.alignItems = 'center';
timerDiv.style.gap = 20 + 'px';
timerDiv.style.paddingTop = 20 + 'px';
timerDiv.style.fontSize = 28 + 'px';

btnStart.disabled = true; // Дизактивую кнопку по дефолту.

// console.log(`Поточна дата: ${Date.now()}`);

// Бібліотека flatpickr для вибору дати і обробник умов.
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) { // Далі обробляємо все в методі onClose
    // console.log(selectedDates[0]);
    // console.log(`Обрана дата: ${selectedDates[0].getTime()}`);

    // Умови
    if (selectedDates[0] < options.defaultDate) {

    //   alert('Please choose a date in the future');
    Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;

    } else {
      btnStart.disabled = false;

      let timeIntervalId; // Оголошую назву для інтервалу, щоб в майбутньому мати змогу його видалити.

      btnStart.addEventListener('click', () => { 
        // Отримую актуальну дату з якою потім буду порівнювати обрану дату.
        let initTime = Date.now();

        timeIntervalId = setInterval(() => {
            btnStart.disabled = true; // Знову вимикаю кнопку, якщо інтервал запущений.
          const currentTime = (initTime += 1000);
          const roundedTime = Math.round(currentTime / 1000) * 1000; // Змінна помічник, яка заокруглює,
          //отримані мілісекуди до тисячних, щоб в майбутньому можна було виконати умову.

          const timeLeft = selectedDates[0].getTime() - roundedTime; //Різниця залишкового часу в ms.

        //   console.log(roundedTime);
        //   console.log(timeLeft)

   



          const { days, hours, minutes, seconds } =  convertMs(timeLeft);
          labels.daysLabel.textContent = addLeadingZero(days);
          labels.hoursLabel.textContent = addLeadingZero(hours);
          labels.minutesLable.textContent = addLeadingZero(minutes);
          labels.secondsLable.textContent = addLeadingZero(seconds);
          
          //Умова для видалення інтервалу, коли поточний час буде рівнозначним обраній даті.
          if (roundedTime === selectedDates[0].getTime()) {
            clearInterval(timeIntervalId);
          }
        }, 1000);
      });
    }
  },
};

flatpickr(input, options);



// Функція-помічник для розрахунку часу.
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
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


//Допоміжня функція, яка меревіряє кількість символів у рядку Lable
// і якщо менше ніж 2 то докладає попереду нуль. (Спочатку хотів спробувти через тернарний оператор, але через нього не вийшло)
function addLeadingZero(num) {
    return num.toString().padStart(2, "0");
            }; 