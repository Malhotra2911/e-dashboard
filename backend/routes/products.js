const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// Route 1 : Add a product using POST "/api/products/add-product"
router.post('/add-product', async (req, res) => {
  try {
    let product = new Product(req.body)
    product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      userId: req.body.userId,
      company: req.body.company
    })
    res.json({product});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// Route 2 : List all products using GET "/api/products/list-product"
router.get('/list-product', async (req, res) => {
  try {
    let products = await Product.find()
    if(products.length>0){
      res.send(products)
    }else{
      res.json({Response: "No Products Found"})
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// Route 3 : Delete a product using DELETE "/api/products/delete-product"
router.delete('/delete-product/:id', async (req,res) => {
  try {
    let product = await Product.findById(req.params.id);
    if(!product){
      return res.status(400).send("Not Found")
    }

    product = await Product.findByIdAndDelete(req.params.id);
    res.json({"Success" : "Product has been deleted", product: product})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
  }
})

// Route 4 : Find a product by productId to edit using GET "/api/products/edit-product/:id"
router.get('/edit-product/:id', async (req,res) => {
  try {
    let product = await Product.findById(req.params.id);
    if(!product){
      return res.status(400).send("Not Found")
    }

    product = await Product.findById(req.params.id);
    // res.json({"Success" : "Product has been found", product: product})
    res.json({product: product})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
  }
})

// Route 5 : Edit a product using PUT "/api/products/edit-product/:id"
router.put('/edit-product/:id', async (req,res) => {
  const {name, price, category, company} = req.body;
  try {
    // Create a newProduct object
    const newProduct = {};
    if(name){newProduct.name = name}
    if(price){newProduct.price = price}
    if(category){newProduct.category = category}
    if(company){newProduct.company = company}

    // Find the product to be updated and update it
    let product = await Product.findById(req.params.id);
    if(!product){
      return res.status(400).send("Not Found")
    }

    product = await Product.findByIdAndUpdate(req.params.id, {$set: newProduct}, {new: true})
    res.json(product)
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
  }
})

// Route 6 : Search a product using GET "/api/products/search-product/:key"
router.get('/search-product/:key', async (req,res) => {
  try{
    let product = await Product.find({
      "$or" : [
        {name : {$regex : req.params.key}},
        {price : {$regex : req.params.key}},
        {category : {$regex : req.params.key}},
        {company : {$regex : req.params.key}},
      ]
    })
    res.json(product)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
  }
})

module.exports = router