const notesController = require('../controllers/UserController');

describe ('Notes Controller', () => {
    let response;

    beforeEach(() => {
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('GET /', () => {
        it('should return all notes successfully', async () => {
            await notesController.getAllNotes({},response);
            expect(response.status).toHaveBeenCalledWith(200);
          }, 10000);
        it('should handle internal server error during getAllNotes', async () => {
            notesController.getAllNotes = jest.fn().mockImplementationOnce(() => {
              throw new Error('Internal Server Error');
            });
            await notesController.getAllNotes({}, response);
            expect(response.status).toHaveBeenCalledWith(500);
          }, 10000);
    });

    describe('POST /post', () => {
        it('should create a new note successfully', async () => {
          const mockRequest = {
            body: { title: 'Test Note', content: 'This is a test note.' },
          };
          await notesController.createNote(mockRequest, response);
          expect(response.status).toHaveBeenCalledWith(200);
        }, 10000);
    
        it('should handle invalid input during createNote', async () => {
          const mockRequest = {
            body: { invalidField: 'Invalid Data' },
          };
          await notesController.createNote(mockRequest, response);
          expect(response.status).toHaveBeenCalledWith(400);
        }, 10000);
    
        it('should handle internal server error during createNote', async () => {
          notesController.createNote = jest.fn().mockImplementationOnce(() => {
            throw new Error('Internal Server Error');
          });
          const mockRequest = {
            body: { title: 'Test Note', content: 'This is a test note.' },
          };
          await notesController.createNote(mockRequest, response);
          expect(response.status).toHaveBeenCalledWith(500);
        }, 10000);
    });

    describe('PUT /:id', () => {
        it('should update an existing note successfully', async () => {
          const mockRequest = {
            params: { id: '653bb3300d88f4ca771b2af0' },
            body: { title: 'Updated Note', content: 'This note has been updated.' },
          };
          await notesController.updateNote(mockRequest, response);
          expect(response.status).toHaveBeenCalledWith(200);
        }, 10000);

        it('should handle updating a non-existing note', async () => {
          const mockRequest = {
            params: { id: '653bb3440d88f4ca771b2af0' },
            body: { title: 'Updated Note' },
          };
          await notesController.updateNote(mockRequest, response);
          expect(response.status).toHaveBeenCalledWith(404);
        }, 10000);
    
        it('should handle internal server error during updateNote', async () => {
          notesController.updateNote = jest.fn().mockImplementationOnce(() => {
            throw new Error('Internal Server Error');
          });
          const mockRequest = {
            params: { id: '653bb3300d88f4ca771b2af0' },
            body: { title: 'Updated Note', content: 'This note has been updated.' },
          };
          await notesController.updateNote(mockRequest, response);
          expect(response.status).toHaveBeenCalledWith(500);
        }, 10000);
    });

    describe('DELETE /:id', () => {
        it('should delete an existing note successfully', async () => {
          const mockRequest = {
            params: { id: '653bb37e0d88f4ca771b2af2' },
          };
          await notesController.deleteNote(mockRequest, response);
          expect(response.status).toHaveBeenCalledWith(200);
        }, 10000);
    
        it('should handle deleting a non-existing note', async () => {
          const mockRequest = {
            params: { id: '653bb37e0d33f4ca771b2af2' },
          };
          await notesController.deleteNote(mockRequest, response);
          expect(response.status).toHaveBeenCalledWith(404);
        }, 10000);

        it('should handle internal server error during deleteNote', async () => {
          notesController.deleteNote = jest.fn().mockImplementationOnce(() => {
            throw new Error('Internal Server Error');
          });
          const mockRequest = {
            params: { id: '653bb37e0d88f4ca771b2af2' },
          };
          await notesController.deleteNote(mockRequest, response);
          expect(response.status).toHaveBeenCalledWith(500);
        }, 10000);
    });    
});