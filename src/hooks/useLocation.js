import { useState } from 'react';

export function useLocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const shareLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported on this device.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const locationLink = `https://www.google.com/maps?q=${lat},${lng}`;
        const message = `For safety, here is my live ride location:\n${locationLink}`;

        const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
        setLoading(false);
      },
      (error) => {
        setError("Location permission denied.");
        setLoading(false);
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  return { shareLocation, loading, error };
}