const getDb = require('../services/db');

exports.create = async (req, res) => {
    const db = await getDb();
    const { name, year, artistId} = req.body;

    try{
        await db.query(`INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)`, [
            name,
            year,
            artistId,
        ]);

        res.sendStatus(201);
    } catch (err){
        console.log(err);
        res.sendStatus(404).json(err);
    }

    db.close();
}