const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticatToken } = require("./userAuth");

//------ put book to cart
router.put("/add-to-cart", authenticatToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isbookincart = userData.cart.includes(bookid);
        if (isbookincart) {
            return res.json({ status: "success", message: "book is already in cart" })
        }
        await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
        return res.json({ status: "success", message: "book added in cart successfully" })
    }
    catch (err) {
        res.status(500).json({ message: "Error occure" });
    }
})

//------------  Rmove from cart
router.put("/remove-to-cart/:bookid", authenticatToken, async (req, res) => {
    try {
        const { bookid } = req.params;
        const { id } = req.headers;
        await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
        return res.json({ status: "success", message: "book removed from cart" });
    }
    catch (err) {
        res.status(500).json({ message: " Error" });
    }
})

//--- get all fav books of perticular user
router.get("/get-user-cart", authenticatToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({ status: "success", data: cart })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error" });
    }
})


module.exports = router;