const express = require("express");
const Order = require("./../model/order")
const router = express.Router();

router.post('/add_orders', async (req, res) => {
  try {
    // console.log("----post---",req.body,res);
    const { name, phone_number, table_id, order_items } = req.body;
    
    // console.log(req.body);
    // Creating a new order
    const newOrder = await Order.create({
      name:name,
      phone_number:phone_number,
      table_id:table_id,
      items:order_items,
      completed: false,
    });
    // console.log(newOrder);

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add the order' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    // Fetch all orders from the database and sorting based on 'createAt'
    let allOrders = await Order.find({}).sort("-createdAt");

    // Sort the orders based on the 'completed' 
    allOrders.sort((a, b) => {
      // If 'completed' is true, put the order at the end (return 1)
      // If 'completed' is false, put the order at the beginning (return -1)
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    });

    res.status(200).json(allOrders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    // console.log("---delete---",req.body)
    const {id} = req.body;
    const deletedOrder = await Order.findByIdAndDelete({"_id":id});
    // console.log(deletedOrder);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the order' });
  }
});

router.put('/orders/completion', async (req, res) => {
  try {
    // console.log("--put--",req.body);
    const { completed ,id} = req.body;
    // console.log(completed,id)
    // Find the order by ID and update the 'completed' field
    const updatedOrder = await Order.findByIdAndUpdate(
      {"_id":id},
      { completed:true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update the order completion' });
  }
});


module.exports = router;
