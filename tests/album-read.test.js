// tests/album-read.test.js
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('read album', () => {
    let db;
    let albums;

    beforeEach(async () => {
        db = await getDb();
        await Promise.all([
            db.query('INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)', [
                'The Slow Rush',
                2020,
                1,
            ]),
            db.query('INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)', [
                'Currents',
                2015,
                1
            ]),
            db.query('INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)', [
                'Live Versions',
                2014,
                1,
            ]),
        ]);

        [albums] = await db.query('SELECT * FROM Album');
    });

    afterEach(async () => {
        await db.query('DELETE FROM Album');
        await db.close();
    });

    describe('/album', () =>{
        describe('GET', () => {
            it('returns all album recoreds in the database', async () => {
                const res = await request(app).get('/album').send();

                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(3);

                res.body.forEach((albumRecord) => {
                    const expected = albums.find((a) => a.id === albumRecord.id);

                    expect(albumRecord).to.deep.equal(expected);
                })
            })
        })
    })

    describe('/album/:albumId', () => {
        describe('GET', () => {
            it('returns a single album with the correct id', async () => {
                const expected = albums[0];
                const res = await request(app).get(`/artist/${expected.id}`).send();

                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal(expected);
            })

            it('returns a 404 if the album is not in the database', async () => {
                const res = await request(app).get('/album/999999').send();

                expect(res.status).to.equal(404);
            });
        });
    });
});