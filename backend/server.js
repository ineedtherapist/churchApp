const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// Define routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected');

    // Initialize admin user
    try {
      // Check if admin exists
      const adminExists = await User.findOne({ username: 'admin' });

      if (!adminExists) {
        // Create admin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin', salt);

        await User.create({
          username: 'admin',
          password: hashedPassword,
          role: 'admin'
        });
        console.log('Admin user created');
      }
    } catch (error) {
      console.error('Error initializing admin user:', error);
    }

    // Function to find an available port
    const findAvailablePort = (startPort, maxAttempts = 10) => {
      return new Promise((resolve, reject) => {
        let currentPort = startPort;
        let attempts = 0;

        const tryPort = (port) => {
          const server = require('http').createServer();

          server.once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
              console.log(`Port ${port} is in use, trying port ${port + 1}`);
              server.close();
              if (attempts < maxAttempts) {
                attempts++;
                tryPort(port + 1);
              } else {
                reject(new Error(`Could not find an available port after ${maxAttempts} attempts`));
              }
            } else {
              reject(err);
            }
          });

          server.once('listening', () => {
            server.close();
            resolve(port);
          });

          server.listen(port);
        };

        tryPort(currentPort);
      });
    };

    // Start server with port fallback
    const DEFAULT_PORT = process.env.PORT || 5000;

    findAvailablePort(DEFAULT_PORT)
      .then(port => {
        app.listen(port, () => {
          console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
        });
      })
      .catch(err => {
        console.error('Failed to start server:', err);
        process.exit(1);
      });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });
