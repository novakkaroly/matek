export enum ExerciseType {
  PRES_REG = 'PRES_REG',           // Jelen idő, szabályos
  PRES_STEM_CHANGE = 'PRES_STEM_CHANGE', // Jelen idő, tőhangváltós
  PRES_MODAL = 'PRES_MODAL',       // Jelen idő, módbeli segédigék
  PAST_REG = 'PAST_REG',           // Múlt idő, szabályos (Perfekt)
  PAST_IRREG = 'PAST_IRREG',       // Múlt idő, rendhagyó (Perfekt)
  PAST_AUX = 'PAST_AUX'            // Múlt idő, haben/sein
}

export enum LanguageLevel {
  A1 = 'A1',
  A2 = 'A2'
}

export interface Problem {
  id: string;
  prefix: string;        // Text before input (e.g. "Ich")
  suffix: string;        // Text after input (e.g. "nach Hause.")
  hint: string;          // The verb in brackets or Hungarian translation (e.g. "machen" or "csinált")
  correctValue: string;  // The expected answer (e.g. "mache" or "hat gemacht")
  userAnswer: string;
}

export interface GameConfig {
  exerciseType: ExerciseType;
  level: LanguageLevel;
  durationSeconds: number;
}

export interface GameResult {
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  timeUsed: number;
}