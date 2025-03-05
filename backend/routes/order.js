const router = require("express").Router();
const Book = require("../models/book");
const Order = require("../models/order");
const { authenticatToken } = require("./userAuth");
const User = require("../models/user");

// place order
router.post("/place-order", authenticatToken, async (req, res) => {
    try {
       // console.log("Received Body:", req.body);
        const { id } = req.headers;
        const { order } = req.body;
       // console.log(req.body);
        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const finalOrder = await newOrder.save();
           // console.log(finalOrder);
            await User.findByIdAndUpdate(id, {
                $push: { orders : finalOrder._id },
            });
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });
        }
        return res.json({ status: "success", message: "order placed successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error" });
    }
})

// get order history of user
router.get("/get-order-history", authenticatToken, async (req, res) => {
    try {
    
      const { id } = req.headers;
  //  console.log(id);
       const userData = await User.findById(id).populate({ path: "orders", populate: { path: "book" } });
   // console.log(userData);
        const ordersData = userData.orders.reverse();
        
        return res.json({ status: "success", data: ordersData })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error" });
    }
})

// get all order--- admin
router.get("/get-all-orders", authenticatToken, async (req, res) => {
    try {
        const userData = await Order.find().populate({ path: "book" }).populate({ path: "user" }).sort({ createdAt: -1 });
        return res.json({ status: "success", data: userData, message: "status updated successfully"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error" });
    }
})


// update order--- admin
router.put("/update-status/:id", authenticatToken, async (req, res) => {
    try {
        const { id } = req.params;
         await Order.findByIdAndUpdate(id, { status: req.body.status });
        return res.json({ status: "success", message: "status updated sucessfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error" });
    }
})


module.exports = router;