const getDb = require('../services/db');

exports.create = async (req, res) => {
    const db = await getDb();
    const { name, genre } = req.body;
  
    try {
      await db.query(`INSERT INTO Artist (name, genre) VALUES (?, ?)`, [
        name,
        genre,
      ]);
  
      res.sendStatus(201);
    } catch (err) {
        console.log(err);
      res.sendStatus(500).json(err);
    }
  
    db.close();
  };

  exports.read = async (req, res) => {
    const db = await getDb();

    try{
      const arrayOfArrays = await db.query('SELECT * FROM Artist');
      return arrayOfArrays[0];
      res.sendStatus(200);
    } catch (err){
      console.log(err);
      res.sendStatus(500).json(err);
    }
    db.close();
  }