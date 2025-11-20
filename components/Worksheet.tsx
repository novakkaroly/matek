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

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-slate-50 pt-4 pb-4 px-2 shadow-sm border-b border-gray-200 mb-4 flex justify-between items-center">
         <button onClick={onBack} className="text-gray-500 hover:text-gray-800 text-sm font-semibold underline decoration-dotted">
            &larr; Vissza
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
            <p className="text-gray-500 mb-6 italic text-center">Egészítsd ki a mondatokat! Ha kész vagy, kattints a "Kész!" gombra.</p>
            
            {/* Grid for problems - Modified for Sentences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {problems.map((p, index) => (
                    <div key={p.id} className="flex flex-col justify-center p-4 bg-gray-50 rounded-lg border border-gray-100 relative">
                        <span className="text-xs text-gray-400 absolute top-2 left-2 font-mono">{index + 1}.</span>
                        
                        <div className="flex items-baseline flex-wrap gap-2 text-xl text-slate-800 mt-2">
                           <span className="font-medium">{p.prefix}</span>
                           
                           <input
                              type="text"
                              value={p.userAnswer}
                              onChange={(e) => handleInputChange(p.id, e.target.value)}
                              className="min-w-[120px] flex-1 border-b-2 border-gray-300 focus:border-yellow-500 text-center text-xl font-bold text-indigo-700 outline-none bg-transparent px-2 transition-colors"
                              autoComplete="off"
                              placeholder=""
                           />

                           <span className="font-medium">{p.suffix}</span>
                        </div>
                        <div className="text-sm text-gray-400 mt-1 font-italic self-end">
                            {p.hint}
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Worksheet;