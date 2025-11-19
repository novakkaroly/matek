import React, { useMemo } from 'react';
import { Problem, GameResult } from '../types';
import { RefreshCw, Star, AlertCircle, Check } from 'lucide-react';

interface ResultsScreenProps {
  problems: Problem[];
  timeUsed: number;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ problems, timeUsed, onRestart }) => {
  
  const results = useMemo<GameResult>(() => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    problems.forEach(p => {
      if (p.userAnswer.trim() === '') {
        unanswered++;
      } else {
        const val = parseInt(p.userAnswer, 10);
        if (!isNaN(val) && val === p.correctValue) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    return {
      total: problems.length,
      correct,
      incorrect,
      unanswered,
      timeUsed
    };
  }, [problems, timeUsed]);

  const percentage = Math.round((results.correct / results.total) * 100);
  
  let message = "Jó gyakorlást!";
  let colorClass = "text-blue-600";
  if (percentage === 100) { message = "Zseniális! Hibátlan!"; colorClass = "text-green-600"; }
  else if (percentage >= 80) { message = "Nagyon ügyes vagy!"; colorClass = "text-green-500"; }
  else if (percentage >= 50) { message = "Jó munka, de gyakorolj még!"; colorClass = "text-orange-500"; }
  else { message = "Ne add fel, menni fog ez jobban is!"; colorClass = "text-red-500"; }

  // Format time
  const m = Math.floor(timeUsed / 60);
  const s = timeUsed % 60;
  const timeStr = `${m}:${s.toString().padStart(2, '0')}`;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden pb-8">
        <div className="bg-slate-800 p-6 text-white text-center">
            <h2 className="text-3xl font-bold font-comic mb-2">Eredmény</h2>
            <p className="opacity-80">{timeStr} idő alatt</p>
        </div>

        <div className="p-8 text-center">
            <div className={`text-4xl font-bold mb-2 ${colorClass}`}>{percentage}%</div>
            <p className="text-xl text-gray-600 mb-8">{message}</p>

            <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <div className="flex items-center justify-center gap-2 text-green-700 font-bold text-xl mb-1">
                        <Check className="w-6 h-6" /> {results.correct}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-green-600">Helyes</div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                    <div className="flex items-center justify-center gap-2 text-red-700 font-bold text-xl mb-1">
                        <AlertCircle className="w-6 h-6" /> {results.incorrect}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-red-600">Hibás</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-center gap-2 text-gray-700 font-bold text-xl mb-1">
                        <span className="text-2xl leading-none text-gray-400">-</span> {results.unanswered}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-gray-500">Üres</div>
                </div>
            </div>

            <div className="mb-8">
                 <h3 className="text-left font-bold text-gray-700 mb-4 border-b pb-2">Részletek</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                    {problems.map((p, i) => {
                        const val = parseInt(p.userAnswer, 10);
                        const isCorrect = !isNaN(val) && val === p.correctValue;
                        const isUnanswered = p.userAnswer === '';
                        
                        let borderClass = isUnanswered ? 'border-gray-200 bg-gray-50' : (isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50');
                        let textClass = isUnanswered ? 'text-gray-500' : (isCorrect ? 'text-green-800' : 'text-red-800');

                        return (
                            <div key={p.id} className={`p-3 rounded border ${borderClass} flex justify-between items-center text-sm`}>
                                <div className="font-mono font-bold">
                                    {p.missingPosition === 'num1' ? <span className="underline decoration-dotted decoration-2 underline-offset-4">?</span> : p.num1}
                                    {' '}{p.operator}{' '}
                                    {p.missingPosition === 'num2' ? <span className="underline decoration-dotted decoration-2 underline-offset-4">?</span> : p.num2}
                                    {' = '}
                                    {p.missingPosition === 'result' ? <span className="underline decoration-dotted decoration-2 underline-offset-4">?</span> : (
                                        // Calc result for display
                                        p.operator === '+' ? p.num1 + p.num2 :
                                        p.operator === '-' ? p.num1 - p.num2 :
                                        p.operator === '·' ? p.num1 * p.num2 :
                                        p.num1 / p.num2
                                    )}
                                </div>
                                <div className={`${textClass} font-bold`}>
                                    {isUnanswered ? '—' : (
                                        <span className="flex items-center gap-1">
                                            {p.userAnswer}
                                            {!isCorrect && <span className="text-xs text-gray-500 opacity-75 line-through">({p.correctValue})</span>}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                 </div>
            </div>

            <button
                onClick={onRestart}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center justify-center gap-2 mx-auto transition-transform hover:scale-105"
            >
                <RefreshCw className="w-5 h-5" />
                Új feladatlap
            </button>
        </div>
    </div>
  );
};

export default ResultsScreen;