const MAX_NUMBER = 999999999;
const MAX_LENGTH = 9;

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

function calculate() {
    let result = operate(operator, Number(firstNumber), Number(secondNumber));
    let validResult = verifyResult(result);
    if (validResult.invalid) return stopCalculator(validResult.message);
    if(result.toString().length > 9) result = fixResultLength(result);
    updateDisplay(result);
    clearVariables();
}

function verifyResult(result) {
    let resultValidation = {
        invalid: false,
        message: "",
    }
    if (result === Infinity) {
        resultValidation.invalid = true;
        resultValidation.message = "Can't divide by 0";
    }
    else if (result > MAX_NUMBER) {
        resultValidation.invalid = true;
        resultValidation.message = "Max value exceeded";
    }
    return resultValidation;
}

function stopCalculator(message) {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);
    document.querySelector('#clear').disabled = false;
    updateDisplay(message);
}

function fixResultLength(result) {
    const resultArray = result.toString().split(".");
    let integers = resultArray[0];
    let decimalsLength = MAX_LENGTH - (integers.length + 1); // +1 because of the char '.'
    let decimals = resizeDecimals(resultArray[1], decimalsLength);
    return decimals ? Number(integers.concat(".", decimals)) : Number(integers);

}

function resizeDecimals(decimals, decimalsLength) {
    if (decimalsLength < 1) return "";
    let fixedDecimal = Number('0.'.concat(decimals)).toFixed(decimalsLength).toString();
    return fixedDecimal.split(".")[1];
}

function clearVariables() {
    firstNumber = "";
    operator = "";
    secondNumber = "";
}

function resetCalculator() {
    clearVariables();
    updateDisplay(0);
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = false); //calculator works after stopCalculator()
}

function updateDisplay(content) {
    const display = document.querySelector('.display');
    display.textContent = content;
}

function getDisplayContent() { return document.querySelector('.display').textContent };

(function numberButtons() {
    const numbers = document.querySelectorAll("#number");
    numbers.forEach(number => number.addEventListener('click', event => {
        if (!operator) {
            if (firstNumber.length < MAX_LENGTH) firstNumber += event.target.textContent;
        }
        else {
            if (secondNumber.length < MAX_LENGTH) secondNumber += event.target.textContent;
        }
        updateDisplay(secondNumber || firstNumber);

    }))
})();

(function operatorButtons() {
    const operations = document.querySelectorAll("#operator");
    operations.forEach(operation => operation.addEventListener('click', event => {
        if (firstNumber && secondNumber && operator) {
            calculate();
        }
        firstNumber = getDisplayContent();
        if (firstNumber) operator = event.target.textContent; 
    }))
})();

(function equalButton() {
    const equal = document.querySelector('#equal')
    equal.addEventListener('click', () => {
        if (firstNumber && secondNumber && operator) {
            calculate()
        }
    })
})();

(function clearButton() {
    const clear = document.querySelector('#clear');
    clear.addEventListener('click', resetCalculator);
})();

