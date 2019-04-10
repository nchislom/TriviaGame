
var correctAnswers = 0;
var quiz = {
    q1: {
        question: 'CHOAM is an acronym for:',
        choice: ['Chaperhouse Omni Aulos Merit', 'Cerebrus Hecate Ordos Mori', 'Combine Honnete Ober Advancer Mercantiles', 'Cows, Horses, Orcas, and Manitees'],
        answer: 'Combine Honnete Ober Advancer Mercantiles'
    },

    q2: {
        question: 'What is a mentat?',
        choice: ['A unit of curreny', 'A human computer', 'A masculine tattoo', 'A unit of interstellar distance'],
        answer: 'A human computer'
    },

    q3: {
        question: 'What can spice (melange) be used for?',
        choice: ['Extend life', 'Space travel', 'Expand conciousness', 'All of the above'],
        answer: 'All of the above'
    },

    q4: {
        question: 'What planet is the ancestral home of Duke Leto Atreides?',
        choice: ['Caladan', 'Arrakis', 'Ix', 'Giedi Prime'],
        answer: 'Caladan'
    },

    q5: {
        question: 'In what year is Alia Atreides born?',
        choice: ['88 BG', '1999 AD', '10193 BG', '10191 AG'],
        answer: '10191 AG'
    },

    q6: {
        question: 'The Litany Against ______ is used to help focus the mind in times of peril. (Fill in the blank)',
        choice: ['Death', 'Fear', 'JQuery', 'Clarity'],
        answer: 'Fear'
    }

    }
var getScore = function() {
    var score = Math.floor(correctAnswers/Object.keys(quiz).length*100).toString();
    return score + '%';
}

var displayQuestion = function(num){
    
}