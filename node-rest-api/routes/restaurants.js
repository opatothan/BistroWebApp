const express = require("express");
const axios = require("axios");
const Restaurant = require("../models/Restaurant");


const router = express.Router();
const yelpAPIKey = "r5jVMAsKJ8ermFPUiryiGNaXJ7KPnmKrXGxAaDNCZ4JkIhn4IVt9zH_sr0Bkp-LyHTAEqZNVUlFgI8dzjTXFKFMIi_3pLlPu_tdL-MG4VTtXABJlntU2R6DA7tlkYnYx"
const baseUrl = 'https://api.yelp.com/v3/';

//get restaurants with longitude and latitude in the params

async function getRestaurants(num){
    const options = {
        url: `https://api.yelp.com/v3/businesses/search?latitude=37.868130&longitude=-122.253450&radius=2000&limit=50&offset=0`,
        headers: {
            'Authorization': 'Bearer ' + yelpAPIKey
        }
      };
    var results = [];
    let count = 0;
    while(num>0){
        options.url = `https://api.yelp.com/v3/businesses/search?latitude=37.868130&longitude=-122.253450&radius=2000&limit=${Math.min(50, num)}&offset=${count*50}`;
        await axios.request(options).then(function (response) {
            results = results.concat(response.data.businesses);
        }).catch(function (error) {
            console.error(error);
        });
        num-=50;
        count+=1;
    }
    console.log(results.length);
    return results;
}
/*
router.get("/", async (req, res) => {
    try{
        const options = {
            //url: `${baseUrl}businesses/search?latitude=${req.latitude}&longitude=${req.longitude}`,
            url: `https://api.yelp.com/v3/businesses/search?latitude=37.868130&longitude=-122.253450&radius=2000&limit=50&offset=0`,
            //params: {radius: '5', term: 'Restaurants', offset: '0'},
            headers: {
                'Authorization': 'Bearer ' + yelpAPIKey
            }
          };
        var results = [];
        for(let i = 1 ;i < 5; i++){
            await axios.request(options).then(function (response) {
                //res.status(200).json(response.data.businesses);
                results = results.concat(response.data.businesses);
            }).catch(function (error) {
                console.error(error);
            });
            options.url = `https://api.yelp.com/v3/businesses/search?latitude=37.868130&longitude=-122.253450&radius=2000&limit=50&offset=${i*50}`;
        }
        console.log(`sent ${results.length} restaurants`);
        res.status(200).json(results)
    }
    catch(err){
        console.log(err);
    }

});
*/
//get 200 restaurants
router.get("/", async (req, res) => {
    try{
        let results = await getRestaurants(200);
        console.log(`sent ${results.length} restaurants`);
        res.status(200).json(results)
    }
    catch(err){
        console.log(err);
    }

});

//get a certain number of restaurants
router.get("/get/:amount", async (req, res) => {
    try{
        let results = await getRestaurants(req.params.amount);
        console.log(`sent ${results.length} restaurants`);
        res.status(200).json(results)
    }
    catch(err){
        console.log(err);
    }

});

//get with search term
router.get("/search/:terms", async (req, res) => {
    try{
        const options = {
            url: `https://api.yelp.com/v3/businesses/search?latitude=37.868130&longitude=-122.253450&radius=2000&limit=20&term=${req.params.terms}`,
            headers: {
                'Authorization': 'Bearer ' + yelpAPIKey
            }
          };
        axios.request(options).then(function (response) {
            console.log(`sent ${response.data.businesses.length} restaurants`);
            res.status(200).json(response.data.businesses);
        }).catch(function (error) {
            console.error(error);
        });
    }
    catch(err){
        console.log(err);
    }

});

//get by id
router.get("/:id", async (req, res) => {
    try{
        const options = {
            url: `https://api.yelp.com/v3/businesses/${req.params.id}`,
            headers: {
                'Authorization': 'Bearer ' + yelpAPIKey
            }
          };
        axios.request(options).then(function (response) {
            res.status(200).json(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    catch(err){
        console.log(err);
    }
});

router.put("/:id/upvote", async (req, res) => {
    try {
        const post = await Restaurant.findOne({yelpID:req.params.id});
        console.log(req.body)
        if (post!=null && !post.upvotes.includes(req.body.userId)) {
            console.log("1")
            await post.updateOne({ $push: { upvotes: req.body.userId } });
            res.status(200).json("restaurant upvoted");
        }
        else if(post == null){
            console.log("2")
            const newPost = new Restaurant({yelpID:req.params.id});
            await newPost.updateOne({ $push: { upvotes: req.body.userId } });
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        }
    } catch (err) {
      console.log(err);
    }
  });


router.put("/:id/downvote", async (req, res) => {
try {
    const post = await Restaurant.findOne({yelpID:req.params.id});
    if (post!=null && !post.downvotes.includes(req.body.userId)) {
        
        await post.updateOne({ $push: { downvotes: req.body.userId } });
        res.status(200).json("restaurant downvoted");
    } 
    else if(post==null){
        const newPost = new Restaurant({yelpID:req.params.id});
        await newPost.updateOne({ $push: { downvotes: req.body.userId } });
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
} catch (err) {
    console.log(err);
}
});

router.get("/:id/get", async (req, res) => {
    try{
        const post = await Restaurant.findOne({yelpID:req.params.id});
        if(post==null){
            const newPost = new Restaurant({yelpID:req.params.id});
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        }
        else{
            res.status(200).json(post)
        }
    }
    catch(err){
        console.log(err);
    }
});


  



module.exports = router;