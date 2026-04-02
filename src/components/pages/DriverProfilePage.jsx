import { useParams, Link } from 'react-router-dom';
import { useDirectory } from '../../hooks/useDirectory';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Section from '../common/Section';
import Card from '../common/Card';
import '../../styles/pages/DriverProfilePage.css';

function DriverProfilePage() {
  const { id } = useParams();
  const { getDriverById, getRelatedRidersByCity } = useDirectory();

  const driver = getDriverById(id);
  const relatedRiders = driver ? getRelatedRidersByCity(driver.City) : [];

  if (!driver) {
    return (
      <div className="profile-page-error">
        <h2>Driver Not Found</h2>
        <Link to="/drivers" className="btn-primary">Back to Drivers</Link>
      </div>
    );
  }

  return (
    <div className="driver-profile-page">
      {/* Header Section */}
      <div className="profile-header">
        <Link to="/drivers" className="back-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Drivers
        </Link>
      </div>

      {/* Hero Section */}
      <div className="profile-hero">
        <div className="hero-avatar">
          <Avatar
            firstName={driver.FirstName}
            lastName={driver.LastName}
            imageURL={driver.ImageURL}
            size="lg"
          />
        </div>

        <div className="hero-content">
          <h1>{driver.FirstName} {driver.LastName}</h1>
          <div className="hero-meta">
            <span className="hero-username">@{driver.Username}</span>
            <Badge status={driver.Licensed ? 'licensed' : 'unlicensed'}>
              {driver.Licensed ? 'Licensed' : 'Unlicensed'}
            </Badge>
          </div>
          <p className="hero-city">{driver.City}, {driver.Country}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* Contact Information */}
        <Section title="Contact Information">
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">Email</span>
              <a href={`mailto:${driver.Email}`} className="info-value">{driver.Email}</a>
            </div>
            <div className="info-row">
              <span className="info-label">Phone</span>
              <a href={`tel:${driver.Phone}`} className="info-value">{driver.Phone}</a>
            </div>
          </div>
        </Section>

        {/* Vehicle Information */}
        <Section title="Vehicle Information">
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">Vehicle</span>
              <span className="info-value">{driver.Vehicle}</span>
            </div>
            <div className="info-row">
              <span className="info-label">License Plate</span>
              <span className="info-value">{driver.LicensePlate}</span>
            </div>
          </div>
        </Section>

        {/* Related Riders */}
        {relatedRiders.length > 0 && (
          <Section title={`Riders in ${driver.City}`}>
            <div className="related-riders-list">
              {relatedRiders.map(rider => (
                <Card
                  key={rider.RiderID}
                  id={rider.RiderID}
                  type="rider"
                  firstName={rider.FirstName}
                  lastName={rider.LastName}
                  imageURL={rider.ImageURL}
                  city={rider.City}
                />
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

export default DriverProfilePage;
