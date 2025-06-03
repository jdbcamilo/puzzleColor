import React from 'react';
import { setVolume } from '../utils/soundUtils';

const SettingsScreen = ({ settings, updateSettings, setGameState }) => {
  const handleThemeChange = (theme) => {
    updateSettings({ ...settings, theme });
  };

  const handleSoundToggle = () => {
    updateSettings({ ...settings, soundEnabled: !settings.soundEnabled });
  };

  const handleVolumeChange = (e) => {
    const volume = parseFloat(e.target.value);
    updateSettings({ ...settings, volume });
    setVolume(volume);
  };

  const handleAnimationsToggle = () => {
    updateSettings({ ...settings, animations: !settings.animations });
  };

  const handleAutoSaveToggle = () => {
    updateSettings({ ...settings, autoSave: !settings.autoSave });
  };



  const handleCustomTimeChange = (e) => {
    const customTime = parseFloat(e.target.value);
    updateSettings({ ...settings, customTime });
  };

  const themes = [
    { id: 'light', name: 'Claro', icon: '☀️' },
    { id: 'dark', name: 'Oscuro', icon: '🌙' },
    { id: 'blue', name: 'Azul', icon: '🌊' },
    { id: 'green', name: 'Verde', icon: '🌿' },
    { id: 'purple', name: 'Morado', icon: '🔮' }
  ];

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

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.background,
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: 'white',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            margin: '0 0 10px 0'
          }}>
            ⚙️ Configuración
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: '300',
            margin: 0
          }}>
            Personaliza tu experiencia de juego
          </p>
        </div>

        <div style={{
          background: currentTheme.cardBg,
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          {/* Sección de Apariencia */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '20px',
              color: currentTheme.textPrimary,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              🎨 Apariencia
            </h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: currentTheme.textPrimary,
                marginBottom: '12px'
              }}>
                Tema:
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {themes.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    style={{
                      flex: '1',
                      minWidth: '120px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: settings.theme === theme.id ? '2px solid #667eea' : `2px solid ${currentTheme.border}`,
                      background: settings.theme === theme.id ? '#667eea15' : 'white',
                      color: settings.theme === theme.id ? '#667eea' : currentTheme.textPrimary,
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{theme.icon}</span>
                    <span>{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              padding: '12px',
              borderRadius: '12px',
              background: settings.animations ? '#667eea15' : currentTheme.cardBg,
              border: '2px solid',
              borderColor: settings.animations ? '#667eea' : currentTheme.border,
              transition: 'all 0.2s'
            }}>
              <input
                type="checkbox"
                checked={settings.animations}
                onChange={handleAnimationsToggle}
                style={{ transform: 'scale(1.2)' }}
              />
              <div>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: settings.animations ? '#667eea' : currentTheme.textPrimary,
                  display: 'block'
                }}>
                  ✨ Animaciones
                </span>
                <span style={{
                  fontSize: '0.8rem',
                  color: currentTheme.textSecondary
                }}>
                  Habilitar efectos de transición y animaciones
                </span>
              </div>
            </label>
          </div>

          {/* Sección de Audio */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '20px',
              color: currentTheme.textPrimary,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              🔊 Audio
            </h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                padding: '12px',
                borderRadius: '12px',
                background: settings.soundEnabled ? '#667eea15' : currentTheme.cardBg,
                border: '2px solid',
                borderColor: settings.soundEnabled ? '#667eea' : currentTheme.border,
                transition: 'all 0.2s'
              }}>
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={handleSoundToggle}
                  style={{ transform: 'scale(1.2)' }}
                />
                <div>
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: settings.soundEnabled ? '#667eea' : currentTheme.textPrimary,
                    display: 'block'
                  }}>
                    Efectos de sonido
                  </span>
                  <span style={{
                    fontSize: '0.8rem',
                    color: currentTheme.textSecondary
                  }}>
                    Reproducir sonidos al ganar, perder e iniciar juegos
                  </span>
                </div>
              </label>
            </div>
            
            {settings.soundEnabled && (
              <div style={{
                padding: '16px',
                background: '#f8fafc',
                borderRadius: '12px',
                border: `2px solid ${currentTheme.border}`
              }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: currentTheme.textPrimary,
                  marginBottom: '8px'
                }}>
                  Volumen:
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span>🔈</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.volume}
                    onChange={handleVolumeChange}
                    style={{
                      flex: '1',
                      height: '6px',
                      borderRadius: '3px',
                      background: '#e2e8f0',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <span>🔊</span>
                  <span style={{
                    minWidth: '40px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: currentTheme.textPrimary
                  }}>
                    {Math.round(settings.volume * 100)}%
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Sección de Datos */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '20px',
              color: currentTheme.textPrimary,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              💾 Datos
            </h2>
            
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              padding: '12px',
              borderRadius: '12px',
              background: settings.autoSave ? '#667eea15' : currentTheme.cardBg,
              border: '2px solid',
              borderColor: settings.autoSave ? '#667eea' : currentTheme.border,
              transition: 'all 0.2s'
            }}>
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={handleAutoSaveToggle}
                style={{ transform: 'scale(1.2)' }}
              />
              <div>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: settings.autoSave ? '#667eea' : currentTheme.textPrimary,
                  display: 'block'
                }}>
                  Guardado automático
                </span>
                <span style={{
                  fontSize: '0.8rem',
                  color: currentTheme.textSecondary
                }}>
                  Guardar automáticamente puntuaciones y configuración
                </span>
              </div>
            </label>
          </div>

          {/* Botón de vuelta */}
          <button
            onClick={() => setGameState('welcome')}
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
            ← Volver al Menú Principal
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;