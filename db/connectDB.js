const knex = require("knex")

const db = knex({
    client: "sqlite3",
    connection: {
        filename: "book.sqlite3"
    },
    useNullAsDefault: true
})

module.exports = db;