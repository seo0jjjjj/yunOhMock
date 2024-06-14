import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from 'url';
import session from "express-session";
import dotenv from 'dotenv';
import connectMongoDBSession from 'connect-mongodb-session';
import Config from "./config/config.js";


export const app = express();



const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
  uri: Config.get("MONGO"),
  collection: 'sessions',

  expires: 1000 * 60 * 60 / 2 // 30 minutes
});


export const sessionMiddleware = session({
  secret: Config.get("SESSION_SECRET"),
  resave: false,
  saveUninitialized: true,
  rolling: true, // 자동 갱신
  cookie: {
    secure: false, // https를 통해서만 쿠키를 전송할 것인지
    maxAge: 1000 * 60 * 60, // 쿠키 유효 기간 1시간
    httpOnly: false
  },
  store: store,

});



try {
  // __dirname 설정
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // 정적 파일 제공 설정
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.set('env', 'development');


  // json 요청 본문 파싱 미들웨어
  app.use(express.json());

  app.use(cors({
    origin: ["https://localhost:3000", "https://localhost", "http://localhost", "http://localhost:3000", Config.get("CLIENT_URL")],
    credentials: true,
    methods: ["GET", "POST"]
  }));

  app.use(cookieParser());
  app.use(morgan('dev'));

  app.use(sessionMiddleware);

  app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    console.log(`Query: ${JSON.stringify(req.query, null, 2) ?? "empty query"}`);
    next();
  });


  // Routing 설정
  app.use("/api/auth", authRoute);
  app.use("/api/users", usersRoute);


  // 404 핸들러 설정
  app.use((req, res, next) => {
    res.status(404).json({
      success: false,
      message: "404 NOT FOUND - Resource not found",
    });
  });


  // 에러 핸들러 설정
  app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

} catch (err) {
  console.log("❌ Middleware initialization failed!");
  console.error(err);
}


