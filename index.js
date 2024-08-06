"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const config_1 = require("./config");
const utils_1 = require("./utils");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the backend!");
});
// Route to create a new user
app.post("/balance", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(new Date());
    const body = req.body;
    let walletAddress = body.account;
    let amount = body.amount;
    console.log(walletAddress, amount);
    let base64EncodedTransaction = yield (0, utils_1.buildTransferTransaction)(config_1.connection, amount, config_1.receiverPublickKey, new web3_js_1.PublicKey(walletAddress));
    res.status(201).json({
        message: `Deserialize, sign and send this transaction to transfer ${amount} from ${walletAddress} to ${config_1.receiverPublickKey.toString()}`,
        base64EncodedTransaction: base64EncodedTransaction,
    });
    console.log(new Date());
}));
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
