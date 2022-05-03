import "./sidebar.css";
import { Link , useNavigate} from "react-router-dom";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  Event,
} from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import CloseFriend from "../closeFriend/CloseFriend";
import {logoutCall } from "../../loginCall";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AuthContext);
  const [currentFriends, setCurrentFriends] = useState([]);
  const {dispatch } = useContext(AuthContext);

  const logout = () =>{
    logoutCall(dispatch);
    navigate('/login', {replace: true});
  }

  useEffect(() => {
    const getCurrentFriends = async () => {
      try {
        const currentFriendsList = await axios.get(
          `/users/friends/${currentUser._id}`
        );
        setCurrentFriends(currentFriendsList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentFriends();
  }, [currentUser._id]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            {/* <RssFeed className="sidebarIcon" /> */}
            <Link to={`/profile/${currentUser.username}`} style={{color: 'inherit', textDecoration: 'inherit'}}>
              <span className="sidebarListItemText">Profile</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            {/* <Chat className="sidebarIcon" /> */}
            <span className="sidebarListItemText">Ratings</span>
          </li>
          <li className="sidebarListItem">
            {/* <PlayCircleFilledOutlined className="sidebarIcon" /> */}
            <span className="sidebarListItemText">Leaderboard</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <li className="sidebarListItem">
            {/* <Group className="sidebarIcon" /> */}
            <Link to={`/friends`} style={{color: 'inherit', textDecoration: 'inherit'}}>
              <span className="sidebarListItemText">Friends</span>
            </Link>
          </li>
        <ul className="sidebarFriendList">
          {currentFriends.map((u) => (
            <CloseFriend key={u._id} user={u} />
          ))}
        </ul>
        <hr className="sidebarHr" />
        <button onClick={logout} className = "logoutButton">
            Logout
          </button>
      </div>
    </div>
  );
}
