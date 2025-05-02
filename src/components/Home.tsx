import { Box, Typography, Grid, Paper, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  onGetStarted?: () => void;
}

const Home = ({ onGetStarted }: HomeProps) => {
  const benefits = [
    {
      title: 'Physical Health',
      description: 'Regular exercise strengthens your heart, improves circulation, and boosts your immune system.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    },
    {
      title: 'Mental Well-being',
      description: 'Exercise releases endorphins, reducing stress and anxiety while improving your mood and sleep quality.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
    },
    {
      title: 'Longevity',
      description: 'Stay active to maintain mobility, prevent chronic diseases, and enjoy a longer, healthier life.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    },
  ];

  const motivationalQuotes = [
    "The only bad workout is the one that didn't happen.",
    "Your body can stand almost anything. It's your mind you have to convince.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Don't count the days, make the days count.",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          sx={{
            height: '60vh',
            backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.5)',
            },
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                Transform Your Life
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: 'white',
                  mt: 2,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                One workout at a time
              </Typography>
            </motion.div>
          </Container>
        </Box>
      </motion.div>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 6, fontWeight: 'bold' }}
          >
            Why Fitness Matters
          </Typography>

          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={4} key={benefit.title}>
                <motion.div variants={itemVariants}>
                  <Paper
                    sx={{
                      height: '100%',
                      overflow: 'hidden',
                      borderRadius: 2,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 200,
                        backgroundImage: `url(${benefit.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <Box sx={{ p: 3 }}>
                      <Typography variant="h5" gutterBottom>
                        {benefit.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Motivational Quotes Section */}
      <Box sx={{ bgcolor: 'primary.main', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography
              variant="h3"
              align="center"
              sx={{ mb: 6, color: 'white', fontWeight: 'bold' }}
            >
              Daily Motivation
            </Typography>

            <Grid container spacing={3}>
              {motivationalQuotes.map((quote, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Paper
                      sx={{
                        p: 3,
                        height: '100%',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: 'white', fontStyle: 'italic' }}
                      >
                        "{quote}"
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}
          >
            <Typography variant="h3" gutterBottom>
              Ready to Start Your Journey?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Track your progress, set goals, and transform your life with our fitness tracker.
            </Typography>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onGetStarted}
              style={{ cursor: 'pointer' }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold',
                }}
              >
                Get Started Now →
              </Typography>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home; 