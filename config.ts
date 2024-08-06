import {
    ComputeBudgetProgram,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
  } from '@solana/web3.js'
  
  export const receiverPublickKey = new PublicKey("4NiegNFEFJXuAsRKPB9oMkLPLMacY7TpBrapuWjSX21R")
  export const connection = new Connection("https://blissful-yolo-county.solana-mainnet.quiknode.pro/4b97f2bb1efc2148178552a749abaf34f40f87dc/")
  export const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 200000
  })