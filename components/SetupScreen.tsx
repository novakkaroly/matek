import React, { useState } from 'react';
import { GradeLevel, OperationType } from '../types';
import { BookOpen, Calculator, ChevronRight } from 'lucide-react';

interface SetupScreenProps {
  onStart: (config: { operation: OperationType; level: GradeLevel; durationSeconds: number }) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [operation, setOperation] = useState<OperationType>(OperationType.ADD);
  const [level, setLevel] = useState<GradeLevel>(GradeLevel.GRADE_1);
  const [durationMinutes, setDurationMinutes] = useState<number>(5);

  const handleStart = () => {
    onStart({
      operation,
      level,
      durationSeconds: durationMinutes * 60
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-indigo-100">
      <div className="bg-indigo-600 p-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
           {/* Decorative pattern */}
           <div className="w-20 h-20 bg-white rounded-full absolute -top-10 -left-10"></div>
           <div className="w-32 h-32 bg-white rounded-full absolute top-10 right-10"></div>
        </div>
        <h1 className="text-3xl font-bold mb-2 font-comic relative z-10">Matek Kicsiknek</h1>
        <p className="text-indigo-100 relative z-10">Készülj fel az iskolára egy kis gyakorlással!</p>
      </div>

      <div className="p-8 space-y-8">
        
        <div className="space-y-4">
          <label className="block text-lg font-bold text-gray-700 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-500" />
            Milyen feladatokat szeretnél?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: OperationType.ADD, label: 'Összeadás (+)' },
              { id: OperationType.SUB, label: 'Kivonás (-)' },
              { id: OperationType.MUL, label: 'Szorzás (·)' },
              { id: OperationType.DIV, label: 'Osztás (:)' },
              { id: OperationType.SUBSTITUTION, label: 'Helyettesítés (2 + ? = 5)' },
              { id: OperationType.MIXED, label: 'Vegyes feladatok' },
            ].map((op) => (
              <button
                key={op.id}
                onClick={() => setOperation(op.id)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  operation === op.id
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-bold'
                    : 'border-gray-200 hover:border-indigo-300 text-gray-600'
                }`}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-bold text-gray-700 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            Milyen nehéz legyen?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setLevel(GradeLevel.GRADE_1)}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                level === GradeLevel.GRADE_1
                  ? 'border-green-500 bg-green-50 text-green-800 ring-2 ring-green-200 ring-offset-1'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <div className="text-xl font-bold mb-1">Első osztályos</div>
              <div className="text-sm opacity-75">20-as számkör</div>
            </button>
            <button
              onClick={() => setLevel(GradeLevel.GRADE_2)}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                level === GradeLevel.GRADE_2
                  ? 'border-orange-500 bg-orange-50 text-orange-800 ring-2 ring-orange-200 ring-offset-1'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <div className="text-xl font-bold mb-1">Második osztályos</div>
              <div className="text-sm opacity-75">100-as számkör</div>
            </button>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3 text-blue-800 text-sm">
           <span className="font-bold text-xl">💡</span>
           <p>Tipp: A feladatlap kitöltése közben a <b>TAB</b> billentyűvel gyorsan ugrálhatsz a következő mezőre!</p>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transform transition hover:-translate-y-1 flex items-center justify-center gap-2"
        >
          Kezdjük! <ChevronRight className="w-6 h-6" />
        </button>

      </div>
    </div>
  );
};

export default SetupScreen;