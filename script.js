function add(a, b) {
    a = Number(a);
    b = Number(b);
    return a + b;
}

function subtract(a, b) {
    a = Number(a);
    b = Number(b);
    return a - b;
}

function multiply(a, b) {
    a = Number(a);
    b = Number(b);
    return a * b;
}

function divide(a, b) {
    a = Number(a);
    b = Number(b);
    return a / b;
}

function calculate(operator, firstNum, secondNum) {
    switch (operator) {
        case 'add':
            return add(firstNum, secondNum).toFixed(2).replace(/[.,]0+$/, "");
        case 'subtract':
            return subtract(firstNum, secondNum).toFixed(2).replace(/[.,]0+$/, "");
        case 'multiply':
            return multiply(firstNum, secondNum).toFixed(2).replace(/[.,]0+$/, "");
        case 'divide':
            return divide(firstNum, secondNum).toFixed(2).replace(/[.,]0+$/, "");
    }
}

function updateDisplay() {
    let s1 = firstNum;
    let s2 = secondNum;
    let op = '';

    while (s1.charAt(0) === '0' && s1.length > 1) {
        s1 = s1.substring(1);
    }

    while (s2.charAt(0) === '0' && s1.length > 1) {
        s2 = s2.substring(1);
    }

    switch (operator) {
        case 'add':
            op = '+';
            break;
        case 'subtract':
            op = '-';
            break;
        case 'multiply':
            op = '×'; // ALT + 0125
            break;
        case 'divide':
            op = '÷'; // ALT + 0247
            break;
        // default:
        //     console.log('error');
    }

    displayText.innerText = s1 + ' ' + op + ' ' + s2;
}

let firstNum = '';
let secondNum = '';
let operator = '';
// let displayString = '';
let justAnswered = false;

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const specialButtons = document.querySelectorAll('.special');

const clearButton = document.querySelector('#clear');
const decimalButton = document.querySelector('#decimal');
const equalsButton = document.querySelector('#equals');

const displayText = document.querySelector('.display-text');

for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', () => {

        const newNum = numberButtons[i].id;

        if (firstNum === '' && secondNum === '' && operator === '') {
            firstNum = newNum;
        } else if (firstNum !== '' && secondNum === '' && operator === '') {
            if (justAnswered) {
                firstNum = newNum;
            } else {
                firstNum = firstNum + newNum;
            }
            justAnswered = false;
        } else if (firstNum !== '' && secondNum === '' && operator !== '') {
            secondNum = newNum;
        } else if (firstNum !== '' && secondNum !== '' && operator !== '') {
            secondNum = secondNum + newNum;
        }
        updateDisplay();
        
        console.log(`first: ${firstNum}, op: ${operator}, second: ${secondNum}`);
    });
}

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', () => {
        if (secondNum === '' && operator === '') {
            operator = operatorButtons[i].id;
            justAnswered = false;
        } else if (secondNum === '' && operator !== '') {
            operator = operatorButtons[i].id;
            justAnswered = false;
        } else if (secondNum !== '' && operator !== '') {
            console.log(`answer: ${calculate(operator, firstNum, secondNum)}`)
            firstNum = String(calculate(operator, firstNum, secondNum));
            secondNum = '';
            operator = operatorButtons[i].id;
            updateDisplay();
            justAnswered = true;
        }
        console.log(`first: ${firstNum}, op: ${operator}, second: ${secondNum}`);
        updateDisplay();
    });
}

clearButton.addEventListener('click', () => {
    console.log('clearing display');

    firstNum = '0';
    secondNum = '';
    operator = '';
    // displayString = '';

    updateDisplay();

});

decimalButton.addEventListener('click', () => {
    console.log('adding decimal');

    if (firstNum === '' && secondNum === '' && operator === '') {
        firstNum = '0.';
    } else if (firstNum !== '' && secondNum === '' && operator === '') {
        if (!firstNum.includes('.')) {
            firstNum = firstNum + '.';
        }
    } else if (firstNum !== '' && secondNum === '' && operator !== '') {
        secondNum = '0.';
    } else if (firstNum !== '' && secondNum !== '' && operator !== '') {
        if (!secondNum.includes('.')) {
            secondNum = secondNum + '.';
        }
    }
    updateDisplay();
    
    console.log(`first: ${firstNum}, op: ${operator}, second: ${secondNum}`);
});

equalsButton.addEventListener('click', () => {
    console.log('equals');
    if (secondNum === '' && operator === '') {
        // updateDisplay();
        console.log(`first: ${firstNum}, op: ${operator}, second: ${secondNum}`);
        return;
    } else if (secondNum === '' && operator !== '') {
        // updateDisplay();
        console.log(`first: ${firstNum}, op: ${operator}, second: ${secondNum}`);
        return;
    }
    console.log(`answer: ${calculate(operator, firstNum, secondNum)}`)
    firstNum = String(calculate(operator, firstNum, secondNum));
    secondNum = '';
    operator = '';
    updateDisplay();
    justAnswered = true;
});