# Property Listings Application

A responsive React-based property rental platform with search capabilities, user authentication, and interactive map integration.

## 🌟 Features

### Core Functionality
- **Property Listings**: Browse and view detailed property information
- **Interactive Map**: Leaflet-based map with property markers and clustering
- **Search**: Debounced search with city-based filtering
- **User Authentication**: Login/logout with session management
- **Favorites System**: Save and manage favorite properties
- **Image Carousel**: Property image carousel/gallery with lazy loading
- **Responsive Design**: Mobile-first design with tablet and desktop layouts

### Technical Features
- **Code Splitting**: Lazy-loaded route components for optimal performance
- **Loading Skeletons**: Skeleton screens for better UX during loading states
- **Multi-tab Synchronization**: Session and favorites sync across browser tabs
- **Theme Support**: Dark/light theme toggle with smooth transitions
- **TypeScript**: Full type safety throughout the application
- **Modular Architecture**: Centralized constants, utilities, and context management
- **Docker Support**: Production and development containerization
- **Advanced Form Validation**: Real-time email validation with feedback

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ or Docker
- npm or yarn package manager

### Option 1: Docker

**Development Environment (with hot reload):**
```bash
# Clone the repository
git clone <repository-url>
cd senior-front-end-developer-exercise

# Start development server
docker-compose up app-dev

# Access at http://localhost:3001
```

**Production Environment:**
```bash
# Start production server
docker-compose up app

# Access at http://localhost:8080
```

### Option 2: Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3000
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── icons/           # Icon components (FavoriteIcon)
│   ├── ImageCarousel/   # Property image carousel
│   ├── PropertyCard/    # Property listing cards
│   ├── SearchBar/       # Debounced search component
│   ├── ThemeToggle/     # Dark/light mode toggle
│   └── ...
├── context/             # React Context providers
│   ├── AuthContext.tsx  # Authentication management
│   ├── FavoritesContext.tsx # Favorites management
│   └── ThemeContext.tsx # Theme management
├── pages/               # Page components
│   ├── Dashboard/       # User dashboard
│   ├── Login.tsx        # Authentication page
│   ├── PropertyDetail/ # Property details page
│   └── PropertyListing/ # Main listings page
├── constants/           # Centralized configuration
├── utils/               # Utility functions
│   ├── localStorage.ts  # Type-safe localStorage wrapper
│   ├── favoritesStorage.ts # Favorites persistence
│   └── performance.ts   # Performance utilities
├── types/               # TypeScript type definitions
└── styles/              # Global styles and variables
```

## 🔧 Available Scripts

```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run test suite
npm run analyze    # Analyze bundle size
```

## 🎯 Key Improvements Implemented

### Performance Optimizations
- **Debounced Search**: 300ms debounce prevents excessive API calls
- **Code Splitting on Routes**: Lazy loading of page components
- **Image Lazy Loading**: Progressive image loading in carousels
- **Bundle Size Optimization**: Webpack analysis and optimization

### Code Quality Enhancements
- **Centralized Constants**: All configuration moved to `src/constants/`
- **TypeScript Integration**: Full type safety with proper interfaces
- **Modular Components**: Clean separation of concerns

### User Experience Improvements
- **Loading Skeletons**: Skeleton screens for better perceived performance
- **Smooth Animations and Transitions**: Polished UI interactions
- **Mobile-First Design**: Responsive layouts for all screen sizes
- **Dark/Light Theme Toggle**: Persistent theme preferences with smooth transitions
- **Multi-tab Sync**: Session and favorites sync across browser tabs
- **Advanced Form Validation**: Real-time feedback for email validation
- **Basic Accessibility**: ARIA labels and keyboard navigation for key components

### Architecture Improvements
- **Context Management**: Proper state management with React Context
- **Utility Functions**: Reusable, typed utility functions
- **Component Organization**: Logical folder structure and imports
- **Docker Integration**: Both development and production containers

## 🧪 Testing

The application includes basic testing:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage
```

Current test coverage:
- ✅ **Favorites functionality**: Comprehensive testing of favorites storage utilities

## 🐳 Docker Configuration

### Development Container
- **Port**: 3001
- **Features**: Hot reload, volume mounting
- **Environment**: Development optimized

### Production Container
- **Port**: 8080
- **Features**: Static file serving, optimized build
- **Environment**: Production optimized

## 🔐 Authentication

The application includes a mock authentication system:
- **Default Users**: Pre-configured user profiles
- **Session Management**: Persistent login state
- **Multi-tab Sync**: Automatic logout/login across tabs
- **Protected Routes**: Dashboard requires authentication


## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Features adapt across devices:
- Navigation collapses to hamburger menu
- Search bar integrates into mobile menu
- Image carousels optimize for touch interaction
- Maps adjust for mobile interaction

## 🎨 Theming

Built-in theme system:
- **Light Mode**: Default bright theme
- **Dark Mode**: Dark theme for low-light environments
- **Persistent**: Theme choice saved across sessions

## 🔧 Configuration

Key configuration files:
- **Constants**: `src/constants/index.ts`
- **Docker**: `docker-compose.yml`, `Dockerfile`
- **TypeScript**: `tsconfig.json`
- **Styles**: `src/styles/_variables.scss`

## 🚀 Deployment

The application is production-ready with:
- **Optimized Builds**: Minified and compressed assets
- **Docker Support**: Containerized deployment


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙋‍♂️ Support

For questions or support, please open an issue in the repository.