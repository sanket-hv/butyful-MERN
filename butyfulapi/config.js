var mysql = require('mysql');
require("dotenv").config();

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log(err);
    }
});

module.exports = connection;

// PORT=8000
// DB_PORT=3306
// HOSTNAME=sql103.epizy.com
// DB_HOST=sql103.epizy.com
// DB_USER=epiz_26294750
// DB_PASS=mituls95
// DB_NAME=epiz_26294750_butyful