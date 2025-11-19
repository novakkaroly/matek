import React, { useEffect, useState, useRef } from 'react';
import { Problem } from '../types';
import { Clock, CheckCircle2 } from 'lucide-react';

interface WorksheetProps {
  problems: Problem[];
  initialTimeSeconds: number;
  onFinish: (problems: Problem[], timeUsed: number) => void;
  onBack: () => void;
}

const Worksheet: React.FC<WorksheetProps> = ({ problems: initialProblems, initialTimeSeconds, onFinish, onBack }) => {
  const [problems, setProblems] = useState<Problem[]>(initialProblems);
  const [timeLeft, setTimeLeft] = useState(initialTimeSeconds);
  const [isActive, setIsActive] = useState(true);
  const timerRef = useRef<number | null>(null);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
        handleFinish();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, timeLeft]);

  const handleInputChange = (id: string, value: string) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, userAnswer: value } : p))
    );
  };

  const handleFinish = () => {
    if (!isActive) return;
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    const timeUsed = initialTimeSeconds - timeLeft;
    onFinish(problems, timeUsed);
  };

  const renderProblemPart = (p: Problem, part: 'num1' | 'num2' | 'result') => {
    const isMissing = p.missingPosition === part;

    if (isMissing) {
      return (
        <input
          type="number"
          inputMode="numeric"
          value={p.userAnswer}
          onChange={(e) => handleInputChange(p.id, e.target.value)}
          className="w-16 h-10 text-center border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-xl font-bold text-indigo-700 outline-none bg-white"
          autoComplete="off"
        />
      );
    }

    let content: number | string = '';
    if (part === 'num1') content = p.num1;
    if (part === 'num2') content = p.num2;
    if (part === 'result') content = part === 'result' && p.missingPosition !== 'result' ? (p.operator === ':' ? p.num1 / p.num2 : p.operator === '·' ? p.num1 * p.num2 : p.operator === '-' ? p.num1 - p.num2 : p.num1 + p.num2) : ''; 

    // Re-calculate for display purposes if it's not the missing part, ensuring we display the STATIC numbers correctly.
    // Actually, standard display logic:
    // num1 [op] num2 = result
    
    if (part === 'result') {
         // If result is not missing, calculate it for display
         if (p.operator === '+') content = p.num1 + p.num2;
         if (p.operator === '-') content = p.num1 - p.num2;
         if (p.operator === '·') content = p.num1 * p.num2;
         if (p.operator === ':') content = p.num1 / p.num2;
    }

    return <span className="text-xl font-bold text-gray-700 w-12 text-center inline-block">{content}</span>;
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-slate-50 pt-4 pb-4 px-2 shadow-sm border-b border-gray-200 mb-4 flex justify-between items-center">
         <button onClick={onBack} className="text-gray-500 hover:text-gray-800 text-sm font-semibold underline decoration-dotted">
            &larr; Vissza a választáshoz
         </button>

         <div className={`flex items-center gap-2 text-2xl font-mono font-bold ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
            <Clock className="w-6 h-6" />
            {formatTime(timeLeft)}
         </div>

         <button 
            onClick={handleFinish}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold shadow-md flex items-center gap-2 transition-transform active:scale-95"
         >
            <CheckCircle2 className="w-5 h-5" />
            Kész!
         </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-12">
         <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <p className="text-gray-500 mb-6 italic text-center">Gyorsan töltsd ki! Ha kész vagy, kattints a "Kész!" gombra.</p>
            
            {/* Grid for problems */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                {problems.map((p, index) => (
                    <div key={p.id} className="flex items-center justify-center gap-1 p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="text-xs text-gray-400 absolute left-2 hidden">{index + 1}.</span>
                        
                        {/* Part 1 */}
                        {renderProblemPart(p, 'num1')}

                        {/* Operator */}
                        <span className="text-xl font-bold text-gray-500 mx-1">{p.operator}</span>

                        {/* Part 2 */}
                        {renderProblemPart(p, 'num2')}

                        {/* Equals */}
                        <span className="text-xl font-bold text-gray-500 mx-1">=</span>

                        {/* Result */}
                        {renderProblemPart(p, 'result')}
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Worksheet;