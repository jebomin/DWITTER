import express from "express";
import "express-async-error";
import * as tweetRepository from "../data/tweet.js";

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll();
  res.status(200).json(data);
});
// GET /tweets/:id
//파람이 들어오기 때문에 다른 라우터에서 구현해야 함
//파람 = 매개변수
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  //find api를 통해 tweet을 찾음
  const tweet = tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet); //tweet이 있으면 찾았다고 200을 보내고 데이터는 여기있다고 json(tweet)을 함
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});
// POST /tweets
router.post("/", (req, res, next) => {
  const { text, name, username } = req.body; //body object안에 text, name, username을 받음
  //위에서 받아온 것을 기반으로 tweet을 만듦
  const tweet = tweetRepository.create(text, name, username);
  res.status(201).json(tweet);
});

// PUT /tweets/:id
router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweetRepository.update(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// DELETE /tweets/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  tweetRepository.remove(id);
  res.sendStatus(204);
});

export default router;
