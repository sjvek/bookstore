const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticatToken } = require("./userAuth");


//--- add book to favourite      favourites

router.put("/add-book-to-favourite", authenticatToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isbookfav = userData.favourites.includes(bookid);
        if (isbookfav) {
            return res.status(200).json({ message: "book is already in favourite" })
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        return res.status(200).json({ message: "book added to favourite" })
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//--- remove book to favourite
router.put("/remove-book-to-favourite", authenticatToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isbookfav = userData.favourites.includes(bookid);
        if (isbookfav) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
        }
        return res.status(200).json({ message: "book removed from favourite" })
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//--- get all fav books of perticular user
router.get("/get-fav-book", authenticatToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favBooks = userData.favourites;
            return res.json({ status: "success", data: favBooks})  
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error" });
    }
})

module.exports = router;