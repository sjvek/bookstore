const mongoose = require('mongoose');


const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
       // default: "https://cdn-icons-png.flaticon.com/512/266/266033.png",
    },
    role: {
        type: String,
        default: "user",
        enum: ['user', 'admin'],
    },
    favourites: [
        {
            type: mongoose.Types.ObjectId,
            ref: "book",
        }],

    cart: [
        {
            type: mongoose.Types.ObjectId,
            ref: "book",
        }],
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "order",
        },
    ],
} ,
    { timestamps : true}
);

module.exports = mongoose.model("user", userSchema);