import { Note } from '../../src/note/schemas/note.schema';

export const noteStub = (): Note => {
  return {
    selectedText: 'This is a dog',
    summary: 'This animal is a dog',
    hashtags: ['apples', 'pizza'],
  };
};
