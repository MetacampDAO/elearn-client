import React, { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import image from '../../../public/images/metacamp-logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { initElearnClient } from '../../client/common/init';

const NavBar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
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
        <nav className="bg-slate-900 border-b border-slate-800 fixed z-30 w-full">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex w-full md:w-fit items-center justify-between">
                        <div className={isNavOpen ? 'showMenuNav' : 'hideMenuNav'}>
                            {' '}
                            <div
                                className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                                onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
                            >
                                <svg
                                    className="h-8 w-8 text-gray-600"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </div>
                            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col justify-between">
                                <li className="my-3">
                                    <Link
                                        to="/certificate"
                                        onClick={() => setIsNavOpen(false)}
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
                                <li className="my-3">
                                    <Link
                                        to="/batches"
                                        onClick={() => setIsNavOpen(false)}
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
                                    <li className="my-3">
                                        <Link
                                            to="/users"
                                            onClick={() => setIsNavOpen(false)}
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
                                <li className="my-3 flex justify-center">
                                    <WalletMultiButton className="!bg-gradient-to-r from-sky-500 via-blue-600 !to-purple-700 hover:from-sky-400 !rounded-lg" />
                                </li>
                            </ul>
                        </div>
                        <a href="/" className="text-xl font-bold flex items-center lg:ml-2.5">
                            <img src={image} className="h-7 md:h-8 mr-2" alt="metacamp Logo" />
                        </a>
                        <button
                            id="toggleSidebarMobile"
                            aria-expanded="true"
                            aria-controls="sidebar"
                            onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
                            className="lg:hidden text-gray-600 -mr-1 hover:text-gray-400 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                        >
                            <svg
                                className="w-7 h-7"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="hidden md:block flex items-center">
                        <WalletMultiButton className="!bg-gradient-to-r from-sky-500 via-blue-600 !to-purple-700 hover:from-sky-400 !rounded-lg" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
