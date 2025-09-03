const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', recipeRoutes);
const frontendPath = path.join(__dirname, '../Frontend');
app.use(express.static(frontendPath));
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'register.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
