import { DataSource } from "typeorm"

const appDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: 3306,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: ["dist/entity/*.js"],
    logging: false,
    synchronize: true,
    timezone: 'Z'
})

export default appDataSource