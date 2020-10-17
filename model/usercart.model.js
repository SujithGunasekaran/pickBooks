const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usercartSchema = new Schema({
    username : {
        type : String,
        required : true,
    },
    booktype : {
        type : String,
        required : true,
    },
    bookname : {
        type : String,
        require : true,
    },
    quantity : {
        type : String,
        require : true,
    }
});

const UserCart = mongoose.model('UserCart',usercartSchema);
module.exports = UserCart;