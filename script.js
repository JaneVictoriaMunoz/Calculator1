const calculator = document.getElementById('calculator');
const displayCurrent = document.getElementById('current-operand');
const displayPrevious = document.getElementById('previous-operand');

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');

const equalButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const dotButton = document.getElementById('dot');

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.textContent);
    updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperation(button.textContent);
    updateDisplay();
  });
});

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
equalButton.addEventListener('click', compute);
dotButton.addEventListener('click', appendDot);



function clear() { 
    // Function to clear the calculator's state    
}

function deleteNumber() {
    // Function to delete the last digit entered or decimal    
}

function compute() {
    // Function to compute the expression    
} 

function appendDot() {
    // Function to handle decimal point input
}


let currentOperand = '';
let previousOperand = '';
let operation = null;

function appendNumber(number) {   
    if (number === '.' && currentOperand.includes('.')) 
    return; // prevent multiple decimal points

    currentOperand = currentOperand.toString() + number.toString();
}

function factorial(num) {
    if (num === 0 || num === 1) {
        return 1;
    }
    for (let i = num - 1; i >= 1; i--) {
        num *= i;
    }
    return num;
}

function combination(n, r) {
    const numerator = factorial(n);
    const denominator = factorial(r) * factorial(n - r);
        
    return numerator / denominator;
}

function chooseOperation(operator) {
    if (currentOperand === '') 
    return;

    if (previousOperand !== '') {
        compute();
    }

    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) 
    return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        case '^':
            computation = Math.pow(parseFloat(prev), parseFloat(current));
            break;
        case 'nCr':
            computation = combination(prev, current);
        default:
            return;
    }

    //di ko na mapagana yung Combination(nCr) di ko na tinuloy, sir T^T

    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay();    // Refresh the display with the new state
}


function updateDisplay() {
    displayCurrent.textContent = currentOperand;
    displayPrevious.textContent = previousOperand + ' ' + (operation || '');
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();    
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function appendDot() {
    if (currentOperand.includes('.')) 
    return; // prevent multiple decimal points

    if (currentOperand === '') {
        currentOperand = '0'; // if empty, start with '0.'
    }

    currentOperand += '.';
    updateDisplay();
}

document.addEventListener('keydown', (event) => {
    if (event.key >= 0 && event.key <= 9) {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendDot();
    } else if (event.key === 'Backspace') {
        deleteNumber();
    } else if (event.key === 'Enter' || event.key === '=') {
        compute();
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        chooseOperation(event.key);
    } else if (event.key === 'Escape') {
        clear();
    }
    updateDisplay();
});


