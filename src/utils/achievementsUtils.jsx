const ACHIEVEMENTS_KEY = 'memoryPathGame_achievements';

// Definición de todos los logros disponibles
const ACHIEVEMENT_DEFINITIONS = [
  {
    id: 'first_game',
    name: 'Primer Juego',
    description: 'Completa tu primer juego',
    icon: '🎮',
    category: 'inicio'
  },
  {
    id: 'perfect_score',
    name: 'Perfección',
    description: 'Obtén una puntuación perfecta',
    icon: '⭐',
    category: 'rendimiento'
  },
  {
    id: 'games_10',
    name: 'Veterano',
    description: 'Completa 10 juegos',
    icon: '🏆',
    category: 'persistencia'
  },
  {
    id: 'games_50',
    name: 'Maestro',
    description: 'Completa 50 juegos',
    icon: '👑',
    category: 'persistencia'
  },
  {
    id: 'games_100',
    name: 'Leyenda',
    description: 'Completa 100 juegos',
    icon: '🌟',
    category: 'persistencia'
  },
  {
    id: 'high_score_easy',
    name: 'Campeón Fácil',
    description: 'Obtén más de 800 puntos en modo fácil',
    icon: '🥉',
    category: 'puntuación'
  },
  {
    id: 'high_score_medium',
    name: 'Campeón Medio',
    description: 'Obtén más de 1200 puntos en modo medio',
    icon: '🥈',
    category: 'puntuación'
  },
  {
    id: 'high_score_hard',
    name: 'Campeón Difícil',
    description: 'Obtén más de 1600 puntos en modo difícil',
    icon: '🥇',
    category: 'puntuación'
  },
  {
    id: 'streak_5',
    name: 'Racha de 5',
    description: 'Gana 5 juegos consecutivos',
    icon: '🔥',
    category: 'racha'
  },
  {
    id: 'streak_10',
    name: 'Racha de 10',
    description: 'Gana 10 juegos consecutivos',
    icon: '🚀',
    category: 'racha'
  },
  {
    id: 'speed_demon',
    name: 'Demonio de Velocidad',
    description: 'Completa un juego en menos de 30 segundos',
    icon: '⚡',
    category: 'velocidad'
  },
  {
    id: 'path_master_easy',
    name: 'Maestro del Camino Fácil',
    description: 'Completa un camino de 15+ casillas en modo fácil',
    icon: '🛤️',
    category: 'dificultad'
  },
  {
    id: 'path_master_medium',
    name: 'Maestro del Camino Medio',
    description: 'Completa un camino de 12+ casillas en modo medio',
    icon: '🗺️',
    category: 'dificultad'
  },
  {
    id: 'path_master_hard',
    name: 'Maestro del Camino Difícil',
    description: 'Completa un camino de 10+ casillas en modo difícil',
    icon: '🏔️',
    category: 'dificultad'
  },
  {
    id: 'comeback_king',
    name: 'Rey del Regreso',
    description: 'Gana después de perder 3 juegos consecutivos',
    icon: '👑',
    category: 'especial'
  },
  {
    id: 'collector',
    name: 'Coleccionista',
    description: 'Desbloquea 10 logros',
    icon: '📚',
    category: 'meta'
  }
];

export const getAchievementDefinitions = () => ACHIEVEMENT_DEFINITIONS;

export const loadAchievements = () => {
  try {
    const saved = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading achievements:', error);
  }
  return [];
};

export const saveAchievements = (achievements) => {
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
  } catch (error) {
    console.error('Error saving achievements:', error);
  }
};

