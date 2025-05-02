import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface Workout {
  id: string;
  title: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
  weight?: number; // Optional weight field for weight training
}

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [newWorkout, setNewWorkout] = useState({
    title: '',
    type: '',
    duration: '',
    calories: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
    weight: '', // Add weight field
  });

  useEffect(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    }
  }, []);

  const handleAddWorkout = () => {
    if (!newWorkout.title || !newWorkout.type || !newWorkout.duration || !newWorkout.calories) return;
    if (newWorkout.type === 'Weight Training' && !newWorkout.weight) return;

    const workout: Workout = {
      id: Date.now().toString(),
      title: newWorkout.title,
      type: newWorkout.type,
      duration: Number(newWorkout.duration),
      calories: Number(newWorkout.calories),
      date: new Date(newWorkout.date).toLocaleDateString(),
      weight: newWorkout.type === 'Weight Training' ? Number(newWorkout.weight) : undefined,
    };

    const updatedWorkouts = [...workouts, workout];
    setWorkouts(updatedWorkouts);
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    setNewWorkout({
      title: '',
      type: '',
      duration: '',
      calories: '',
      date: new Date().toISOString().split('T')[0],
      weight: '',
    });
  };

  const handleDeleteWorkout = (id: string) => {
    const updatedWorkouts = workouts.filter((workout) => workout.id !== id);
    setWorkouts(updatedWorkouts);
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Workout Tracker
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add New Workout
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Workout Title"
              name="title"
              value={newWorkout.title}
              onChange={(e) => setNewWorkout({ ...newWorkout, title: e.target.value })}
              placeholder="e.g., Morning Run, Evening Yoga"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={newWorkout.date}
              onChange={(e) => setNewWorkout({ ...newWorkout, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Workout Type</InputLabel>
              <Select
                value={newWorkout.type}
                label="Workout Type"
                onChange={(e) => setNewWorkout({ ...newWorkout, type: e.target.value })}
                required
              >
                <MenuItem value="Running">Running</MenuItem>
                <MenuItem value="Cycling">Cycling</MenuItem>
                <MenuItem value="Swimming">Swimming</MenuItem>
                <MenuItem value="Weight Training">Weight Training</MenuItem>
                <MenuItem value="Yoga">Yoga</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Duration (minutes)"
              type="number"
              value={newWorkout.duration}
              onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
              required
            />
          </Grid>
          {newWorkout.type === 'Weight Training' && (
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Weight (kg)"
                type="number"
                value={newWorkout.weight}
                onChange={(e) => setNewWorkout({ ...newWorkout, weight: e.target.value })}
                required
                InputProps={{
                  inputProps: { min: 0, step: 0.1 }
                }}
              />
            </Grid>
          )}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Calories Burned"
              type="number"
              value={newWorkout.calories}
              onChange={(e) => setNewWorkout({ ...newWorkout, calories: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleAddWorkout}
              sx={{ minWidth: 120 }}
              fullWidth
            >
              Add Workout
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Workouts
        </Typography>
        <List>
          <AnimatePresence>
            {workouts.map((workout) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteWorkout(workout.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={workout.title}
                    secondary={`${workout.type} • ${workout.duration} minutes • ${workout.calories} calories • ${workout.date}${workout.weight ? ` • ${workout.weight} kg` : ''}`}
                  />
                </ListItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>
      </Paper>
    </Box>
  );
};

export default WorkoutTracker; 