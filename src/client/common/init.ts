import { NodeWallet } from '@metaplex/js';
import { Connection, Keypair } from '@solana/web3.js';
import { ElearnClient } from '../elearn.client';
import { PublicKey } from '@solana/web3.js';
import * as elIdl from '../data/elearn.json';

const ELEARN_PROG_ID = new PublicKey(
  '9UZhEPPrzXSAScvZ2cDF1GgYGJTZrAcPUEwNGLvvu9Pr'
);

export const conn: Connection = new Connection("https://ssc-dao.genesysgo.net/");
// export const conn: Connection = new Connection("https://api.devnet.solana.com");

export async function  initElearnClient(
  wallet?: NodeWallet
) {
  const walletToUse = wallet?? createFakeWallet();
  return new ElearnClient(conn, walletToUse, elIdl as any, ELEARN_PROG_ID);
}

export function createFakeWallet() {
  const leakedKp = Keypair.fromSecretKey(
    Uint8Array.from([
      208, 175, 150, 242, 88, 34, 108, 88, 177, 16, 168, 75, 115, 181, 199, 242,
      120, 4, 78, 75, 19, 227, 13, 215, 184, 108, 226, 53, 111, 149, 179, 84,
      137, 121, 79, 1, 160, 223, 124, 241, 202, 203, 220, 237, 50, 242, 57, 158,
      226, 207, 203, 188, 43, 28, 70, 110, 214, 234, 251, 15, 249, 157, 62, 80,
    ])
  );
  return new NodeWallet(leakedKp);
}