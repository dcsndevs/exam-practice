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
                    alert(" The button is working!");            
            } else if (this.getAttribute("data-type") === "end2"){
                        alert(" The button is working!");            
            } else {
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

const questionText = document.getElementById('question-text');
const optionA = document.getElementById('optionA');
const optionB = document.getElementById('optionB');
const optionC = document.getElementById('optionC');
const optionD = document.getElementById('optionD');

// /* Question 1 */

// questionText.textContent = bb[0].question;
// optionA.textContent = bb[0].optionA;
// optionB.textContent = bb[0].optionB;
// optionC.textContent = bb[0].optionC;
// optionD.textContent = bb[0].optionD;
// this.questionAnswer = bb[0].answer;

// /* Question 2 */
// questionText.textContent = bb[1][0];
// optionA.textContent = bb[1][1];
// optionB.textContent = bb[1][2];
// optionC.textContent = bb[1][3];
// optionD.textContent = bb[1][5];




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

function displayGovernmentQuestion(questionText, OptionA, OptionB, optionC, optionD) {
    document.getElementById('question-text').textContent = questionText;
    document.getElementById('optionA').textContent = optionA;
    document.getElementById('optionB').textContent = optionB;
    document.getElementById('optionC').textContent = optionC;
    document.getElementById('optionD').textContent = optionD;
    
    
};