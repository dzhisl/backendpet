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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTransferTransaction = void 0;
const web3_js_1 = require("@solana/web3.js");
const web3_js_2 = require("@solana/web3.js");
const base64_js_1 = __importDefault(require("base64-js"));
function buildTransferTransaction(connection, transferAmount, receiver, sender) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a new transaction
        let transaction = new web3_js_1.Transaction();
        transaction.add(web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({
            units: 200000
        }));
        transaction.add(web3_js_1.ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: 250000
        }));
        // Add the transfer instruction
        transaction.add(web3_js_1.SystemProgram.transfer({
            fromPubkey: sender,
            toPubkey: receiver,
            lamports: transferAmount * web3_js_2.LAMPORTS_PER_SOL, // Convert SOL to lamports
        }));
        // Fetch the recent blockhash
        const { blockhash } = yield connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = sender;
        // Create a TransactionMessage from the transaction
        const message = new web3_js_1.TransactionMessage({
            payerKey: sender,
            recentBlockhash: blockhash,
            instructions: transaction.instructions,
        }).compileToV0Message();
        // Create a VersionedTransaction from the TransactionMessage
        const versionedTransaction = new web3_js_1.VersionedTransaction(message);
        // Serialize the versioned transaction to bytes
        const serializedTransaction = versionedTransaction.serialize();
        // Encode the bytes to Base64 format
        const base64EncodedTransaction = base64_js_1.default.fromByteArray(serializedTransaction);
        return base64EncodedTransaction;
    });
}
exports.buildTransferTransaction = buildTransferTransaction;
