const { config } = require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config(); // ENV 
require("./connection/connection");

// const dotenv = require("dotenv").config();     
// const connectDB = require("./connection/connection");

const bodyParser = require("body-parser");
const path = require("path");
app.set("view engine", "ejs"); 
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })),
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));  


const userRoutes = require("./routes/user");  // get data from user.js from routes folder i.e import user route
const bookRoutes = require("./routes/book");
const favRoutes = require("./routes/favourite");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

app.use(cors({ 
    origin: "http://localhost:5173", // Allow frontend to access backend
    credentials: true // Allow cookies if authentication uses sessions
  }

));

// Use Routes
app.use("/api/v1",userRoutes);   
app.use("/api/v1",bookRoutes);   
app.use("/api/v1",favRoutes);
app.use("/api/v1",cartRoutes);
app.use("/api/v1",orderRoutes);

//  app.get("/", function(req,res) {
//     res.send("Hello, Backend viewers....")
//  });

 




//---------------------------
app.listen(process.env.PORT,() =>{
    console.log(`server started ${process.env.PORT}`);
});