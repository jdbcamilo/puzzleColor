import React from 'react';
import { Play, RotateCcw } from 'lucide-react';
import GameGrid from './GameGrid';
import { generateRandomPath } from '../utils/gameUtils';

const SetupScreen = ({
  currentPath,
  playerPath,
  gameState,
  handleCellClick,
  resetGame,
  playerName,
  difficulty,
  customMode,
  setCustomMode,
  setCurrentPath,
  showPath
}) => {
  return (
    <div className="screen-container setup-screen">
      <div className="game-container">
        <div className="game-header">
          <h2 className="screen-title">
            {customMode ? 'Crear Camino Personalizado' : 'Preparar Juego'}
          </h2>
          <p className="player-info">
            Jugador: <span className="highlight">{playerName}</span> | 
            Dificultad: <span className="highlight">{difficulty}</span>
          </p>
        </div>
        
        {customMode ? (
          <div className="instructions">
            <p className="instruction-text">
              Haz clic en las celdas para crear tu camino personalizado
            </p>
            <p className="instruction-subtext">
              Camino actual: {currentPath.length} pasos
            </p>
          </div>
        ) : null}
        
        <GameGrid
          currentPath={currentPath}
          playerPath={playerPath}
          gameState={gameState}
          customMode={customMode}
          handleCellClick={handleCellClick}
        />
        
        <div className="button-container">
          {customMode ? (
            <>
              <button
                onClick={() => setCurrentPath([])}
                className="btn btn-danger"
              >
                Limpiar Camino
              </button>
              <button
                onClick={() => {
                  if (currentPath.length === 0) {
                    alert('Crea un camino primero');
                    return;
                  }
                  setCustomMode(false);
                  showPath();
                }}
                className="btn btn-success"
                disabled={currentPath.length === 0}
              >
                Usar Este Camino
              </button>
            </>
          ) : (
            <button
              onClick={showPath}
              className="btn btn-primary btn-large"
            >
              <Play className="btn-icon" />
              Mostrar Camino
            </button>
          )}
          
          <button
            onClick={resetGame}
            className="btn btn-secondary"
          >
            <RotateCcw className="btn-icon" />
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;