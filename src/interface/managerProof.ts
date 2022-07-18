import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export interface ManagerProof {
  managerProofPDA: PublicKey,
  managerKey: PublicKey,
  batchCount: BN,
  certificateCount: BN,
  permissionType: number,
  managerBump:number
}