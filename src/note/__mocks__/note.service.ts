import { noteStub } from '../../../test/stubs/note.stub';

export const NoteService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([noteStub()]),
  create: jest.fn().mockResolvedValue(noteStub()),
});
