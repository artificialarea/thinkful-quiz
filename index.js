'use strict';

///////////////////////////////
// SEE store.js FOR DATABASE //
///////////////////////////////

// $(document).ready
$(function() {
  renderView();  // renderView(thisView = 'start')
  initShuffleChoices();       // randomize order of multiple choices within questions

  handleStartQuiz();  
  handleAnswerSubmitted();    // disable if using next fn VVVVVV
  // handleQuizCycleTEMP();   // to bypass Feedback View
  handleNextQuestion();
  handleReStartQuiz();
  
  // EXTRAS // ** REFACTOR? ** within MoSoCoW a 'Could'
  // handleRadioButtonHighlight();
});

//////////////////////////////////////////////////////////////
// SEPERATION OF CONCERNS: TYPES OF FUNCTIONS
// (Miscellaneous)
// Template Generators
// Rendering Functions
// Event Handlers
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
// MISCELLANEOUS /////////////////////////////////////////////
//////////////////////////////////////////////////////////////

function initShuffleChoices() {
  // when quiz first runs randomise/shuffle multiple choice order in QUESTIONS dB.
  // .sort() randomised with the Fisher–Yates Shuffle
  // Copy.n.paste via https://bost.ocks.org/mike/shuffle/

  QUESTIONS.forEach(function(element) {
    const array = element.choices;
    // console.log(`array (before): ${array}`);
    function shuffle(array) {
      var m = array.length, t, i;
    
      // While there remain elements to shuffle…
      while (m) {
    
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
    
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
    
      return array;
    }
    shuffle(array);
    // console.log(`array (after): ${array}`);
  });
}



//////////////////////////////////////////////////////////////
// TEMPLATE GENERATORS ///////////////////////////////////////
//////////////////////////////////////////////////////////////

function generateResults() {
  const finalScore = STORE.score;
  const possibleAnswers = QUESTIONS.length;

  // contextual message depending on userScore
  let contextualMsg;
  if (finalScore === 0) {
    // 0 : utter shite
    contextualMsg = 'I\'m sorry to say, but that is utter shite!';
  } else if (finalScore >= 1 && finalScore <= 3) {
    // 1 - 3: poor
    contextualMsg = 'Meh. You need to start binge watching more movies, eh?';
  } else if (finalScore >= 4 && finalScore <= 6) {
    // 4 - 6: decent
    contextualMsg = 'Pretty Good! You\'ve certain seen your fair share of movies, haven\'t you?';
  } else if (finalScore >= 7 && finalScore <= 9) {
    // 7 - 9: impressive
    contextualMsg = 'Impressive! You certainly are a film buff, aren\'t you!';
  } else if (finalScore === 10) {
    // 10: bonafide auteur
    contextualMsg = 'Faultless! You certainly are a film buff, aren\'t you!';
  }

  return `
    <img src="img/IWDRM_DrStrangelove.gif" alt="A scene from the film, Dr. Strangelove">
    <p class="final-score">You got ${finalScore} out of ${possibleAnswers} answers correct...</p>
    <header>
      <h2 class="msg">${contextualMsg}</h2>
    </header>
    <button class="start-quiz">Try Quiz Again?</button>
    <p class="iwdrm">By the way, all the animated film stills are sourced from <a href='https://iwdrm.tumblr.com/' target="_blank">IF WE DON'T, REMEMBER ME.</a></p> 
    
  `;
}

function generateFeedback(bool) {
  const questionNum = STORE.currentQuestion;
  const question = QUESTIONS[questionNum];

  // adjust the button label language once user reaches the last Feedback View before going on to the Final Results View
  let buttonLabel = 'Next Question';
  if (STORE.currentQuestion === QUESTIONS.length - 1) {
    buttonLabel = 'Some Final Thoughts...';
  } 

  if (bool === true) {
    // trigger some visual indication in the statusbar when correct
    renderStatusHighlight(true);

    return `
      <img src="${question.image}" alt="${question.imgAlt}">
      <header>
        <h1>TRUE! <span>+1 Score!<span></h1>
      </header>
      <p>The correct answer is indeed...</p>
      <h3>${question.answer}</h3>
      <button class="next-question">${buttonLabel}</button>
    `;
  } 
  else {
    return `
      <img src="${question.image}" alt="${question.imgAlt}">
      <header>
        <h1>WRONG!</h1>
      </header>
      <p>The correct answer is...</p>
      <h3>${question.answer}</h3>
      <button class="next-question">${buttonLabel}</button>
    `;
  }
}

function generateStatus() {
  const score = STORE.score;
  const currentQuestion = STORE.currentQuestion + 1;
  const totalQuestions = QUESTIONS.length;

  return `
    <li class="question-gauge">Question: 
      <span class="js-question-num">${currentQuestion}/${totalQuestions}</span></li>
    <li class="score-gauge">Score: 
      <span class="js-score">${score}</span></li>
  `;
}

function generateQuizQuestion(arr) {
  const questionNum = STORE.currentQuestion;
  const question = arr[questionNum];
  console.log(`img src: ${question.image}`);
  
  return `
    <img src="${question.image}" alt="${question.imageAlt}">
    <header>
      <h1>${question.title}</h1>
    </header>
    <form id="user-controls">
      <fieldset>
        <legend class="question-text">${question.question}</legend>
        <label for="answer-1"><input type="radio" name="answer" id="answer-1" value="${question.choices[0]}" required>${question.choices[0]}</label><br>
        <label for="answer-2"><input type="radio" name="answer" id="answer-2" value="${question.choices[1]}" required>${question.choices[1]}</label><br>
        <label for="answer-3"><input type="radio" name="answer" id="answer-3" value="${question.choices[2]}" required>${question.choices[2]}</label><br>
        <label for="answer-4"><input type="radio" name="answer" id="answer-4" value="${question.choices[3]}" required>${question.choices[3]}</label><br>
        <button class="submit-answer">Submit Answer</button>
      </fieldset>
    </form>
  `;
}



//////////////////////////////////////////////////////////////
// RENDERING FUNCTIONS ///////////////////////////////////////
//////////////////////////////////////////////////////////////

function renderFinalResults() {
  const results = generateResults();
  $('.final-results').html(results);
  renderView('final-results');
}

function renderFeedback(bool) {
  const feedback = generateFeedback(bool);
  $('.feedback').find('.content').html(feedback);    
  renderView('feedback');
}

function renderStatus() {
  let updatedStatus = generateStatus();
  $('.status').html(updatedStatus);
}

function renderStatusHighlight(param) {
  if (param === true) {
    $('.status').css('background-color', 'red');
    $('.status').css('color', 'white');
  } else {
    $('.status').css('background-color', 'rgb(12, 12, 12)');
    $('.status').css('color', '#999');
  }
}

function renderQuiz() {
  const card = generateQuizQuestion(QUESTIONS);
  $('.quiz').find('.content').html(card);

  renderView('quiz');
  // also, reset/remove highlight state from statusbar for next question
  renderStatusHighlight(false);
}

function renderView(thisView = 'start') {
  // Render function "draws" the app.
  // Explicitly set components to visible or hidden 
  // on every execution of render.

  STORE.view = thisView;

  if (STORE.view === 'start') {
    $('.intro').show();
    $('.quiz').hide();
    $('.feedback').hide();
    $('.final-results').hide();
    $('.status').hide();
  } else if (STORE.view === 'quiz') {
    $('.intro').hide();
    $('.quiz').show();
    $('.feedback').hide();
    $('.final-results').hide();
    $('.status').show();
  } else if (STORE.view === 'feedback') {
    $('.intro').hide();
    $('.quiz').hide();
    $('.feedback').show();
    $('.final-results').hide();
    $('.status').show();
  } else if (STORE.view === 'final-results') {
    $('.intro').hide();
    $('.quiz').hide();
    $('.feedback').hide();
    $('.final-results').show();
    $('.status').hide();
  }
}



//////////////////////////////////////////////////////////////
// EVENT HANDLERS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// (via Final Results View)
// ** REFACTOR? ** by attaching the event handler to '.main', so event delegation to '.start-quiz' button works for both section views.
function handleReStartQuiz() {
  $('.final-results'). on('click', '.start-quiz', function(event) {
    // reset STORE
    STORE.score = 0;
    STORE.currentQuestion = 0;
    STORE.userAnswer = [];
    initShuffleChoices();
    renderQuiz();
    renderStatus();
  });
}

// (via Start View)
function handleStartQuiz() {
  // console.log('handleStartQuiz() ran...');
  // once Start button clicked inititate handling of Quiz Questions
  // binds an event handler
  $('.intro').on('click', '.start-quiz', function(event) {
    // // console.log(event.target);
    renderQuiz();
    renderStatus();
  });
}



// (via Feedback View)
// ** REFACTOR? ** could probably merge this function with handleStartQuiz() ^^^^^^^^
function handleNextQuestion() {
  $('.feedback').on('click', '.next-question', function(event) {
    // if !Last Question, // Handle *Next* Quiz Question View 
    if (STORE.currentQuestion !== QUESTIONS.length - 1) {
      STORE.currentQuestion += 1;
      renderQuiz();
      renderStatus();
    } else {
      renderFinalResults();
    }
  });
}

// (via Quiz Question View)
function handleAnswerSubmitted() {
  $('.quiz').on('submit', '#user-controls', function(event) {
    event.preventDefault();
    let selectedAnswer = $('input[name=answer]:checked').val();
    STORE.userAnswer.push(selectedAnswer);
    if (STORE.userAnswer[STORE.userAnswer.length-1] === QUESTIONS[STORE.currentQuestion].answer) {
      STORE.score += 1;
      renderFeedback(true);
    } else {
      renderFeedback(false);
    }
    renderStatus();
  });
}


/* 
// ** REFACTOR? ** within MoSoCoW a 'Could'.
// make associated text of selected radio button highlight in some way.
function handleRadioButtonHighlight() {
 $('.quiz').on('click', 'input[name=answer]:checked', function(event) {
  // console.log(event.currentTarget + 'selected');
 });
}
*/


// TEMPORARY HANDLER ///////////////////////////////////////////////////
// so I can quickly cycle through questions
// bypassing Feedback loop

/*
function handleQuizCycleTEMP() {
  // // console.log('handleQuizCycleTemp() ran...');
  $('.quiz').on('submit', '#user-controls', function(event) {
    // console.log('handleQuizCycleTemp() listener event ran...');
    event.preventDefault();
    let selectedAnswer = $('input[name=answer]:checked').val();
    // console.log(`input[name=answer]:checked: ${selectedAnswer}`);
    // push selected answer to STORE
    STORE.userAnswer.push(selectedAnswer);
    // console.log(`STORE.userAnswer: ${STORE.userAnswer}`);

    
    // Refering to database 'STORE.userAnswer' 
    // rather than local DOM 'selectedAnswer' (as I would do)
    if (STORE.userAnswer[STORE.userAnswer.length-1] === QUESTIONS[STORE.currentQuestion].answer) {
      // console.log("CORRECT ANSWER");
      STORE.score += 1;
      renderFeedback(true);
      renderStatus();
    } else {
      // console.log("WRONG ANSWER");
      renderFeedback(false);
      renderStatus;
    }
  
    // question counter
    if (STORE.currentQuestion < QUESTIONS.length - 1) {
      STORE.currentQuestion += 1;
    } else { // reset
      STORE.currentQuestion = 0;
      STORE.score = 0;
    }

    renderQuiz();
    renderStatus();

  });

}
*/