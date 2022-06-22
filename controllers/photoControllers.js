const Photo=require('../models/Photo');
const fs=require('fs');

exports.getAllPhotos= async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated');
    res.render('index', {
      photos,
    });
  }
  exports.getPhoto=async (req, res) => {
    console.log(req.params.id);
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
      photo,
    });
  };
  exports.createPhoto=async (req, res) => {
    const uploadDir='public/uploads';
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
    }
  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;
  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
  });

  //res.sendFile(path.resolve(__dirname,'temp/index.html'));

  res.redirect('/');
};
exports.updatePhoto=async (req, res) => {
    //res.sendFile(path.resolve(__dirname,'temp/index.html'));
    const photo =await Photo.findOne({_id:req.params.id});
    photo.title =req.body.title;
    photo.description =req.body.description;
    await photo.save();
    res.redirect(`/photos/${req.params.id}`);
  };
  exports.deletePhoto=async(req,res)=>{
    const photo = await Photo.findOne(req.params.id);
    let deletedImage=__dirname +'/../public'+photo.image;
    fs.unlinkSync(deletedImage);
    await Photo.findByIdAndRemove(req.params.id);
     res.redirect('/');
  };