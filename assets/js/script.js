// Global Variables
const question = document.getElementById('question');
const optionA = document.getElementById('option-a');
const optionB = document.getElementById('option-b');
const optionC = document.getElementById('option-c');
const optionD = document.getElementById('option-d');
const answer = document.getElementById('answer');
const topic = document.getElementById('topic');
const subjectTitle = document.getElementById("subject-title");

// Global Display Variables
const displayWelcome = document.getElementById('welcome');
const displayNextEnd = document.getElementsByClassName("controls")[0];
const displayMainControls = document.getElementsByClassName("main-controls")[0];
const displayFooter = document.getElementsByTagName("footer")[0];
const displayResult= document.getElementById("result");
const displayMainArea = document.getElementById('main-area');
const hideScreen = document.getElementById('hide-screen');

//On page load (Predefined)
document.getElementById("user").focus();

//Allow DOM to load before starting exam practice sessions
//Add event listeners to all the button elements
document.addEventListener("DOMContentLoaded", function() {
    let mainControls = document.getElementsByTagName("button");
    for (let i of mainControls) {
        i.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "start") {
                let usernameInput = document.getElementById("user").value; 
                if (usernameInput.length >= 2 && usernameInput.length <= 15) {
                    optionsColorChange();
                    username();

                } else { 
                    return invalidLogin()
                };
                                
            } else if (this.getAttribute("data-type") === "next") {
                let subject = subjectTitle.textContent.toLowerCase();
                checkAnswer(subject);      

            } else if (this.getAttribute("data-type") === "print") {
                print();

            } else if (this.getAttribute("data-type") === "exit") {                
                location.reload();

            } else if (this.getAttribute("data-type") === "maths"){
                alert("You have 10 minutes to answer 10 questions.\nGoodluck!");  
                displayMainArea.style.display = "block";
                subjectTitle.textContent = "Maths";
                let subject = this.getAttribute("data-type");
                startPractice(subject);    

            } else if (this.getAttribute("data-type") === "english"){
                alert("You have 10 minutes to answer 10 questions.\nGoodluck!");            
                displayMainArea.style.display = "block";
                subjectTitle.textContent = "English";
                let subject = this.getAttribute("data-type");
                startPractice(subject);         
                      
            } else if (this.getAttribute("data-type") === "government"){
                alert("You have 10 minutes to answer 10 questions.\nGoodluck!");
                displayMainArea.style.display = "block";
                subjectTitle.textContent = "Government";
                let subject = this.getAttribute("data-type");
                startPractice(subject);

            } else if (this.getAttribute("data-type") === "end"){
                block();          

            } else if (this.getAttribute("data-type") === "yes"){
                result();            
            } 
            else if (this.getAttribute("data-type") === "no"){
                unBlock();

            } else {
                alert(`Invalid Subject Selection!`);
                throw `Invalid Subject Selection. Refresh`;
            }
        });
    }
    /* Set focus on input field */
    document.getElementById("user").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            let usernameInput = document.getElementById("user").value; 
            if (usernameInput.length >= 2 && usernameInput.length <= 15) {
                selectOptionColor();
                username();
            } else { 
                return invalidLogin()
            };
        }
    });
});

/**
 * Displays an error message when username validation fails.
 */
function invalidLogin () {
    document.getElementsByClassName('invalid-login')[0].textContent = '"Your Name must be at least 2 and not more than 15 characters."';
}

/**
 * Receieves User input, changes it to Uppercase and then displays the 
 * page for users to select any subject.
 */
function username() {

    displayWelcome.style.display = "none";
    displayFooter.style.display = "none";
    displayMainControls.style.display = "block";
    let usernameInput = document.getElementById("user").value.toUpperCase();
    document.getElementById('usernames').innerText = usernameInput;
}

/**
 * After a subject has been selected by the user, this functions starts the practice section.
 * The selected subject is also posted to this function.
 */
