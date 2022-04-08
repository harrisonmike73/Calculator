// declares global variables and initializes
let num1 = 0;
let tempNum1Array = [];
let num2 = 0;
let tempNum2Array = [];
let savedFirstValue = 0;
let operator = "";
let tempOperatorArray = [];

////////////////////////////////////////////////////////////
////////Basic sub-functions for the math operations/////////


function add (num1, num2) {
    let addValue = (num1 + num2);
    //// rounds the value of num + num2
    let rounded = Math.round((addValue + Number.EPSILON) * 100) / 100;
    // only allows 2 decimal places
    rounded = rounded.toFixed(2);
    console.log("add", rounded);
    const calcDisplay = document.querySelector("#display");
    // sends the rounded variable to the display
    calcDisplay.textContent = rounded;
};

function subract (num1, num2) {
    let subractValue = (num1 - num2);
    //// rounds the value of num + num2
    let rounded = Math.round((subractValue + Number.EPSILON) * 100) / 100;
    // only allows 2 decimal places
    rounded = rounded.toFixed(2);
    console.log("subtract", rounded);
    const calcDisplay = document.querySelector("#display");
    // sends the rounded variable to the display
    calcDisplay.textContent = rounded;
};

function multiply (num1, num2) {
    let multiplyValue = num1 * num2;
    //// rounds the value of num + num2
    let rounded = Math.round((multiplyValue + Number.EPSILON) * 100) / 100;
    // only allows 2 decimal places
    rounded = rounded.toFixed(2);
    console.log("multiply", rounded);
    const calcDisplay = document.querySelector("#display");
    // sends the rounded variable to the display
    calcDisplay.textContent = rounded;
};

function divide (num1, num2) {
    const divideValue = num1 / num2;
    

//error check for division by 0
if(divideValue === "Infinity") {
    return alert("ERROR! You cannot divide by 0! ... you should know better");
} else { 
    let rounded = Math.round((divideValue + Number.EPSILON) * 100) / 100;
    rounded = rounded.toFixed(2);
    console.log("divide", rounded);
    const calcDisplay = document.querySelector("display");
    calcDisplay.textContent = rounded;
}
}

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
//////////////////////////////////////////////////////////////////////
/////////////////// calculator advanced features algos//////////////////////
//////////////////////////////////////////////////////////////////////


