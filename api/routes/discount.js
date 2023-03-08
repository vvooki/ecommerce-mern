const Discount = require('../models/Discount');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();

//CREATE

router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newDiscount = new Discount(req.body);

  try {
    const savedDiscount = await newDiscount.save();
    res.status(200).json(savedDiscount);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedDiscount = await Discount.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //take everything in req.body and set it
      },
      { new: true }
    );
    res.status(200).json(updatedDiscount);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Discount.findByIdAndDelete(req.params.id);
    res.status(200).json('Product discount has been deleted...');
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL
router.get('/', async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
