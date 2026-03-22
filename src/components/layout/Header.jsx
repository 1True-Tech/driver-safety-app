import ProfileImage from "../common/ProfileImage";
import "../../styles/components/Header.css";

export default function Header({ maximizeImage }) {
  return (
    <div className="header">
      <ProfileImage onClick={maximizeImage} />
      <h1>Jevonne Shaw</h1>
      <p>Independent Driver | Kingston</p>
    </div>
  );
}