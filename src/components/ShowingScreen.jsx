import React from 'react';
import GameGrid from './GameGrid';

const ShowingScreen = ({
  currentPath,
  playerPath,
  gameState,
  handleCellClick,
  timer
}) => {
  return (
    <div className="screen-container showing-screen">
      <div className="game-container">
        <div className="game-header">
          <h2 className="screen-title memorize-title">
            ¡Memoriza el Camino!
          </h2>
          <div className="timer-display">{timer}</div>
          <p className="instruction-text">
            Recuerda la secuencia y los colores...
          </p>
        </div>
        
        <GameGrid
          currentPath={currentPath}
          playerPath={playerPath}
          gameState={gameState}
          customMode={false}
          handleCellClick={handleCellClick}
        />
      </div>
    </div>
  );
};

export default ShowingScreen;