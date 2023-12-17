const express = require('express');

const router = express.Router()

module.exports = router;

const Model = require('../model/grocery');

// Create a grocery Item
router.post('/addGroceries', async (req, res) => {
    console.log("Creating grocery item...");

    const groceries = new Model({
        name: req.body.name,
        quantity: req.body.quantity
    })

    try {
        const dataToSave = groceries.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Get all grocery items
router.get('/viewGroceries', async (req, res) => {
    console.log("Listing groceries items...");
    try{
        const groceries = await Model.find();
        res.json(groceries)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getGrocery/:id', async (req, res) => {
    console.log("Retrieving grocery item: ", req.params.id);
    try{
        const groceries = await Model.findById(req.params.id);
        res.json(groceries)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Update a grocery Item
router.patch('/updateGroceries/:id', async (req, res) => {
    console.log("Updating item - ", req.params.id);

    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Delete a grocery Item
router.delete('/deleteGroceries/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})