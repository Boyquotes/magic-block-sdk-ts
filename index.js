import { SoarProgram, GameType, Genre } from "@magicblock-labs/soar-sdk";
import * as anchor from "@coral-xyz/anchor";
import bs58 from 'bs58';
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
const auths = [authWallet];

let game = Keypair.generate();
let title = "Game1";
let description = "Description";
let genre = Genre.Action;
let gameType = GameType.Web; 
let nftMeta = Keypair.generate().publicKey;
let _auths = auths.map((keypair) => keypair.publicKey);

// Retrieve the bundled transaction.
let { newGame, transaction } = await client.initializeNewGame(game.publicKey, title, description, genre, gameType, nftMeta, _auths);
// Send and confirm the transaction with the game keypair as signer. 
const transactionResponse = await client.sendAndConfirmTransaction(transaction, [game]);
console.log(transactionResponse);
console.log("https://explorer.solana.com/tx/"+transactionResponse+"?cluster=devnet");
console.log("https://solscan.io/tx/"+transactionResponse+"?cluster=devnet");