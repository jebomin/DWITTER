import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-error";
//router폴더 안에 있는 tweet.js 연결
import tweetsRouter from "./router/tweets.js";

const app = express();

//미들웨어 세팅
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

//router를 사용
app.use("/tweets", tweetsRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

//에러처리
app.use((error, req, res, next) => {
  console.error(error); //서버에 에러를 남겨둬야 하니까 로그 사용
  res.sendStatus(500);
});
app.listen(8080);
