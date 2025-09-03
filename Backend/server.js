const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', recipeRoutes);
app.use(express.static(path.join(__dirname, '../Frontend')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
