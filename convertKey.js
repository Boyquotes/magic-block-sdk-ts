import { SoarProgram, GameClient, GameType, Genre } from "@magicblock-labs/soar-sdk";
import * as anchor from "@coral-xyz/anchor";
import bs58 from 'bs58';
import BN from "bn.js";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction } from '@solana/web3.js';
import dotenv from 'dotenv';
dotenv.config();

const key = new PublicKey([119,6,175,40,194,86,196,163,133,60,146,187,40,73,73,26,247,52,44,145,68,88,244,124,11,121,216,97,48,68,106,109]);
console.log(key);
console.log(key.toBase58());
