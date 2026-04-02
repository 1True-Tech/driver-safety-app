import { useState, useMemo } from 'react';
import { useDirectory } from '../../hooks/useDirectory';
import Card from '../common/Card';
import Section from '../common/Section';
import '../../styles/pages/DriversPage.css';

function DriversPage() {
  const { drivers, cities } = useDirectory();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [licenseFilter, setLicenseFilter] = useState('all');

  const filteredDrivers = useMemo(() => {
    return drivers.filter(driver => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          driver.FirstName.toLowerCase().includes(query) ||
          driver.LastName.toLowerCase().includes(query) ||
          driver.Username.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // City filter
      if (selectedCity && driver.City !== selectedCity) return false;

      // License filter
      if (licenseFilter === 'licensed' && !driver.Licensed) return false;
      if (licenseFilter === 'unlicensed' && driver.Licensed) return false;

      return true;
    });
  }, [drivers, searchQuery, selectedCity, licenseFilter]);

  return (
    <div className="drivers-page">
      <div className="page-header">
        <h1>Drivers</h1>
        <p className="page-subtitle">Browse and manage all drivers</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M14 14L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="search"
            placeholder="Search by name, username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-row">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="filter-select"
          >
            <option value="">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            value={licenseFilter}
            onChange={(e) => setLicenseFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All License Status</option>
            <option value="licensed">Licensed</option>
            <option value="unlicensed">Unlicensed</option>
          </select>
        </div>
      </div>

      <div className="results-header">
        <p className="results-count">
          {filteredDrivers.length} driver{filteredDrivers.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="drivers-list">
        {filteredDrivers.length > 0 ? (
          filteredDrivers.map(driver => (
            <Card
              key={driver.DriverID}
              id={driver.DriverID}
              type="driver"
              firstName={driver.FirstName}
              lastName={driver.LastName}
              imageURL={driver.ImageURL}
              city={driver.City}
              secondaryInfo={driver.Vehicle}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>No drivers found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DriversPage;
