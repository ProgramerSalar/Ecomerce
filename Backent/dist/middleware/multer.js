import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files");
    },
    filename: function (req, file, cb) {
        const unisuffix = Date.now();
        cb(null, unisuffix + file.originalname);
    },
});
export const upload = multer({ storage: storage }).single('photo');
