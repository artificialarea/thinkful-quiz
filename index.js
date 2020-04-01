'use strict';

// SEE store.js FOR DATABASE //


// $(document).ready
$(function() {
  renderView(); // renderView(thisView = 'start')
  handleStartQuiz();
  handleQuizCycleTEMP();

  // TEMP disabled to allow ^^^^^^ handleQuizCycleTEMP() to work
  // handleFeedback(); 

  // handleQuestionView();
  // handleAnswerSubmitted();
});

// TYPES OF FUNCTIONS
// Template Generators
// Rendering Functions
// Event Handlers


//////////////////////////////////////////////////////////////
// TEMPLATE GENERATORS ///////////////////////////////////////
//////////////////////////////////////////////////////////////

function generateFeedback(bool) {
  console.log('generateFeedback() running...');
  if (bool === true) {
    console.log(true);
  } else {
    console.log(false);
  }

}

function generateStatus() {
  console.log('generateStatus() ran... on empty.');
  // goto STORE to find
  $('.status').html(
    `
    `
  );
}

function generateQuizQuestion(arr) {
  console.log('generateQuizQuestion(arr) ran...');
  // go to STORE to find
  // what (next) current question number is
  const questionNum = STORE.currentQuestion;
  // console.log(`questionNum: ${questionNum}`);
    
  // find question object in QUESTIONS database
  const question = arr[questionNum];
  // console.log(question);

  // generate the content in HTML
  // NOTE: .status bar will need to be generated separately
  // $('.quiz').find('.content').html(
  return `
    <img src="${question.image}" alt="${question.imgAlt}">

    <h1 class="">${question.title}</h1>

    <form class="user-controls">
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
  // );

  // return value
}

function generateStatus() {

}

//////////////////////////////////////////////////////////////
// RENDERING FUNCTIONS ///////////////////////////////////////
//////////////////////////////////////////////////////////////

function renderFeedback(bool) {
  console.log('renderFeedback() ran...');

  // ^^ generateFn()
  generateFeedback(bool);
  // if (bool === true) {
  //   generateFeedbackCorrect();
  // } else {
  //   generateFeedbackIncorrect();
  // }

  // STORE.view = 'feedback';
  renderView('feedback');
}

function renderStatus() {
  console.log('renderStatus() ran...');
}

function renderQuiz() {
  console.log('renderQuiz() ran...');

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
}

// init
function renderView(thisView = 'start') {
  // Render function "draws" the app.
  // Explicitly set components to visible or hidden 
  // on every execution of render.
  console.log('renderView() ran...');
  STORE.view = thisView;
  // console.log(`STORE.view: ${STORE.view}`);
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

// (via Start View)
// Handle Init Quiz Question View 
function handleStartQuiz() {
  console.log('handleStartQuiz() ran...');
  // once Start button clicked inititate handling of Quiz Questions
  // binds an event handler
  $('.intro').on('click', '.start-quiz', function(event) {
    // console.log(event.target);
    renderQuiz();
  });
}


// (via Quiz Question View)
// check if choice true or false
function checkAnswer() {


}


// (via Quiz Question View)
// Handle Feedback View
function handleFeedback() {
  console.log('handleFeedback() ran...');
  $('.quiz').on('click', '.submit-answer', function(event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();

    if (answer === QUESTIONS[STORE.currentQuestion].answer) {
      console.log("correct");
      renderFeedback(true);
    } else {
      console.log("wrong");
      renderFeedback(false);
    }
    // checkAnswer();
    // renderFeedback();
  });
}

// TEMPORARY HANDLER
// just so I can quickly cycle through questions, bypassing Feedback loop
function handleQuizCycleTEMP() {
  console.log('handleQuizCycleTemp() ran...');
  $('.quiz').on('click', '.submit-answer', function(event) {
    console.log('handleQuizCycleTemp() listener event ran...');
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    console.log(`input:checked: ${selected}`);
    console.log(`answer: ${answer}`);

    if (answer === QUESTIONS[STORE.currentQuestion].answer) {
      console.log("correct");
      renderFeedback(true);
    } else {
      console.log("wrong");
      renderFeedback(false);
    }
  
    // question counter
    if (STORE.currentQuestion < QUESTIONS.length - 1) {
      STORE.currentQuestion += 1;
    } else {
      STORE.currentQuestion = 0;
    }

    renderQuiz();
    renderStatus();

  });

}


// (via Feedback View)
// if !Last Question, // Handle *Next* Quiz Question View 
// else if Last Question... // Handle Final Results View



















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