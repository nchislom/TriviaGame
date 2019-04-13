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
        question: 'What is a \'mentat\'?',
        choice: ['A unit of curreny', 'A human computer', 'A masculine tattoo', 'A unit of interstellar distance'],
        answer: 'A human computer',
        image: './assets/images/thufir.jpg'
    },

    2: {
        question: 'What can spice be used for?',
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
        question: 'Who is the daughter of Liet-Kynes',
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
        question: 'Glossu Rabban Harkonnen is also known as the ________',
        choice: ['Sourge', 'Beast', 'Dragon', 'Hydra'],
        answer: 'Beast',
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
    },

    11: {
        question: 'Paul and Jessica are accepted into which Fremen community?',
        choice: ['Red Chasm Sietch', 'Sietch Jacurutu', 'Seitch Tabr', 'Windgap Sietch'],
        answer: 'Seitch Tabr',
        image: './assets/images/longlive.gif'
    },

    12: {
        question: 'Which is NOT one of the \'Great Houses\' of the Landsraad?',
        choice: ['House Harkonnen', 'House Gryffindor', 'House Atreides', 'House Corrino'],
        answer: 'House Gryffindor',
        image: './assets/images/gryffindor.jpg'
    },

    13: {
        question: 'Eldest daughter and heir of House Corrino:',
        choice: ['Chani', 'Irulan', 'Jessica', 'Margot'],
        answer: 'Irulan',
        image: './assets/images/irulan.gif'
    },

    14: {
        question: 'Gurney Halleck, the staunchly loyal troubadour warrior of House Atreides, was played by what actor in the 1984 film adaptation of the book?',
        choice: ['Brad Dourif', 'Max von Sydow', 'Sting', 'Patrick Stewart'],
        answer: 'Patrick Stewart',
        image: './assets/images/patrick.gif'
    }
}

// STAGE 0
// Display splash screen, hide unneeded elements, and reset game stats
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
    
    // New prompt setup
    correct = false;
    splashScreen.css("display", "none");
    questionResultScreen.css("display", "none");
    timer.css("display", "inline-block");
    gameScreen.css("display", "block");
    
    var newQuestionPrompt = $("<p>").text(quiz[currentQuestion].question).addClass(".question-text");
    newQuestionPrompt.appendTo(".question-section");

    var newList = $("<ul>");
    newList.appendTo(".answer-section").addClass("quiz-choice-text");
    
    // List out answer options
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
    
    // Clear elements to prevent old content 'stacking'
    $(".question-section").empty();
    $(".answer-section").empty();
    $(".question-result-img").empty();

    // Switch on/off elements
    timer.css("display", "none");
    gameScreen.css("display", "none");
    questionResultScreen.css("display", "block");

    // Answer checking logic
    if(userInput === quiz[number].answer){
        $(".question-feedback").text("CORRECT!");
        $("<img>").attr("src", quiz[number].image).appendTo(".question-result-img");
    } else if(userInput === "timeout"){
        $(".question-feedback").text("TIMES UP!");
        $("<img>").attr("src", "./assets/images/piter.gif").appendTo(".question-result-img");
    } else {
        $(".question-feedback").text("WRONG!");
        $("<img>").attr("src", "./assets/images/baron.gif").appendTo(".question-result-img");
    }

    // Generate and append user feedback paragraph element
    $("<p>").text("The answer was " + quiz[number].answer + "!").css("text-style", "italics").appendTo(".question-feedback");
    
    currentQuestion++;
    timeLeft = 15;
    
    // Logic for proceeding to next question or end of game in 2.75 seconds
    if(currentQuestion < Object.keys(quiz).length){
        setTimeout(displayQuestion, 2750);
    } else {
        setTimeout(displayGameResult, 2750);
    }
}

// STAGE 3
// Display game results & stats
var displayGameResult = function() {
    questionResultScreen.css("display", "none");
    gameResultScreen.css("display", "block");

    // Push game round info to DOM
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

// Score Calculation Function
var getScore = function() {
    var score = Math.floor(correctAnswers/Object.keys(quiz).length*100).toString();
    return score + '%';
}

// Helper function that injects "timeout" for userInput in order to fire a different function
var timesUp = function() {
    displayAnswer(currentQuestion, "timeout");
}

/********************* START Timer related functions ******************/
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
/********************* END Timer related functions ******************/


// Game Entry Point
var startGame = function() {
    resetGameStats();
    splashScreen.css("display", "none");
    gameResultScreen.css("display", "none");
    timer.css("display", "inline-block");
    gameScreen.css("display", "block");
    displayQuestion(currentQuestion);
}

// Document readiness. Prevents splash screen weirdness
$(document).ready(function(){
    splashScreen.css("display", "block");
    $(".play-button").on("click", startGame);
});

