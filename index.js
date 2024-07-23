require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const sequelize = require('./config/database');
const User = require('./models/User');
const Claim = require('./models/Claim');
const authRoute = require('./routes/auth');
const claimRoute = require('./routes/claims');

console.log('Starting server...');
const app = express();
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/claims', claimRoute);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send JSON response
  res.status(err.status || 500).json({ error: err.message });
});

// Sync database
sequelize.sync({ force: false }) // force: false untuk menghindari overwrite data
  .then(() => {
    console.log('Database synchronized');
    const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

// Corrected export statement
module.exports = app;
