import React, { useState } from 'react';
import { useDirectory } from '../../hooks/useDirectory';
import '../../styles/components/Avatar.css';

function Avatar({ firstName, lastName, imageURL, size = 'md' }) {
  const { getInitials } = useDirectory();
  const initials = getInitials(firstName, lastName);
  const [isImageError, setIsImageError] = useState(false);

  return (
    <div className={`avatar avatar-${size}`}>
      {!isImageError && imageURL ? (
        <img
          src={imageURL}
          alt={`${firstName} ${lastName}`}
          onError={() => setIsImageError(true)}
          className="avatar-image"
        />
      ) : (
        <div className="avatar-initials">{initials}</div>
      )}
    </div>
  );
}

export default Avatar;
