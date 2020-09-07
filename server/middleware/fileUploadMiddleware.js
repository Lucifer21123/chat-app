const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config();

exports.uploadImage = (req, res, next) => {
  if(!req.file){
    res.status(204);
  }else{
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    cloudinary.uploader.upload_stream((result) => {
      res.status(201).json({user_avatar_url: result.secure_url});
    }).end(req.file.buffer);
  }
};