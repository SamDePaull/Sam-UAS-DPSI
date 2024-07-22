require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');
const Claim = require('./models/Claim');
const authRoute = require('./routes/auth');
const claimRoute = require('./routes/claims');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/claims', claimRoute);

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
