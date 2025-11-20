import React, { useState } from 'react';
import { LanguageLevel, ExerciseType } from '../types';
import { BookOpen, PenTool, ChevronRight } from 'lucide-react';

interface SetupScreenProps {
  onStart: (config: { exerciseType: ExerciseType; level: LanguageLevel; durationSeconds: number }) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [exerciseType, setExerciseType] = useState<ExerciseType>(ExerciseType.PRES_REG);
  const [level, setLevel] = useState<LanguageLevel>(LanguageLevel.A1);
  // Default 5 mins
  const durationMinutes = 5;

  const handleStart = () => {
    onStart({
      exerciseType,
      level,
      durationSeconds: durationMinutes * 60
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-yellow-400">
      <div className="bg-yellow-400 p-6 text-slate-900 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
           <div className="w-20 h-20 bg-white rounded-full absolute -top-10 -left-10"></div>
           <div className="w-32 h-32 bg-white rounded-full absolute top-10 right-10"></div>
        </div>
        <h1 className="text-3xl font-bold mb-2 font-comic relative z-10">Német Gyakorló</h1>
        <p className="text-slate-800 font-semibold relative z-10">Gyakorold a német igeragozást játékosan!</p>
      </div>

      <div className="p-8 space-y-8">
        
        <div className="space-y-4">
          <label className="block text-lg font-bold text-gray-700 flex items-center gap-2">
            <PenTool className="w-5 h-5 text-yellow-600" />
            Milyen feladatokat szeretnél?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: ExerciseType.PRES_REG, label: '1. Igeragozás (jelen, szabályos)' },
              { id: ExerciseType.PRES_STEM_CHANGE, label: '2. Igeragozás (jelen, tőhangváltós)' },
              { id: ExerciseType.PRES_MODAL, label: '3. Igeragozás (jelen, módbeli s.)' },
              { id: ExerciseType.PAST_REG, label: '4. Igeragozás (múlt, szabályos)' },
              { id: ExerciseType.PAST_IRREG, label: '5. Igeragozás (múlt, rendhagyó)' },
              { id: ExerciseType.PAST_AUX, label: '6. Igeragozás (múlt, haben/sein)' },
            ].map((op) => (
              <button
                key={op.id}
                onClick={() => setExerciseType(op.id)}
                className={`p-3 rounded-lg border-2 text-left transition-all text-sm font-semibold ${
                  exerciseType === op.id
                    ? 'border-yellow-500 bg-yellow-50 text-yellow-900 font-bold ring-1 ring-yellow-300'
                    : 'border-gray-200 hover:border-yellow-300 text-gray-600'
                }`}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-bold text-gray-700 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-yellow-600" />
            Milyen nehéz legyen?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setLevel(LanguageLevel.A1)}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                level === LanguageLevel.A1
                  ? 'border-green-500 bg-green-50 text-green-900 ring-2 ring-green-200 ring-offset-1'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <div className="text-xl font-bold mb-1">A1 szint</div>
              <div className="text-sm opacity-75">Kezdő</div>
            </button>
            <button
              onClick={() => setLevel(LanguageLevel.A2)}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                level === LanguageLevel.A2
                  ? 'border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-200 ring-offset-1'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <div className="text-xl font-bold mb-1">A2 szint</div>
              <div className="text-sm opacity-75">Haladóbb</div>
            </button>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3 text-blue-800 text-sm border border-blue-100">
           <span className="font-bold text-xl">💡</span>
           <p>Tipp: A feladatlap kitöltése közben a <b>TAB</b> billentyűvel gyorsan ugrálhatsz a következő mezőre! A német karaktereket (ä, ö, ü, ß) is használd!</p>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 text-xl font-bold py-4 rounded-xl shadow-lg transform transition hover:-translate-y-1 flex items-center justify-center gap-2"
        >
          Kezdjük! <ChevronRight className="w-6 h-6" />
        </button>

      </div>
    </div>
  );
};

export default SetupScreen;