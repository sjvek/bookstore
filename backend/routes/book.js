const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticatToken } = require("./userAuth")

//----- add book -ADMIN -------
router.post("/add-book", authenticatToken, async (req, res) => {
    try {
        const { id } = req.headers; // Extract user ID from authentication middleware
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You don't have permission to perform this action" });
        }

        // console.log("User Role:", user.id); 
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });

        await book.save();
        return res.status(200).json({ message: "Book added sucessfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//-- update book admin------------
router.put("/update-book", authenticatToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        const user = await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });
        return res.status(200).json({ message: "book updated sucessfully" });
    
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// // //- delet book admin------------------
router.delete("/delete-book", authenticatToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "book delete sucessfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// // //---get all books -----
router.get("/get-all-book", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });

        return res.json({ status: "success", data: books });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: " Error" });
    }
})


// // //--- get recently added book limit 4 ---
router.get("/get-recent-book", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);

        return res.json({ status: "success", data: books });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: " Error" });
    }
})

// // //---- get perticular book by id-----
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        return res.json({ status: "success", data: book });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: " Error" });
    }
})

module.exports = router;