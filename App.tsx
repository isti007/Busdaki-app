
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import Planner from './pages/Planner';
import Safety from './pages/Safety';
import Profile from './pages/Profile';
import TicketPage from './pages/TicketPage';
import { LanguageProvider } from './context/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/ticket" element={<TicketPage />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
