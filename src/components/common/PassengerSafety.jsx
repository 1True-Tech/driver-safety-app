// import "./Safety.css";
import "../../styles/components/Section.css";
import "../../styles/components/PassengerSafety.css";

import "../../styles/components/Section.css";
import "../../styles/components/PassengerSafety.css";
import { useLocation } from "../../hooks/useLocation";

function PassengerSafety() {
  const { shareLocation, loading, error } = useLocation();

  return (
    <div className="section">
      <h2>Passenger Safety</h2>

      {error && <p style={{ color: "#f87171" }}>{error}</p>}

      <button
        className="btn btn-primary"
        onClick={shareLocation}
        disabled={loading}
      >
        {loading ? "Sharing..." : "Share My Location"}
      </button>
    </div>
  );
}

export default PassengerSafety;