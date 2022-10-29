
var ex=require("express");
var app=ex()
const bodyParser =require("body-parser")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const cors=require("cors");
app.use(cors());
const path =require('path')
const multer = require("multer")
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./profilePic");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    },
});
var upload = multer({
    storage:storage
}).single('file');

app.use('/profilePic',ex.static('profilePic'))



mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/training",
        function(){
            console.log("mongo");
        }
    
);
profileSchema=mongoose.Schema({name:{type:String},email:{type:String},password:{type:String},profile:{type:String}});
var profile=mongoose.model("pros",profileSchema);


profileSchema2=mongoose.Schema({email:{type:String},post:{type:String},comment:{type:String}});
var posts=mongoose.model("posts",profileSchema2);

app.post("/addData",function(req,res){
    d={}
    upload(req,res,(err)=>{
        if(err){
            console.log(err);
        }
        else{
        }
        d={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            profile:req.file.filename
        }
        res.json(d)
        let k = new profile(d);
        k.save();
    })
    
});

app.post("/showData",function(req,res){
    profile.findOne({email:req.body.email},function(err,k){
        res.json(k)
    });
    
});

app.post("/feed",function(req,res){
    console.log(req.body.email)
    posts.find({email:req.body.email},function(err,feed){
        if(err){
            console.log(err)
        }
        else{
            res.json(feed)
        }
    });
});

app.post("/addPost",function(req,res){
    d={}
    upload(req,res,(err)=>{
        if(err){
            console.log(err);
        }
        else{
        console.log(req.file)
        }
        d={
            email:req.body.email,
            comment:req.body.comment,
            post:req.file.filename
        }
        
        let k = new posts(d);
        res.json(k)
        k.save();
    })
});

app.get("/peopleInfo",function(req,res){
    profile.find(function(req,data){
        res.json(data)
        console.log(data)
    });
});



app.listen(7000,function(){
    console.log("server is running");});