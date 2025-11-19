import React, { useState } from 'react';
import SetupScreen from './components/SetupScreen';
import Worksheet from './components/Worksheet';
import ResultsScreen from './components/ResultsScreen';
import { generateWorksheet } from './utils/mathGenerator';
import { GameConfig, GradeLevel, OperationType, Problem } from './types';

type GameState = 'SETUP' | 'PLAYING' | 'RESULTS';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('SETUP');
  const [problems, setProblems] = useState<Problem[]>([]);
  const [timeLimit, setTimeLimit] = useState<number>(300); // Default 5 mins
  const [timeUsed, setTimeUsed] = useState<number>(0);

  // Keep track of last config to easily restart
  const [lastConfig, setLastConfig] = useState<GameConfig | null>(null);

  const handleStart = (config: GameConfig) => {
    const newProblems = generateWorksheet(30, { // 30 problems as per screenshot density
      operation: config.operation,
      level: config.level
    });
    
    setProblems(newProblems);
    setTimeLimit(config.durationSeconds);
    setLastConfig(config);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 font-sans text-slate-900">
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
      
      <footer className="text-center mt-12 text-indigo-300 text-sm">
        <p>&copy; {new Date().getFullYear()} Matek Kicsiknek | Jó tanulást!</p>
      </footer>
    </div>
  );
};

export default App;