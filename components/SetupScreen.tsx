import React, { useState } from 'react';
import { GradeLevel, OperationType } from '../types';
import { BookOpen, Calculator, ChevronRight, Zap } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center text-white mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-6 mb-4">
              <Zap className="w-12 h-12 text-yellow-300" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-3">Matek Kicsiknek</h1>
          <p className="text-xl text-blue-100">Fejlessz matekból szórakoztató gyakorlásokkal!</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-8 md:p-12 space-y-10">
            
            {/* Operation Selection */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-full p-3">
                  <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <label className="text-2xl font-bold text-gray-800">Milyen műveletet szeretnél?</label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { id: OperationType.ADD, label: 'Összeadás', icon: '+', color: 'from-green-400 to-green-600' },
                  { id: OperationType.SUB, label: 'Kivonás', icon: '−', color: 'from-red-400 to-red-600' },
                  { id: OperationType.MUL, label: 'Szorzás', icon: '×', color: 'from-yellow-400 to-yellow-600' },
                  { id: OperationType.DIV, label: 'Osztás', icon: '÷', color: 'from-purple-400 to-purple-600' },
                  { id: OperationType.SUBSTITUTION, label: 'Helyettesítés', icon: '?', color: 'from-pink-400 to-pink-600' },
                  { id: OperationType.MIXED, label: 'Vegyes', icon: '*', color: 'from-indigo-400 to-indigo-600' },
                ].map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setOperation(op.id)}
                    className={`p-4 rounded-2xl transition-all transform hover:scale-105 ${
                      operation === op.id
                        ? `bg-gradient-to-br ${op.color} text-white shadow-lg scale-105`
                        : 'bg-gray-50 border-2 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-3xl font-bold mb-2">{op.icon}</div>
                    <div className="text-sm font-semibold">{op.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="space-y-5 pt-6 border-t-2 border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 rounded-full p-3">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <label className="text-2xl font-bold text-gray-800">Milyen nehéz legyen?</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { id: GradeLevel.GRADE_1, title: '🎓 Első osztályos', desc: '20-as számkör', color: 'from-green-50 to-emerald-50', border: 'border-green-300', badge: 'bg-green-100 text-green-700' },
                  { id: GradeLevel.GRADE_2, title: '📚 Második osztályos', desc: '100-as számkör', color: 'from-orange-50 to-amber-50', border: 'border-orange-300', badge: 'bg-orange-100 text-orange-700' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLevel(item.id)}
                    className={`p-6 rounded-2xl border-3 transition-all ${
                      level === item.id
                        ? `bg-gradient-to-br ${item.color} ${item.border} shadow-lg scale-105 ring-4 ring-offset-2 ${item.badge}`
                        : `bg-gradient-to-br ${item.color} border-gray-200 hover:shadow-md`
                    }`}
                  >
                    <div className="text-2xl font-bold text-gray-800 mb-2">{item.title}</div>
                    <div className="text-gray-600">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tips Box */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200 flex items-start gap-4">
              <span className="text-3xl">💡</span>
              <p className="text-gray-700 font-medium">Tipp: Használd a <span className="bg-blue-200 px-2 py-1 rounded font-bold">TAB</span> billentyűt, hogy gyorsan mozogj a feladatok között!</p>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStart}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-2xl font-bold py-5 rounded-2xl shadow-xl transform transition hover:-translate-y-1 flex items-center justify-center gap-3 group"
            >
              <span>Kezdjük el!</span>
              <ChevronRight className="w-7 h-7 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white text-opacity-90">
          <p className="text-lg">✨ Kitartás! Gyakorlás teszi a mestert! ✨</p>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;
