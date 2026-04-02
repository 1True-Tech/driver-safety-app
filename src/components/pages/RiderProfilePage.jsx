import { useParams, Link } from 'react-router-dom';
import { useDirectory } from '../../hooks/useDirectory';
import Avatar from '../common/Avatar';
import Section from '../common/Section';
import Card from '../common/Card';
import '../../styles/pages/RiderProfilePage.css';

function RiderProfilePage() {
  const { id } = useParams();
  const { getRiderById, getRelatedDriversByCity } = useDirectory();

  const rider = getRiderById(id);
  const relatedDrivers = rider ? getRelatedDriversByCity(rider.City) : [];

  if (!rider) {
    return (
      <div className="profile-page-error">
        <h2>Rider Not Found</h2>
        <Link to="/riders" className="btn-primary">Back to Riders</Link>
      </div>
    );
  }

  return (
    <div className="rider-profile-page">
      {/* Header Section */}
      <div className="profile-header">
        <Link to="/riders" className="back-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Riders
        </Link>
      </div>

      {/* Hero Section */}
      <div className="profile-hero">
        <div className="hero-avatar">
          <Avatar
            firstName={rider.FirstName}
            lastName={rider.LastName}
            imageURL={rider.ImageURL}
            size="lg"
          />
        </div>

        <div className="hero-content">
          <h1>{rider.FirstName} {rider.LastName}</h1>
          <div className="hero-meta">
            <span className="hero-username">@{rider.Username}</span>
          </div>
          <p className="hero-city">{rider.City}, {rider.Country}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* Contact Information */}
        <Section title="Contact Information">
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">Email</span>
              <a href={`mailto:${rider.Email}`} className="info-value">{rider.Email}</a>
            </div>
            <div className="info-row">
              <span className="info-label">Phone</span>
              <a href={`tel:${rider.Phone}`} className="info-value">{rider.Phone}</a>
            </div>
          </div>
        </Section>

        {/* Related Drivers */}
        {relatedDrivers.length > 0 && (
          <Section title={`Drivers in ${rider.City}`}>
            <div className="related-drivers-list">
              {relatedDrivers.map(driver => (
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
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

export default RiderProfilePage;
