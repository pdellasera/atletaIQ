# AthleteIQ - Sistema de Gestión Deportiva

Sistema integral de gestión para atletas y competencias deportivas con interfaz responsive optimizada para móvil y escritorio.

## 🚀 Características

- **Responsive Design**: Interfaz adaptativa para móvil y escritorio
- **Dashboard Interactivo**: Métricas en tiempo real con gráficos ECharts
- **Gestión de Atletas**: Seguimiento completo de rendimiento
- **Competencias**: Configuración y gestión de eventos deportivos
- **Sistema de Usuarios**: Roles y permisos granulares
- **PWA Ready**: Optimizado para Progressive Web App

## 🛠️ Tecnologías

- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Navegación SPA
- **Tailwind CSS** - Estilos utilitarios
- **ECharts** - Gráficos interactivos
- **Lucide React** - Iconos

## 📱 Responsive Features

### Mobile
- Bottom navigation optimizada para touch
- Drawer lateral para navegación secundaria
- Cards compactas optimizadas para pantallas pequeñas
- Gestos táctiles y animaciones suaves

### Desktop
- Sidebar colapsable
- Header con búsqueda integrada
- Layout de múltiples columnas
- Tooltips y hover states

## 🚀 Instalación y Uso

\`\`\`bash
# Clonar el repositorio
git clone [repository-url]

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base de UI
│   ├── charts/         # Componentes de gráficos
│   └── layouts/        # Layouts principales
├── pages/              # Páginas de la aplicación
├── hooks/              # Custom hooks
└── App.tsx             # Componente principal
\`\`\`

## 🎯 Páginas Principales

- **Dashboard** (`/`) - Vista general con métricas y gráficos
- **Configuración** (`/configuracion`) - Gestión del sistema
- **Crear Cuenta** (`/configuracion/crear-cuenta`) - Registro de usuarios
- **Crear Juego** (`/configuracion/crear-juego`) - Configuración de competencias

## 🔧 Configuración

### Variables CSS Personalizadas
El sistema utiliza variables CSS para temas y colores que pueden ser personalizadas en `src/App.css`.

### Responsive Breakpoints
- Mobile: `max-width: 768px`
- Tablet: `769px - 1024px`
- Desktop: `min-width: 1025px`

## 📊 Funcionalidades del Dashboard

- **Estadísticas Rápidas**: Atletas activos, competencias, medallas
- **Gráficos Interactivos**: Rendimiento histórico, distribución de competencias
- **Gestión de Atletas**: Fichas técnicas con métricas de rendimiento
- **Presupuestos**: Seguimiento de aportes económicos
- **Logística**: Gestión de roles y tareas

## 🎨 Sistema de Diseño

- **Colores Primarios**: Orange-600 (#ea580c)
- **Tipografía**: Sistema de fuentes nativo
- **Espaciado**: Sistema basado en Tailwind (4px base)
- **Bordes**: Radius consistente (8px base)

## 🔒 Gestión de Usuarios

- **Roles**: Administrador, Entrenador, Analista, Coordinador
- **Permisos Granulares**: Control específico por funcionalidad
- **Autenticación**: Sistema de sesiones (ready para implementar)

## 📈 Performance

- **Code Splitting**: Carga optimizada por rutas
- **Lazy Loading**: Componentes bajo demanda
- **Bundle Optimization**: Vite optimizations
- **Mobile First**: Carga prioritaria para móvil

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
