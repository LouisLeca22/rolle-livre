const sqlite3 = require("sqlite3").verbose()


const db = new sqlite3.Database('./book.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message)
});

db.run("DROP TABLE book");