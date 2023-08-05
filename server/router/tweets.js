import express from "express";
import "express-async-error";
import * as tweetController from "../controller/tweet.js";

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", tweetController.getTweets);
//이 때 getTweets()라 하면 값이 연결되므로 그렇게 하면 안됨!

// GET /tweets/:id
//파람이 들어오기 때문에 다른 라우터에서 구현해야 함
//파람 = 매개변수
router.get("/:id", tweetController.getTweet);

// POST /tweets
router.post("/", tweetController.createTweet);

// PUT /tweets/:id
router.put("/:id", tweetController.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", tweetController.deleteTweet);

export default router;
