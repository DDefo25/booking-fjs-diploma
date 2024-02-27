export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.MONGO_HOST || 'localhost',
    port: parseInt(process.env.MONGO_PORT, 10) || 27017,
    user: process.env.MONGO_USER || '',
    pass: process.env.MONGO_PASS || '',
    dbName: process.env.MONGO_DB_NAME || '',
  },
  upload: {
    destination: process.env.UPLOAD_DEST || './upload',
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRATION_TIME || '30m',
    secretRefreshToken: process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
    expiresInRefreshToken:
      process.env.JWT_EXPIRATION_TIME_REFRESH_TOKEN || '15d',
  },
  cookies: {
    expires: Number(process.env.COOKIES_EXPIRATION_TIME) || 60 * 60 * 1000,
  },
});
