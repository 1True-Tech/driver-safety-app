import "../../styles/components/Section.css";
import "../../styles/components/DriverInfo.css";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";

export default function DriverInfo() {
  const driverid = useParams().driverid;
  const { run, loading, error, data } = useFetch(
    { FirstName: "", LastName: "", Vehicle: "", Phone: "", LicensePlate: "", Licensed: false },
    `/drivers/${driverid}`
  );
  
  useEffect(() => {
    // Make GET request to fetch data
    run("GET").catch((err) => {
      console.error("Failed to fetch driver info:", err);
    });
  }, [run, driverid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="section">
      <h2>Driver Information</h2>
      <ul className="info">
        <li>
          <strong>First Name: {data?.FirstName || "N/A"}</strong>
        </li>
        <li>
          <strong>Last Name: {data?.LastName || "N/A"}</strong>
        </li>
        <li>
          <strong>Vehicle: {data?.Vehicle || "N/A"}</strong>
        </li>
        <li>
          <strong>Phone: {data?.Phone || "N/A"}</strong>
        </li>
        <li>
          <strong>Plate: {data?.LicensePlate || "N/A"}</strong>
        </li>
        <li>
          <strong>Licensed: {data?.Licensed ? "Yes" : "No"}</strong>
        </li>
      </ul>
    </div>
  );
}
