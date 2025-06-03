import React from 'react';
import GameGrid from './GameGrid';

const PlayingScreen = ({
  currentPath,
  playerPath,
  gameState,
  handleCellClick
}) => {
  return (
    <div className="screen-container playing-screen">
      <div className="game-container">
        <div className="game-header">
          <h2 className="screen-title">
            ¡Recrea el Camino!
          </h2>
          <p className="progress-text">
            Progreso: {playerPath.length} / {currentPath.length}
          </p>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(playerPath.length / currentPath.length) * 100}%` }}
            ></div>
          </div>
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

export default PlayingScreen;