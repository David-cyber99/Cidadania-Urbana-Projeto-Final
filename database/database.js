import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('cidadaniaurbana.db');

export default db;
