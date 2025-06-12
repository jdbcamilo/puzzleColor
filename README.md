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
│   │   ├── ArchievementsScreen.jsx      # Sistema de Logros
│   │   ├── WelcomeScreen.jsx            # Pantalla principal
│   │   ├── SetupScreen.jsx              # Configuración del juego
│   │   ├── SettingsScreen.jsx           # Configuracion de los temas
│   │   ├── ShowingScreen.jsx            # Fase de memorización
│   │   ├── PlayingScreen.jsx            # Fase de juego
│   │   ├── ResultScreen.jsx             # Resultados
│   │   └── GameGrid.jsx                 # Grilla del juego
│   ├── utils/
│   │   ├── gameUtils.js         # Lógica del juego
│   │   └── fileUtils.js         # Manejo de archivos
│   ├── styles/
│   │   └── App.css              # Estilos principales
│   ├── MemoryPathGame.jsx       # Componente principal
│   └── main.jsx                 # Punto de entrada
├── package.json
├── vite.config.js
└── README.md
```

## 🎮 Características Técnicas

### Gestión de Estado
- **useState**: Manejo de estado local de componentes
- **useEffect**: Efectos secundarios y ciclo de vida
- **useRef**: Referencias a elementos DOM

### Persistencia de Datos
- **Auto-guardado**: Los puntajes se guardan automáticamente


### Responsive Design
- **Breakpoints**: 768px (móvil), 1024px (tablet)
- **Grid adaptativo**: La grilla se ajusta al tamaño de pantalla
- **Botones táctiles**: Optimizados para dispositivos móviles

## 📊 Funcionalidades de Datos
💾 Los puntajes se guardan localmente en el navegador (almacenamiento local).
No se utiliza base de datos externa ni servidor: todo funciona directamente desde esta página alojada en GitHub.

### Estadísticas
- Total de partidas jugadas
- Mejor puntaje alcanzado
- Promedio de puntuación
- Distribución por dificultad

## 🎨 Diseño Visual

### Paleta de Colores
- **Gradientes dinámicos**: Cada pantalla tiene su gradiente único
- **Colores de juego**: 10 colores vibrantes predefinidos
- **Retroalimentación visual**: Verde para correcto, rojo para incorrecto

### Animaciones
- **Transiciones suaves**: 0.2-0.3 segundos
- **Efectos hover**: Elevación y escalado
- **Progreso visual**: Barras de progreso animadas

### Iconografía
- **Lucide React**: Iconos consistentes y modernos
- **Contextuales**: Cada acción tiene su icono apropiado
- **Escalables**: Adaptables a diferentes tamaños

## 🔧 Configuración Avanzada

### Variables de Entorno
```bash
# .env
VITE_APP_TITLE="Juego de Memoria"
VITE_APP_VERSION="1.0.0"
```

### Personalización de Dificultades
```javascript
// En gameUtils.js
const DIFFICULTIES = {
  easy: { steps: 4, name: 'Fácil', bonus: 1 },
  medium: { steps: 6, name: 'Medio', bonus: 1.5 },
  hard: { steps: 8, name: 'Difícil', bonus: 2 }
};
```

### Colores Personalizados
```javascript
// En gameUtils.js
const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', 
  '#96CEB4', '#FFEAA7', '#DDA0DD',
  // Agrega más colores aquí
];
```

## ✨ Próximas Funcionalidades

- [ ] **Modo multijugador**: Competencia en tiempo real
- [ ] **Temas visuales**: Diferentes esquemas de colores
- [ ] **Efectos de sonido**: Retroalimentación auditiva
- [ ] **Logros**: Sistema de achievements
- [ ] **Tutorial interactivo**: Guía paso a paso
- [ ] **Estadísticas avanzadas**: Gráficos de progreso

## 🐛 Solución de Problemas

### Problemas Comunes

**El juego no carga**
- Verifica que Node.js esté instalado correctamente
- Ejecuta `npm install` para instalar dependencias

**Los puntajes no se guardan**
- Verifica que localStorage esté habilitado en el navegador
- Comprueba la consola del navegador por errores



## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

- **Desarrollador**: JuanDev
- **GitHub**: https://github.com/jdcamilo


**¡Diviértete jugando y desafiando tu memoria!** 🧠✨