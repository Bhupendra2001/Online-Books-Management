const mongoose=require("mongoose")

const validDate = function (value) {
let date=/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/
return date.test(value)
}

const validTitle = function(value) {
let title = ["Mr","Mrs","Miss"]
return title.includes(value)
};

const isValidStreet = function (body) {
const nameRegex = /^[a-zA-Z0-9_ ]*$/
return nameRegex.test(body);
};

const isValidPincode = function (Pincode) {
const passRegex = /^[1-9][0-9]{0,5}$/
return passRegex.test(Pincode)
}
   
const validISBN = function(value){
let ISBN = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
return ISBN.test(value)
}

const validBookTitle = function(value){
   let title = /^ $/
   return title.test(value)
}
const validName = function (value) {
let name = /^[a-zA-Z. ]{3,}$/
if (name.test(value)) return true;
}

const validMobile = function (value) {
let mobile = /^[0-9 ]{10,10}$/
if(mobile.test(value)) return true
}

const validemail = function (value) {
let email = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/
if(email.test(value)) return true;
}

const validPassword = function (value) {
  // let password = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/
let password= /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,15}$/
if(password.test(value)) return true;
}

const isvalidObjectid=function(value){
return mongoose.Types.ObjectId(value)
}

const validRating=function (value){
let Rating = /^[1-5 ]{1,1}$/
if (Rating.test(value)) return true
}
 const dad=(value)=>{
    if(value.trim().length===0) return false
    return true
 }

 const isValidImg = (img) => {
   const reg = /.+\.(?:(jpg|gif|png|jpeg|jfif))/;
   return reg.test(img);
 };
 
module.exports=
{dad,validRating,validTitle,validDate,validName,validMobile,validemail,validPassword,validISBN,isValidStreet,isValidPincode,isvalidObjectid , isValidImg}