// productRoutes.js

const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../models');

// GET all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name']
        },
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
          through: ProductTag,
          as: 'tags'
        }
      ]
    });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single product by id
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name']
        },
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
          through: ProductTag,
          as: 'tags'
        }
      ]
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST create a new product
router.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT update a product
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      await product.update(req.body);
      res.json(product);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE a product
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      await product.destroy();
      res.json({ message: 'Product deleted' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

