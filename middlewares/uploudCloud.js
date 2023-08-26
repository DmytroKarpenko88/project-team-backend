const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { originalname } = file;
    const { _id: id } = req.user;
    let folder;
    if (file.fieldname === 'avatarURL') {
      folder = 'Avatars';
    } else if (file.fieldname === 'petURL') {
      folder = 'petURL';
    } else {
      folder = 'misc';
    }
    return {
      folder: folder,
      allowed_formats: ['jpg', 'png'],
      public_id: path.join(`${originalname}/${id}`),
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
});

module.exports = upload;
