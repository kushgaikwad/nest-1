import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '../../app.module';
import { noteStub } from '../../../test/stubs/note.stub';
import * as request from 'supertest';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';

describe('NoteController', () => {
  let httpServer: any;
  let app: INestApplication;
  let dbConnection: Connection;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = app.get(getConnectionToken()) as Connection;
    //dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dbConnection.collection('notes').deleteOne(noteStub());
  });

  describe('getNotes', () => {
    it('should return an array of notes', async () => {
      await dbConnection.collection('notes').insertOne(noteStub());
      const response = await request(httpServer).get('/notes');

      expect(response.status).toBe(200);

      expect(Array.isArray(response.body)).toBe(true);
      const hasNote = response.body.some(
        (note) => note.selectedText === noteStub().selectedText,
      );

      expect(hasNote).toBe(true);
    });
  });
});
