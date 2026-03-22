import profileImage from "../../assets/RESUME PICTURE JCF.jpg";
import "../../styles/components/ProfileImage.css";

export default function ProfileImage({ onClick }) {
  return (
    <div className="profile-img-CONTAINER">
      <img
        src={profileImage}
        className="profile-img"
        onClick={onClick}
        alt="Driver"
      />
    </div>
  );
}