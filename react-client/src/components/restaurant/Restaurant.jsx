import "./restaurant.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [openStatus, setOpenStatus] = useState("Currently Closed");
  const { user: currentUser } = useContext(AuthContext); 
  const [upvotes, setUpvotes] = useState(0);
  useEffect(() => {
    if(!post.is_closed){
      setOpenStatus("Currently Open");
    }
  }, [post.is_closed]);
  
  
  useEffect(() => {
    setUpvotes( "upvotes" in post ? post.upvotes : 0 );
  }, [post, post.upvotes]);


  const updateUpvotes = (x) =>{
    try{
/*       if(x==1){
        axios.put(`/restaurants/${post.id}/upvote`, { userId: currentUser._id });
      }
      else{
        axios.put(`/restaurants/${post.id}/upvote`, { userId: currentUser._id });
      } */
        setUpvotes(upvotes+x);
      
   }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="restaurant">
      <div className="restaurantWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <span className="postUsername">{post.name}</span>
            <span className="postDate">{openStatus}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <img
            className="postImg"
            src={post.image_url}
            alt=""
          />
          {post.location.display_address.map((p) => (
            <div className="postText">{p}</div>
          ))}
        </div>
         <div className="postBottom">
          <div className="postBottomRight">
            <img
              className="likeIcon"
              src={PF + "uparrow.png"}
              alt=""
              onClick = {() => updateUpvotes(1)}
            />
            <img
              className="likeIcon"
              src={PF + "downarrow.png"}
              alt=""
              onClick = {() => updateUpvotes(-1)}
            />
            <span className="postLikeCounter">{upvotes} upvotes</span>
          </div>
        </div> 
      </div>
    </div>
  );
}
