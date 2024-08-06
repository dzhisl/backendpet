"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPriorityFee = exports.connection = exports.receiverPublickKey = void 0;
const web3_js_1 = require("@solana/web3.js");
exports.receiverPublickKey = new web3_js_1.PublicKey("4NiegNFEFJXuAsRKPB9oMkLPLMacY7TpBrapuWjSX21R");
exports.connection = new web3_js_1.Connection("https://blissful-yolo-county.solana-mainnet.quiknode.pro/4b97f2bb1efc2148178552a749abaf34f40f87dc/");
exports.addPriorityFee = web3_js_1.ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 200000
});
