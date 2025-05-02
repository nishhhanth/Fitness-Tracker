import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';

interface ProfileProps {
  user: any;
  onLogout: () => void;
}

const Profile = ({ user, onLogout }: ProfileProps) => {
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    totalMinutes: 0,
  });

  useEffect(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    if (savedWorkouts) {
      const workouts = JSON.parse(savedWorkouts);
      const totalWorkouts = workouts.length;
      const totalCalories = workouts.reduce((sum: number, w: any) => sum + w.calories, 0);
      const totalMinutes = workouts.reduce((sum: number, w: any) => sum + w.duration, 0);

      setStats({
        totalWorkouts,
        totalCalories,
        totalMinutes,
      });
    }
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Profile
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '3rem',
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={onLogout}
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Fitness Statistics
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {stats.totalWorkouts}
                    </Typography>
                    <Typography color="text.secondary">Total Workouts</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="secondary">
                      {stats.totalCalories.toLocaleString()}
                    </Typography>
                    <Typography color="text.secondary">Calories Burned</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">
                      {stats.totalMinutes}
                    </Typography>
                    <Typography color="text.secondary">Active Minutes</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 