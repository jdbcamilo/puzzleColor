import React from 'react';

const ResultScreen = ({
  currentPath,
  playerPath,
  resetGame,
  scores,
  setGameState,
  setCurrentPath,
  setPlayerPath,
  generateRandomPath
}) => {
  const lastScore = scores[scores.length - 1];
  const isWinner = playerPath.every(step => step.correct);
  
  const playAgain = () => {
    setGameState('setup');
    setCurrentPath(generateRandomPath());
    setPlayerPath([]);
  };

  return (
    <div className="screen-container result-screen">
      <div className="result-container">
        <div className="result-emoji">
          {isWinner ? '🎉' : '😅'}
        </div>
        
        <h2 className="result-title">
          {isWinner ? '¡Excelente!' : '¡Buen Intento!'}
        </h2>
        
        <div className="score-display">
          <p className="score-main">
            Puntaje: <span className="score-value">{lastScore?.score || 0}</span>
          </p>
          <p className="score-details">
            Pasos correctos: {playerPath.filter(s => s.correct).length} / {currentPath.length}
          </p>
        </div>
        
        {scores.length > 0 && (
          <div className="leaderboard">
            <h3 className="leaderboard-title">Top 5 Puntajes:</h3>
            <div className="leaderboard-list">
              {scores
                .sort((a, b) => b.score - a.score)
                .slice(0, 5)
                .map((score, index) => (
                  <div key={index} className="leaderboard-item">
                    <span className="player-name">{score.name}</span>
                    <span className="player-score">{score.score}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        <div className="result-buttons">
          <button
            onClick={playAgain}
            className="btn btn-primary btn-large"
          >
            Jugar de Nuevo
          </button>
          
          <button
            onClick={resetGame}
            className="btn btn-secondary"
          >
            Menú Principal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;