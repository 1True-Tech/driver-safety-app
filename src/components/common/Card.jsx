import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import '../../styles/components/Card.css';

function Card({ id, type, firstName, lastName, imageURL, city, secondaryInfo }) {
  const routePath = type === 'driver' ? `/drivers/${id}` : `/riders/${id}`;
  
  return (
    <Link to={routePath} className="card-link">
      <div className="card">
        <div className="card-image">
          <Avatar 
            firstName={firstName}
            lastName={lastName}
            imageURL={imageURL}
            size="lg"
          />
        </div>
        
        <div className="card-content">
          <h3 className="card-name">{firstName} {lastName}</h3>
          
          <p className="card-city">{city}</p>
          
          {secondaryInfo && (
            <p className="card-secondary">{secondaryInfo}</p>
          )}
        </div>
        
        <div className="card-arrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 10L13 4M13 4H7M13 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default Card;
