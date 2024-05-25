import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import morgan from "morgan";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
const app = express();

// uploads폴더가 없으면 생성하기
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 정적 파일 제공 설정
app.use('../uploads', express.static(path.join(__dirname, 'uploads')))

app.set('env', 'development');

// json 요청 본문 파싱 미들웨어
app.use(express.json());

app.use(cors({
  origin: ["https://localhost:3000", "https://localhost", "http://localhost",
    "http://localhost:3000"],
  credentials: true,
}))

app.use(cookieParser()); 
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  console.log(`query: ${JSON.stringify(req.query, null, 2) ?? "empty query"}`);
  next();
});
// 서버 시작

//routing
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

// 404 핸들러 설정
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "404 NOT FOUND Resource not found"
  });
});


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});



console.log("middleware initalized!");
export default app;