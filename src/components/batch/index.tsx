import React, { useEffect, useRef, useState } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Link, useParams } from 'react-router-dom';
import { conn, initElearnClient } from '../../client/common/init';
import { CertificateAcc } from '../../interface/certificate';
import { PublicKey } from '@solana/web3.js';
import { GenCertificate } from '../../interface/certificate';
import _ from 'lodash';

const Batch = () => {
    const wallet = useAnchorWallet();
    const { batchKey } = useParams();
    const [newCertificate, setNewCertificate] = useState<GenCertificate>({
        studentKey: '',
        completeDate: '',
        studentName: '',
        studentGrade: '',
        courseName: '',
        schoolName: '',
        schoolUri: '',
        issuerName: '',
        issuerRole: '',
        issuerUri: '',
    });
    const [certList, setCertList] = useState<CertificateAcc[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            populateCertTable();
        })();
    }, []);

    const populateCertTable = async () => {
        if (wallet && batchKey) {
            const elClient = await initElearnClient();
            const batchPDA = new PublicKey(batchKey);
            const allCertBatchAcc = await elClient.findAllCertificateAccByBatchPDA(batchPDA);
            setCertList(
                allCertBatchAcc
                    .sort((row) => Number(row.account.certificateNum))
                    .reverse()
                    .map((row, _) => {
                        return {
                            certificatePDA: row.publicKey,
                            batchPDA: row.account.batchPda,
                            managerKey: row.account.managerKey,
                            studentKey: row.account.studentKey,
                            completeDate: row.account.completeDate,
                            certificateNum: row.account.certificateNum,
                            certificateBump: row.account.certificateBump,
                            studentName: row.account.studentName,
                            studentGrade: row.account.studentGrade,
                            courseName: row.account.courseName,
                            schoolName: row.account.schoolName,
                            schoolUri: row.account.schoolUri,
                            issuerName: row.account.issuerName,
                            issuerRole: row.account.issuerRole,
                            issuerUri: row.account.issuerUri,
                        };
                    })
            );
        }
    };

    const onClickGenerate = async () => {
        if (wallet && batchKey) {
            setIsLoading(true);
            try {
                const elClient = await initElearnClient(wallet as any);

                const { txSig, certificate } = await elClient.createCertificate(
                    wallet.publicKey,
                    new PublicKey(batchKey),
                    _.isEmpty(newCertificate.studentKey) ? wallet.publicKey : new PublicKey(newCertificate.studentKey),
                    parseInt(newCertificate.completeDate),
                    newCertificate.studentName,
                    newCertificate.studentGrade,
                    newCertificate.courseName,
                    newCertificate.schoolName,
                    newCertificate.schoolUri,
                    newCertificate.issuerName,
                    newCertificate.issuerRole,
                    newCertificate.issuerUri
                );

                console.log(txSig);

                conn.onAccountChange(certificate, () => {
                    populateCertTable();
                    setIsLoading(false);
                });

                setNewCertificate({
                    studentKey: '',
                    completeDate: '',
                    studentName: '',
                    studentGrade: '',
                    courseName: '',
                    schoolName: '',
                    schoolUri: '',
                    issuerName: '',
                    issuerRole: '',
                    issuerUri: '',
                });
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        }
    };

    const truncate = (str: string) => {
        return str.length > 8 ? str.substring(0, 7) + '...' : str;
    };

    return (
        <div>
            <div className="flex flex-col pt-6 px-6">
                <h3>View and create certificates</h3>
                <p>
                    Click on the view cells to view individual certificate or fill up required fields to generate new
                    certificate
                </p>
                <div className="block w-full overflow-x-auto mt-5">
                    <table className="border-separate w-full border border-slate-500 bg-slate-800 text-sm shadow-sm">
                        <thead className="bg-slate-700">
                            <tr>
                                <th className="px-4 border border-slate-600 font-semibold p-4 text-slate-200 text-left">
                                    ID
                                </th>

                                <th className="px-4 border border-slate-600 font-semibold p-4 text-slate-200 text-left">
                                    Course Name
                                </th>
                                <th className="px-4 border border-slate-600 font-semibold p-4 text-slate-200 text-left">
                                    Student Name
                                </th>
                                <th className="px-4 border border-slate-600 font-semibold p-4 text-slate-200 text-left">
                                    Recognition
                                </th>
                                <th className="px-4 border border-slate-600 font-semibold p-4 text-slate-200 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {certList?.map((cert, index) => {
                                return (
                                    <tr className="text-gray-500" key={index}>
                                        <td className="flex border border-slate-700 p-4 text-slate-400">
                                            <div className="w-full">{truncate(cert.certificatePDA.toBase58())}</div>

                                            <svg
                                                onClick={() =>
                                                    navigator.clipboard.writeText(cert.certificatePDA.toBase58())
                                                }
                                                className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                                            </svg>
                                        </td>
                                        <td className="border border-slate-700 p-4 text-slate-400">
                                            {cert.courseName}
                                        </td>
                                        <td className="border border-slate-700 p-4 text-slate-400">
                                            {cert.studentName}
                                        </td>
                                        <td className="border border-slate-700 p-4 text-slate-400">
                                            {cert.studentGrade}
                                        </td>
                                        <td className="text-center text-sky-500 font-semibold border border-slate-700 px-4 text-slate-400 cursor-pointer hover:bg-slate-850/50">
                                            <Link to={`/certificate/${cert.certificatePDA.toBase58()}`}>View</Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="w-full mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                        <div className="col-span-1 md:col-span-3">
                            <div className="flex flex-col gap-y-2">
                                <p> Course Name</p>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="INTRODUCTION TO BLOCKCHAIN"
                                    value={newCertificate.courseName}
                                    onChange={(e) =>
                                        setNewCertificate({ ...newCertificate, courseName: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3">
                            <div className="flex flex-col gap-y-2">
                                <p> Student Name</p>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Jane Doe"
                                    value={newCertificate.studentName}
                                    onChange={(e) =>
                                        setNewCertificate({ ...newCertificate, studentName: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3">
                            <div className="flex flex-col gap-y-2">
                                <p> Student Recognition</p>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Distinction"
                                    value={newCertificate.studentGrade}
                                    onChange={(e) =>
                                        setNewCertificate({ ...newCertificate, studentGrade: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3">
                            <div className="flex flex-col gap-y-2">
                                <p> Student Wallet</p>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="44FmhNvpmafkgWwShR3ErTgRWCYrBuPkQPLdmaMLctPC"
                                    value={newCertificate.studentKey}
                                    onChange={(e) =>
                                        setNewCertificate({ ...newCertificate, studentKey: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3">
                            <div className="flex flex-col gap-y-2">
                                <p> Issuer Name</p>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Raj Anatoly"
                                    value={newCertificate.issuerName}
                                    onChange={(e) =>
                                        setNewCertificate({ ...newCertificate, issuerName: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3">
                            <div className="flex flex-col gap-y-2">
                                <p> Issuer Role</p>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="DIRECTOR"
                                    value={newCertificate.issuerRole}
                                    onChange={(e) =>
                                        setNewCertificate({ ...newCertificate, issuerRole: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3">
                            <div className="flex flex-col gap-y-2">
                                <p> Issuer Signature URL</p>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="https://metacamp.so/signature.png"
                                    value={newCertificate.issuerUri}
                                    onChange={(e) =>
                                        setNewCertificate({ ...newCertificate, issuerUri: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3">
                            <div className="flex flex-col gap-y-2">
                                <p> Completion Date</p>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="1658448000"
                                    value={newCertificate.completeDate}
                                    onChange={(e) =>
                                        setNewCertificate({ ...newCertificate, completeDate: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3">
                            <div className="flex flex-col gap-y-2">
                                <p> School Name</p>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Metacamp Academy"
                                    value={newCertificate.schoolName}
                                    onChange={(e) =>
                                        setNewCertificate({ ...newCertificate, schoolName: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3">
                            <div className="flex flex-col gap-y-2">
                                <p> School Logo URL</p>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="https://metacamp.so/logo.png"
                                    value={newCertificate.schoolUri}
                                    onChange={(e) =>
                                        setNewCertificate({ ...newCertificate, schoolUri: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3">
                            <div className="flex flex-col gap-y-2">
                                <p className="hidden md:block">&nbsp;</p>
                                <button
                                    onClick={() => onClickGenerate()}
                                    className="inline-block flex justify-center items-center rounded-lg bg-sky-300 py-2.5 px-3 text-sm font-semibold text-slate-900 hover:bg-sky-200 active:bg-sky-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50"
                                >
                                    {isLoading ? (
                                        <svg
                                            className="animate-spin h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        'Generate'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Batch;
