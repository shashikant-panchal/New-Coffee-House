// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = 3000;

// app.use(cors());

// app.use(bodyParser.json());

// mongoose.connect(
//   'mongodb+srv://coffeeshop:coffeeshop@coffeeshop.ewl9vjy.mongodb.net/',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
// );

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));

// const User = mongoose.model('User', {
//   name: String,
//   email: String,
//   phoneNumber: String,
//   password: String,
// });

// app.get('/api/users', (req, res) => {
//   res.send('MongoDB Connected');
// });

// // Save user data
// app.post('/api/users', async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// app.get('/api/login', (req, res) => {
//   res.send('MongoDB Connected for Login');
// });

// // Login route
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ error: 'User not found.' });
//     }

//     // Compare passwords
//     const isMatch = await user.comparePassword(password);

//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid password.' });
//     }

//     // If login is successful, send back user data
//     const { name, phoneNumber } = user;
//     res.status(200).json({ name, phoneNumber });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  'mongodb+srv://coffeeshop:coffeeshop@coffeeshop.ewl9vjy.mongodb.net/your-database-name',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  password: String,
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password') || user.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', UserSchema);

app.get('/api/users', (req, res) => {
  res.send('MongoDB Connected');
});

app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/login', (req, res) => {
  res.send('MongoDB Connected for Login');
});

app.post('/api/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    console.log('Received login request for email:', email);

    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({error: 'User not found.'});
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({error: 'Invalid password.'});
    }

    const {name, phoneNumber} = user;
    res.status(200).json({name, phoneNumber});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({error: 'Server Error'});
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
