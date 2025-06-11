# 🎮 Juego de Memoria - Memory Path Game

Un juego interactivo de memoria desarrollado en React donde los jugadores deben recordar y recrear secuencias de colores en una grilla de 8x8. Desafía tu memoria con diferentes niveles de dificultad y compite por el mejor puntaje.

## 🌟 Características Principales

- **Múltiples niveles de dificultad**: Fácil (4 pasos), Medio (6 pasos), Difícil (8 pasos)
- **Modo personalizado**: Crea tus propias secuencias de colores
- **Sistema de puntajes**: Guarda automáticamente los mejores puntajes
- **Tabla de clasificación**: Top 10 con estadísticas detalladas
- **Exportación/Importación**: Respaldo de puntajes en formato CSV
- **Diseño responsive**: Compatible con dispositivos móviles y desktop
- **Interfaz moderna**: Gradientes, animaciones y efectos visuales
- **Temas visuales**: Cambia el esquema de colores desde la configuración
- **Efectos de sonido**: Feedback auditivo durante el juego
- **Sistema de logros**: Desbloquea logros por desempeño o progresión

## 🎯 Cómo Jugar

### Modo Normal
1. **Configuración**: Ingresa tu nombre y selecciona la dificultad
2. **Memorización**: Observa la secuencia de colores que aparece en la grilla
3. **Recreación**: Haz clic en las celdas siguiendo el mismo orden
4. **Puntuación**: Obtén puntos basados en tu precisión y dificultad elegida

### Modo Personalizado
1. Activa el modo personalizado en la pantalla de bienvenida
2. Crea tu propia secuencia haciendo clic en las celdas deseadas
3. Los colores se asignan automáticamente
4. Procede con el juego normalmente

## 🎨 Capturas de Pantalla

### Pantalla Principal
- Formulario de configuración con opciones de juego
- Tabla de clasificación en tiempo real
- Controles de exportación/importación

### Durante el Juego
- Grilla de 8x8 con colores vibrantes
- Contador de progreso visual
- Temporizador para la fase de memorización

### Resultados
- Puntaje detallado con estadísticas
- Top 5 de mejores puntajes
- Opciones para jugar nuevamente

### Temas y Logros
- Selector de temas visuales en pantalla de configuración
- Pantalla de logros con distintivos desbloqueables
- Efectos sonoros al completar acciones clave

## 🏆 Sistema de Puntuación

La puntuación se calcula basada en:
- **Precisión**: Porcentaje de pasos correctos
- **Multiplicador de dificultad**:
  - Fácil: x1.0
  - Medio: x1.5
  - Difícil: x2.0

**Fórmula**: `Puntaje = (Pasos Correctos / Total Pasos) × 100 × Multiplicador`

## 🛠️ Tecnologías Utilizadas

- **React 18.3.1**: Framework principal
- **Lucide React**: Iconografía moderna
- **CSS3**: Estilos con gradientes y animaciones
- **Local Storage**: Persistencia de datos
- **File API**: Exportación/importación de archivos

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos de Instalación
```bash
# Clonar el repositorio
git clone https://github.com/jdbcamilo/puzzleColor

# Navegar al directorio
cd puzzleColor

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

### Scripts Disponibles
- `npm run dev`: Servidor de desarrollo (puerto 3000)
- `npm run build`: Construcción para producción
- `npm run preview`: Vista previa de la construcción
- `npm run lint`: Análisis de código con ESLint

## 📁 Estructura del Proyecto

```
memory-path-game/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ArchievementsScreen.jsx
│   │   ├── WelcomeScreen.jsx
│   │   ├── SetupScreen.jsx
│   │   ├── SettingsScreen.jsx
│   │   ├── ShowingScreen.jsx
│   │   ├── PlayingScreen.jsx
│   │   ├── ResultScreen.jsx
│   │   └── GameGrid.jsx
│   ├── utils/
│   │   ├── gameUtils.js
│   │   └── fileUtils.js
│   ├── styles/
│   │   └── App.css
│   ├── MemoryPathGame.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## 🎮 Características Técnicas

### Gestión de Estado
- **useState**, **useEffect**, **useRef**

### Persistencia de Datos
- **LocalStorage** con respaldo automático
- **Formato CSV** para exportar/importar

### Responsive Design
- **Breakpoints** y **grid adaptativo**
- Botones optimizados para dispositivos móviles

### Temas Visuales y Sonido
- Cambia temas desde configuración
- Efectos sonoros con opción de desactivar

### Sistema de Logros
- Basado en precisión, partidas jugadas y récords

## 📊 Funcionalidades de Datos

💾 Puntajes guardados localmente con estadísticas como:
- Total de partidas
- Promedio de puntuación
- Mejores jugadores

## 🎨 Diseño Visual

- Gradientes, animaciones y retroalimentación visual
- Iconografía con **Lucide React**

## 🔧 Configuración Avanzada

### Variables de Entorno
```bash
# .env
VITE_APP_TITLE="Juego de Memoria"
VITE_APP_VERSION="1.0.0"
```

### Personalización de Dificultades y Colores
```javascript
const DIFFICULTIES = {
  easy: { steps: 4, name: 'Fácil', bonus: 1 },
  medium: { steps: 6, name: 'Medio', bonus: 1.5 },
  hard: { steps: 8, name: 'Difícil', bonus: 2 }
};

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1',
  '#96CEB4', '#FFEAA7', '#DDA0DD',
];
```

## ✨ Próximas Funcionalidades

- [x] Temas visuales
- [x] Efectos de sonido
- [x] Logros
- [ ] Modo multijugador
- [ ] Tutorial interactivo
- [ ] Estadísticas avanzadas

## 🐛 Solución de Problemas

### Problemas Comunes

**El juego no carga**
- Verifica que Node.js esté instalado
- Ejecuta `npm install`

**Los puntajes no se guardan**
- Asegúrate de tener habilitado localStorage
- Verifica la consola por errores

## 📄 Licencia

MIT

## 👥 Contribuciones

1. Fork
2. Crea una rama
3. Haz commit
4. Abre un Pull Request

## 📞 Contacto

**Desarrollador**: JuanDev  
**GitHub**: https://github.com/jdcamilo

**¡Diviértete jugando y desafiando tu memoria!** 🧠✨
