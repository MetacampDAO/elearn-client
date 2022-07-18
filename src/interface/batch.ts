import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export interface BatchAcc {
  batchPDA: PublicKey,
  managerKey: PublicKey,
  certificateCount: BN,
  batchNum: BN,
  batchName: string,
  batchBump: number
}