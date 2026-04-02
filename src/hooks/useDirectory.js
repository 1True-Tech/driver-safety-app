import { useMemo } from 'react';
import personasData from '../_dummy_data/personas.json';

export function useDirectory() {
  const { driverPersonas, riderPersonas } = personasData;

  // Drivers lookups
  const getDriverById = (driverId) => {
    return driverPersonas.find(driver => driver.DriverID === driverId);
  };

  const getDriversByCity = (city) => {
    return driverPersonas.filter(driver => driver.City === city);
  };

  const getDriversByLicenseStatus = (licensed) => {
    return driverPersonas.filter(driver => driver.Licensed === licensed);
  };

  const searchDrivers = (query) => {
    const lowerQuery = query.toLowerCase();
    return driverPersonas.filter(driver => 
      driver.FirstName.toLowerCase().includes(lowerQuery) ||
      driver.LastName.toLowerCase().includes(lowerQuery) ||
      driver.Username.toLowerCase().includes(lowerQuery) ||
      driver.Email.toLowerCase().includes(lowerQuery)
    );
  };

  // Riders lookups
  const getRiderById = (riderId) => {
    return riderPersonas.find(rider => rider.RiderID === riderId);
  };

  const getRidersByCity = (city) => {
    return riderPersonas.filter(rider => rider.City === city);
  };

  const searchRiders = (query) => {
    const lowerQuery = query.toLowerCase();
    return riderPersonas.filter(rider =>
      rider.FirstName.toLowerCase().includes(lowerQuery) ||
      rider.LastName.toLowerCase().includes(lowerQuery) ||
      rider.Username.toLowerCase().includes(lowerQuery) ||
      rider.Email.toLowerCase().includes(lowerQuery)
    );
  };

  // Cross-lookups
  const getRelatedRidersByCity = (city) => {
    return riderPersonas.filter(rider => rider.City === city);
  };

  const getRelatedDriversByCity = (city) => {
    return driverPersonas.filter(driver => driver.City === city);
  };

  // Utility functions
  const getAllCities = () => {
    const cities = new Set([
      ...driverPersonas.map(d => d.City),
      ...riderPersonas.map(r => r.City)
    ]);
    return Array.from(cities).sort();
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Memoized values
  const memoized = useMemo(() => ({
    drivers: driverPersonas,
    riders: riderPersonas,
    cities: getAllCities(),
  }), []);

  return {
    // Data
    drivers: memoized.drivers,
    riders: memoized.riders,
    cities: memoized.cities,
    
    // Driver functions
    getDriverById,
    getDriversByCity,
    getDriversByLicenseStatus,
    searchDrivers,
    
    // Rider functions
    getRiderById,
    getRidersByCity,
    searchRiders,
    
    // Cross-lookups
    getRelatedRidersByCity,
    getRelatedDriversByCity,
    
    // Utilities
    getInitials,
  };
}
