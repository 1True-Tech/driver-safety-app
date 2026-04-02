import { useState, useMemo } from 'react';
import { useDirectory } from '../../hooks/useDirectory';
import Card from '../common/Card';
import '../../styles/pages/RidersPage.css';

function RidersPage() {
  const { riders, cities } = useDirectory();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const filteredRiders = useMemo(() => {
    return riders.filter(rider => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          rider.FirstName.toLowerCase().includes(query) ||
          rider.LastName.toLowerCase().includes(query) ||
          rider.Username.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // City filter
      if (selectedCity && rider.City !== selectedCity) return false;

      return true;
    });
  }, [riders, searchQuery, selectedCity]);

  return (
    <div className="riders-page">
      <div className="page-header">
        <h1>Riders</h1>
        <p className="page-subtitle">Browse and manage all riders</p>
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
        </div>
      </div>

      <div className="results-header">
        <p className="results-count">
          {filteredRiders.length} rider{filteredRiders.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="riders-list">
        {filteredRiders.length > 0 ? (
          filteredRiders.map(rider => (
            <Card
              key={rider.RiderID}
              id={rider.RiderID}
              type="rider"
              firstName={rider.FirstName}
              lastName={rider.LastName}
              imageURL={rider.ImageURL}
              city={rider.City}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>No riders found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RidersPage;
