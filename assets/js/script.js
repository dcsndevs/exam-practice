//Allow DOM to load before starting exam practice sessions
//Add evet listeners to subject practice

document.addEventListener("DOMContentLoaded", function() {
    let mainControls = document.getElementsByTagName("button");
    for (let i of mainControls) {
        i.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "next") {
                alert(" The Next button is working!");                
            } else if (this.getAttribute("data-type") === "maths"){
                alert(" The button is working!");
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
    //Add Intoduction here as we do not intend to auto-load a default subject (this is what happens adter the above finish loading)
    startPractice("government");
});

const questionBank = [    
    {question: "who are you?",
    optionA: "A man",
    optionB: "A woman",
    optionC: "A girl",
    optionD: "A boy",
    answer: "A woman"},

    ["who killed Michael Jackson", "igufjhfjfdm", "hgdnbdsuejjh", "hjerhbnsdkjsdmnsmnkjs", "isioimenmkskjdsjn", [4]]
]  

const questionText = document.getElementById('question-text');
const optionA = document.getElementById('optionA');
const optionB = document.getElementById('optionB');
const optionC = document.getElementById('optionC');
const optionD = document.getElementById('optionD');
const answer = document.getElementById('answer');

// /* Question 1 */

// /* Question 2 */
// questionText.textContent = questionBank[1][0];
// optionA.textContent = questionBank[1][1];
// optionB.textContent = questionBank[1][2];
// optionC.textContent = questionBank[1][3];
// optionD.textContent = questionBank[1][5];

function startPractice(subject) {
    // let questionText = document.getElementById('question-text');
    // let optionA = document.getElementById('optionA');
    // let optionB = document.getElementById('optionB');
    // let optionC = document.getElementById('optionC');
    // let optionD = document.getElementById('optionD');

    //Gets questions and options from Question Bank
    questionText.textContent = questionBank[0].question;
    optionA.textContent = questionBank[0].optionA;
    optionB.textContent = questionBank[0].optionB;
    optionC.textContent = questionBank[0].optionC;
    optionD.textContent = questionBank[0].optionD;
    answer.textContent = questionBank[0].answer;

    if (subject === "government") {
        displayGovernmentQuestion(questionText, optionA, optionB, optionC, optionD);
    } else {
        alert(`Invalid Subject Selection!: ${subject}`);
        throw `Invalid Subject Selection!: ${subject}. Aborting!`;
    }
};

function checkAnswer () {
    let correctAnswer = document.getElementById('answer').textContent;
    if (document.getElementById('optionA').style.color === "red") {
        let userAnswer = document.getElementById('optionA').textContent;

    } else if (document.getElementById('optionB').style.color === "red") {
        let userAnswer = document.getElementById('optionB').textContent;

    } else if (document.getElementById('optionC').style.color === "red") {
        let userAnswer = document.getElementById('optionC').textContent;

    } else if (document.getElementById('optionD').style.color === "red") {
        let userAnswer = document.getElementById('optionD').textContent;
    }


    // let userAnswer = document.getElementsByTagName('p');
    // for (let i = 0; i < userAnswer.length; i++) {
    //     if (userAnswer[i].style.color === "red") {
    //         userAnswer[i] = userAnswerChosen;
    //     }
    // }
    
    isCorrect = userAnswer === correctAnswer;
    if (isCorrect) {
        incrementRightAnswer();
    } else {
        incrementFailedAnswer();
    }
};

function progressBar () {

};

function timer() {

};

function questionNumber() {

};


let selection = document.getElementsByClassName('options');
for (let i = 0; i < selection.length; i++) {
    selection[i].addEventListener('click', selecChoose);
}
function selecChoose() {
    if (this.style.color === "black") {
        this.style.color = "red";
    } else (this.style.color = "black")
}



function nextQuestion() {

};

function endPractice() {

};

function incrementScore() {
failed = " "
pass = " "
};

function result() {

};

function restartPractice () {

};

function displayMathsQuestion() {

};

function displayEnglishQuestion() {
    
};

function displayGovernmentQuestion(questionText, optionA, optionB, optionC, optionD, answer) {
    document.getElementById('question-text') = questionText;
    document.getElementById('optionA') = optionA;
    document.getElementById('optionB') = optionB;
    document.getElementById('optionC') = optionC;
    document.getElementById('optionD') = optionD;
    document.getElementById('answer') = answer;
    
    
};