const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect(`${process.env.URI}`);
            console.log("connected to database");
        
        
    }
    catch(error){
        console.log(error);
    }
};
 

// module.exports = connectDB;

connectDB();
// const mongoose = require("mongoose");

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Connected to the database successfully");
//     } catch (error) {
//         console.error("Database connection failed:", error.message);
//         process.exit(1); // Exit process with failure
//     }
// };

// module.exports = connectDB;
