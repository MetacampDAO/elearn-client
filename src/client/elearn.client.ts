import * as anchor from '@coral-xyz/anchor';
import { BN, Idl, AnchorProvider } from '@coral-xyz/anchor';
import { Connection, Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { Elearn } from './data/elearn';
import { AccountUtils, isKp,  toByteArray} from './common';
import { u16, struct } from "@solana/buffer-layout";

export class ElearnClient extends AccountUtils {
  // @ts-ignore
  wallet: anchor.Wallet;
  provider!: anchor.Provider;
  elearnProgram!: anchor.Program<Elearn>;

  constructor(
    conn: Connection,
    // @ts-ignore
    wallet: anchor.Wallet,
    idl?: Idl,
    programId?: PublicKey
  ) {
    super(conn);
    this.wallet = wallet;
    this.setProvider();
    this.setElearnProgram(idl, programId);
  }

  setProvider() {
    this.provider = new AnchorProvider(
      this.conn,
      this.wallet,
      AnchorProvider.defaultOptions()
    );
    anchor.setProvider(this.provider);
  }

  setElearnProgram(idl?: Idl, programId?: PublicKey) {
    //instantiating program depends on the environment
    if (idl && programId) {
      //means running in prod
      this.elearnProgram = new anchor.Program<Elearn>(
        idl as any,
        programId,
        this.provider
      );
    }
  }

  // --------------------------------------- fetch deserialized accounts

  async fetchManagerProofAcc(managerPDA: PublicKey) {
    return this.elearnProgram.account.manager.fetch(managerPDA);
  }

  async fetchBatchAcc(batchPDA: PublicKey) {
    return this.elearnProgram.account.batch.fetch(batchPDA);
  }

  async getCertficateAccVersion(certficatePDA: PublicKey) {
    interface RawVersion {
      version: number;
    }
    const VersionLayout = struct<RawVersion>([u16("version")]);
    const accountInfo = await this.provider.connection.getAccountInfo(
      certficatePDA
    );
    if (accountInfo?.data) {
      return VersionLayout.decode(accountInfo?.data, 8).version;
    } else {
      return 0;
    }
  }

  async fetchCertificateAcc(certficatePDA: PublicKey) {
    const version = await this.getCertficateAccVersion(certficatePDA);
    if (version === 0) {
      return this.elearnProgram.account.certificate.fetch(certficatePDA);
    } else {
      return this.elearnProgram.account.certificateV1.fetch(certficatePDA);
    }
  }
  // --------------------------------------- find PDA adsdresses

  async findManagerProofPDA(managerKey: PublicKey) {
    return await PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode("manager-seed")), managerKey.toBytes()],
      this.elearnProgram.programId
    )
  }

  async findBatchPDA(managerKey: PublicKey, batchCount: number) {
    return await PublicKey.findProgramAddress(
      [
        Buffer.from(anchor.utils.bytes.utf8.encode("batch-seed")), 
        managerKey.toBytes(), 
        toByteArray(batchCount)
      ],
      this.elearnProgram.programId
    )
  }

  async findNewBatchPDA(managerKey: PublicKey) {
    const [managerProofPDA, _] = await this.findManagerProofPDA(managerKey);
    const managerProofAcc = await this.fetchManagerProofAcc(managerProofPDA);
    const nextBatchCount = Number(managerProofAcc.batchCount)
    return await this.findBatchPDA(managerKey, nextBatchCount)
  }

  async findCertificatePDA(batch: PublicKey, certificateCount: number) {
    return await PublicKey.findProgramAddress(
      [
        Buffer.from(anchor.utils.bytes.utf8.encode("certificate-seed")), 
        batch.toBytes(), 
        toByteArray(certificateCount)
      ],
      this.elearnProgram.programId
    )
  }

  async findNewCertificatePDA(batch: PublicKey) {
    const batchAcc = await this.fetchBatchAcc(batch);
    const nextCertificateCount = Number(batchAcc.certificateCount)
    return await this.findCertificatePDA(batch, nextCertificateCount) 
  }
  // --------------------------------------- find all PDA addresses

  async findAllManagerProofAcc(){
    return await this.elearnProgram.account.manager.all();
  }

  async findAllBatchAccByManagerKey(managerKey: PublicKey){
    const filter = [
      {
        memcmp: {
          offset: 8 + 2, //prepend for anchor's discriminator + version
          bytes: managerKey.toBase58(),
        }
      }
    ];
    return this.elearnProgram.account.batch.all(filter);
  }

  async findAllCertificateAccByBatchPDA(batchPDA: PublicKey){
    const filter = [
      {
        memcmp: {
          offset: 8 + 2, //prepend for anchor's discriminator + version
          bytes: batchPDA.toBase58(),
        }
      }
    ];

    const filteredCertificatesV0 = await this.elearnProgram.account.certificate.all(filter);
    const filteredCertificatesV1 = await this.elearnProgram.account.certificateV1.all(filter);
    const filteredCertificates = [...filteredCertificatesV0, ...filteredCertificatesV1];

    return filteredCertificates;
  }

  // --------------------------------------- elearn ixs

  async initializeManager (
    master: PublicKey| Keypair,
    managerProof: PublicKey,
    managerBump: number,
  ) {
    const signers  = [];
    if (isKp(master)) signers.push(<Keypair>master)

    const masterPk = isKp(master)? (<Keypair>master).publicKey: master;
    const txSig = await this.elearnProgram.methods.initializeManager(
      managerBump
    ).accounts({
      master: masterPk as any,
      managerProof,
      systemProgram: SystemProgram.programId
    }).signers(signers)
    .rpc();

    return { txSig };
  }

  async addManager (
    admin: PublicKey| Keypair,
    adminProof: PublicKey,
    managerKey: PublicKey,
    managerProof: PublicKey,
    managerBump: number, 
  ) {
    const signers  = [];
    if (isKp(admin)) signers.push(<Keypair>admin)

    const adminPk = isKp(admin)? (<Keypair>admin).publicKey: admin;
    const txSig = await this.elearnProgram.methods.addManager(managerBump)
      .accounts({
        admin: adminPk as any,
        adminProof,
        managerKey,
        managerProof,
        systemProgram: SystemProgram.programId
      }).signers(signers)
      .rpc();

      return { txSig };
  }

  async modifyManager (
    admin: PublicKey| Keypair,
    adminProof: PublicKey,
    managerKey: PublicKey,
    managerProof: PublicKey,
    targetPermissions: number, 
  ) {
    const signers  = [];
    if (isKp(admin)) signers.push(<Keypair>admin)

    const adminPk = isKp(admin)? (<Keypair>admin).publicKey: admin;
    const txSig = await this.elearnProgram.methods.modifyManager(targetPermissions)
      .accounts({
        admin: adminPk as any,
        adminProof,
        managerKey,
        managerProof,
        systemProgram: SystemProgram.programId
      }).signers(signers)
      .rpc();

      return { txSig };
  }

  async createBatch (
    manager: PublicKey| Keypair,
    managerProof: PublicKey,
    batchName: string,
  ) {
    const signers  = [];
    if (isKp(manager)) signers.push(<Keypair>manager)

    const managerPk = (isKp(manager)? (<Keypair>manager).publicKey: manager) as PublicKey;
    const [batch, batchBump] = await this.findNewBatchPDA(managerPk);

    const txSig = await this.elearnProgram.methods.createBatch(batchName, batchBump)
      .accounts({
        manager: managerPk as any,
        managerProof,
        batch
      }).signers(signers)
      .rpc();

    return { txSig, batch};
  }

  async createCertificate(
    manager: PublicKey| Keypair,
    batch: PublicKey,
    studentKey: PublicKey, 
    startDate: number,
    endDate: number,
    completeDate: number,
    studentName: string,
    studentGrade: string,
    courseName: string,
    schoolName: string,
    schoolUri: string,
    issuerName: string,
    issuerRole: string,
    issuerUri: string,
  ) {
    const signers  = [];
    if (isKp(manager)) signers.push(<Keypair>manager)

    const managerPk = (isKp(manager)? (<Keypair>manager).publicKey: manager) as PublicKey;
    const [managerProof, _] = await this.findManagerProofPDA(managerPk);
    const [certificate, certificateBump] = await this.findNewCertificatePDA(batch);

    const txSig = await this.elearnProgram.methods.createCertificate(
      new BN(startDate),
      new BN(endDate),
      new BN(completeDate),
      certificateBump,
      studentName,
      studentGrade,
      courseName,
      schoolName,
      schoolUri,
      issuerName,
      issuerRole,
      issuerUri
    ).accounts({
      manager: managerPk,
      managerProof,
      batch,
      certificate,
      studentKey,
      systemProgram: SystemProgram.programId
    }).signers(signers)
    .rpc();

    return { txSig, certificate }
  }
}