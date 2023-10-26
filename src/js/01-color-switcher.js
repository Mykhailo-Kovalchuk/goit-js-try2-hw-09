const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body')

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }


btnStart.addEventListener('click', colorSwitcher); //Вішаємо слухача на кнопку Старт

  function colorSwitcher () { // Створюєму ф-цію-перемикач
    btnStart.disabled = true; // Під час виклику функції дизактивуємо кнопку Старт


//Робимо інтервал (через змінну, щоб потім використати її id як для видалення) 
// в 1 сек для виклику ф-ції-рандомайзера і зміни кольру тла.
// Також додав виведення в консоль актуального кольору тла при його зміні.
    const colorInterval = setInterval(() => { 
       const newColor = body.style.backgroundColor = getRandomHexColor();
        console.log(`The new BackgroundColor is hex: ${newColor}`)
    },  1000);

    // Вішаємо слухача на кнопку Стоп (вішаю в середині функції для слухача кнопки Старт, 
    // щоб кнопка Стоп "слухалась" лише під час виконання слухача Старт, аби на 
    // window не висіло 2 слухача), роблю кнопку Старт знову 
    // активною, видаляю Інтервал і виводжу в консоль її активацію. 
btnStop.addEventListener('click', () => {
    btnStart.disabled = false;
    clearInterval(colorInterval);
    console.log('Interval has stopped')
})
  }
