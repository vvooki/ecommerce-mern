const router = require('express').Router();
const User = require('../models/User');
const Cart = require('../models/Cart');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//REGISTER
router.post('/register', async (req, res) => {
  try {
    const check = await User.findOne({ email: req.body.email });
    const check2 = await User.findOne({ username: req.body.username });
    if (check) {
      return res.status(401).json('User with this email already exists');
    }
    if (check2) {
      return res.status(401).json('User with this name already exists');
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.SHA3(req.body.password, {
          outputLength: 512,
        }).toString(),
      });

      try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        const id = JSON.stringify(savedUser._id);
        const userCart = new Cart({
          userId: id.replace('"', '').replace('"', ''),
          products: [],
          quantity: 0,
          total: 0,
        });
        try {
          await userCart.save();
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json('Wrong credentials');
    }

    const originalPassword = user.password;
    const inputPassword = CryptoJS.SHA3(req.body.password, {
      outputLength: 512,
    }).toString();

    if (originalPassword !== inputPassword) {
      return res.status(401).json('Wrong credentials!');
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
