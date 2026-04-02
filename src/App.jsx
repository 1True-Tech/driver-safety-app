
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DriversPage from './components/pages/DriversPage';
import RidersPage from './components/pages/RidersPage';
import DriverProfilePage from './components/pages/DriverProfilePage';
import RiderProfilePage from './components/pages/RiderProfilePage';
import './styles/global/index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/drivers" replace />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="drivers/:id" element={<DriverProfilePage />} />
          <Route path="riders" element={<RidersPage />} />
          <Route path="riders/:id" element={<RiderProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
