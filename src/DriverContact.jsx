import axios from "axios";
import {useEffect, useState} from "react";

function DriverContact() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dashquery = window.location.search;
  const dashparams = new URLSearchParams(dashquery);
  const driverid = dashparams.get('driverid');

  useEffect(() => {
    // Make GET request to fetch data
    axios
        .get("http://localhost:8080/driver?driverid=" + driverid)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // CALL BUTTON
  const callDriver = () => {
    window.location.href = `tel:${data.Phone}`;
  };

  // WHATSAPP BUTTON
  const whatsappDriver = () => {
    const whatsappURL = `https://wa.me/${phoneNumber.replace("+", "")}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="section">
      <h2>Contact Driver</h2>

      <div className="contact-buttons">

        <button id="callDriver" onClick={callDriver}>
          Call Driver
        </button>

        <button id="whatsappDriver" onClick={whatsappDriver}>
          WhatsApp Driver
        </button>

      </div>
    </div>
  );
}

export default DriverContact;