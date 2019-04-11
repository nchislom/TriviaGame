// Globals - Scorekeeping
var correctAnswers = 0;

// Globals - Timer Functionality
var clockRunning = false;
var time = 0;
var intervalId;

// Global - Quiz Object
var quiz = {
    0: {
        question: 'CHOAM is an acronym for:',
        choice: ['Chaperhouse Omni Aulos Merit', 'Cerebrus Hecate Ordos Mori', 'Combine Honnete Ober Advancer Mercantiles', 'Cows, Horses, Orcas, and Manitees'],
        answer: 'Combine Honnete Ober Advancer Mercantiles'
    },

    1: {
        question: 'What is a mentat?',
        choice: ['A unit of curreny', 'A human computer', 'A masculine tattoo', 'A unit of interstellar distance'],
        answer: 'A human computer'
    },

    2: {
        question: 'What can spice (melange) be used for?',
        choice: ['Extend life', 'Space travel', 'Expand conciousness', 'All of the above'],
        answer: 'All of the above'
    },

    3: {
        question: 'What planet is the ancestral home of Duke Leto Atreides?',
        choice: ['Caladan', 'Arrakis', 'Ix', 'Giedi Prime'],
        answer: 'Caladan'
    },

    4: {
        question: 'In what year is Alia Atreides born?',
        choice: ['88 BG', '1999 AD', '10193 BG', '10191 AG'],
        answer: '10191 AG'
    },

    5: {
        question: 'The Litany Against ______ is used to help focus the mind in times of peril. (Fill in the blank)',
        choice: ['Death', 'Fear', 'JQuery', 'Clarity'],
        answer: 'Fear'
    }
}

// Score Calculation    
var getScore = function() {
    var score = Math.floor(correctAnswers/Object.keys(quiz).length*100).toString();
    return score + '%';
}

// Prompt for user input
var displayQuestion = function(number){
    var newQuestionPrompt = $("<p>").text(quiz[number].question).addClass(".question-text");
    newQuestionPrompt.appendTo(".question-section");

    var newList = $("<ul>");
    newList.appendTo(".answer-section").addClass("quiz-choice-text");
    
    for(var i=0; i<quiz[number].choice.length; i++){
        var newChoice = $("<li>").addClass("user-choice").text(quiz[number].choice[i]);
        newChoice.appendTo(".quiz-choice-text");
    }

    // Event Listener to get user input
    $(".user-choice").on("click", function(){
        // Error checking to prevent multiple click scoring
        if(!newQuestionPrompt.hasClass("answered")){
            newQuestionPrompt.addClass("answered");
            var userInput = $(this).text();

            if(userInput === quiz[number].answer) {
                correctAnswers ++;     
                console.log("Correct!");
            } else {
                console.log("Wrong!");
            }

        }
    });
}

var displayAnswer = function(qNumber, userInput){

}

var clearQuestion = function() {
    $(".question-section").empty();
    $(".answer-section").empty();
}

var timerStart = function() {
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
      }
}

var timerStop = function() {
    intervalId = clearInterval(count);
    clockRunning = false;
}

var count = function() {
    time--;
    $(".timer-text").text(time);
}
displayQuestion(1) // Test Case