import idb from 'idb';

export default function createIndexedDB() {
    const database = 'tinkoffDB';
    const dbVersion = 1;

    let db;
    let objectStore;
    const request = window.indexedDB.open(database, dbVersion);

    request.onupgradeneeded = function(event) {
        db = event.target.result;

        objectStore = db.createObjectStore('precipitation', { keyPath: 'ssn' });
        objectStore.createIndex("name", "name", { unique: false });
    };

    request.onerror = function(event) {
        // все ошибки выводим в alert
        alert("Database error: " + event.target.errorCode);
    };

    return request;
};
