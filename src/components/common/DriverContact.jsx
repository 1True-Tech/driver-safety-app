import "../../styles/components/Section.css";
import "../../styles/components/DriverContact.css";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";

function DriverContact() {
  const driverid = useParams().driverid;
  const { run, loading, error, data } = useFetch({
    Phone: ""
  }, `/drivers/${driverid}`);
  useEffect(() => {
    // Make GET request to fetch data
    run("GET");
  }, [run]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // CALL BUTTON
  const callDriver = () => {
    window.location.href = `tel:${data.Phone}`;
  };

  // WHATSAPP BUTTON
  const whatsappDriver = () => {
    const whatsappURL = `https://wa.me/${data.Phone.replace("+", "")}`;
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
