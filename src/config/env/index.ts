import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
    port: string | number;
    database: {
        MONGODB_URI: string;
        MONGODB_DB_MAIN: string;
    };
    secret: string;
    refreshToken: string;
    emailAddress: string;
    emailPassword: string;
    awsAccessKey: string;
    awsSecretKey: string;
    s3Region: string;
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db'
    },
    secret: process.env.JWT_ACCESS_TOKEN || '@QEGTUI',
    refreshToken: process.env.JWT_REFRESH_TOKEN || '@QEGTUI2',
    emailAddress: process.env.EMAIL_ADDRESS,
    emailPassword: process.env.EMAIL_PASSWORD,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3Region: process.env.S3_REGION,
};

const production: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://production_uri/',
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db'
    },
    secret: process.env.SECRET || '@QEGTUI',
    refreshToken: process.env.JWT_REFRESH_TOKEN || '@QEGTUI2',
    emailAddress: process.env.EMAIL_ADDRESS,
    emailPassword: process.env.EMAIL_PASSWORD,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3Region: process.env.S3_REGION,
};

const test: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
        MONGODB_DB_MAIN: 'test_users_db'
    },
    secret: process.env.SECRET || '@QEGTUI',
    refreshToken: process.env.JWT_REFRESH_TOKEN || '@QEGTUI2',
    emailAddress: process.env.EMAIL_ADDRESS,
    emailPassword: process.env.EMAIL_PASSWORD,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3Region: process.env.S3_REGION,
};

const config: {
    [name: string]: IConfig
} = {
    test,
    development,
    production
};

export default config[NODE_ENV];
