import React, { useState, useRef, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import SetupScreen from './components/SetupScreen';
import ShowingScreen from './components/ShowingScreen';
import PlayingScreen from './components/PlayingScreen';
import ResultScreen from './components/ResultScreen';
import SettingsScreen from './components/SettingsScreen';
import AchievementsScreen from './components/AchievementsScreen';
import { generateRandomPath, calculateScore } from './utils/gameUtils';
import { 
  exportScores, 
  importScores, 
  saveScoresToLocal, 
  loadScoresFromLocal, 
  clearAllScores,
  createAutoBackup 
} from './utils/fileUtils';
import { 
  loadSettings, 
  saveSettings, 
  getDefaultSettings 
} from './utils/settingsUtils';
import { 
  loadAchievements, 
  saveAchievements, 
  checkAchievements 
} from './utils/achievementsUtils.jsx';
import { 
  playWinSound, 
  playLoseSound, 
  playStartSound 
} from './utils/soundUtils';
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
    const savedScores = loadScoresFromLocal();
    const savedSettings = loadSettings();
    const savedAchievements = loadAchievements();
    
    setScores(savedScores);
    setSettings(savedSettings);
    setAchievements(savedAchievements);
  }, []);

  // Guardar automáticamente cuando cambian los puntajes
  useEffect(() => {
    if (scores.length > 0) {
      saveScoresToLocal(scores);
    }
  }, [scores]);

  // Guardar configuración cuando cambia
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // Guardar logros cuando cambian
  useEffect(() => {
    saveAchievements(achievements);
  }, [achievements]);

  // Detectar cuando se va a cerrar/recargar la página
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (scores.length > 0) {
        saveScoresToLocal(scores);
        // Crear respaldo automático si hay muchos puntajes
        if (scores.length >= 10) {
          createAutoBackup(scores);
        }
      }
      saveSettings(settings);
      saveAchievements(achievements);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (scores.length > 0) {
          saveScoresToLocal(scores);
        }
        saveSettings(settings);
        saveAchievements(achievements);
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
    
    if (settings.soundEnabled) {
      playStartSound();
    }
    
    if (!customMode) {
      setCurrentPath(generateRandomPath(difficulty));
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
            const newAchievements = checkAchievements(updatedScores, achievements);
            if (newAchievements.length > achievements.length) {
              setAchievements(newAchievements);
            }
            return updatedScores;
          });
          
          if (settings.soundEnabled) {
            playWinSound();
          }
          
          setGameState('result');
        }
      } else {
        setPlayerPath(prev => [...prev, { row, col, color: '#FF0000', correct: false }]);
        
        if (settings.soundEnabled) {
          playLoseSound();
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
            const newAchievements = checkAchievements(updatedScores, achievements);
            if (newAchievements.length > achievements.length) {
              setAchievements(newAchievements);
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
    exportScores(scores);
  };

  const handleImportScores = (event) => {
    importScores(event, setScores);
  };

  const handleClearScores = () => {
    clearAllScores(setScores);
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
    document.body.className = `theme-${settings.theme}`;
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