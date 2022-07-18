import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export interface CertificateAcc {
  certificatePDA: PublicKey,
  batchPDA: PublicKey,
  managerKey: PublicKey,
  studentKey: PublicKey,
  completeDate: BN,
  certificateNum: BN,
  certificateBump: number,
  studentName: string,
  studentGrade: string,
  courseName: string,
  schoolName: string,
  schoolUri: string,
  issuerName: string,
  issuerRole: string,
  issuerUri: string,
}

export interface GenCertificate {
  studentKey: string,
  completeDate: string,
  studentName: string,
  studentGrade: string,
  courseName: string,
  schoolName: string,
  schoolUri: string,
  issuerName: string,
  issuerRole: string,
  issuerUri: string,
}