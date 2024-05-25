import multer from "multer";

// 업로드 파일 저장 위치와 파일 이름 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
export const upload = multer({ storage: storage })
