import axios from "axios";
import {useEffect, useState} from "react";

//import profileImage from "./assets/RESUME PICTURE JCF.jpg";

export default function Header({ maximizeImage }) {
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
        <div className="header">

            <div className="profile-img-CONTAINER">
                <img
                    src={'http://localhost:8080/' + data.ImageURL}
                    className="profile-img"
                    onClick={maximizeImage}
                    alt="Driver"
                />
            </div>

            <h1>{data.FirstName} {data.LastName}</h1>
            <p>Independent Driver | {data.City}</p>

        </div>
    );
}