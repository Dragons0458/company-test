import { Database } from 'src/fake-database/classes/database';
import { data } from 'src/fake-database/initial-data';

const database = new Database();

database.populateData(data);

export const databaseInstance = database;
