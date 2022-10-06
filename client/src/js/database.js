import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (name, email, gitHub) => {
  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('content', 'readwrite');

  const store = tx.objectStore('content');

  const request = store.add({name: name, email: email, gitHub: gitHub});

  const result = await request;
  return result;
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('content', 'readonly');

  const store = tx.objectStore('content');

  const request = store.getAll();

  const result = await request;
  return result;
}

initdb();
