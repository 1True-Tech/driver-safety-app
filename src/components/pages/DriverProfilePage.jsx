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
        {/* Quick Actions */}
        <div className="quick-actions">
          <a href={`tel:${driver.Phone}`} className="action-button action-call">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Call
          </a>
          <a href={`https://wa.me/${driver.Phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="action-button action-whatsapp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M17.6915026,13.4744748 L14.5274181,12.2744453 C14.0152332,12.0577184 13.4322518,12.2126789 13.1272231,12.6868074 L12.5161018,13.5701935 C11.5624821,13.1701935 10.5792088,12.4526995 9.68969863,11.5631093 C8.80018845,10.6735192 8.08281721,9.69024589 7.68251987,8.73658926 L8.5658659,8.12547095 C9.03999443,7.82050046 9.19495391,7.23751766 8.97823699,6.72533271 L7.77820747,3.56122374 C7.56149054,3.04903879 7.00789109,2.75355828 6.4500455,2.83884826 L3.68289385,3.20164264 C3.14922951,3.28693262 2.75357588,3.74544021 2.75357588,4.29273585 C2.75357588,13.5028213 10.4471845,21.1964299 19.6572698,21.1964299 C20.2045654,21.1964299 20.6630617,20.8007763 20.7483517,20.2671119 L21.1111451,17.5 C21.1964351,16.9421544 20.9009545,16.3885549 20.3887697,16.1718281 Z" fill="currentColor"/>
            </svg>
            WhatsApp
          </a>
        </div>

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
