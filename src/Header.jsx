import profileImage from "./assets/RESUME PICTURE JCF.jpg";

export default function Header({ maximizeImage }) {
  return (
    <div className="header">

      <div className="profile-img-CONTAINER">
        <img
          src={profileImage}
          className="profile-img"
          onClick={maximizeImage}
          alt="Driver"
        />
      </div>

      <h1>Jevonne Shaw</h1>
      <p>Independent Driver | Kingston</p>

    </div>
  );
}