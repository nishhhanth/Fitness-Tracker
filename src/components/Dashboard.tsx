import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WorkoutData {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalWorkouts: '0',
    caloriesBurned: '0',
    activeMinutes: '0',
    streak: '0',
  });
  const [workoutData, setWorkoutData] = useState<any[]>([]);

  useEffect(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    if (savedWorkouts) {
      const workouts = JSON.parse(savedWorkouts);
      
      // Calculate stats
      const totalWorkouts = workouts.length;
      const caloriesBurned = workouts.reduce((sum: number, workout: any) => sum + workout.calories, 0);
      const activeMinutes = workouts.reduce((sum: number, workout: any) => sum + workout.duration, 0);
      
      // Calculate streak with improved logic
      const dates = workouts.map((w: any) => new Date(w.date).getTime());
      const sortedDates = [...new Set(dates)].sort((a, b) => a - b);
      
      let currentStreak = 0;
      let maxStreak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Check if the last workout was today or yesterday
      if (sortedDates.length > 0) {
        const lastWorkoutDate = new Date(sortedDates[sortedDates.length - 1]);
        lastWorkoutDate.setHours(0, 0, 0, 0);
        const daysSinceLastWorkout = Math.floor(
          (today.getTime() - lastWorkoutDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        // If the last workout was more than 1 day ago, streak is broken
        if (daysSinceLastWorkout <= 1) {
          // Calculate current streak
          for (let i = sortedDates.length - 1; i > 0; i--) {
            const currentDate = new Date(sortedDates[i]);
            const prevDate = new Date(sortedDates[i - 1]);
            currentDate.setHours(0, 0, 0, 0);
            prevDate.setHours(0, 0, 0, 0);
            
            const dayDiff = Math.floor(
              (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
            );
            
            if (dayDiff === 1) {
              currentStreak++;
              maxStreak = Math.max(maxStreak, currentStreak);
            } else {
              break;
            }
          }
          // Add 1 for the last workout
          currentStreak++;
          maxStreak = Math.max(maxStreak, currentStreak);
        }
      }

      setStats({
        totalWorkouts: totalWorkouts.toString(),
        caloriesBurned: caloriesBurned.toLocaleString(),
        activeMinutes: activeMinutes.toString(),
        streak: maxStreak.toString(),
      });

      // Process data for chart
      const processedData = processWorkoutData(workouts);
      setWorkoutData(processedData);
    }
  }, []);

  const processWorkoutData = (workouts: any[]) => {
    const workoutsByDate = workouts.reduce((acc: any, workout: any) => {
      if (!acc[workout.date]) {
        acc[workout.date] = {
          date: workout.date,
          calories: 0,
        };
      }
      acc[workout.date].calories += workout.calories;
      return acc;
    }, {});

    return Object.values(workoutsByDate);
  };

  const statItems = [
    { title: 'Total Workouts', value: stats.totalWorkouts, color: '#2196f3' },
    { title: 'Calories Burned', value: stats.caloriesBurned, color: '#f50057' },
    { title: 'Active Minutes', value: stats.activeMinutes, color: '#4caf50' },
    { title: 'Streak', value: `${stats.streak} days`, color: '#ff9800' },
  ];

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
        Fitness Dashboard
      </Typography>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {statItems.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 140,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                >
                  <Typography color="text.secondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: stat.color }}>
                    {stat.value}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}

          <Grid item xs={12}>
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Paper sx={{ p: 3, height: 400 }}>
                <Typography variant="h6" gutterBottom>
                  Weekly Activity
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={workoutData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="calories"
                      stroke="#2196f3"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Dashboard; 