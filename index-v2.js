// 'index-v2.js' was a second attempt with what I thought was a better approach to organizing function stubs and psuedocode. But nothing was working so putting on ice for now...


'use strict';

// SEE store.js FOR DATABASE //


// $(document).ready
$(function() {
  render('quiz'); // render(showView) e.g. showView = 'intro', 'quiz', 'feedback', 'final-results'
  handleStartQuiz();
  handleNextQuestion();
  handleAnswerSubmitted();
});




// TYPES OF FUNCTIONS 
// GROUPED, PER CURRENT VIEW/STATE (for now)
// Template Generators
// Rendering Functions
// Event Handlers

//////////////////////////////////////////////////////////////
// GO TO NEXT QUESTION (WITHIN QUIZ VIEW) ////////////////////
// either from 3. FEEDBACK VIEW
// else initially from 1. START VIEW
//////////////////////////////////////////////////////////////

// TEMPLATE GENERATORS ///////////////////////////////////////

function generateQuestion() {
  // goto STORE to find currentQuestion number
  const questionNum = STORE.currentQuestionNum;
  console.log(`questionNum: ${questionNum}`);
  // goto QUESTIONS to get data
  const question = QUESTIONS[questionNum];
  console.log(`question object: ${question}`);
  // generate HTML from data with title, questions, img src, img alt, etc.
  // return HTML (to renderQuestion)

  // generate the content in HTML
  // NOTE: .status bar will need to be generated separately
  $('.quiz').find('.content').html(
    `
    <img src="${question.image}" alt="${question.imgAlt}">

    <h1 class="">${question.title}</h1>
    <h3 class="question">${question.question}</h2>

    <form class="user-controls">
      <input type="radio" name="answer" id="answer-1" value="${question.choices[0]}" required>
      <label for="answer-1">${question.choices[0]}</label><br>
      <input type="radio" name="answer" id="answer-2" value="${question.choices[1]}" required>
      <label for="answer-2">${question.choices[1]}</label><br>
      <input type="radio" name="answer" id="answer-3" value="${question.choices[2]}" required>
      <label for="answer-3">${question.choices[2]}</label><br>
      <input type="radio" name="answer" id="answer-4" value="${question.choices[3]}" required>
      <label for="answer-4">${question.choices[3]}</label><br>
      <button type="button" class="submit-answer">Submit Answer</button>
    </form>
    `
  );

  // return value

}

function generateStatusbar() {
  // goto STORE to get data
  // display progress:
  // STORE.currentQuestion / QUESTION.length
  // and score

}

// RENDERING FUNCTIONS ///////////////////////////////////////

function renderQuestionText() {
  // generateQuestion() to get HTML

  // insert HTML into the DOM...

}

function renderStatusbar() {
  // gnerateStatusbar() to get HTML

  // insert HTML into the DOM...

}

// EVENT HANDLERS ////////////////////////////////////////////

// from FEEDBACK VIEW
function handleNextQuestion() {
  console.log('handleNextQuestion() running...');
  $('.feedback').on('click', '.next-question', function(event) {
    event.preventDefault();

    // IF !lastQuestion
    // render(): show Quiz view with Statusbar component,
    // renderQuestionText()
    // renderStatusbar()
    // ELSE IF lastQuestion
    // render(): show Final-Results
    // renderResults()

  });

}

// from INTRO VIEW  
// A near duplicate of handleNextQuestion() EXCEPT it requires binding jQuery event listener to different <section> element class name.
// ** REVISE ** perhaps combine into function above ^^^^^^, by binding event listener to a common class/element within both <section>s?
function handleStartQuiz() {
  console.log('handleStartQuiz() running...');
  $('.intro').on('click', '.next-question', function(event) {
    event.preventDefault();
    // render(): show Quiz view with Statusbar component,
    // renderQuestionText()
    // renderStatusbar()
  });
}


//////////////////////////////////////////////////////////////
// 2. QUESTION/QUIZ VIEW /////////////////////////////////////
//////////////////////////////////////////////////////////////

// TEMPLATE GENERATORS ///////////////////////////////////////

function generateFeedbackForAnswer(bool) {

}


// RENDERING FUNCTIONS ///////////////////////////////////////

