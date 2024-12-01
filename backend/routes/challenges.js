import express from "express";
import { Challenge, Settings, Chat } from "../models/Models.js";
// import { challenges } from "../data/challenges.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.find({});
    // await Challenge.insertMany(challenges);
    res.send(challenges);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

router.get("/get-challenge", async (req, res) => {
  try {
    const id = req.query.id;
    const challenge = await Challenge.findOne(
      { _id: id },
      {
        _id: 1,
        title: 1,
        label: 1,
        task: 1,
        level: 1,
        image: 1,
        pfp: 1,
        active: 1,
        name: 1,
      }
    );

    if (!challenge) {
      return res.status(404).send("Challenge not found");
    }

    if (!challenge.active)
      return res.status(404).send("Challenge is not active");

    const message_price = 72.34;
    const break_attempts = await Chat.countDocuments({ challenge: id });

    const chatLimit = 20;
    const firstPrompt = challenge.system_message;
    // const address = req.walletAddress;

    const chatHistory = await Chat.find({
      challenge: id,
      role: { $ne: "system" },
    })
      .sort({ date: 1 })
      .limit(chatLimit);

    if (chatHistory.length > 0) {
      return res
        .status(200)
        .json({ challenge, break_attempts, message_price, chatHistory });
    }

    const found = await Chat.findOne({
      challenge: challenge,
    });

    if (!found) {
      const newChat = await Chat.create({
        challenge: id,
        model: model,
        role: "system",
        content: firstPrompt,
        ip: clientIp,
      });

      console.log("New chat document created:", newChat);
    }

    // const settings = await Settings.findOne({
    //   _id: "67499aec7a5af63de4eb84fb",
    // });

    return res.status(200).res.json({
      challenge: challenge,
      break_attempts: break_attempts,
      message_price: message_price,
      chatHistory: [{ role: "assistant", content: challenge.label }],
      // settings: settings,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

export { router as challengesRoute };
