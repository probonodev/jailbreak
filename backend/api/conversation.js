import express from "express";
import { Conversation } from "../models/Models.js";
import verify from "./verify.js";
const router = express.Router();

router.get("/", verify, async (req, res) => {
  const address = req.user.address;

  try {
    const conversations = await Conversation.find(
      { address: address },
      {
        id: "$_id",
        data: 1,
        address: 1,
        challenge: 1,
        createdAt: 1,
        updatedAt: 1,
      }
    );
    res.send(conversations);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

router.get("/challenge/:challenge", verify, async (req, res) => {
  const address = req.user.address;

  try {
    const conversations = await Conversation.find(
      { address: address, challenge: req.params.challenge },
      {
        _id: 0,
        data: 1,
        address: 1,
        challenge: 1,
        createdAt: 1,
        updatedAt: 1,
      }
    );
    res.send(conversations);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

export { router as conversationsAPI };
