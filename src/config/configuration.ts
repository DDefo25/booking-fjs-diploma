export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.MONGO_HOST || 'localhost',
      port: parseInt(process.env.MONGO_PORT, 10) || 27017,
      user: process.env.MONGO_USER || '',
      pass: process.env.MONGO_PASS || '',
      dbName: process.env.MONGO_DB_NAME || '',
    }
  });