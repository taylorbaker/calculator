function add(a, b) {
  return a + b;
}

function subtract(b, a) {
  return b - a;
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

function funnyDivZeroThing() {
  console.log('Boom!');
}

