'use strict';

///////////////////////////////
// SEE store.js FOR DATABASE //
///////////////////////////////

// $(document).ready
$(function() {
  renderView();             // renderView(thisView = 'start')
  handleStartQuiz();        // aka handleQuestionView();
  handleAnswerSubmitted();  // disable if using this fn VVVVVV
  // handleQuizCycleTEMP(); // to cycle thru questions bypassing Feedback View
  handleNextQuestion();
  handleReStartQuiz();

});

// TYPES OF FUNCTIONS
// Template Generators
// Rendering Functions
// Event Handlers


//////////////////////////////////////////////////////////////
// TEMPLATE GENERATORS ///////////////////////////////////////
//////////////////////////////////////////////////////////////

function generateResults() {
  // get final score 
  const finalScore = STORE.score;
  const possibleAnswers = QUESTIONS.length;
  // contextual final message variants depending on user's finalScore
  let contextualMsg;
  if (finalScore === 0) {
    // 0 : utter shite
    contextualMsg = 'I\'m sorry to say, but that is utter shite!';
  } else if (finalScore >= 1 && finalScore <= 3) {
    // 1 - 3: poor
    contextualMsg = 'Meh. You need to start binge watching more movies, eh?';
  } else if (finalScore >= 4 && finalScore <= 6) {
    // 4 - 6: decent
    contextualMsg = 'Not bad. You need to start binge watching more movies, eh?';
  } else if (finalScore >= 7 && finalScore <= 9) {
    // 7 - 9: impressive
    contextualMsg = 'Impressive! You certainly are a film buff, aren\'t you!';
  } else if (finalScore === 10) {
    // 10: bonafide auteur
    contextualMsg = 'Impressive! You certainly are a film buff, aren\'t you! We will need to come up with another quiz with much more obscure films, eh?';
  }

  return `
    <p class="final-score">So, you got ${finalScore} out of ${possibleAnswers} answers correct...</p>
    <h2 class="msg">${contextualMsg}</h2>
    <p class="iwdrm">By the way, all the animated film stills are a labour of love sourced from <a href='https://iwdrm.tumblr.com/' target="_blank">IF WE DON'T, REMEMBER ME.</a></p> 
    
    <button class="start-quiz">Try Quiz Again?</button>
  `;
}

function generateFeedback(bool) {
  // console.log('generateFeedback() ran...');
  // go to STORE to find
  // what (next) current question number is
  const questionNum = STORE.currentQuestion;
  // // console.log(`questionNum: ${questionNum}`);
    
  // find question object in QUESTIONS database
  const question = QUESTIONS[questionNum];

  // conditional to adjust the button label language once user reaches the last Feedback View before going on to the Final Results View
  let buttonLabel = 'Next Question';
  if (STORE.currentQuestion === QUESTIONS.length - 1) {
    buttonLabel = 'Some Final Thoughts...';
  } 

  if (bool === true) {
    // trigger some visual indication when correct in the statusbar
    renderStatusHighlight(true);

    return `
      <img src="${question.image}" alt="${question.imgAlt}">
      <h1>TRUE!</h1>
      <p>The correct answer is...</p>
      <h3>${question.answer}</h3>
      <button class="next-question">${buttonLabel}</button>
    `;
  } 
  else {
    return `
      <img src="${question.image}" alt="${question.imgAlt}">
      <h1>WRONG!</h1>
      <p>The correct answer is...</p>
      <h3>${question.answer}</h3>
      <button class="next-question">${buttonLabel}</button>
    `;
  }
}

function generateStatus() {
  // console.log('generateStatus() ran...');
  // goto STORE to find
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
  // console.log('generateQuizQuestion(arr) ran...');
  // go to STORE to find
  // what (next) current question number is
  const questionNum = STORE.currentQuestion;
  // // console.log(`questionNum: ${questionNum}`);
    
  // find question object in QUESTIONS database
  const question = arr[questionNum];
  // // console.log(question);

  // generate the content in HTML
  // NOTE: .status bar will need to be generated separately
  // $('.quiz').find('.content').html(
  return `
    <img src="${question.image}" alt="${question.imgAlt}">

    <h1 class="">${question.title}</h1>

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
  // ^^ generateFn()
  const results = generateResults();
  $('.final-results').html(results);
  renderView('final-results');
}

function renderFeedback(bool) {
  // console.log('renderFeedback() ran...');

  // ^^ generateFn()
  const feedback = generateFeedback(bool);

  $('.feedback').find('.content').html(feedback);    
  renderView('feedback');
}

function renderStatus() {
  // console.log('renderStatus() ran...');
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
  // console.log('renderQuiz() ran...');

  // ^^ generateFn()
  // const result = generateQuizQuestions(QUESTIONS);
  // const status = generateStatus(STORE);
  const card = generateQuizQuestion(QUESTIONS);
  generateStatus(STORE);
  
  // with everything generated and queue'd up
  // render (insert) HTML in DOM
  $('.quiz').find('.content').html(card);
  //STORE.view = 'quiz';
  renderView('quiz');
  renderStatusHighlight(false);
}

// init
function renderView(thisView = 'start') {
  // Render function "draws" the app.
  // Explicitly set components to visible or hidden 
  // on every execution of render.
  // console.log('renderView() ran...');
  STORE.view = thisView;
  // // console.log(`STORE.view: ${STORE.view}`);
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
// ** REFACTOR ** into handleStartQuiz()
function handleReStartQuiz() {
  $('.final-results'). on('click', '.start-quiz', function(event) {
    // reset STORE
    STORE.score = 0;
    STORE.currentQuestion = 0;
    STORE.userAnswer = [];
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

// ^^^^^^^^^^^^ could probably merge this function with handleStartQuiz() **REITERATE**
// (via Feedback View)
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
  // console.log('handleAnswerSubmitted() ran...');
  $('.quiz').on('submit', '#user-controls', function(event) {
    // console.log('handleAnswerSubmitted() listener event ran...');
    event.preventDefault();
    let selectedAnswer = $('input[name=answer]:checked').val();
    // console.log(`input[name=answer]:checked: ${selectedAnswer}`);
    // push selected answer to STORE
    STORE.userAnswer.push(selectedAnswer);
    console.log(`STORE.userAnswer: ${STORE.userAnswer}`);
    renderStatus();
    // Refering to database 'STORE.userAnswer' 
    // rather than local DOM 'selectedAnswer' (as I would do)
    if (STORE.userAnswer[STORE.userAnswer.length-1] === QUESTIONS[STORE.currentQuestion].answer) {
      STORE.score += 1;
      renderFeedback(true);
    } else {
      renderFeedback(false);
    }
  });
}

//


// TEMPORARY HANDLER
// just so I can quickly cycle through questions
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






















// GUIDANCE ////////////////////////////////////////////////
// from https://thinkful.slides.com/thinkful/quiz-app#/9  //
//                                                        //
// EXAMPLE APP STRUCTURE ///////////////////////////////////

/*
// Template generators
function generateAnswerList(answers) {
}

// Rendering functions
function renderQuestionText() {
  // render question view
}

// Event handlers
function handleAnswerSubmitted() {
  $('.user-controls').on('click', '.submit-answer', () => {
    // Retrieve answer identifier of user-checked radio button
    // Perform check: User answer === Correct answer?
    // Update STORE and render appropriate section
  });
}

function handleQuestionView() {
  // display the question view via data in the STORE
}
*/