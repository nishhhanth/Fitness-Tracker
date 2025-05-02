import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  FitnessCenter as FitnessCenterIcon,
  ShowChart as ShowChartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, value: 'home' },
    { text: 'Dashboard', icon: <DashboardIcon />, value: 'dashboard' },
    { text: 'Workout Tracker', icon: <FitnessCenterIcon />, value: 'workout' },
    { text: 'Progress', icon: <ShowChartIcon />, value: 'progress' },
    { text: 'Profile', icon: <PersonIcon />, value: 'profile' },
  ];

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    handleMobileMenuClose();
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
          }}
        >
          <FitnessCenterIcon sx={{ mr: 1 }} />
          Fitness Tracker
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                },
              }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.value}
                  onClick={() => handleTabChange(item.value)}
                  selected={activeTab === item.value}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {item.icon}
                    <Typography sx={{ ml: 1 }}>{item.text}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {menuItems.map((item) => (
              <motion.div
                key={item.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  color="inherit"
                  startIcon={item.icon}
                  onClick={() => handleTabChange(item.value)}
                  sx={{
                    bgcolor: activeTab === item.value ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              </motion.div>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 