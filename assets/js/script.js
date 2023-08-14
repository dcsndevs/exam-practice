// Global Variables
const question = document.getElementById('question');
const optionA = document.getElementById('optionA');
const optionB = document.getElementById('optionB');
const optionC = document.getElementById('optionC');
const optionD = document.getElementById('optionD');
const answer = document.getElementById('answer');
let subjectTitle = document.getElementById("subjectTitle");
const resultDate = new Date();


// Global Display Variables
let displayWelcome = document.getElementById('welcome');
let displayNextEnd = document.getElementsByClassName("controls")[0];
let displayMainControls = document.getElementsByClassName("main-controls")[0];
let displayFooter = document.getElementsByTagName("footer")[0];
let displayResult= document.getElementById("result");
let displayMainArea = document.getElementById('main-area');
let hideScreen = document.getElementById('hide-screen');

//Allow DOM to load before starting exam practice sessions
//Add event listeners to subject practice
document.addEventListener("DOMContentLoaded", function() {
    let mainControls = document.getElementsByTagName("button");
    for (let i of mainControls) {
        i.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "start") {
                let usernameInput = document.getElementById("user").value; 
                if (usernameInput.length >= 2 && usernameInput.length <= 30) {
                    optionsColorChange();
                    username();
                } 
                else { return start, invalidLogin()}
                                
            } 
            else if (this.getAttribute("data-type") === "next") {
                let subject = subjectTitle.textContent.toLowerCase();
                checkAnswer(subject);                
            } 
            else if (this.getAttribute("data-type") === "print") {
                
                print();                
            }
            else if (this.getAttribute("data-type") === "exit") {
                
                location.reload();                
            }
            else if (this.getAttribute("data-type") === "maths"){
                alert("You have 10 minutes to answer 10 questions.\nGoodluck!")
                    
                    displayMainArea.style.display = "block";                    
                    subjectTitle.textContent = "Maths";
                    let subject = this.getAttribute("data-type");
                    startPractice(subject);    
            } 
            else if (this.getAttribute("data-type") === "english"){
                alert("You have 10 minutes to answer 10 questions.\nGoodluck!")
                    
                    displayMainArea.style.display = "block";                    
                    subjectTitle.textContent = "English";
                    let subject = this.getAttribute("data-type");
                    startPractice(subject);                
            } 
            else if (this.getAttribute("data-type") === "government"){
                    alert("You have 10 minutes to answer 10 questions.\nGoodluck!")
                    
                    displayMainArea.style.display = "block";                    
                    subjectTitle.textContent = "Government";
                    let subject = this.getAttribute("data-type");
                    startPractice(subject);            
            } 
            else if (this.getAttribute("data-type") === "end"){             
                block();            
            } 
            else {
                alert(`Invalid Subject Selection!`);
                throw `Invalid Subject Selection. Refresh`;
            }
        });
    }
   
});
function invalidLogin () {
    document.getElementsByClassName('invalid-login')[0].textContent = '"Your Name must be at least 2 and not more than 30 characters."'
}
//Enable color selection for question options
function optionsColorChange() {
    document.getElementById('optionA').style.color = "black"
    document.getElementById('optionB').style.color = "black"
    document.getElementById('optionC').style.color = "black"
    document.getElementById('optionD').style.color = "black"
    let selection = document.getElementsByClassName('options');
    for (let i = 0; i < selection.length; i++) {
        selection[i].addEventListener('click', selecChoose);
    }
}

function selecChoose() {
    if (this.style.color === "black") {
        this.style.color = "red";
    } else (this.style.color = "black")
}

/**
 * Username Input
 */
function username() {

    displayWelcome.style.display = "none"
    displayFooter.style.display = "none"
    displayMainControls.style.display = "block"
    let usernameInput = document.getElementById("user").value;    
    document.getElementById('usernames').innerText = usernameInput;
    alert("Welcome " + `${usernameInput}` + "!\n Pick a subject to continue");
}

