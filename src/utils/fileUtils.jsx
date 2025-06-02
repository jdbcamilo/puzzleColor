const SCORES_KEY = 'memoryPathGame_scores';
const BACKUP_KEY = 'memoryPathGame_backup';

export const saveScoresToLocal = (scores) => {
  try {
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
    console.log('Puntajes guardados automáticamente');
  } catch (error) {
    console.error('Error guardando puntajes:', error);
  }
};

export const loadScoresFromLocal = () => {
  try {
    const saved = localStorage.getItem(SCORES_KEY);
    if (saved) {
      const scores = JSON.parse(saved);
      console.log(`Cargados ${scores.length} puntajes guardados`);
      return scores;
    }
  } catch (error) {
    console.error('Error cargando puntajes:', error);
  }
  return [];
};

export const clearAllScores = (setScores) => {
  try {
    localStorage.removeItem(SCORES_KEY);
    localStorage.removeItem(BACKUP_KEY);
    setScores([]);
    console.log('Todos los puntajes han sido eliminados');
  } catch (error) {
    console.error('Error eliminando puntajes:', error);
  }
};

export const exportScores = (scores) => {
  try {
    const data = {
      scores: scores,
      exportDate: new Date().toISOString(),
      version: '2.0',
      totalGames: scores.length,
      bestScore: Math.max(...scores.map(s => s.score), 0)
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `memory-path-scores-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('Puntajes exportados exitosamente');
  } catch (error) {
    console.error('Error exportando puntajes:', error);
    alert('Error al exportar los puntajes');
  }
};

export const importScores = (event, setScores) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      
      if (data.scores && Array.isArray(data.scores)) {
        const validScores = data.scores.filter(score => 
          score.id && 
          score.name && 
          typeof score.score === 'number' &&
          score.difficulty &&
          score.date
        );
        
        if (validScores.length > 0) {
          const currentScores = loadScoresFromLocal();
          if (currentScores.length > 0) {
            createBackup(currentScores);
          }
          
          setScores(validScores);
          saveScoresToLocal(validScores);
          alert(`Se importaron ${validScores.length} puntajes exitosamente`);
          console.log(`Importados ${validScores.length} puntajes`);
        } else {
          alert('El archivo no contiene puntajes válidos');
        }
      } else {
        alert('Formato de archivo inválido');
      }
    } catch (error) {
      console.error('Error importando puntajes:', error);
      alert('Error al leer el archivo. Asegúrate de que sea un archivo JSON válido.');
    }
  };
  
  reader.readAsText(file);
  event.target.value = '';
};

export const createAutoBackup = (scores) => {
  try {
    const backup = {
      scores: scores,
      backupDate: new Date().toISOString(),
      type: 'auto',
      totalGames: scores.length
    };
    localStorage.setItem(BACKUP_KEY, JSON.stringify(backup));
    console.log('Respaldo automático creado');
  } catch (error) {
    console.error('Error creando respaldo automático:', error);
  }
};

export const createBackup = (scores) => {
  try {
    const backup = {
      scores: scores,
      backupDate: new Date().toISOString(),
      type: 'manual',
      totalGames: scores.length
    };
    localStorage.setItem(BACKUP_KEY, JSON.stringify(backup));
    console.log('Respaldo manual creado');
  } catch (error) {
    console.error('Error creando respaldo:', error);
  }
};

export const restoreFromBackup = () => {
  try {
    const backup = localStorage.getItem(BACKUP_KEY);
    if (backup) {
      const backupData = JSON.parse(backup);
      return backupData.scores || [];
    }
  } catch (error) {
    console.error('Error restaurando respaldo:', error);
  }
  return [];
};

export const getBackupInfo = () => {
  try {
    const backup = localStorage.getItem(BACKUP_KEY);
    if (backup) {
      const backupData = JSON.parse(backup);
      return {
        exists: true,
        date: backupData.backupDate,
        type: backupData.type,
        totalGames: backupData.totalGames
      };
    }
  } catch (error) {
    console.error('Error obteniendo info del respaldo:', error);
  }
  return { exists: false };
};

export const cleanupOldData = () => {
  try {
    // Eliminar respaldos antiguos (más de 30 días)
    const backup = localStorage.getItem(BACKUP_KEY);
    if (backup) {
      const backupData = JSON.parse(backup);
      const backupDate = new Date(backupData.backupDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      if (backupDate < thirtyDaysAgo) {
        localStorage.removeItem(BACKUP_KEY);
        console.log('Respaldo antiguo eliminado');
      }
    }
  } catch (error) {
    console.error('Error limpiando datos antiguos:', error);
  }
};

export const getStorageUsage = () => {
  try {
    let totalSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith('memoryPathGame_')) {
        totalSize += localStorage[key].length;
      }
    }
    return {
      bytes: totalSize,
      kb: Math.round(totalSize / 1024 * 100) / 100,
      mb: Math.round(totalSize / (1024 * 1024) * 100) / 100
    };
  } catch (error) {
    console.error('Error calculando uso de almacenamiento:', error);
    return { bytes: 0, kb: 0, mb: 0 };
  }
};