function runCalculator() {

    function getNumberClicked () {
        // creates operands buttons
        const operandButtons = document.querySelectorAll(".operand");
        operandButtons.forEach((button) => {
            button.addEventListener('click', () => {
                console.log("hit me for first number!");
                savedFirstValue = button.getAttribute("value");
                console.log(savedFirstValue);
                const calcDisplay = document.querySelector("#display");

                // append to num1 if multiple numbers are passed and display out
                // if operator has not been pressed yet -- meaning we are on our first number
                if (operator == "") {
                    //pushes the tempNum1Array to = savedFirstValue
                    tempNum1Array.push(savedFirstValue);
                    console.log("show me the array1: ", tempNum1Array);
                    // makes tempNum1Array into a number -- takes away commas
                    num1 = tempNum1Array.join("");
                    console.log("saved first value is: ", num1);
                    // apply num1 to the calculator display
                    calcDisplay.textContent = num1;
                } else {

                // append to num2 if multiple numbers are pressed and display out
                // if operator HAS been clicked
                    tempNum2Array.push(savedFirstValue);
                    console.log("show me the array2: ", tempNum2Array);
                    num2 = tempNum2Array.join("");
                    console.log("num2 is: ", num2);
                    calcDisplay.textContent = num2;

                }
            })
        })
    }

    function getOperatorSelection () {
        // creates operator buttons
        const operatorButtons = document.querySelectorAll(".operator");
        operatorButtons.forEach((button) => {
            // keeps track of previously clicked operators
            button.addEventListener('click', () => {
            console.log("hit me with an operator!");
            // assigns the value (+, -, *, /) to the operator variable
            operator = button.getAttribute("value");
            console.log(operator);
            tempOperatorArray.push(operator);
            console.log("store temp operator in array for string calcs: ", tempOperatorArray);

            // enable the decimal button if disabled from previous click/use
            document.getElementById("decimal").disabled = false;
            console.log("decimal button should be ENABLED now");

            // check to see if a multi-operand string exists and needs calculated on the fly
            // multiple operations without an =
            // evaluate first 2 numbers then store answer, eval next set and store answer etc
            if ((tempNum1Array != "") && (tempNum2Array != "")) {
                const calcDisplay = document.querySelector("#display");
                num1 = tempNum1Array.join("");
                num2 = tempNum2Array.join("");
                //forces into a flolating integer with decimal places
                num1 = parseFloat(num1);
                num2 = parseFloat(num2);
                // checks string length and put the "-" in front of the number to make it negative/positive in display
                let tempOperator = tempOperatorArray[tempOperatorArray.length - 2].toString();
                console.log("Running STRING calculation now!");
                // operate runs with the arguments then displays the answer and applies that value to tempStringValue
                operate(tempOperator, num1, num2);
                let tempStringValue = calcDisplay.textContent;
                //////////////
                console.log("temp string value: ", tempStringValue);
                console.log("clearing out the arrays and nums now!");
                tempNum1Array = [];
                tempNum2Array = [];
                num1 = 0;
                num2 = 0;
                console.log("array 1: ", tempNum1Array);
                console.log("array 2: ", tempNum2Array);
                console.log("num1: ", num1);
                console.log("num2: ", num2);
                // pushes tempStringValue into the empty tempNum1Array
                tempNum1Array.push(tempStringValue);
                // converts string to num1 number format
                num1 = tempNum1Array.join("");
                console.log("pushed string value to array 1: ", tempNum1Array);
            }
        })
    })
    }

        function runCalculation() {
            // creates equals button, assigns click
            const equalsButton = document.querySelector(".equals");
                equalsButton.addEventListener('click', () => {
                    console.log("time to run the math!", num1, num2, operator);
                    const calcDisplay = document.querySelector("#display");
                    num1 = parseFloat(num1);
                    num2 = parseFloat(num2);
                    operate(operator, num1, num2);
                })
        }

        // DOM for "Clear" button
        const clearButton = document.querySelector(".clear");
            clearButton.addEventListener('click', () => { location.reload(); })

        // DOM for "+/-" button
        const signButton = document.querySelector(".sign");
            signButton.addEventListener('click', () => {

                // append "+/-" to numArray1 and display out
                if (operator == "") {
                    const calcDisplay = document.querySelector("#display");
                    console.log("negative button registered here!");
                    tempNum1Array.splice(0, 1, (tempNum1Array[0] * -1).toString());
                    console.log("append the array with negative number: ", tempNum1Array);
                    num1 = tempNum1Array.join("");
                    calcDisplay.textContent = num1;
                } else {

                // append "+/-" to numArray1 and display out
                const calcDisplay = document.querySelector("#display");
                console.log("negative button registered here on num2!");
                tempNum2Array.splice(0, 1, (tempNum2Array[0] * -1).toString());
                console.log("append the array with negative number on num 2: ", tempNum2Array);
                num2 = tempNum2Array.join("");
                calcDisplay.textContent = num2;

                }

            })

        
        // DOM for decimal button
        const decimalButton = document.querySelector(".decimal");
            decimalButton.addEventListener('click', () => {
                console.log("decimal pressed");
                let decimalButton = ".";
                const calcDisplay = document.querySelector("#display");

                // append "decimal" to numarray2 and display out
                if (operator == "") {
                    const calcDisplay = document.querySelector("#display");
                    console.log("decimal button registered here!", decimalButton);
                    tempNum1Array.push(decimalButton);
                    console.log("append array1 with decimal: ", tempNum1Array);
                    num1 = tempNum1Array.join("");
                    calcDisplay.textContent = num1;
                    document.getElementById("decimal").disabled = true;
                    console.log("num1 decimal should be disabled now");
                } else {

                    // append "decimal" to numarray2 and display out
                    const calcDisplay = document.querySelector("#display");
                    console.log("decimal button registered here!", decimalButton);
                    tempNum2Array.push(decimalButton);
                    console.log("append array1 with decimal: ", tempNum2Array);
                    num2 = tempNum2Array.join("");
                    calcDisplay.textContent = num1;
                    document.getElementById("decimal").disabled = true;
                    console.log("num2 decimal should be disabled now");
                }
            })

            // call/run the advanced sub-functions
            getNumberClicked();
            getOperatorSelection();
            runCalculation();
        }

        // call/run the main function
        runCalculator();