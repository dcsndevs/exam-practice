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







// let sample = bb.question2.optionA;

// console.log(bb[2].question3);

// let pp = document.getElementById('question-text');

// pp.innerHTML = bb.optionA;


// const cc = {
//     quest1: "dfghgh",
//     opA: "45678IH",
//     opB: "GHFGFG"
// }
// let sample2 = cc.quest1;



// let pdb = document.getElementsByClassName('info')[0];
// pdb.textContent = sample2;





