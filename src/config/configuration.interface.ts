export interface INestConfiguration {
    port: number
}

export interface IDBConfiguration {
    host: string,    
    port: number,
    user: string,
    pass: string,
    dbName: string
}

export interface IUploadConfiguration {
    destination: string
}