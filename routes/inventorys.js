const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Inventory, validate} = require('../models/inventory'); 
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const inventorys = await Inventory.find().sort('name');
  res.send(inventorys);
});

router.post('/',  async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let inventory = new Inventory({ 
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity
  });
  inventory = await inventory.save();
  
  res.send(inventory);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const inventory = await Inventory.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity
    }, { new: true });

  if (!inventory) return res.status(404).send('The inventory with the given ID was not found.');
  
  res.send(inventory);
});

router.patch('/quantity/:id', async (req, res) => {
  // const { error } = validate(req.body.quantity); 
  // if (error) return res.status(400).send(error.details[0].message);

  const inventory = await Inventory.findByIdAndUpdate(req.params.id,
    { 
      quantity: req.body.quantity
    }, { new: true });

  if (!inventory) return res.status(404).send('The inventory with the given ID was not found.');
  
  res.send(inventory);
});



router.delete('/:id',[auth, admin], async (req, res) => {
  const inventory = await Inventory.findByIdAndRemove(req.params.id);

  if (!inventory) return res.status(404).send('The inventory with the given ID was not found.');

  res.send(inventory);
});

router.get('/:id', async (req, res) => {
  const inventory = await Inventory.findById(req.params.id);

  if (!inventory) return res.status(404).send('The inventory with the given ID was not found.');

  res.send(inventory);
});

module.exports = router; 