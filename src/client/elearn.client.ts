import * as anchor from '@project-serum/anchor';
import { BN, Idl, Program, AnchorProvider } from '@project-serum/anchor';
import { Connection, Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { Elearn } from './data/elearn';
import { AccountUtils, toBN, isKp,  toByteArray} from './common';

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
    } else {
      //means running inside test suite
      // @ts-ignore
      this.elearnProgram = anchor.workspace.Elearn as Program<Elearn>;
    }
  }

  // --------------------------------------- fetch deserialized accounts

  async fetchManagerProofAcc(managerPDA: PublicKey) {
    return this.elearnProgram.account.manager.fetch(managerPDA);
  }

  async fetchBatchAcc(batchPDA: PublicKey) {
    return this.elearnProgram.account.batch.fetch(batchPDA);
  }

  async fetchCertificateAcc(certficatePDA: PublicKey) {
    return this.elearnProgram.account.certificate.fetch(certficatePDA);
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

    return { txSig };
  }

  async createCertificate(
    manager: PublicKey| Keypair,
    batch: PublicKey,
    studentKey: PublicKey, 
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

    return { txSig }
  }
}