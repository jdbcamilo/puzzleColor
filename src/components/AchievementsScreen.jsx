import React from 'react';
import { 
  getAchievementDefinitions, 
  getAchievementsByCategory, 
  getAchievementProgress 
} from '../utils/achievementsUtils';

const AchievementsScreen = ({ achievements, scores, setGameState, settings = { theme: 'light' } }) => {
  const allAchievements = getAchievementDefinitions();
  const unlockedIds = new Set(achievements.map(a => a.id));
  const categorizedAchievements = getAchievementsByCategory(allAchievements);

  
  const categoryNames = {
    inicio: '🎮 Primeros Pasos',
    rendimiento: '⭐ Rendimiento',
    persistencia: '🏆 Persistencia',
    puntuación: '🎯 Puntuación',
    racha: '🔥 Rachas',
    velocidad: '⚡ Velocidad',
    dificultad: '🏔️ Dificultad',
    especial: '👑 Especiales',
    meta: '📚 Meta'
  };

  // Función para obtener estilos del tema
  const getThemeStyles = () => {
    const themeStyles = {
      light: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        cardBg: 'rgba(255,255,255,0.95)',
        textPrimary: '#4a5568',
        textSecondary: '#64748b',
        border: '#e2e8f0',
        achievementCardBg: 'rgba(255,255,255,0.9)',
        achievementCardBorder: '#e2e8f0',
        progressBg: '#f1f5f9',
        progressFill: '#667eea'
      },
      dark: {
        background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
        cardBg: 'rgba(45,55,72,0.95)',
        textPrimary: '#e2e8f0',
        textSecondary: '#a0aec0',
        border: '#4a5568',
        achievementCardBg: 'rgba(26,32,44,0.9)',
        achievementCardBorder: '#4a5568',
        progressBg: '#2d3748',
        progressFill: '#667eea'
      },
      blue: {
        background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
        cardBg: 'rgba(237,242,247,0.95)',
        textPrimary: '#2d3748',
        textSecondary: '#4a5568',
        border: '#cbd5e0',
        achievementCardBg: 'rgba(247,250,252,0.9)',
        achievementCardBorder: '#cbd5e0',
        progressBg: '#e6fffa',
        progressFill: '#3182ce'
      },
      green: {
        background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
        cardBg: 'rgba(240,253,244,0.95)',
        textPrimary: '#276749',
        textSecondary: '#38a169',
        border: '#9ae6b4',
        achievementCardBg: 'rgba(245,254,247,0.9)',
        achievementCardBorder: '#9ae6b4',
        progressBg: '#f0fff4',
        progressFill: '#38a169'
      },
      purple: {
        background: 'linear-gradient(135deg, #9f7aea 0%, #805ad5 100%)',
        cardBg: 'rgba(250,245,255,0.95)',
        textPrimary: '#553c9a',
        textSecondary: '#6b46c1',
        border: '#c4b5fd',
        achievementCardBg: 'rgba(252,250,255,0.9)',
        achievementCardBorder: '#c4b5fd',
        progressBg: '#faf5ff',
        progressFill: '#805ad5'
      }
    };
    return themeStyles[settings.theme] || themeStyles.light;
  };

  const currentTheme = getThemeStyles();

  const getProgressBar = (achievementId) => {
    const progress = getAchievementProgress(scores, achievementId);
    if (progress <= 0) return null;
    
    return (
      <div style={{
        marginTop: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{
          flex: 1,
          height: '8px',
          background: currentTheme.progressBg,
          borderRadius: '4px',
          overflow: 'hidden',
          border: `1px solid ${currentTheme.border}`
        }}>
          <div style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${currentTheme.progressFill}, ${currentTheme.progressFill}dd)`,
            borderRadius: '3px',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <span style={{
          fontSize: '0.8rem',
          fontWeight: '600',
          color: currentTheme.textSecondary,
          minWidth: '40px'
        }}>
          {Math.round(progress * 100)}%
        </span>
      </div>
    );
  };

  const getTotalProgress = () => {
    const totalAchievements = allAchievements.length;
    const unlockedCount = achievements.length;
    return Math.round((unlockedCount / totalAchievements) * 100);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.background,
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: 'white',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            margin: '0 0 10px 0'
          }}>
            🏆 Logros
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: '300',
            margin: '0 0 20px 0'
          }}>
            Tu progreso y conquistas en el juego
          </p>
          
          {/* Barra de progreso total */}
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '20px',
            padding: '15px 25px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{ 
              color: 'white', 
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              {achievements.length} de {allAchievements.length} desbloqueados
            </span>
            <div style={{
              width: '200px',
              height: '10px',
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '5px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${getTotalProgress()}%`,
                background: 'linear-gradient(90deg, #10B981, #059669)',
                borderRadius: '5px',
                transition: 'width 0.5s ease'
              }} />
            </div>
            <span style={{ 
              color: 'white', 
              fontWeight: '700',
              fontSize: '1rem',
              minWidth: '45px'
            }}>
              {getTotalProgress()}%
            </span>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {[
            { icon: '🎮', value: scores.length, label: 'Juegos Totales', color: '#667eea' },
            { icon: '🏆', value: scores.filter(s => s.score > 0).length, label: 'Juegos Ganados', color: '#10B981' },
            { icon: '🎯', value: Math.max(...scores.map(s => s.score), 0), label: 'Mejor Puntuación', color: '#F59E0B' },
            { icon: '🏅', value: achievements.length, label: 'Logros Desbloqueados', color: '#EF4444' }
          ].map((stat, index) => (
            <div key={index} style={{
              background: currentTheme.cardBg,
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
              border: `1px solid ${currentTheme.border}`,
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                color: stat.color,
                marginBottom: '4px'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: currentTheme.textSecondary,
                fontWeight: '500'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Logros por categorías */}
        <div style={{ marginBottom: '30px' }}>
          {Object.entries(categoryNames).map(([categoryId, categoryName]) => {
            const categoryAchievements = categorizedAchievements[categoryId] || [];
            if (categoryAchievements.length === 0) return null;

            const unlockedInCategory = categoryAchievements.filter(a => unlockedIds.has(a.id)).length;

            return (
              <div key={categoryId} style={{
                background: currentTheme.cardBg,
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '30px',
                marginBottom: '25px',
                boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                border: `1px solid ${currentTheme.border}`
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '25px'
                }}>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: currentTheme.textPrimary,
                    margin: 0
                  }}>
                    {categoryName}
                  </h2>
                  <div style={{
                    background: unlockedInCategory === categoryAchievements.length ? '#10B981' : '#64748b',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {unlockedInCategory}/{categoryAchievements.length}
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '15px'
                }}>
                  {categoryAchievements.map(achievement => {
                    const isUnlocked = unlockedIds.has(achievement.id);
                    const unlockedData = achievements.find(a => a.id === achievement.id);
                    const isNew = unlockedData?.isNew;

                    return (
                      <div key={achievement.id} style={{
                        background: isUnlocked ? currentTheme.achievementCardBg : 'rgba(100,116,139,0.1)',
                        border: `2px solid ${isUnlocked ? '#10B981' : currentTheme.achievementCardBorder}`,
                        borderRadius: '16px',
                        padding: '20px',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        opacity: isUnlocked ? 1 : 0.7,
                        transform: isUnlocked ? 'scale(1)' : 'scale(0.98)',
                        boxShadow: isUnlocked ? '0 8px 16px rgba(16,185,129,0.2)' : '0 4px 8px rgba(0,0,0,0.1)'
                      }}>
                        {isNew && (
                          <div style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '0.7rem',
                            fontWeight: '700',
                            boxShadow: '0 4px 8px rgba(239,68,68,0.4)',
                            animation: 'pulse 2s infinite'
                          }}>
                            ¡NUEVO!
                          </div>
                        )}

                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '15px'
                        }}>
                          <div style={{
                            fontSize: '2.5rem',
                            filter: isUnlocked ? 'none' : 'grayscale(100%)',
                            opacity: isUnlocked ? 1 : 0.5
                          }}>
                            {isUnlocked ? achievement.icon : '🔒'}
                          </div>
                          
                          <div style={{ flex: 1 }}>
                            <h3 style={{
                              fontSize: '1.1rem',
                              fontWeight: '700',
                              color: isUnlocked ? currentTheme.textPrimary : currentTheme.textSecondary,
                              margin: '0 0 8px 0'
                            }}>
                              {achievement.name}
                            </h3>
                            
                            <p style={{
                              fontSize: '0.9rem',
                              color: currentTheme.textSecondary,
                              margin: '0 0 12px 0',
                              lineHeight: '1.4'
                            }}>
                              {achievement.description}
                            </p>
                            
                            {isUnlocked && unlockedData && (
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 12px',
                                background: '#10B98120',
                                borderRadius: '8px',
                                marginTop: '12px'
                              }}>
                                <span style={{ fontSize: '0.9rem' }}>🎉</span>
                                <span style={{
                                  fontSize: '0.8rem',
                                  color: '#059669',
                                  fontWeight: '600'
                                }}>
                                  Desbloqueado: {new Date(unlockedData.unlockedAt).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                            
                            {!isUnlocked && getProgressBar(achievement.id)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón de regreso */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setGameState('welcome')}
            style={{
              padding: '16px 32px',
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
            ← Volver al Menú Principal
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @media (max-width: 768px) {
          .achievements-container {
            padding: 15px !important;
          }
          
          .achievements-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

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

export default AchievementsScreen;