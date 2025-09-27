import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
    files: 5 // Maximum 5 files (1 main + 4 samples)
  }
});

export const uploadProductImages = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'sampleImages', maxCount: 4 }
]);

export default upload;
