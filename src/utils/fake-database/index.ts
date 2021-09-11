import { Database } from 'src/utils/fake-database/classes/database';
import { data } from 'src/utils/fake-database/initial-data';

const database = new Database();

database.populateData(data);

export const databaseInstance = database;
