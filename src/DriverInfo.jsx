import axios from "axios";
import {useEffect, useState} from "react";

const App = () => {
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

    return (
        <div className="section">
            <h2>Driver Information</h2>
            <ul className="info">
                <li><strong>First Name: {data.FirstName}</strong></li>
                <li><strong>Last Name: {data.LastName}</strong></li>
                <li><strong>Vehicle: {data.Vehicle}</strong></li>
                <li><strong>Phone: {data.Phone}</strong></li>
                <li><strong>Plate: {data.LicensePlate}</strong></li>
                <li><strong>Licensed: {data.Licensed.toString()}</strong></li>
            </ul>
        </div>
    );
};

export default App;

/*
export default function DriverInfo() {
  return (
    <div className="section">
      <h2>Driver Information</h2>
      <ul className="info">
        <li><strong>Vehicle:</strong> Toyota Axio</li>
        <li><strong>Plate:</strong> ####</li>
        <li><strong>Status:</strong> Licensed Driver</li>
      </ul>
    </div>
);
}
*/
