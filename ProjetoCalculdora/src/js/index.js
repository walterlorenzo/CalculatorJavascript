const input = document.querySelector('input[type="text"]');
const buttons = document.querySelectorAll('button:not(#btn-clear)');

let previousNumber = '';
let currentNumber = '';
let operator = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;

    if (buttonValue >= '0' && buttonValue <= '9') {
      currentNumber += buttonValue;
      input.value = currentNumber;
    } else if (buttonValue === '.') {
      if (currentNumber === '') {
        currentNumber = '0.';
      } else if (!currentNumber.includes('.')) {
        currentNumber += '.';
      }
      input.value = currentNumber;
    } else if (buttonValue === 'AC') {
      clearInput();
    } else if (buttonValue === '+/-') {
      if (currentNumber !== '') {
        currentNumber = String(Number(currentNumber) * -1);
        input.value = currentNumber;
      }
    } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '×' || buttonValue === '÷') {
      if (currentNumber !== '') {
        previousNumber = currentNumber;
        operator = buttonValue;
        currentNumber = '';
      }
    } else if (buttonValue === '=') {
      if (currentNumber !== '' && previousNumber !== '') {
        let result;
        switch (operator) {
          case '+':
            result = Number(previousNumber) + Number(currentNumber);
            break;
          case '-':
            result = Number(previousNumber) - Number(currentNumber);
            break;
          case '×':
            result = Number(previousNumber) * Number(currentNumber);
            break;
          case '÷':
            result = Number(previousNumber) / Number(currentNumber);
            break;
        }
        input.value = result;
        previousNumber = '';
        currentNumber = result.toString();
        operator = '';
      }
    } else if (buttonValue === '←') {
      currentNumber = currentNumber.slice(0, -1);
      input.value = currentNumber;
    }
  });
});

function clearInput() {
  previousNumber = '';
  currentNumber = '';
  operator = '';
  input.value = '';
}
