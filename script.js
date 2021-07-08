// Wait until the DOM has loaded before running the game
// Get the button elements, and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type"); // this refers to button element
                runGame(gameType); // this generates new numbers when the button icon is clicked
            }
        });
    }

    runGame("addition"); // default game at the start
});


// Function below generates two random numbers between 1 and 25
// Math floor rounds up the number
// Math.random generates a random number
// Plus one excludes 0, multiply by 25 returns any number up to 25

function runGame(gameType) {

    let num1 = Math.floor(Math.random() * 25) +1;
    let num2 = Math.floor(Math.random() * 25) +1;

    if (gameType === "addition") {
        DisplayAdditionQuestion (num1, num2); // standard default game at the start, checks if game is addition if not, generates an error
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}, aborting`;
    } // see displayAdditionQuestion below
}

function checkAnswer() {
   
    // This function checks the answer against the first element in the returned calculateCorrectAnswer array
    
    let userAnswer = parseInt(document.getElementById("answer-box").value); 
    // here we get and read the value from the DOM and the answer box, see html-file and the input box

    let calculatedAnswer = calculateCorrectAnswer(); // equals the result in calculateCorrectAnswer function
    let isCorrect = userAnswer === calculatedAnswer[0]; // looking for a match of the first element

        // alerts below

        if (isCorrect) {
            alert("That's correct!");
            incrementScore(); // if correct, function incrementScore will fire and update the tally
        }
        else {
            alert(`You answered ${userAnswer}. Correct answer is ${calculatedAnswer[0]}`); // fires an alert
            incrementWrongAnswer(); // if incorrect answer submitted, incrementWrongAnswer function fires and updates wrong answer tally 
        }
    
        runGame(calculatedAnswer[1]);
    }


function calculateCorrectAnswer() {

    // First part below, here we are getting the values back (numbers, or operands) and the operator (plus, minus etc sign) back from the DOM
    // We use parse Int, value needs to come back as a number, not a string. 
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    // Second part, calculates correct answer based on game type: ie playing addition, substraction etc

    if (operator === "+") {
        return [operand1 + operand2, "addition"]; // returns an array, where first element is correct answer, second is addition. runs program as long as stated otherwise
    } else {
        alert (` Unimplemented operator: ${operator}`);
        throw ` Unimplemented operator: ${operator}, aborting`; // Again, throws an error in to the console if operator not identified
    }

}

function incrementScore() {

    // this function gets the current score from the DOM and increments it by using parseInt again (its a value)

    let oldScore = parseInt(document.getElementById("score").innerText) // targets the html id text
    document.getElementById("score").innerText = ++oldScore; // this writes it back to the DOM. also oldScore + 1 also works as a command


}

function incrementWrongAnswer() {

    // this function gets the current incorrect score from the DOM and increments it by using parseInt again (its a value)

    let oldScore = parseInt(document.getElementById("incorrect").innerText) // targets the html id text for incorrect
    document.getElementById("incorrect").innerText = ++oldScore; // this writes it back to the DOM. also oldScore + 1 also works as a command
    
}

function DisplayAdditionQuestion (operand1, operand2) {
    document.getElementById("operand1").textContent = operand1; // first number
    document.getElementById("operand2").textContent = operand2; // second number
    document.getElementById("operator").textContent = "+";      // becomes a plus sign
}

function DisplaySubtractQuestion () {
    
}

function DisplayMultiplyQuestion () {
    
}

function DisplayDivisionQuestion () {
    
}