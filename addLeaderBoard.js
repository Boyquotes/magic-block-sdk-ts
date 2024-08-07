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
// let gameClient = GameClient;
// console.log(gameClient);



const expectedDescription = "LeaderBoard1";
const expectedNftMeta = Keypair.generate().publicKey;
const scoresToRetain = 10;
const scoresOrder = false; // descending order
const decimals = 0;
const minScore = new BN(0);
const maxScore = new BN(100);

const gameClient = new GameClient(client, "FioAc6BUeswfGxZApC8ApKJwRDErUa72n1CtKrudgwrW");
console.log(gameClient);
const { newLeaderBoard, topEntries, transaction } =
    await gameClient.addLeaderBoard(
    auths[1].publicKey,
    expectedDescription,
    expectedNftMeta,
    scoresToRetain,
    scoresOrder,
    decimals,
    minScore,
    maxScore,
    true
    );
;
// Send and confirm the transaction with the game keypair as signer. 
const transactionResponse = await client.sendAndConfirmTransaction(transaction, [authWallet]);
console.log(transactionResponse);
console.log("https://explorer.solana.com/tx/"+transactionResponse+"?cluster=devnet");
console.log("https://solscan.io/tx/"+transactionResponse+"?cluster=devnet");