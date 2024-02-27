export interface INestConfiguration {
  port: number;
}

export interface IDBConfiguration {
  host: string;
  port: number;
  user: string;
  pass: string;
  dbName: string;
}

export interface IUploadConfiguration {
  destination: string;
}

export interface IJwtConfiguration {
  secret: string;
  expiresIn: string | number;
  secretRefreshToken: string;
  expiresInRefreshToken: string | number;
}

export interface ICookiesConfiguration {
  expires: number;
}
