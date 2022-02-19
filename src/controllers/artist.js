const express = require('express');
//const app = require('../app');
const artist = express();
const getDb = require('../services/db');


artist.use(express.json());

exports.create = async (req, res) => {
    const db = await getDb();
    const { name, genre } = req.body;
  
    try {
      await db.query(`INSERT INTO Artist (name, genre) VALUES ('${name}','${genre}')`);
  
      res.sendStatus(201);
    } catch (err) {
        console.log(err);
      res.sendStatus(500).json(err);
    }
  
    db.close();
  };

// exports.create = async (req, res) => {
//     const db = await getDb();
//     const {name, genre} = req.body
//     try{
//         console.log(name, genre);
//         console.log(`INSERT INTO Artist (name, genre) VALUES ('Tame Impala', 'rock')`);
//         await db.query(`INSERT INTO Artist (name, genre) VALUES ('Tame Impala', 'rock')`);
//         res.sendStatus(201);
//     } catch (err){
//         console.log(err)
//         res.sendStatus(500).json(err);
//     }
//     db.close();
// };