function renderFeedbackText() {
  // if true new answer in STORE.userAnswer[STORE.userAnswer.length - 1] === QUESTIONS[STORE.currentQuestion].answer
  ///// generateFeedbackForTrueAnswer() to get HTML
  // else
  ///// generateFeedbackForFalse() to get HTML

  if (STORE.userAnswer[STORE.userAnswer.length - 1] === QUESTIONS[STORE.currentQuestion].answer) {
    console.log("correct");
    STORE.score += 1;
    const response = generateFeedbackForAnswer(true);
  } else {
    console.log("wrong");
    const response = generateFeedbackForAnswer(false);
  }

  // insert HTML into the DOM...

}


// EVENT HANDLERS ////////////////////////////////////////////

function addAnswerToStore(newAnswer) {
  // add/push newAnswer to userAnswer array within STORE object
  STORE.userAnswers.push(newAnswer); 
  console.log(`addAnswerToStore. STORE.userAnswers: ${STORE.userAnswers}`);
  console.log(`lastest userAnswer: ${STORE.userAnswers[userAnswers.length - 1]}`);
}

function handleAnswerSubmitted() {
  console.log('handleAnswerSubmitted() running...');
  $('.quiz').on('click', '.submit-answer', function(event) {
    event.preventDefault();
    // get value of submitted answer
    let selected = $('input:checked');
    let answer = selected.val();
    // add answer to STORE
    addAnswerToStore(answer);

    

    // render('feedback'); // show Feedback view with Statusbar component,
    // renderFeedbackText();

    // <TEMP> bypass feedback view ^^^^^^^^ 
    // just display sequence of quiz questions (sans feedback)
    render('quiz'); // show Quiz view with Statusbar component,
    renderQuestionText();
    // </TEMP>

    renderStatusbar();
    
  });

}


//////////////////////////////////////////////////////////////
// 2/3. STATUS/SCORE COMPONENT ///////////////////////////////
//////////////////////////////////////////////////////////////

// TEMPLATE GENERATORS ///////////////////////////////////////

// RENDERING FUNCTIONS ///////////////////////////////////////

// EVENT HANDLERS ////////////////////////////////////////////



//////////////////////////////////////////////////////////////
// 3. FEEDBACK VIEW //////////////////////////////////////////
//////////////////////////////////////////////////////////////

// TEMPLATE GENERATORS ///////////////////////////////////////

// RENDERING FUNCTIONS ///////////////////////////////////////

// EVENT HANDLERS ////////////////////////////////////////////




//////////////////////////////////////////////////////////////
// 4. FINAL-RESULTS VIEW /////////////////////////////////////
//////////////////////////////////////////////////////////////

// TEMPLATE GENERATORS ///////////////////////////////////////

// RENDERING FUNCTIONS ///////////////////////////////////////

// EVENT HANDLERS ////////////////////////////////////////////


//////////////////////////////////////////////////////////////
// VIEW AGNOSTIC /////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// TEMPLATE GENERATORS ///////////////////////////////////////

// RENDERING FUNCTIONS ///////////////////////////////////////

// Render function "draws" the app.
// Explicitly set components to visible or hidden 
// on *every* execution of render.
function render(showView = 'intro') {
  console.log('render() running...');
  STORE.view = showView;
  if (STORE.view === 'intro') {
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
  console.log(`render() STORE.view: ${STORE.view}`);
}

// EVENT HANDLERS ////////////////////////////////////////////






//////////////////////////////////////////////////////////////
// TEMPLATE GENERATORS ///////////////////////////////////////
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
// RENDERING FUNCTIONS ///////////////////////////////////////
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
// EVENT HANDLERS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// 
function handlePreloadImages() {
  // preload/cache images (but don't display them) ??
  // so that there is no lag in images appearing
  // when moving from question to question
}

// (via Start View)
// Handle Init Quiz Question View 
function handleStartQuiz() {
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
  $('.quiz').on('click', '.submit-answer', function(event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();

    if (answer === QUESTIONS[STORE.currentQuestion].answer) {
      console.log("correct");
      STORE.score += 10;
      renderFeedback(true);
    } else {
      console.log("wrong");
      renderFeedback(false);
    }
    
    console.log(selected);
    console.log(answer);

    // checkAnswer();
    // renderFeedback();
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
// Template generators ////////////////////////////////////
function generateAnswerList(answers) {
}

// Rendering functions /////////////////////////////////////
function renderQuestionText() {
  // render question view
}

// Event handlers //////////////////////////////////////////
function handleAnswerSubmitted() {
  $('.user-controls').on('click', '.submit-answer', () => {
    // Retrieve answer identifier of user-checked radio button
    // Perform check: User answer === Correct answer?
    // Update STORE and render appropriate section
  });
}

*/
