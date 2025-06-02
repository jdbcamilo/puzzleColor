let audioContext;
let gainNode;

const initAudio = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = 0.5; 
  }
};

const createTone = (frequency, duration, type = 'sine') => {
  initAudio();
  
  const oscillator = audioContext.createOscillator();
  const envelope = audioContext.createGain();
  
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  
  envelope.gain.setValueAtTime(0, audioContext.currentTime);
  envelope.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
  envelope.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.connect(envelope);
  envelope.connect(gainNode);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

const createToneSequence = (notes, noteDuration = 0.2, gap = 0.05) => {
  initAudio();
  
  notes.forEach((frequency, index) => {
    const startTime = index * (noteDuration + gap);
    setTimeout(() => {
      createTone(frequency, noteDuration);
    }, startTime * 1000);
  });
};

export const playWinSound = () => {
  const victoryNotes = [
    523.25, // C5
    659.25, // E5
    783.99, // G5
    1046.50 // C6
  ];
  createToneSequence(victoryNotes, 0.15, 0.05);
};

export const playLoseSound = () => {
  const defeatNotes = [
    392.00, // G4
    349.23, // F4
    311.13, // D#4
    261.63  // C4
  ];
  createToneSequence(defeatNotes, 0.2, 0.1);
};

export const playStartSound = () => {
  const startNotes = [
    523.25, // C5
    659.25, // E5
    523.25  // C5
  ];
  createToneSequence(startNotes, 0.1, 0.05);
};

export const playClickSound = () => {
  createTone(800, 0.1, 'square');
};

export const playAchievementSound = () => {
  const achievementNotes = [
    659.25, // E5
    783.99, // G5
    987.77, // B5
    1318.51 // E6
  ];
  createToneSequence(achievementNotes, 0.12, 0.03);
};

export const setVolume = (volume) => {
  initAudio();
  if (gainNode) {
    gainNode.gain.value = Math.max(0, Math.min(1, volume));
  }
};

const createNoise = (duration) => {
  initAudio();
  
  const bufferSize = audioContext.sampleRate * duration;
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const output = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  
  const noise = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const envelope = audioContext.createGain();
  
  filter.type = 'lowpass';
  filter.frequency.value = 1000;
  
  envelope.gain.setValueAtTime(0.1, audioContext.currentTime);
  envelope.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  noise.buffer = buffer;
  noise.connect(filter);
  filter.connect(envelope);
  envelope.connect(gainNode);
  
  noise.start(audioContext.currentTime);
  noise.stop(audioContext.currentTime + duration);
};

// Sonido de error (ruido filtrado)
export const playErrorSound = () => {
  createNoise(0.3);
};