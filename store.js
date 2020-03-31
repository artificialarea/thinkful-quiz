'use strict';

// In-memory database of questions
const QUESTIONS = [
  // 1
  {
    title: 'Fight Club',
    question: 'Which support group does The Narrator (Edward Norton) befriend Robert \'Bob\' Paulsen (Meatloaf)?',
    choices: [
      'A support group for recovering alcoholics.',
      'A support group for men with testicular cancer.',
      'A support group for insomniacs.',
      'A support group for the bereaved.',
    ],
    answer: 'A support group for men with testicular cancer.',
    image: '_img/IWDRM_fightClub.webp',
    imageAlt: 'man hugging another man',
  },
  // 2
  {
    title: 'The Conversation',
    question: 'What is Harry Caul’s (Gene Hackman) occupation?',
    choices: [
      'He’s a surveillance expert.',
      'He’s a jazz musician.      ',
      'He’s a trial laywer.',
      'He’s a teacher.',
    ],
    answer: 'He’s a surveillance expert.',
    image: '_img/IWDRM_theConversation.gif',
  },
  // 3
  {
    title: 'The Life Aquatic with Steve Zissou',
    question: 'What is the name of Steve Zissou’s (Bill Murray) aging research vessel?',
    choices: [
      'Belefonte',
      'Cousteau',
      'Wes Coast',
      'Pequod',
    ],
    answer: 'Belefonte',
    image: '_img/IWDRM_theLifeAquatic.webp',
  },
  // 4
  {
    title: '2001: A Space Odyssey',
    question: 'What are the final words that Dr. Dave Bowman (Keir Dullea) says?',
    choices: [
      '“Oh my god, it’s full of stars…”',
      '“HAL! Can you hear me HAL!?!”',
      '“Also sprach Zarathustra.”',
      '“This monolith looks friendly.”',
    ],
    answer: '“Oh my god, it’s full of stars…”',
    image: '_img/IWDRM_2001.webp',
  },
  // 5
  {
    title: 'Clockwork Orange',
    question: 'The experimental psychological conditioning technique employed on young droogie Alex (Malcolm McDowell) is referred to as what?',
    choices: [
      'The Ludovico Technique',
      'Cognitive Behavioural Therapy',
      'The Pavlovian Theory',
      'The Ellsberg Paradox',
    ],
    answer: 'The Ludovico Technique',
    image: '_img/IWDRM_clockworkOrange.webp',
  },
  // 6
  {
    title: 'No Country for Old Men',
    question: 'What is the method Anton Chigurh (Javier Bardem) uses for deciding whether or not to kill someone?',
    choices: [
      'He flips a coin.',
      'He looks deeply into their eyes.',
      'He smells them.',
      'He has a drink of milk first, to contemplate.',
    ],
    answer: 'He flips a coin.',
    image: '_img/IWDRM_NoCountryForOldMen.webp',
  },
  /* template
  {
    title: ''
    question: '',
    choices: [
      '',
      '',
      '',
      '',
    ],
    answer: '',
    image: '',
  }, */
];

// Create your initial store
const STORE = {
  // Current question
  currentQuestion: 0,
  // User's answer choice(s)
  userAnswer: 0,
  // Current view
  view: 'start', // ? e.g. 'start', 'quiz', 'feedback', 'final-results'
  // Score? Anything else?
  score: 0,
};