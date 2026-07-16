//run this in browser console


let num1 = parseFloat(prompt("Enter first number:"));
let num2 = parseFloat(prompt("Enter second number:"));
let operator = prompt("Enter operator (+, -, *, /):");

let result;

if (operator === "+") {
    result = num1 + num2;
} 
else if (operator === "-") {
    result = num1 - num2;
} 
else if (operator === "*") {
    result = num1 * num2;
} 
else if (operator === "/") {
    result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero!";
} 
else {
    result = "Invalid operator!";
}

console.log("Result:", result);