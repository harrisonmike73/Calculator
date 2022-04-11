// creates calculator class, sets the text elements inside the calculator class
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {

    }

    // add a number to the screen
    appendNumber(number) {
        // allows only one "." instead of adding multiple 
        if (number === '.' && this.currentOperand.includes('.')) return
        // adds numbers to display by appending as strings-- 1,1 = 11 NOT 1,1 = 2
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        // sets operation to what is passed in
        this.operation = operation
        // moves the current op to the previous op
        this.previousOperand = this.currentOperand
        // clears out the current op
        this.currentOperand = ''

    }


    compute() {

    }

    updateDisplay() {
        // displays operands
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')



const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        // updates display every time a number button is clicked
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        // updates display when an operation button is clicked
        calculator.updateDisplay()
    })
})