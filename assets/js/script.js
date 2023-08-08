//Allow DOM to load before starting exam practice sessions
//Add evet listeners to subject practice

document.addEventListener("DOMContentLoaded", function() {
    let mainControls = document.getElementsByTagName("button");
    for (let i of mainControls) {
        i.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "next") {
                checkAnswer();                
            } else if (this.getAttribute("data-type") === "maths"){
                let subject = this.getAttribute("data-type");
                    startPractice(subject);  
            } 
            else if (this.getAttribute("data-type") === "english"){
                alert(" The button is working!");            
            } else if (this.getAttribute("data-type") === "government"){
                    let subject = this.getAttribute("data-type");
                    startPractice(subject);            
            } else if (this.getAttribute("data-type") === "end2"){
                        alert(" The button is working!");            
            } else {
                alert(`Invalid Subject Selection!`);
                throw `Invalid Subject Selection. Refresh`;
            }
        });
    }
    //Add Introduction here as we do not intend to auto-load a default subject (this is what happens adter the above finish loading)
    // startPractice("government");
});

//Enable color selection for question options
let selection = document.getElementsByClassName('options');
for (let i = 0; i < selection.length; i++) {
    selection[i].addEventListener('click', selecChoose);
}
function selecChoose() {
    if (this.style.color === "black") {
        this.style.color = "red";
    } else (this.style.color = "black")
}


/* Global Variables */
const question = document.getElementById('question');
const optionA = document.getElementById('optionA');
const optionB = document.getElementById('optionB');
const optionC = document.getElementById('optionC');
const optionD = document.getElementById('optionD');
const answer = document.getElementById('answer');

/**
 * This functions starts the practice as soon as it receives a subject
 */
function startPractice(subject) {
    
    if (subject === "government") {
        displayGovernmentQuestion(question, optionA, optionB, optionC, optionD, answer);
        let questionNumber = parseInt(document.getElementById('questionNumber').textContent);
        let i = questionNumber + 1;
        j = i;
    } else if (subject === "maths") {
            displayMathsQuestion(question, optionA, optionB, optionC, optionD, answer);
            let questionNumber = parseInt(document.getElementById('questionNumber').textContent);
            let i = questionNumber + 10;
            j = i;
    } else {    
        alert(`Invalid Subject Selection!: ${subject}`);
        throw `Invalid Subject Selection!: ${subject}. Aborting!`;
    }

    
    
    //Gets questions and options from Question Bank
    question.textContent = questionBank[j].question;
    optionA.textContent = questionBank[j].optionA;
    optionB.textContent = questionBank[j].optionB;
    optionC.textContent = questionBank[j].optionC;
    optionD.textContent = questionBank[j].optionD;
    answer.textContent = questionBank[j].answer;
};
function displayGovernmentQuestion(question, optionA, optionB, optionC, optionD, answer) {
    document.getElementById('question').textContent = question;
    document.getElementById('optionA').textContent = optionA;
    document.getElementById('optionB').textContent = optionB;
    document.getElementById('optionC').textContent = optionC;
    document.getElementById('optionD').textContent = optionD;
    document.getElementById('answer').textContent = answer;
    
};
/**
 * Checks the chosen answer against the system answer
 */
function checkAnswer () {
    
    let correctAnswer = document.getElementById('answer').textContent;
    let userAnswer;
    if (document.getElementById('optionA').style.color === "red") {
        userAnswer = document.getElementById('optionA').textContent;

    } else if (document.getElementById('optionB').style.color === "red") {
        userAnswer = document.getElementById('optionB').textContent;

    } else if (document.getElementById('optionC').style.color === "red") {
        userAnswer = document.getElementById('optionC').textContent;

    } else if (document.getElementById('optionD').style.color === "red") {
        userAnswer = document.getElementById('optionD').textContent;
    } else userAnswer = "black";
    console.log(correctAnswer);
    console.log(userAnswer);
    

    isCorrect = userAnswer.textContent === correctAnswer.textContent;
    if (isCorrect) {
        incrementRightAnswer();
    } else {
        incrementFailedAnswer();
    }

    questionNumber();
};

function incrementRightAnswer() {
    let rightAnswer = parseInt(document.getElementById('rightAnswer').textContent);
    document.getElementById("rightAnswer").textContent = ++rightAnswer;
};

function incrementFailedAnswer() {

};

function progressBar () {

};

function timer() {

};
/**
 * Checks for the current question number and then adds 1 to it in other to access
 * the next question
 */
function questionNumber() {
    let previousQuestionNumber = parseInt(document.getElementById("questionNumber").textContent);
    document.getElementById("questionNumber").textContent = ++previousQuestionNumber;
};

function nextQuestion() {

};

function endPractice() {

};

function incrementScore() {

};

function result() {

};

function restartPractice () {

};

function displayMathsQuestion() {

};

function displayEnglishQuestion() {
    
};




//Question Banks for Subjects
const questionBank = [    
    {question: "This is a sample question to get you acquainted?",
    optionA: "Writes plaintext,  expressions or jmvgh to the document. n",
    optionB: "Writes plaintext,  expressions or JavaScript to the document. ",
    optionC: "A Writes plaintext,  expressions or JavaScript to the document.",
    optionD: "A Wriddtes plaintext,  expressions or JavaScript to the document.",
    answer: "A Wriddtes plaintext,  expressions or JavaScript to the document."},

    {question: "who are you?",
    optionA: "A man",
    optionB: "A woman",
    optionC: "A girl",
    optionD: "A boy",
    answer: "A woman"},

    {question: "where is kkkkk",
    optionA: "22222",
    optionB: "22222",
    optionC: "fbgdf",
    optionD: "22222",
    answer: "fbgdf"},

    {question: "Is jos in Nigeria",
    optionA: "3333",
    optionB: "3333",
    optionC: "3333",
    optionD: "3de34",
    answer: "3de34"},


]  