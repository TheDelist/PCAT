const express =require('express');
const path = require('path');
let ejs = require('ejs');


const app =express();
app.set("view engine","ejs");
//middleware
app.use(express.static('public'))

app.get('/',(req,res)=>{
    //res.sendFile(path.resolve(__dirname,'temp/index.html'));
    res.render('index');
})

const port=3000;
app.listen(port,()=>{
    console.log(`server starter in port ${port}`);
});