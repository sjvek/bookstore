const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "book",
    },
    status: {
        type: String,
         default:"Order Placed",
        enum: ["Order Placed","out of delivery ","delivered","canceled"],
    },
},
{timestamps: true}
);

 module.exports = mongoose.model("order", orderSchema);