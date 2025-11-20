import { LanguageLevel, ExerciseType, Problem } from '../types';

// Helper to pick random item
const rnd = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

type Person = 'ich' | 'du' | 'er' | 'sie' | 'es' | 'wir' | 'ihr' | 'sie (Pl.)' | 'Sie';

interface VerbData {
  inf: string;
  hun: string;
  pres: Record<string, string>; // Conjugation mapping
  pastParticiple?: string;
  aux?: 'haben' | 'sein';
  level: LanguageLevel;
}

// Small database of verbs
const verbs: Record<string, VerbData> = {
  // Regular A1
  'machen': {
    inf: 'machen', hun: 'csinál', level: LanguageLevel.A1, aux: 'haben', pastParticiple: 'gemacht',
    pres: { 'ich': 'mache', 'du': 'machst', 'er': 'macht', 'sie': 'macht', 'es': 'macht', 'wir': 'machen', 'ihr': 'macht', 'sie (Pl.)': 'machen', 'Sie': 'machen' }
  },
  'lernen': {
    inf: 'lernen', hun: 'tanul', level: LanguageLevel.A1, aux: 'haben', pastParticiple: 'gelernt',
    pres: { 'ich': 'lerne', 'du': 'lernst', 'er': 'lernt', 'sie': 'lernt', 'es': 'lernt', 'wir': 'lernen', 'ihr': 'lernt', 'sie (Pl.)': 'lernen', 'Sie': 'lernen' }
  },
  'spielen': {
    inf: 'spielen', hun: 'játszik', level: LanguageLevel.A1, aux: 'haben', pastParticiple: 'gespielt',
    pres: { 'ich': 'spiele', 'du': 'spielst', 'er': 'spielt', 'sie': 'spielt', 'es': 'spielt', 'wir': 'spielen', 'ihr': 'spielt', 'sie (Pl.)': 'spielen', 'Sie': 'spielen' }
  },
  'wohnen': {
    inf: 'wohnen', hun: 'lakik', level: LanguageLevel.A1, aux: 'haben', pastParticiple: 'gewohnt',
    pres: { 'ich': 'wohne', 'du': 'wohnst', 'er': 'wohnt', 'sie': 'wohnt', 'es': 'wohnt', 'wir': 'wohnen', 'ihr': 'wohnt', 'sie (Pl.)': 'wohnen', 'Sie': 'wohnen' }
  },
  'kaufen': {
    inf: 'kaufen', hun: 'vesz', level: LanguageLevel.A1, aux: 'haben', pastParticiple: 'gekauft',
    pres: { 'ich': 'kaufe', 'du': 'kaufst', 'er': 'kauft', 'sie': 'kauft', 'es': 'kauft', 'wir': 'kaufen', 'ihr': 'kauft', 'sie (Pl.)': 'kaufen', 'Sie': 'kaufen' }
  },
  
  // Stem Changing / Irregular A1/A2
  'fahren': {
    inf: 'fahren', hun: 'utazik', level: LanguageLevel.A1, aux: 'sein', pastParticiple: 'gefahren',
    pres: { 'ich': 'fahre', 'du': 'fährst', 'er': 'fährt', 'sie': 'fährt', 'es': 'fährt', 'wir': 'fahren', 'ihr': 'fahrt', 'sie (Pl.)': 'fahren', 'Sie': 'fahren' }
  },
  'schlafen': {
    inf: 'schlafen', hun: 'alszik', level: LanguageLevel.A1, aux: 'haben', pastParticiple: 'geschlafen',
    pres: { 'ich': 'schlafe', 'du': 'schläfst', 'er': 'schläft', 'sie': 'schläft', 'es': 'schläft', 'wir': 'schlafen', 'ihr': 'schlaft', 'sie (Pl.)': 'schlafen', 'Sie': 'schlafen' }
  },
  'lesen': {
    inf: 'lesen', hun: 'olvas', level: LanguageLevel.A1, aux: 'haben', pastParticiple: 'gelesen',
    pres: { 'ich': 'lese', 'du': 'liest', 'er': 'liest', 'sie': 'liest', 'es': 'liest', 'wir': 'lesen', 'ihr': 'lest', 'sie (Pl.)': 'lesen', 'Sie': 'lesen' }
  },
  'sehen': {
    inf: 'sehen', hun: 'lát', level: LanguageLevel.A1, aux: 'haben', pastParticiple: 'gesehen',
    pres: { 'ich': 'sehe', 'du': 'siehst', 'er': 'sieht', 'sie': 'sieht', 'es': 'sieht', 'wir': 'sehen', 'ihr': 'seht', 'sie (Pl.)': 'sehen', 'Sie': 'sehen' }
  },
  'sprechen': {
    inf: 'sprechen', hun: 'beszél', level: LanguageLevel.A2, aux: 'haben', pastParticiple: 'gesprochen',
    pres: { 'ich': 'spreche', 'du': 'sprichst', 'er': 'spricht', 'sie': 'spricht', 'es': 'spricht', 'wir': 'sprechen', 'ihr': 'sprecht', 'sie (Pl.)': 'sprechen', 'Sie': 'sprechen' }
  },
  'essen': {
    inf: 'essen', hun: 'eszik', level: LanguageLevel.A1, aux: 'haben', pastParticiple: 'gegessen',
    pres: { 'ich': 'esse', 'du': 'isst', 'er': 'isst', 'sie': 'isst', 'es': 'isst', 'wir': 'essen', 'ihr': 'esst', 'sie (Pl.)': 'essen', 'Sie': 'essen' }
  },
  'gehen': {
    inf: 'gehen', hun: 'megy', level: LanguageLevel.A1, aux: 'sein', pastParticiple: 'gegangen',
    pres: { 'ich': 'gehe', 'du': 'gehst', 'er': 'geht', 'sie': 'geht', 'es': 'geht', 'wir': 'gehen', 'ihr': 'geht', 'sie (Pl.)': 'gehen', 'Sie': 'gehen' }
  },
  'kommen': {
    inf: 'kommen', hun: 'jön', level: LanguageLevel.A1, aux: 'sein', pastParticiple: 'gekommen',
    pres: { 'ich': 'komme', 'du': 'kommst', 'er': 'kommt', 'sie': 'kommt', 'es': 'kommt', 'wir': 'kommen', 'ihr': 'kommt', 'sie (Pl.)': 'kommen', 'Sie': 'kommen' }
  },

  // Modals
  'können': {
    inf: 'können', hun: 'tud (képes)', level: LanguageLevel.A1, aux: 'haben',
    pres: { 'ich': 'kann', 'du': 'kannst', 'er': 'kann', 'sie': 'kann', 'es': 'kann', 'wir': 'können', 'ihr': 'könnt', 'sie (Pl.)': 'können', 'Sie': 'können' }
  },
  'müssen': {
    inf: 'müssen', hun: 'kell (muszáj)', level: LanguageLevel.A1, aux: 'haben',
    pres: { 'ich': 'muss', 'du': 'musst', 'er': 'muss', 'sie': 'muss', 'es': 'muss', 'wir': 'müssen', 'ihr': 'müsst', 'sie (Pl.)': 'müssen', 'Sie': 'müssen' }
  },
  'wollen': {
    inf: 'wollen', hun: 'akar', level: LanguageLevel.A2, aux: 'haben',
    pres: { 'ich': 'will', 'du': 'willst', 'er': 'will', 'sie': 'will', 'es': 'will', 'wir': 'wollen', 'ihr': 'wollt', 'sie (Pl.)': 'wollen', 'Sie': 'wollen' }
  },
  'dürfen': {
    inf: 'dürfen', hun: 'szabad', level: LanguageLevel.A2, aux: 'haben',
    pres: { 'ich': 'darf', 'du': 'darfst', 'er': 'darf', 'sie': 'darf', 'es': 'darf', 'wir': 'dürfen', 'ihr': 'dürft', 'sie (Pl.)': 'dürfen', 'Sie': 'dürfen' }
  }
};

