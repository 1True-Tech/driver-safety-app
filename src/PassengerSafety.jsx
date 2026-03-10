// import "./Safety.css";

function PassengerSafety() {

  const shareLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const locationLink =
          `https://www.google.com/maps?q=${lat},${lng}`;

        const message =
          `For safety, here is my live ride location:\n${locationLink}`;

        // Opens WhatsApp share (works on phone + desktop)
        const whatsappURL =
          `https://wa.me/?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");
      },
      (error) => {
        alert("Location permission denied.");
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  return (
    <div className="section">
      <h2>Passenger Safety</h2>

      <button
        className="btn btn-primary"
        onClick={shareLocation}
      >
        Share My Location
      </button>
    </div>
  );
}

export default PassengerSafety;