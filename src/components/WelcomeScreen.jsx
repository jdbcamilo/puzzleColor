import React, { useState, useEffect } from 'react';

const WelcomeScreen = ({
  playerName,
  setPlayerName,
  difficulty,
  setDifficulty,
  showTime,
  setShowTime,
  customMode,
  setCustomMode,
  startGame,
  handleExportScores,
  handleImportScores,
  handleClearScores,
  fileInputRef,
  scores = [],
  settings = { theme: 'light' },
  setGameState,
  achievements = []
}) => {
  const [showScores, setShowScores] = useState(false);
  const [showNewAchievements, setShowNewAchievements] = useState(false);
  const [customTime, setCustomTime] = useState(3);
  const [showCustomTime, setShowCustomTime] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es dispositivo móvil
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const getThemeStyles = () => {
    const themeStyles = {
      light: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        cardBg: 'rgba(255,255,255,0.95)',
        textPrimary: '#4a5568',
        textSecondary: '#64748b',
        border: '#e2e8f0'
      },
      dark: {
        background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
        cardBg: 'rgba(45,55,72,0.95)',
        textPrimary: '#e2e8f0',
        textSecondary: '#a0aec0',
        border: '#4a5568'
      },
      blue: {
        background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
        cardBg: 'rgba(237,242,247,0.95)',
        textPrimary: '#2d3748',
        textSecondary: '#4a5568',
        border: '#cbd5e0'
      },
      green: {
        background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
        cardBg: 'rgba(240,253,244,0.95)',
        textPrimary: '#276749',
        textSecondary: '#38a169',
        border: '#9ae6b4'
      },
      purple: {
        background: 'linear-gradient(135deg, #9f7aea 0%, #805ad5 100%)',
        cardBg: 'rgba(250,245,255,0.95)',
        textPrimary: '#553c9a',
        textSecondary: '#6b46c1',
        border: '#c4b5fd'
      }
    };
    return themeStyles[settings.theme] || themeStyles.light;
  };

  const currentTheme = getThemeStyles();
  const newAchievements = achievements.filter(a => a.isNew);

  useEffect(() => {
    if (newAchievements.length > 0) {
      setShowNewAchievements(true);
      setTimeout(() => {
        setShowNewAchievements(false);
      }, 5000);
    }
  }, [newAchievements.length]);

  const getBestScore = () => {
    if (scores.length === 0) return 0;
    return Math.max(...scores.map(s => s.score));
  };

  const getRecentGames = () => {
    return scores.slice(-5).reverse();
  };

  const handleClearScoresWithConfirm = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los puntajes? Esta acción no se puede deshacer.')) {
      handleClearScores();
    }
  };

  const difficultyOptions = [
    { value: 'easy', label: 'Fácil', steps: '4 pasos', color: '#10B981' },
    { value: 'medium', label: 'Medio', steps: '6 pasos', color: '#F59E0B' },
    { value: 'hard', label: 'Difícil', steps: '8 pasos', color: '#EF4444' }
  ];

  const timeOptions = [
    { value: 1, label: '1 seg', icon: '⚡' },
    { value: 2, label: '2 seg', icon: '🚀' },
    { value: 3, label: '3 seg', icon: '⭐' },
    { value: 4, label: '4 seg', icon: '🎯' },
    { value: 5, label: '5 seg', icon: '🏆' },
    { value: 'custom', label: 'Personalizado', icon: '🎨' }
  ];

  const handleTimeSelection = (value) => {
    if (value === 'custom') {
      setShowCustomTime(true);
      setShowTime(customTime);
    } else {
      setShowCustomTime(false);
      setShowTime(value);
    }
  };

  const handleCustomTimeChange = (newTime) => {
    setCustomTime(newTime);
    setShowTime(newTime);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.background, 
      padding: isMobile ? '15px' : '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      overflowX: 'hidden'
    }}>
      {/* Notificación de nuevos logros */}
      {showNewAchievements && newAchievements.length > 0 && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: isMobile ? '10px' : '20px',
          left: isMobile ? '10px' : 'auto',
          background: currentTheme.cardBg, 
          color: currentTheme.textPrimary,
          padding: isMobile ? '15px' : '20px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          zIndex: 1000,
          maxWidth: isMobile ? 'calc(100% - 20px)' : '300px',
          animation: 'slideIn 0.5s ease-out'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: isMobile ? '1rem' : '1.1rem' }}>🏆 ¡Nuevo Logro!</h3>
          {newAchievements.map(achievement => (
            <div key={achievement.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{achievement.icon}</span>
              <div>
                <strong style={{ display: 'block', fontSize: isMobile ? '0.85rem' : '0.9rem' }}>{achievement.name}</strong>
                <p style={{ margin: 0, fontSize: isMobile ? '0.75rem' : '0.8rem', opacity: 0.9 }}>{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '25px' : '40px' }}>
          <h1 style={{
            fontSize: isMobile ? '2.2rem' : '3rem',
            fontWeight: '700',
            color: 'white',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            margin: '0 0 10px 0'
          }}>
            🧠 puzzleColor
          </h1>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: '300',
            margin: 0
          }}>
            ¡Pon a prueba tu memoria visual!
          </p>
        </div>

        {/* Contenido principal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(400px, 1fr) minmax(350px, 400px)',
          gap: isMobile ? '20px' : '30px',
          alignItems: 'start'
        }}>
          {/* Panel de configuración del juego */}
          <div style={{
            background: currentTheme.cardBg,
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: isMobile ? '20px' : '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '1.3rem' : '1.5rem',
              fontWeight: '600',
              marginBottom: isMobile ? '20px' : '25px',
              color: currentTheme.textPrimary,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              🎮 Juego de Memoria
            </h2>

            {/* Nombre del jugador */}
            <div style={{ marginBottom: isMobile ? '20px' : '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: currentTheme.textPrimary,
                marginBottom: '8px'
              }}>
                👤 Nombre del Jugador
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Ingresa tu nombre"
                maxLength={20}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: `2px solid ${currentTheme.border}`,
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  outline: 'none',
                  background: 'white',
                  color: currentTheme.textPrimary
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = currentTheme.border}
              />
            </div>

            {/* Dificultad */}
            <div style={{ marginBottom: isMobile ? '20px' : '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: currentTheme.textPrimary,
                marginBottom: '12px'
              }}>
                🎯 Dificultad
              </label>
              <div style={{ 
                display: 'flex', 
                gap: '8px',
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                {difficultyOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setDifficulty(option.value)}
                    style={{
                      flex: 1,
                      padding: '12px 8px',
                      borderRadius: '12px',
                      border: difficulty === option.value ? `2px solid ${option.color}` : `2px solid ${currentTheme.border}`,
                      background: difficulty === option.value ? `${option.color}15` : 'white',
                      color: difficulty === option.value ? option.color : currentTheme.textPrimary,
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>{option.label}</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{option.steps}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tiempo de visualización */}
            <div style={{ marginBottom: isMobile ? '20px' : '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: currentTheme.textPrimary,
                marginBottom: '12px'
              }}>
                ⏱️ Tiempo de visualización
              </label>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)',
                gap: '6px'
              }}>
                {timeOptions.slice(0, 5).map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleTimeSelection(option.value)}
                    style={{
                      padding: '10px 4px',
                      borderRadius: '10px',
                      border: (showTime === option.value) ? '2px solid #667eea' : `2px solid ${currentTheme.border}`,
                      background: (showTime === option.value) ? '#667eea15' : 'white',
                      color: (showTime === option.value) ? '#667eea' : currentTheme.textPrimary,
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ fontSize: '1rem' }}>{option.icon}</div>
                    <div>{option.label}</div>
                  </button>
                ))}
                
                {/* Botón de tiempo personalizado */}
                <button
                  onClick={() => handleTimeSelection('custom')}
                  style={{
                    padding: '10px 4px',
                    borderRadius: '10px',
                    border: showCustomTime ? '2px solid #667eea' : `2px solid ${currentTheme.border}`,
                    background: showCustomTime ? '#667eea15' : 'white',
                    color: showCustomTime ? '#667eea' : currentTheme.textPrimary,
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gridColumn: isMobile ? 'span 2' : 'auto'
                  }}
                >
                  <div style={{ fontSize: '1rem' }}>🎨</div>
                  <div>Personalizado</div>
                </button>
              </div>
              
              {/* Control de tiempo personalizado */}
              {showCustomTime && (
                <div style={{ 
                  marginTop: '15px',
                  padding: '15px',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: `1px solid ${currentTheme.border}`
                }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: currentTheme.textPrimary,
                    marginBottom: '8px'
                  }}>
                    Tiempo personalizado (segundos):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={customTime}
                    onChange={(e) => handleCustomTimeChange(parseInt(e.target.value) || 1)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: `2px solid ${currentTheme.border}`,
                      fontSize: '1rem',
                      outline: 'none',
                      background: 'white',
                      color: currentTheme.textPrimary,
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = currentTheme.border}
                    placeholder="Ingresa un número del 1 al 60"
                  />
                  <div style={{
                    fontSize: '0.75rem',
                    color: currentTheme.textSecondary,
                    marginTop: '5px'
                  }}>
                    Puedes ingresar cualquier número entre 1 y 60 segundos
                  </div>
                </div>
              )}
            </div>

            {/* Modo personalizado */}
            <div style={{ marginBottom: isMobile ? '25px' : '30px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                padding: '12px',
                borderRadius: '12px',
                background: customMode ? '#667eea15' : '#f8fafc',
                border: '2px solid',
                borderColor: customMode ? '#667eea' : currentTheme.border,
                transition: 'all 0.2s'
              }}>
                <input
                  type="checkbox"
                  checked={customMode}
                  onChange={(e) => setCustomMode(e.target.checked)}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: customMode ? '#667eea' : currentTheme.textPrimary
                }}>
                  🎨 Modo personalizado (crea tu propio camino)
                </span>
              </label>
            </div>

            {/* Botón de inicio */}
            <button
              onClick={startGame}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: 'white',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.2s',
                transform: 'translateY(0)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 24px rgba(102, 126, 234, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 16px rgba(102, 126, 234, 0.3)';
              }}
            >
              🚀 Comenzar Juego
            </button>
          </div>

          {/* Panel de puntajes */}
          <div style={{
            background: currentTheme.cardBg,
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: isMobile ? '20px' : '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '1.3rem' : '1.5rem',
              fontWeight: '600',
              marginBottom: isMobile ? '20px' : '25px',
              color: currentTheme.textPrimary,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              🏆 Top 10 Puntajes
            </h2>

            {/* Estadísticas */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '15px',
              marginBottom: '25px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: 'white',
                padding: '15px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{scores.length}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Total de partidas</div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                color: 'white',
                padding: '15px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{getBestScore()}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Mejor puntaje</div>
              </div>
            </div>

            {/* Lista de puntajes */}
            {scores.length > 0 ? (
              <div>
                <div style={{
                  display: isMobile ? 'none' : 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: currentTheme.textSecondary,
                  borderBottom: `2px solid ${currentTheme.border}`
                }}>
                  <span>Rank</span>
                  <span>Jugador</span>
                  <span>Puntos</span>
                  <span>Dificultad</span>
                  <span>Fecha</span>
                </div>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {scores
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 10)
                    .map((score, index) => (
                      <div
                        key={score.id || index}
                        style={{
                          display: 'flex',
                          flexDirection: isMobile ? 'column' : 'row',
                          justifyContent: isMobile ? 'flex-start' : 'space-between',
                          alignItems: isMobile ? 'flex-start' : 'center',
                          padding: '12px 16px',
                          borderBottom: `1px solid ${currentTheme.border}`,
                          fontSize: '0.85rem',
                          background: index < 3 ? ['#fef7cd', '#fef3c7', '#fed7aa'][index] : 'transparent',
                          gap: isMobile ? '8px' : '0'
                        }}
                      >
                        <div style={{ 
                          fontWeight: '700',
                          color: index < 3 ? ['#92400e', '#92400e', '#9a3412'][index] : currentTheme.textSecondary,
                          minWidth: isMobile ? 'auto' : '40px'
                        }}>
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                        </div>
                        
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          width: isMobile ? '100%' : 'auto',
                          alignItems: 'center'
                        }}>
                          <span style={{ 
                            fontWeight: '600', 
                            color: currentTheme.textPrimary,
                            minWidth: isMobile ? 'auto' : '100px'
                          }}>
                            {score.name}
                          </span>
                          
                          <span style={{ 
                            fontWeight: '700',
                            color: '#10B981',
                            minWidth: isMobile ? '50px' : 'auto',
                            textAlign: isMobile ? 'right' : 'left'
                          }}>
                            {score.score}
                          </span>
                        </div>
                        
                        <div style={{
                          display: 'flex',
                          justifyContent: isMobile ? 'space-between' : 'flex-start',
                          width: isMobile ? '100%' : 'auto',
                          alignItems: 'center',
                          gap: isMobile ? '0' : '10px'
                        }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '0.7rem',
                            fontWeight: '600',
                            background: score.difficulty === 'easy' ? '#dcfce7' : 
                                      score.difficulty === 'medium' ? '#fef3c7' : '#fee2e2',
                            color: score.difficulty === 'easy' ? '#166534' : 
                                  score.difficulty === 'medium' ? '#92400e' : '#991b1b'
                          }}>
                            {score.difficulty === 'easy' ? 'FÁCIL' : 
                            score.difficulty === 'medium' ? 'MEDIO' : 'DIFÍCIL'}
                          </span>
                          
                          <span style={{ 
                            fontSize: '0.75rem', 
                            color: currentTheme.textSecondary,
                            minWidth: isMobile ? '80px' : 'auto',
                            textAlign: isMobile ? 'right' : 'left'
                          }}>
                            {score.date || new Date().toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Resumen de estadísticas */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '15px',
                  marginTop: '15px',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: '700', color: currentTheme.textPrimary }}>
                      {scores.length > 0 ? Math.round(scores.reduce((acc, s) => acc + s.score, 0) / scores.length) : 0}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: currentTheme.textSecondary }}>Promedio</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: '700', color: currentTheme.textPrimary }}>{getBestScore()}</div>
                    <div style={{ fontSize: '0.75rem', color: currentTheme.textSecondary }}>Mejor</div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: currentTheme.textSecondary
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎯</div>
                <p>¡No hay puntajes aún!</p>
                <p style={{ fontSize: '0.9rem' }}>Comienza a jugar para ver tus resultados aquí</p>
              </div>
            )}
          </div>
        </div>

        {/* Navegación y controles adicionales */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: isMobile ? '10px' : '20px',
          marginTop: '30px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setGameState?.('settings')}
            style={{
              padding: isMobile ? '10px 16px' : '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: 'rgba(255,255,255,0.9)',
              color: '#4a5568',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              flex: isMobile ? '1' : 'none',
              minWidth: isMobile ? '140px' : 'auto'
            }}
          >
            ⚙️ Configuración
          </button>
          <button
            onClick={() => setGameState?.('achievements')}
            style={{
              padding: isMobile ? '10px 16px' : '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: 'rgba(255,255,255,0.9)',
              color: '#4a5568',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              position: 'relative',
              flex: isMobile ? '1' : 'none',
              minWidth: isMobile ? '140px' : 'auto'
            }}
          >
            🏆 Logros
            {newAchievements.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#EF4444',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: '700',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {newAchievements.length}
              </span>
            )}
          </button>
          <button
            onClick={handleExportScores}
            style={{
              padding: isMobile ? '10px 16px' : '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: 'rgba(255,255,255,0.9)',
              color: '#4a5568',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              flex: isMobile ? '1' : 'none',
              minWidth: isMobile ? '140px' : 'auto'
            }}
          >
            💾 Exportar
          </button>
          <button
            onClick={handleClearScoresWithConfirm}
            style={{
              padding: isMobile ? '10px 16px' : '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: 'rgba(255,255,255,0.9)',
              color: '#4a5568',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              flex: isMobile ? '1' : 'none',
              minWidth: isMobile ? '140px' : 'auto'
            }}
          >
            🗑️ Limpiar
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .welcome-container {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          .game-title {
            font-size: 2rem !important;
          }
          
          .game-setup-card, .leaderboard-card {
            padding: 20px !important;
          }
        }
        
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #667eea;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #667eea;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;