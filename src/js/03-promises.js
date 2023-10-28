import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => { //Вішаємо слухача на форму, який буде реагувати на submit.
  event.preventDefault(); // Одразу перериваємо дефолтну поведінку сабміту.

  const delayInput = document.getElementsByName('delay')[0]; // Витягуємо з розмітки інпути в змінні для роботи з їх значеннями в майбутньому.
  const stepInput = document.getElementsByName('step')[0];
  const amountInput = document.getElementsByName('amount')[0];
  
  for (let i = 0; i < Number(amountInput.value); i++) { // Через цикл будемо щоразу викликати функцію createPromise, а відповідно щоразу будемо створювати і отримувати проміс.
  const promise =  createPromise(i + 1, Number(delayInput.value) + Number(stepInput.value) * i); // Виклик функції передаємо в змінну. Аргументами функції будуть введені значення отримані з інпутів.

  promise // Далі обробка резултату виклику функції (тобто отриманого промісу)
  .then(({ position, delay }) => { // Якщо все ок, тоді виводимо в консоль номер промісу та його затримку.
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => { // Якщо не ок, тоді теж виводимо в консоль номер промісу та його затримку. 
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  })
  
    }
})




function createPromise(position, delay) { // Генератор промісів
const promise = new Promise((resolve, reject) => { // Створюємо проміс через клас і задаємо успішне виконання промісу, або ж ні.
  const shouldResolve = Math.random() > 0.3; // Генератор випадкового числа з умовою.

  const newObject = { // Створюємо допоміжний об`єкт, який будемо передавати як результат виконання. (можна передавати його властивості на пряму, але нехай буле так)
    position,
    delay
  }

  setTimeout(() => { // Робимо затримку СетТаймаут (Час затримки вкаже юзер в delay)
    if (shouldResolve) {  // Далі умова, якщо згенероване число за визначеною > 0.3, тоді 
       // Fulfill         // успішне виконання проміму, а якщо менше тоді - ні.
      resolve(newObject);
    } else {   
       // Reject
      reject(newObject);
    }}, delay)
})
return promise; // *Повертаємо отриманий проміс.
}


