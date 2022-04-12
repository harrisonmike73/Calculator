// creates calculator class, sets the text elements inside the calculator class
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        // converts all currentOperand numbers to a string except for the last number, 
        //(deleting the last entered number)
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    // add a number to the screen
    appendNumber(number) {
        // allows only one "." instead of adding multiple 
        if (number === '.' && this.currentOperand.includes('.')) return
        // adds numbers to display by appending as strings-- 1,1 = 11 NOT 1,1 = 2
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        // exits code if the currentoperand is empty
        if (this.currentOperand === '') return
        // if display already contains a previous number and a current number, compute those numbers
        if (this.previousOperand !== '') {
            this.compute()
        }
        // sets operation to what is passed in
        this.operation = operation
        // moves the current op to the previous op
        this.previousOperand = this.currentOperand
        // clears out the current op
        this.currentOperand = ''

    }


    compute() {
        let computation
        // converts string to a number
        const prev = parseFloat(this.previousOperand)
        // converts string to a number
        const current = parseFloat(this.currentOperand)
        // will not run code if equals is clicked before entering numbers
        if (isNaN(prev) || isNaN(current)) return
        // basic maths for operations
        switch(this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
                // breaks out of code without computing if invalid operation
            default: 
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }
    getDisplayNumber(number) {
        // splits the number and every number after the decimal place
        const stringNumber = number.toString()
        // takes string and converts into an array of 2 parts. --
        //Everything before the decimal and everything after the decimal
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        // checks if no numbers are inputed or just a decimal "."
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        // checks if numbers ARE inputed
        } else {
        // displays numbers that are entered
          integerDisplay = integerDigits.toLocaleString('en', 
        // never any decimal places after the integerDigits value once its converted to a string with commas
          { maximumFractionDigits: 0 })
        }
        // runs if user entered a decimal and has numbers after it
        if (decimalDigits != null) {
        // displays numbers with decimal and the digits after decimal
          return `${integerDisplay}.${decimalDigits}`
        // runs if there are NO digits after decimal
        } else {
          return integerDisplay
        }
      }
    

    updateDisplay() {
        // displays operands
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)
        // appends the operation sign to the end of previousOperand
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        // clears the previousOperand value once computed        
        } else {
            this.previousOperandTextElement.innerText = ''
        }
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

// func for all numbers
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        // updates display every time a number button is clicked
        calculator.updateDisplay()
    })
})

// func for all operations
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        // updates display when an operation button is clicked
        calculator.updateDisplay()
    })
})

// runs compute and updatesDisplay function upon clicking "="
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

// clears display, all operands and operations upon clicking "AC"
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

// removes last entered number from display
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})