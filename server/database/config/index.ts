import { db_host, db_name, db_password, db_port, db_user } from "../../config";

type DbConnection = {
	host: string;
	port: number;
	user: string;
	password: string;
	database: string;
};

const connection: DbConnection = {
	host: db_host,
	port: db_port,
	user: db_user,
	password: db_password,
	database: db_name
};

export default connection;
