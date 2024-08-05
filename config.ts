import {
    ComputeBudgetProgram,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
  } from '@solana/web3.js'
  
  export const receiverPublickKey = new PublicKey("4NiegNFEFJXuAsRKPB9oMkLPLMacY7TpBrapuWjSX21R")
  export const connection = new Connection("http://fra.rpc.orbitflare.com/")
  export const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 200000
  })