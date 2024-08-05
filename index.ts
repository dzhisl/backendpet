import {
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import { connection, receiverPublickKey } from "./config";
import { buildTransferTransaction } from "./utils";

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});


// Route to create a new user
app.post("/balance", async (req, res) => {
  console.log(new Date());
  const body = req.body;
  let walletAddress = body.account;
  let amount = body.amount;
  console.log(walletAddress, amount);
  let base64EncodedTransaction = await buildTransferTransaction(
    connection,
    amount * LAMPORTS_PER_SOL,
    receiverPublickKey,
    new PublicKey(walletAddress)
  );
    res.status(201).json({
      message: `Deserialize, sign and send this transaction to transfer ${amount} from ${walletAddress} to ${receiverPublickKey.toString()}`,
      base64EncodedTransaction: base64EncodedTransaction,
    });
  console.log(new Date());
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
