const express = require('express')
const route = express.Router()
const userController = require('../controllers/userController')
const bookController = require("../controllers/bookController")
const review=require("../controllers/reviewController")

const {Authentication,Authrization}=require("../mid/auth")
const Email = require('../controllers/email')

route.post("/register",  userController.registerUser )
route.post("/login",  userController.loginUser )

route.post("/books", Authentication,  bookController.createBook )
route.get("/getbooks/:title",    bookController.getbooks )
route.get("/getAllbooks",  bookController.getAllbooks )
route.put("/likes/:value/:bookId",  bookController.Likes )

route.get("/books/:bookId",    bookController.getbook )
route.put("/books/:bookId", Authentication,   Authrization,  bookController.updateBooks )
route.delete("/books/:bookId", Authentication, Authrization,  bookController.bookDelete )

route.post('/Email/:email' , Email.SendMail)

route.post("/books/:bookId/reviews",Authentication ,   review.createReview )
route.get("/getReviews" ,   review.getAllreview )
route.put("/books/:bookId/review/:reviewId", Authentication , review.updateReview )
route.delete("/books/:bookId/review/:reviewId", Authentication ,review.deleteReview )






route.all("/*",(req,res)=>{
    return res.status(400).send({status:false,msg:"your end point is wrong"})
})

module.exports = route