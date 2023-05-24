const express = require('express');
const server = express();
const axios = require("axios");
require('dotenv').config();
const cors = require('cors');
server.use(cors());
const PORT=3005;
const pg = require('pg');




server.get('/getMovies/:id', getMoviesByIdHandler)
server.get('*', error400Handler)

function getMoviesByIdHandler(req, res) {
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
function error400Handler(req, res) {
    let error400 = {
        "status": 400,

        "responseText": 'page not found error'
    }
    res.status(error400.status).send(error400)
}

function errorHandler(error,req,res){
    const err = {
        status: 500,
        message: error
    }
    res.status(500).send(err);
}

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}: I'm ready`)
})