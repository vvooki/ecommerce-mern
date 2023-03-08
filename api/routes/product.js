const Product = require('../models/Product');
const Categories = require('../models/Categories');
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();

//CREATE

router.post('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    for (let i = 0; i < req.body.topic.length; i++) {
      const topic = await Categories.find({
        name: req.body.topic[i],
      });
      if (topic.length === 0) {
        const newCateogry = new Categories({ name: req.body.topic[i] });
        const savedCategory = await newCateogry.save();
      }
    }
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //take everything in req.body and set it
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted...');
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET PRODUCTS
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET NEW DROP
router.get('/new', async (req, res) => {
  try {
    const product = await Product.findOne().sort({ _id: -1 }).limit(1);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL PRODUCTS AND FILTER
router.get('/', async (req, res) => {
  const { size, category, color, price, topic, sort } = req.query;
  const queryObject = {};

  if (size) {
    const sizeList = size.split(' ');
    queryObject.size = sizeList;
  }
  if (category) {
    queryObject.category = category;
  }
  if (color) {
    queryObject.color = color;
  }
  if (price) {
    const priceArray = price.split(' ');
    if (priceArray.length === 1) {
      queryObject.price = { $gte: priceArray[0] };
    }
    if (priceArray.length === 2) {
      queryObject.price = { $gte: priceArray[0], $lte: priceArray[1] };
    }
  }
  if (topic) {
    const topicList = topic.split(' ');
    queryObject.topic = { $all: topicList };
  }
  try {
    let result = Product.find(queryObject);
    if (sort) {
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
    }
    const products = await result;
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
