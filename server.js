

'use strict';
const express = require('express');
const cors = require('cors');
const server = express();
const pg = require('pg');
server.use(cors());
const PORT = 3005;
server.use(express.json()); ////
let axios = require('axios');


const client = new pg.Client("postgresql://localhost:5432/games");
////////////////////////////////


server.get('/trending', trendingHandler)
server.get('/getGames/:id', getGamesByIdHandler)
server.get('/getFav', getFavHandler)
server.post('/addToFav', addToFav);
server.get('/',gitListOfDeals );
server.get('*', errorHandler);

function addToFav(req, res){
    const favGames = req.body;
    const sql = `INSERT INTO favgames (thumb, title, steamratingcount, steamratingpercent, comment)
    VALUES ($1, $2, $3, $4, $5);`

    // values names // from this api https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15
    // except for comment
    const values = [favGames.thumb, favGames.title, favGames.steamRatingCount, favGames.steamRatingPercent, favGames.comment]// *****
    client.query(sql, values)
    .then(data => {
        res.send("the game has been added to favorite");
    })
    .catch((error)=>{
       errorHandler(error, req, res) 
    })
}

function gitListOfDeals (req, res) {
  
 let url = `https://www.cheapshark.com/api/1.0/deals`;
       axios.get(url)
       .then(result =>{
        let Game=result.data;
            //  console.log(result.data);
            res.send(Game);
       })
    .catch((error)=>{
       errorHandler(error, req, res) 
    })
 }
function getGamesByIdHandler(req, res) {
    const id= encodeURIComponent(req.params.id);
console.log(encodeURIComponent(req.params.id))
    const url = `https://www.cheapshark.com/api/1.0/deals?id=${id}`

    
    axios.get(url)
    .then(body=>{
       console.log(body.data.gameInfo)
        res.send(body.data.gameInfo);
    })

    .catch((error)=>{
        errorHandler(error,req,res)
    })
}
function getFavHandler(req, res) {
    const sql = `SELECT * FROM favgames`;
    client.query(sql)
    .then(data=>{
        res.send(data.rows);
    })

    .catch((error)=>{
        errorHandler(error,req,res)
    })
}


function trendingHandler(req, res) {
    const url =' https://newsapi.org/v2/everything?q=steam AND release AND games&from=2023-05-25&to=2023-05-25&language=en&sortBy=popularity&apiKey=1b0a9b5a72b14754bba7c153ec2364e0'


    axios.get(url)
        .then(axiosResult => {

            let mapResult = axiosResult.data.articles.map(item => {
                let singlemovie = new axiosTrending(item.title, item.description, item.urlToImage, item.url);
                return singlemovie;
            })
            console.log(mapResult)
            res.send(mapResult)

        })
        .catch((error) => {
            console.log('sorry you have something error', error)
            res.status(500).send(error);
        })


}
function axiosTrending(title, description, urlToImage,url) {
    
    this.title = title;
    this.description = description;
    this.urlToImage = urlToImage;
    this.url=url;
   
}

    function errorHandler(error,req,res){
        const err={
            errNum:500,
            msg:error
        }
        res.status(500).send(err);}



client.connect()
.then(() => {
    server.listen(PORT, () =>{
        console.log(`port: ${PORT} , ready`)
    })
});


  

