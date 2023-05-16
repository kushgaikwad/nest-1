import { Test, TestingModule } from '@nestjs/testing';
import { noteStub } from '../../test/stubs/note.stub';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { Note } from './schemas/note.schema';

jest.mock('./note.service');

describe('NoteController', () => {
  let controller: NoteController;
  let service: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService],
    }).compile();

    controller = module.get<NoteController>(NoteController);
    service = module.get<NoteService>(NoteService);
    jest.clearAllMocks();
  });

  describe('getNotes', () => {
    describe('when getNotes is called', () => {
      let notes: Note[];

      beforeEach(async () => {
        notes = await controller.getAllNotes();
      });

      test('then it should call service', () => {
        expect(service.findAll).toHaveBeenCalled();
      });

      test('then it should return notes', () => {
        expect(notes).toEqual([noteStub()]);
      });
    });
  });
});
