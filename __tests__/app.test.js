const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('07-build-something routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  // it('creates a new favorite in our database', () => {
  //   return request(app)
  //     .post('/api/v1/favorites')
  //     .send({ type: 'coffee', options: `Jim & Patty's` })
  //     .then((res) => {
  //       expect(res.body).toEqual({
  //         id: '1',
  //         type: 'coffee',
  //         options: `Jim & Patty's`
  //       });
  //     });
  // });

  it('creates a new favorite in our database', async () => {
    const res = await request(app)
      .post('/api/v1/favorites')
      .send({ type: 'coffee', options: `Jim & Patty's` });

    expect(res.body).toEqual({
      id: '1',
      type: 'coffee',
      options: `Jim & Patty's`
    });
  });

  it('gets all favorites in our database', async () => {
    const res = await request(app)
      .post('/api/v1/favorites')
      .send({ type: 'coffee', options: `Jim & Patty's` });

    const secondRes = await request(app)
      .post('/api/v1/favorites')
      .send({ type: 'karaoke', options: `Chopsticks II` });

    const thirdRes = await request(app)
      .get('/api/v1/favorites');

    expect(thirdRes.body).toEqual([
      {
        id: '1',
        type: 'coffee',
        options: `Jim & Patty's`
      },
      {
        id: '2',
        type: 'karaoke',
        options: `Chopsticks II`
      },
    ]);
  });

  it('gets favorite with id in our database', async () => {
    const res = await request(app)
      .post('/api/v1/favorites')
      .send({ type: 'coffee', options: `Jim & Patty's` });

    const secondRes = await request(app)
      .get('/api/v1/favorites/1');

    expect(secondRes.body).toEqual(
      {
        id: '1',
        type: 'coffee',
        options: `Jim & Patty's`
      });
  });

  it('updates favorite with id in our database', async () => {
    const res = await request(app)
      .post('/api/v1/favorites')
      .send({ type: 'coffee', options: `Jim & Patty's` });

    const secondRes = await request(app)
      .put('/api/v1/favorites/1')
      .send({ type: 'coffee', options: `Jim & Patty's, Plaid Pantry` });

    expect(secondRes.body).toEqual(
      {
        id: '1',
        type: 'coffee',
        options: `Jim & Patty's, Plaid Pantry`
      });
  });

  // it('deletes order with id in our database and sends a text message', async () => {
  //   const res = await request(app)
  //     .post('/api/v1/orders')
  //     .send({ quantity: 35 });

  //   const secondRes = await request(app)
  //     .delete('/api/v1/orders/1')

  //   expect(secondRes.body).toEqual(
  //     {
  //       id: '1',
  //       quantity: 35,
  //     });
  // });
});