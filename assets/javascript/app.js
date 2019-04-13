// Globals - Scorekeeping and Current Answer Status
var correctAnswers = 0;
var correct = false;
var currentQuestion = 0;

// Globals - Timer Functionality
var clockRunning = false;
var timeLeft = 15;
var intervalId;

// Globals - DOM elements
var splashScreen = $(".splash-screen");
var timer = $(".timer");
var gameScreen = $(".game-screen");
var questionResultScreen = $(".question-result-screen");
var gameResultScreen = $(".game-result-screen");
var playButton = $(".play-button");

// Global - Quiz Object
var quiz = {
    0: {
        question: 'CHOAM is an acronym for:',
        choice: ['Chaperhouse Omni Aulos Merit', 'Cerebrus Hecate Ordos Mori', 'Combine Honnete Ober Advancer Mercantiles', 'Cows, Horses, Orcas, and Manitees'],
        answer: 'Combine Honnete Ober Advancer Mercantiles',
        image: './assets/images/choam.png'
    },

    1: {
        question: 'What is a mentat?',
        choice: ['A unit of curreny', 'A human computer', 'A masculine tattoo', 'A unit of interstellar distance'],
        answer: 'A human computer',
        image: './assets/images/thufir.jpg'
    },

    2: {
        question: 'What can spice (melange) be used for?',
        choice: ['Extend life', 'Space travel', 'Expand conciousness', 'All of the above'],
        answer: 'All of the above',
        image: './assets/images/spice.png'
    },

    3: {
        question: 'What planet is the ancestral home of Duke Leto Atreides?',
        choice: ['Caladan', 'Arrakis', 'Ix', 'Giedi Prime'],
        answer: 'Caladan',
        image: './assets/images/caladan.jpg'
    },

    4: {
        question: 'In what year is Alia Atreides born?',
        choice: ['88 BG', '1999 AD', '10193 BG', '10191 AG'],
        answer: '10191 AG',
        image: './assets/images/alia.gif'
    },

    5: {
        question: 'The Litany Against ______ is used to help focus the mind in times of peril. (Fill in the blank)',
        choice: ['Death', 'Fear', 'JQuery', 'Clarity'],
        answer: 'Fear',
        image: './assets/images/benegesserit.jpg'
    },
    
    6: {
        question: 'Who is the daughter of Liet Kynes',
        choice: ['Jessica', 'Helen', 'Chani', 'Irulan'],
        answer: 'Chani',
        image: './assets/images/chani.jpg'
    },

    7: {
        question: '"Muad\'Dib", the name taken by the protagonist of the first novel, is also the name of a:',
        choice: ['Mouse', 'Sandworm', 'Moon', 'Poison'],
        answer: 'Mouse',
        image: './assets/images/mouse.png'
    },

    8: {
        question: 'Glossu Rabban Harkonnen is also known as...',
        choice: ['The Sourge', 'The Beast', 'The Dragon', 'The Hydra'],
        answer: 'The Beast',
        image: './assets/images/rabban.jpg'
    },

    9: {
        question: 'What is the name of the historic battle that created rivals of House Atreides and House Harkonnen?',
        choice: ['Gom Jabbar', 'The Great Divide', 'The Butlerian Jihad', 'The Battle of Corrin'],
        answer: 'The Battle of Corrin',
        image: './assets/images/corrin.jpg'
    },

    10: {
        question: 'What is a thumper?',
        choice: ['A lure', 'A bomb', 'A rabbit', 'A subwoofer'],
        answer: 'A lure',
        image: './assets/images/sandworm.jpg'
    }
}

// STAGE 0
// Display splash screen and reset game stats
var displaySplashScreen = function() {
    splashScreen.css("display", "block");
    timer.css("display", "none");
    gameScreen.css("display", "none");
    questionResultScreen.css("display", "none");
    gameResultScreen.css("display", "none");
}

