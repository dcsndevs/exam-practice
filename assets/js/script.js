//Allow DOM to load before starting exam practice sessions
//Add evet listeners to subject practice

document.addEventListener("DOMContentLoaded", function() {
    let mainControls = document.getElementsByTagName("button");
    for (let i of mainControls) {
        i.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "start") {
                usernamed();                
            } 
            else if (this.getAttribute("data-type") === "next") {
                checkAnswer();                
            } 
            else if (this.getAttribute("data-type") === "maths"){
                let subject = this.getAttribute("data-type");
                    startPractice(subject);  
            } 
            else if (this.getAttribute("data-type") === "english"){
                alert(" The button is working!");            
            } 
            else if (this.getAttribute("data-type") === "government"){
                    alert("You have 10 minutes to answer 10 questions.\nGoodluck!")
                    
                    displayMainArea.style.display = "block";                    
                    subjectTitle.textContent = "Government";
                    let subject = this.getAttribute("data-type");
                    startPractice(subject);            
            } 
            else if (this.getAttribute("data-type") === "end"){
                        endPractice();            
            } 
            else {
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


// Global Variables
const question = document.getElementById('question');
const optionA = document.getElementById('optionA');
const optionB = document.getElementById('optionB');
const optionC = document.getElementById('optionC');
const optionD = document.getElementById('optionD');
const answer = document.getElementById('answer');
let subjectTitle = document.getElementById("subjectTitle");

// Global Display Variables
let displayWelcome = document.getElementById('welcome');
let displayNextEnd = document.getElementsByClassName("controls")[0];
let displayMainControls = document.getElementsByClassName("main-controls")[0];
let displayResult= document.getElementById("result");
let displayMainArea = document.getElementById('main-area');


/**
 * Username Input
 */
function usernamed() {

    displayWelcome.style.display = "none"
    displayMainControls.style.display = "block"
    let usernamerr = document.getElementById("user").value;    
    document.getElementById('usernames').innerText = usernamerr;
    alert("Welcome " + `${usernamerr}` + "!\n Pick a subject to continue");
}

/**
 * This functions starts the practice as soon as it receives a subject
 */
function startPractice(subject) {
        
    if (subject === "government") {
        let questionNumber = parseInt(document.getElementById('questionNumber').textContent);
        let i = questionNumber + 1;
        j = i;
        
        displayGovernmentQuestion(question, optionA, optionB, optionC, optionD, answer);
        
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
    
    displayControls ();
    
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
    

    let isCorrect = userAnswer === correctAnswer;
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
    let failedAnswer = parseInt(document.getElementById('failedAnswer').textContent);
    document.getElementById("failedAnswer").textContent = ++failedAnswer;

};

function progressBar () {

};


/**
 * Checks for the current question number and then adds 1 to it in other to access
 * the next question
 */
function questionNumber() {
    let previousQuestionNumber = parseInt(document.getElementById("questionNumber").textContent);
    document.getElementById("questionNumber").textContent = ++previousQuestionNumber;
    let colorResetA = document.getElementById("optionA");
    let colorResetB = document.getElementById("optionB");
    let colorResetC = document.getElementById("optionC");
    let colorResetD = document.getElementById("optionD");
    colorResetA.style.color = "black";
    colorResetB.style.color = "black";
    colorResetC.style.color = "black";
    colorResetD.style.color = "black";


    if (parseInt(document.getElementById("questionNumber").textContent) < 6) {
        startPractice("government");
    } else {        
        result();
    }
};

function nextQuestion() {

};

function endPractice() {
    let message = "This would terminate your current practice session!\nPress Cancel to continue or Ok to end."
    if (confirm(message) == true) {
        //Add Display result here, Print and then reload after
        result();
    } else {
        return false;
    }
    
};

/**Function to Display controls when practice is loaded */
function displayControls () {
    
    displayNextEnd.style.display = "block"
    hideSubjectControls();
}
/**Function to Hide Main Subject controls when practice is loaded */
function hideSubjectControls() {
    displayMainControls.style.display = "none"
    timer();
}

/**Function to display timer and end exam at the end*/
function timer() {     

    if ((document.getElementById("timer").textContent !=="")) {
        return;
    } else {
        const practiceTime = 1; //10minutes for each practice session
        let totalSeconds = practiceTime * 60;

        const timer = document.getElementById("timer");

        setInterval (timerCounting, 1000); //Milliseconds -i.e the time it takes a second to elapse
        
        function timerCounting() {
            const minutes = Math.floor(totalSeconds / 60); //Minutes remaining displayed
            let seconds = totalSeconds % 60;
            if ((minutes === 0) && (seconds === 0)) timeUp();

            timer.innerHTML = `${minutes}:${seconds}`; 
            totalSeconds--;
        }
    }

};
/**
 * Ends the practice session on time up
 */
function timeUp() {
    alert("Your time is Up!\nYou have come to the end of this practice session!\nClick OK to view your result!");
    
    displayResult.style.display = "block"
}

function result() {
    alert("You have come to the end of this practice session!\nClick OK to view your result!")
    
    displayResult.style.display = "block"
};

function restartPractice () {

};

function displayMathsQuestion() {

};

function displayEnglishQuestion() {
    
};




//Question Banks for Subjects
const questionBank = [    
    
    {question: "1who are you?",
    optionA: "A man",
    optionB: "A woman",
    optionC: "A girl",
    optionD: "A boy",
    answer: "A woman"},

    {question: "This is a sample question. You can select upto as many answers as possible",
    optionA: "lorem ipsum text wont load Writes plaintext,  expressions or jmvgh to the document. n",
    optionB: "Writes plaintext,  expressions or JavaScript to the document. ",
    optionC: "A Writes plaintext,  expressions or JavaScript to the document.",
    optionD: "A Wriddtes plaintext,  expressions or JavaScript to the document.",
    answer: "No right answer here"},    

    {question: "This acquainted is a sample question to get you ?",
    optionA: "Writes plaintext,  expressions or jmvgh to the document. n",
    optionB: "Writes plaintext,  expressions or JavaScript to the document. ",
    optionC: "A Writes plaintext,  expressions or JavaScript to the document.",
    optionD: "A Wriddtes plaintext,  expressions or JavaScript to the document.",
    answer: "A Wriddtes plaintext,  expressions or JavaScript to the document."},

    {question: "2where is kkkkk",
    optionA: "22222",
    optionB: "22222",
    optionC: "fbgdf",
    optionD: "22222",
    answer: "fbgdf"},

    {question: "3Is jos in Nigeria",
    optionA: "3333",
    optionB: "3333",
    optionC: "3333",
    optionD: "3de34",
    answer: "3de34"},

    {question: "4Is jos in Nigeria",
    optionA: "3333",
    optionB: "3333",
    optionC: "3333",
    optionD: "3de34",
    answer: "3de34"},

    {question: "5Is jos in Nigeria",
    optionA: "3333",
    optionB: "3333",
    optionC: "3333",
    optionD: "3de34",
    answer: "3de34"},

    {question: "6Is jos in Nigeria",
    optionA: "3333",
    optionB: "3333",
    optionC: "3333",
    optionD: "3de34",
    answer: "3de34"},

    {question: "Is jos in Nigeria",
    optionA: "3333",
    optionB: "3333",
    optionC: "3333",
    optionD: "3de34",
    answer: "3de34"},

    {question: "7Is jos in Nigeria",
    optionA: "3333",
    optionB: "3333",
    optionC: "3333",
    optionD: "3de34",
    answer: "3de34"},

    {question: "8Is jos in Nigeria",
    optionA: "3333",
    optionB: "3333",
    optionC: "3333",
    optionD: "3de34",
    answer: "3de34"},

    {question: "9Is jos in Nigeria",
    optionA: "3333",
    optionB: "3333",
    optionC: "3333",
    optionD: "3de34",
    answer: "3de34"},

    {question: "10Is jos in Nigeria",
    optionA: "3333",
    optionB: "3333",
    optionC: "3333",
    optionD: "3de34",
    answer: "3de34"},

    {question: "11Is jos in Nigeria",
    optionA: "3333",
    optionB: "3333",
    optionC: "3333",
    optionD: "3de34",
    answer: "3de34"},

    {question: "12Is jos in Nigeria",
    optionA: "3333",
    optionB: "3333",
    optionC: "3333",
    optionD: "3de34",
    answer: "3de34"},


]  