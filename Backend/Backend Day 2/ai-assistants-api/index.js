const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// import routes
const assistantRoutes = require('./assistantRoutes');

// root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to AI Assistant Personality API'
  });
});

// use routes
app.use('/api/assistants', assistantRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
