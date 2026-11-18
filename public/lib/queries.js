// The 20 assignment queries. `ask` is the question exactly as assigned; `search` are extra
// phrasings used only for retrieval (they never reach the LLM as facts). Gender-neutral so the
// app works for any person.
export const QUERIES = [
  { n: 1, ask: 'Where and when was {person} born?', topic: 'Birth',
    search: ['{person} was born in the town of, in the year', 'the birth of {person}, born on the day'] },
  { n: 2, ask: "Where were {person}'s parents from, and what did they do?", topic: 'Parents',
    search: ["{person}'s father and mother, where they came from", "{person}'s father's trade and occupation; the family emigrated from"] },
  { n: 3, ask: "What was {person}'s childhood like?", topic: 'Childhood',
    search: ['{person} as a young child, growing up, boyhood or girlhood', 'childhood games, early years and character of young {person}'] },
  { n: 4, ask: "Who were {person}'s siblings?", topic: 'Siblings',
    search: ["{person}'s brothers and sisters", 'the youngest son, the eldest brother, a sister of {person}'] },
  { n: 5, ask: "What schooling or training did {person} have?", topic: 'Schooling',
    search: ['{person} was sent to school, education and learning to read and write', '{person} was apprenticed and trained, studied books, teachers and college'] },
  { n: 6, ask: "What was {person}'s first job?", topic: 'First job',
    search: ['{person} first began to work, first employment and wages', '{person} was put to work in a trade, the first job'] },
  { n: 7, ask: "An adventurous story from {person}'s life.", topic: 'Adventure',
    search: ['{person} set out on an adventurous journey alone', '{person} ran away, a voyage by boat, travelled on foot, an exciting adventure'] },
  { n: 8, ask: 'A scary or dangerous moment {person} faced.', topic: 'Danger',
    search: ['{person} was in great danger and narrowly escaped', 'a frightening storm, shipwreck, nearly drowned or killed, peril'] },
  { n: 9, ask: 'A funny anecdote about {person}.', topic: 'Funny anecdote',
    search: ['a funny, humorous anecdote about {person}', '{person} made people laugh with a joke, a witty remark, an amusing story'] },
  { n: 10, ask: 'A time {person} failed or made a serious mistake.', topic: 'Failure or mistake',
    search: ['{person} made a serious mistake, an error he or she regretted', '{person} failed, a blunder, an erratum, a wrong decision and its consequences'] },
  { n: 11, ask: 'The hardest thing {person} went through.', topic: 'Hardest time',
    search: ['the hardest trial of {person} life, grief and suffering', 'the death of a loved one, illness, sorrow, affliction that {person} endured'] },
  { n: 12, ask: 'Who did {person} marry, and what was that relationship like?', topic: 'Marriage',
    search: ['{person} married, the wife or husband of {person}', 'courtship, wedding, married life and the relationship between husband and wife'] },
  { n: 13, ask: "What about {person}'s children?", topic: 'Children',
    search: ["{person}'s children, son and daughter", 'the son of {person}, the daughter of {person}, a child born or died'] },
  { n: 14, ask: "Who were {person}'s closest friends or mentors?", topic: 'Friends and mentors',
    search: ["{person}'s closest friend and companions", 'a mentor or patron who advised, encouraged and helped {person}'] },
  { n: 15, ask: "Who were {person}'s rivals or enemies?", topic: 'Rivals and enemies',
    search: ["{person}'s enemies and rivals who attacked and opposed", 'a bitter quarrel, dispute or hostility with an opponent of {person}'] },
  { n: 16, ask: 'What is {person} best known for?', topic: 'Best known for',
    search: ['{person} is best known and famous for', 'the greatest achievement, fame and reputation of {person}'] },
  { n: 17, ask: 'Something {person} made, invented or discovered.', topic: 'Invention or discovery',
    search: ['{person} invented, an invention', '{person} discovered by experiment, a discovery, contrived or devised a new'] },
  { n: 18, ask: 'Where did {person} travel or live?', topic: 'Travels and homes',
    search: ['places where {person} lived and resided, moved to the city', '{person} travelled abroad, a voyage to another country, returned home'] },
  { n: 19, ask: 'A habit, hobby or quirk of {person}.', topic: 'Habit, hobby or quirk',
    search: ['a habit, daily routine or custom of {person}', 'a hobby, pastime, peculiar quirk; {person} was fond of'] },
  { n: 20, ask: 'How did {person} die, and how is {person} remembered?', topic: 'Death and legacy',
    search: ['the last illness and death of {person}, died', 'the funeral of {person}, how {person} is remembered, epitaph and legacy'] },
];

// Canary questions: true facts that are NOT in the test corpus. Defaults are for Ben Franklin.
// For a different person, type your own in the app.
export const DEFAULT_CANARIES = {
  'benjamin franklin': [
    'Did {person} invent bifocal spectacles?',
    "Which U.S. banknote carries {person}'s portrait today?",
    "Did {person} serve on the 1784 French royal commission that investigated Franz Mesmer's animal magnetism?",
  ],
};

export function fill(s, person) { return s.replaceAll('{person}', person); }
