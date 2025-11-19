import { GradeLevel, OperationType, Problem } from '../types';

const generateRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a single problem based on constraints
const createProblem = (id: string, op: OperationType, level: GradeLevel): Problem => {
  let num1 = 0;
  let num2 = 0;
  let operator = '+';
  let result = 0;

  // Resolve mixed type to a specific operation
  let effectiveOp = op;
  if (op === OperationType.MIXED || op === OperationType.SUBSTITUTION) {
    const types = [OperationType.ADD, OperationType.SUB];
    // Add multiplication/division for Grade 2 or if requested
    if (level === GradeLevel.GRADE_2) {
      types.push(OperationType.MUL, OperationType.DIV);
    }
    effectiveOp = types[Math.floor(Math.random() * types.length)];
  }

  const maxNum = level === GradeLevel.GRADE_1 ? 20 : 100;

  switch (effectiveOp) {
    case OperationType.ADD:
      operator = '+';
      // Ensure sum <= maxNum
      num1 = generateRandomInt(1, maxNum - 1);
      num2 = generateRandomInt(1, maxNum - num1);
      result = num1 + num2;
      break;

    case OperationType.SUB:
      operator = '-';
      // Ensure result >= 0
      num1 = generateRandomInt(1, maxNum);
      num2 = generateRandomInt(1, num1); // num2 <= num1
      result = num1 - num2;
      break;

    case OperationType.MUL:
      operator = '·';
      if (level === GradeLevel.GRADE_1) {
        // Very simple multiplication for grade 1 (optional, but usually not taught 0-20 in depth)
        // Restrict to 1-5 times table to keep result <= 20
        num1 = generateRandomInt(1, 5);
        num2 = generateRandomInt(1, 4); 
      } else {
        // 10x10 table for Grade 2
        num1 = generateRandomInt(1, 10);
        num2 = generateRandomInt(1, 10);
      }
      result = num1 * num2;
      break;

    case OperationType.DIV:
      operator = ':';
      // Generate via multiplication to ensure integer result
      let m1 = 1;
      let m2 = 1;
      if (level === GradeLevel.GRADE_1) {
        m1 = generateRandomInt(1, 5);
        m2 = generateRandomInt(1, 4);
      } else {
        m2 = generateRandomInt(1, 10); // Divisor
        m1 = generateRandomInt(1, 10); // Quotient
      }
      num1 = m1 * m2; // Dividend
      num2 = m2;      // Divisor
      result = m1;    // Quotient
      break;
      
    default: // Fallback
      operator = '+';
      num1 = 1; 
      num2 = 1;
      result = 2;
      break;
  }

  // Determine missing position
  let missingPosition: 'num1' | 'num2' | 'result' = 'result';
  let correctValue = result;

  if (op === OperationType.SUBSTITUTION) {
    // Randomly hide one of the operands
    const r = Math.random();
    if (r < 0.5) {
      missingPosition = 'num1';
      correctValue = num1;
    } else {
      missingPosition = 'num2';
      correctValue = num2;
    }
  } else if (op === OperationType.MIXED) {
     // Occasional substitution in mixed mode? No, let's keep mixed just for operators usually.
     // But to make it fun, 10% chance of substitution in Mixed mode for Grade 2
     if (level === GradeLevel.GRADE_2 && Math.random() < 0.1) {
        const r = Math.random();
        if (r < 0.5) {
            missingPosition = 'num1';
            correctValue = num1;
        } else {
            missingPosition = 'num2';
            correctValue = num2;
        }
     }
  }

  return {
    id,
    num1,
    num2,
    operator,
    missingPosition,
    correctValue,
    userAnswer: ''
  };
};

export const generateWorksheet = (count: number, config: { operation: OperationType, level: GradeLevel }): Problem[] => {
  const problems: Problem[] = [];
  for (let i = 0; i < count; i++) {
    problems.push(createProblem(`p-${i}`, config.operation, config.level));
  }
  return problems;
};