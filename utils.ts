import {
  ComputeBudgetProgram,
    Connection,
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionMessage,
    VersionedTransaction
  } from '@solana/web3.js';
  import { LAMPORTS_PER_SOL } from '@solana/web3.js';
  import base64 from 'base64-js';
  
  export async function buildTransferTransaction(
    connection: Connection,
    transferAmount: number,
    receiver: PublicKey,
    sender: PublicKey
  ): Promise<string> {
    // Create a new transaction
    let transaction = new Transaction();
    transaction.add(ComputeBudgetProgram.setComputeUnitLimit({
      units: 200000
    }))
    transaction.add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 250000
      })
    )
  
    // Add the transfer instruction
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: receiver,
        lamports: transferAmount * LAMPORTS_PER_SOL, // Convert SOL to lamports
      })
    );
  
    // Fetch the recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = sender;
  
    // Create a TransactionMessage from the transaction
    const message = new TransactionMessage({
      payerKey: sender,
      recentBlockhash: blockhash,
      instructions: transaction.instructions,
    }).compileToV0Message();
  
    // Create a VersionedTransaction from the TransactionMessage
    const versionedTransaction = new VersionedTransaction(message);
  
    // Serialize the versioned transaction to bytes
    const serializedTransaction = versionedTransaction.serialize();
  
    // Encode the bytes to Base64 format
    const base64EncodedTransaction = base64.fromByteArray(serializedTransaction);
  
    return base64EncodedTransaction;
  }
  