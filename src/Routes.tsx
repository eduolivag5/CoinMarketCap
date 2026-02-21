// Routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CriptoDetails from './pages/CriptoDetails';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import Metrics from './pages/Metrics';
import Categories from './pages/Categories';
import CategoryDetails from './pages/CategoryDetails';
import Portfolio from './pages/Portfolio';
import Transactions from './pages/Transactions';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<CriptoDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/global-metrics" element={<Metrics />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<CategoryDetails />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/portfolio/transactions/:id" element={<Transactions />} />
        </Routes>
    );
};

export default AppRoutes;
