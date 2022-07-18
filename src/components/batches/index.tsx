import React, { useEffect, useRef, useState } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { conn, initElearnClient } from '../../client/common/init';
import { ManagerProof } from '../../interface/managerProof';
import { PublicKey } from '@solana/web3.js';
import { Batch } from '../../interface/batch';

const Batches = () => {
    const wallet = useAnchorWallet();
    const [newBatchName, setNewBatchName] = useState<string>('');
    const [batchList, setBatchList] = useState<Batch[]>();

    useEffect(() => {
        (async () => {
            populateBatchTable();
        })();
    }, [wallet]);

    const populateBatchTable = async () => {
        if (wallet) {
            const elClient = await initElearnClient();
            const allBatchManagerAcc = await elClient.findAllBatchAccByManagerKey(wallet.publicKey);
            setBatchList(
                allBatchManagerAcc.map((row, _) => {
                    return {
                        batchPDA: row.publicKey,
                        managerKey: row.account.managerKey,
                        certificateCount: row.account.certificateCount,
                        batchNum: row.account.batchNum,
                        batchName: row.account.batchName,
                        batchBump: row.account.batchBump,
                    };
                })
            );
        }
    };

    const onClickAdd = async (newBatchName: string) => {
        if (wallet) {
            const elClient = await initElearnClient(wallet as any);
            const [walletManagerProofPDA, _] = await elClient.findManagerProofPDA(wallet.publicKey);

            const { txSig } = await elClient.createBatch(
                wallet.publicKey,
                walletManagerProofPDA,
                newBatchName
            );

            console.log(txSig);

            await conn.confirmTransaction(txSig, 'max');
            populateBatchTable();
            setNewBatchName('');
        }
    };

    return (
        <div>
            <div className="flex flex-col pt-6 px-6">
                <h3>Manage and create batches</h3>
                <p>
                    Each batch contains its own certificates, managers are required to create a batch to generate
                    certificates within
                </p>
                <div className="block w-full overflow-x-auto mt-5">
                    <table className="border-separate w-full border border-slate-500 bg-slate-800 text-sm shadow-sm">
                        <thead className="bg-slate-700">
                            <tr>
                                <th className="px-4 border border-slate-600 font-semibold p-4 text-slate-200 text-left">
                                    #
                                </th>

                                <th className="px-4 border border-slate-600 font-semibold p-4 text-slate-200 text-left">
                                    Batch ID
                                </th>
                                <th className="px-4 border border-slate-600 font-semibold p-4 text-slate-200 text-left">
                                    Batch Name
                                </th>
                                <th className="px-4 border border-slate-600 font-semibold p-4 text-slate-200 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {batchList
                                ?.sort((row) => Number(row.batchNum))
                                .reverse()
                                .map((batch, index) => {
                                    return (
                                        <tr className="text-gray-500" key={index}>
                                            <td className="border border-slate-700 p-4 text-slate-400">
                                                {Number(batch.batchNum)}
                                            </td>
                                            <td className="border border-slate-700 p-4 text-slate-400">
                                                {batch.managerKey.toBase58()}
                                            </td>
                                            <td className="border border-slate-700 p-4 text-slate-400">
                                                {batch.batchName}
                                            </td>
                                            <td className="text-center text-sky-500 font-semibold border border-slate-700 px-4 text-slate-400 cursor-pointer hover:bg-slate-850/50">
                                                Manage
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center mt-10">
                    <label className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 00-2 0v1H8a1 1 0 000 2h1v1a1 1 0 002 0v-1h1a1 1 0 000-2h-1V9z"
                                    fillRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="New batch name..."
                            value={newBatchName}
                            onChange={(e) => setNewBatchName(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        onClick={() => onClickAdd(newBatchName)}
                        className="w-1/6 inline-block items-center rounded-lg bg-sky-300 py-2.5 px-3 ml-2 text-sm font-semibold text-slate-900 hover:bg-sky-200 active:bg-sky-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Batches;
