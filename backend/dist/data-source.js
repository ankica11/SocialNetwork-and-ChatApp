"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var appDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "social_net",
    entities: ["dist/entity/*.js"],
    logging: true,
    synchronize: true,
    timezone: 'Z'
});
exports.default = appDataSource;
//# sourceMappingURL=data-source.js.map