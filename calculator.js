// global var baaaad, investigated Singleton Patterns as a possible alternative
let primaryText = '';
let regText = '';
let currentOperation = '';

const main = document.getElementById('main');
const reg = document.getElementById('register');

// initial display state
main.innerText = '0';

// add event listeners to calculator buttons
const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

for (number in numbers) {
  let element = document.getElementById(numbers[number]);

  element.addEventListener('click', () => {
    let nodeValue = element.innerText;
    
    primaryText += nodeValue;
    updateDisplay();
  });
}

// add event listeners to operation buttons
const operations = ['add', 'subtract', 'multiply', 'divide', 'mod'];

for (op in operations) {
  let element = document.getElementById(operations[op]);

  element.addEventListener('click', () => {
    if (primaryText && regText && currentOperation) {
      // same as equals if all params are set
      performOperation();
    } else if (primaryText) {
      regText = primaryText;
      primaryText = '';
    }

    currentOperation = element.id;
  });
}

// add equals sign functionality
const equals = document.getElementById('equals');

equals.addEventListener('click', () => {
  // no action if all params are not set
  if (primaryText && regText && currentOperation) {
    performOperation();
  }
});

// add allclear functionality
const allclear = document.getElementById('clear');

allclear.addEventListener('click', () => {
  primaryText = '';
  regText = '';
  currentOperation = '';
  updateDisplay();
  main.innerText = '0';
});

// add sign change functionality
const sign = document.getElementById('sign');

sign.addEventListener('click', () => {
  if (primaryText) {
    let tempInt = parseInt(primaryText, 10);
    tempInt *= -1;
    primaryText = tempInt.toString();
    updateDisplay();
  }
});

// add decimal point functionality
const point = document.getElementById('point');

point.addEventListener('click', () => {
  let containsDecimal = /\./.test(primaryText);
  if (!containsDecimal) {
    primaryText += '.';
    updateDisplay();
  }
});

// Operation implementation functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) {
    funnyDivZeroThing();
  } else {
    return a / b;
  }
}

function mod(a, b) {
  return a % b;
}

// display helper function
function updateDisplay() {
  main.innerText = primaryText;
  reg.innerText = regText; 
} 

function funnyDivZeroThing() {
  console.log('Boom!');
}

function performOperation() {
  primaryText = operate(currentOperation, regText, primaryText);
  regText = '';
  updateDisplay();

  // prevent appending of new number entries to old return value
  regText = primaryText; 
  primaryText = '';
}

// wait until primary operate function to convert text to int
function operate(op, a, b) {
  // if there is no current operator, stop operation
  if (op === '') {
    console.log('need operation');
    return;
  }

  return eval(op + '(a, b)'); // figure out an implementation with Function() instead, eval() has security vulnerabilities that make it very dangerous
}
