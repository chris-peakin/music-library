const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('update album', () => {
    let db;
    let albums;
    let artists;
    beforeEach(async () => {
      db = await getDb();
      await Promise.all([
        db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
            'Tame Impala',
            'rock',
        ])
    ]);

    [artists] = await db.query('SELECT * FROM Artist');

      await Promise.all([
        db.query('INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)', [
            'The Slow Rush',
            2020,
            artists[0].id,
        ]),
        db.query('INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)', [
            'Currents',
            2015,
            artists[0].id,
        ]),
        db.query('INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)', [
            'Live Versions',
            2014,
            artists[0].id,
        ]),
    ]);

    [albums] = await db.query('SELECT * FROM Album');
    });

    afterEach(async () => {
        await db.query('DELETE FROM Album');
        await db.close();
    });

    describe('/album/:albumId', () => {
        describe('PATCH', () => {
            it('updates a single album with the correct id', async () => {
                const album = albums[0];
                const res = await request(app)
                    .patch(`/album/${album.id}`)
                    .send({name: 'new name', year: 'new year', artistId: 'new artistId'});

                expect(res.status).to.equal(200);

                const [[newAlbumRecord],] = await db.query('SELECT * FROM Album WHERE id = ?', [album.id]);

                expect(newAlbumRecord.name).to.equal('new name');
            });

            it('returns a 404 if the album is not in the database', async () =>{
                const res = await request(app)
                    .patch('/artist/999999')
                    .send({name: 'new name'});

                expect(res.status).to.equal(404);
            })
        })
    })
})