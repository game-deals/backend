

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

    function errorHandler(error,req,res){
        const err={
            errNum:500,
            msg:error
        }
        res.status(500).send(err);



client.connect()
.then(() => {
    server.listen(PORT, () =>{
        console.log(`port: ${PORT} , ready`)
    })
});


  