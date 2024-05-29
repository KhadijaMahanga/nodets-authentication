import { Sequelize } from 'sequelize';
import connection from './config';

const { database, user, password, host, port } = connection;

// create a sequalize connection
const sequelizeConnection = new Sequelize(`postgres://${user}:${password}@${host}:${port}/${database}`);

export default sequelizeConnection;
