export const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#FF8C94', '#FF9F43', '#6C5CE7', '#A29BFE'
];

export const GRID_SIZE = 8;

export const generateRandomPath = (difficulty) => {
  const pathLength = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
  const path = [];
  
  for (let i = 0; i < pathLength; i++) {
    let newCell;
    do {
      newCell = {
        row: Math.floor(Math.random() * GRID_SIZE),
        col: Math.floor(Math.random() * GRID_SIZE),
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      };
    } while (path.some(cell => cell.row === newCell.row && cell.col === newCell.col));
    
    path.push(newCell);
  }
  
  return path;
};

export const calculateScore = (playerPath, currentPath, difficulty) => {
  const correctSteps = playerPath.filter(step => step.correct).length;
  const totalSteps = currentPath.length;
  const baseScore = (correctSteps / totalSteps) * 100;
  const difficultyBonus = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2;
  
  return Math.round(baseScore * difficultyBonus);
};

export const getDifficultySettings = () => ({
  easy: { steps: 4, name: 'Fácil', bonus: 1 },
  medium: { steps: 6, name: 'Medio', bonus: 1.5 },
  hard: { steps: 8, name: 'Difícil', bonus: 2 }
});