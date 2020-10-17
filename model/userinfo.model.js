const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userinfoSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        require : true,
    }
});

const UserInfo= mongoose.model('UserInfo',userinfoSchema);
module.exports = UserInfo;