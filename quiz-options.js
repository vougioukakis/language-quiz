var currentQuestionID = -1;
var usedQuestions = [];
var correctAnswers = 0;
var questionsAsked = 0;
var message;


var toggle_bool = 0;
// page functionality
function toggle(){
    if (toggle_bool == 0){
        document.documentElement.style.setProperty('--main-color', "#504a42");
        document.documentElement.style.setProperty('--secondary-color', "#755d3c");
        document.documentElement.style.setProperty('--border-color', "#A79277");
        document.documentElement.style.setProperty('--accent-dark', "#755d3c");
        document.documentElement.style.setProperty('--font-color', "#eaeaea");

        toggle_bool = 1;
    }else{
        document.documentElement.style.setProperty('--main-color', "#FFF2E1");
        document.documentElement.style.setProperty('--secondary-color', "#EAD8C0");
        document.documentElement.style.setProperty('--border-color', "#A79277");
        document.documentElement.style.setProperty('--accent-dark', "#EAD8C0");
        document.documentElement.style.setProperty('--font-color', "#0a0a0a");
        
        toggle_bool = 0;
    }
    
}
function areYouSure(){
    document.getElementById("are-you-sure-div").style.display = "flex";
}
function hideAreYouSure(){
    document.getElementById("are-you-sure-div").style.display = "none";
}
function showWelcomePage(){
    currentQuestionID = -1;
    usedQuestions = [];
    correctAnswers = 0;
    questionsAsked = 0;
    message = '';

    document.getElementById("are-you-sure-div").style.display = "none";

    document.getElementById("welcome-page").style.display = "flex";
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("results-page").style.display = "none";
}

function goToQuiz(){
    document.getElementById("quiz-page").style.display = "flex";
    document.getElementById("welcome-page").style.display = "none";
    document.getElementById("results-page").style.display = "none";

    showQuestion();

}

function showResults(){
    document.getElementById("results-page").style.display = "flex";
    document.getElementById("welcome-page").style.display = "none";
    document.getElementById("quiz-page").style.display = "none";

    fillResults();
}

function fillResults(){
    
    const results = document.getElementById("results-page");
    results.innerHTML =
    `
    <h1>Results</h1>
    <p>You got ${correctAnswers} out of ${questionsAsked} questions correct!</p>
    <button onclick="goToQuiz()">Try Again</button>
    <button onclick="showWelcomePage()">Home</button>
    `;

    currentQuestionID = -1;
    usedQuestions = [];
    correctAnswers = 0;
    questionsAsked = 0;
    message = '';

}

// quiz stuff
function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * spanishQuestions.length);
    return spanishQuestions[randomIndex];
}

function showQuestion() {
    message = document.getElementById("message");
    message.innerHTML = ``;
    document.getElementById("next-button").style.display = "none";

    questionsAsked++;

    // grab elements from html
    const questionElement = document.getElementById("question");
    let options = document.getElementById("options");

    if (options !== null) {
        options.innerHTML = "Question";
    } else {
        console.error("Element with id 'options' not found.");
    }


    // get random question from array
    let randomQuestion = getRandomQuestion();
    while (usedQuestions.includes(randomQuestion.id)){
        randomQuestion = getRandomQuestion();
    }
    
    currentQuestionID = randomQuestion.id;
    usedQuestions.push(randomQuestion.id);


    // take question info
    let question = randomQuestion.question; // string

    let option1 = randomQuestion.options[0]; // strings
    let option2 = randomQuestion.options[1];
    let option3 = randomQuestion.options[2];
    let option4 = randomQuestion.options[3];


    // display question to user
    questionElement.innerHTML = question;

    options.innerHTML = 
    `<input type="radio" id="answer1" class="radio-input" name="ans" value=`+option1+`><label for="answer1" class="radio-label">`+ option1 + `</label>
    <input type="radio" id="answer2" class="radio-input"  name="ans" value=`+option2+`><label for="answer2" class="radio-label">`+ option2 + `</label>
    <input type="radio" id="answer3" class="radio-input" name="ans" value=`+option3+`><label for="answer3" class="radio-label">`+ option3 + `</label>
    <input type="radio" id="answer4" class="radio-input" name="ans" value=`+option4+`><label for="answer4" class="radio-label">`+ option4 + `</label>`;

    document.getElementById("submit-button").style.display = "block";  
}

function checkAnswer(){

    const selectedOption = document.querySelector('input[type=radio]:checked');

    if(!selectedOption){
        message.innerHTML = `Please select an option.`;
        return;
    }

    const answer = selectedOption.value;
    const correctAnswer = spanishQuestions[currentQuestionID].correctAnswer;

    // soon this will be inside the page, not as alerts
    if(answer === correctAnswer){
        message.innerHTML = `Correct!`;
        correctAnswers++;
    } else {
        message.innerHTML = `Wrong answer. The correct answer is :` + correctAnswer + `.`;
    }

    let radio_buttons = document.getElementsByName("ans");
    for (i = 0; i < radio_buttons.length; i++){
        radio_buttons[i].disabled = true;
    }

    // change this to the boxes of the options getting colored

    // show next button
    document.getElementById("submit-button").style.display = "none";
    document.getElementById("next-button").style.display = "block";
}

function nextQuestion(){
    document.getElementById("next-button").style.display = "none";
    document.getElementById("submit-button").style.display = "block";

    if (questionsAsked < 10){
        showQuestion();
    } else {
        showResults();
    }
}    