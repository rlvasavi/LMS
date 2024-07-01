const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const studentRouter = require('./routes/students');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/jp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api', userRoutes);
app.use('/students', studentRouter);

app.listen(5000, () => console.log('Server ready at 5000'));
