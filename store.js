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
    image: 'img/IWDRM_fightClub.webp',
    // image: 'https://66.media.tumblr.com/38ad849338d5e1eeecfd1880b0497514/tumblr_mh6d6nDLrR1qe0eclo1_r6_500.gifv',
    imageAlt: 'A scene from the film, Fight Club.',
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
    image: 'img/IWDRM_theConversation.gif',
    // image: 'https://66.media.tumblr.com/tumblr_m0gypc6X3x1qe0eclo1_r4_500.gifv',
    imageAlt: 'A scene from the film, The Conversation.',
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
    image: 'img/IWDRM_theLifeAquatic.webp',
    // image: 'https://66.media.tumblr.com/tumblr_lsovzeh9bf1qe0eclo1_r5_500.gifv',
    imageAlt: 'A scene from the film, The Life Aquatic with Steve Zissou.',
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
    image: 'img/IWDRM_2001.webp',
    // image: 'https://66.media.tumblr.com/tumblr_loa8s68rcy1qe0eclo1_r1_500.gifv',
    imageAlt: 'A scene from the film, 2001: A Space Odyssey.',
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
    image: 'img/IWDRM_clockworkOrange.webp',
    // image: 'https://66.media.tumblr.com/tumblr_li5uszybM11qe0eclo1_r3_500.gifv',
    imageAlt: 'A scene from the film, Clockwork Orange.',
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
    image: 'img/IWDRM_NoCountryForOldMen.webp',
    // image: 'https://66.media.tumblr.com/f407ad0f00dee9ea1eaf24f26fe2a335/tumblr_nrsfo8Ubbw1qe0eclo1_r7_500.gifv',
    imageAlt: 'A scene from the film, No Country for Old Men.',
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
    imageAlt: '',
  }, */
];

// Create your initial store
const STORE = {
  // Current view
  view: 'start', // ? e.g. 'start', 'quiz', 'feedback', 'final-results'
  // Current question
  currentQuestion: 0,
  // User's answer choice(s)
  userAnswer: [],
  // Score? Anything else?
  score: 0,
};