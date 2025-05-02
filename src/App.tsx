import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';
import WorkoutTracker from './components/WorkoutTracker';
import Progress from './components/Progress';
import Navigation from './components/Navigation';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Home from './components/Home';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#1a1a1a',
    },
    h2: {
      fontWeight: 700,
      color: '#1a1a1a',
    },
    h3: {
      fontWeight: 700,
      color: '#1a1a1a',
    },
    h4: {
      fontWeight: 700,
      color: '#1a1a1a',
    },
    h5: {
      fontWeight: 600,
      color: '#1a1a1a',
    },
    h6: {
      fontWeight: 600,
      color: '#1a1a1a',
    },
    body1: {
      color: '#1a1a1a',
    },
    body2: {
      color: '#666666',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(33, 150, 243, 0.95)',
          backdropFilter: 'blur(10px)',
          '& .MuiTypography-root': {
            color: '#ffffff',
          },
          '& .MuiButton-root': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-colorTextSecondary': {
            color: '#666666',
          },
        },
      },
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setActiveTab('home');
  };

  const handleGetStarted = () => {
    if (!user) {
      setUser(null);
    } else {
      setActiveTab('dashboard');
    }
  };

  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            '&::before': {
              content: '""',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.4)',
              zIndex: 0,
            },
          }}
        >
          <Auth onLogin={handleLogin} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at top right, rgba(33, 150, 243, 0.1), transparent 70%), radial-gradient(circle at bottom left, rgba(245, 0, 87, 0.1), transparent 70%)',
            zIndex: 0,
          },
        }}
      >
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            position: 'relative',
            zIndex: 1,
            mt: 8,
          }}
        >
          <Container maxWidth="lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'home' && <Home onGetStarted={handleGetStarted} />}
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'workout' && <WorkoutTracker />}
                {activeTab === 'progress' && <Progress />}
                {activeTab === 'profile' && <Profile user={user} onLogout={handleLogout} />}
              </motion.div>
            </AnimatePresence>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App; 