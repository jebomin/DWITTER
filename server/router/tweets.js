import express from "express";
import "express-async-error";
import * as tweetController from "../controller/tweet.js";
import { validate } from "../middleware/validator.js";

//validation
//sanitization -> 데이터를 일관성 있게 보관
//Contract Testing : Client와 server 간에 데이터를 주고받을 때 서로 규격을 맞춰서 테스트
//Proto-
const router = express.Router();

const validateTweet = [
  [
    body("text")
      .trim()
      .isLength({ min: 3 })
      .withMessage("text should be at least 3 characters"),
    validate,
  ],
];
// GET /tweets
// GET /tweets?username=:username
router.get("/", tweetController.getTweets);
//이 때 getTweets()라 하면 값이 연결되므로 그렇게 하면 안됨!

// GET /tweets/:id
//파람이 들어오기 때문에 다른 라우터에서 구현해야 함
//파람 = 매개변수
router.get("/:id", tweetController.getTweet);

// POST /tweets
router.post("/", validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put("/:id", validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", tweetController.deleteTweet);

export default router;
