const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// Basic API route for testing
app.get('/api', (req, res) => {
  res.json({ message: 'API is running. Using localStorage for data storage.' });
});

// For backward compatibility - these routes will return appropriate responses but won't actually use MongoDB
app.use('/api/users', (req, res) => {
  res.status(200).json({ message: 'Using localStorage instead of server database' });
});

app.use('/api/auth', (req, res) => {
  res.status(200).json({ message: 'Using localStorage instead of server database' });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
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
      console.log(`Server running on port ${port} without MongoDB. Using localStorage in frontend.`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
