function add(a, b) { return a + b };

function subtract(a, b) { return a - b };

function multiply(a, b) { return a * b };

function divide(a, b) { return a / b };

let firstNumber = "";
let operator= "";
let secondNumber= "";

function operate(operator, firstNumber, secondNumber) {
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
            break;
        case '-':
            return subtract(firstNumber, secondNumber);
            break;
        case 'x':
            return multiply(firstNumber, secondNumber);
            break;
        case '÷':
            return divide(firstNumber, secondNumber);
    }
}

function updateDisplay(content) {
    const display = document.querySelector('.display');
    display.textContent = content;
}

(function numberButtons() {
    const numbers = document.querySelectorAll("#number");
    numbers.forEach(number => number.addEventListener('click', event => {
        if(!operator) firstNumber += event.target.textContent;
        else secondNumber += event.target.textContent;
        updateDisplay(secondNumber || firstNumber);

    }))
})();

(function operatorButtons() {
    const operations = document.querySelectorAll("#operator");
    operations.forEach(operation => operation.addEventListener('click', event => {
        if (firstNumber && secondNumber && operator) {
            firstNumber = operate(operator, Number(firstNumber), Number(secondNumber));
            operator = ""
            secondNumber = ""
            updateDisplay(firstNumber);
        } //the code inside this if must be a separate function
        if (firstNumber) operator = event.target.textContent; 
    }))
})();

(function equalButton() {
    const equal = document.querySelector('#equal')
    equal.addEventListener('click', event => {
        if (firstNumber && secondNumber && operator) {
            firstNumber = operate(operator, Number(firstNumber), Number(secondNumber));
            operator = ""
            secondNumber = ""
            updateDisplay(firstNumber);
        } //the code inside this if must be a separate function
    })
})();