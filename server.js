// install this in the terminal:
// *** npm install express cors dotenv pg axios fs ***

'use strict';

const express = require('express');
const cors = require('cors');
const server = express();
require('dotenv').config();
const pg = require('pg');

server.use(cors());
const PORT = 3005;
server.use(express.json()); ////
let axios = require('axios');


const client = new pg.Client("postgresql://localhost:5432/games");
////////////////////////////////

server.post('/addToFav', addToFav);

////////////////////////////////

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



/////////////////////////////////
// 404:
// server.use(function(req, res){
//     res.status(404).send('page not found...');
// });

function errorHandler(error,req,res){
    const err = {
        status: 500,
        message: error
    }
    res.status(500).send(err);
}
client.connect()
.then(() => {
    server.listen(PORT, () =>{
        console.log(`port: ${PORT} , ready`)
    })
});