/**
 * This functions starts the practice as soon as it receives a subject
 */
function startPractice(subject) {
        
    if (subject === "government") {
        let questionNumber = parseInt(document.getElementById('questionNumber').textContent);
        let i = questionNumber + 1;
        j = i;
        
        displayGovernmentQuestion(question, optionA, optionB, optionC, optionD, answer, subject);
        
    } else if (subject === "maths") {
        let questionNumber = parseInt(document.getElementById('questionNumber').textContent);
        let i = questionNumber + 12;
        j = i;
        displayMathsQuestion(question, optionA, optionB, optionC, optionD, answer, subject);

    } else if (subject === "english") {
        let questionNumber = parseInt(document.getElementById('questionNumber').textContent);
        let i = questionNumber + 23;
        j = i;
        displayEnglishQuestion(question, optionA, optionB, optionC, optionD, answer, subject);

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

/**
 * Checks the chosen answer against the system answer
 */
function checkAnswer (subject) {
    
    let correctAnswer = document.getElementById('answer').textContent;
    let userAnswer;
    if (document.getElementById('optionA').style.color === "red") {
        userAnswer = document.getElementById('optionA').textContent;

    } 
    else if (document.getElementById('optionB').style.color === "red") {
        userAnswer = document.getElementById('optionB').textContent;

    } 
    else if (document.getElementById('optionC').style.color === "red") {
        userAnswer = document.getElementById('optionC').textContent;

    } 
    else if (document.getElementById('optionD').style.color === "red") {
        userAnswer = document.getElementById('optionD').textContent;
    } 
    else userAnswer = "black";
  

    let isCorrect = userAnswer === correctAnswer;
    if (isCorrect) {
        incrementRightAnswer();
    } else {
        incrementFailedAnswer();
    }

    questionNumber(subject);
};

function incrementRightAnswer() {
    let rightAnswer = parseInt(document.getElementById('rightAnswer').textContent);
    document.getElementById("rightAnswer").textContent = ++rightAnswer;
};

function incrementFailedAnswer() {
    let failedAnswer = parseInt(document.getElementById('failedAnswer').textContent);
    document.getElementById("failedAnswer").textContent = ++failedAnswer;
};

/**
 * Checks for the current question number and then adds 1 to it in other to access
 * the next question
 */
function questionNumber(subject) {
    let previousQuestionNumber = parseInt(document.getElementById("questionNumber").textContent);
    document.getElementById("questionNumber").textContent = ++previousQuestionNumber;
    document.getElementById("optionA").style.color ="black"
    document.getElementById("optionB").style.color ="black"
    document.getElementById("optionC").style.color ="black"
    document.getElementById("optionD").style.color ="black"
    if ((subject === "government") && (previousQuestionNumber < 11)) {
        startPractice("government");        
    } 
    else if ((subject === "english") && (previousQuestionNumber < 11)) {   
        startPractice("english");
    }
    else if ((subject === "maths") && (previousQuestionNumber < 11)) { 
        startPractice("maths");       
    }
    else {
        result();     
    }
};
function block() {
    hideScreen.style.display = "block";
    displayMainArea.style.display = "none";
    
    setTimeout (function() {
        endPractice();
    },3)
}
function endPractice() {
    hideScreen.style.display = "block";
    
    let message = "This would terminate your current practice session!\nPress Cancel to continue the practice or Ok to end."
    
    if (confirm (message) == true) {        
        result();
    } else {
        displayMainArea.style.display = "block";
        hideScreen.style.display = "none";
        return 
                
    }
    
    
};

/**Function to Display controls when practice is loaded */
function displayControls (subject) {    
    displayNextEnd.style.display = "block"
    hideSubjectControls(subject);
}
/**Function to Hide Main Subject controls when practice is loaded */
function hideSubjectControls(subject) {
    displayMainControls.style.display = "none"
    timer(subject);
}

/**Function to display timer and end exam at the end*/
function timer() {     
    if ((document.getElementById("timer").textContent !=="")) {
        return;
    } else {
        const practiceTime = 10; //10minutes for each practice session
        let totalSeconds = practiceTime * 60;

        const timer = document.getElementById("timer");

        const clearTimerInterval = setInterval (timerCounting, 1000); //Milliseconds -i.e the time it takes a second to elapse
        function stop() {
            clearInterval(clearTimerInterval);
        }
        
        function timerCounting() {
            const minutes = '0' + Math.floor(totalSeconds / 60); //Minutes remaining displayed
            let seconds = totalSeconds % 60;
            if (seconds < 10) {
                seconds = '0' + seconds
            } else {
                seconds;
            }
            if ((minutes === '0' + 0) && (seconds === '0' + 0)) (timeUp() && stop()); //Helps stop the time when secs and minutes hits zero
            timer.innerHTML = `${minutes}:${seconds}`; 
            totalSeconds--;
            if (document.getElementById('date').innerHTML!=="") stop(); //Helps stop the time when use uses end button to end practice
        }
    }

};
/**
 * Ends the practice session on time up
 */
function timeUp() {
    
    alert("Your time is Up!");
    displayResult.style.display = "block"

    result ();
    
}

function result() {
    alert("You have come to the end of this practice session!\nEnter OK to view your result!");    
    hideScreen.style.display = "none"; 
    displayResult.style.display = "block";
    document.getElementById('name-result').innerText = document.getElementById('usernames').innerText;
    document.getElementById('date').innerHTML = resultDate;

};

function displayGovernmentQuestion(question, optionA, optionB, optionC, optionD, answer, subject) {

    document.getElementById('question').textContent = question;
    document.getElementById('optionA').textContent = optionA;
    document.getElementById('optionB').textContent = optionB;
    document.getElementById('optionC').textContent = optionC;
    document.getElementById('optionD').textContent = optionD;
    document.getElementById('answer').textContent = answer;
    displayControls (subject);
    
};

function displayMathsQuestion(question, optionA, optionB, optionC, optionD, answer, subject) {
    document.getElementById('question').textContent = question;
    document.getElementById('optionA').textContent = optionA;
    document.getElementById('optionB').textContent = optionB;
    document.getElementById('optionC').textContent = optionC;
    document.getElementById('optionD').textContent = optionD;
    document.getElementById('answer').textContent = answer;
    displayControls (subject);
};

function displayEnglishQuestion(question, optionA, optionB, optionC, optionD, answer, subject) {
    document.getElementById('question').textContent = question;
    document.getElementById('optionA').textContent = optionA;
    document.getElementById('optionB').textContent = optionB;
    document.getElementById('optionC').textContent = optionC;
    document.getElementById('optionD').textContent = optionD;
    document.getElementById('answer').textContent = answer;
    displayControls (subject);
};

//Question Banks for Subjects
const questionBank = [    
    {
    question: "Who is the current monarch of the United Kingdom?",
    optionA: "Queen Elizabeth II",
    optionB: "Queen Elizabeth IV",
    optionC: "King Charlse",
    optionD: "Joe Biden",
    answer: "No answer here"
    },

    {
    question: "'Sample Question': Who is the current monarch of the United Kingdom?",
    optionA: "Peter Obi",
    optionB: "Donald Trump",
    optionC: "King Charlse",
    optionD: "Joe Biden",
    answer: "King Charlse"
    },  

    {question: "A fundamental component of political culture is _ _ _ __ _ _ _-",
    optionA: "social values",
    optionB: "family values",
    optionC: "economic values.",
    optionD: "community structure",
    answer: "family values"},

    {
    question: "A form of oligarchy in which gifted people are at the helm of affairs is _ _ _ _-",
    optionA: "aristocracy",
    optionB: "theocracy",
    optionC: "plutocracy",
    optionD: "gerontocracy",
    answer: "aristocracy"
    },

    {
    question: "A state that is ruled by an elected citizen is _ _ _ _ _ _",
    optionA: "a monarchy",
    optionB: "a plutocracy",
    optionC: "a republic",
    optionD: "an empire",
    answer: "an republic"
    },

    {
    question: "A true democracy in the modern sense exists where the –",
    optionA: "elected representatives rule",
    optionB: "majority of the people rule",
    optionC: "majority of the people vote",
    optionD: "elite rules",
    answer: "elected representatives rule"
    },

    {
    question: "In a parliamentary system, when the legislature passes a vote of no confidence on the executive, it means that the _ _ _ _",
    optionA: "executive is expected to go on suspension",
    optionB: "legislature ceases to trust the executive",
    optionC: "executive is required to resign",
    optionD: "legislature commences legal proceeding against the executive",
    answer: "executive is required to resign"
    },

    {
    question: "The legislative body of the United States of America is the _ _ _ _",
    optionA: "Parliament",
    optionB: "National Assembly",
    optionC: "Congress",
    optionD: "Council.",
    answer: "Congress"
    },

    {
    question: "Unicameralism is a feature of the legislature in _ _ _ _",
    optionA: "Israel",
    optionB: "the United States",
    optionC: "the United Kingdom",
    optionD: "Ghana.",
    answer: "Israel"
    },

    {
    question: "The upper house in most federalsystems is created to _ _ _ _",
    optionA: "ensure equality of federating units",
    optionB: "prevent excesses of the executive",
    optionC: "oversee and check the lower house",
    optionD: "enable experienced elders make inputs to governance.",
    answer: "ensure equality of federating units"
    },

    {
    question: "In which of the following systems is the power of the component units more than that of the central government?",
    optionA: "Monarchical",
    optionB: "Federal",
    optionC: "Unitary",
    optionD: "Confederal",
    answer: "Confederal"
    },

    {
    question: "Nation-state is synonymous with _ _ _ _",
    optionA: "self-actualization",
    optionB: "sovereignty ",
    optionC: "liberation",
    optionD: "nationalism",
    answer: "sovereignty"
    },  

    {
    question: "Maths Sample Question: 50 + 50 = ?",
    optionA: "10",
    optionB: "100",
    optionC: "1000",
    optionD: "10000",
    answer: "No answer here"
    },

    {question: "Given a regular hexagon, calculate each interior angle of the hexagon.",
    optionA: "60 Degrees",
    optionB: "30 Degrees",
    optionC: "120 Degrees",
    optionD: "45 Degrees",
    answer: "120 Degrees"},

    {question: "A group of market women sell at least one of yam, plantain and maize. 12 of them sell maize, 10 sell yam and 14 sell plantain. 5 sell plantain and maize, 4 sell yam and maize, 2 sell yam and plantain only while 3 sell all the three items. How many women are in the group?",
    optionA: "25",
    optionB: "19",
    optionC: "18",
    optionD: "17",
    answer: "25"},

    {
    question: "A cone has a base radius of 4 cm and a height of 3 cm. The area of its curved surface is",
    optionA: "12 pi cm^2",
    optionB: "20 pi cm^2",
    optionC: "24 pi cm^2",
    optionD: "251 pi cm^2",
    answer: "20 pi cm^2"
    },

    {
    question: "Two fair dice are rolled. What is the probability that both show up the same number of point??",
    optionA: "1/36",
    optionB: "7/36",
    optionC: "1/2",
    optionD: "1/6",
    answer: "1/6"
    },

    {
    question: "Two brothers, Peter and Paul owned a business in which the ratio of shares is 5:3 respectively. Paul later sold 1/3 of his shares to Peter 15, 000 Euros. Find the total value of the business.",
    optionA: "12000",
    optionB: "1200",
    optionC: "120000",
    optionD: "1200000",
    answer: "120000"
    },

    {
    question: "Express, correct to three significant figures, 0.003597",
    optionA: "0.359",
    optionB: "0.004",
    optionC: "0.00360",
    optionD: "0.00359",
    answer: "0.00360"
    },

    {
    question: "Dickson borrows £10.00 at 2% per month interest and repays £8.00 after 4 months. However much does he still owe?",
    optionA: "£10.80",
    optionB: "£10.67",
    optionC: "£2.82",
    optionD: "£2.67",
    answer: "£2.82"
    },

    {
    question: "If the binary operation * is defined by m*n = mn + m + n for any real number m and n, find the identity element under this operation.",
    optionA: "e = 1",
    optionB: "e = -1",
    optionC: "e = -2",
    optionD: "e = 0",
    answer: "e = -1"
    },

    {
    question: "Find the mean deviation of 1, 2, 3 and 4",
    optionA: "1.0",
    optionB: "1.5",
    optionC: "2.0",
    optionD: "2.5",
    answer: "1.0"
    },

    {
    question: "In how many ways can 2 students be selected from a group of 5 students in a debating competition?",
    optionA: "10 ways",
    optionB: "15 ways",
    optionC: "20 ways",
    optionD: "25 ways",
    answer: "10 ways"
    },

    {
    question: "English Sample Question: What is the opposite of Good'",
    optionA: "Ugly",
    optionB: "Bad",
    optionC: "Fine",
    optionD: "Poor",
    answer: "No answer here"
    },

    {
    question: "For the questions, choose the options that best complete the gap(s): He was _ _ _ _ by the trickster",
    optionA: "assisted",
    optionB: "duped",
    optionC: "enjoined",
    optionD: "encouraged",
    answer: "duped"
    },

    {
    question: "When the soldiers saw that resistance was, _ _ _ _ they stopped fighting",
    optionA: "inadequate",
    optionB: "inefficient",
    optionC: "futile",
    optionD: "successful",
    answer: "futile"
    },

    {
    question: "You should read all the _ _ _ _ carefully before you decide where to go on holiday.",
    optionA: "brochures",
    optionB: "prospectus",
    optionC: "tickets",
    optionD: "handouts",
    answer: "brochures"
    },

    {
    question: "We ought to have visited the Governor, _ _ _ _ ",
    optionA: "isn't it",
    optionB: "oughtn't we",
    optionC: "shouldn't we",
    optionD: "haven't",
    answer: "oughtn't we"
    },

    {
    question: "Choose the options opposite in meaning to the word in bracket. I am happy to inform you that your boys are (conscientious)",
    optionA: "corrupt",
    optionB: "industrious",
    optionC: "carefree",
    optionD: "careful",
    answer: "carefree"
    },

    {
    question: "Choose the options opposite in meaning to the word in bracket: My father is a very (prosperous) businessman.",
    optionA: "ungrateful",
    optionB: "unscrupulous",
    optionC: "unskilled",
    optionD: "unsuccessful",
    answer: "unsuccessful"
    },

    {
    question: "Choose the options opposite in meaning to the word in bracket: My hostess greeted her guest in a very (relaxed) manner",
    optionA: "energetic",
    optionB: "athletic",
    optionC: "stiff",
    optionD: "perplexed",
    answer: "stiff"
    },

    {
    question: "Choose the options opposite in meaning to the word in bracket: Aoife takes his studies rather (lightly)",
    optionA: "humorously",
    optionB: "tediously",
    optionC: "carefully",
    optionD: "seriously",
    answer: "carefully"
    },

    {
    question: "Choose the options opposite in meaning to the word in bracket: The President took exception to the (ignoble) role the young man played in the matter",
    optionA: "honourable",
    optionB: "embarrassing",
    optionC: "dishonourable",
    optionD: "extraordinary",
    answer: "honourable"
    },

    {
    question: "'...rock the boat' What figure of speech is this expression?",
    optionA: "Simile",
    optionB: "Metaphor",
    optionC: "Personification",
    optionD: "Hyperbole",
    answer: "Metaphor"
    },

    {
    question: "New Subject later",
    optionA: "3333",
    optionB: "3333",
    optionC: "3333",
    optionD: "3de34",
    answer: "3de34"
    },
]  