import React, { useState, useRef, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import SetupScreen from './components/SetupScreen.jsx';
import ShowingScreen from './components/ShowingScreen.jsx';
import PlayingScreen from './components/PlayingScreen.jsx';
import ResultScreen from './components/ResultScreen.jsx';
import SettingsScreen from './components/SettingsScreen.jsx';
import AchievementsScreen from './components/AchievementsScreen.jsx';
import { generateRandomPath, calculateScore } from './utils/gameUtils.jsx';
import { 
  exportScores, 
  importScores, 
  saveScoresToLocal, 
  loadScoresFromLocal, 
  clearAllScores,
  createAutoBackup 
} from './utils/fileUtils.jsx';
import { 
  loadSettings, 
  saveSettings, 
  getDefaultSettings 
} from './utils/settingsUtils.jsx';
import { 
  loadAchievements, 
  saveAchievements, 
  checkAchievements 
} from './utils/achievementsUtils.jsx';
import { 
  playWinSound, 
  playLoseSound, 
  playStartSound 
} from './utils/soundUtils.jsx';
import './styles/App.css';

const MemoryPathGame = () => {
  const [gameState, setGameState] = useState('welcome'); 
  const [playerName, setPlayerName] = useState('');
  const [gameMode, setGameMode] = useState('individual');
  const [currentPath, setCurrentPath] = useState([]);
  const [playerPath, setPlayerPath] = useState([]);
  const [showTime, setShowTime] = useState(3);
  const [timer, setTimer] = useState(0);
  const [scores, setScores] = useState([]);
  const [customMode, setCustomMode] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [settings, setSettings] = useState(getDefaultSettings());
  const [achievements, setAchievements] = useState([]);
  const fileInputRef = useRef(null);

  // Cargar datos al iniciar la aplicación
  useEffect(() => {
    try {
      const savedScores = loadScoresFromLocal();
      const savedSettings = loadSettings();
      const savedAchievements = loadAchievements();
      
      setScores(savedScores);
      setSettings(savedSettings);
      setAchievements(savedAchievements);
    } catch (error) {
      console.error('Error loading data:', error);
      // Usar valores por defecto si hay error
      setScores([]);
      setSettings(getDefaultSettings());
      setAchievements([]);
    }
  }, []);

  // Guardar automáticamente cuando cambian los puntajes
  useEffect(() => {
    if (scores.length > 0) {
      try {
        saveScoresToLocal(scores);
      } catch (error) {
        console.error('Error saving scores:', error);
      }
    }
  }, [scores]);

  // Guardar configuración cuando cambia
  useEffect(() => {
    try {
      saveSettings(settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }, [settings]);

  // Guardar logros cuando cambian
  useEffect(() => {
    try {
      saveAchievements(achievements);
    } catch (error) {
      console.error('Error saving achievements:', error);
    }
  }, [achievements]);

  // Detectar cuando se va a cerrar/recargar la página
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      try {
        if (scores.length > 0) {
          saveScoresToLocal(scores);
          // Crear respaldo automático si hay muchos puntajes
          if (scores.length >= 10) {
            createAutoBackup(scores);
          }
        }
        saveSettings(settings);
        saveAchievements(achievements);
      } catch (error) {
        console.error('Error saving data on unload:', error);
      }
    };

    const handleVisibilityChange = () => {
      try {
        if (document.visibilityState === 'hidden') {
          if (scores.length > 0) {
            saveScoresToLocal(scores);
          }
          saveSettings(settings);
          saveAchievements(achievements);
        }
      } catch (error) {
        console.error('Error saving data on visibility change:', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [scores, settings, achievements]);

  const startGame = () => {
    if (!playerName.trim()) {
      alert('Por favor ingresa tu nombre');
      return;
    }
    
    try {
      if (settings.soundEnabled) {
        playStartSound();
      }
    } catch (error) {
      console.error('Error playing start sound:', error);
    }
    
    if (!customMode) {
      try {
        setCurrentPath(generateRandomPath(difficulty));
      } catch (error) {
        console.error('Error generating path:', error);
        // Generar un path simple por defecto
        setCurrentPath([
          { row: 0, col: 0, color: '#FF6B6B' },
          { row: 1, col: 1, color: '#4ECDC4' }
        ]);
      }
    }
    
    setPlayerPath([]);
    setGameState('setup');
  };

  const showPath = () => {
    setGameState('showing');
    setTimer(showTime);
    
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          setGameState('playing');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCellClick = (row, col) => {
    if (gameState !== 'playing' && !customMode) return;
    
    if (customMode) {
      const existingIndex = currentPath.findIndex(cell => cell.row === row && cell.col === col);
      
      if (existingIndex !== -1) {
        setCurrentPath(prev => prev.filter((_, index) => index !== existingIndex));
      } else {
        const selectedColor = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
                               '#DDA0DD', '#FF8C94', '#FF9F43', '#6C5CE7', '#A29BFE'][Math.floor(Math.random() * 10)];
        setCurrentPath(prev => [...prev, { row, col, color: selectedColor }]);
      }
    } else {
      const stepIndex = playerPath.length;
      if (stepIndex >= currentPath.length) return;
      
      const expectedStep = currentPath[stepIndex];
      const isCorrect = expectedStep.row === row && expectedStep.col === col;
      
      if (isCorrect) {
        const newPlayerPath = [...playerPath, { row, col, color: expectedStep.color, correct: true }];
        setPlayerPath(newPlayerPath);
        
        if (newPlayerPath.length === currentPath.length) {
          const score = calculateScore(newPlayerPath, currentPath, difficulty);
          const newScore = {
            id: Date.now() + Math.random(),
            name: playerName,
            score: score,
            difficulty: difficulty,
            pathLength: currentPath.length,
            date: new Date().toLocaleString(),
            completedAt: Date.now()
          };
          
          setScores(prev => {
            const updatedScores = [...prev, newScore];
            // Verificar logros después de agregar el puntaje
            try {
              const newAchievements = checkAchievements(updatedScores, achievements);
              if (newAchievements.length > achievements.length) {
                setAchievements(newAchievements);
              }
            } catch (error) {
              console.error('Error checking achievements:', error);
            }
            return updatedScores;
          });
          
          try {
            if (settings.soundEnabled) {
              playWinSound();
            }
          } catch (error) {
            console.error('Error playing win sound:', error);
          }
          
          setGameState('result');
        }
      } else {
        setPlayerPath(prev => [...prev, { row, col, color: '#FF0000', correct: false }]);
        
        try {
          if (settings.soundEnabled) {
            playLoseSound();
          }
        } catch (error) {
          console.error('Error playing lose sound:', error);
        }
        
        setTimeout(() => {
          const score = calculateScore(playerPath, currentPath, difficulty);
          const newScore = {
            id: Date.now() + Math.random(),
            name: playerName,
            score: score,
            difficulty: difficulty,
            pathLength: currentPath.length,
            date: new Date().toLocaleString(),
            completedAt: Date.now()
          };
          
          setScores(prev => {
            const updatedScores = [...prev, newScore];
            // Verificar logros después de agregar el puntaje
            try {
              const newAchievements = checkAchievements(updatedScores, achievements);
              if (newAchievements.length > achievements.length) {
                setAchievements(newAchievements);
              }
            } catch (error) {
              console.error('Error checking achievements:', error);
            }
            return updatedScores;
          });
          
          setGameState('result');
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setGameState('welcome');
    setCurrentPath([]);
    setPlayerPath([]);
    setCustomMode(false);
    setTimer(0);
  };

  const handleExportScores = () => {
    try {
      exportScores(scores);
    } catch (error) {
      console.error('Error exporting scores:', error);
      alert('Error al exportar puntajes');
    }
  };

  const handleImportScores = (event) => {
    try {
      importScores(event, setScores);
    } catch (error) {
      console.error('Error importing scores:', error);
      alert('Error al importar puntajes');
    }
  };

  const handleClearScores = () => {
    try {
      clearAllScores(setScores);
    } catch (error) {
      console.error('Error clearing scores:', error);
      alert('Error al limpiar puntajes');
    }
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  const commonProps = {
    currentPath,
    playerPath,
    gameState,
    handleCellClick,
    resetGame,
    settings
  };

  // Aplicar tema al body
  useEffect(() => {
    try {
      document.body.className = `theme-${settings.theme}`;
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [settings.theme]);

  switch (gameState) {
    case 'welcome':
      return (
        <WelcomeScreen
          playerName={playerName}
          setPlayerName={setPlayerName}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          showTime={showTime}
          setShowTime={setShowTime}
          customMode={customMode}
          setCustomMode={setCustomMode}
          startGame={startGame}
          handleExportScores={handleExportScores}
          handleImportScores={handleImportScores}
          handleClearScores={handleClearScores}
          fileInputRef={fileInputRef}
          scores={scores}
          settings={settings}
          setGameState={setGameState}
          achievements={achievements}
        />
      );
    
    case 'setup':
      return (
        <SetupScreen
          {...commonProps}
          playerName={playerName}
          difficulty={difficulty}
          customMode={customMode}
          setCustomMode={setCustomMode}
          setCurrentPath={setCurrentPath}
          showPath={showPath}
        />
      );
    
    case 'showing':
      return (
        <ShowingScreen
          {...commonProps}
          timer={timer}
        />
      );
    
    case 'playing':
      return (
        <PlayingScreen
          {...commonProps}
        />
      );
    
    case 'result':
      return (
        <ResultScreen
          {...commonProps}
          scores={scores}
          setGameState={setGameState}
          setCurrentPath={setCurrentPath}
          setPlayerPath={setPlayerPath}
          generateRandomPath={() => generateRandomPath(difficulty)}
          achievements={achievements}
        />
      );

    case 'settings':
      return (
        <SettingsScreen
          settings={settings}
          updateSettings={updateSettings}
          setGameState={setGameState}
        />
      );

    case 'achievements':
      return (
        <AchievementsScreen
          achievements={achievements}
          scores={scores}
          setGameState={setGameState}
        />
      );
    
    default:
      return null;
  }
};

export default MemoryPathGame;