// STAGE 1
// Prompt for user input
var displayQuestion = function() {
    // timeLeft = 15;
    correct = false;
    splashScreen.css("display", "none");
    questionResultScreen.css("display", "none");
    timer.css("display", "inline-block");
    gameScreen.css("display", "block");
    
    var newQuestionPrompt = $("<p>").text(quiz[currentQuestion].question).addClass(".question-text");
    newQuestionPrompt.appendTo(".question-section");

    var newList = $("<ul>");
    newList.appendTo(".answer-section").addClass("quiz-choice-text");
    
    for(var i=0; i<quiz[currentQuestion].choice.length; i++){
        var newChoice = $("<li>").addClass("user-choice").text(quiz[currentQuestion].choice[i]);
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
            if(userInput === quiz[currentQuestion].answer) {
                correctAnswers ++;
                correct = true;   
            }
            // Proceed to next phase (display answer)
            displayAnswer(currentQuestion, userInput);
        }
    });
}

// STAGE 2
// Display answer and feedback to user
var displayAnswer = function(number, userInput) {
    $(".question-section").empty();
    $(".answer-section").empty();
    timer.css("display", "none");
    gameScreen.css("display", "none");
    questionResultScreen.css("display", "block");
    $(".question-result-img").empty();
    if(userInput === quiz[number].answer){
        console.log(quiz[number].image);
        $(".question-feedback").text("CORRECT!");
        $("<img>").attr("src", quiz[number].image).appendTo(".question-result-img");
    } else if(userInput === "timeout"){
        $(".question-feedback").text("TIMES UP!");
        $("<img>").attr("src", "./assets/images/piter.gif").appendTo(".question-result-img");
    } else {
        $(".question-feedback").text("WRONG!");
        $("<img>").attr("src", "./assets/images/baron.gif").appendTo(".question-result-img");
    }

    $("<p>").text("The answer was " + quiz[number].answer + "!").css("text-style", "italics").appendTo(".question-feedback");
    
    currentQuestion++;
    timeLeft = 15;
    
    if(currentQuestion < Object.keys(quiz).length){
        setTimeout(displayQuestion, 2000);
    } else {
        setTimeout(displayGameResult, 2000);
    }
}

// STAGE 3
// Display game results & stats
var displayGameResult = function() {
    questionResultScreen.css("display", "none");
    gameResultScreen.css("display", "block");
    $("#score-text").text(getScore());
    $("#correct-text").text(correctAnswers);
    $("#incorrect-text").text(Object.keys(quiz).length - correctAnswers);
    if((correctAnswers/Object.keys(quiz).length*100) >= 90) {
        $("#level-text").text("Great Maker");
    } else if((correctAnswers/Object.keys(quiz).length*100) >= 80) {
        $("#level-text").text("Shai Hulud");
    } else if((correctAnswers/Object.keys(quiz).length*100) >= 70) {
        $("#level-text").text("Sandworm");
    } else if((correctAnswers/Object.keys(quiz).length*100) >= 60) {
        $("#level-text").text("Sandtrout");
    } else {
        $("#level-text").text("Sand Plankton");
    }
}

// STAGE 4
// Reset game and stats
var resetGameStats = function() {
    timeLeft = 15;
    correctAnswers = 0;
    correct = false;
    currentQuestion = 0;
    clockRunning = false;
}

// Score Calculation 
var getScore = function() {
    var score = Math.floor(correctAnswers/Object.keys(quiz).length*100).toString();
    return score + '%';
}

var timesUp = function() {
    displayAnswer(currentQuestion, "timeout");
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

var startGame = function() {
    resetGameStats();
    splashScreen.css("display", "none");
    gameResultScreen.css("display", "none");
    timer.css("display", "inline-block");
    gameScreen.css("display", "block");
    displayQuestion(currentQuestion);
}

$(document).ready(function(){
    splashScreen.css("display", "block");
    $(".play-button").on("click", startGame);
});

