import {Sequelize} from "sequelize";
import mysql2 from "mysql2"

export default new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect: process.env.DB_CONNECTION,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialectModule: mysql2
    },
)