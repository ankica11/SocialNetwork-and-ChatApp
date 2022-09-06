"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var appDataSource = new typeorm_1.DataSource({
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
});
exports.default = appDataSource;
//# sourceMappingURL=data-source.js.map