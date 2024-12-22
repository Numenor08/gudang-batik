import multer from 'multer';

// Konfigurasi penyimpanan multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Atur batas ukuran file
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Batas ukuran file 5MB
});

export { upload };
