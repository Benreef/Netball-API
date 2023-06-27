const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/', (req, res) => {
  const { userName, email, password } = req.body;
  console.log(password)

  User.findByEmail(email).then((user) => {
    if (user === undefined || password === undefined) {
      console.log(user)
      res.json({ error: 'Please provide correct login information' });
    } else {
      // const isValidPassword = password
      const isValidPassword = bcrypt.compareSync(
        password,
        user.password_digest
      );
      if (user && isValidPassword) {
        req.session.userId = user.id;
        res.json({
          userId: user.id,
          userName: user.first_name,
          email: user.email,
        });
      }
    }
  });
});


router.get('/', (req, res) => {
  const userId = req.session.userId;

  if (userId) {
    User.findById(userId)
      .then(email => res.json({ result: 'successful', email: email, userId: userId }));
  } else {
    res.json({});
  }
});

router.delete('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('error');
    } else {
      res.clearCookie('user_sid');
      res.json({
        message: 'successful'
      });
    }
  });
});

module.exports = router;
