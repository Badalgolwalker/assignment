const userModel = require("../models/usermolde");
const {asyncerror} = require("../middleware/asyncerror");
const router = require("../routes/userroute");
const Errorhandler = require("../utils/Errorhandler");

exports.user = (req, res) => {
    res.send('hello i am badal golwalker');
}


exports.register = asyncerror(async(req, res,next) => {
    const user = await userModel.findOne({username:req.body.name})

    if(user){

next (new Errorhandler("user already exist", 404))
    }
   const newuser = await new userModel(req.body).save()
res.json({message:"usr register sucessfully",user:newuser})

    

})


exports.alluser = asyncerror(async(req,res,next) =>{
    const user = await userModel.find()
    res.json({mess:"all user",user})
})


exports.singleuser = asyncerror(async(req,res,next) =>{
    const user = await userModel.findById(req.params.id)
    res.json({mess:"single user",user})
})

exports.updateuser = asyncerror(async(req,res,next) =>{

    const user = await userModel.findByIdAndUpdate({_id:req.params.id},{
        username:req.body.username,
        email:req.body.email,
},

{new:true}).exec()
res.json({user,message:"user updated"})
})

exports.deleteuser = asyncerror(async(req,res,next) =>{
    const user = await userModel.findByIdAndDelete({_id:req.params.id})
    res.json(user)
})