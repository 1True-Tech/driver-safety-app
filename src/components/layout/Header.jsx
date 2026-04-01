import ProfileImage from "../common/ProfileImage";
import "../../styles/components/Header.css";
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Header({ maximizeImage }) {
  const driverid = useParams().driverid
  const { run, loading, error, data } = useFetch(
    { FirstName: "", LastName: "", City: "", ImageURL: "" },
    `/drivers/${driverid}`
  );
  
  useEffect(() => {
    // Make GET request to fetch data
    run("GET");
  }, [run, driverid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="header">
      <div className="profile-img-CONTAINER">
        <img
          src={data?.ImageURL ? "http://localhost:8080/" + data.ImageURL : ""}
          className="profile-img"
          onClick={maximizeImage}
          alt="Driver"
        />
      </div>

      <h1>
        {data?.FirstName} {data?.LastName}
      </h1>
      <p>Independent Driver | {data?.City || "N/A"}</p>
    </div>
  );
}
