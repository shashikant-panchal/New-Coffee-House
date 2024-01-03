const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(
  'mongodb+srv://coffeehouse:CoffeeHouse@coffeehouse.7jtaysy.mongodb.net/',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  try {
    const user = new User({email: req.body.email, password: req.body.password});
    await user.save();
    res.status(201).send('User registered successfully!');
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('User not found.');

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) return res.status(401).send('Invalid password.');

    res.send('User logged in successfully!');
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port${port} `);
});
