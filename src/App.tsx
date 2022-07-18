import React, { FC } from 'react';
import Context from './Context';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home';
import Users from './components/users';
import NavBar from './components/common/NavBar';
import Main from './components/common/Main';
import Batches from './components/batches';
import Batch from './components/batch';

export const App: FC = () => {
    return (
        <Context>
            <BrowserRouter>
                <NavBar />
                <Main childComp={
                    <Routes>
                        {/* <Route path='/join' element={
                            <Join />
                        } /> */}
                        <Route path='/batch/:batchKey' element={
                            <Batch />
                        } />
                        <Route path='/batches' element={
                            <Batches />
                        } />
                        <Route path='/users' element={
                            <Users />
                        } />
                        <Route path='/' element={
                            <Home />
                        } />
                    </Routes>
                } />
            </BrowserRouter>
        </Context>
    );
};
