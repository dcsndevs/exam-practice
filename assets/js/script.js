//Allow DOM to load before starting exam practice sessions
//Add evet listeners to subject practice

document.addEventListener("DOMContentLoaded", function() {
    let mainControls = document.getElementsByTagName("button");
    for (let i of mainControls) {
        i.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "next") {
                checkAnswer();
                nextQuestion();
            } else if (this.getAttribute("data-type") === "maths"){
                function displayMathsQuestion();
            } else if (this.getAttribute("data-type") === "english"){
                function displayEnglishQuestion();
            } else if (this.getAttribute("data-type") === "government"){
                function displayGovernmentQuestion();
            } else if (this.getAttribute("data-type") === "end"){
                function endPractice();
            }else {
                alert(`Invalid Subject Selection!`);
                throw `Invalid Subject Selection. Refresh`;
            }
        });
    }
});

const bb = [    
    {question: "who are you?",
    optionA: "A man",
    optionB: "A woman",
    optionC: "A girl",
    optionD: "A boy",
    answer: "A woman"},

    ["who killed Michael Jackson", "igufjhfjfdm", "hgdnbdsuejjh", "hjerhbnsdkjsdmnsmnkjs", "isioimenmkskjdsjn", [4]]
]  

let questionText = document.getElementById('question-text');
let optionA = document.getElementById('optionA');
let optionB = document.getElementById('optionB');
let optionC = document.getElementById('optionC');
let optionD = document.getElementById('optionD');

/* Question 1 */

questionText.textContent = bb[0].question;
optionA.textContent = bb[0].optionA;
optionB.textContent = bb[0].optionB;
optionC.textContent = bb[0].optionC;
optionD.textContent = bb[0].optionD;
this.questionAnswer = bb[0].answer;

/* Question 2 */
questionText.textContent = bb[1][0];
optionA.textContent = bb[1][1];
optionB.textContent = bb[1][2];
optionC.textContent = bb[1][3];
optionD.textContent = bb[1][5];




function startpractice() {

};

function checkAnswer () {

};

function progressBar () {

};

function timer() {

};

function questionNumber() {

};

function optionSelected() {

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

function displayGovernmentQuestion() {
    
};