import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Restaurant from "../restaurant/Restaurant"
import Share from "../share/Share";
import Search  from "../search/Search";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import StackGrid from "react-stack-grid";
import InfiniteScroll from 'react-infinite-scroller';

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  // BEGIN PART 14
  const fetchRestaurants = async () => {
    if(searchTerm != ""){
      console.log("found search term");
      console.log(searchTerm);
      const res =  await axios.get(`/restaurants/search/${searchTerm}`);
      await setRestaurants(res.data);       
    }
    else{
      const res =  await axios.get(`/restaurants/get/20`);
      await setRestaurants(res.data);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  // END PART 14
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const search = async (term) => {
    setSearchTerm(term)
    fetchRestaurants();
  }

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Search passChildData= {search}/>
        {(username === user.username || !username) && <Share />}
          <StackGrid columnWidth={300} gutterHeight = {0}>
{/*             {restaurants.map((p) => (
              <Restaurant key={p.id} post={p} />
            ))}
            {posts.map((p) => (
              <Post key={p._id} post={p} />
            ))} */}
            {shuffle(restaurants, posts).map((p) => ("is_closed" in p ? <Restaurant key={p.id} post={p} /> : <Post key={p._id} post={p} />))}
            
          </StackGrid>
      </div>
    </div>
  );
}

function shuffle(array1, array2) {
  let currentIndex = array1.length + array2.length,  randomIndex;
  let i1 = 0;
  let i2 = 0;
  let array = []
  let distribution = array1.length/(array1.length + array2.length)
  let correction = 0.05
  // While there remain elements to shuffle.
  while (i1 < array1.length && i2< array2.length) {

/*     // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]; */
    let x=  Math.random()
    if(x<distribution){
      array.push(array1[i1]);
      i1+=1;
      distribution = distribution * (1-correction);
    }
    else{
      array.push(array2[i2]);
      i2+=1;
      distribution = Math.min(distribution * (1+correction), 1);
    }
  }
  while(i1 < array1.length){
    array.push(array1[i1]);
    i1+=1;
  }
  while(i2< array2.length){
    array.push(array2[i2]);
    i2+=1;
  }

  return array;
}