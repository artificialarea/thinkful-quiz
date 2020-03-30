'use strict';

// SEE store.js FOR DATABASE //





// GUIDANCE //////////////////////////////////////////////
// from https://thinkful.slides.com/thinkful/quiz-app#/9

// 1 VIEWS AND RENDERING /////////////////////////////////

function render() {
  if (store.view === 'start') {
    $('.intro').show();
    $('.quiz').hide();
    $('.status').hide();
  } else if (store.view === 'quiz') {
    $('.intro').hide();
    $('.quiz').show();
    $('.status').show();
  }
}


// 2 EXAMPLE APP STRUCTURE ///////////////////////////////

// Template generators
function generateAnswerList(answers) {}

// Rendering functions
function renderQuestionText() {}

// Event handlers
function handleAnswerSubmitted() {
  $('.user-controls').on('click', '.submit-answer', () => {
    // Retrieve answer identifier of user-checked radio button
    // Perform check: User answer === Correct answer?
    // Update STORE and render appropriate section
  });
}



















// After DOM has loaded, initialize
$(function() {
    handleAnswerSubmitted();
});