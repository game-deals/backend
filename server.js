'use strict'

const express = require('express');
const server = express();
const cors=require('cors');
const axios = require('axios');
const pg=require('pg');
server.use(cors());
server.use(express.json());
const PORT =3005;

server.get('/',gitListOfDeals );
server.get('*', errorHandler);


function gitListOfDeals (req, res) {
  
 let url = `https://www.cheapshark.com/api/1.0/deals`;
       axios.get(url)
       .then(result =>{
        let Game=result.data;
            //  console.log(result.data);
            res.send(Game);
       })
 }

    function errorHandler(error,req,res){
        const err={
            errNum:500,
            msg:error
        }
        res.status(500).send(err);
    }

    server.listen(PORT, () => {
        console.log('server')
       });