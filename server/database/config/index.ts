import { db_host, db_name, db_password, db_port, db_user, node_env, log } from "../../config";

type DbConnection = {
	host: string;
	port: number;
	user: string;
	password: string;
	database: string;
	dbLogging: boolean;
};

const connection: DbConnection = {
	host: db_host,
	port: db_port,
	user: db_user,
	password: db_password,
	database:db_name,
	dbLogging:
		node_env === 'development' || log === 'true',
};

export default connection;
