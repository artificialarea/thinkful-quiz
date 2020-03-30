'use strict';

// In-memory database of questions
const QUESTIONS = [
  // 1
  {
    question: 'In the film \'Fight Club\', The Narrator (Edward Norton) befriends Robert \'Bob\' Paulsen (Meatloaf) in which support group?',
    choices: [
      'A support group for men with testicular cancer.',
      'A support group for insomniacs.',
      'A support group for recovering alcoholics.',
      'A support group for the bereaved.',
    ],
    answer: 'A support group for men with testicular cancer.',
    image: 'IWDRM_fightClub.webp',
  },
  // 2
  {
    question: 'In the film \'The Conversation\', what is Harry Caul’s (Gene Hackman) occupation?',
    choices: [
      'He’s a surveillance expert.',
      'He’s a jazz musician.      ',
      'He’s a trial laywer.',
      'He’s a teacher.',
    ],
    answer: 'He’s a surveillance expert.',
    image: 'IWDRM_theConversation.gif',
  },
  // 3
  {
    question: 'In the film \'The Life Aquatic with Steve Zissou\', what is the name of Steve Zissou’s (Bill Murray) aging research vessel?',
    choices: [
      'Belefonte',
      'Cousteau',
      'Wes Coast',
      'Pequod',
    ],
    answer: 'Belefonte',
    image: 'IWDRM_theLifeAquatic.webp',
  },
  // 4
  {
    question: 'In the film ‘2001: A Space Odyssey’, what are the final words that Dr. Dave Bowman (Keir Dullea) says?',
    choices: [
      '“Oh my god, it’s full of stars…”',
      '“HAL! Can you hear me HAL!?!”',
      '“Also sprach Zarathustra.”',
      '“This monolith looks friendly.”',
    ],
    answer: '“Oh my god, it’s full of stars…”',
    image: 'IWDRM_2001.webp',
  },
  // 5
  {
    question: 'In the film “Clockwork Orange”, the experimental psychological conditioning technique employed on young droogie Alex (Malcolm McDowell) is referred to as what?',
    choices: [
      'The Ludovico Technique',
      'Cognitive Behavioural Therapy',
      'The Pavlovian Theory',
      'The Ellsberg Paradox',
    ],
    answer: 'The Ludovico Technique',
    image: 'IWDRM_clockworkOrange.webp',
  },
  // 6
  {
    question: 'In the film “Old Country for Old Men”, what is the method Anton Chigurh (Javier Bardem) uses for deciding whether or not to kill someone?',
    choices: [
      'He flips a coin.',
      'He looks deeply into their eyes.',
      'He smells them.',
      'He has a drink of milk first, to contemplate.',
    ],
    answer: 'He flips a coin.',
    image: 'IWDRM_NoCountryForOldMen.webp',
  },
  /* template
  {
    image: ''
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
  view: 'quiz', // ? e.g. 'start', 'quiz', 'feedback', 'final-results'
  // Score? Anything else?
  score: 0,
};