const express  = require("express")
const bodyParser = require('body-parser');
const route  = require("./routes/route")
const {default : mongoose} = require("mongoose")
const multer= require("multer");
 const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(bodyParser.json())
app.use(multer().any())
app.use(cors())
mongoose.set('strictQuery', true)
mongoose.connect( process.env.MongoUrl,{
    useNewUrlparser : true
})
.then(()=> console.log("mongoDb is connected"))
.catch((err) => console.log(err))


app.use("/api",route)

app.listen(process.env.PORT || 4000,function(){
    console.log("server running on port"+" "+ (process.env.PORT || 3000) )
})