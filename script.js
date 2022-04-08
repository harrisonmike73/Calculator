let a = prompt("Please enter a number: ");
let b = prompt("Please enter a second number: ");
let num1 = parseInt(a);
let num2 = parseInt(b);
let c = prompt("What operator would you like to use? +, -, *, /");
let operator = c;
console.log("num1", num1);
console.log("num2", num2);
console.log("operator used", operator);



function add (num1, num2) {
    let addValue = num1 + num2;
    console.log("add", addValue);
    //return addValue;
};

function subract (num1, num2) {
    let subractValue = num1 - num2;
    console.log("subract", subractValue);
    //return subractValue;
};

function multiply (num1, num2) {
    const multiplyValue = num1 * num2;
    console.log("multiply", multiplyValue);
    //return multiplied;
};

function divide (num1, num2) {
    const divideValue = num1 / num2;
    //return divideValue;

//error check for division by 0
if(divideValue === Infinity) {
    return alert("ERROR! You cannot divide by 0! ... you should know better");
} else(console.log("divide", divideValue));
//return divideValue;
};

//use operator variable to determine which function to call
function operate (operator, num1, num2) {
    switch(operator) {
        case '+':
            console.log("passing through switch +");
            add(num1, num2);
            break;
        case '-':
            console.log("passing through switch -");
            subract(num1, num2);
            break;
        case '*':
            console.log("passing through switch *");
            multiply(num1, num2);
            break;
        case '/':
            console.log("passing through switch /");
            divide(num1, num2);
            break;
        default:
            alert("ERROR! Didn't receive an operator, or type not as expected");
        
    }
}

//call the operator function and pass in args (from prompts)
operate(operator, num1, num2);