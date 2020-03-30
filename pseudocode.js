/* eslint-disable indent */

///////////////////////////////////////////////////////////////
// USER STORIES ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// QUESTION VIEW ////////////////////////////////////////////// 
// As a user, I should...

    // See an image of the movie in question
        // [[ COULD: Provide a link to specific image source at https://iwdrm.tumblr.com ?]]

    // See the title of the movie

    // Read the question

    // Select from multiple choices (via radio button)

    // Submit my answer via a submit button, to proceed to a FEEDBACK VIEW...

    // Must always be able to gauge my progress (ubiquitous gauge):
        // What current question number am I on? (and how many questions are left?)
        // ^^^^^^ [[ COULD: visual gauge of progress ]]
        // What's my current score? (I think I'll do points)


// FEEDBACK VIEW ////////////////////////////////////////////// 
// As a user, I should...

    // Receive feedback if my answer to the question was correct or incorrect.

    // See a header ("Correct" else "Incorrect", or some variant)

    // If Correct...
        // See that my score has increased

    // If Incorrect...
        // Be told the correct answer

    // Proceed to the next question via a button.
        // If last question, then proceed to FINAL RESULT VIEW...


    // [[ COULD ]]:
        // Have informal feedback text/banter change for each particular question? (and different variants depending if correct or incorrect)?
        // Display a particular feedback image if correct and incorrect?


// RESULT VIEW ////////////////////////////////////////////// 
// As a user, I should...


// START VIEW ////////////////////////////////////////////// 
// As a user, I should...




///////////////////////////////////////////////////////////////
// REQUIREMENTS (not necessarily USER STORIES) ////////////////
///////////////////////////////////////////////////////////////

// UX REQUIREMENTS ////////////////////////////////////////////

    // The starting screen should have a button that users can click to start the quiz.

    // Users should be prompted through a series of at least 5 multiple choice questions that they can answer.

    // Users should be asked questions 1 after the other.

    // Users should only be prompted with 1 question at a time.

    // Users should not be able to skip questions.

    // Users should also be able to see:
        // which question they're on (for instance, "7 out of 10") and 
        // their current score ("5 correct, 2 incorrect").
        // ** IDEA ** visual gauge for how far they are in the question process?

    // Upon submitting an answer, users should:
        // receive textual feedback about their answer. If they were incorrect, they should be told the correct answer.
        // be moved onto the next question (or interact with an element to move on).

    // Users should be shown their overall score at the end of the quiz. In other words, how many questions they got right out of the total questions asked.

    // Users should be able to start a new quiz.


// TECH REQUIREMENTS ////////////////////////////////////////////

    // Render answer choices in a <form>

    // Use semantic HTML, along with CSS and jQuery.

    // Follow a11y best practices. Refer back to the checkpoints on accessibility and forms for help.

    // Be fully usable by keyboard (which will be easy enough if you start with a form).

    // Use responsive design.