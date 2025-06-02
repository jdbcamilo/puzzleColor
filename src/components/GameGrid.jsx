import React from 'react';
import { GRID_SIZE } from '../utils/gameUtils';

const GameGrid = ({ 
  currentPath, 
  playerPath, 
  gameState, 
  customMode, 
  handleCellClick 
}) => {
  const renderCell = (row, col) => {
    const isInCurrentPath = currentPath.find(cell => cell.row === row && cell.col === col);
    const isInPlayerPath = playerPath.find(cell => cell.row === row && cell.col === col);
    
    let cellColor = '#f0f0f0';
    let cellContent = '';
    let borderColor = '#ddd';
    
    if (gameState === 'showing' && isInCurrentPath) {
      cellColor = isInCurrentPath.color;
      cellContent = currentPath.findIndex(cell => cell.row === row && cell.col === col) + 1;
    } else if (gameState === 'playing' && isInPlayerPath) {
      cellColor = isInPlayerPath.color;
      cellContent = playerPath.findIndex(cell => cell.row === row && cell.col === col) + 1;
      borderColor = isInPlayerPath.correct ? '#4CAF50' : '#F44336';
    } else if (customMode && isInCurrentPath) {
      cellColor = isInCurrentPath.color;
      cellContent = currentPath.findIndex(cell => cell.row === row && cell.col === col) + 1;
    }
    
    return (
      <div
        key={`${row}-${col}`}
        className="game-cell"
        style={{ 
          backgroundColor: cellColor, 
          borderColor: borderColor,
        }}
        onClick={() => handleCellClick(row, col)}
      >
        {cellContent}
      </div>
    );
  };

  return (
    <div className="game-grid">
      {Array.from({ length: GRID_SIZE }, (_, row) =>
        Array.from({ length: GRID_SIZE }, (_, col) => renderCell(row, col))
      )}
    </div>
  );
};

export default GameGrid;