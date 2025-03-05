// creates the router, adds routes, and exports the router from the file.

const router = require("express").Router();

const User = require("../models/user");  // take data from user.js from models folder 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authenticatToken} = require("./userAuth");


// ---------------  SIGN-UP -----------------------

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // check username length > 4 
        if (username.length <= 4) {
            return res.status(400).json({ message: "Username length must be greater than 4" });
        }

        // check username already exist?
        const existingUsernsme = await User.findOne({ username: username }); // firstusername is object and second one username from user
        // if (existingEmail) {
            if (existingUsernsme) {
            return res.status(400).json({ message: "username already exists" })
        }

        // check email already exist
        const existingEmail = await User.findOne({ email: email }); 
       // if (existingUsernsme) {
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }

        // CHECK PASSWORD LENGTH

        if (password.length <= 5) {
            return res.status(400).json({ message: "password length must be greater than 5" });
        }
        const hashpass = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            email: email,
            password: hashpass,
            address: address,
        });

        await newUser.save();
        res.status(200).json({ message: "sign up successfully" });



    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// ---------------  SIGN-IN -----------------------

router.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            res.status(400).json({ message: "invalid credentials" });
        }

        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaims = [
                    { name: existingUser.username },
                    { role: existingUser.role },
                ];
                const token = jwt.sign({ authClaims }, "bookstore123", { expiresIn: "30d" });
                res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token,  message: "signin sucessfully" });
            }
            else {
                res.status(400).json({ message: "invalid credentials" });
            }
        })

    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//------- get user information ------------
router.get("/get-user-information", authenticatToken,async (req, res) => {
    try{
        const {id} = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//------- update address ------------
router.put("/update-address",authenticatToken,async (req, res) =>{
    try{
        const {id} = req.headers;
        const{address}= req.body;
     await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({ message: "Address updated successfully" });
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports = router;
