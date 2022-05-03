import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Restaurant from "../restaurant/Restaurant"
import Share from "../share/Share";
import Search  from "../search/Search";
import "./profileFeed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import StackGrid from "react-stack-grid";
import InfiniteScroll from 'react-infinite-scroller';

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts/profile/${username}`);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="profilefeed">
      <div className="profilefeedWrapper">
        {(username === user.username || !username) && <Share />}
            {posts.map((p) => (
              <Post key={p._id} post={p} />
            ))} 
      </div>
    </div>
  );

}
