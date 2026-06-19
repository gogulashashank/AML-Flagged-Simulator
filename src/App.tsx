import React from 'react';
import { useSimulatorStore } from './store/useSimulatorStore';
import { IntroScreen } from './components/IntroScreen';
import { GameBoard } from './components/GameBoard';
import { OutcomeScreen } from './components/OutcomeScreen';

const App: React.FC = () => {
  const gameStage = useSimulatorStore((state) => state.gameStage);

  return (
    <>
      {gameStage === 'intro' && <IntroScreen />}
      {gameStage === 'playing' && <GameBoard />}
      {gameStage === 'outcome' && <OutcomeScreen />}
    </>
  );
};

export default App;
