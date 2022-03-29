const quizData = [
    {
        question: 'How many forms does Unknown have?',
        a: '21',
        b: '24',
        c: '30',
        d: '28',
        correct: 'd'
    },
    {
        question: 'Which pokemon is water type?',
        a: 'Lugia',
        b: 'Articuno',
        c: 'Pyukumuku',
        d: 'Turtwig',
        correct: 'c'
    },
    {
        question: 'Which move does the most damage?',
        a: 'Self-explosion',
        b: 'Explosion',
        c: 'Hyper beam',
        d: 'V-create',
        correct: 'b'
    },
    {
        question: 'Which is not a psychic type move?',
        a: 'Heart stamp',
        b: 'Psych up',
        c: 'Agility',
        d: 'Imprison',
        correct: 'b'
    },
    {
        question: 'What type is super effective against fairy type?',
        a: 'Steel',
        b: 'Dragon',
        c: 'Dark',
        d: 'Bug',
        correct: 'a'
    },
]

const questionEl = document.querySelector('#question');
const quiz = document.querySelector('#quiz');
const a_text = document.querySelector('#a_text');
const b_text = document.querySelector('#b_text');
const c_text = document.querySelector('#c_text');
const d_text = document.querySelector('#d_text');
const submitBtn = document.querySelector('button');
const answerEls = document.querySelectorAll('.answer');


let currentQuiz = 0;
let score = 0;
let seenQuestion = [];

loadQuiz();

function randomQuiz() {
    const randomNum = Math.floor(Math.random() * 5);
    if (!seenQuestion.includes(randomNum)) {
        seenQuestion.push(randomNum);
        currentQuiz = randomNum;
    } else {
        randomQuiz();
    }
}

function loadQuiz() {
    deselectAnswers();
    randomQuiz();
    console.log(seenQuestion);

    const currentQuizData = quizData[currentQuiz];
    questionEl.innerHTML = currentQuizData.question;

    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
}

function getSelected () {
    let answer = undefined;

    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers () {
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener('click', () => {
    // check to see if answer
    const answer = getSelected();

    // if an answer is selected, we move on to the next question
    if(answer) {

        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;
        if(currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2>You answered ${score} / ${quizData.length} questions correctly!</h2> <button onclick="location.reload()">Reload</button>`
        }
    }
});