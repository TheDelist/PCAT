const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//create schema
const PhotoSchema =new Schema({
    title:String,
    description:String
});

const Photo=mongoose.model('Photo',PhotoSchema);

//create photo
/*
Photo.create({
    title:'Photo title 1',
    description:'Photo afasfsafasf 1'
});
*/
// read a photo
Photo.find({},(err,data) => {
    console.log(data);
});

//update photo
const id ="62b0a43515c3fd477f36a21d";
/*
Photo.findByIdAndUpdate(
    id,{
        title:'Photo title 111 updated',
        description:'asfsafsa updated'
    },
    {
        new:true
    },
    (err,data)=>{
        console.log(data);
    }
);
*/
Photo.findByIdAndDelete(id,(err,data)=>{
    console.log("removed");
});



