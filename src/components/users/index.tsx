import React, { useEffect, useRef, useState } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { conn, initElearnClient } from '../../client/common/init';
import { ManagerProof } from '../../interface/managerProof';
import { PublicKey } from '@solana/web3.js';

const Users = () => {
    const wallet = useAnchorWallet();
    const [newManagerKeyStr, setNewManagerKeyStr] = useState<string>("");
    const [userList, setUserList] = useState<ManagerProof[]>();

    useEffect(() => {
        (async () => {
            populateUserTable();
        })();
    }, [wallet]);

    const populateUserTable = async () => {
        if (wallet) {
            const elClient = await initElearnClient();
            const [managerProofPDA, _] = await elClient.findManagerProofPDA(wallet.publicKey);
            const managerProofAcc = await elClient.fetchManagerProofAcc(managerProofPDA);
            if ((managerProofAcc.permissionType & (1<<3)) > 0) {
                const allManagerProofAcc = await elClient.findAllManagerProofAcc();
                setUserList(
                    allManagerProofAcc.map((row, _) => {
                        return {
                            managerProofPDA: row.publicKey,
                            managerKey: row.account.managerKey,
                            batchCount: row.account.batchCount,
                            certificateCount: row.account.certificateCount,
                            permissionType: row.account.permissionType,
                            managerBump: row.account.managerBump,
                        };
                    })
                );
            }
        }
    };

    const onClickAdd = async (newManagerKeyStr: string) => {
        if (wallet) {
            const elClient = await initElearnClient(wallet as any);
            const newManagerKey = new PublicKey(newManagerKeyStr);
            const [walletManagerProofPDA, _] = await elClient.findManagerProofPDA(wallet.publicKey);
            const [newManagerProofPDA, newManagerBump] = await elClient.findManagerProofPDA(newManagerKey);

            const { txSig } = await elClient.addManager(
                wallet.publicKey,
                walletManagerProofPDA,
                newManagerKey,
                newManagerProofPDA,
                newManagerBump
            );

            console.log(txSig);

            await conn.confirmTransaction(txSig, 'max');
            populateUserTable();
            setNewManagerKeyStr("");
        }
    };

    const onClickToggle = async (
        managerKey: PublicKey,
        managerProofPDA: PublicKey,
        currentPermissions: number,
        targetPermission: number
    ) => {
        if (wallet) {
            const elClient = await initElearnClient(wallet as any);
            const [walletManagerProofPDA, _] = await elClient.findManagerProofPDA(wallet.publicKey);
            const newPermissions =
                (currentPermissions & targetPermission) > 0
                    ? currentPermissions - targetPermission
                    : currentPermissions + targetPermission;

            const { txSig } = await elClient.modifyManager(
                wallet.publicKey,
                walletManagerProofPDA,
                managerKey,
                managerProofPDA,
                newPermissions
            );

            console.log(txSig);

            await conn.confirmTransaction(txSig, 'max');
            populateUserTable();
        }
    };

    return (
        <div>
            <div className="flex flex-col pt-6 px-6">
                <h3>Modify managers permissions</h3>
                <p>Click on individual users' permission cells to toggle on and off</p>
                <div className="block w-full overflow-x-auto mt-5">
                    <table className="border-separate w-full border border-slate-500 bg-slate-800 text-sm shadow-sm">
                        <thead className="bg-slate-700">
                            <tr>
                                <th className="px-4 border border-slate-600 font-semibold p-4 text-slate-200 text-left">
                                    Address
                                </th>
                                <th className="px-4 border border-slate-600 font-semibold p-4 text-slate-200 text-left">
                                    Add Managers
                                </th>
                                <th className="px-4 border border-slate-600 font-semibold p-4 text-slate-200 text-left">
                                    Create Batch
                                </th>
                                <th className="px-4 border border-slate-600 font-semibold p-4 text-slate-200 text-left">
                                    Create Cert
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList?.map((managerProof, index) => {
                                return (
                                    <tr className="text-gray-500" key={index}>
                                        <td className="border border-slate-700 p-4 text-slate-400">
                                            {managerProof.managerKey.toBase58()}
                                        </td>
                                        <td
                                            onClick={() =>
                                                onClickToggle(
                                                    managerProof.managerKey,
                                                    managerProof.managerProofPDA,
                                                    managerProof.permissionType,
                                                    1 << 3
                                                )
                                            }
                                            className="text-xl text-center border border-slate-700 px-4 text-slate-400 cursor-pointer hover:bg-slate-850/50"
                                        >
                                            {(managerProof.permissionType & (1 << 3)) > 0 ? '🟢' : '🔴'}
                                        </td>
                                        <td
                                            onClick={() =>
                                                onClickToggle(
                                                    managerProof.managerKey,
                                                    managerProof.managerProofPDA,
                                                    managerProof.permissionType,
                                                    1 << 2
                                                )
                                            }
                                            className="text-xl text-center border border-slate-700 px-4 text-slate-400 cursor-pointer hover:bg-slate-850/50"
                                        >
                                            {(managerProof.permissionType & (1 << 2)) > 0 ? '🟢' : '🔴'}
                                        </td>
                                        <td
                                            onClick={() =>
                                                onClickToggle(
                                                    managerProof.managerKey,
                                                    managerProof.managerProofPDA,
                                                    managerProof.permissionType,
                                                    1 << 1
                                                )
                                            }
                                            className="text-xl text-center border border-slate-700 px-4 text-slate-400 cursor-pointer hover:bg-slate-850/50"
                                        >
                                            {(managerProof.permissionType & (1 << 1)) > 0 ? '🟢' : '🔴'}
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
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="New manager's wallet address..."
                            value={newManagerKeyStr}
                            onChange={(e) => setNewManagerKeyStr(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        onClick={() => onClickAdd(newManagerKeyStr)}
                        className="w-1/6 inline-block items-center rounded-lg bg-sky-300 py-2.5 px-3 ml-2 text-sm font-semibold text-slate-900 hover:bg-sky-200 active:bg-sky-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Users;