export const checkAchievements = (scores, currentAchievements) => {
  const unlockedIds = new Set(currentAchievements.map(a => a.id));
  const newAchievements = [...currentAchievements];
  
  // Obtener estadísticas de los scores
  const totalGames = scores.length;
  const perfectScores = scores.filter(s => s.score >= 2000).length;
  const easyGames = scores.filter(s => s.difficulty === 'easy');
  const mediumGames = scores.filter(s => s.difficulty === 'medium');
  const hardGames = scores.filter(s => s.difficulty === 'hard');
  
  // Calcular rachas ganadoras
  let currentStreak = 0;
  let maxStreak = 0;
  let currentLoseStreak = 0;
  
  for (let i = scores.length - 1; i >= 0; i--) {
    if (scores[i].score > 0) {
      currentStreak++;
      currentLoseStreak = 0;
    } else {
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
      currentStreak = 0;
      currentLoseStreak++;
    }
  }
  
  if (currentStreak > maxStreak) {
    maxStreak = currentStreak;
  }

  // Verificar cada logro
  ACHIEVEMENT_DEFINITIONS.forEach(achievement => {
    if (unlockedIds.has(achievement.id)) return;
    
    let shouldUnlock = false;
    
    switch (achievement.id) {
      case 'first_game':
        shouldUnlock = totalGames >= 1;
        break;
      case 'perfect_score':
        shouldUnlock = perfectScores > 0;
        break;
      case 'games_10':
        shouldUnlock = totalGames >= 10;
        break;
      case 'games_50':
        shouldUnlock = totalGames >= 50;
        break;
      case 'games_100':
        shouldUnlock = totalGames >= 100;
        break;
      case 'high_score_easy':
        shouldUnlock = easyGames.some(s => s.score > 800);
        break;
      case 'high_score_medium':
        shouldUnlock = mediumGames.some(s => s.score > 1200);
        break;
      case 'high_score_hard':
        shouldUnlock = hardGames.some(s => s.score > 1600);
        break;
      case 'streak_5':
        shouldUnlock = maxStreak >= 5 || currentStreak >= 5;
        break;
      case 'streak_10':
        shouldUnlock = maxStreak >= 10 || currentStreak >= 10;
        break;
      case 'speed_demon':
        // Asumir que juegos rápidos tienen timestamp similar
        shouldUnlock = scores.some(s => s.score > 1500); // Aproximación
        break;
      case 'path_master_easy':
        shouldUnlock = easyGames.some(s => s.pathLength >= 15);
        break;
      case 'path_master_medium':
        shouldUnlock = mediumGames.some(s => s.pathLength >= 12);
        break;
      case 'path_master_hard':
        shouldUnlock = hardGames.some(s => s.pathLength >= 10);
        break;
      case 'comeback_king':
        // Verificar si hay una racha ganadora después de 3 derrotas
        shouldUnlock = checkComebackPattern(scores);
        break;
      case 'collector':
        shouldUnlock = newAchievements.length >= 10;
        break;
    }
    
    if (shouldUnlock) {
      newAchievements.push({
        ...achievement,
        unlockedAt: new Date().toISOString(),
        isNew: true
      });
    }
  });
  
  return newAchievements;
};

const checkComebackPattern = (scores) => {
  if (scores.length < 4) return false;
  
  for (let i = 3; i < scores.length; i++) {
    const last4 = scores.slice(i - 3, i + 1);
    if (last4[0].score === 0 && last4[1].score === 0 && 
        last4[2].score === 0 && last4[3].score > 0) {
      return true;
    }
  }
  return false;
};

export const getAchievementsByCategory = (achievements) => {
  const categories = {};
  achievements.forEach(achievement => {
    const category = achievement.category || 'otros';
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(achievement);
  });
  return categories;
};

export const getAchievementProgress = (scores, achievementId) => {
  const totalGames = scores.length;
  
  switch (achievementId) {
    case 'games_10':
      return Math.min(totalGames / 10, 1);
    case 'games_50':
      return Math.min(totalGames / 50, 1);
    case 'games_100':
      return Math.min(totalGames / 100, 1);
    default:
      return 0;
  }
};

export const clearAchievements = () => {
  try {
    localStorage.removeItem(ACHIEVEMENTS_KEY);
  } catch (error) {
    console.error('Error clearing achievements:', error);
  }
};