const { asyncerror } = require("../middleware/asyncerror");
const error = require("../utils/Errorhandler");

const item = require("../booksdata.json");
const bookmodel = require("../models/bookmodel");


exports.addbook = asyncerror(async (req, res, next) => {
 const book = await  bookmodel.insertMany(item)

res.json({message:"book add sucessfully",book})
})


exports.allbook = asyncerror(async(req,res,next) =>{
    const book = await bookmodel.find()
    res.json({mess:"all book",book})
})


exports.singlebook = asyncerror(async(req,res,next) =>{
    const book = await bookmodel.findById(req.params.id)
    res.json({mess:"single book",book})
})


exports.updatebook = asyncerror(async(req,res,next) =>{

    const book = await bookmodel.findByIdAndUpdate(req.params.id,req.body,{new:true}).exec()

res.json({message:"book update sucessfully",book})

})


exports.deletebook = asyncerror(async(req,res,next) =>{
    const book = await bookmodel.findByIdAndDelete(req.params.id)
res.json({message:"book delete sucessfully",book})
})