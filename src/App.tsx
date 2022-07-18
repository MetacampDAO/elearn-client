import React, { FC, useEffect, useState } from 'react';
import Context from './Context';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/home';
import Users from './components/users';
import NavBar from './components/common/NavBar';
import Main from './components/common/Main';
import Batches from './components/batches';
import Batch from './components/batch';
import Certificate from './components/certificate';
import Search from './components/search';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { initElearnClient } from './client/common/init';

export const App: FC = () => {
    const wallet = useAnchorWallet();
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
        <Context>
            <BrowserRouter>
                <NavBar />
                <Main
                    childComp={
                        <Routes>
                            <Route path="/certificate/:certPda" element={<Certificate />} />
                            <Route path="/certificate" element={<Search />} />
                            <Route path="/batch/:batchKey" element={<Batch />} />
                            <Route path="/batches" element={<Batches />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/" element={<Home />} />
                        </Routes>
                    }
                />
            </BrowserRouter>
        </Context>
    );
};
