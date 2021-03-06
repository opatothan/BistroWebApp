import "./topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Topbar() {
  // BEGIN PART 12

  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" , alignItems: "center"}}>
          <span className="logo">Bistro Restaurant Finder</span>
        </Link>
      </div>
      <div className="topbarRight">{<Link to={`/profile/${user.username}`}>
  <img
    src={
      user.profilePicture
        ? PF + user.profilePicture
        : PF + "person/noAvatar.png"
    }
    alt=""
    className="topbarImg"
  />
</Link>}</div>
    </div>
  );
  // END PART 12
}
