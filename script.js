const MAX_NUMBER = 999999999;
const MIN_NUMBER = -99999999;
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
        resultValidation.message = "Divide by 0";
    }
    else if (result > MAX_NUMBER) {
        resultValidation.invalid = true;
        resultValidation.message = "Max value";
    }
    else if (result < MIN_NUMBER) {
        resultValidation.invalid = true;
        resultValidation.message = "Min value";
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
    buttons.forEach(button => button.disabled = false); //calculator will work again after stopCalculator()
}

function updateDisplay(content) {
    const display = document.querySelector('.display');
    display.textContent = content;
}

function getDisplayContent() { return document.querySelector('.display').textContent };

function numberInputHandler(textContent) {
    if (firstNumber == false && textContent === '0') return; // firstNumber == false because it can be falsy values "" or "0"
        if (!operator) {
            if (firstNumber.length < MAX_LENGTH) firstNumber += textContent;
        }
        else {
            if (secondNumber.length < MAX_LENGTH) secondNumber += textContent;
        }
        updateDisplay(secondNumber || firstNumber);
}

(function numberButtons() {
    const numbers = document.querySelectorAll(".number");
    numbers.forEach(number => number.addEventListener('click', event => numberInputHandler(event.target.textContent)))
})();

function operatorInputHandler(textContent) {
    if (firstNumber && secondNumber && operator) {
        calculate();
    }
    firstNumber = getDisplayContent();
    operator = textContent; 
}

(function operatorButtons() {
    const operations = document.querySelectorAll("#operator");
    operations.forEach(operation => operation.addEventListener('click', event => operatorInputHandler(event.target.textContent)))
})();

function equalInputHandler() {
    if (firstNumber && secondNumber && operator) {
        calculate()
    }
}

(function equalButton() {
    const equal = document.querySelector('#equal');
    equal.addEventListener('click', equalInputHandler);
})();

function dotInputHandler() {
    if (!operator) {
        if(firstNumber == false) firstNumber = '0.';
        else if (firstNumber.length < MAX_LENGTH && !firstNumber.includes('.')) firstNumber += '.';
    }
    else {
        if(secondNumber == false) secondNumber = '0.';
        else if (secondNumber.length < MAX_LENGTH && !secondNumber.includes('.')) secondNumber += '.';
    }
    updateDisplay(secondNumber || firstNumber);
}

(function dotButton() {
    const dot = document.querySelector('#dot');
    dot.addEventListener('click', dotInputHandler);
})();

(function clearButton() {
    const clear = document.querySelector('#clear');
    clear.addEventListener('click', resetCalculator);
})();

function backspaceInputHandler() {
    if (secondNumber) {
        secondNumber = (secondNumber.slice(0, -1));
        updateDisplay((secondNumber || 0));
    }
    else if (operator) {
        operator = "";
        updateDisplay(firstNumber);
    }
    else if (firstNumber) {
        firstNumber = firstNumber.slice(0, -1);
        updateDisplay((firstNumber || 0));
        
    }
}

(function backspaceButton() {
    const backspaceButton = document.querySelector('#backspace');
    backspaceButton.addEventListener('click', backspaceInputHandler);
})();

// Keyboard events
document.addEventListener('keydown', event => {
    if (event.repeat) return;
    let key = event.key;
    if (/([0-9])/.test(key)) numberInputHandler(key);
    else {
        switch (key) {
            case 'Escape':
                resetCalculator()
                break;
    
            case 'Backspace':
                backspaceInputHandler();
                break;
    
            case '.':
                dotInputHandler();
                break;
    
            case '+':
                operatorInputHandler("+");
                break;  
    
            case '-':
                operatorInputHandler("-");
                break;
    
            case '*':
                operatorInputHandler("x");
                break;  
    
            case '/':
                operatorInputHandler("÷");
                break;
    
            case 'Enter':
                equalInputHandler();
                break;
            
                      
        }
    }  
});