const pronouns: Person[] = ['ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'sie (Pl.)', 'Sie'];

const getVerbList = (type: ExerciseType, level: LanguageLevel): string[] => {
  const allKeys = Object.keys(verbs);
  
  if (type === ExerciseType.PRES_REG) {
    return ['machen', 'lernen', 'spielen', 'wohnen', 'kaufen'];
  }
  if (type === ExerciseType.PRES_STEM_CHANGE) {
    return ['fahren', 'schlafen', 'lesen', 'sehen', 'sprechen', 'essen'];
  }
  if (type === ExerciseType.PRES_MODAL) {
    return ['können', 'müssen', 'wollen', 'dürfen'];
  }
  if (type === ExerciseType.PAST_REG) {
    return ['machen', 'lernen', 'spielen', 'wohnen', 'kaufen'];
  }
  if (type === ExerciseType.PAST_IRREG) {
    return ['fahren', 'schlafen', 'lesen', 'sehen', 'sprechen', 'essen', 'gehen', 'kommen'];
  }
  if (type === ExerciseType.PAST_AUX) {
    // Mix of both for Haben/Sein
    const list = ['machen', 'lernen', 'spielen', 'fahren', 'gehen', 'kommen', 'schlafen'];
    if (level === LanguageLevel.A2) list.push('lesen', 'sehen', 'sprechen');
    return list;
  }
  
  return ['machen'];
};

const createProblem = (id: string, type: ExerciseType, level: LanguageLevel): Problem => {
  const verbKeys = getVerbList(type, level);
  const verbKey = rnd(verbKeys);
  const verb = verbs[verbKey];
  const person = rnd(pronouns);

  let prefix = '';
  let suffix = '';
  let hint = '';
  let correctValue = '';

  // A1/A2 content tweaks could happen here (simpler sentences for A1)

  switch (type) {
    case ExerciseType.PRES_REG:
    case ExerciseType.PRES_STEM_CHANGE:
    case ExerciseType.PRES_MODAL:
      prefix = person;
      hint = `(${verb.inf})`; // e.g. (machen)
      correctValue = verb.pres[person];
      suffix = '...'; 
      // Add simple context words sometimes?
      if (Math.random() > 0.5) suffix = '... gern.';
      if (Math.random() > 0.8) suffix = '... heute.';
      break;

    case ExerciseType.PAST_REG:
    case ExerciseType.PAST_IRREG:
      // "Múlt idő, magyarul és németül"
      // Prompt: "Er ... (csinált)" -> Input: "hat gemacht"
      // Or split? Let's do full Perfekt form to keep it challenging but simple input
      prefix = person;
      
      // Get simple past mapping logic
      const aux = verb.aux === 'haben' ? (['wir','ihr','sie (Pl.)','Sie'].includes(person) ? 'haben' : (['du'].includes(person) ? 'hast' : (['ich'].includes(person) ? 'habe' : 'hat'))) : (['wir','ihr','sie (Pl.)','Sie'].includes(person) ? 'sind' : (['du'].includes(person) ? 'bist' : (['ich'].includes(person) ? 'bin' : 'ist')));
      
      correctValue = `${aux} ${verb.pastParticiple}`;
      hint = `(${verb.hun}${['ich','wir'].includes(person) ? 'tam/tunk' : 't'})`; // Rough Hungarian hint
      
      // Simplified Hint: just the infinitive and 'Múlt idő' or just the Hungarian meaning
      hint = `(${verb.hun} - múlt idő)`;
      suffix = '.';
      break;

    case ExerciseType.PAST_AUX:
      // Haben oder Sein
      // Ich [bin] nach Hause gegangen.
      prefix = person;
      suffix = `... ${verb.pastParticiple}.`;
      const correctAux = verb.aux === 'haben' ? (['wir','ihr','sie (Pl.)','Sie'].includes(person) ? 'haben' : (['du'].includes(person) ? 'hast' : (['ich'].includes(person) ? 'habe' : 'hat'))) : (['wir','ihr','sie (Pl.)','Sie'].includes(person) ? 'sind' : (['du'].includes(person) ? 'bist' : (['ich'].includes(person) ? 'bin' : 'ist')));
      correctValue = correctAux;
      hint = `(haben / sein)`;
      break;
  }

  // Clean up person/prefix text
  prefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
  if (prefix.includes('(Pl.)')) prefix = 'sie'; // Display simply as sie, context usually implies plural or generic

  return {
    id,
    prefix,
    suffix,
    hint,
    correctValue,
    userAnswer: ''
  };
};

export const generateWorksheet = (count: number, config: { exerciseType: ExerciseType, level: LanguageLevel }): Problem[] => {
  const problems: Problem[] = [];
  for (let i = 0; i < count; i++) {
    problems.push(createProblem(`p-${i}`, config.exerciseType, config.level));
  }
  return problems;
};