function startPractice(subject) {
    let questionBankArrayIndex;    
    if (subject === "government") {
        let questionNumber = parseInt(document.getElementById('question-number-display').textContent);
        let questionNumberSequence = questionNumber + 1;
        questionBankArrayIndex = questionNumberSequence;
        
        displayGovernmentQuestion();
        
    } else if (subject === "maths") {
        let questionNumber = parseInt(document.getElementById('question-number-display').textContent);
        let questionNumberSequence = questionNumber + 12;
        questionBankArrayIndex = questionNumberSequence;
        displayMathsQuestion();

    } else if (subject === "english") {
        let questionNumber = parseInt(document.getElementById('question-number-display').textContent);
        let questionNumberSequence = questionNumber + 23;
        questionBankArrayIndex = questionNumberSequence;
        displayEnglishQuestion();

    } else {    
        alert(`Invalid Subject Selection!: ${subject}`);
        throw `Invalid Subject Selection!: ${subject}. Aborting!`;
    }
    document.getElementById('username-display').innerText = document.getElementById('usernames').innerText;
    //Gets questions and options from Question Bank
    question.textContent = questionBank[questionBankArrayIndex].question;
    optionA.textContent = questionBank[questionBankArrayIndex].optionA;
    optionB.textContent = questionBank[questionBankArrayIndex].optionB;
    optionC.textContent = questionBank[questionBankArrayIndex].optionC;
    optionD.textContent = questionBank[questionBankArrayIndex].optionD;
    answer.textContent = questionBank[questionBankArrayIndex].answer;
    topic.textContent = questionBank[questionBankArrayIndex].topic;
}

/**
 * Used to show question number on the top of the main-area (e.g 2 out of 10)
 * Checks for the current question number and then adds 1 to it in other to access
 * the next question on the questionBank() Array.
 * It also determines which index on the questionBank should be selected based on the 'subject' that was passed to it.
 */
