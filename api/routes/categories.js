const Categories = require('../models/Categories');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();

//CREATE

router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newCategories = new Categories(req.body);

  try {
    const savedCategories = await newCategories.save();
    res.status(200).json(savedCategories);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCategories = await Categories.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //take everything in req.body and set it
      },
      { new: true }
    );
    res.status(200).json(updatedCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Categories.findByIdAndDelete(req.params.id);
    res.status(200).json('Category has been deleted...');
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL
router.get('/', async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
