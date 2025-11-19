export enum OperationType {
  ADD = 'ADD',
  SUB = 'SUB',
  MUL = 'MUL',
  DIV = 'DIV',
  SUBSTITUTION = 'SUBSTITUTION',
  MIXED = 'MIXED'
}

export enum GradeLevel {
  GRADE_1 = 'GRADE_1', // 0-20
  GRADE_2 = 'GRADE_2'  // 0-100
}

export interface Problem {
  id: string;
  num1: number;
  num2: number;
  operator: string; // '+', '-', '·', ':'
  missingPosition: 'num1' | 'num2' | 'result'; // Where is the box?
  correctValue: number;
  userAnswer: string;
}

export interface GameConfig {
  operation: OperationType;
  level: GradeLevel;
  durationSeconds: number;
}

export interface GameResult {
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  timeUsed: number;
}