import { SoarProgram, GameClient, GameType, Genre } from "@magicblock-labs/soar-sdk";
import * as anchor from "@coral-xyz/anchor";
import bs58 from 'bs58';
import BN from "bn.js";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction } from '@solana/web3.js';
import dotenv from 'dotenv';
dotenv.config();

const ANCHOR_PROVIDER_URL="https://api.devnet.solana.com";
const provider = anchor.AnchorProvider.env();
console.log(provider);
//anchor.setProvider(provider);
const client = SoarProgram.get(provider);
console.log(process.env.AUTH_WALLET_SECRET_KEY);
const authWallet = Keypair.fromSecretKey(bs58.decode(process.env.AUTH_WALLET_SECRET_KEY));
const auths = [authWallet, authWallet];

const user1 = Keypair.generate();
const player1Username = "player1xx";
const player1Pfp = Keypair.generate().publicKey;

console.log(user1);
console.log(user1.publicKey);
// initializePlayerAccount
let { newGame, transaction } = await client.initializePlayerAccount(user1.publicKey, player1Username, player1Pfp);

// Send and confirm the transaction with the game keypair as signer. 
const transactionResponse = await client.sendAndConfirmTransaction(transaction, [user1]);
console.log(transactionResponse);
console.log("https://explorer.solana.com/tx/"+transactionResponse+"?cluster=devnet");
console.log("https://solscan.io/tx/"+transactionResponse+"?cluster=devnet");