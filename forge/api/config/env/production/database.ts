export default ({ env }) => ({
	connection: {
		client: 'mysql',
		connection: {
		host: env('DATABASE_HOST', 'localhost'),
			port: env.int('DATABASE_PORT', 3306),
			database: env('DATABASE_NAME', 'gefest'),
			user: env('DATABASE_USERNAME', 'gefest'),
			password: env('DATABASE_PASSWORD', 'gefestPassword'),
			ssl: env.bool('DATABASE_SSL', false)
		}
	}
});
