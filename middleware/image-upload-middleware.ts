import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/static/img",
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
});

const imageUploadMiddleware = upload.single("image");

export interface MulterRequest {
  file: {
    path: string;
  };
}

export default imageUploadMiddleware;
