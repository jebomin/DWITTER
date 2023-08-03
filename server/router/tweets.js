import express from "express";
import "express-async-error";

//아직 데이터 베이스 구현을 안 배웠기에 배열 사용
let tweets = [
  {
    id: "1",
    text: "난 귀여워",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    text: "안뇽:D",
    createdAt: Date.now().toString(),
    name: "Bomin",
    username: "bomin",
  },
];
const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter((tweet) => tweet.username === username)
    : tweets;
  res.status(200).json(data);
});
// GET /tweets/:id
//파람이 들어오기 때문에 다른 라우터에서 구현해야 함
//파람 = 매개변수
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  //find api를 통해 tweet을 찾음
  const tweet = tweets.find((tweet) => tweet.id === id);
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
  const tweet = {
    id: Date.now().toString(), //Data.now()를 통해 지금 시간을 id로 사용, 나중에 데이터 베이스를 사용하면 고유한 아이디를 사용할 수 있음
    text,
    createdAt: new Date(), //언제 만들어졌는지
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

// PUT /tweets/:id
router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// DELETE /tweets/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter((tweet) => tweet.id !== id); //tweet의 id가 삭제하고 싶지 않은 id만 받아옴
  //위의 과정을 통해 배열에서 삭제해주고 204f를 보냄
  res.sendStatus(204);
});

export default router;
