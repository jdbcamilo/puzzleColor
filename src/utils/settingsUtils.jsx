const SETTINGS_KEY = 'memoryPathGame_settings';

export const getDefaultSettings = () => ({
  theme: 'light',
  soundEnabled: true,
  volume: 0.5,
  animations: true,
  autoSave: true
});

export const loadSettings = () => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      const parsedSettings = JSON.parse(saved);
      // Merge with defaults to handle new settings
      return { ...getDefaultSettings(), ...parsedSettings };
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
  return getDefaultSettings();
};

export const saveSettings = (settings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const resetSettings = () => {
  try {
    localStorage.removeItem(SETTINGS_KEY);
  } catch (error) {
    console.error('Error resetting settings:', error);
  }
  return getDefaultSettings();
};