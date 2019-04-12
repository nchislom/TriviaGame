// Globals - Scorekeeping and Current Answer Status
var correctAnswers = 0;
var correct = false;
var currentQuestion = 0;

// Globals - Timer Functionality
var clockRunning = false;
var timeLeft = 5;
var intervalId;

// Globals - DOM elements
var splashDiv = $(".splash-section");
var questionDiv
var answerDiv

// Global - Quiz Object
var quiz = {
    0: {
        question: 'CHOAM is an acronym for:',
        choice: ['Chaperhouse Omni Aulos Merit', 'Cerebrus Hecate Ordos Mori', 'Combine Honnete Ober Advancer Mercantiles', 'Cows, Horses, Orcas, and Manitees'],
        answer: 'Combine Honnete Ober Advancer Mercantiles',
        image: 'https://place-hold.it/200x200'
    },

    1: {
        question: 'What is a mentat?',
        choice: ['A unit of curreny', 'A human computer', 'A masculine tattoo', 'A unit of interstellar distance'],
        answer: 'A human computer',
        image: 'https://place-hold.it/200x200'
    },

    2: {
        question: 'What can spice (melange) be used for?',
        choice: ['Extend life', 'Space travel', 'Expand conciousness', 'All of the above'],
        answer: 'All of the above',
        image: 'https://place-hold.it/200x200'
    },

    3: {
        question: 'What planet is the ancestral home of Duke Leto Atreides?',
        choice: ['Caladan', 'Arrakis', 'Ix', 'Giedi Prime'],
        answer: 'Caladan',
        image: 'https://place-hold.it/200x200'
    },

    4: {
        question: 'In what year is Alia Atreides born?',
        choice: ['88 BG', '1999 AD', '10193 BG', '10191 AG'],
        answer: '10191 AG',
        image: 'https://place-hold.it/200x200'
    },

    5: {
        question: 'The Litany Against ______ is used to help focus the mind in times of peril. (Fill in the blank)',
        choice: ['Death', 'Fear', 'JQuery', 'Clarity'],
        answer: 'Fear',
        image: 'https://place-hold.it/200x200'
    }
}

// Score Calculation 
var getScore = function() {
    var score = Math.floor(correctAnswers/Object.keys(quiz).length*100).toString();
    return score + '%';
}

// STAGE 0
// Display splash screen and reset game stats
var displaySplashScreen = function() {

}

// STAGE 1
// Prompt for user input
var displayQuestion = function(number){
    console.log("Prompting question " + number);    
    var newQuestionPrompt = $("<p>").text(quiz[number].question).addClass(".question-text");
    newQuestionPrompt.appendTo(".question-section");

    var newList = $("<ul>");
    newList.appendTo(".answer-section").addClass("quiz-choice-text");
    
    for(var i=0; i<quiz[number].choice.length; i++){
        var newChoice = $("<li>").addClass("user-choice").text(quiz[number].choice[i]);
        newChoice.appendTo(".quiz-choice-text");
    }

    // Begin Countdown!
    timerStart();

    // Event Listener to get user input
    $(".user-choice").on("click", function(){
        timerStop();
        // Error checking to prevent multiple click scoring
        if(!newQuestionPrompt.hasClass("answered")){
            newQuestionPrompt.addClass("answered");
            
            // Pass text of clicked element into userInput variable
            var userInput = $(this).text();

            // Check for correctness
            if(userInput === quiz[number].answer) {
                correctAnswers ++;     
            }
            // Proceed to next phase (display answer)
            displayAnswer(number, userInput);
        }
    });
}

// STAGE 2
// Display answer and feedback to user
var displayAnswer = function(number, userInput){
    console.log('Question number: ' + number);
    console.log('User\'s input: ' + userInput);
    if(userInput === quiz[number].answer){
        console.log('User answered correct!');
    } else {
        console.log('User answered...poorly...');
    }
}

// STAGE 3
// Display results
var displayResult = function(){
    console.log('')
}

// STAGE 4
// Reset game and stats
var resetGameStats = function() {
    correctAnswers = 0;
    correct = false;
    currentQuestion = 0;
    clockRunning = false;
}

var timesUp = function(){
    console.log('timesUp function just fired!');
    // Display times up div
    // Call next quesion
}

var clearQuestion = function() {
    $(".question-section").empty();
    $(".answer-section").empty();
}

var timerStart = function() {
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
      }
}

var timerStop = function() {
    intervalId = clearInterval(intervalId);
    clockRunning = false;
}

var timerReset = function() {
    clockRunning = false;
    timeLeft = 45;
}

var count = function() {
    $(".timer-text").text(timeLeft);
    if(timeLeft < 1){
        timerStop();
        timesUp();
    }
    timeLeft--;
}

// Game Entry Point
// var startGame = function() {
//     for(var i = 0; i <= Object.keys(quiz).length+1; i++){
//         displayQuestion(i);
//     }
//     displayResult();
// }

startGame();