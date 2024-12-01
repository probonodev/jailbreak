import nacl from "tweetnacl";
import bs58 from "bs58";
import dotenv from "dotenv";
import express from "express";
import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Settings } from "../models/Models.js";
import jwt from "jsonwebtoken";

dotenv.config();
const router = express.Router();

const rpcUrl = process.env.RPC_URL;
const JWT_SECRET = process.env.JWT_SECRET;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

router.post("/", async (req, res) => {
  try {
    const jwt_token = req.headers["auth-token"];

    try {
      const verified = jwt.verify(jwt_token, JWT_SECRET);
      if (verified) {
        return res.json({ verified: true, token: jwt_token });
      }
    } catch (err) {
      console.log("INVALID JWT, MOVING ON...");
    }

    // Extract the necessary fields from the request body
    const { walletAddress, message, signature } = req.body;

    // Validate input
    if (!walletAddress || !message || !signature) {
      return res.status(400).json({
        error: "Missing required fields: walletAddress, message, or signature.",
      });
    }

    // Decode the public key, message, and signature
    const decodedPublicKey = bs58.decode(walletAddress);
    const decodedMessage = new TextEncoder().encode(message);
    const decodedSignature = bs58.decode(signature);

    // Verify the signature
    const isValid = nacl.sign.detached.verify(
      decodedMessage,
      decodedSignature,
      decodedPublicKey
    );

    if (!isValid) {
      return res.status(401).json({
        error: "Invalid signature. Wallet ownership verification failed.",
      });
    }

    const connection = new Connection(rpcUrl, "confirmed");
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      new PublicKey(walletAddress),
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );

    const tokens = await Promise.all(
      tokenAccounts.value.map(async (accountInfo, index) => {
        const mint = accountInfo.account.data["parsed"]["info"]["mint"];
        const amount =
          accountInfo.account.data["parsed"]["info"]["tokenAmount"]["amount"];
        return { mint, amount };
      })
    );

    const settings = await Settings.findOne({
      _id: "67499aec7a5af63de4eb84fb",
    });

    const ca = settings.address;
    const threshold = settings.threshold;

    const found = tokens.find((t) => t.mint === ca);
    const notFoundMessage = `Must hold ${numberWithCommas(
      threshold
    )} $JAIL to participate`;

    if (!found) {
      return res.status(400).json({ error: notFoundMessage });
    } else {
      if (found.amount >= threshold) {
        const token = jwt.sign({ walletAddress }, JWT_SECRET, {
          expiresIn: "168h",
        });

        jwt.verify(token, JWT_SECRET);

        res.json({ verified: true, token });
      } else {
        return res.status(400).json({ error: notFoundMessage });
      }
    }
  } catch (error) {
    console.error("Signature verification error:", error);
    res
      .status(500)
      .json({ error: "An error occurred during signature verification." });
  }
});

export { router as verifyRoute };
