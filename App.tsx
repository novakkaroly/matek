import React, { useState } from 'react';
import SetupScreen from './components/SetupScreen';
import Worksheet from './components/Worksheet';
import ResultsScreen from './components/ResultsScreen';
import { generateWorksheet } from './utils/mathGenerator'; // Actually uses german logic now
import { GameConfig, Problem } from './types';

type GameState = 'SETUP' | 'PLAYING' | 'RESULTS';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('SETUP');
  const [problems, setProblems] = useState<Problem[]>([]);
  const [timeLimit, setTimeLimit] = useState<number>(300); 
  const [timeUsed, setTimeUsed] = useState<number>(0);

  const handleStart = (config: GameConfig) => {
    const newProblems = generateWorksheet(20, { 
      exerciseType: config.exerciseType,
      level: config.level
    });
    
    setProblems(newProblems);
    setTimeLimit(config.durationSeconds);
    setGameState('PLAYING');
    window.scrollTo(0, 0);
  };

  const handleFinish = (finalProblems: Problem[], time: number) => {
    setProblems(finalProblems);
    setTimeUsed(time);
    setGameState('RESULTS');
    window.scrollTo(0, 0);
  };

  const handleRestart = () => {
    setGameState('SETUP');
    setProblems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-8 px-4 font-sans text-slate-900">
      <div className="container mx-auto">
        {gameState === 'SETUP' && (
          <SetupScreen onStart={handleStart} />
        )}

        {gameState === 'PLAYING' && (
          <Worksheet 
            problems={problems} 
            initialTimeSeconds={timeLimit}
            onFinish={handleFinish}
            onBack={() => setGameState('SETUP')}
          />
        )}

        {gameState === 'RESULTS' && (
          <ResultsScreen 
            problems={problems} 
            timeUsed={timeUsed} 
            onRestart={handleRestart} 
          />
        )}
      </div>
      
      <footer className="text-center mt-12 text-orange-300 text-sm">
        <p>&copy; {new Date().getFullYear()} Német Gyakorló | Viel Erfolg!</p>
      </footer>
    </div>
  );
};

export default App;