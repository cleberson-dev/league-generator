export type EnvironmentTypes = 'production' | 'development';

export default {
  environment(): EnvironmentTypes {
    switch (process.env.ENV) {
      case 'prod':
        return 'production';
      case 'dev':
      default:
        return 'development';
    }
  },
  database: {
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASS || "",
    name: process.env.DB_NAME || "postgres",
    port: 5432,
  },
  ports: {
    server: 5000,
  },
};
