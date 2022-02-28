// tests/album-create.js
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const getDb = require('../src/services/db');

describe('create album', () =>{
    let db;
    let artists;
    beforeEach(async () => {
        db = await getDb()

        await Promise.all([
            db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
                'Tame Impala',
                'rock',
            ])
        ]);

        [artists] = await db.query('SELECT * FROM Artist');
    });

    afterEach(async () => {
        await db.query('DELETE FROM Album');
        await db.close();
    });

    describe('/album', () => {
        describe('POST', () =>{
            it('creates a new album in the database', async () => {
                const res = await request(app).post('/album').send({
                    name: 'The Slow Rush',
                    year: 2020,
                    artistId: artists[0].id,
                });
                expect(res.status).to.equal(201);

                const [[albumEntries]] = await db.query(
                    `SELECT * FROM Album WHERE name = 'The Slow Rush'`
                );

                expect(albumEntries.name).to.equal('The Slow Rush');
                expect(albumEntries.year).to.equal(2020);
                expect(albumEntries.artistId).to.equal(artists[0].id);
            })
        })
    })
})