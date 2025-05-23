const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Apenas arquivos de imagem são permitidos (jpeg, jpg, png, gif).'));
    }
};

const storagePerfil = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../../public/uploads')),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const nome = crypto.randomBytes(64).toString('hex');
        cb(null, `${nome}${ext}`);
    }
});

const storagePublicacao = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../../public/assets')),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const nome = crypto.randomBytes(64).toString('hex');
        cb(null, `${nome}${ext}`);
    }
});

const limites = {
    fileSize: 2 * 1024 * 1024 // 2 MB
};

const uploadPerfil = multer({ 
    storage: storagePerfil,
    fileFilter,
    limits: limites
});

const uploadPublicacao = multer({ 
    storage: storagePublicacao,
    fileFilter,
    limits: limites
});

module.exports = { uploadPerfil, uploadPublicacao };
