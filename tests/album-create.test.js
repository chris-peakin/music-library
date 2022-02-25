// tests/album-create.js
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const getDb = require('../src/services/db');

describe('create album', () =>{
    let db;
    beforeEach(async () => (db = await getDb()));

    afterEach(async () => {
        await db.query('DELETE FROM Album');
        await db.close();
    });

    describe('/artist/:artistId/album', () => {
        describe('POST', () =>{
            it('creates a new album in the database', async () => {
                const res = await request(app).post('/album/:artistId/album').send({
                    name: 'The Slow Rush',
                    year: 2020,
                    artistId: 1,
                });
                expect(res.status).to.equal(201);

                const [[albumEntries]] = await db.query(
                    `SELECT * FROM Album WHERE name = 'The Slow Rush`
                );

                expect(albumEntries.name).to.equal('The Slow Rush');
                expect(albumEntries.year).to.equal(2020);
                expect(albumEntries.artistId).to.equal(1);
            })
        })
    })
})