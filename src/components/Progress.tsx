import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';

interface WorkoutData {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

const Progress = () => {
  const [workouts, setWorkouts] = useState<WorkoutData[]>([]);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    totalDuration: 0,
    weeklyProgress: 0,
    monthlyProgress: 0,
    currentStreak: 0,
    longestStreak: 0,
  });

  useEffect(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    if (savedWorkouts) {
      const parsedWorkouts = JSON.parse(savedWorkouts);
      setWorkouts(parsedWorkouts);
      calculateStats(parsedWorkouts);
    }
  }, []);

  const calculateStreak = (workoutData: WorkoutData[]) => {
    if (workoutData.length === 0) return { currentStreak: 0, longestStreak: 0 };

    // Sort workouts by date
    const sortedWorkouts = [...workoutData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Get unique dates
    const uniqueDates = Array.from(
      new Set(sortedWorkouts.map(workout => workout.date))
    ).sort();

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the last workout was today or yesterday
    const lastWorkoutDate = new Date(uniqueDates[uniqueDates.length - 1]);
    lastWorkoutDate.setHours(0, 0, 0, 0);
    const daysSinceLastWorkout = Math.floor(
      (today.getTime() - lastWorkoutDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // If the last workout was more than 1 day ago, streak is broken
    if (daysSinceLastWorkout > 1) {
      currentStreak = 0;
    } else {
      // Calculate current streak
      for (let i = uniqueDates.length - 1; i >= 0; i--) {
        const currentDate = new Date(uniqueDates[i]);
        currentDate.setHours(0, 0, 0, 0);

        if (i === uniqueDates.length - 1) {
          tempStreak = 1;
        } else {
          const prevDate = new Date(uniqueDates[i + 1]);
          prevDate.setHours(0, 0, 0, 0);
          const dayDiff = Math.floor(
            (prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (dayDiff === 1) {
            tempStreak++;
          } else {
            break;
          }
        }
      }
      currentStreak = tempStreak;
    }

    // Calculate longest streak
    tempStreak = 1;
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const currentDate = new Date(uniqueDates[i]);
      const nextDate = new Date(uniqueDates[i + 1]);
      currentDate.setHours(0, 0, 0, 0);
      nextDate.setHours(0, 0, 0, 0);

      const dayDiff = Math.floor(
        (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (dayDiff === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }

    return { currentStreak, longestStreak };
  };

  const calculateStats = (workoutData: WorkoutData[]) => {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const weeklyWorkouts = workoutData.filter(
      (workout) => new Date(workout.date) >= weekStart
    );
    const monthlyWorkouts = workoutData.filter(
      (workout) => new Date(workout.date) >= monthStart
    );

    const { currentStreak, longestStreak } = calculateStreak(workoutData);

    setStats({
      totalWorkouts: workoutData.length,
      totalCalories: workoutData.reduce((sum, workout) => sum + workout.calories, 0),
      totalDuration: workoutData.reduce((sum, workout) => sum + workout.duration, 0),
      weeklyProgress: weeklyWorkouts.length,
      monthlyProgress: monthlyWorkouts.length,
      currentStreak,
      longestStreak,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Your Progress
      </Typography>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {/* Current Streak */}
          <Grid item xs={12} md={6} lg={3}>
            <motion.div variants={itemVariants}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  bgcolor: stats.currentStreak > 0 ? 'primary.light' : 'background.paper',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Current Streak
                </Typography>
                <CircularProgress
                  variant="determinate"
                  value={Math.min((stats.currentStreak / 30) * 100, 100)}
                  size={80}
                  thickness={4}
                  sx={{ mb: 2 }}
                />
                <Typography variant="h4" color="primary">
                  {stats.currentStreak} days
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Keep it up!
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* Longest Streak */}
          <Grid item xs={12} md={6} lg={3}>
            <motion.div variants={itemVariants}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Longest Streak
                </Typography>
                <CircularProgress
                  variant="determinate"
                  value={Math.min((stats.longestStreak / 30) * 100, 100)}
                  size={80}
                  thickness={4}
                  sx={{ mb: 2 }}
                />
                <Typography variant="h4" color="primary">
                  {stats.longestStreak} days
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Best record
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* Total Workouts */}
          <Grid item xs={12} md={6} lg={3}>
            <motion.div variants={itemVariants}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Total Workouts
                </Typography>
                <CircularProgress
                  variant="determinate"
                  value={Math.min((stats.totalWorkouts / 100) * 100, 100)}
                  size={80}
                  thickness={4}
                  sx={{ mb: 2 }}
                />
                <Typography variant="h4" color="primary">
                  {stats.totalWorkouts}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* Total Calories */}
          <Grid item xs={12} md={6} lg={3}>
            <motion.div variants={itemVariants}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Total Calories
                </Typography>
                <CircularProgress
                  variant="determinate"
                  value={Math.min((stats.totalCalories / 10000) * 100, 100)}
                  size={80}
                  thickness={4}
                  sx={{ mb: 2 }}
                />
                <Typography variant="h4" color="primary">
                  {stats.totalCalories}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* Weekly Progress */}
          <Grid item xs={12} md={6} lg={3}>
            <motion.div variants={itemVariants}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Weekly Progress
                </Typography>
                <CircularProgress
                  variant="determinate"
                  value={Math.min((stats.weeklyProgress / 7) * 100, 100)}
                  size={80}
                  thickness={4}
                  sx={{ mb: 2 }}
                />
                <Typography variant="h4" color="primary">
                  {stats.weeklyProgress}/7
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* Monthly Progress */}
          <Grid item xs={12} md={6} lg={3}>
            <motion.div variants={itemVariants}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Monthly Progress
                </Typography>
                <CircularProgress
                  variant="determinate"
                  value={Math.min((stats.monthlyProgress / 30) * 100, 100)}
                  size={80}
                  thickness={4}
                  sx={{ mb: 2 }}
                />
                <Typography variant="h4" color="primary">
                  {stats.monthlyProgress}/30
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {workouts.slice(0, 5).map((workout) => (
                    <Box key={workout.id} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1">
                        {workout.type} - {workout.duration} minutes
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(workout.calories / 500) * 100}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {workout.calories} calories burned
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Progress; 