const request = require('supertest');
const app = require('../src/app');

describe('GET', () => {
  describe('/notes', () => {
    it('returns all the initial notes', async () => {
      const response = await request(app).get('/notes');

      expect(response.statusCode).toEqual(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body.length).toEqual(100);
      expect(response.body[0]).toEqual({
        id: expect.any(String),
        title: 'Note #100',
        text: 'This is note #100. It is pretty simple.',
        updated: expect.stringMatching(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d.\d{3}Z$/),
      });
    });
  });
});

describe('DELETE', () => {
  describe('/notes/:noteId', () => {
    it('returns deletes a single note', async () => {
      const initialList = await request(app).get('/notes');
      const firstNote = initialList.body[0];
      const initialListLength = initialList.body.length;

      const response = await request(app).delete(`/notes/${firstNote.id}`);

      expect(response.statusCode).toEqual(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toEqual({ message: 'note deleted' });

      const finalList = await request(app).get('/notes');

      expect(finalList.body.length).toEqual(initialListLength - 1);
      expect(finalList.body).not.toContain(firstNote);
    });
  });
})
