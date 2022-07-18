import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { initElearnClient } from '../../client/common/init';

const SideBar = () => {
    const wallet = useAnchorWallet();
    const location = useLocation();
    const [permissionType, setPermissionType] = useState<number>(0);

    useEffect(() => {
        (async () => {
            if (wallet) {
                try {
                    const elClient = await initElearnClient();
                    const [managerProofPDA, _] = await elClient.findManagerProofPDA(wallet.publicKey);
                    const managerProofAcc = await elClient.fetchManagerProofAcc(managerProofPDA);
                    setPermissionType(managerProofAcc.permissionType);
                } catch (err) {
                    console.log(err);
                }
            }
        })();
    }, [wallet]);

    return (
        <aside
            id="sidebar"
            className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
            aria-label="Sidebar"
        >
            <div className="relative flex-1 flex flex-col min-h-0 border-r border-slate-800 bg-slate-900 pt-0">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 bg-slate-900 divide-y space-y-1">
                        <ul className="space-y-2 pb-1">
                            <li>
                                <Link
                                    to="/certificate"
                                    className={`text-base font-normal rounded-lg flex items-center p-2 hover:text-gray-900 hover:bg-gray-100 group ${
                                        location.pathname == '/certificate' ? 'text-sky-400' : 'text-gray-300'
                                    }`}
                                >
                                    <svg
                                        className="w-6 h-6 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z"></path>
                                        <path
                                            fillRule="evenodd"
                                            d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="ml-3">Search Certificate</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/batches"
                                    className={`text-base font-normal rounded-lg flex items-center p-2 hover:text-gray-900 hover:bg-gray-100 group ${
                                        location.pathname == '/batches' ? 'text-sky-400' : 'text-gray-300'
                                    }`}
                                >
                                    <svg
                                        className="w-6 h-6 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                                    </svg>
                                    <span className="ml-3">Manage Batches</span>
                                </Link>
                            </li>
                            {(permissionType & (1 << 3)) > 0 ? (
                                <li>
                                    <Link
                                        to="/users"
                                        className={`text-base font-normal rounded-lg flex items-center p-2 hover:text-gray-900 hover:bg-gray-100 group ${
                                            location.pathname == '/users' ? 'text-sky-400' : 'text-gray-300'
                                        }`}
                                    >
                                        <svg
                                            className="w-6 h-6 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                        </svg>
                                        <span className="ml-3">Manage Users</span>
                                    </Link>
                                </li>
                            ) : (
                                <></>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
