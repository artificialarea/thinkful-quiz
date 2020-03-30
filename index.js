'use strict';

// SEE store.js FOR DATABASE //


// $(document).ready
$(function() {
  renderView();
  handleQuestionView();
  handleAnswerSubmitted();
});



// GUIDANCE ////////////////////////////////////////////////
// from https://thinkful.slides.com/thinkful/quiz-app#/8  //
//                                                        //
// VIEW AND RENDERING //////////////////////////////////////

function renderView() {
  // Render function "draws" the app.
  // Explicitly set components to visible or hidden 
  // on every execution of render.
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
  console.log(`STORE.view: ${STORE.view}`);
}


// GUIDANCE ////////////////////////////////////////////////
// from https://thinkful.slides.com/thinkful/quiz-app#/9  //
//                                                        //
// EXAMPLE APP STRUCTURE ///////////////////////////////////

// Template generators
function generateAnswerList(answers) {

}

// Rendering functions
function renderQuestionText() {

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





