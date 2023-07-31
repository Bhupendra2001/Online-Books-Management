const mongoose = require("mongoose")

const user = new mongoose.Schema({

    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        require: true
    },
    name: {
        type: String,
        require: true,
        trim:true
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max : 15
    },
    address: {
        street: String,
        city: String,
        pincode: String,
       
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
}, { timestamps: true })


module.exports=mongoose.model("user",user)

 