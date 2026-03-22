
import "../../styles/components/Section.css";
import "../../styles/components/DriverContact.css";

function DriverContact() {

  // CHANGE TO YOUR REAL NUMBER
  const phoneNumber = "+18765551234";

  // CALL BUTTON
  const callDriver = () => {
    window.location.href = `tel:${phoneNumber}`;
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