function questionNumber(subject) {
    let previousQuestionNumber = parseInt(document.getElementById("question-number-display").textContent);
    document.getElementById("question-number-display").textContent = ++previousQuestionNumber;
    document.getElementById("option-a").style.color ="black"
    document.getElementById("option-b").style.color ="black"
    document.getElementById("option-c").style.color ="black"
    document.getElementById("option-d").style.color ="black"
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

/**
 * Resets the options from orange to black on load of new question.
 * Each time a user selects an option and it becaome orange, the options would
 * need to be rest to black again for the user to select based on the next question
 */
function optionsColorChange() {
    document.getElementById('option-a').style.backgroundColor = "white";
    document.getElementById('option-b').style.backgroundColor = "white";
    document.getElementById('option-c').style.backgroundColor = "white";
    document.getElementById('option-d').style.backgroundColor = "white";
    let selection = document.getElementsByClassName('options');
    for (let i = 0; i < selection.length; i++) {
        selection[i].addEventListener('click', selectOptionColor);
    }
}

/**
 * Makes option selection possible. The selected
 * options would change to orange when users click
 * or tap the option as a seclection of answer.
 */
function selectOptionColor() {
    document.getElementById('option-a').style.backgroundColor = "white";
    document.getElementById('option-b').style.backgroundColor = "white";
    document.getElementById('option-c').style.backgroundColor = "white";
    document.getElementById('option-d').style.backgroundColor = "white";
    this.style.backgroundColor = "orange";
};

/**
 * Checks the chosen answer against the hidden system answer.
 * If correct, the function calls incrementRightAnswer() and 
 * if wrong, it calls and adds one to incrementFailedAnswer()
 */
function checkAnswer (subject) {
    let correctAnswer = document.getElementById('answer').textContent;
    let userAnswer;
    if (document.getElementById('option-a').style.backgroundColor === "orange") {
        userAnswer = document.getElementById('option-a').textContent;

    } else if (document.getElementById('option-b').style.backgroundColor === "orange") {
        userAnswer = document.getElementById('option-b').textContent;

    } else if (document.getElementById('option-c').style.backgroundColor === "orange") {
        userAnswer = document.getElementById('option-c').textContent;

    } else if (document.getElementById('option-d').style.backgroundColor === "orange") {
        userAnswer = document.getElementById('option-d').textContent;

    } else userAnswer = "none";
  

    let isCorrect = userAnswer === correctAnswer;
    if (isCorrect) {
        incrementRightAnswer();
    } else {
        incrementFailedAnswer();
    }
    questionNumber(subject);
    /* Reset colors back to default */
    document.getElementById('option-a').style.backgroundColor = "white";
    document.getElementById('option-b').style.backgroundColor = "white";
    document.getElementById('option-c').style.backgroundColor = "white";
    document.getElementById('option-d').style.backgroundColor = "white";
}

/**
 * Adds one for each correct answer
 */
function incrementRightAnswer() {
    let rightAnswer = parseInt(document.getElementById('score').textContent);
    document.getElementById("score").textContent = ++rightAnswer;
}

/**
 * Adds one for each incorrect/failed answer
 */
function incrementFailedAnswer() {
    let eachItem = document.getElementById("topic-failed").innerHTML;
    let failedList = `<ol>${topic.textContent}</ol>`
    document.getElementById("topic-failed").innerHTML = eachItem + failedList;
}

/**
 * When users attempt to end a session during play, this function prevents 
 * the user from stll viewing the questions by displaying a div and asking 
 * them to confirm their choice of quiting the practice
 */
function block() {
    hideScreen.style.display = "block";
}

/**
 * It removes the div blocing the questions after user opts to go back into
 *  the session; perhpaps the user mistakenly click quit or changed theirmind
 */ 
function unBlock() {
    hideScreen.style.display = "none";
}

/**
 * Function to Display controls when practice is loaded
 */
function displayControls () {    
    displayNextEnd.style.display = "block";
    hideSubjectControls();
}

/**
 * Function to Hide Main Subject controls when practice is loaded
 */
function hideSubjectControls() {
    displayMainControls.style.display = "none";
    timer();
}

/**
 * Function to display timer and end exam if timer expires
 * Credit: [Florin Pop](https://www.youtube.com/watch?v=x7WJEmxNlEs)
 */
function timer() {     
    if ((document.getElementById("timer").textContent !=="")) {
        return;
    } else {
        const practiceTime = 10; //10minutes for each practice session
        let totalSeconds = practiceTime * 60;

        const timer = document.getElementById("timer"); //timer on question area
        const timer2 = document.getElementById("timer2"); //timer on when question area is blocked as a result of user attempting to quit

        const clearTimerInterval = setInterval (timerCounting, 1000); //Milliseconds -i.e the time it takes a second to elapse
        function stop() {
            clearInterval(clearTimerInterval);
        }
        
        function timerCounting() {
            const minutes = '0' + Math.floor(totalSeconds / 60); //Minutes remaining displayed
            let seconds = totalSeconds % 60;
            if (seconds < 10) {
                seconds = '0' + seconds;
            } else {
                seconds;
            }
            if ((minutes === '0' + 0) && (seconds === 59)) (timer.style.color = "red");
            if ((minutes === '0' + 0) && (seconds === '0' + 0)) (timeUp() && stop()); //Helps stop the time when secs and minutes hits zero
            timer.innerHTML = `${minutes}:${seconds}`;
            timer2.innerHTML = `${minutes}:${seconds}`; 
            totalSeconds--;
            if (document.getElementById('date').innerHTML!=="") stop(); //Helps stop the time when user uses end button to end practice or oonce result page has been loaded.
        }
    }
}

/**
 * Ends the practice session on time up
 */
function timeUp() {
    alert("Your time is Up!");
    displayResult.style.display = "block";
    result ();
}

/**
 * Computes and displays result alongside other details gathered during the session
 */
function result() {
    alert("You have come to the end of this practice session!\nEnter OK to view your result!");    
    hideScreen.style.display = "none"; 
    displayMainArea.style.display = "none";
    displayResult.style.display = "block";
    document.getElementById('name-result').innerText = document.getElementById('usernames').innerText;
    document.getElementById('date').innerHTML = new Date();
    document.getElementById("right-answer").textContent = 10 * document.getElementById("score").textContent;
    document.getElementById("failed-answer").textContent = 10 - document.getElementById("score").textContent
}

/**
 * Displays Government questions
 */
function displayGovernmentQuestion() {
    displayControls ();
};

/**
 * Displays Government questions
 */
function displayMathsQuestion() {
    displayControls ();
}

/**
 * Displays Government questions
 */
function displayEnglishQuestion() {
    displayControls ();
}

//Question Bank for Subjects
const questionBank = [    
    {
        question: "Who is the current monarch of the United Kingdom?",
        optionA: "Queen Elizabeth II",
        optionB: "Queen Elizabeth IV",
        optionC: "King Charlse",
        optionD: "Joe Biden",
        answer: "No answer here",
        topic: "Introduction"
    },
    {
        question: "'Sample Question': Who is the current monarch of the United Kingdom?",
        optionA: "Peter Obi",
        optionB: "Donald Trump",
        optionC: "King Charlse",
        optionD: "Joe Biden",
        answer: "Sample Question",
        topic: ""
    },  
    {
        question: "A fundamental component of political culture is _ _ _ __ _ _ _",
        optionA: "social values",
        optionB: "family values",
        optionC: "economic values.",
        optionD: "community structure",
        answer: "family values",
        topic: "Component of political culture"
    },
    {
        question: "A form of oligarchy in which gifted people are at the helm of affairs is _ _ _ _-",
        optionA: "aristocracy",
        optionB: "theocracy",
        optionC: "plutocracy",
        optionD: "gerontocracy",
        answer: "aristocracy",
        topic: "Form of Oligarchy"
    },
    {
        question: "A state that is ruled by an elected citizen is _ _ _ _ _ _",
        optionA: "a monarchy",
        optionB: "a plutocracy",
        optionC: "a republic",
        optionD: "an empire",
        answer: "a republic",
        topic: "Republic system of governance"
    },
    {
        question: "A true democracy in the modern sense exists where the _ _ _ _ _ _",
        optionA: "elected representatives rule",
        optionB: "majority of the people rule",
        optionC: "majority of the people vote",
        optionD: "elite rules",
        answer: "elected representatives rule",
        topic: "Democratic system of governance"
    },
    {
        question: "In a parliamentary system, when the legislature passes a vote of no confidence on the executive, it means that the _ _ _ _",
        optionA: "executive is expected to go on suspension",
        optionB: "legislature ceases to trust the executive",
        optionC: "executive is required to resign",
        optionD: "legislature commences  proceeding",
        answer: "executive is required to resign",
        topic: "The executive arm of government"
    },
    {
        question: "The legislative body of the United States of America is the _ _ _ _",
        optionA: "Parliament",
        optionB: "National Assembly",
        optionC: "Congress",
        optionD: "Council.",
        answer: "Congress",
        topic: "The legislative body in the United States"
    },
    {
        question: "Unicameralism is a feature of the legislature in _ _ _ _",
        optionA: "Israel",
        optionB: "the United States",
        optionC: "the United Kingdom",
        optionD: "Ghana.",
        answer: "Israel",
        topic: "The legislative body in Israel"
    },
    {
        question: "The upper house in most federal systems is created to _ _ _ _",
        optionA: "ensure equality of federating units",
        optionB: "prevent excesses of the executive",
        optionC: "oversee and check the lower house",
        optionD: "make inputs to governance.",
        answer: "ensure equality of federating units",
        topic: "The federal system"
    },
    {
        question: "In which of the following systems is the power of the component units more than that of the central government?",
        optionA: "Monarchical",
        optionB: "Federal",
        optionC: "Unitary",
        optionD: "Confederal",
        answer: "Confederal",
        topic: "Forms of government"
    },
    {
        question: "Nation-state is synonymous with _ _ _ _",
        optionA: "self-actualization",
        optionB: "sovereignty ",
        optionC: "liberation",
        optionD: "nationalism",
        answer: "sovereignty",
        topic: "Sovereignty"
    },  
    {
        question: "Maths Sample Question: 50 + 50 = ?",
        optionA: "10",
        optionB: "100",
        optionC: "1000",
        optionD: "10000",
        answer: "No answer here",
        topic: ""
    },
    {
        question: "Given a regular hexagon, calculate each interior angle of the hexagon.",
        optionA: "60 Degrees",
        optionB: "30 Degrees",
        optionC: "120 Degrees",
        optionD: "45 Degrees",
        answer: "120 Degrees",
        topic: "Interior angles of shapes"
    },
    {
        question: "A group of market women sell at least one of yam, plantain and maize. 12 of them sell maize, 10 sell yam and 14 sell plantain. 5 sell plantain and maize, 4 sell yam and maize, 2 sell yam and plantain only while 3 sell all the three items. How many women are in the group?",
        optionA: "25",
        optionB: "19",
        optionC: "18",
        optionD: "17",
        answer: "25",
        topic: "Sets theory"
    },
    {
        question: "A cone has a base radius of 4 cm and a height of 3 cm. The area of its curved surface is",
        optionA: "12 pi cm^2",
        optionB: "20 pi cm^2",
        optionC: "24 pi cm^2",
        optionD: "251 pi cm^2",
        answer: "20 pi cm^2",
        topic: "Area of a curved surface"
    },
    {
        question: "Two fair dice are rolled. What is the probability that both show up the same number of point??",
        optionA: "1/36",
        optionB: "7/36",
        optionC: "1/2",
        optionD: "1/6",
        answer: "1/6",
        topic: "Probability"
    },
    {
        question: "Two brothers, Peter and Paul owned a business in which the ratio of shares is 5:3 respectively. Paul later sold 1/3 of his shares to Peter 15, 000 Euros. Find the total value of the business.",
        optionA: "12000",
        optionB: "1200",
        optionC: "120000",
        optionD: "1200000",
        answer: "120000",
        topic: "Ratios"
    },
    {
        question: "Express, correct to three significant figures, 0.003597",
        optionA: "0.359",
        optionB: "0.004",
        optionC: "0.00360",
        optionD: "0.00359",
        answer: "0.00360",
        topic: "Significant figures"
    },
    {
        question: "Dickson borrows £10.00 at 2% per month interest and repays £8.00 after 4 months. However much does he still owe?",
        optionA: "£10.80",
        optionB: "£10.67",
        optionC: "£2.82",
        optionD: "£2.67",
        answer: "£2.82",
        topic: "Interest rates"
    },
    {
        question: "If the binary operation * is defined by m*n = mn + m + n for any real number m and n, find the identity element under this operation.",
        optionA: "e = 1",
        optionB: "e = -1",
        optionC: "e = -2",
        optionD: "e = 0",
        answer: "e = -1",
        topic: "Identity elements"
    },
    {
        question: "Find the mean deviation of 1, 2, 3 and 4",
        optionA: "1.0",
        optionB: "1.5",
        optionC: "2.0",
        optionD: "2.5",
        answer: "1.0",
        topic: "Mean deviation"
    },
    {
        question: "In how many ways can 2 students be selected from a group of 5 students in a debating competition?",
        optionA: "10 ways",
        optionB: "15 ways",
        optionC: "20 ways",
        optionD: "25 ways",
        answer: "10 ways",
        topic: "Permutation & Combination"
    },

    {
        question: "English Sample Question: What is the opposite of Good'",
        optionA: "Ugly",
        optionB: "Bad",
        optionC: "Fine",
        optionD: "Poor",
        answer: "No answer here",
        topic: ""
    },
    {
        question: "For the questions, choose the options that best complete the gap(s): He was _ _ _ _ by the trickster",
        optionA: "assisted",
        optionB: "duped",
        optionC: "enjoined",
        optionD: "encouraged",
        answer: "duped",
        topic: "Fill in the blanks"
    },
    {
        question: "When the soldiers saw that resistance was, _ _ _ _ they stopped fighting",
        optionA: "inadequate",
        optionB: "inefficient",
        optionC: "futile",
        optionD: "successful",
        answer: "futile",
        topic: "Logic and grammar"
    },
    {
        question: "You should read all the _ _ _ _ carefully before you decide where to go on holiday.",
        optionA: "brochures",
        optionB: "prospectus",
        optionC: "tickets",
        optionD: "handouts",
        answer: "brochures",
        topic: "Sentence formation"
    },
    {
        question: "We ought to have visited the Governor, _ _ _ _ ",
        optionA: "isn't it",
        optionB: "oughtn't we",
        optionC: "shouldn't we",
        optionD: "haven't",
        answer: "oughtn't we",
        topic: "Modal verbs"
    },
    {
        question: "Choose the options opposite in meaning to the word in bracket. I am happy to inform you that your boys are (conscientious)",
        optionA: "corrupt",
        optionB: "industrious",
        optionC: "carefree",
        optionD: "careful",
        answer: "carefree",
        topic: "Antonyms"
    },
    {
        question: "Choose the options opposite in meaning to the word in bracket: My father is a very (prosperous) businessman.",
        optionA: "ungrateful",
        optionB: "unscrupulous",
        optionC: "unskilled",
        optionD: "unsuccessful",
        answer: "unsuccessful",
        topic: "Opposite in meaning"
    },
    {
        question: "Choose the options opposite in meaning to the word in bracket: My hostess greeted her guest in a very (relaxed) manner",
        optionA: "energetic",
        optionB: "athletic",
        optionC: "stiff",
        optionD: "perplexed",
        answer: "stiff",
        topic: "Opposite in meaning"
    },
    {
        question: "Choose the options opposite in meaning to the word in bracket: Aoife takes his studies rather (lightly)",
        optionA: "humorously",
        optionB: "tediously",
        optionC: "carefully",
        optionD: "seriously",
        answer: "carefully",
        topic: "Definition of words (Antonyms)"
    },
    {
        question: "Choose the options opposite in meaning to the word in bracket: The President took exception to the (ignoble) role the young man played in the matter",
        optionA: "honourable",
        optionB: "embarrassing",
        optionC: "dishonourable",
        optionD: "extraordinary",
        answer: "honourable",
        topic: "Words and meaning"
        },
    {
        question: "'...rock the boat' What figure of speech is this expression?",
        optionA: "Simile",
        optionB: "Metaphor",
        optionC: "Personification",
        optionD: "Hyperbole",
        answer: "Metaphor",
        topic: "Figure of speech"
    },
];